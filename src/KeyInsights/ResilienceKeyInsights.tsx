/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { ScatterGraph } from './Components/AnimatedScatterPlot';
import { StackedBarGraph } from './Components/StackedBarGraph';

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

export function ResilienceKeyInsights() {
  const WrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div>
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
                Key Insight: Urban vs Rural Population
              </p>
              <p className='undp-typography'>
                There has been a mass migration of populations from rural to
                urban areas in recent decades which is expected to continue to
                increase with rising incomes and shifts away from employment in
                agriculture, especially in developing countries.
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
            <StackedBarGraph
              dataId={['Rural Population, total', 'Urban Population, total']}
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
                Key Insight: Population residing in slums
              </p>
              <p className='undp-typography'>
                While the proportion of the population residing in slums has
                been declining over time, those who continue to inhabit these
                areas confront higher levels of poverty, a lack of access to
                clean water, poor housing conditions among others, thus placing
                them at risk of infectious diseases, higher rates of
                malnutrition, childhood stunting, and premature mortality.
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
            <ScatterGraph
              dataId={[
                'populationlivinginslums_cpiaplis',
                'accesstowaterservices_cpiaatws',
              ]}
              title='Effect of slums on access to water'
              maxXValue={100}
              maxYValue={100}
              axisText={[
                'Population living in slums, % of urban population',
                'Access to water services, percent of population',
              ]}
              baseYear={2006}
              yearIncrement={2}
            />
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
