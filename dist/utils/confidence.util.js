"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfidentPrediction = void 0;
const isConfidentPrediction = (probability, sampleSize) => {
    return probability >= 0.7 && sampleSize >= 100;
};
exports.isConfidentPrediction = isConfidentPrediction;
