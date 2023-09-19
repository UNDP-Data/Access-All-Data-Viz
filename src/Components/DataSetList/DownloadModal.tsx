import { useEffect, useState } from 'react';
import { json } from 'd3-request';
import { queue } from 'd3-queue';
import { Checkbox, Input, Select } from 'antd';
import sortBy from 'lodash.sortby';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import intersection from 'lodash.intersection';
import {
  CountryTaxonomyDataType,
  IndicatorMetaDataType,
  IndicatorSimplifiedDataType,
} from '../../Types';
import {
  COUNTRIES_BY_UNDP_REGIONS,
  SDG_GOALS,
  TAGS_LIST,
} from '../../Constants';
import { GetYearsArrayFromIndicator } from '../../Utils/GetYearsArray';

interface Props {
  indicatorsListMain: IndicatorMetaDataType[];
  countries: CountryTaxonomyDataType[];
  signatureSolution?: string;
}

const DownloadMultipleIndicatorExcel = (
  indicators: IndicatorMetaDataType[],
  countries: string[],
) => {
  const q = queue();
  indicators.forEach(d => {
    q.defer(
      json,
      `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/indicatorData/${d.id}.json`,
    );
  });
  q.awaitAll((err, allData: any) => {
    if (err) throw err;
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const years = sortedUniq(
      flattenDeep(
        allData
          .map((d: IndicatorSimplifiedDataType) => {
            const filteredData = {
              ...d,
              countryData: d.countryData.filter(
                el => countries.indexOf(el['Alpha-3 code']) !== -1,
              ),
            };
            return GetYearsArrayFromIndicator(filteredData);
          })
          .sort(),
      ),
    );
    const Heading: any = [
      {
        country: 'Country or Area',
        countryCode: 'ISO-3 Code',
        indicator: 'Indicator',
      },
    ];
    years.forEach(d => {
      Heading[0][`Year_${d}`] = `${d}`;
    });

    const csvData: any = [];
    allData.forEach((d: IndicatorSimplifiedDataType) => {
      const filteredData = {
        ...d,
        countryData: d.countryData.filter(
          el => countries.indexOf(el['Alpha-3 code']) !== -1,
        ),
      };
      filteredData.countryData.forEach(el => {
        const dataToPush: any = {
          country: el['Country or Area'],
          countryCode: el['Alpha-3 code'],
          indicator:
            indicators[
              indicators.findIndex(j => j.DataKey === filteredData.indicator)
            ].IndicatorLabel,
        };
        years.forEach(yrs => {
          dataToPush[`Year_${yrs}`] =
            el.data.findIndex(j => j.year === yrs) === -1
              ? undefined
              : el.data[el.data.findIndex(j => j.year === yrs)].value;
        });
        csvData.push(dataToPush);
      });
    });
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: Object.keys(Heading[0]),
      skipHeader: true,
    });

    const wscols = [{ wch: 20 }, { wch: 10 }, { wch: 55 }];
    years.forEach(_yrs => {
      wscols.push({ wch: 20 });
    });

    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: Object.keys(Heading[0]),
      skipHeader: true,
      origin: -1, // ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataForExcel = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataForExcel, `data.xlsx`);
  });
};

