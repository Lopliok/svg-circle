import React from "react";

import { Round } from "./Round";
import {
  calculateRadius,
  calculateStrokeWidth,
  describeArc,
  percentageToArc
} from "./utils";

const defaultWidthOfPointer = 0.2; // percentually
const circleSize = 130;

export interface ICircleData {
  id: number;
  endRange?: number;
  startRange?: number;
  width?: number;
  color?: string;
  radius?: number;
  isRound?: boolean;
  withBlur?: boolean;
}

export interface ICircleProps {
  data: ICircleData[];
  isHalfHeight?: boolean;
}

const DefaultData = {
  color: "#D5F0C2",
  endRange: 100,
  radius: 0,
  startRange: 0,
  width: 10,
  isRound: false,
  withBlur: false
};

export const Circle: React.StatelessComponent<ICircleProps> = ({
  data,
  isHalfHeight = false
}) => {
  const circles = data.map(circleData => {
    if (circleData.endRange === undefined) {
      circleData.endRange =
        (circleData.startRange || 0) + defaultWidthOfPointer;
    }
    return { ...DefaultData, ...circleData };
  });

  const viewboxHeight = isHalfHeight ? circleSize * 0.6 : circleSize;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${circleSize} ${viewboxHeight}`}
    >
      <defs>
        <filter id="blurMe">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
      </defs>
      {circles.map(circle => (
        <g key={circle.id}>
          {circle.isRound ? (
            <Round
              width={circle.width}
              color={circle.color}
              fullCircleSize={circleSize}
              radius={calculateRadius(circleSize, circle.width, circle.radius)}
              angle={percentageToArc(circle.endRange)}
              withBlur={circle.withBlur}
            />
          ) : (
            <path
              key={circle.id}
              strokeWidth={calculateStrokeWidth(circle.width, circleSize)}
              fill="none"
              stroke={circle.color}
              d={describeArc(
                circleSize / 2,
                circleSize / 2,
                calculateRadius(circleSize, circle.width, circle.radius),
                percentageToArc(circle.startRange),
                percentageToArc(circle.endRange)
              )}
            />
          )}
        </g>
      ))}
    </svg>
  );
};
