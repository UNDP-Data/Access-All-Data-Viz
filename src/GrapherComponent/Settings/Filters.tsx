import { useContext, useState } from 'react';
import { Select, Radio } from 'antd';
import { ChevronDownCircle, ChevronRightCircle } from 'lucide-react';
import sortBy from 'lodash.sortby';
import { CountryListType, CtxDataType } from '../../Types';
import Context from '../../Context/Context';
import { INCOME_GROUPS } from '../../Constants';

interface Props {
  regions?: string[];
  countries: CountryListType[];
}

export function Filters(props: Props) {
  const { regions, countries } = props;
  const {
    selectedCountryGroup,
    selectedCountries,
    selectedIncomeGroups,
    selectedRegions,
    updateSelectedCountryGroup,
    updateSelectedRegions,
    updateSelectedCountries,
    updateSelectedIncomeGroups,
    updateMultiCountryTrendChartCountries,
  } = useContext(Context) as CtxDataType;
  const [filterExpanded, setFilterExpanded] = useState(true);
  return (
    <div className='settings-sections-container'>
      <button
        type='button'
        aria-label='Expand or collapse filters'
        className='settings-sections-container-title'
        onClick={() => {
          setFilterExpanded(!filterExpanded);
        }}
      >
        {filterExpanded ? (
          <ChevronDownCircle stroke='#212121' size={18} />
        ) : (
          <ChevronRightCircle stroke='#212121' size={18} />
        )}
        <h6 className='undp-typography margin-bottom-00'>
          Filter or Highlight By
        </h6>
      </button>
      <div
        className='settings-sections-options-container'
        style={{ display: filterExpanded ? 'flex' : 'none' }}
      >
        {regions ? (
          <div className='settings-option-div'>
            <p className='label'>Filter by regions</p>
            <Select
              className='undp-select'
              mode='multiple'
              maxTagCount='responsive'
              allowClear
              clearIcon={<div className='clearIcon' />}
              style={{ width: '100%' }}
              placeholder='All regions'
              value={selectedRegions}
              onChange={(d: string[]) => {
                updateSelectedRegions(d);
              }}
            >
              {regions
                .filter(d => d !== '')
                .map((d, i) => (
                  <Select.Option
                    className='undp-select-option'
                    value={d}
                    key={i}
                  >
                    {d}
                  </Select.Option>
                ))}
            </Select>
          </div>
        ) : null}
        <div className='settings-option-div'>
          <p className='label'>Filter by income group</p>
          <Select
            className='undp-select'
            mode='multiple'
            maxTagCount='responsive'
            allowClear
            clearIcon={<div className='clearIcon' />}
            style={{ width: '100%' }}
            placeholder='All Income Groups'
            value={selectedIncomeGroups}
            onChange={(d: string[]) => {
              updateSelectedIncomeGroups(d);
            }}
          >
            {INCOME_GROUPS.map(d => (
              <Select.Option className='undp-select-option' key={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <p className='label'>Filter by country group</p>
          <Radio.Group
            onChange={d => {
              updateSelectedCountryGroup(d.target.value);
            }}
            value={selectedCountryGroup}
          >
            <Radio className='undp-radio' value='All'>
              All
            </Radio>
            <Radio className='undp-radio' value='LDC'>
              LDC
            </Radio>
            <Radio className='undp-radio' value='LLDC'>
              LLDC
            </Radio>
            <Radio className='undp-radio' value='SIDS'>
              SIDS
            </Radio>
          </Radio.Group>
        </div>
        <div className='settings-option-div'>
          <p className='label'>Filter by countries</p>
          <Select
            className='undp-select'
            mode='multiple'
            maxTagCount='responsive'
            allowClear
            clearIcon={<div className='clearIcon' />}
            style={{ width: '100%' }}
            value={selectedCountries}
            placeholder='All Countries'
            onChange={(d: string[]) => {
              updateSelectedCountries(d);
              updateMultiCountryTrendChartCountries(d);
            }}
          >
            {sortBy(countries, d => d.name)
              .map(d => d.name)
              .map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
