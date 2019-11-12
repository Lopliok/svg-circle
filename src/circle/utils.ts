const differenceOfBox = 1

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

export function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(x, y, radius, endAngle - 0.001)
  const end = polarToCartesian(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${
    end.x
  } ${end.y}`
}

export const percentageToArc = (percentage: number): number => {
  return 3.6 * percentage
}

export const calculateStrokeWidth = (
  percentage: number,
  circleSize: number,
): number => {
  return (percentage / 100) * circleSize
}

export const calculateRadius = (
  circleSize: number,
  width: number,
  radius: number,
): number =>
  circleSize / 2 - calculateStrokeWidth(width, circleSize) / 2 - radius - differenceOfBox
