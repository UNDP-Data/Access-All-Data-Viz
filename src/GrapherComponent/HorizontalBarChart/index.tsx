import { useEffect, useRef, useState } from 'react';
import { CountryGroupDataType, IndicatorMetaDataType } from '../../Types';
import { Graph } from './Graph';
import { COUNTRIES_BY_UNDP_REGIONS } from '../../Constants';

interface Props {
  data: CountryGroupDataType[];
  indicators: IndicatorMetaDataType[];
  UNDPRegion?: string;
  regionData?: CountryGroupDataType;
}

export function HorizontalBarChart(props: Props) {
  const { data, indicators, UNDPRegion, regionData } = props;

  const [svgWidth, setSvgWidth] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <div ref={graphDiv} style={{ flexGrow: 1 }}>
      {svgWidth ? (
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
          regionData={regionData}
        />
      ) : null}
    </div>
  );
}
