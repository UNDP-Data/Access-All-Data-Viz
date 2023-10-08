/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { DotPlotSmallMultiples } from './Components/DotPlotRegionSmallMultiples';
import { AnimatedClusterPlot } from './Components/AnimatedClusterPlot';

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
    <div>
      <WrapperEl
        className='flex-div stat-container undp-scrollbar'
        ref={WrapperRef}
      >
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Electricity Access
              </p>
              <p className='undp-typography'>
                Globally, access to electricity grew at an annual average rate
                of 0.7 percentage points between 2010 and 2021. The number of
                people without electricity almost halved during this period,
                dropping from{' '}
                <span className='bold'>
                  1.09 billion in 2012 to 746 million in 2020
                </span>
                .
                <br />
                <br />
                However, achieving full electrification by 2030 requires an
                annual rate of growth in access of 1 percentage point per year
                from 2021 onward—almost twice the current pace.
              </p>
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
          </div>
          <div className='insight-card-graph'>
            <AnimatedClusterPlot
              title='Global Access to Electricity'
              dataId='Access to electricity (% of population)'
              isDataPercent
              colorKeys={['people without access', 'people gained access']}
              baseYear={2012}
              footer='1 Dot = 1 Million people'
              isDataAccess
              timer={1000}
              scale={0.000001}
            />
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Access to electricity
              </p>
              <p className='undp-typography'>
                Despite notable progress made in recent decades, significant
                disparities in electricity access persist.
                <br />
                <br />
                The remote and rural populations in developing regions, such as
                Sub-Saharan Africa, continue to encounter substantial challenges
                in accessing reliable and affordable electrification. Without
                escalated efforts, the world may still fall short of achieving
                universal electrification by 2030.
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
          </div>
          <div className='insight-card-graph'>
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
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Access to clean cooking
              </p>
              <p className='undp-typography'>
                While a significant portion of the world&apos;s population
                (71.3%) has access to clean cooking technologies, approximately
                2.3 billion people still rely on polluting fuels and inefficient
                methods for cooking.
                <br />
                <br />
                The use of traditional biomass for cooking will continue to
                claim millions of lives each year while perpetuating gender
                inequity, deforestation, and negative climate impacts unless
                efforts are rapidly scaled up.
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
              <p className='undp-typography margin-bottom-00'>Insight 3 of 3</p>
              <img
                src='https://design.undp.org/icons/chevron-right-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
            </div>
          </div>
          <div className='insight-card-graph'>
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
              footer='Regions as defined by UNDP Bureaus'
            />
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
