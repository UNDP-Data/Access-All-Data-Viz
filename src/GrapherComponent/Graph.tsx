import {
  useContext, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { Slider } from 'antd';
import intersection from 'lodash.intersection';
import {
  CountryGroupDataType, CountryListType, CtxDataType, IndicatorMetaDataWithYear,
} from '../Types';
import Context from '../Context/Context';
import { HorizontalBarChart } from './HorizontalBarChart';
import { ScatterPlot } from './ScatterPlot';
import { BivariateMap } from './BivariateMap';
import { UnivariateMap } from './UnivariateMap';
import { DualAxisLineChart } from './DualAxisLineChart';
import { MultiLineChart } from './MultiLineChart';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PauseIcon, PlayIcon } from '../Icons';
import { DataList } from './DataList';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
  countries: CountryListType[];
  fullWidth: boolean;
}

interface ElProps {
  fullWidth: boolean;
}

const El = styled.div<ElProps>`
  width: ${(props) => (props.fullWidth ? '100%' : '75%')};
  box-shadow: var(--shadow-right);
  flex-grow: 1;
  overflow: auto;
  @media (min-width: 961px) {
    height: 100vh;
    min-height: (46.25rem + 4rem);
  }
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const SliderEl = styled.div`
  padding: var(--spacing-06) var(--spacing-06) var(--spacing-08) var(--spacing-06);
  display: flex;
  align-items: center;
  background-color: var(--gray-200);
  border-bottom: 1px solid var(--gray-400);
  position: sticky;
  top: 0;
`;

const ErrorNote = styled.div`
  padding: 1rem 1.25rem;
  background-color: var(--light-red);
  color: var(--dark-red);
  text-align: center;
  align-items: center;
  position: sticky;
  font-size: 1.5rem;
  font-weight: bold;
  top: 0;
`;

const InfoNote = styled.div`
  padding: 1rem 1.25rem;
  background-color: var(--blue-200);
  color: var(--blue-700);
  text-align: center;
  align-items: center;
  position: sticky;
  font-size: 1.5rem;
  font-weight: bold;
  top: 0;
`;

const Button = styled.button`
  background-color: transparent !important;
  padding: 0 !important;
  border: none !important;
`;

const getMarks = (arr: number[]) => {
  const marksTemp: any = {};
  arr.forEach((d) => {
    marksTemp[`${d}`] = d;
  });
  return marksTemp;
};

export const Graph = (props: Props) => {
  const {
    data,
    indicators,
    countries,
    fullWidth,
  } = props;
  const {
    year,
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    showMostRecentData,
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
    if (graphType !== 'barGraph') {
      if (yAxisIndicator) {
        if (!sizeIndicator) {
          const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years, indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)].years);
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
          setYearForPlay(intersectedYears.length === 0 ? undefined : intersectedYears[intersectedYears.length - 1]);
        } else {
          const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years,
            indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)].years,
            indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)].years);
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
          setYearForPlay(intersectedYears.length === 0 ? undefined : intersectedYears[intersectedYears.length - 1]);
        }
      } else if (!sizeIndicator) {
        setCommonYears(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years);
        setMarks(getMarks(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years));
        updateYear(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
        setYearForPlay(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
      } else {
        const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years, indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)].years);
        setCommonYears(intersectedYears);
        setMarks(getMarks(intersectedYears));
        updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
        setYearForPlay(intersectedYears.length === 0 ? undefined : intersectedYears[intersectedYears.length - 1]);
      }
    } else {
      setCommonYears(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years);
      setMarks(getMarks(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years));
      updateYear(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
      setYearForPlay(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
    }
  }, [xAxisIndicator, yAxisIndicator, sizeIndicator, graphType]);
  useEffect(() => {
    if (play && yearForPlay) {
      timer.current = setInterval(() => {
        setYearForPlay((prevCounter) => (prevCounter ? commonYears.indexOf(prevCounter) === commonYears.length - 1 ? commonYears[0] : commonYears[commonYears.indexOf(prevCounter) + 1] : commonYears[0]));
      }, 1000);
    }
    if (!play && timer.current) clearInterval(timer.current);
  }, [play, commonYears]);
  useEffect(() => {
    if (yearForPlay !== undefined) { updateYear(yearForPlay as number); }
  }, [yearForPlay]);
  return (
    <El
      id='graph-node'
      fullWidth={fullWidth}
      className='undp-scrollbar'
    >
      {
        graphType === 'trendLine' || graphType === 'multiCountryTrendLine' || graphType === 'dataList' ? null
          : commonYears.length > 1 && !showMostRecentData ? (
            <SliderEl>
              <Button onClick={() => { setPlay(!play); }} role='button'>
                {
                  play
                    ? <PauseIcon size={24} fill='#D12800' />
                    : <PlayIcon size={24} fill='#D12800' />
                }
              </Button>
              <Slider
                min={marks[Object.keys(marks)[0]]}
                max={marks[Object.keys(marks)[Object.keys(marks).length - 1]]}
                marks={marks}
                step={null}
                value={year}
                style={{ width: '97%', margin: '0 auto' }}
                onChange={(d) => { updateYear(d); setYearForPlay(d); }}
                className='undp-slider'
                tooltip={{ open: true, prefixCls: 'undp-slider-tooltip' }}
              />
            </SliderEl>
          ) : commonYears.length === 0 || showMostRecentData ? (
            <ErrorNote>
              {
                commonYears.length === 0
                  ? 'The data selected are not available for the same years therefore showing the last available data for all the countries.'
                  : 'Showing the last available data for all the countries.'
              }
            </ErrorNote>
          ) : (
            <InfoNote>
              The common year for the data selected is
              {' '}
              {commonYears[0]}
            </InfoNote>
          )
      }
      {
        graphType === 'scatterPlot'
          ? yAxisIndicator
            ? (
              <ScatterPlot
                data={data}
                indicators={indicators}
              />
            ) : null
          : graphType === 'map'
            ? yAxisIndicator
              ? (
                <BivariateMap
                  data={data}
                  indicators={indicators}
                />
              )
              : (
                <UnivariateMap
                  data={data}
                  indicators={indicators}
                />
              )
            : graphType === 'barGraph'
              ? verticalBarLayout ? (
                <HorizontalBarChart
                  data={data}
                  indicators={indicators}
                />
              )
                : (
                  <BarChart
                    data={data}
                    indicators={indicators}
                  />
                )
              : graphType === 'trendLine'
                ? yAxisIndicator
                  ? (
                    <DualAxisLineChart
                      data={data}
                      indicators={indicators}
                      countries={countries}
                    />
                  )
                  : (
                    <LineChart
                      data={data}
                      indicators={indicators}
                      countries={countries}
                    />
                  )
                : graphType === 'dataList'
                  ? (
                    <DataList
                      data={data}
                      indicators={indicators}
                      countries={countries}
                    />
                  )
                  : (
                    <MultiLineChart
                      data={data}
                      indicators={indicators}
                      countries={countries}
                    />
                  )

      }
    </El>
  );
};
