/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import UNDPColorModule from 'undp-viz-colors';
import { WorldMap } from './Components/WorldMap';
import { WorldMapChangeOverTime } from './Components/WorldMapChangeOverTime';

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

export function GovernanceKeyInsights() {
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
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Governance Effectiveness Index
              </p>
              <p className='undp-typography'>
                The government&apos;s effectiveness in formulating and
                implementing sound policies and regulations, enforcing laws, and
                providing basic public services varies significantly across
                countries and regions. This reflects multifaceted factors,
                including governance practices, economic conditions, corruption
                levels, political stability, institutional robustness, and
                cultural influences.
              </p>
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
          </div>
          <div className='insight-card-graph'>
            <WorldMap
              dataId='governmenteffectivenessestimate_wbge'
              title='Government Effectiveness Index'
              valueArray={[-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]}
              colorArray={UNDPColorModule.divergentColors.colorsx10}
            />
          </div>
        </div>
        <div
          className='flex-div flex-wrap gap-07 padding-bottom-07'
          style={{
            padding: 'var(--spacing-07) 0',
            minWidth: '100%',
            scrollSnapAlign: 'start',
          }}
        >
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: The rule of law
              </p>
              <p className='undp-typography'>
                The rule of law is the foundation for human rights. Recent
                trends suggest that more countries are experiencing a decline in
                respect for the rule of law, and this persistent trend is now
                evident even in established democracies.
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
          </div>
          <div className='insight-card-graph'>
            <WorldMapChangeOverTime
              dataId='ruleoflawestimatevallatest_wbankinfo'
              title='Change in Rule of Law Index from 2015'
              valueArray={[-0.5, -0.25, 0, 0.25, 0.5]}
              colorArray={UNDPColorModule.divergentColors.colorsx06}
            />
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
