import { useContext, useState } from 'react';
import { format } from 'd3-format';
import maxBy from 'lodash.maxby';
import orderBy from 'lodash.orderby';
import { scaleLinear } from 'd3-scale';
import minBy from 'lodash.minby';
import UNDPColorModule from 'undp-viz-colors';
import styled from 'styled-components';
import max from 'lodash.max';
import min from 'lodash.min';
import {
  CountryGroupDataType,
  CtxDataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import { Tooltip } from '../../Components/Tooltip';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  svgWidth: number;
}

interface ColorKeyDivProps {
  color: string;
}

const ColorKeyDiv = styled.div<ColorKeyDivProps>`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${props => props.color};
  border-radius: 0.75rem;
  margin-bottom: var(--spacing-01);
`;

export function Graph(props: Props) {
  const { data, indicators, svgWidth } = props;
  const {
    year,
    disaggregationIndicator,
    reverseOrder,
    showMostRecentData,
    selectedCountries,
    selectedRegions,
    selectedIncomeGroups,
    selectedCountryGroup,
    disaggregationOrder,
  } = useContext(Context) as CtxDataType;
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 50,
    bottom: 50,
    left: 175,
    right: 20,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const dataFormatted = orderBy(
    data
      .map(d => {
        const valArr = disaggregationIndicator
          ? disaggregationIndicator.DisaggregatedIndicators.map(ind => {
              const indicatorIndex = d.indicators.findIndex(
                el => ind.DataKey === el.indicator,
              );
              const val =
                indicatorIndex === -1
                  ? undefined
                  : year !== -1 && !showMostRecentData
                  ? d.indicators[indicatorIndex].yearlyData[
                      d.indicators[indicatorIndex].yearlyData.findIndex(
                        el => el.year === year,
                      )
                    ]?.value
                  : d.indicators[indicatorIndex].yearlyData[
                      d.indicators[indicatorIndex].yearlyData.length - 1
                    ]?.value;
              return val;
            })
          : [];

        const countryGroup =
          selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];
        const incomeGroup = !!(
          selectedIncomeGroups.length === 0 ||
          selectedIncomeGroups.indexOf(d['Income group']) !== -1
        );
        const region = !!(
          selectedRegions.length === 0 ||
          selectedRegions.indexOf(d['Group 2']) !== -1
        );
        const country = !!(
          selectedCountries.length === 0 ||
          selectedCountries.indexOf(d['Country or Area']) !== -1
        );
        const indicatorYear = disaggregationIndicator
          ? disaggregationIndicator.DisaggregatedIndicators.map(ind => {
              const indicatorIndex = d.indicators.findIndex(
                el => ind.DataKey === el.indicator,
              );
              const val =
                year === -1 || showMostRecentData
                  ? d.indicators[indicatorIndex]?.yearlyData[
                      d.indicators[indicatorIndex].yearlyData.length - 1
                    ]?.year
                  : year;
              return val;
            })
          : [];
        return {
          countryCode: d['Alpha-3 code'],
          countryName: d['Country or Area'],
          valArr,
          maxValue: max(valArr.filter(el => el !== undefined)),
          minValue: min(valArr.filter(el => el !== undefined)),
          region,
          countryGroup,
          incomeGroup,
          country,
          indicatorYear,
          firstVal: valArr[0],
          secondVal: valArr[1],
          diff:
            valArr[1] !== undefined && valArr[0] !== undefined
              ? valArr[0] - valArr[1]
              : undefined,
        };
      })
      .filter(
        d =>
          d.valArr.filter(el => el !== undefined).length > 0 &&
          d.country &&
          d.countryGroup &&
          d.incomeGroup &&
          d.region,
      ),
    disaggregationIndicator?.DisaggregationType === 'Gender' ||
      disaggregationIndicator?.DisaggregationType === 'Urban/Rural'
      ? disaggregationOrder === 'first'
        ? 'firstVal'
        : disaggregationOrder === 'second'
        ? 'secondVal'
        : 'diff'
      : 'countryName',
    reverseOrder ? 'desc' : 'asc',
  );
  const svgHeight = dataFormatted.length * 25 + margin.top + margin.bottom;
  const xMaxValue = maxBy(dataFormatted, d => d.maxValue)
    ? (maxBy(dataFormatted, d => d.maxValue)?.maxValue as number)
    : 0;
  const xMinValue = minBy(dataFormatted, d => d.minValue)
    ? (minBy(dataFormatted, d => d.minValue)?.minValue as number)
    : 0;
  const xScale = scaleLinear()
    .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
    .range([0, graphWidth])
    .nice();

  const xTicks = xScale.ticks(5);

  const colorArray =
    disaggregationIndicator?.DisaggregationType === 'Gender'
      ? [
          UNDPColorModule.categoricalColors.genderColors.female,
          UNDPColorModule.categoricalColors.genderColors.male,
          'var(--gray-500)',
        ]
      : disaggregationIndicator?.DisaggregationType === 'Urban/Rural'
      ? [
          UNDPColorModule.categoricalColors.locationColors.urban,
          UNDPColorModule.categoricalColors.locationColors.rural,
          'var(--gray-500)',
        ]
      : UNDPColorModule.categoricalColors.colors;

  return (
    <>
      <div
        className='flex-div flex-vert-align-center flex-hor-align-center margin-top-07'
        style={{ flexWrap: 'wrap' }}
      >
        {disaggregationIndicator?.DisaggregatedIndicators.map((d, i) => (
          <div key={i} className='flex-div flex-vert-align-center gap-02'>
            <ColorKeyDiv color={colorArray[i]} />
            <p className='undp-typography small-font margin-bottom-00'>
              {d.key}
            </p>
          </div>
        ))}
      </div>
      {dataFormatted.length > 0 ? (
        <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {xTicks.map((d, i) => (
              <g key={i}>
                <text
                  x={xScale(d)}
                  y={-12.5}
                  fill='#AAA'
                  textAnchor='middle'
                  fontSize={12}
                >
                  {Math.abs(d) < 1 ? d : format('~s')(d).replace('G', 'B')}
                </text>
                <line
                  x1={xScale(d)}
                  x2={xScale(d)}
                  y1={-2.5}
                  y2={dataFormatted.length * 25 - 2.5}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                  opacity={d === 0 ? 0 : 1}
                />
              </g>
            ))}
            {dataFormatted.map((d, i) => {
              const countryData =
                data[
                  data.findIndex(el => el['Alpha-3 code'] === d.countryCode)
                ];
              if (d.valArr.length === 0) return null;
              const rowData: HoverRowDataType[] = d.valArr
                .map((el, j) => {
                  const indicatorIndex = disaggregationIndicator
                    ? indicators.findIndex(
                        indicator =>
                          indicator.id ===
                          disaggregationIndicator.DisaggregatedIndicators[j].id,
                      )
                    : undefined;
                  if (indicatorIndex === undefined)
                    return {
                      type: 'color' as 'x-axis' | 'y-axis' | 'color' | 'size',
                    };
                  return {
                    title: indicators[indicatorIndex].IndicatorLabel,
                    value: el !== null && el !== undefined ? el : 'NA',
                    type: 'color' as 'x-axis' | 'y-axis' | 'color' | 'size',
                    color: colorArray[j],
                    year: d.indicatorYear[j],
                    prefix: indicators[indicatorIndex]?.LabelPrefix,
                    suffix: indicators[indicatorIndex]?.LabelSuffix,
                  };
                })
                .filter(el => el.title);
              return (
                <g key={i} transform={`translate(0,${i * 25 + 12.5})`}>
                  <text
                    fill='#212121'
                    y={0}
                    x={0}
                    dx={-15}
                    dy={2.5}
                    fontSize={12}
                    textAnchor='end'
                  >
                    {d.countryName.length < 25
                      ? d.countryName
                      : `${d.countryName.substring(0, 25)}...`}
                  </text>
                  <line
                    x1={0}
                    x2={graphWidth}
                    y1={0}
                    y2={0}
                    strokeWidth={1}
                    fill='none'
                    stroke={UNDPColorModule.graphGray}
                  />
                  <line
                    x1={
                      d.minValue !== undefined && d.maxValue !== undefined
                        ? xScale(d.minValue)
                        : xScale(0)
                    }
                    x2={
                      d.minValue !== undefined && d.maxValue !== undefined
                        ? xScale(d.maxValue)
                        : xScale(0)
                    }
                    y1={0}
                    y2={0}
                    style={{
                      stroke: 'var(--gray-600)',
                      strokeWidth: 1,
                      fill: 'none',
                    }}
                  />
                  {d.valArr.map((el, j) =>
                    el !== undefined ? (
                      <circle
                        key={j}
                        cy={0}
                        cx={xScale(el)}
                        style={{
                          fill: colorArray[j],
                          stroke: colorArray[j],
                          fillOpacity: 0.75,
                          strokeWidth: 1,
                        }}
                        r={5.5}
                        onMouseEnter={event => {
                          setHoverData({
                            country: countryData['Country or Area'],
                            continent: countryData['Group 1'],
                            rows: rowData,
                            xPosition: event.clientX,
                            yPosition: event.clientY,
                          });
                        }}
                        onMouseMove={event => {
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
                      />
                    ) : null,
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      ) : (
        <div style={{ padding: 'var(--spacing-07)' }}>
          <p
            className='undp-typography bold'
            style={{
              textAlign: 'center',
              backgroundColor: 'var(--gray-200)',
              border: '1px solid var(--red)',
              borderRadius: '0.25rem',
              padding: 'var(--spacing-03)',
              color: 'var(--dark-red)',
            }}
          >
            No Data available
          </p>
        </div>
      )}
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