export function DownloadModal(props: Props) {
  const { indicatorsListMain, countries, signatureSolution } = props;
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [sdgForFilter, setSDGForFilter] = useState<string[]>([]);
  const [tagsForFilter, setTagsForFilter] = useState<string[]>([]);
  const [selectedIndicators, setSelectedIndicators] = useState<
    IndicatorMetaDataType[]
  >([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(
    countries.map(d => d['Alpha-3 code']),
  );
  const [filteredRegion, setFilteredRegion] = useState<string | undefined>(
    undefined,
  );
  const [indicatorSearch, setIndicatorSearch] = useState<string | undefined>(
    undefined,
  );
  useEffect(() => {
    if (indicatorsListMain) {
      const indicatorFilterByTags =
        tagsForFilter.length !== 0 && tagsForFilter
          ? indicatorsListMain.filter(
              d => intersection(d.Tags, tagsForFilter).length > 0,
            )
          : indicatorsListMain;
      const indicatorFilterBySDGs =
        sdgForFilter.length !== 0 && sdgForFilter
          ? indicatorFilterByTags.filter(
              d => intersection(d.SDGs, sdgForFilter).length > 0,
            )
          : indicatorFilterByTags;
      const indicators = sortBy(
        indicatorFilterBySDGs,
        d => d.IndicatorLabel,
      ).filter(
        d =>
          d.IndicatorLabel.toLowerCase().includes(
            indicatorSearch?.toLowerCase() || '',
          ) ||
          d.IndicatorDescription.toLowerCase().includes(
            indicatorSearch?.toLowerCase() || '',
          ),
      );
      setIndicatorsList(indicators);
    }
  }, [indicatorSearch, sdgForFilter, tagsForFilter]);
  return (
    <div>
      <div className='flex-div gap-07'>
        <div
          className='margin-bottom-07 flex-div flex-wrap'
          style={{ justifyContent: 'space-between', width: '100%' }}
        >
          <div
            className='margin-bottom-00'
            style={{
              padding: '2rem',
              backgroundColor: 'var(--gray-200)',
              width: 'calc(100% - 4rem)',
            }}
          >
            <h4
              className='undp-typography bold'
              style={{ color: 'var(--blue-700)' }}
            >
              Download Database
              {signatureSolution ? ` for ${signatureSolution}` : ''}
            </h4>
            <p className='undp-typography margin-bottom-07'>
              Download {selectedIndicators.length} indicators for{' '}
              {selectedCountries.length} countries{' '}
              {selectedIndicators.length === 0 || selectedCountries.length === 0
                ? '(please select atleast one indicator and one country)'
                : null}
            </p>
            <button
              type='button'
              className='undp-button button-secondary button-arrow'
              onClick={() => {
                DownloadMultipleIndicatorExcel(
                  selectedIndicators,
                  selectedCountries,
                );
              }}
              style={{
                opacity:
                  selectedIndicators.length === 0 ||
                  selectedCountries.length === 0
                    ? 0.2
                    : 1,
                cursor:
                  selectedIndicators.length === 0 ||
                  selectedCountries.length === 0
                    ? 'not-allowed'
                    : 'pointer',
              }}
              disabled={
                selectedIndicators.length === 0 ||
                selectedCountries.length === 0
              }
            >
              Download data
            </button>
          </div>
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'var(--gray-200)',
              width: 'calc(100% - 4rem)',
              flexShrink: 0,
            }}
          >
            <h6 className='undp-typography'>Select Indicators</h6>
            <div className='margin-bottom-05 flex-div'>
              <div
                style={{
                  flexGrow: 1,
                  minWidth: '17.5rem',
                  width: 'calc(50% - 0.5rem)',
                }}
              >
                <p className='label'>Filter by tags</p>
                <Select
                  className='undp-select'
                  showSearch
                  maxTagCount='responsive'
                  style={{ width: '100%' }}
                  mode='multiple'
                  allowClear
                  clearIcon={<div className='clearIcon' />}
                  placeholder='All Tags'
                  onChange={d => {
                    setTagsForFilter(d);
                  }}
                  value={tagsForFilter}
                >
                  {TAGS_LIST.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  minWidth: '17.5rem',
                  width: 'calc(50% - 0.5rem)',
                }}
              >
                <p className='label'>Filter by sdgs</p>
                <Select
                  className='undp-select'
                  maxTagCount='responsive'
                  style={{ width: '100%' }}
                  mode='multiple'
                  allowClear
                  clearIcon={<div className='clearIcon' />}
                  placeholder='All SDGs'
                  onChange={d => {
                    setSDGForFilter(d);
                  }}
                  value={sdgForFilter}
                >
                  {SDG_GOALS.map(d => (
                    <Select.Option
                      className='undp-select-option'
                      key={d.split(':')[0]}
                    >
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <Input
              className='undp-input margin-bottom-05'
              placeholder='Search Indicator'
              onChange={d => setIndicatorSearch(d.target.value)}
            />
            <div className='flex-div flex-wrap margin-bottom-05'>
              <button
                type='button'
                className='undp-button button-tertiary gap-07'
                style={{
                  padding: 0,
                  fontSize: '0.825rem',
                  color: 'var(--blue-600)',
                }}
                onClick={() => {
                  if (
                    indicatorSearch ||
                    tagsForFilter.length > 0 ||
                    sdgForFilter.length > 0
                  ) {
                    const indicatorsListTemp = indicatorsList || [];
                    const selectedIndicatorsTemp = selectedIndicators.filter(
                      d =>
                        indicatorsListTemp.findIndex(el => el.id === d.id) ===
                        -1,
                    );
                    indicatorsListTemp.forEach(d => {
                      if (indicatorsList) {
                        selectedIndicatorsTemp.push(
                          indicatorsList[
                            indicatorsList.findIndex(el => el.id === d.id)
                          ],
                        );
                      }
                    });
                    setSelectedIndicators(selectedIndicatorsTemp);
                  } else {
                    setSelectedIndicators(indicatorsList || []);
                  }
                }}
              >
                Select All
              </button>
              <button
                type='button'
                className='undp-button button-tertiary'
                style={{
                  padding: 0,
                  fontSize: '0.825rem',
                  color: 'var(--blue-600)',
                }}
                onClick={() => {
                  if (
                    indicatorSearch ||
                    tagsForFilter.length > 0 ||
                    sdgForFilter.length > 0
                  ) {
                    const indicatorsListTemp = indicatorsList || [];
                    const selectedIndicatorsTemp = selectedIndicators.filter(
                      d =>
                        indicatorsListTemp.findIndex(el => el.id === d.id) ===
                        -1,
                    );
                    setSelectedIndicators(selectedIndicatorsTemp);
                  } else {
                    setSelectedIndicators([]);
                  }
                }}
              >
                Deselect All
              </button>
            </div>
            <div
              className='undp-scrollbar flex-div flex-wrap'
              style={{ height: '25rem', overflowY: 'auto' }}
            >
              {indicatorsList?.map((d, i) => (
                <div key={i} style={{ width: 'calc(50% - 0.5rem)' }}>
                  <Checkbox
                    className='undp-checkbox'
                    style={{ marginLeft: 0 }}
                    checked={
                      selectedIndicators.findIndex(el => el.id === d.id) !== -1
                    }
                    onChange={() => {
                      if (
                        selectedIndicators.findIndex(el => el.id === d.id) ===
                        -1
                      ) {
                        const ind = [...selectedIndicators];
                        ind.push(d);
                        setSelectedIndicators(ind);
                      } else {
                        setSelectedIndicators(
                          selectedIndicators.filter(el => el.id !== d.id),
                        );
                      }
                    }}
                  >
                    {d.IndicatorLabel}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'var(--gray-200)',
              width: 'calc(100% - 4rem)',
              flexShrink: 0,
            }}
          >
            <h6 className='undp-typography'>Select Countries</h6>
            <Select
              className='undp-select margin-bottom-05'
              placeholder='Filter by UNDP bureau'
              style={{ flexGrow: 0 }}
              showSearch
              value={filteredRegion}
              allowClear
              clearIcon={<div className='clearIcon' />}
              onChange={e => {
                setFilteredRegion(e);
              }}
            >
              {COUNTRIES_BY_UNDP_REGIONS.map((d, i) => (
                <Select.Option
                  key={i}
                  className='undp-select-option'
                  value={d.name}
                >
                  {d.name}
                </Select.Option>
              ))}
            </Select>
            <div className='flex-div flex-wrap margin-bottom-05'>
              <button
                type='button'
                className='undp-button button-tertiary gap-07'
                style={{
                  padding: 0,
                  fontSize: '0.825rem',
                  color: 'var(--blue-600)',
                }}
                onClick={() => {
                  if (filteredRegion) {
                    const countryList =
                      COUNTRIES_BY_UNDP_REGIONS[
                        COUNTRIES_BY_UNDP_REGIONS.findIndex(
                          d => d.name === filteredRegion,
                        )
                      ].Countries;
                    const selectedCountriesTemp = selectedCountries.filter(
                      d => countryList.indexOf(d) === -1,
                    );
                    countryList.forEach(d => {
                      selectedCountriesTemp.push(d);
                    });
                    setSelectedCountries(selectedCountriesTemp);
                  } else {
                    setSelectedCountries(
                      countries.map(d => d['Alpha-3 code']) || [],
                    );
                  }
                }}
              >
                Select All
              </button>
              <button
                type='button'
                className='undp-button button-tertiary'
                style={{
                  padding: 0,
                  fontSize: '0.825rem',
                  color: 'var(--blue-600)',
                }}
                onClick={() => {
                  if (filteredRegion) {
                    const countryList =
                      COUNTRIES_BY_UNDP_REGIONS[
                        COUNTRIES_BY_UNDP_REGIONS.findIndex(
                          d => d.name === filteredRegion,
                        )
                      ].Countries;
                    const selectedCountriesTemp = selectedCountries.filter(
                      d => countryList.indexOf(d) === -1,
                    );
                    setSelectedCountries(selectedCountriesTemp);
                  } else {
                    setSelectedCountries([]);
                  }
                }}
              >
                Deselect All
              </button>
            </div>
            <div
              className='undp-scrollbar flex-div flex-wrap'
              style={{ height: '25rem', overflowY: 'auto' }}
            >
              {(filteredRegion
                ? countries?.filter(
                    d =>
                      COUNTRIES_BY_UNDP_REGIONS[
                        COUNTRIES_BY_UNDP_REGIONS.findIndex(
                          el => el.name === filteredRegion,
                        )
                      ].Countries.indexOf(d['Alpha-3 code']) !== -1,
                  )
                : countries
              )?.map((d, i) => (
                <div key={i} style={{ width: 'calc(25% - 0.75rem)' }}>
                  <Checkbox
                    className='undp-checkbox'
                    style={{ marginLeft: 0 }}
                    checked={
                      selectedCountries.findIndex(
                        el => el === d['Alpha-3 code'],
                      ) !== -1
                    }
                    onChange={() => {
                      if (
                        selectedCountries.findIndex(
                          el => el === d['Alpha-3 code'],
                        ) === -1
                      ) {
                        const ind = [...selectedCountries];
                        ind.push(d['Alpha-3 code']);
                        setSelectedCountries(ind);
                      } else {
                        setSelectedCountries(
                          selectedCountries.filter(
                            el => el !== d['Alpha-3 code'],
                          ),
                        );
                      }
                    }}
                  >
                    {d['Country or Area']}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
