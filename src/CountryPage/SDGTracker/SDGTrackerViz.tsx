import { useState } from 'react';
import styled from 'styled-components';
import UNDPColorModule from 'undp-viz-colors';
import { TargetStatusType } from '../../Types';
import { describeArc } from '../../Utils/GetArc';
import { TargetIndicatorCount } from '../../Constants';
import { getSDGIconSVG } from '../../Utils/GetSDGIcon';

interface Props {
  targetStatuses: TargetStatusType[];
}

interface SDGHoveredProps {
  title: string;
  percent: number;
  value: number;
  xPosition: number;
  yPosition: number;
  color: string;
  totalValue: number;
}

interface TooltipElProps {
  x: number;
  y: number;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 1000;
  font-size: 0.875rem;
  background-color: var(--gray-100);
  word-wrap: break-word;
  top: ${props => props.y - 5}px;
  left: ${props => props.x}px;
  transform: translate(-50%, -100%);
  padding: 0.5rem;
`;

export function SDGTrackerViz(props: Props) {
  const { targetStatuses } = props;
  const [hoveredSDG, setHoveredSDG] = useState<null | SDGHoveredProps>(null);
  const SDGList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
  ];
  const statusBySDG = SDGList.map((p, i) => {
    const onTrack = targetStatuses.filter(
      d => d.status === 'On Track' && p === d.goal,
    ).length;
    const identifiedGap = targetStatuses.filter(
      d => d.status === 'Identified Gap' && p === d.goal,
    ).length;
    const forReview = targetStatuses.filter(
      d => d.status === 'For Review' && p === d.goal,
    ).length;
    return {
      goal: p,
      onTrack,
      identifiedGap,
      forReview,
      totalNoOfTargets: TargetIndicatorCount[i].noOfTargets,
      gapsNA:
        TargetIndicatorCount[i].noOfTargets -
        (onTrack + identifiedGap + forReview),
    };
  });
  return (
    <div
      className='max-width-1980'
      style={{
        minWidth: '22.5rem',
        backgroundColor: 'var(--white)',
        padding: 'var(--spacing-07) var(--spacing-06)',
      }}
    >
      <div>
        <div
          className='flex-div flex-wrap'
          style={{ justifyContent: 'center' }}
        >
          {statusBySDG.map((d, i) => (
            <svg
              width='calc(16.66% - 0.8333rem)'
              style={{
                maxWidth: '320px',
              }}
              key={i}
              viewBox='0 0 320 320'
            >
              <g transform='translate(160, 160)'>
                <text x={0} y={190} fontSize={18} fontWeight='bold'>
                  SDG {d.goal}
                </text>
                <g transform='translate(-64,-64)'>
                  {getSDGIconSVG(
                    `SDG ${d.goal}`,
                    128,
                    false,
                    (UNDPColorModule.sdgColors as any)[`sdg${d.goal}`],
                  )}
                </g>
                <circle
                  r={120}
                  cx={0}
                  cy={0}
                  style={{
                    fillOpacity: 0,
                    stroke: 'var(--gray-400)',
                    strokeWidth: 45,
                  }}
                />
                <path
                  d={describeArc(
                    0,
                    0,
                    120,
                    0,
                    (d.onTrack * 360) / d.totalNoOfTargets,
                  )}
                  style={{
                    fillOpacity: 0,
                    stroke: 'var(--dark-green)',
                    strokeWidth: 45,
                  }}
                  onMouseEnter={event => {
                    setHoveredSDG({
                      title: 'On Track',
                      value: d.onTrack,
                      percent: d.onTrack / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--dark-green)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseMove={event => {
                    setHoveredSDG({
                      title: 'On Track',
                      value: d.onTrack,
                      percent: d.onTrack / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--dark-green)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredSDG(null);
                  }}
                />
                <path
                  d={describeArc(
                    0,
                    0,
                    120,
                    (d.onTrack * 360) / d.totalNoOfTargets,
                    ((d.onTrack + d.forReview) * 360) / d.totalNoOfTargets,
                  )}
                  style={{
                    fillOpacity: 0,
                    stroke: 'var(--dark-yellow)',
                    strokeWidth: 45,
                  }}
                  onMouseEnter={event => {
                    setHoveredSDG({
                      title: 'For Review',
                      value: d.forReview,
                      percent: d.forReview / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--dark-yellow)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseMove={event => {
                    setHoveredSDG({
                      title: 'For Review',
                      value: d.forReview,
                      percent: d.forReview / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--dark-yellow)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredSDG(null);
                  }}
                />
                <path
                  d={describeArc(
                    0,
                    0,
                    120,
                    ((d.onTrack + d.forReview) * 360) / d.totalNoOfTargets,
                    ((d.onTrack + d.forReview + d.identifiedGap) * 360) /
                      d.totalNoOfTargets,
                  )}
                  style={{
                    fillOpacity: 0,
                    stroke: 'var(--dark-red)',
                    strokeWidth: 45,
                  }}
                  onMouseEnter={event => {
                    setHoveredSDG({
                      title: 'Off Track',
                      value: d.identifiedGap,
                      percent: d.identifiedGap / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--dark-red)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseMove={event => {
                    setHoveredSDG({
                      title: 'Off Track',
                      value: d.identifiedGap,
                      percent: d.identifiedGap / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--dark-red)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredSDG(null);
                  }}
                />
                <path
                  d={describeArc(
                    0,
                    0,
                    120,
                    ((d.onTrack + d.forReview + d.identifiedGap) * 360) /
                      d.totalNoOfTargets,
                    360,
                  )}
                  style={{
                    fillOpacity: 0,
                    stroke: 'var(--gray-400)',
                    strokeWidth: 45,
                  }}
                  onMouseEnter={event => {
                    setHoveredSDG({
                      title: 'Gaps NA',
                      value: d.gapsNA,
                      percent: d.gapsNA / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--gray-700)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseMove={event => {
                    setHoveredSDG({
                      title: 'Gaps NA',
                      value: d.gapsNA,
                      percent: d.gapsNA / d.totalNoOfTargets,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                      color: 'var(--gray-700)',
                      totalValue: d.totalNoOfTargets,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredSDG(null);
                  }}
                />
              </g>
            </svg>
          ))}
        </div>
        <div
          className='flex-div flex-wrap gap-07 margin-top-07'
          style={{ justifyContent: 'center', padding: '0' }}
        >
          <div
            className='flex-div flex-vert-align-center gap-03'
            style={{ width: '97px' }}
          >
            <div
              style={{
                width: '0.875rem',
                height: '0.875rem',
                backgroundColor: 'var(--dark-green)',
                borderRadius: '1rem',
              }}
            />
            <p
              className='margin-bottom-00 margin-top-00'
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                flexGrow: 1,
              }}
            >
              On Track
            </p>
          </div>
          <div
            className='flex-div flex-vert-align-center gap-03'
            style={{ width: '113px' }}
          >
            <div
              style={{
                width: '0.875rem',
                height: '0.875rem',
                backgroundColor: 'var(--dark-yellow)',
                borderRadius: '1rem',
              }}
            />
            <p
              className='margin-bottom-00 margin-top-00'
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                flexGrow: 1,
              }}
            >
              For Review
            </p>
          </div>
          <div
            className='flex-div flex-vert-align-center gap-03'
            style={{ width: '103px' }}
          >
            <div
              style={{
                width: '0.875rem',
                height: '0.875rem',
                backgroundColor: 'var(--dark-red)',
                borderRadius: '1rem',
              }}
            />
            <p
              className='margin-bottom-00 margin-top-00'
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                flexGrow: 1,
              }}
            >
              Off Track
            </p>
          </div>
          <div
            className='flex-div flex-vert-align-center gap-03'
            style={{ width: '105px' }}
          >
            <div
              style={{
                width: '0.875rem',
                height: '0.875rem',
                backgroundColor: 'var(--gray-400)',
                borderRadius: '1rem',
              }}
            />
            <p
              className='margin-bottom-00 margin-top-00'
              style={{
                fontFamily:
                  'ProximaNova, proxima-nova, Helvetica Neue, sans-serif',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                flexGrow: 1,
              }}
            >
              Trends NA
            </p>
          </div>
        </div>
      </div>
      {hoveredSDG ? (
        <TooltipEl x={hoveredSDG.xPosition} y={hoveredSDG.yPosition}>
          <h6
            className='undp-typography margin-bottom-02'
            style={{ color: hoveredSDG.color }}
          >
            {hoveredSDG.title}
          </h6>
          <p
            className='undp-typography margin-bottom-00 bold'
            style={{ fontSize: '1rem', color: hoveredSDG.color }}
          >
            {hoveredSDG.value} out of {hoveredSDG.totalValue} targets
            <br />({(hoveredSDG.percent * 100).toFixed(1)}
            %)
          </p>
        </TooltipEl>
      ) : null}
    </div>
  );
}
