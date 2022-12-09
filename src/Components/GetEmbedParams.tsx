import { Checkbox, message } from 'antd';
import { useState, useContext } from 'react';
import { EMBED_LINK_ROOT } from '../Constants';
import Context from '../Context/Context';
import { CtxDataType } from '../Types';

const ArrToString = (d: string[]) => {
  let stringValTemp = '';
  d.forEach((el) => {
    stringValTemp += `~${el.replace(/ /g, '+')}`;
  });
  const stringVal = stringValTemp.substring(1);
  return stringVal;
};

const CovertStringForParam = (d: string) => d.replace(/ /g, '+');

export const GetEmbedParams = () => {
  const [showSettingsInEmbed, setShowSettingsInEmbed] = useState(true);
  const {
    graphType,
    selectedRegions,
    selectedCountries,
    selectedIncomeGroups,
    selectedCountryGroup,
    xAxisIndicator,
    yAxisIndicator,
    colorIndicator,
    sizeIndicator,
    showMostRecentData,
    showLabel,
    trendChartCountry,
    multiCountrytrendChartCountries,
    useSameRange,
    reverseOrder,
    verticalBarLayout,
  } = useContext(Context) as CtxDataType;
  const queryParamsFromLink = new URLSearchParams(window.location.search);
  const graphParam = `graphType=${graphType}`;
  const regionsParam = selectedRegions.length > 0 ? `&regions=${ArrToString(selectedRegions)}` : '';
  const countries = selectedCountries.length > 0 ? `&countries=${ArrToString(selectedCountries)}` : '';
  const incomeGroupsParam = selectedRegions.length > 0 ? `&incomeGroups=${ArrToString(selectedIncomeGroups)}` : '';
  const countryGroupParam = selectedCountryGroup === 'All' ? '' : `&countryGroup=${CovertStringForParam(selectedCountryGroup)}`;
  const firstMetricParam = `&firstMetric=${CovertStringForParam(xAxisIndicator)}`;
  const secondMetricParam = yAxisIndicator ? `&secondMetric=${CovertStringForParam(yAxisIndicator)}` : '';
  const colorMetricParam = `&colorMetric=${CovertStringForParam(colorIndicator)}`;
  const sizeMetricParam = sizeIndicator ? `&sizeMetric=${CovertStringForParam(sizeIndicator)}` : '';
  const showMostRecentDataParam = showMostRecentData === true ? '&showMostRecentData=true' : '';
  const showLabelParam = showLabel === true ? '&showLabel=true' : '';
  const trendChartCountryParam = trendChartCountry ? `&trendChartCountry=${CovertStringForParam(trendChartCountry)}` : '';
  const multiCountrytrendChartCountriesParam = multiCountrytrendChartCountries.length > 0 ? `&multiCountrytrendChartCountries=${ArrToString(multiCountrytrendChartCountries)}` : '';
  const useSameRangeParam = useSameRange === true ? '&useSameRange=true' : '';
  const reverseOrderParam = reverseOrder === true ? '&reverseOrder=true' : '';
  const verticalBarLayoutParam = verticalBarLayout === false ? '&verticalBarLayout=false' : '';
  const showSettingsParam = showSettingsInEmbed === false ? '&showSettings=false' : '&showSettings=true';
  const topicParam = queryParamsFromLink.get('topic') ? `&topic=${queryParamsFromLink.get('topic')}` : '';
  const queryParams = graphParam
    + regionsParam
    + countries
    + incomeGroupsParam
    + countryGroupParam
    + firstMetricParam
    + secondMetricParam
    + colorMetricParam
    + sizeMetricParam
    + showMostRecentDataParam
    + showLabelParam
    + trendChartCountryParam
    + multiCountrytrendChartCountriesParam
    + useSameRangeParam
    + reverseOrderParam
    + verticalBarLayoutParam
    + showSettingsParam
    + topicParam;
  return (
    <>
      <div
        className='margin-bottom-03'
        style={{
          fontFamily: 'monospace',
          backgroundColor: 'var(--gray-200)',
          padding: 'var(--spacing-05)',
          border: '2px solid var(--gray-700)',
        }}
      >
        {
          `<iframe src="${EMBED_LINK_ROOT}?${queryParams}&embeded=true" loading="lazy" style="width: 100%; border: 0px none; max-width: 1380px"></iframe>`
        }
      </div>
      <div className='flex-div flex-vert-align-center flex-space-between'>
        <Checkbox className='undp-checkbox' checked={showSettingsInEmbed} onChange={(e) => { setShowSettingsInEmbed(e.target.checked); }}>Show Settings</Checkbox>
        <button
          type='button'
          className='undp-button button-tertiary'
          onClick={() => {
            navigator.clipboard.writeText(`<iframe src="${EMBED_LINK_ROOT}?${queryParams}&embeded=true" loading="lazy" style="width: 100%; border: 0px none; max-width: 1380px"></iframe>`);
            message.success({ content: 'Embed Link Copied', duration: 2 });
          }}
        >
          Copy Embed Code
        </button>
      </div>
    </>
  );
};
