/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { timer } from 'd3-timer';
import { range } from 'd3-array';

interface Props {
  width: number;
  height: number;
  density: number;
  backgroundColor: string;
  color: string;
  note?: string;
  notePlacement: 'top' | 'bottom';
  overlayText: boolean;
  circleRadius: number;
}

const getBounds = (width: number, height: number) => {
  return {
    get w() {
      return width;
    },
    get h() {
      return height;
    },
    get x() {
      return [(width - this.w) / 2, (width + this.w) / 2];
    },
    get y() {
      return [(height - this.h) / 2, (height + this.h) / 2];
    },
  };
};

export function Particles(props: Props) {
  const {
    width,
    height,
    density,
    backgroundColor,
    color,
    note,
    notePlacement,
    overlayText,
    circleRadius,
  } = props;
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      const fill = color;
      const radius = circleRadius;
      graphDiv.current.style.height = `${height}px`;
      select(graphDiv.current).selectAll('canvas').remove();
      select(graphDiv.current).selectAll('div').remove();
      const canvas: any = select(graphDiv.current)
        .append('canvas')
        .attr('width', `${width}px`)
        .attr('height', `${height}px`)
        .style('aspect-ratio', `auto ${width}/${height}`);

      const context: any = canvas.node().getContext('2d');

      const nodes: {
        r: number;
        x: number;
        y: number;
        dx: number;
        dy: number;
      }[] = range(density).map(() => ({
        r: radius,
        x: Math.round(Math.random() * width),
        y: Math.round(Math.random() * height),
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      }));

      const draw = () => {
        context.clearRect(0, 0, width, height);

        // circles
        for (let i = 0; i < nodes.length; i += 1) {
          context.beginPath();
          context.fillStyle = fill;
          context.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, 2 * Math.PI);
          context.fill();
        }
      };

      const floating = () => {
        nodes.forEach((d: any) => {
          d.x += d.dx;
          if (
            d.x > getBounds(width, height).x[1] ||
            d.x < getBounds(width, height).x[0]
          )
            d.dx *= -1;
          d.y += d.dy;
          if (
            d.y > getBounds(width, height).y[1] ||
            d.y < getBounds(width, height).y[0]
          )
            d.dy *= -1;
        });

        draw();
      };

      timer(floating);
    }
  }, [graphDiv, height, width]);
  return (
    <div>
      {notePlacement === 'top' && !overlayText ? (
        <h6
          className='undp-typography margin-bottom-02'
          style={{ color: 'var(--blue-600)' }}
        >
          {note}
        </h6>
      ) : null}
      <div>
        <div
          ref={graphDiv}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor,
          }}
        />
        {notePlacement === 'bottom' && !overlayText && note ? (
          <h6
            className='undp-typography margin-top-03 margin-bottom-00'
            style={{ color: 'var(--blue-600)' }}
          >
            {note}
          </h6>
        ) : null}
      </div>
    </div>
  );
}
