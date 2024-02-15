/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { ScatterGraph } from './Components/AnimatedScatterPlot';
import { StackedBarGraph } from './Components/StackedAreaGraph';

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
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Urbanization
              </p>
              <p className='undp-typography'>
                There has been a mass migration of populations from rural to
                urban areas in recent decades which is expected to continue to
                increase with rising incomes and shifts away from employment in
                agriculture, especially in developing countries.
              </p>
              <br />
              <br />
              <span
                className='undp-typography small-font margin-bottom-00'
                style={{ color: 'var(--gray-600)' }}
              >
                Data source:{' '}
                <a
                  href='https://data.worldbank.org/'
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style'
                  style={{ color: 'var(--gray-600)' }}
                >
                  World Bank
                </a>
                . Aggregation methodology for world can be found{' '}
                <a
                  href='https://data.undp.org/sites/g/files/zskgke476/files/2024-02/DFX%20Indicator%20Aggregation%20Methodology.pdf'
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style'
                  style={{ color: 'var(--gray-600)' }}
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
          <div className='insight-card-graph'>
            <StackedBarGraph
              dataId={['Rural Population, total', 'Urban Population, total']}
            />
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Population living in slums
              </p>
              <p className='undp-typography'>
                While the proportion of the population residing in slums has
                been declining over time, those who continue to inhabit these
                areas confront higher levels of poverty, a lack of access to
                clean water, poor housing conditions among others, thus placing
                them at risk of infectious diseases, higher rates of
                malnutrition, childhood stunting, and premature mortality.
              </p>
              <br />
              <br />
              <span
                className='undp-typography small-font margin-bottom-00'
                style={{ color: 'var(--gray-600)' }}
              >
                Data source:{' '}
                <a
                  href='https://data.worldbank.org/'
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style'
                  style={{ color: 'var(--gray-600)' }}
                >
                  World Bank
                </a>
                .
              </span>
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
            <ScatterGraph
              dataId={[
                'populationlivinginslums_cpiaplis',
                'accesstowaterservices_cpiaatws',
              ]}
              title='Population living in slums and their access to water'
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
