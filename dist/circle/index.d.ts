import React from "react";
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
export declare const Circle: React.StatelessComponent<ICircleProps>;
