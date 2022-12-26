import { GoogleCloudVision } from "@google-cloud/vision";

const analyzeProduct = async (imageData) => {
  // Create a new instance of the GoogleCloudVision client
  const vision = new GoogleCloudVision();

  // Use the vision client to detect labels in the image
  const [result] = await vision.labelDetection(imageData);

  // Get the labels from the response
  const labels = result.labelAnnotations;

  // Return the labels
  return labels;
};

export { analyzeProduct };
