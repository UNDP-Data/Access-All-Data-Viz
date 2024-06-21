import styled from 'styled-components';
import UNDPColorModule from 'undp-viz-colors';
import { Modal } from 'antd';
import { useState } from 'react';
import { ChoicesDataType, SignalDataType } from './Types';
import { ChipEl } from './ChipEl';
import { DEFAULT_IMAGE } from './Constants';
import { SignalDetail } from './SignalDetail';

interface Props {
  data: SignalDataType;
  choices: ChoicesDataType;
}

interface HeroImageProps {
  bgImage?: string;
}

const HeroImageEl = styled.div<HeroImageProps>`
  background: ${props =>
      props.bgImage ? `url(${props.bgImage})` : `url(${DEFAULT_IMAGE})`}
    no-repeat center;
  background-size: cover;
  width: 100%;
  height: 0;
  padding-bottom: 55%;
  filter: brightness(100%);
  &:hover {
    filter: brightness(80%);
    transition: filter 0.2s;
  }
`;

const CardEl = styled.div`
  max-width: 100%;
  flex-grow: 1;
  font-size: 1.4rem;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1rem;
`;

const DescriptionEl = styled.p`
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
`;

const LinkP = styled.p`
  color: var(--gray-700);
  &:hover {
    color: var(--red);
  }
`;

const SignalCardEl = styled.div`
  width: calc(33.3% - 0.67rem);
  min-width: min(100%, 320px);
  color: var(--black);
  text-decoration: none;
  background-color: var(--gray-200);
  align-items: stretch;
  display: flex;
  cursor: pointer;
  @media (min-width: 888px) {
    width: calc(50% - 0.5rem);
  }
  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 704px) {
    width: calc(50% - 0.5rem);
  }
  @media (min-width: 1312px) {
    width: calc(33.3% - 0.67rem);
  }

  @media (min-width: 1440px) {
    width: calc(25% - 0.75rem);
  }
`;

export function SignalCard(props: Props) {
  const { data, choices } = props;
  const [clickedID, setClickedID] = useState<string | undefined>(undefined);
  return (
    <>
      <SignalCardEl
        onClick={() => {
          setClickedID(`${data.id}`);
        }}
      >
        <CardEl>
          <div>
            <HeroImageEl bgImage={data.attachment} />
            <div style={{ padding: '1rem 1rem 0 1rem' }}>
              <div className='flex-div flex-wrap'>
                <ChipEl
                  text={
                    data.steep_primary
                      ? data.steep_primary.split(' – ')[0]
                      : 'No tags'
                  }
                  circleColor={
                    data.steep_primary
                      ? !choices
                        ? 'var(--black)'
                        : UNDPColorModule.categoricalColors.colors[
                            choices?.steepv.findIndex(
                              el => el === data.steep_primary,
                            )
                          ]
                      : 'var(--gray-600)'
                  }
                />
                {data.steep_secondary
                  ?.filter(s => s !== data.steep_primary)
                  .map((s, j) => (
                    <ChipEl
                      key={j}
                      text={s.split(' – ')[0]}
                      circleColor={
                        !choices
                          ? 'var(--black)'
                          : UNDPColorModule.categoricalColors.colors[
                              choices?.steepv.findIndex(el => el === s)
                            ]
                      }
                    />
                  ))}
              </div>
              <LinkP className='bold undp-typography margin-top-05 margin-bottom-03'>
                {data.headline}{' '}
                <span
                  style={{
                    fontSize: '1rem',
                    color: 'var(--gray-600)',
                    fontWeight: 'normal',
                  }}
                >
                  (ID:{data.id})
                </span>
              </LinkP>
              <DescriptionEl className='undp-typography small-font margin-bottom-04'>
                {data.description}
              </DescriptionEl>
              <p className='small-font undp-typography bold margin-bottom-03 margin-top-03'>
                Keywords
              </p>
              <div className='flex-div flex-wrap margin-bottom-07 gap-03'>
                {data.keywords?.map((el, j) =>
                  el !== '' ? (
                    <div className='undp-chip' key={`chip-${j}`}>
                      {el}
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </CardEl>
      </SignalCardEl>
      <Modal
        open={clickedID !== undefined}
        className='undp-modal'
        title=''
        onOk={() => {
          setClickedID(undefined);
        }}
        onCancel={() => {
          setClickedID(undefined);
        }}
        style={{ maxWidth: '1600px', width: '80%' }}
        destroyOnClose
      >
        <SignalDetail choices={choices} signalID={clickedID as string} />
      </Modal>
    </>
  );
}
