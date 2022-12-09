import styled from 'styled-components';
import { format } from 'd3-format';
import { HoverDataType } from '../Types';
import { HorizontalArrow, VerticalArrow } from '../Icons';

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
  z-index: 200;
  background-color: var(--gray-200);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 24rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

interface ColorIconProps {
  fill?:string;
}

const ColorIcon = styled.div<ColorIconProps>`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => (props.fill ? props.fill : 'var(--yellow)')};
  border: ${(props) => (props.fill === '#FFF' || props.fill === '#fff' || props.fill === '#FFFFFF' || props.fill === '#ffffff' ? '1px solid #AAA' : `1px solid ${props.fill}`)};
`;

const SizeIcon = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 0.875rem;
  border: 2px solid var(--gray-700);
`;

const IconDiv = styled.div`
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

const IconEl = styled.div`
  margin-top: 0.5rem;
`;

export const Tooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPosition} y={data.yPosition} verticalAlignment={data.yPosition > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPosition > window.innerWidth / 2 ? 'left' : 'right'}>
      <div className='flex-div flex-wrap' style={{ padding: 'var(--spacing-07)', alignItems: 'baseline' }}>
        <h5 className='undp-typography bold margin-bottom-00' style={{ color: 'var(--blue-600)' }}>
          {data.country}
          {' '}
          <span className='undp-typography small-font' style={{ color: 'var(--gray-700)', fontWeight: 'normal' }}>
            (
            {data.continent}
            )
          </span>
        </h5>
      </div>
      <hr className='undp-style margin-top-00 margin-bottom-00' />
      <div style={{ padding: 'var(--spacing-07) var(--spacing-07) 0 var(--spacing-07)' }}>
        {
          data.rows.map((d, i) => (
            <div className='flex-div margin-bottom-07' key={i} style={{ gap: '0.25rem' }}>
              <IconDiv>
                {
                  d.type === 'x-axis' ? <IconEl><HorizontalArrow size={20} /></IconEl>
                    : d.type === 'y-axis' ? <IconEl><VerticalArrow size={20} /></IconEl>
                      : d.type === 'color' ? <ColorIcon fill={d.color} />
                        : d.type === 'size' ? <SizeIcon />
                          : null
                }
              </IconDiv>
              <div>
                <p className='undp-typography large-font margin-bottom-00 margin-top-01' style={{ color: 'var(--gray-600)' }}>{d.year}</p>
                <h6 className='undp-typography margin-bottom-03'>{d.title}</h6>
                <h5 className='undp-typography margin-bottom-00 bold'>
                  {
                    d.prefix && d.value && d.value !== 'NA' ? `${d.prefix} ` : ''
                  }
                  {typeof d.value === 'number' ? d.value < 1000000 ? format(',')(parseFloat(d.value.toFixed(2))).replace(',', ' ') : format('.3s')(d.value).replace('G', 'B') : d.value }
                  {
                    d.suffix && d.value && d.value !== 'NA' ? ` ${d.suffix}` : ''
                  }
                </h5>
              </div>
            </div>
          ))
        }
      </div>
    </TooltipEl>
  );
};
