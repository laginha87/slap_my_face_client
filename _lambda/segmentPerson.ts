import { BodyPix, load, SemanticPartSegmentation } from "@tensorflow-models/body-pix";
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
exports.handler = async (event) => {
  const bp = await load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2,
  });

  bp.segmentPersonParts(event, {
    flipHorizontal: true,
    internalResolution: 'medium',
    segmentationThreshold: 0.7,
  });
};
