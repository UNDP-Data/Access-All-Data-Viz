import { useContext, useEffect, useRef, useState } from 'react';
import { Slider } from 'antd';
import intersection from 'lodash.intersection';
import { Pause, Play } from 'lucide-react';
import {
  CountryGroupDataType,
  CountryListType,
  CtxDataType,
  IndicatorMetaDataType,
} from '../Types';
import Context from '../Context/Context';
import { HorizontalBarChart } from './HorizontalBarChart';
import { ScatterPlot } from './ScatterPlot';
import { BiVariateMap } from './BiVariateMap';
import { UnivariateMap } from './UnivariateMap';
import { MultiLineChart } from './MultiLineChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { DataList } from './DataList';
import { GetYearsArray } from '../Utils/GetYearsArray';
import { DumbbellChart } from './DumbbellChart';
import { DisaggregationLineChart } from './LineChartDisaggregation';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  countries: CountryListType[];
  UNDPRegion?: string;
  regionData?: CountryGroupDataType;
}

const getMarks = (arr: number[]) => {
  const marksTemp: any = {};
  arr.forEach(d => {
    marksTemp[`${d}`] = d;
  });
  return marksTemp;
};

export function Graph(props: Props) {
  const { data, indicators, countries, UNDPRegion, regionData } = props;
  const {
    year,
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    disaggregationGraphType,
    showMostRecentData,
    disaggregationIndicator,
    updateYear,
    verticalBarLayout,
  } = useContext(Context) as CtxDataType;
  const [commonYears, setCommonYears] = useState<number[]>([]);
  const [marks, setMarks] = useState<any>(undefined);
  const [play, setPlay] = useState(false);
  const [yearForPlay, setYearForPlay] = useState<undefined | number>(undefined);
  // eslint-disable-next-line no-undef
  const timer: { current: NodeJS.Timeout | null } = useRef(null);
  useEffect(() => {
    setPlay(false);
    if (graphType === 'disaggregation' && disaggregationIndicator) {
      setCommonYears(
        GetYearsArray(
          data,
          indicators[
            indicators.findIndex(
              d =>
                d.id === disaggregationIndicator.DisaggregatedIndicators[0].id,
            )
          ],
        ),
      );
      setMarks(
        getMarks(
          GetYearsArray(
            data,
            indicators[
              indicators.findIndex(
                d =>
                  d.id ===
                  disaggregationIndicator.DisaggregatedIndicators[0].id,
              )
            ],
          ),
        ),
      );
      const yearList = GetYearsArray(
        data,
        indicators[
          indicators.findIndex(
            d => d.id === disaggregationIndicator.DisaggregatedIndicators[0].id,
          )
        ],
      );
      updateYear(yearList[yearList.length - 1]);
      setYearForPlay(yearList[yearList.length - 1]);
    } else if (graphType !== 'barGraph') {
      if (yAxisIndicator) {
        if (!sizeIndicator) {
          const intersectedYears = intersection(
            GetYearsArray(
              data,
              indicators[
                indicators.findIndex(d => d.DataKey === xAxisIndicator)
              ],
            ),
            GetYearsArray(
              data,
              indicators[
                indicators.findIndex(d => d.DataKey === yAxisIndicator)
              ],
            ),
          );
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(
            intersectedYears.length === 0
              ? -1
              : intersectedYears[intersectedYears.length - 1],
          );
          setYearForPlay(
            intersectedYears.length === 0
              ? undefined
              : intersectedYears[intersectedYears.length - 1],
          );
        } else {
          const intersectedYears = intersection(
            GetYearsArray(
              data,
              indicators[
                indicators.findIndex(d => d.DataKey === xAxisIndicator)
              ],
            ),
            GetYearsArray(
              data,
              indicators[
                indicators.findIndex(d => d.DataKey === yAxisIndicator)
              ],
            ),
            GetYearsArray(
              data,
              indicators[
                indicators.findIndex(d => d.DataKey === sizeIndicator)
              ],
            ),
          );
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(
            intersectedYears.length === 0
              ? -1
              : intersectedYears[intersectedYears.length - 1],
          );
          setYearForPlay(
            intersectedYears.length === 0
              ? undefined
              : intersectedYears[intersectedYears.length - 1],
          );
        }
      } else if (!sizeIndicator) {
        setCommonYears(
          GetYearsArray(
            data,
            indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)],
          ),
        );
        setMarks(
          getMarks(
            GetYearsArray(
              data,
              indicators[
                indicators.findIndex(d => d.DataKey === xAxisIndicator)
              ],
            ),
          ),
        );
        const yearList = GetYearsArray(
          data,
          indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)],
        );
        updateYear(yearList[yearList.length - 1]);
        setYearForPlay(yearList[yearList.length - 1]);
      } else {
        const intersectedYears = intersection(
          GetYearsArray(
            data,
            indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)],
          ),
          GetYearsArray(
            data,
            indicators[indicators.findIndex(d => d.DataKey === sizeIndicator)],
          ),
        );
        setCommonYears(intersectedYears);
        setMarks(getMarks(intersectedYears));
        updateYear(
          intersectedYears.length === 0
            ? -1
            : intersectedYears[intersectedYears.length - 1],
        );
        setYearForPlay(
          intersectedYears.length === 0
            ? undefined
            : intersectedYears[intersectedYears.length - 1],
        );
      }
    } else {
      setCommonYears(
        GetYearsArray(
          data,
          indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)],
        ),
      );
      setMarks(
        getMarks(
          GetYearsArray(
            data,
            indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)],
          ),
        ),
      );
      const yearList = GetYearsArray(
        data,
        indicators[indicators.findIndex(d => d.DataKey === xAxisIndicator)],
      );
      updateYear(yearList[yearList.length - 1]);
      setYearForPlay(yearList[yearList.length - 1]);
    }
  }, [
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    graphType,
    data,
    disaggregationIndicator,
  ]);
  useEffect(() => {
    if (play && yearForPlay) {
      timer.current = setInterval(() => {
        setYearForPlay(prevCounter =>
          prevCounter
            ? commonYears.indexOf(prevCounter) === commonYears.length - 1
              ? commonYears[0]
              : commonYears[commonYears.indexOf(prevCounter) + 1]
            : commonYears[0],
        );
      }, 1000);
    }
    if (!play && timer.current) clearInterval(timer.current);
  }, [play, commonYears]);
  useEffect(() => {
    if (yearForPlay !== undefined) {
      updateYear(yearForPlay as number);
    }
  }, [yearForPlay]);
  return (
    <div
      id='graph-node'
      className={`undp-scrollbar graph-el${
        graphType !== 'barGraph' &&
        graphType !== 'dataList' &&
        graphType !== 'disaggregation'
          ? ' no-overflow'
          : graphType === 'disaggregation' &&
            disaggregationGraphType === 'country'
          ? ' no-overflow'
          : ''
      }`}
    >
      {graphType === 'trendLine' ||
      graphType === 'multiCountryTrendLine' ||
      graphType === 'dataList' ? null : commonYears.length > 1 &&
        !showMostRecentData ? (
        <div className='slider-background'>
          <button
            className='undp-button button-no-background'
            type='button'
            aria-label='Click to play or stop time animation'
            onClick={() => {
              setPlay(!play);
            }}
          >
            {play ? (
              <Pause size={24} stroke='#D12800' />
            ) : (
              <Play size={24} stroke='#D12800' />
            )}
          </button>
          <Slider
            min={marks[Object.keys(marks)[0]]}
            max={marks[Object.keys(marks)[Object.keys(marks).length - 1]]}
            marks={marks}
            step={null}
            value={year}
            style={{ width: '97%', margin: '0 auto' }}
            onChange={d => {
              updateYear(d);
              setYearForPlay(d);
            }}
            className='undp-slider'
            tooltip={{
              open: true,
              placement: 'bottom',
              prefixCls: 'undp-slider-tooltip',
              getPopupContainer: triggerNode =>
                triggerNode.parentNode as HTMLElement,
            }}
          />
        </div>
      ) : commonYears.length === 0 || showMostRecentData ? (
        <div className='error-el'>
          {commonYears.length === 0
            ? 'The data selected are not available for the same years therefore showing the last available data for all the countries.'
            : 'Showing the last available data for all the countries.'}
        </div>
      ) : (
        <div className='info-el'>
          The common year for the data selected is {commonYears[0]}
        </div>
      )}
      {graphType === 'scatterPlot' ? (
        yAxisIndicator ? (
          <ScatterPlot
            UNDPRegion={UNDPRegion}
            data={data}
            indicators={indicators}
            regionData={regionData}
          />
        ) : null
      ) : graphType === 'map' ? (
        yAxisIndicator ? (
          <BiVariateMap
            UNDPRegion={UNDPRegion}
            data={data}
            indicators={indicators}
          />
        ) : (
          <UnivariateMap
            UNDPRegion={UNDPRegion}
            data={data}
            indicators={indicators}
          />
        )
      ) : graphType === 'barGraph' ? (
        verticalBarLayout ? (
          <HorizontalBarChart
            UNDPRegion={UNDPRegion}
            data={data}
            indicators={indicators}
            regionData={regionData}
          />
        ) : (
          <BarChart
            UNDPRegion={UNDPRegion}
            data={data}
            indicators={indicators}
            regionData={regionData}
          />
        )
      ) : graphType === 'trendLine' ? (
        <LineChart data={data} indicators={indicators} countries={countries} />
      ) : graphType === 'dataList' ? (
        <DataList indicators={indicators} countries={countries} />
      ) : graphType === 'disaggregation' ? (
        disaggregationGraphType === 'global' ? (
          <DumbbellChart
            UNDPRegion={UNDPRegion}
            data={data}
            indicators={indicators}
          />
        ) : (
          <DisaggregationLineChart
            data={data}
            indicators={indicators}
            countries={countries}
          />
        )
      ) : (
        <MultiLineChart
          data={data}
          indicators={indicators}
          countries={countries}
          regionData={regionData}
        />
      )}
    </div>
  );
}
