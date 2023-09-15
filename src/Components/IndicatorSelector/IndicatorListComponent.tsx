import { useState } from 'react';
import styled from 'styled-components';
import { IndicatorMetaDataType } from '../../Types';

interface Props {
  title: string;
  indicators: IndicatorMetaDataType[];
  updateIndicator: (_d: string) => void;
  closeModal: () => void;
}

const IndicatorCardEl = styled.button`
  padding: 1rem;
  background-color: var(--gray-200);
  font-size: 0.875rem;
  border-radius: 2px;
  width: calc(33.33% - 0.67rem);
  text-align: left;
  border: 0;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: var(--blue-700);
  }
`;

const ViewButton = styled.button`
  background-color: transparent;
  font-size: 0.75rem;
  color: var(--blue-700);
  text-transform: uppercase;
  font-weight: bold;
  border: 0;
`;

function IndicatorListComponent(props: Props) {
  const { title, indicators, updateIndicator, closeModal } = props;
  const [expandedState, setExpandedState] = useState(true);
  return (
    <div className='margin-top-09'>
      <div
        className='flex-div margin-bottom-05'
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 className='undp-typography margin-bottom-00'>{title}</h6>
        <ViewButton
          onClick={() => {
            setExpandedState(!expandedState);
          }}
        >
          {expandedState ? '- Show Less' : '+ View All'}
        </ViewButton>
      </div>
      <div
        className='flex-div flex-wrap gap-05'
        style={{ alignItems: 'stretch' }}
      >
        {indicators
          .filter((_d, j) => expandedState || j < 3)
          .map((el, j) => (
            <IndicatorCardEl
              key={j}
              onClick={() => {
                updateIndicator(
                  indicators[
                    indicators.findIndex(
                      ind => ind.IndicatorLabelTable === el.IndicatorLabelTable,
                    )
                  ].DataKey,
                );
                closeModal();
              }}
            >
              {el.IndicatorLabelTable}
            </IndicatorCardEl>
          ))}
      </div>
      <hr
        className='undp-style margin-top-07'
        style={{ backgroundColor: 'var(--gray-300)' }}
      />
    </div>
  );
}

export default IndicatorListComponent;
