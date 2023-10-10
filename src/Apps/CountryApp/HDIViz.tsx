import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import sortBy from 'lodash.sortby';
import {
  CountryTaxonomyDataType,
  IndicatorSimplifiedDataType,
} from '../../Types';
import { ComponentCard } from './ComponentCard';
import { HDIGraph } from './HDIGraph';

interface Props {
  hdiData: IndicatorSimplifiedDataType;
  lifeExpectancyData: IndicatorSimplifiedDataType;
  meanYearOfSchoolingData: IndicatorSimplifiedDataType;
  gniData: IndicatorSimplifiedDataType;
  country: CountryTaxonomyDataType;
}

const animateLines = keyframes`
  to {
    stroke-dashoffset: -100;
  }
`;

const AnimatedPath = styled.path`
  stroke-dasharray: 5;
  animation: ${animateLines} 4s linear infinite;
`;
const AnimatedLine = styled.line`
  stroke-dasharray: 5;
  animation: ${animateLines} 4s linear infinite;
`;

export function HDIViz(props: Props) {
  const {
    hdiData,
    lifeExpectancyData,
    meanYearOfSchoolingData,
    gniData,
    country,
  } = props;
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  const linksDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (linksDiv.current) {
      setSvgWidth(linksDiv.current.clientWidth);
      setSvgHeight(linksDiv.current.clientHeight);
    }
  }, [linksDiv]);
  const { year } =
    hdiData.countryData[
      hdiData.countryData.findIndex(
        d => d['Alpha-3 code'] === country['Alpha-3 code'],
      )
    ].data[
      hdiData.countryData[
        hdiData.countryData.findIndex(
          d => d['Alpha-3 code'] === country['Alpha-3 code'],
        )
      ].data.length - 1
    ];
  const { value } =
    hdiData.countryData[
      hdiData.countryData.findIndex(
        d => d['Alpha-3 code'] === country['Alpha-3 code'],
      )
    ].data[
      hdiData.countryData[
        hdiData.countryData.findIndex(
          d => d['Alpha-3 code'] === country['Alpha-3 code'],
        )
      ].data.length - 1
    ];

  const dataArray = sortBy(
    hdiData.countryData
      .filter(d => d.data.findIndex(el => el.year === year) !== -1)
      .map(d => d.data[d.data.findIndex(el => el.year === year)]),
    d => d.value,
  ).reverse();
  return (
    <div
      className='flex-div gap-00 margin-top-07 margin-bottom-07'
      style={{
        alignItems: 'stretch',
      }}
    >
      <div
        className='flex-div'
        style={{
          width: '45%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--spacing-05)',
        }}
      >
        <ComponentCard
          data={lifeExpectancyData}
          year={year}
          country={country['Alpha-3 code']}
          title='Life expectancy at birth'
          tabText='Long and healthy life'
          highlightColor='var(--dark-azure)'
        />
        <ComponentCard
          data={meanYearOfSchoolingData}
          year={year}
          country={country['Alpha-3 code']}
          title='Expected years of schooling'
          tabText='Education'
          highlightColor='var(--blue-500)'
        />
        <ComponentCard
          data={gniData}
          year={year}
          country={country['Alpha-3 code']}
          title='Gross national income per capita (PPP US $)'
          tabText='Decent standard of living'
          highlightColor='var(--dark-green)'
        />
      </div>
      <div
        className='flex-div'
        style={{
          width: '10%',
        }}
        ref={linksDiv}
      >
        {svgWidth && svgHeight ? (
          <svg width={svgWidth} height={svgHeight}>
            <AnimatedPath
              d={`M0,${svgHeight / 6} C${svgWidth / 2},${svgHeight / 6} 0,${
                svgHeight / 2 - 5
              } ${svgWidth},${svgHeight / 2 - 5}`}
              style={{
                stroke: 'var(--dark-azure)',
                strokeWidth: 2,
                strokeOpacity: 0.6,
                fill: 'none',
              }}
            />
            <AnimatedPath
              d={`M0,${(5 * svgHeight) / 6} C${svgWidth / 2},${
                (5 * svgHeight) / 6
              } 0,${svgHeight / 2 + 5} ${svgWidth},${svgHeight / 2 + 5}`}
              style={{
                stroke: 'var(--dark-green)',
                strokeWidth: 2,
                strokeOpacity: 0.6,
                fill: 'none',
              }}
            />
            <AnimatedLine
              x1={0}
              x2={svgWidth}
              y1={svgHeight / 2}
              y2={svgHeight / 2}
              style={{
                stroke: 'var(--blue-500)',
                strokeWidth: 2,
                strokeOpacity: 0.6,
                fill: 'none',
              }}
            />
          </svg>
        ) : null}
      </div>
      <div
        className='flex-div'
        style={{
          width: '45%',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'var(--spacing-05)',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--white)',
            paddingBottom: 'var(--spacing-05)',
          }}
        >
          <div
            style={{
              padding:
                'var(--spacing-05) var(--spacing-05) 0 var(--spacing-05)',
            }}
          >
            <h6 className='undp-typography'>Human Development Index</h6>
          </div>
          <hr className='undp-style margin-bottom-06 light' />
          <div
            style={{
              padding: '0 var(--spacing-05)',
              flexGrow: 1,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-03)',
              }}
            >
              <p className='undp-typography'>
                <span className='bold'>
                  {country['Country or Area']}&apos;s
                </span>{' '}
                Human Development Index value for {year} is{' '}
                <span className='bold'>{value}</span> — which put the country in
                the{' '}
                <span
                  className='bold'
                  style={{
                    color:
                      value < 0.55
                        ? 'var(--dark-red)'
                        : value < 0.7
                        ? 'var(--dark-yellow)'
                        : value < 0.8
                        ? 'var(--blue-400)'
                        : 'var(--blue-700)',
                  }}
                >
                  {value < 0.55
                    ? 'Low'
                    : value < 0.7
                    ? 'Medium'
                    : value < 0.8
                    ? 'High'
                    : 'Very high'}
                </span>{' '}
                human development category — positioning it at{' '}
                <span className='bold'>
                  {dataArray.findIndex(el => el.value === value) + 1} out of{' '}
                  {dataArray.length}
                </span>{' '}
                countries and territories.
              </p>
            </div>
            <div style={{ width: '100%' }}>
              <HDIGraph
                data={hdiData}
                year={year}
                country={country['Alpha-3 code']}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
