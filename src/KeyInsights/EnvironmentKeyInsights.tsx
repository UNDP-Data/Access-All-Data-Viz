/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { ParticleColumnChart } from './Components/AnimatedParticleChart';
import { GHGEmissionGraph } from './Components/GHGGraph';

const ColumnEl = styled.div`
  width: calc(50% - 1rem);
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const GraphColumnEl = styled.div`
  width: calc(50% - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--spacing-05);
  padding: var(--spacing-05);
  background-color: var(--white);
  @media (max-width: 960px) {
    width: 100%;
  }
`;

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
    <div
      style={{
        padding: '0 var(--spacing-07)',
      }}
    >
      <WrapperEl
        className='flex-div stat-container undp-scrollbar'
        ref={WrapperRef}
      >
        <div
          className='flex-div flex-wrap gap-07 padding-bottom-07'
          style={{
            padding: 'var(--spacing-07) 0',
            minWidth: '100%',
            scrollSnapAlign: 'start',
          }}
        >
          <ColumnEl>
            <div>
              <h6 className='undp-typography'>
                Key Insight: Greenhouse Gas Emissions
              </h6>
              <h5 className='undp-typography'>
                As greenhouse gas concentrations continue to rise, we can
                anticipate an increase in the frequency and intensity of extreme
                weather events. This phenomenon also jeopardizes food security
                and poses health risks.
              </h5>
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
                  if (WrapperRef) WrapperRef.current?.scrollBy(250, 0);
                }}
              />
            </div>
          </ColumnEl>
          <GraphColumnEl>
            <GHGEmissionGraph />
          </GraphColumnEl>
        </div>
        <div
          className='flex-div flex-wrap gap-07 padding-bottom-07'
          style={{
            padding: 'var(--spacing-07) 0',
            minWidth: '100%',
            scrollSnapAlign: 'start',
          }}
        >
          <ColumnEl>
            <div>
              <h6 className='undp-typography'>
                Key Insight: Material Footprint
              </h6>
              <h5 className='undp-typography'>
                To support economic growth and to satisfy the material needs of
                people, the amount of raw materials extracted has been on the
                rise. The material footprint per capita has increased at an
                alarming rate.
              </h5>
              <p className='undp-typography'>
                In 1990, about <span className='bold'>8.1 metric tons</span>{' '}
                about of natural resources were used to satisfy an
                individual&apos;s needs. In 2021, that rose to{' '}
                <span className='bold'>
                  12.3 metric tons, an increase of 50 per cent.
                </span>
              </p>
            </div>
            <div className='flex-div flex-vert-align-center margin-top-07'>
              <img
                src='https://design.undp.org/icons/chevron-left-circle.svg'
                alt='icon'
                style={{ opacity: '1' }}
                onClick={() => {
                  if (WrapperRef) WrapperRef.current?.scrollBy(-250, 0);
                }}
              />
              <p className='undp-typography margin-bottom-00'>Insight 2 of 2</p>
              <img
                src='https://design.undp.org/icons/chevron-right-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
            </div>
          </ColumnEl>
          <GraphColumnEl>
            <ParticleColumnChart
              width={[50, 50]}
              dataId='Material footprint per capita (tonnes)'
              scale={0.00000001}
              backgroundColor={['var(--gray-200)', 'var(--gray-200)']}
              baseYears={[1990]}
              color={['#212121', '#212121']}
              title='Global material footprint in tonnes'
              circleRadius={5}
              suffix='T'
              multiplyByPopulation
              footer='*1 Dot = 100 Megaton'
            />
          </GraphColumnEl>
        </div>
      </WrapperEl>
    </div>
  );
}
