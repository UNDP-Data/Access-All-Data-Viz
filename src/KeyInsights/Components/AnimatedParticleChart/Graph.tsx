import { useEffect, useRef, useState } from 'react';
import { Particles } from './Particles';
import { GraphComponent } from './GraphComponent';

interface ColumnProps {
  data: number[];
  width: number[];
  backgroundColor: string[];
  scale: number;
  color: string[];
  notes: string[];
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
  }, [graphDiv?.current?.clientHeight]);
  return (
    <div style={{ flexGrow: 1 }}>
      <div ref={graphDiv} style={{ height: '450px' }} className='hello'>
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
            circleRadius={circleRadius}
            svgWidth={svgWidth}
            svgHeight={400}
          />
        ) : (
          <div className='undp-loader-container undp-container'>
            <div className='undp-loader' />
          </div>
        )}
      </div>
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
    notes,
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
        <div className='flex-div flex-vert-align-center gap-00'>
          {data.map((d, i) => (
            <div className='flex-div flex-vert-align-center gap-00' key={i}>
              <Particles
                width={(width[i] * (svgWidth - data.length * 2)) / 100}
                height={375}
                density={Math.round(d * scale)}
                backgroundColor={backgroundColor[i]}
                color={color[i]}
                note={notes[i]}
                notePlacement={i === 0 ? 'top' : 'bottom'}
                overlayText={overlayText}
                stroke={i < data.length - 1}
                circleRadius={circleRadius}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
