import styled from 'styled-components';
import { format } from 'd3-format';
import { MoveHorizontal, MoveVertical } from 'lucide-react';
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

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 8;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${props =>
    props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40}px;
  left: ${props =>
    props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20}px;
  max-width: 24rem;
  transform: ${props =>
    `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${
      props.verticalAlignment === 'top' ? '-100%' : '0%'
    })`};
`;

interface ColorIconProps {
  fill?: string;
}

const ColorIcon = styled.div<ColorIconProps>`
  width: 0.875rem;
  height: 0.875rem;
  margin-top: 6px;
  background-color: ${props => (props.fill ? props.fill : 'var(--yellow)')};
`;

const SizeIcon = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 0.875rem;
  border: 2px solid var(--gray-700);
`;

export function Tooltip(props: Props) {
  const { data } = props;
  return (
    <TooltipEl
      x={data.xPosition}
      y={data.yPosition}
      verticalAlignment={
        data.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'
      }
      horizontalAlignment={
        data.xPosition > window.innerWidth / 2 ? 'left' : 'right'
      }
    >
      <div
        className='flex-div flex-wrap'
        style={{ padding: 'var(--spacing-05)', alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography bold margin-bottom-00'
          style={{ color: 'var(--blue-600)' }}
        >
          {data.country}{' '}
          <span
            className='undp-typography'
            style={{
              color: 'var(--gray-600)',
              fontWeight: 'normal',
              fontSize: '0.875rem',
              textTransform: 'none',
            }}
          >
            ({data.continent})
          </span>
        </h6>
      </div>
      <hr className='undp-style margin-top-00 margin-bottom-00' />
      <div
        style={{
          padding: 'var(--spacing-05) var(--spacing-05) 0 var(--spacing-05)',
        }}
      >
        {data.rows.map((d, i) => (
          <div
            className='flex-div margin-bottom-05'
            key={i}
            style={{ gap: '0.5rem', alignItems: 'flex-start' }}
          >
            <div>
              {d.type === 'x-axis' ? (
                <MoveHorizontal size={20} stroke='var(--gray-700)' />
              ) : d.type === 'y-axis' ? (
                <MoveVertical size={20} stroke='var(--gray-700)' />
              ) : d.type === 'color' ? (
                <ColorIcon fill={d.color} />
              ) : d.type === 'size' ? (
                <SizeIcon />
              ) : null}
            </div>
            <div>
              <p
                className='undp-typography small-font margin-bottom-00 margin-top-01'
                style={{ color: 'var(--gray-500)' }}
              >
                {d.year}
              </p>
              <p className='undp-typography margin-bottom-02 small-font'>
                {d.title}
              </p>
              <h6 className='undp-typography margin-bottom-00 bold'>
                {d.prefix && d.value && d.value !== 'NA' ? `${d.prefix} ` : ''}
                {typeof d.value === 'number'
                  ? d.value < 1000000
                    ? format(',')(parseFloat(d.value.toFixed(2))).replace(
                        ',',
                        ' ',
                      )
                    : format('.3s')(d.value).replace('G', 'B')
                  : d.value}
                {d.suffix && d.value && d.value !== 'NA' ? ` ${d.suffix}` : ''}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </TooltipEl>
  );
}
