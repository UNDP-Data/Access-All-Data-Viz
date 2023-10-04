import sortBy from 'lodash.sortby';

/* eslint-disable no-restricted-syntax */
interface CoordinatesProps {
  x: number;
  y: number;
  distanceFromCenter: number;
}

const generateRandomPoint = (circleRadius: number) => {
  const angle = Math.random() * Math.PI * 2;
  const distanceFromCenter = Math.sqrt(Math.random()) * circleRadius;
  const x = distanceFromCenter * Math.cos(angle);
  const y = distanceFromCenter * Math.sin(angle);
  return { x, y, distanceFromCenter };
};

const checkCollision = (
  newPoint: CoordinatesProps,
  pointRadius: number,
  points: CoordinatesProps[],
) => {
  for (const point of points) {
    const dx = newPoint.x - point.x;
    const dy = newPoint.y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < pointRadius) {
      return true; // Collision detected
    }
  }
  return false; // No collision
};

export const generateUniqueRandomPointsArray = (
  noOfPoints: number,
  areaRadius: number,
  pointRadius: number,
) => {
  const points: CoordinatesProps[] = [];
  let counter = 0;
  while (points.length < noOfPoints) {
    const newPoint = generateRandomPoint(areaRadius);
    if (!checkCollision(newPoint, pointRadius, points) || counter > 10) {
      points.push({
        x: newPoint.x,
        y: newPoint.y,
        distanceFromCenter: newPoint.distanceFromCenter,
      });
      counter = 0;
    } else {
      counter += 1;
    }
  }
  const sortedPoints = sortBy(points, d => d.distanceFromCenter);
  return sortedPoints;
};
