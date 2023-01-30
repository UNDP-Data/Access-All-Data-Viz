import {
  useContext, useState,
} from 'react';
import maxBy from 'lodash.maxby';
import orderBy from 'lodash.orderby';
import { format } from 'd3-format';
import {
  scaleOrdinal, scaleLinear, scaleThreshold,
} from 'd3-scale';
import minBy from 'lodash.minby';
import {
  CtxDataType, CountryGroupDataType, HoverDataType, HoverRowDataType, IndicatorMetaDataWithYear,
} from '../Types';
import Context from '../Context/Context';
import {
  COLOR_SCALES, CONTINENTS, HDI_LEVELS, INCOME_GROUPS,
} from '../Constants';
import { Tooltip } from '../Components/Tooltip';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
}

export const HorizontalBarChart = (props: Props) => {
  const {
    data,
    indicators,
  } = props;
  const {
    year,
    xAxisIndicator,
    showMostRecentData,
    colorIndicator,
    selectedCountries,
    selectedRegions,
    selectedIncomeGroups,
    selectedCountryGroup,
    reverseOrder,
    selectedCountry,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const svgWidth = queryParams.get('showSettings') === 'false' && window.innerWidth > 960 ? 1280 : 960;
  const margin = {
    top: 150,
    bottom: 10,
    left: 175,
    right: 40,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const xIndicatorMetaData = indicators[indicators.findIndex((indicator) => indicator.IndicatorLabelTable === xAxisIndicator)];
  const colorIndicatorMetaData = indicators[indicators.findIndex((indicator) => indicator.IndicatorLabelTable === colorIndicator)];

  const dataFormatted = orderBy(
    data.map((d) => {
      const xIndicatorIndex = d.indicators.findIndex((el) => xIndicatorMetaData.DataKey === el.indicator);
      const colorIndicatorIndex = colorIndicator === 'Human Development Index' ? d.indicators.findIndex((el) => el.indicator === 'Human development index (HDI)') : d.indicators.findIndex((el) => colorIndicatorMetaData?.DataKey === el.indicator);

      const xVal = xIndicatorIndex === -1 ? undefined
        : year !== -1 && !showMostRecentData ? d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
          : d.indicators[xIndicatorIndex].yearlyData[d.indicators[xIndicatorIndex].yearlyData.length - 1]?.value;
      const colorVal = colorIndicator === 'Continents' ? d['Group 1']
        : colorIndicator === 'Income Groups' ? d['Income group']
          : colorIndicator === 'Human Development Index' ? year !== -1 && !showMostRecentData ? d.indicators[colorIndicatorIndex].yearlyData[d.indicators[colorIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
            : d.indicators[colorIndicatorIndex].yearlyData[d.indicators[colorIndicatorIndex].yearlyData.length - 1]?.value
            : colorIndicatorIndex === -1 ? undefined
              : year !== -1 && !showMostRecentData ? d.indicators[colorIndicatorIndex].yearlyData[d.indicators[colorIndicatorIndex].yearlyData.findIndex((el) => el.year === year)]?.value
                : d.indicators[colorIndicatorIndex].yearlyData[d.indicators[colorIndicatorIndex].yearlyData.length - 1]?.value;
      const countryGroup = selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];
      const incomeGroup = !!(selectedIncomeGroups.length === 0 || selectedIncomeGroups.indexOf(d['Income group']) !== -1);
      const region = !!(selectedRegions.length === 0 || selectedRegions.indexOf(d['Group 2']) !== -1);
      const country = !!(selectedCountries.length === 0 || selectedCountries.indexOf(d['Country or Area']) !== -1);
      const xYear = year === -1 || showMostRecentData ? d.indicators[xIndicatorIndex]?.yearlyData[d.indicators[xIndicatorIndex].yearlyData.length - 1]?.year : year;
      const colorYear = (year === -1 || showMostRecentData) && colorIndicatorIndex !== -1 ? d.indicators[colorIndicatorIndex]?.yearlyData[d.indicators[colorIndicatorIndex].yearlyData.length - 1]?.year : year;
      return ({
        countryCode: d['Alpha-3 code'],
        countryName: d['Country or Area'],
        xVal,
        colorVal,
        region,
        countryGroup,
        incomeGroup,
        country,
        xYear,
        colorYear,
      });
    }).filter((d) => d.xVal !== undefined && d.country && d.countryGroup && d.incomeGroup && d.region), 'xVal', reverseOrder ? 'desc' : 'asc',
  );

  const svgHeight = dataFormatted.length * 25 + margin.top + margin.bottom;
  const xMaxValue = maxBy(dataFormatted, (d) => d.xVal) ? maxBy(dataFormatted, (d) => d.xVal)?.xVal as number : 0;
  const xMinValue = minBy(dataFormatted, (d) => d.xVal) ? minBy(dataFormatted, (d) => d.xVal)?.xVal as number : 0;

  const widthScale = scaleLinear().domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue]).range([0, graphWidth]).nice();

  const xTicks = widthScale.ticks(5);

  let colorList = colorIndicator === 'Income Groups' ? COLOR_SCALES.Divergent.Color4 : COLOR_SCALES.Categorical;

  if (colorIndicatorMetaData?.IsCategorical) {
    switch (colorIndicatorMetaData?.Categories.length) {
      case 5:
        colorList = COLOR_SCALES.Linear.RedColor5;
        break;
      case 6:
        colorList = COLOR_SCALES.Linear.RedColor6;
        break;
      case 7:
        colorList = COLOR_SCALES.Linear.RedColor7;
        break;
      case 8:
        colorList = COLOR_SCALES.Linear.RedColor8;
        break;
      case 9:
        colorList = COLOR_SCALES.Linear.RedColor9;
        break;
      default:
        colorList = COLOR_SCALES.Linear.RedColor10;
        break;
    }
  }

  if (colorIndicatorMetaData?.IsDivergent) {
    switch (colorIndicatorMetaData?.Categories.length) {
      case 4:
        colorList = COLOR_SCALES.Divergent.Color4;
        break;
      case 5:
        colorList = COLOR_SCALES.Divergent.Color5;
        break;
      case 7:
        colorList = COLOR_SCALES.Divergent.Color7;
        break;
      case 9:
        colorList = COLOR_SCALES.Divergent.Color9;
        break;
      default:
        colorList = COLOR_SCALES.Divergent.Color11;
        break;
    }
  }

  const colorDomain = colorIndicator === 'Continents' ? CONTINENTS
    : colorIndicator === 'Income Groups' ? INCOME_GROUPS
      : colorIndicator === 'Human Development Index' ? [0.55, 0.7, 0.8]
        : colorIndicatorMetaData?.Categories ? colorIndicatorMetaData?.Categories
          : [0, 0];
  const colorScale = colorIndicator === 'Human Development Index' ? scaleThreshold<string | number, string>().domain(colorDomain).range(COLOR_SCALES.Divergent.Color4).unknown('#666') : scaleOrdinal<string | number, string>().domain(colorDomain).range(colorList).unknown('#666');
  return (
    <div className='undp-scrollbar' style={{ height: 'calc(100% - 89px)' }}>
      {
        selectedCountry ? (
          <div
            className='margin-top-05 margin-bottom-05'
            style={{
              maxWidth: '70rem',
              margin: 'auto',
              backgroundColor: 'var(--white)',
              padding: 'var(--spacing-05)',
              textAlign: 'center',
              fontSize: '1.25rem',
            }}
          >
            {
              dataFormatted.findIndex((d) => d.countryCode === selectedCountry) !== -1
                ? (
                  <>
                    {dataFormatted[dataFormatted.findIndex((d) => d.countryCode === selectedCountry)].countryName}
                    {' '}
                    has
                    {' '}
                    {dataFormatted.findIndex((d) => d.countryCode === selectedCountry) + 1 === 1 ? 'the' : dataFormatted.findIndex((d) => d.countryCode === selectedCountry) + 1}
                    {' '}
                    {reverseOrder ? 'highest' : 'lowest'}
                    {' '}
                    {xAxisIndicator}
                    {' '}
                    (out of
                    {' '}
                    {dataFormatted.length}
                    {' '}
                    countries)
                  </>
                ) : (
                  <>
                    No data for the selected country
                  </>
                )
            }
          </div>
        ) : null
      }
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <text
          x={margin.left}
          y={30}
          fontSize={14}
          fontWeight='bold'
          fill='#212121'
        >
          {xIndicatorMetaData.IndicatorLabelTable}
        </text>
        {
          selectedCountry ? null
            : (
              <g
                transform={`translate(${margin.left},70)`}
              >
                <text
                  x={0}
                  y={10}
                  fontSize={14}
                  fill='#212121'
                >
                  {colorIndicatorMetaData?.IndicatorLabelTable ? colorIndicatorMetaData?.IndicatorLabelTable : colorIndicator}
                </text>
                {
              colorIndicator === 'Human Development Index' ? COLOR_SCALES.Divergent.Color4.map((d, i) => (
                <g
                  transform='translate(0,20)'
                  key={i}
                  onMouseOver={() => { setSelectedColor(d); }}
                  onMouseLeave={() => { setSelectedColor(undefined); }}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={(i * (graphWidth - 50)) / COLOR_SCALES.Divergent.Color4.length + 1}
                    y={1}
                    width={((graphWidth - 50) / COLOR_SCALES.Divergent.Color4.length) - 2}
                    height={8}
                    fill={d}
                    stroke={selectedColor === d ? '#212121' : d}
                  />
                  <text
                    x={((i * (graphWidth - 50)) / COLOR_SCALES.Divergent.Color4.length) + (((graphWidth - 50) / 2) / COLOR_SCALES.Divergent.Color4.length)}
                    y={25}
                    textAnchor='middle'
                    fontSize={12}
                    fill='#212121'
                  >
                    {HDI_LEVELS[i]}
                  </text>
                </g>
              )) : colorDomain.map((d, i) => (
                <g
                  transform='translate(0,20)'
                  key={i}
                  onMouseOver={() => { setSelectedColor(colorList[i]); }}
                  onMouseLeave={() => { setSelectedColor(undefined); }}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={(i * (graphWidth - 50)) / colorDomain.length + 1}
                    y={1}
                    width={((graphWidth - 50) / colorDomain.length) - 2}
                    height={8}
                    fill={colorList[i]}
                    stroke={selectedColor === colorList[i] ? '#212121' : colorList[i]}
                  />
                  <text
                    x={((i * (graphWidth - 50)) / colorDomain.length) + (((graphWidth - 50) / 2) / colorDomain.length)}
                    y={25}
                    textAnchor='middle'
                    fontSize={12}
                    fill='#212121'
                  >
                    {d}
                  </text>
                </g>
              ))
            }
                <g
                  transform='translate(0,20)'
                >
                  <rect
                    x={graphWidth - 40}
                    y={1}
                    width={40}
                    height={8}
                    fill='#666'
                    stroke='#666'
                  />
                  <text
                    x={graphWidth - 20}
                    y={25}
                    textAnchor='middle'
                    fontSize={12}
                    fill='#666'
                  >
                    NA
                  </text>
                </g>
              </g>
            )
        }
        <g
          transform={`translate(${margin.left},${selectedCountry ? margin.top - 80 : margin.top})`}
        >
          {
            xTicks.map((d, i) => (
              <g
                key={i}
              >
                <text
                  x={widthScale(d)}
                  y={-12.5}
                  fill='#AAA'
                  textAnchor='middle'
                  fontSize={12}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
                <line
                  x1={widthScale(d)}
                  x2={widthScale(d)}
                  y1={-2.5}
                  y2={dataFormatted.length * 25 - 2.5}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                  opacity={d === 0 ? 0 : 1}
                />
              </g>
            ))
          }
          {
            dataFormatted.map((d, i) => {
              const countryData = data[data.findIndex((el) => el['Alpha-3 code'] === d.countryCode)];
              const selectedColorOpacity = d.colorVal !== undefined ? !selectedColor || selectedColor === colorScale(d.colorVal) as string : !selectedColor;
              const rowData: HoverRowDataType[] = [
                {
                  title: xAxisIndicator,
                  value: d.xVal !== undefined ? d.xVal : 'NA',
                  type: 'x-axis',
                  year: d.xYear,
                  prefix: xIndicatorMetaData?.LabelPrefix,
                  suffix: xIndicatorMetaData?.LabelSuffix,
                },
              ];
              if (colorIndicator !== 'Continents') {
                rowData.push({
                  title: colorIndicator,
                  value: d.colorVal !== undefined ? d.colorVal : 'NA',
                  type: 'color',
                  year: colorIndicator === 'Income Groups' ? undefined : d.colorYear,
                  color: d.colorVal ? colorScale(d.colorVal) as string : '#666',
                  prefix: colorIndicatorMetaData?.LabelPrefix,
                  suffix: colorIndicatorMetaData?.LabelSuffix,
                });
              }

              if (d.xVal === undefined) return null;
              return (
                <g
                  key={i}
                  opacity={
                    !hoverData
                      ? selectedColorOpacity ? 1 : 0.1
                      : hoverData.country === countryData['Country or Area'] ? 1 : 0.1
                  }
                  onMouseEnter={(event) => {
                    setHoverData({
                      country: countryData['Country or Area'],
                      continent: countryData['Group 1'],
                      rows: rowData,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseMove={(event) => {
                    setHoverData({
                      country: countryData['Country or Area'],
                      continent: countryData['Group 1'],
                      rows: rowData,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverData(undefined);
                  }}
                >
                  <text
                    fill={selectedCountry ? d.countryCode === selectedCountry ? '#006EB5' : '#D4D6D8' : d.colorVal ? colorScale(d.colorVal) : '#212121'}
                    y={i * 25}
                    x={0}
                    dx={-15}
                    dy={14}
                    fontSize={12}
                    textAnchor='end'
                  >
                    {d.countryName.length < 25 ? d.countryName : `${d.countryName.substring(0, 25)}...`}
                  </text>
                  <rect
                    y={i * 25}
                    x={widthScale(Math.min(0, d.xVal))}
                    height={20}
                    fill={selectedCountry ? d.countryCode === selectedCountry ? '#006EB5' : '#D4D6D8' : d.colorVal ? colorScale(d.colorVal) : '#666'}
                    width={Math.abs(widthScale(d.xVal) - widthScale(0))}
                    rx={3}
                    ry={3}
                  />
                  <text
                    fill={selectedCountry ? d.countryCode === selectedCountry ? '#006EB5' : '#D4D6D8' : '#212121'}
                    fontWeight='bold'
                    y={i * 25}
                    x={d.xVal < 0 ? widthScale(Math.min(0, d.xVal)) : widthScale(d.xVal)}
                    dx={d.xVal < 0 ? -5 : 5}
                    textAnchor={d.xVal < 0 ? 'end' : 'start'}
                    dy={14}
                    fontSize={12}
                  >
                    {d.xVal < 1000000 ? format(',')(parseFloat(d.xVal.toFixed(2))).replace(',', ' ') : format('.3s')(d.xVal).replace('G', 'B')}
                  </text>
                </g>
              );
            })
          }
          <line
            x1={widthScale(0)}
            x2={widthScale(0)}
            y1={-2.5}
            y2={dataFormatted.length * 25 - 2.5}
            stroke='#212121'
            strokeWidth={1}
          />
        </g>
      </svg>
      {
        hoverData ? <Tooltip data={hoverData} /> : null
      }
    </div>
  );
};
