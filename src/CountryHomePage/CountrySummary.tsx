import { useState } from 'react';
import styled from 'styled-components';
import { CountryGroupDataType, IndicatorMetaDataWithYear } from '../Types';
import {
  SignatureSolutionEnergyIcon,
  SignatureSolutionEnvironmentIcon,
  SignatureSolutionGenderIcon,
  SignatureSolutionGovernanceIcon,
  SignatureSolutionPovertyIcon,
  SignatureSolutionResilienceIcon,
} from '../Icons';
import { PovertyAndInequalityCountrySummary } from '../SSCountryHomePage/PovertyAndInequalityCountrySummary';
import { EnvironmentCountrySummary } from '../SSCountryHomePage/EnvironmentCountrySummary';
import { GenderCountrySummary } from '../SSCountryHomePage/GenderCountrySummary';
import { GovernanceCountrySummary } from '../SSCountryHomePage/GovernanceCountrySummary';
import { ResilienceCountrySummary } from '../SSCountryHomePage/ResilienceCountrySummary';
import { EnergyCountrySummary } from '../SSCountryHomePage/EnergyCountrySummary';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataWithYear[];
}

interface TabButtonElProps {
  selected: boolean;
}

const TabButtonEl = styled.button<TabButtonElProps>`
  font-size: 0.875rem;
  padding: var(--spacing-05);
  justify-content: center;
  background-color: ${props =>
    props.selected ? 'var(--white)' : 'transparent'};
  color: ${props => (props.selected ? 'var(--blue-600)' : 'var(--gray-700)')};
  text-align: center;
  border: 0;
  opacity: ${props => (props.selected ? 1 : 0.5)};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    opacity: 1;
  }
`;

export function CountrySummary(props: Props) {
  const { data, indicators } = props;
  const [signatureSolution, setSignatureSolution] = useState(
    'Poverty and Inequality',
  );
  return (
    <div>
      <div
        className='flex-div flex-wrap flex-vert-align-center flex-hor-align-center gap-00 margin-bottom-05'
        style={{ backgroundColor: 'var(--gray-400)' }}
      >
        <TabButtonEl
          onClick={() => {
            setSignatureSolution('Poverty and Inequality');
          }}
          selected={signatureSolution === 'Poverty and Inequality'}
        >
          <SignatureSolutionPovertyIcon
            size={64}
            fill={
              signatureSolution === 'Poverty and Inequality'
                ? 'var(--blue-600)'
                : 'var(--gray-700)'
            }
          />
          <p className='undp-typography small-font'>Poverty and Inequality</p>
        </TabButtonEl>
        <TabButtonEl
          onClick={() => {
            setSignatureSolution('Governance');
          }}
          selected={signatureSolution === 'Governance'}
        >
          <SignatureSolutionGovernanceIcon
            size={64}
            fill={
              signatureSolution === 'Governance'
                ? 'var(--blue-600)'
                : 'var(--gray-700)'
            }
          />
          <p className='undp-typography small-font'>Governance</p>
        </TabButtonEl>
        <TabButtonEl
          onClick={() => {
            setSignatureSolution('Resilience');
          }}
          selected={signatureSolution === 'Resilience'}
        >
          <SignatureSolutionResilienceIcon
            size={64}
            fill={
              signatureSolution === 'Resilience'
                ? 'var(--blue-600)'
                : 'var(--gray-700)'
            }
          />
          <p className='undp-typography small-font'>Resilience</p>
        </TabButtonEl>
        <TabButtonEl
          onClick={() => {
            setSignatureSolution('Environment');
          }}
          selected={signatureSolution === 'Environment'}
        >
          <SignatureSolutionEnvironmentIcon
            size={64}
            fill={
              signatureSolution === 'Environment'
                ? 'var(--blue-600)'
                : 'var(--gray-700)'
            }
          />
          <p className='undp-typography small-font'>Environment</p>
        </TabButtonEl>
        <TabButtonEl
          onClick={() => {
            setSignatureSolution('Energy');
          }}
          selected={signatureSolution === 'Energy'}
        >
          <SignatureSolutionEnergyIcon
            size={64}
            fill={
              signatureSolution === 'Energy'
                ? 'var(--blue-600)'
                : 'var(--gray-700)'
            }
          />
          <p className='undp-typography small-font'>Energy</p>
        </TabButtonEl>
        <TabButtonEl
          onClick={() => {
            setSignatureSolution('Gender');
          }}
          selected={signatureSolution === 'Gender'}
        >
          <SignatureSolutionGenderIcon
            size={64}
            fill={
              signatureSolution === 'Gender'
                ? 'var(--blue-600)'
                : 'var(--gray-700)'
            }
          />
          <p className='undp-typography small-font'>Gender Equality</p>
        </TabButtonEl>
      </div>
      <div style={{ maxWidth: '1392px', margin: 'auto' }}>
        {signatureSolution === 'Poverty and Inequality' ? (
          <PovertyAndInequalityCountrySummary
            indicators={indicators}
            data={data[0]}
          />
        ) : signatureSolution === 'Environment' ? (
          <EnvironmentCountrySummary indicators={indicators} data={data[0]} />
        ) : signatureSolution === 'Gender' ? (
          <GenderCountrySummary indicators={indicators} data={data[0]} />
        ) : signatureSolution === 'Governance' ? (
          <GovernanceCountrySummary indicators={indicators} data={data[0]} />
        ) : signatureSolution === 'Resilience' ? (
          <ResilienceCountrySummary indicators={indicators} data={data[0]} />
        ) : signatureSolution === 'Energy' ? (
          <EnergyCountrySummary indicators={indicators} data={data[0]} />
        ) : null}
      </div>
    </div>
  );
}
