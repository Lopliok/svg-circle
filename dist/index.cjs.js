'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var differenceOfBox = 1;
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}
function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle - 0.001);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return "M " + start.x + " " + start.y + " A " + radius + " " + radius + " 0 " + largeArcFlag + " 0 " + end.x + " " + end.y;
}
var percentageToArc = function (percentage) {
    return 3.6 * percentage;
};
var calculateStrokeWidth = function (percentage, circleSize) {
    return (percentage / 100) * circleSize;
};
var calculateRadius = function (circleSize, width, radius) {
    return circleSize / 2 - calculateStrokeWidth(width, circleSize) / 2 - radius - differenceOfBox;
};

var getPointOnCircle = function (circleSize, radius, angle) {
    return polarToCartesian(circleSize / 2, circleSize / 2, radius, angle);
};
var Round = function (_a) {
    var width = _a.width, _b = _a.color, color = _b === void 0 ? "#FFF" : _b, radius = _a.radius, fullCircleSize = _a.fullCircleSize, angle = _a.angle, _c = _a.withBlur, withBlur = _c === void 0 ? false : _c;
    var center = getPointOnCircle(fullCircleSize, radius, angle);
    var circleProps = {
        fill: color,
        cx: center.x,
        cy: center.y,
        r: width / 2
    };
    if (withBlur)
        circleProps.filter = "url(#blurMe)";
    return React.createElement("circle", __assign({}, circleProps));
};

var defaultWidthOfPointer = 0.2; // percentually
var circleSize = 130;
var DefaultData = {
    color: "#D5F0C2",
    endRange: 100,
    radius: 0,
    startRange: 0,
    width: 10,
    isRound: false,
    withBlur: false
};
var Circle = function (_a) {
    var data = _a.data, _b = _a.isHalfHeight, isHalfHeight = _b === void 0 ? false : _b;
    var circles = data.map(function (circleData) {
        if (circleData.endRange === undefined) {
            circleData.endRange =
                (circleData.startRange || 0) + defaultWidthOfPointer;
        }
        return __assign(__assign({}, DefaultData), circleData);
    });
    var viewboxHeight = isHalfHeight ? circleSize * 0.6 : circleSize;
    return (React.createElement("svg", { width: "100%", height: "100%", viewBox: "0 0 " + circleSize + " " + viewboxHeight },
        React.createElement("defs", null,
            React.createElement("filter", { id: "blurMe" },
                React.createElement("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "1" }))),
        circles.map(function (circle) { return (React.createElement("g", { key: circle.id }, circle.isRound ? (React.createElement(Round, { width: circle.width, color: circle.color, fullCircleSize: circleSize, radius: calculateRadius(circleSize, circle.width, circle.radius), angle: percentageToArc(circle.endRange), withBlur: circle.withBlur })) : (React.createElement("path", { key: circle.id, strokeWidth: calculateStrokeWidth(circle.width, circleSize), fill: "none", stroke: circle.color, d: describeArc(circleSize / 2, circleSize / 2, calculateRadius(circleSize, circle.width, circle.radius), percentageToArc(circle.startRange), percentageToArc(circle.endRange)) })))); })));
};

module.exports = Circle;
