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
            justifyContent: 'space-between',
          }}
        >
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-07'>
                Key Insight: Poverty headcount at $2.15 a day
              </p>
              <p className='undp-typography'>
                In recent decades, extreme poverty has seen a remarkable
                reduction of over 47 million annually over the last 30 years,
                representing one of the most significant transformations in our
                world.
                <br />
                <br />
                However, the extent of global poverty remains substantial and{' '}
                <span className='bold'>roughly 650 million</span> individuals,
                or approximately 1 in 12 people, are surviving on less than
                $2.15 a day.
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
              dataId='Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)'
              isDataPercent
              colorKeys={[
                'Poverty headcount',
                'No. of People pull out of poverty',
              ]}
              baseYear={1991}
              footer='1 Dot = 2 Million people'
              isDataAccess={false}
              scale={0.0000005}
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
              <p className='category-tag margin-bottom-07'>
                Key Insight: Social Protection
              </p>
              <p className='undp-typography'>
                Although social expenditure has been steadily increasing, there
                is a notable disparity in the allocation of national income to
                social transfers between &apos;advanced economies&apos; and
                regions like sub-Saharan Africa where social spending is
                considerably lower overall, and social protection benefits hold
                less significance in the social spending landscape.
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
              footer='*Regions as defined by UNDP Bureaus'
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
              <p className='category-tag margin-bottom-07'>
                Key Insight: Income Inequality
              </p>
              <p className='undp-typography'>
                The significance of effective government policies becomes
                evident when examining income inequality. There is a
                considerable disparity in income inequality between countries in
                Latin America and Sub-Saharan Africa compared to those in
                Northern Europe.
                <br />
                <br />
                This disparity carries significant consequences for life
                expectancy, child and maternal mortality rates, and access to
                high-quality services. Consequently, one&apos;s geographical
                location not only surpasses the importance of individual
                characteristics to make a decent living but also outweighs all
                other factors.
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
            <ParticleRowChart
              height={[52.69, 47.31]}
              data={[0.1 * 7876931987, 0.9 * 7876931987]}
              scale={0.0000001}
              backgroundColor={['var(--gray-300)', 'var(--gray-300)']}
              color={['#006EB5', '#006EB5']}
              notes={[
                `${format('.2s')(0.1 * 7876931987).replace(
                  'M',
                  ' Million',
                )} People (top 10%)`,
                `${format('.2s')(0.9 * 7876931987).replace(
                  'G',
                  ' Billion',
                )} People (bottom 90%)`,
              ]}
              sideNotes={['52.69%', '47.31%']}
              title='Global Income Inequality'
              circleRadius={3}
            />
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
