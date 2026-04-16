import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { name } = req.query;

    // 400: missing name
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Name query parameter is required",
      });
    }

    // call Genderize API
    const response = await axios.get(
      `https://api.genderize.io?name=${name}`
    );

    const data = response.data;

    // edge case
    if (!data.gender || data.count === 0) {
      return res.status(422).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    const sample_size = data.count;

    // SUCCESS RESPONSE
    return res.status(200).json({
      status: "success",
      data: {
        name: data.name,
        gender: data.gender,
        probability: data.probability,
        sample_size,
        is_confident:
          data.probability >= 0.7 && sample_size >= 100,
        processed_at: new Date().toISOString(),
      },
    });

  } catch (err) {
    return res.status(502).json({
      status: "error",
      message: "Upstream server error",
    });
  }
}