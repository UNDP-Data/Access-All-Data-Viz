import { useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import sumBy from 'lodash.sumby';
import {
  CountryListType,
  CountryTaxonomyDataType,
  CtxDataType,
  DisaggregationDataType,
  IndicatorDataType,
  IndicatorDataTypeFromFile,
} from '../Types';
import Context from '../Context/Context';
import { DataExplorerGraphingEl } from './GraphingEl';
import { API_ACCESS_TOKEN, API_LINK } from '../Constants';

interface Props {
  regions?: string[];
  countries: CountryListType[];
  taxonomyData: CountryTaxonomyDataType[];
  countryCode?: string;
}

const getNumberOfDaysInYear = (year: number) => {
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return isLeapYear ? 366 : 365;
};

export function GrapherComponent(props: Props) {
  const { regions, countries, taxonomyData, countryCode } = props;
  const {
    ageRange,
    incomeRange,
    gender,
    updateData,
    updateWorldData,
    updateDisaggregatedData,
    disaggregationSettings,
    updateDisaggregationIsLoading,
  } = useContext(Context) as CtxDataType;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_LINK}?year_min=2016&year_max=2034&age_lower=${ageRange[0]}&age_upper=${ageRange[1]}&sex=${gender}&income_lower=${incomeRange[0]}&income_upper=${incomeRange[1]}`,
        {
          headers: {
            access_key: API_ACCESS_TOKEN,
          },
        },
      )
      .then((response: AxiosResponse) => {
        const countryData = taxonomyData.map(d => {
          const indx = response.data.findIndex(
            (el: { area: string }) => el.area === d['Alpha-3 code'],
          );
          if (indx === -1) return { ...d, data: [] };
          const cData: IndicatorDataType[] = response.data[indx].data.map(
            (el: IndicatorDataTypeFromFile) => ({
              ...el,
              expenditure_nominal_per_capita:
                el.expenditure_nominal / el.headcount,
              expenditure_ppp_per_capita: el.expenditure_ppp / el.headcount,
              expenditure_nominal_daily:
                el.expenditure_nominal / getNumberOfDaysInYear(el.year),
              expenditure_ppp_daily:
                el.expenditure_ppp / getNumberOfDaysInYear(el.year),
              expenditure_nominal_per_capita_daily:
                el.expenditure_nominal /
                el.headcount /
                getNumberOfDaysInYear(el.year),
              expenditure_ppp_per_capita_daily:
                el.expenditure_ppp /
                el.headcount /
                getNumberOfDaysInYear(el.year),
            }),
          );
          return { ...d, data: cData };
        });
        const yearList = Array.from(Array(2035 - 2016).keys(), x => x + 2016);
        const worldYearlyData: IndicatorDataType[] = yearList.map(el => {
          const worldHeadCount = sumBy(
            response.data,
            (d1: { data: any[] }) =>
              d1.data[d1.data.findIndex(yr => yr.year === el)].headcount,
          );
          const worldExpenditurePPP = sumBy(
            response.data,
            (d1: { data: any[] }) =>
              d1.data[d1.data.findIndex(yr => yr.year === el)].expenditure_ppp,
          );
          const worldExpenditureNominal = sumBy(
            response.data,
            (d1: { data: any[] }) =>
              d1.data[d1.data.findIndex(yr => yr.year === el)]
                .expenditure_nominal,
          );

          return {
            year: el,
            headcount: worldHeadCount,
            expenditure_nominal: worldExpenditureNominal,
            expenditure_ppp: worldExpenditurePPP,
            expenditure_nominal_per_capita:
              worldExpenditureNominal / worldHeadCount,
            expenditure_ppp_per_capita: worldExpenditurePPP / worldHeadCount,
            expenditure_nominal_daily:
              worldExpenditureNominal / getNumberOfDaysInYear(el),
            expenditure_ppp_daily:
              worldExpenditurePPP / getNumberOfDaysInYear(el),
            expenditure_nominal_per_capita_daily:
              worldExpenditureNominal /
              worldHeadCount /
              getNumberOfDaysInYear(el),
            expenditure_ppp_per_capita_daily:
              worldExpenditurePPP / worldHeadCount / getNumberOfDaysInYear(el),
          };
        });
        updateData(countryData);
        updateWorldData({
          'Alpha-3 code': 'WLD',
          'Country or Area': 'World',
          'Group 1': '',
          'Group 2': '',
          LDC: false,
          LLDC: false,
          'Latitude (average)': 0,
          'Longitude (average)': 0,
          SIDS: false,
          'Income group': '',
          data: worldYearlyData,
        });
        setLoading(false);
      });
  }, [ageRange, gender, incomeRange]);
  useEffect(() => {
    updateDisaggregationIsLoading(true);
    const urls = disaggregationSettings.map(
      d =>
        `${API_LINK}?year_min=2016&year_max=2034&age_lower=${d.ageRange[0]}&age_upper=${d.ageRange[1]}&sex=${d.gender}&income_lower=${d.incomeRange[0]}&income_upper=${d.incomeRange[1]}`,
    );
    const requests = urls.map(url =>
      axios.get(url, {
        headers: {
          access_key: API_ACCESS_TOKEN,
        },
      }),
    );
    axios.all(requests).then((response: AxiosResponse<any, any>[]) => {
      const countryData = taxonomyData.map(d => {
        const disaggregatedCountryData: DisaggregationDataType[] =
          disaggregationSettings.map((setting, i) => {
            const indx = response[i].data.findIndex(
              (el: { area: string }) => el.area === d['Alpha-3 code'],
            );
            if (indx === -1)
              return {
                gender: setting.gender,
                ageRange: setting.ageRange,
                incomeRange: setting.incomeRange,
                data: [],
              };
            const cData: IndicatorDataType[] = response[i].data[indx].data.map(
              (el: IndicatorDataTypeFromFile) => ({
                ...el,
                expenditure_nominal_per_capita:
                  el.expenditure_nominal / el.headcount,
                expenditure_ppp_per_capita: el.expenditure_ppp / el.headcount,
                expenditure_nominal_daily:
                  el.expenditure_nominal / getNumberOfDaysInYear(el.year),
                expenditure_ppp_daily:
                  el.expenditure_ppp / getNumberOfDaysInYear(el.year),
                expenditure_nominal_per_capita_daily:
                  el.expenditure_nominal /
                  el.headcount /
                  getNumberOfDaysInYear(el.year),
                expenditure_ppp_per_capita_daily:
                  el.expenditure_ppp /
                  el.headcount /
                  getNumberOfDaysInYear(el.year),
              }),
            );
            return {
              gender: setting.gender,
              ageRange: setting.ageRange,
              incomeRange: setting.incomeRange,
              data: cData,
            };
          });
        return { ...d, disaggregation: disaggregatedCountryData };
      });
      updateDisaggregatedData(
        countryData.filter(d => d.disaggregation[0].data.length > 0),
      );
      updateDisaggregationIsLoading(false);
    });
  }, [disaggregationSettings]);
  return (
    <div>
      <DataExplorerGraphingEl
        regions={regions}
        countries={countries}
        loading={loading}
        countryCode={countryCode}
      />
    </div>
  );
}
