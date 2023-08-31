import { Input, Modal, Select } from 'antd';
import { ChevronDown, Search, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import intersection from 'lodash.intersection';
import { IndicatorMetaDataType } from '../../Types';
import IndicatorListModal from './IndicatorListModal';
import { SDG_GOALS, TAGS_LIST } from '../../Constants';

interface Props {
  title: string;
  indicators: IndicatorMetaDataType[];
  selectedIndicator?: string;
  updateIndicator: (_d?: string) => void;
  isOptional?: boolean;
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

function IndicatorSelector(props: Props) {
  const { title, indicators, selectedIndicator, updateIndicator, isOptional } =
    props;
  const [openModal, setOpenModal] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState<undefined | string>(
    undefined,
  );
  const [indicatorList, setIndicatorList] =
    useState<IndicatorMetaDataType[]>(indicators);
  const [sdgForFilter, setSDGForFilter] = useState<string[]>([]);
  const [tagsForFilter, setTagsForFilter] = useState<string[]>([]);
  useEffect(() => {
    const indicatorFilterByTags =
      tagsForFilter.length !== 0 && tagsForFilter
        ? indicators.filter(d => intersection(d.tags, tagsForFilter).length > 0)
        : indicators;
    const indicatorFilterBySDGs =
      sdgForFilter.length !== 0 && sdgForFilter
        ? indicatorFilterByTags.filter(
            d => intersection(d.SDGs, sdgForFilter).length > 0,
          )
        : indicatorFilterByTags;
    const indicatorsFiltered = sortBy(
      indicatorFilterBySDGs,
      d => d.IndicatorLabelTable,
    ).filter(
      d =>
        d.IndicatorLabelTable.toLowerCase().includes(
          searchPhrase?.toLowerCase() || '',
        ) ||
        d.IndicatorDescription.toLowerCase().includes(
          searchPhrase?.toLowerCase() || '',
        ),
    );
    setIndicatorList(indicatorsFiltered);
  }, [searchPhrase, sdgForFilter, tagsForFilter]);
  return (
    <>
      <div className='settings-option-div'>
        <p className='label'>{title}</p>
        <div
          className='flex-div flex-vert-align-center'
          style={{ gap: '0.5rem' }}
        >
          <DropDownButton
            style={{ width: isOptional ? 'calc(100% - 32px)' : '100%' }}
            onClick={() => {
              setOpenModal(true);
            }}
            title={selectedIndicator || 'Select an indicator'}
          >
            <TruncateDiv>
              {selectedIndicator || 'Select an indicator'}
            </TruncateDiv>
            <ChevronDown size={24} stroke='var(--red)' />
          </DropDownButton>
          {isOptional ? (
            <Trash
              size={24}
              stroke='var(--red)'
              onClick={() => {
                updateIndicator(undefined);
              }}
            />
          ) : null}
        </div>
      </div>
      <Modal
        open={openModal}
        className='undp-modal'
        title={`All Indicators (${indicators.length})`}
        onOk={() => {
          setOpenModal(false);
          setTagsForFilter([]);
          setSDGForFilter([]);
          setSearchPhrase('');
        }}
        onCancel={() => {
          setOpenModal(false);
          setTagsForFilter([]);
          setSDGForFilter([]);
          setSearchPhrase('');
        }}
        destroyOnClose
        style={{ maxWidth: '90%' }}
      >
        <div className='margin-bottom-07 flex-div'>
          <div
            style={{
              flexGrow: 1,
              minWidth: '17.5rem',
              width: 'calc(50% - 0.5rem)',
            }}
          >
            <p className='label'>Filter by tags</p>
            <Select
              className='undp-select'
              showSearch
              maxTagCount='responsive'
              style={{ width: '100%' }}
              mode='multiple'
              allowClear
              clearIcon={<div className='clearIcon' />}
              placeholder='All Tags'
              onChange={d => {
                setTagsForFilter(d);
              }}
              value={tagsForFilter}
            >
              {TAGS_LIST.map(d => (
                <Select.Option className='undp-select-option' key={d}>
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              flexGrow: 1,
              minWidth: '17.5rem',
              width: 'calc(50% - 0.5rem)',
            }}
          >
            <p className='label'>Filter by SDGs</p>
            <Select
              className='undp-select'
              showSearch
              maxTagCount='responsive'
              style={{ width: '100%' }}
              mode='multiple'
              allowClear
              clearIcon={<div className='clearIcon' />}
              placeholder='All SDGs'
              onChange={d => {
                setSDGForFilter(d);
              }}
              value={sdgForFilter}
            >
              {SDG_GOALS.map(d => (
                <Select.Option
                  className='undp-select-option'
                  key={d.split(':')[0]}
                >
                  {d}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
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
          setOpenModal={setOpenModal}
        />
      </Modal>
    </>
  );
}

export default IndicatorSelector;
