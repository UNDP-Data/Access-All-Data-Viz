/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import { format } from 'd3-format';
import { AnimatedClusterPlot } from './Components/AnimatedClusterPlot';
import { DotPlotSmallMultiples } from './Components/DotPlotRegionSmallMultiples';
import { ParticleRowChart } from './Components/AnimatedParticleChart';

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

export function PovertyAndInequalityKeyInsights() {
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
                Key Insight: Poverty headcount at $2.15 a day
              </p>
              <p className='undp-typography'>
                Extreme poverty has seen a remarkable reduction of over 47
                million annually over the last 30 years, representing one of the
                most significant transformations in our world. More than a
                billion fewer people were pulled out of poverty.Yet, in 2019,
                <span className='bold'>around 650 million</span> people around
                the world - over half of them in Sub-Saharan Africa - were still
                living on less than $2.15 per day. If current trends continue,
                nearly 600 million people will still be trapped in extreme
                poverty by 2030.
                <br />
                <br />
                <span
                  className='undp-typography small-font margin-bottom-00'
                  style={{ color: 'var(--gray-600)' }}
                >
                  Data source: Poverty rate data:
                  <a
                    href='https://data.worldbank.org/indicator/SI.POV.DDAY'
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style small-font'
                    style={{ color: 'var(--gray-600) !important' }}
                  >
                    World Bank
                  </a>
                  ; Population data:
                  <a
                    href='https://ilostat.ilo.org/data/'
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style small-font'
                    style={{ color: 'var(--gray-600) !important' }}
                  >
                    International Labour Organization (ILO)
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
            <AnimatedClusterPlot
              title='Poverty headcount at $2.15 a day'
              dataId='Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)'
              isDataPercent
              colorKeys={[
                'people living under $2.15 a day',
                'people pulled out of poverty',
              ]}
              baseYear={1991}
              footer='1 Dot = 2 Million people'
              isDataAccess={false}
              scale={0.0000005}
            />
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Income Inequality
              </p>
              <p className='undp-typography'>
                One of the most visible dimension of global inequality in
                well-being is the unequal distribution of income (economic
                inequality). It remains unacceptably high, with the richest 10
                percent of the population earning more than half of the pre-tax
                national income worldwide, earning on average PPP$ $334 per
                person per day. Moreover, there is recent evidence that within
                all low and middle income countries,{' '}
                <a
                  href='https://data.undp.org/insights/mapping-income-inequality'
                  target='_blank'
                  rel='noreferrer'
                  className='undp-style small-font'
                  style={{ color: 'var(--gray-600) !important' }}
                >
                  the bottom 40 income shares are much lower than we thought,
                  while the top 10 are much higher
                </a>
                . High levels of inequality making it harder to end poverty in
                all its dimensions.
                <br />
                <br />
                <span
                  className='undp-typography small-font margin-bottom-00'
                  style={{ color: 'var(--gray-600)' }}
                >
                  Data source: Wealth inequality data{' '}
                  <a
                    href='https://wid.world/data/'
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style small-font'
                    style={{ color: 'var(--gray-600) !important' }}
                  >
                    World Inequality Database
                  </a>
                  ; Population data{' '}
                  <a
                    href='https://ilostat.ilo.org/data/'
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style small-font'
                    style={{ color: 'var(--gray-600) !important' }}
                  >
                    International Labour Organization (ILO)
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
              <p className='undp-typography margin-bottom-00'>Insight 2 of 3</p>
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
            <ParticleRowChart
              height={[53.21, 46.79]}
              data={[0.1 * 7876931987, 0.9 * 7876931987]}
              scale={0.0000001}
              backgroundColor={['var(--gray-300)', 'var(--gray-300)']}
              color={['#006EB5', '#006EB5']}
              notes={[
                `${format('.3s')(0.1 * 7876931987).replace(
                  'M',
                  ' Million',
                )} People (top 10%)`,
                `${format('.3s')(0.9 * 7876931987).replace(
                  'G',
                  ' Billion',
                )} People (bottom 90%)`,
              ]}
              sideNotes={['53.21%', '46.79%']}
              title='Global Income Inequality (2021)'
              circleRadius={3}
            />
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Social Protection
              </p>
              <p className='undp-typography'>
                Despite the criticality of social protection for tackling
                poverty and vulnerability in the current polycrisis, progress on
                extending social protection coverage remains low. Globally, less
                than half of the population is covered by at least one social
                protection benefit, leaving{' '}
                <span className='bold'>4.1 billion</span> people without
                protection. Moreover, there are significant regional
                disparities. In Sub-Saharan Africa, only 15 per cent of the
                population is covered against at least one risk compared to 41
                percent in Asia-Pacific, over 60 percent in Latin America and
                the Carribean and more tha 80 percent in Europe and Central
                Asia.
                <br />
                <br />
                <span
                  className='undp-typography small-font margin-bottom-00'
                  style={{ color: 'var(--gray-600)' }}
                >
                  Data source:{' '}
                  <a
                    href='https://www.ilo.org/ilostat-files/Documents/Bulk_ilostat_en.html'
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style small-font'
                    style={{ color: 'var(--gray-600) !important' }}
                  >
                    International Labour Organization (ILO)
                  </a>
                  . Aggregation methodology for world and UNDP regions can be
                  found{' '}
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
              dataId='populationcoveredbyatleastonesocialprotectionbenefit_ilospf'
              title='Population covered by at least one social protection benefit'
              regions={[
                'WLD',
                'UNDP_SSA',
                'UNDP_AP',
                'UNDP_AS',
                'ECS',
                'UNDP_LAC',
              ]}
              footer='*Regions as defined by UNDP Bureaus.'
            />
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
