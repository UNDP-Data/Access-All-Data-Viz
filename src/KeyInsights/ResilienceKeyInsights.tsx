/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { ScatterGraph } from './Components/AnimatedScatterPlot';
import { StackedBarGraph } from './Components/StackedBarGraph';

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
  padding: var(--spacing-05);
  justify-content: space-between;
  gap: var(--spacing-05);
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

export function ResilienceKeyInsights() {
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
                Key Insight: Urban vs Rural Population
              </h6>
              <h5 className='undp-typography'>
                There has been a mass migration of populations from rural to
                urban areas in recent decades which is expected to continue to
                increase with rising incomes and shifts away from employment in
                agriculture, especially in developing countries.
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
            <StackedBarGraph
              dataId={['Rural Population, total', 'Urban Population, total']}
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
                Key Insight: Population residing in slums
              </h6>
              <h5 className='undp-typography'>
                While the proportion of the population residing in slums has
                been declining over time, those who continue to inhabit these
                areas confront higher levels of poverty, a lack of access to
                clean water, poor housing conditions among others, thus placing
                them at risk of infectious diseases, higher rates of
                malnutrition, childhood stunting, and premature mortality.
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
              <p className='undp-typography margin-bottom-00'>Insight 2 of 2</p>
              <img
                src='https://design.undp.org/icons/chevron-right-circle.svg'
                alt='icon'
                style={{ opacity: '0.3' }}
              />
            </div>
          </ColumnEl>
          <GraphColumnEl>
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
          </GraphColumnEl>
        </div>
      </WrapperEl>
    </div>
  );
}
