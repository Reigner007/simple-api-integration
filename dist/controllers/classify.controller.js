"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyName = void 0;
const genderize_service_1 = require("../services/genderize.service");
const confidence_util_1 = require("../utils/confidence.util");
const classifyName = async (req, res) => {
    try {
        const { name } = req.query;
        // Check if name is missing or empty
        if (!name || (typeof name === "string" && name.trim() === "")) {
            return res.status(400).json({
                status: "error",
                message: "Name query parameter is required",
            });
        }
        // Ensure name is a string
        if (typeof name !== "string") {
            return res.status(422).json({
                status: "error",
                message: "Name must be a string",
            });
        }
        const data = await (0, genderize_service_1.getGenderPrediction)(name);
        // Handle Genderize edge case
        if (!data.gender || data.count === 0) {
            return res.status(422).json({
                status: "error",
                message: "No prediction available for the provided name",
            });
        }
        const sample_size = data.count;
        const result = {
            name: data.name,
            gender: data.gender,
            probability: data.probability,
            sample_size,
            is_confident: (0, confidence_util_1.isConfidentPrediction)(data.probability, sample_size),
            processed_at: new Date().toISOString(),
        };
        return res.status(200).json({
            status: "success",
            data: result,
        });
    }
    catch (error) {
        return res.status(502).json({
            status: "error",
            message: "Upstream server error",
        });
    }
};
exports.classifyName = classifyName;
