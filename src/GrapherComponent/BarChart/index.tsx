import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CountryGroupDataType, IndicatorMetaDataType } from '../../Types';
import { Graph } from './Graph';
import { COUNTRIES_BY_UNDP_REGIONS } from '../../Constants';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  UNDPRegion?: string;
  regionData?: CountryGroupDataType;
}

const GraphDiv = styled.div`
  flex-grow: 1;
  overflow: hidden;
  @media (max-width: 960px) {
    height: 70vw;
    max-height: 31.25rem;
  }
`;

export function BarChart(props: Props) {
  const { data, indicators, UNDPRegion, regionData } = props;
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight);
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <GraphDiv ref={graphDiv}>
      {svgHeight && svgWidth ? (
        <Graph
          data={
            !UNDPRegion || UNDPRegion === 'WLD'
              ? data
              : data.filter(
                  d =>
                    COUNTRIES_BY_UNDP_REGIONS[
                      COUNTRIES_BY_UNDP_REGIONS.findIndex(
                        el => el.region === `UNDP_${UNDPRegion}`,
                      )
                    ].Countries.indexOf(d['Alpha-3 code']) !== -1,
                )
          }
          indicators={indicators}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          regionData={regionData}
        />
      ) : null}
    </GraphDiv>
  );
}
