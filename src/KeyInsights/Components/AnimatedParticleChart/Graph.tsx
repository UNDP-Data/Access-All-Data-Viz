import { useEffect, useRef, useState } from 'react';
import { Particles } from './Particles';
import { GraphComponent } from './GraphComponent';

interface ColumnProps {
  data: number[];
  width: number[];
  backgroundColor: string[];
  scale: number;
  color: string[];
  overlayText: boolean;
  circleRadius: number;
}

interface RowProps {
  data: number[];
  backgroundColor: string[];
  scale: number;
  color: string[];
  notes: string[];
  overlayText: boolean;
  sideNotes: string[];
  height: number[];
  circleRadius: number;
}

export function Graph(props: RowProps) {
  const {
    data,
    scale,
    backgroundColor,
    color,
    notes,
    height,
    sideNotes,
    overlayText,
    circleRadius,
  } = props;
  const [svgWidth, setSvgWidth] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <div ref={graphDiv}>
      {svgWidth ? (
        <GraphComponent
          data={data}
          height={height}
          scale={scale}
          backgroundColor={backgroundColor}
          color={color}
          notes={notes}
          sideNotes={sideNotes}
          overlayText={overlayText}
          circleRadius={svgWidth < 460 ? 2 : circleRadius}
          svgWidth={svgWidth}
          svgHeight={(svgWidth * 9) / 16 > 500 ? 500 : (svgWidth * 9) / 16}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}

export function ColumnGraph(props: ColumnProps) {
  const {
    data,
    width,
    scale,
    backgroundColor,
    color,
    overlayText,
    circleRadius,
  } = props;
  const [svgWidth, setSvgWidth] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv?.current]);
  return (
    <div ref={graphDiv} style={{ flexGrow: 1 }}>
      {svgWidth ? (
        <div
          className='flex-div flex-vert-align-center gap-00'
          style={{
            justifyContent: 'space-between',
          }}
        >
          {data.map((d, i) => (
            <div className='flex-div flex-vert-align-center gap-00' key={i}>
              <Particles
                width={(width[i] * (svgWidth - data.length * 4)) / 100}
                height={(svgWidth * 9) / 16 < 400 ? 400 : (svgWidth * 9) / 16}
                density={Math.round(d * scale)}
                backgroundColor={backgroundColor[i]}
                color={color[i]}
                notePlacement={i === 0 ? 'top' : 'bottom'}
                overlayText={overlayText}
                circleRadius={svgWidth < 460 ? 2 : circleRadius}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
