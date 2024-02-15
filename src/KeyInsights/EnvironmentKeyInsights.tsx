/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { ParticleColumnChart } from './Components/AnimatedParticleChart';
import { GHGEmissionGraph } from './Components/GHGGraph';

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

export function EnvironmentKeyInsights() {
  const WrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <WrapperEl
        className='flex-div stat-container undp-scrollbar'
        ref={WrapperRef}
      >
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Greenhouse Gas Emissions
              </p>
              <p className='undp-typography'>
                Global greenhouse gas emissions increased from{' '}
                <span className='bold'>
                  33 billion metric tons in 1990 to 48 billion in 2021
                </span>
                , a rise of 45.5% - a figure equivalent to 25 Billion trees
                seedlings grown for 10 years.
                <br />
                <br />
                This directly influences the frequency and intensity of extreme
                weather events, which also jeopardizes food security and poses
                health risks. While the expenses linked to addressing and
                adapting to climate change are substantial, they remain
                relatively modest when compared to the enormity of the
                challenge.
              </p>
              <br />
              <br />
              <span
                className='undp-typography small-font margin-bottom-00'
                style={{ color: 'var(--gray-600)' }}
              >
                Data source:{' '}
                <a
                  href='https://www.climatewatchdata.org/ghg-emissions'
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style small-font'
                  style={{ color: 'var(--gray-600) !important' }}
                >
                  World Resources Institute (WRI)
                </a>
                . Aggregation methodology for world can be found{' '}
                <a
                  href='https://data.undp.org/sites/g/files/zskgke476/files/2024-02/DFX%20Indicator%20Aggregation%20Methodology.pdf'
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style small-font'
                  style={{ color: 'var(--gray-600) !important' }}
                >
                  here
                </a>
                .
              </span>
            </div>
            <div className='flex-div flex-vert-align-center margin-top-07'>
              <img
                src='https://design.undp.org/icons/chevron-left-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
              <p className='undp-typography margin-bottom-00'>Insight 1 of 2</p>
              <img
                src='https://design.undp.org/icons/chevron-right-circle.svg'
                alt='icon'
                style={{ opacity: '1' }}
                onClick={() => {
                  if (WrapperRef)
                    WrapperRef.current?.scrollBy(
                      window.innerWidth / 2 > 1000
                        ? 1000
                        : window.innerWidth / 2,
                      0,
                    );
                }}
              />
            </div>
          </div>
          <div
            className='insight-card-graph'
            style={{ justifyContent: 'space-between' }}
          >
            <GHGEmissionGraph />
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Material Footprint
              </p>
              <p className='undp-typography'>
                Material footprint refers to the total amount of raw materials
                to meet final consumption demands. To support economic growth
                and to satisfy the material needs of people, the amount of raw
                materials extracted has been on the rise. The material footprint
                per capita has increased at an alarming rate.
                <br />
                <br />
                In 1990, about <span className='bold'>44 billion tons</span> of
                natural resources were used to satisfy population&apos;s needs.
                In 2021, that rose to{' '}
                <span className='bold'>
                  97 billion tons, an increase of 120%.
                </span>
                <br />
                <br />
                <span
                  className='undp-typography small-font margin-bottom-00'
                  style={{ color: 'var(--gray-600)' }}
                >
                  Data source:{' '}
                  <a
                    href='http://hdr.undp.org/en/data'
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style small-font'
                    style={{ color: 'var(--gray-600) !important' }}
                  >
                    United Nations Development Programme (UNDP)
                  </a>
                </span>
              </p>
            </div>
            <div className='flex-div flex-vert-align-center margin-top-07'>
              <img
                src='https://design.undp.org/icons/chevron-left-circle.svg'
                alt='icon'
                style={{ opacity: '1' }}
                onClick={() => {
                  if (WrapperRef)
                    WrapperRef.current?.scrollBy(
                      window.innerWidth / 2 > 1000
                        ? -1000
                        : 0 - window.innerWidth / 2,
                      0,
                    );
                }}
              />
              <p className='undp-typography margin-bottom-00'>Insight 2 of 2</p>
              <img
                src='https://design.undp.org/icons/chevron-right-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
            </div>
          </div>
          <div className='insight-card-graph'>
            <ParticleColumnChart
              width={[50, 50]}
              dataId='Material footprint per capita (tonnes)'
              scale={0.00000001}
              backgroundColor={['var(--gray-200)', 'var(--gray-200)']}
              baseYears={[1990]}
              color={['#55606E', '#55606E']}
              title='Global material footprint in tonnes (2021)'
              circleRadius={5}
              suffix=' tons'
              multiplyByPopulation
              footer='*1 Dot = 100 Megaton'
            />
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
