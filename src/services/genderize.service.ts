import axios from "axios";
import { GenderizeResponse } from "../types/genderize.types";

export const getGenderPrediction = async (
  name: string
): Promise<GenderizeResponse> => {
  const response = await axios.get(
    `https://api.genderize.io?name=${name}`
  );

  return response.data;
};