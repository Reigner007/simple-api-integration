"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenderPrediction = void 0;
const axios_1 = __importDefault(require("axios"));
const getGenderPrediction = async (name) => {
    const response = await axios_1.default.get(`https://api.genderize.io?name=${name}`);
    return response.data;
};
exports.getGenderPrediction = getGenderPrediction;
