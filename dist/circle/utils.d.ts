export declare function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): {
    x: number;
    y: number;
};
export declare function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string;
export declare const percentageToArc: (percentage: number) => number;
export declare const calculateStrokeWidth: (percentage: number, circleSize: number) => number;
export declare const calculateRadius: (circleSize: number, width: number, radius: number) => number;
