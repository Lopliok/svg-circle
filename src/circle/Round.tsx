import React from "react";

import { polarToCartesian } from "./utils";

export const getPointOnCircle = (
  circleSize: number,
  radius: number,
  angle: number
): { x: number; y: number } =>
  polarToCartesian(circleSize / 2, circleSize / 2, radius, angle);

interface IProps {
  width: number;
  color?: string;
  radius: number;
  fullCircleSize: number;
  angle: number;
  withBlur?: boolean;
}

interface ISVGCircle extends React.SVGProps<SVGCircleElement> {}

export const Round = ({
  width,
  color = "#FFF",
  radius,
  fullCircleSize,
  angle,
  withBlur = false
}: IProps) => {
  const center = getPointOnCircle(fullCircleSize, radius, angle);

  const circleProps: ISVGCircle = {
    fill: color,
    cx: center.x,
    cy: center.y,
    r: width / 2
  };

  if (withBlur) circleProps.filter = "url(#blurMe)";

  return <circle {...circleProps} />;
};
