import {  Image } from 'canvas';

import '@tensorflow/tfjs-node';
import '@tensorflow/tfjs-node-gpu';

import { load } from "@tensorflow-models/body-pix";
exports.handler = async (event: { content: string }) => {
  const img = new Image();
  img.src = atob(event.content);


  const bp = await load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2,
  });

  const res = await bp.segmentPersonParts(img as any, {
    flipHorizontal: true,
    internalResolution: 'medium',
    segmentationThreshold: 0.7,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
};
