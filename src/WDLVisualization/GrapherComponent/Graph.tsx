import { useContext, useEffect, useRef, useState } from 'react';
import { Slider } from 'antd';
import { Pause, Play } from 'lucide-react';
import { CountryListType, CtxDataType } from '../Types';
import Context from '../Context/Context';
import { UnivariateMap } from './UnivariateMap';
import { HorizontalBarChart } from './HorizontalBarChart';
import { BarChart } from './BarChart';
import { MultiLineChart } from './MultiLineChart';
import { DisaggregationLineChart } from './DisaggregationLineChart';
import { GroupedBarChart } from './GroupedBarChart';

interface Props {
  countries: CountryListType[];
  countryCode?: string;
}

const getMarks = (arr: number[]) => {
  const marksTemp: any = {};
  arr.forEach(d => {
    marksTemp[`${d}`] = d;
  });
  return marksTemp;
};

export function Graph(props: Props) {
  const { countries, countryCode } = props;
  const {
    year,
    graphType,
    updateYear,
    verticalBarLayout,
    disaggregationGraphType,
  } = useContext(Context) as CtxDataType;
  const [play, setPlay] = useState(false);
  const [yearForPlay, setYearForPlay] = useState<undefined | number>(undefined);
  // eslint-disable-next-line no-undef
  const timer: { current: any } = useRef(null);
  const yearList = Array.from(Array(2035 - 2016).keys(), x => x + 2016);
  const marks = getMarks(yearList);
  useEffect(() => {
    if (play && yearForPlay) {
      timer.current = setInterval(() => {
        setYearForPlay(prevCounter =>
          prevCounter
            ? yearList.indexOf(prevCounter) === yearList.length - 1
              ? yearList[0]
              : yearList[yearList.indexOf(prevCounter) + 1]
            : yearList[0],
        );
      }, 1000);
    }
    if (!play && timer.current) clearInterval(timer.current);
  }, [play]);
  useEffect(() => {
    if (yearForPlay !== undefined) {
      updateYear(yearForPlay as number);
    }
  }, [yearForPlay]);
  return (
    <div
      id='graph-node'
      className={`undp-scrollbar graph-el${
        graphType !== 'barGraph' && graphType !== 'disaggregation'
          ? ' no-overflow'
          : graphType === 'disaggregation' &&
            disaggregationGraphType === 'country'
          ? ' no-overflow'
          : ''
      }`}
    >
      {graphType === 'multiCountryTrendLine' ||
      graphType === 'countryLineChart' ? null : graphType ===
          'disaggregation' && disaggregationGraphType === 'country' ? null : (
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
              <Pause size={24} stroke='#D12800' strokeWidth={1.25} />
            ) : (
              <Play size={24} stroke='#D12800' strokeWidth={1.25} />
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
      )}
      {graphType === 'map' ? (
        <UnivariateMap />
      ) : graphType === 'multiCountryTrendLine' ? (
        <MultiLineChart countries={countries} />
      ) : graphType === 'disaggregation' ? (
        disaggregationGraphType === 'region' ? (
          <GroupedBarChart />
        ) : (
          <DisaggregationLineChart countries={countries} />
        )
      ) : graphType === 'countryLineChart' ? (
        <DisaggregationLineChart
          countries={countries}
          countryCode={countryCode}
        />
      ) : verticalBarLayout ? (
        <HorizontalBarChart />
      ) : (
        <BarChart />
      )}
    </div>
  );
}
