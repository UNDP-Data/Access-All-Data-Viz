import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import {
  CountryGroupDataType,
  IndicatorMetaDataType,
  IndicatorSimplifiedDataType,
} from '../Types';

export const GetYearsArray = (
  data: CountryGroupDataType[],
  indicator: IndicatorMetaDataType,
) => {
  const yrs: number[][] = [];
  data.forEach(d => {
    const indicatorIndx = d.indicators.findIndex(
      el => el.indicator === indicator.DataKey,
    );
    if (indicatorIndx !== -1) {
      const yrsArray = d.indicators[indicatorIndx].yearlyData.map(
        el => el.year,
      );
      yrs.push(yrsArray);
    }
  });
  return sortedUniq(flattenDeep(yrs).sort());
};

export const GetYearsArrayFromIndicator = (
  data: IndicatorSimplifiedDataType,
) => {
  const yrs: number[][] = [];
  data.countryData.forEach(d => {
    const yrsArray = d.data.map(el => el.year);
    yrs.push(yrsArray);
  });
  return sortedUniq(flattenDeep(yrs).sort());
};
