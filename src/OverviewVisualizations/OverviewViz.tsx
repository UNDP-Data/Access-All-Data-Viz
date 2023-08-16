import styled from 'styled-components';
import { useRef, useState } from 'react';
import { CountryGroupDataType, IndicatorMetaDataType } from '../Types';
import { COUNTRIES_BY_UNDP_REGIONS, TOP_CARDS } from '../Constants';
import { GraphEl } from './GraphEl';

interface Props {
  data: CountryGroupDataType;
  indicators: IndicatorMetaDataType[];
  id: string;
}

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

export function OverviewViz(props: Props) {
  const { data, indicators, id } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  const idToUse =
    TOP_CARDS.findIndex(d => d.id === id) !== -1
      ? id
      : COUNTRIES_BY_UNDP_REGIONS.filter(d => d.Countries.indexOf(id) !== -1)
          .length !== 0
      ? COUNTRIES_BY_UNDP_REGIONS[
          COUNTRIES_BY_UNDP_REGIONS.findIndex(
            d => d.Countries.indexOf(id) !== -1,
          )
        ].region.replace('UNDP_', '')
      : 'Default';
  const cardList = TOP_CARDS[TOP_CARDS.findIndex(d => d.id === idToUse)].cards;
  let toShow = false;
  cardList.forEach(d => {
    if (d.vizType === 'stackedLineChart') {
      if (
        data.indicators.findIndex(
          el => el.indicator === d.settings.dataKey[0],
        ) !== -1
      ) {
        toShow = true;
      }
    } else if (
      data.indicators.findIndex(el => el.indicator === d.settings.dataKey) !==
      -1
    ) {
      toShow = true;
    }
  });
  return (
    <div>
      {toShow ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className='margin-bottom-00'
          style={{
            cursor: `${cursor}, auto`,
          }}
          onClick={e => {
            if (WrapperRef.current) {
              if (e.clientX > window.innerWidth / 2)
                WrapperRef.current.scrollBy(50, 0);
              else WrapperRef.current.scrollBy(-50, 0);
            }
          }}
          onMouseMove={e => {
            if (e.clientX > window.innerWidth / 2)
              setCursor(
                'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
              );
            else
              setCursor(
                'url(https://design.undp.org/static/media/arrow-left.14de54ea.svg)',
              );
          }}
        >
          <WrapperEl
            className='flex-div stat-container undp-scrollbar'
            ref={WrapperRef}
          >
            {cardList.map((d, i) =>
              data.indicators.findIndex(
                el => el.indicator === d.settings.dataKey,
              ) !== -1 ? (
                <GraphEl
                  key={i}
                  data={
                    d.vizType === 'stackedLineChart'
                      ? [
                          data.indicators[
                            data.indicators.findIndex(
                              el => el.indicator === d.settings.dataKey[0],
                            )
                          ],
                          data.indicators[
                            data.indicators.findIndex(
                              el => el.indicator === d.settings.dataKey[1],
                            )
                          ],
                        ]
                      : [
                          data.indicators[
                            data.indicators.findIndex(
                              el => el.indicator === d.settings.dataKey,
                            )
                          ],
                        ]
                  }
                  indicator={
                    d.vizType === 'stackedLineChart'
                      ? [
                          indicators[
                            indicators.findIndex(
                              el => el.DataKey === d.settings.dataKey[0],
                            )
                          ],
                          indicators[
                            indicators.findIndex(
                              el => el.DataKey === d.settings.dataKey[1],
                            )
                          ],
                        ]
                      : [
                          indicators[
                            indicators.findIndex(
                              el => el.DataKey === d.settings.dataKey,
                            )
                          ],
                        ]
                  }
                  card={d}
                />
              ) : null,
            )}
          </WrapperEl>
        </div>
      ) : null}
    </div>
  );
}
