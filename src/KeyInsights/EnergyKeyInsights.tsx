/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { DotPlotSmallMultiples } from './Components/DotPlotRegionSmallMultiples';
import { AnimatedClusterPlot } from './Components/AnimatedClusterPlot';

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

export function EnergyKeyInsights() {
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
                Key Insight: Electricity Access
              </h6>
              <h5 className='undp-typography'>
                Globally, access to electricity grew at an annual average rate
                of 0.7 percentage points between 2010 and 2021. The number of
                people without electricity almost halved during this period,
                dropping from{' '}
                <span className='bold'>
                  1.09 billion in 2012 to 746 million in 2020
                </span>
                . However, achieving full electrification by 2030 requires an
                annual rate of growth in access of 1 percentage point per year
                from 2021 onward—almost twice the current pace.
              </h5>
            </div>
            <div className='flex-div flex-vert-align-center margin-top-07'>
              <img
                src='https://design.undp.org/icons/chevron-left-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
              <p className='undp-typography margin-bottom-00'>Insight 1 of 3</p>
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
            <AnimatedClusterPlot
              dataId='Access to electricity (% of population)'
              isDataPercent
              colorKeys={[
                'People without electricity',
                'No. of People gained access to electricity',
              ]}
              baseYear={2012}
              footer='1 Dot = 1 Million people'
              isDataAccess
              timer={1000}
              scale={0.000001}
            />
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
                Key Insight: Access to electricity
              </h6>
              <h5 className='undp-typography'>
                Despite notable progress made in recent decades, significant
                disparities in electricity access persist. In particular, the
                remote and rural populations in developing regions, such as
                Sub-Saharan Africa, continue to encounter substantial challenges
                in accessing reliable and affordable electrification. Without
                escalated efforts, the world may still fall short of achieving
                universal electrification by 2030.
              </h5>
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
              <p className='undp-typography margin-bottom-00'>Insight 2 of 3</p>
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
            <DotPlotSmallMultiples
              dataId='access_elec_wb'
              title='Access to electricity'
              regions={[
                'WLD',
                'UNDP_SSA',
                'UNDP_AP',
                'UNDP_AS',
                'UNDP_ECA',
                'UNDP_LAC',
              ]}
              footer='*Regions as defined by UNDP Bureaus'
            />
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
                Key Insight: Access to clean cooking
              </h6>
              <h5 className='undp-typography'>
                While a significant portion of the world&apos;s population
                (71.3%) has access to clean cooking technologies, approximately
                2.3 billion people still rely on polluting fuels and inefficient
                methods for cooking. The use of traditional biomass for cooking
                will continue to claim millions of lives each year while
                perpetuating gender inequity, deforestation, and negative
                climate impacts unless efforts are rapidly scaled up.
              </h5>
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
              <p className='undp-typography margin-bottom-00'>Insight 3 of 3</p>
              <img
                src='https://design.undp.org/icons/chevron-right-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
            </div>
          </ColumnEl>
          <GraphColumnEl>
            <DotPlotSmallMultiples
              dataId='access_fuel_tech_wb'
              title='Access to clean cooking'
              regions={[
                'WLD',
                'UNDP_SSA',
                'UNDP_AP',
                'UNDP_AS',
                'UNDP_ECA',
                'UNDP_LAC',
              ]}
              footer='*Regions as defined by UNDP Bureaus'
            />
          </GraphColumnEl>
        </div>
      </WrapperEl>
    </div>
  );
}
