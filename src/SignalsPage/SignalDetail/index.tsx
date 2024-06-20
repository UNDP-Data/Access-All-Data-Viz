import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import UNDPColorModule from 'undp-viz-colors';
import { ChoicesDataType, SignalDataType } from '../Types';
import { DEFAULT_IMAGE, SIGNAL_ACCESS_CODE, SSCOLOR } from '../Constants';
import { ChipEl } from '../ChipEl';
import { getSDGIcon } from '../GetSDGIcons';

interface Props {
  signalID: string;
  choices: ChoicesDataType;
}

interface HeroImageProps {
  bgImage?: string;
}

const HeroImageEl = styled.div<HeroImageProps>`
  background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url(${props => (props.bgImage ? props.bgImage : DEFAULT_IMAGE)}) no-repeat
      center;
  background-size: cover;
`;

function isValidUrl(url?: string) {
  if (!url) return false;
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function SignalDetail(props: Props) {
  const { signalID, choices } = props;
  const [data, setData] = useState<SignalDataType | undefined>(undefined);
  useEffect(() => {
    axios
      .get(
        `https://signals-and-trends-api.azurewebsites.net/v1/signals/fetch?ids=${signalID}`,
        {
          headers: {
            access_token: SIGNAL_ACCESS_CODE,
          },
        },
      )
      .then((response: AxiosResponse) => {
        setData(response.data[0]);
      });
  }, [signalID]);
  return (
    <div>
      {data ? (
        <div>
          <HeroImageEl className='undp-hero-image' bgImage={data.attachment}>
            <div className='max-width'>
              <h2 className='undp-typography'>{data.headline}</h2>
              <h6 className='undp-typography margin-bottom-07'>
                ID: {data.id}
              </h6>
            </div>
          </HeroImageEl>
          <div
            className='margin-top-09 flex-div gap-07 max-width margin-bottom-09'
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              flexWrap: 'wrap-reverse',
            }}
          >
            <div
              style={{
                width: 'calc(33.33% - 2rem)',
                minWidth: '20rem',
                flexGrow: 1,
              }}
            >
              <div>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Location
                </h6>
                <div>{data.location}</div>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Keywords
                </h6>
                <div className='flex-div flex-wrap'>
                  {data.keywords?.map((el, j) => (
                    <div className='undp-chip' key={j}>
                      {el}
                    </div>
                  ))}
                </div>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  STEEP+V Category
                </h6>
                <div className='flex-div flex-wrap'>
                  {data.steep_primary ? (
                    <ChipEl
                      text={data.steep_primary?.split(' – ')[0]}
                      circleColor={
                        !choices
                          ? 'var(--black)'
                          : UNDPColorModule.categoricalColors.colors[
                              choices.steepv.findIndex(
                                el => el === data.steep_primary,
                              )
                            ]
                      }
                    />
                  ) : null}
                  {data.steep_secondary
                    ?.filter(d => d !== data.steep_primary)
                    .map((d, j) => (
                      <ChipEl
                        key={j}
                        text={d.split(' – ')[0]}
                        circleColor={
                          !choices
                            ? 'var(--black)'
                            : UNDPColorModule.categoricalColors.colors[
                                choices.steepv.findIndex(el => el === d)
                              ]
                        }
                      />
                    ))}
                </div>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Signature Solutions
                </h6>
                <div className='flex-div flex-wrap'>
                  {data.signature_primary !== '' && data.signature_primary ? (
                    <ChipEl
                      text={data.signature_primary}
                      circleColor={
                        !choices
                          ? 'var(--black)'
                          : SSCOLOR[
                              choices.signatures.findIndex(
                                el => el === data.signature_primary,
                              )
                            ].textColor
                      }
                    />
                  ) : null}
                  {data.signature_secondary
                    ?.filter(d => d !== data.signature_primary)
                    .map((d, i) => (
                      <ChipEl
                        text={d}
                        key={i}
                        circleColor={
                          !choices
                            ? 'var(--black)'
                            : SSCOLOR[
                                choices.signatures.findIndex(el => el === d)
                              ].textColor
                        }
                      />
                    ))}
                </div>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Created for
                </h6>
                <div className='small-font'>{data.created_for || 'NA'}</div>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Score
                </h6>
                <div className='small-font'>{data.score || 'NA'}</div>
              </div>
            </div>
            <div style={{ width: 'calc(66.67% - 2rem)', flexGrow: 1 }}>
              <div>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Description
                </h6>
                <p className='undp-typography'>{data.description}</p>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Relevance
                </h6>
                <p className='undp-typography'>{data.relevance}</p>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  SDGs
                </h6>
                <div className='flex-div'>
                  {data.sdgs && data.sdgs.length > 0 ? (
                    <>
                      {data.sdgs.map((sdg, j) => (
                        <div key={j}>{getSDGIcon(sdg.split(':')[0], 48)}</div>
                      ))}
                    </>
                  ) : (
                    'NA'
                  )}
                </div>
              </div>
              <div className='margin-top-07'>
                <h6 className='undp-typography margin-top-00 margin-bottom-03'>
                  Source
                </h6>
                {isValidUrl(data.url) ? (
                  <a
                    href={data.url}
                    target='_blank'
                    rel='noreferrer'
                    className='undp-style'
                  >
                    {data.url}
                  </a>
                ) : (
                  <p className='undp-typography'>{data.url}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='undp-loader-container margin-top-13'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
