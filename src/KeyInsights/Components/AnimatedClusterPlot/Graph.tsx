import { useEffect, useRef, useState } from 'react';
import { format } from 'd3-format';
import styled from 'styled-components';
import { IndicatorDataType } from '../../../Types';
import { AnimatedDotsG } from './AnimatedDots';

interface CoordinatesProps {
  x: number;
  y: number;
  distanceFromCenter: number;
}

interface Props {
  dots: CoordinatesProps[];
  data: IndicatorDataType;
  colorKeys: [string, string];
  baseYear: number;
  timer: number;
  scale: number;
}

const ColorKey = styled.div`
  width: auto;
  @media (max-width: 960px) {
    width: 100%;
  }
`;

export function Graph(props: Props) {
  const { dots, data, colorKeys, baseYear, timer, scale } = props;
  const [year, setYear] = useState(data.yearlyData[0].year);
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(prevCounter =>
        prevCounter + 1 > data.yearlyData[data.yearlyData.length - 1].year + 3
          ? data.yearlyData[0].year
          : prevCounter + 1,
      );
    }, timer);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(
        graphDiv.current.clientHeight < (graphDiv.current.clientWidth * 9) / 16
          ? (graphDiv.current.clientWidth * 9) / 16
          : graphDiv.current.clientHeight,
      );
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <>
      <div className='flex-div flex-vert-align-center gap-05 flex-wrap'>
        <ColorKey
          className='flex-div gap-03 flex-vert-align-center'
          style={{ flexShrink: 0 }}
        >
          <div
            style={{
              backgroundColor: 'var(--gray-600)',
              height: '10px',
              width: '10px',
              borderRadius: '1rem',
            }}
          />
          <p
            className='undp-typography margin-bottom-00'
            style={{ color: 'var(--gray-600)', fontSize: '1rem' }}
          >
            <span className='bold'>
              {format('.3s')(
                data.yearlyData[
                  data.yearlyData.findIndex(el =>
                    year > data.yearlyData[data.yearlyData.length - 1].year
                      ? el.year ===
                        data.yearlyData[data.yearlyData.length - 1].year
                      : el.year === year,
                  )
                ].value,
              ).replace('G', 'B')}
            </span>{' '}
            {colorKeys[0]}
          </p>
        </ColorKey>
        <ColorKey
          className='flex-div gap-03 flex-vert-align-center'
          style={{ flexShrink: 0 }}
        >
          <div
            style={{
              backgroundColor: 'var(--blue-600)',
              height: '10px',
              width: '10px',
              borderRadius: '1rem',
            }}
          />
          <p
            className='undp-typography margin-bottom-00'
            style={{ color: 'var(--gray-600)', fontSize: '1rem' }}
          >
            <span className='bold' style={{ color: 'var(--blue-600)' }}>
              {format('.3s')(
                data.yearlyData[
                  data.yearlyData.findIndex(el => el.year === baseYear)
                ].value -
                  data.yearlyData[
                    data.yearlyData.findIndex(el =>
                      year > data.yearlyData[data.yearlyData.length - 1].year
                        ? el.year ===
                          data.yearlyData[data.yearlyData.length - 1].year
                        : el.year === year,
                    )
                  ].value,
              ).replace('G', 'B')}
            </span>{' '}
            {colorKeys[1]}
          </p>
        </ColorKey>
      </div>
      <div style={{ flexGrow: 1 }} ref={graphDiv}>
        {svgWidth && svgHeight ? (
          <AnimatedDotsG
            dots={dots}
            year={
              year > data.yearlyData[data.yearlyData.length - 1].year
                ? data.yearlyData[data.yearlyData.length - 1].year
                : year
            }
            val={
              dots.length -
              Math.round(
                data.yearlyData[
                  data.yearlyData.findIndex(el =>
                    year > data.yearlyData[data.yearlyData.length - 1].year
                      ? el.year ===
                        data.yearlyData[data.yearlyData.length - 1].year
                      : el.year === year,
                  )
                ].value * scale,
              )
            }
            svgWidth={svgWidth}
            svgHeight={svgHeight}
          />
        ) : (
          <div className='undp-loader-container undp-container'>
            <div className='undp-loader' />
          </div>
        )}
      </div>
    </>
  );
}
