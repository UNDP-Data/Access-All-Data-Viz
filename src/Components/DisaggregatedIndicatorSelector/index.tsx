import { Input, Modal } from 'antd';
import { ChevronDown, Info, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import { DisaggregationMetaDataType } from '../../Types';
import IndicatorListModal from './IndicatorListModal';

interface Props {
  title: string;
  indicators: DisaggregationMetaDataType[];
  selectedIndicator: DisaggregationMetaDataType;
  updateIndicator: (_d: DisaggregationMetaDataType) => void;
}

const DropDownButton = styled.button`
  border: 2px solid var(--black);
  padding: 0.5rem;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 0.875rem !important;
  font-weight: 600;
  width: calc(100% - 42px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TruncateDiv = styled.div`
  width: calc(100% - 48px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem !important;
  font-family: var(--fontFamily);
  text-align: left;
`;

interface IconDivProps {
  active: boolean;
}

const IconDiv = styled.div<IconDivProps>`
  height: 24px;
  padding: 0;
  cursor: ${props => (props.active ? 'pointer' : 'not-allowed')};
  &:hover {
    background-color: ${props =>
      props.active ? 'var(--gray-300)' : 'transparent'};
  }
`;

interface TooltipElProps {
  x: number;
  y: number;
}

interface InfoProps extends TooltipElProps {
  info: string;
}
const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 1000;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  padding: 0.5rem;
  font-size: 0.875rem !important;
  top: ${props => props.y - 20}px;
  left: ${props => props.x + 20}px;
  max-width: 15rem;
`;

function DisaggregatedIndicatorSelector(props: Props) {
  const { title, indicators, selectedIndicator, updateIndicator } = props;
  const [openModal, setOpenModal] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState<undefined | string>(
    undefined,
  );
  const [indicatorList, setIndicatorList] =
    useState<DisaggregationMetaDataType[]>(indicators);
  const [indicatorInfo, setIndicatorInfo] = useState<InfoProps | undefined>(
    undefined,
  );
  useEffect(() => {
    const indicatorsFiltered = searchPhrase
      ? sortBy(indicators, d => d.Indicator).filter(d =>
          d.Indicator.toLowerCase().includes(searchPhrase.toLowerCase()),
        )
      : sortBy(indicators, d => d.Indicator);
    setIndicatorList(openModal ? indicatorsFiltered : indicators);
  }, [searchPhrase, openModal]);
  const closeModal = () => {
    setSearchPhrase(undefined);
    setOpenModal(false);
  };
  return (
    <>
      <div className='settings-option-div'>
        <p className='label'>{title}</p>
        <div
          className='flex-div flex-vert-align-center'
          style={{ gap: '0.5rem' }}
        >
          <DropDownButton
            style={{
              width: 'calc(100% - 36px)',
            }}
            onClick={() => {
              setOpenModal(true);
            }}
            title={selectedIndicator.Indicator || 'Select an indicator'}
          >
            <TruncateDiv>
              {selectedIndicator.Indicator || 'Select an indicator'}
            </TruncateDiv>
            <ChevronDown size={24} stroke='var(--red)' />
          </DropDownButton>
          <IconDiv active={!!selectedIndicator}>
            <Info
              size={24}
              stroke={selectedIndicator ? 'var(--red)' : 'var(--gray-400)'}
              onMouseEnter={event => {
                if (selectedIndicator)
                  setIndicatorInfo({
                    info: selectedIndicator.Indicator,
                    x: event.clientX,
                    y: event.clientY,
                  });
              }}
              onMouseMove={event => {
                if (selectedIndicator)
                  setIndicatorInfo({
                    info: selectedIndicator.Indicator,
                    x: event.clientX,
                    y: event.clientY,
                  });
              }}
              onMouseLeave={() => {
                if (selectedIndicator) setIndicatorInfo(undefined);
              }}
            />
          </IconDiv>
        </div>
      </div>
      {indicatorInfo ? (
        <TooltipEl
          className='undp-typography'
          x={indicatorInfo.x}
          y={indicatorInfo.y}
        >
          <p className='undp-typography small-font margin-bottom-00 bold'>
            {indicatorInfo.info}
          </p>
        </TooltipEl>
      ) : null}
      <Modal
        open={openModal}
        className='undp-modal'
        title='All Disaggregated Indicators'
        onOk={() => {
          setSearchPhrase(undefined);
          setOpenModal(false);
        }}
        onCancel={() => {
          setSearchPhrase(undefined);
          setOpenModal(false);
        }}
        destroyOnClose
        style={{ maxWidth: '90%' }}
      >
        <div className='margin-bottom-05 flex-div'>
          <Input
            className='undp-input'
            placeholder='Search Indicator'
            onChange={d => setSearchPhrase(d.target.value)}
          />
          <Search stroke='var(--gray-400)' size={48} />
        </div>
        <IndicatorListModal
          indicators={indicatorList}
          updateIndicator={updateIndicator}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}

export default DisaggregatedIndicatorSelector;
