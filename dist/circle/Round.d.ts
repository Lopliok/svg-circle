/// <reference types="react" />
export declare const getPointOnCircle: (circleSize: number, radius: number, angle: number) => {
    x: number;
    y: number;
};
interface IProps {
    width: number;
    color?: string;
    radius: number;
    fullCircleSize: number;
    angle: number;
    withBlur?: boolean;
}
export declare const Round: ({ width, color, radius, fullCircleSize, angle, withBlur }: IProps) => JSX.Element;
export {};
