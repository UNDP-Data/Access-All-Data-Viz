import { format } from 'd3-format';
import styled from 'styled-components';
import { HoverDataType } from '../Types';

interface Props {
  data: HoverDataType;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

interface ColorIconProps {
  fill?:string;
}

const ColorIcon = styled.div<ColorIconProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.75rem;
  flex-shrink: 0;
  background-color: ${(props) => (props.fill ? props.fill : 'var(--yellow)')};
`;

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 200;
  max-width: 40rem;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const TooltipForMultiLineChart = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPosition} y={data.yPosition} verticalAlignment={data.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPosition > window.innerWidth / 2 ? 'left' : 'right'}>
      <div className='flex-div flex-wrap' style={{ padding: 'var(--spacing-05)', alignItems: 'baseline' }}>
        <h6 className='undp-typography bold margin-bottom-00' style={{ color: 'var(--blue-600)' }}>
          {data.country.substring(0, 50)}
          {data.country.substring(0, 50) === data.country ? '' : '...'}
          <p className='undp-typography small-font margin-bottom-00' style={{ color: 'var(--gray-600)', fontWeight: 'normal' }}>
            (
            {data.continent}
            )
          </p>
        </h6>
      </div>
      <hr className='undp-style margin-top-00 margin-bottom-00' />
      <div style={{ padding: 'var(--spacing-07) var(--spacing-07) 0 var(--spacing-05)' }}>
        {
          data.rows.map((d, i) => (
            <div className='flex-div flex-space-between margin-bottom-05' style={{ alignItems: 'baseline' }} key={i}>
              <div className='flex-div flex-vert-align-center' style={{ gap: '0.5rem' }}>
                <ColorIcon fill={d.color} />
                <p className='undp-typography margin-bottom-00'>
                  {d.title}
                </p>
              </div>
              <h6 className='undp-typography margin-bottom-00 bold'>
                {
                  d.prefix && d.value && d.value !== 'NA' ? `${d.prefix} ` : ''
                }
                {typeof d.value === 'number' ? d.value < 1000000 ? format(',')(d.value).replace(',', ' ') : format('.3s')(d.value).replace('G', 'B') : d.value }
                {
                  d.suffix && d.value && d.value !== 'NA' ? ` ${d.suffix}` : ''
                }
              </h6>
            </div>
          ))
        }
      </div>
    </TooltipEl>
  );
};
