/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import styled from 'styled-components';
import { useRef } from 'react';
import UNDPColorModule from 'undp-viz-colors';
import { DifferenceLineChart } from './Components/DifferenceLineChart';
import { ScatterGraph } from './Components/AnimatedScatterPlot';

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
    <div>
      <WrapperEl
        className='flex-div stat-container undp-scrollbar'
        ref={WrapperRef}
      >
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Education
              </p>
              <p className='undp-typography'>
                The world has witnessed substantial progress in the field of
                education over the past two centuries. This transformation has
                been propelled by the increasing recognition of the advantages
                of education for both individuals and society, coupled with
                enhanced government support.
                <br />
                <br />
                Despite its reduction, gender disparities in education continue
                to persist.
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
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: Share of Informal Economy
              </p>
              <p className='undp-typography'>
                Education and training play pivotal roles in facilitating the
                shift from informal to formal employment. A person&apos;s
                likelihood of engaging in informal employment decreases with
                higher levels of education, thus ensuring that the most
                vulnerable obtain social security and decent working conditions,
                making them less susceptible to poverty due to more stable and
                higher income.
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
          </div>
        </div>
        <div className='insight-card'>
          <div className='insight-card-text'>
            <div>
              <p className='category-tag margin-bottom-05'>
                Key Insight: National Income
              </p>
              <p className='undp-typography'>
                Despite increasing labour force participation and educational
                attainment, income inequalities between men and women are still
                present, although they have been narrowing across the world.
                <br />
                <br />
                To attain equal opportunities, it&apos;s essential to transform
                the societal norms and stereotypes that restrict the range of
                options accessible to individuals, regardless of their gender.
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
          </div>
        </div>
      </WrapperEl>
    </div>
  );
}
