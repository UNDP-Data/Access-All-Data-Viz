/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import UNDPColorModule from 'undp-viz-colors';
import { DifferenceLineChart } from './Components/DifferenceLineChart';
import { ScatterGraph } from './Components/AnimatedScatterPlot';

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

export function GenderKeyInsights() {
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
          <ColumnEl>
            <div>
              <h6 className='undp-typography'>Key Insight: Education</h6>
              <h5 className='undp-typography'>
                Over the past two centuries, there has been significant global
                progress in the field of education. This transformation has been
                driven by a growing recognition of the advantages of education
                for both individuals and society, coupled with increased
                government support. Consequently, gender disparities in
                education have gradually diminished.
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
            <DifferenceLineChart
              dataId={[
                'Mean Years of Schooling, male (years)',
                'Mean Years of Schooling, female (years)',
              ]}
              lineColors={[
                UNDPColorModule.categoricalColors.genderColors.male,
                UNDPColorModule.categoricalColors.genderColors.female,
              ]}
              fillColor={['var(--dark-red)', 'var(--dark-green)']}
              title='Difference in Mean Years of Schooling'
              range={[5, 10]}
              lineTags={['Males', 'Females']}
              idSuffix='schooling'
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
                Key Insight: Share of Informal Economy
              </h6>
              <h5 className='undp-typography'>
                Education and training play pivotal roles in facilitating the
                shift from informal to formal employment. A person&apos;s
                likelihood of engaging in informal employment decreases with
                higher levels of education, thus ensuring that the most
                vulnerable obtain social security and decent working conditions,
                making them less susceptible to poverty due to more stable and
                higher income.
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
            <ScatterGraph
              dataId={[
                'mean_years_of_schooling_female_years_hdr',
                'shareofinformalemploymentbysexthousandsfemale_iloniflrt',
              ]}
              title='Effect of schooling on informal labour force participation'
              maxXValue={15}
              maxYValue={100}
              axisText={[
                'mean years of schooling, female',
                'Share of Informal employment by sex (%), female',
              ]}
              baseYear={2010}
              yearIncrement={2}
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
              <h6 className='undp-typography'>Key Insight: National Income</h6>
              <h5 className='undp-typography'>
                Despite increasing labour force participation and educational
                attainment, income inequalities between men and women are still
                present, although they have been narrowing across the world. To
                attain equal opportunities, it&apos;s essential to transform the
                societal norms and stereotypes that restrict the range of
                options accessible to individuals, regardless of their gender.
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
            <DifferenceLineChart
              dataId={[
                'Gross National Income Per Capita, male (2017 PPP$)',
                'Gross National Income Per Capita, female (2017 PPP$)',
              ]}
              lineColors={[
                UNDPColorModule.categoricalColors.genderColors.male,
                UNDPColorModule.categoricalColors.genderColors.female,
              ]}
              fillColor={['var(--dark-red)', 'var(--dark-green)']}
              title='Difference in Gross National Income (in US $)'
              lineTags={['Males', 'Females']}
              idSuffix='income'
            />
          </GraphColumnEl>
        </div>
      </WrapperEl>
    </div>
  );
}
