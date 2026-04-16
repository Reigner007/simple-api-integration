import { Request, Response } from "express";
import { getGenderPrediction } from "../services/genderize.service";
import { isConfidentPrediction } from "../utils/confidence.util";

export const classifyName = async (req: Request, res: Response) => {
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

    const data = await getGenderPrediction(name);

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
      is_confident: isConfidentPrediction(data.probability, sample_size),
      processed_at: new Date().toISOString(),
    };

    return res.status(200).json({
      status: "success",
      data: result,
    });

  } catch (error) {
    return res.status(502).json({
      status: "error",
      message: "Upstream server error",
    });
  }
};