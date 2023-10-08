import { Particles } from './Particles';

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
  svgWidth: number;
  svgHeight: number;
}

export function GraphComponent(props: RowProps) {
  const {
    data,
    scale,
    backgroundColor,
    color,
    notes,
    height,
    sideNotes,
    overlayText,
    svgWidth,
    svgHeight,
    circleRadius,
  } = props;
  return (
    <>
      {data.map((d, i) => (
        <div
          className='flex-div flex-vert-align-center gap-00'
          key={i}
          style={{
            borderBottom: i < data.length - 1 ? '3px solid var(--white)' : 0,
          }}
        >
          <Particles
            width={svgWidth - 75}
            height={
              svgHeight < 300
                ? (height[i] * 300) / 100
                : (height[i] * svgHeight) / 100
            }
            density={Math.round(d * scale)}
            backgroundColor={backgroundColor[i]}
            color={color[i]}
            note={notes[i]}
            notePlacement={i === 0 ? 'top' : 'bottom'}
            overlayText={overlayText}
            circleRadius={circleRadius}
          />
          <div
            style={{
              width: '70px',
              paddingLeft: '5px',
            }}
          >
            <h6 className='undp-typography margin-bottom-00'>{sideNotes[i]}</h6>
            <p className='undp-typography margin-bottom-00 small-font'>
              of income
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
