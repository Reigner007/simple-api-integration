export const isConfidentPrediction = (
  probability: number,
  sampleSize: number
): boolean => {
  return probability >= 0.7 && sampleSize >= 100;
};