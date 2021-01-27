import * as React from 'react';
import { Side } from './Reducer';

export const ImageSelector: React.FC<{ images: string[]; setSelected: (arg0: Number) => void; selectedImage: Number; side: Side; }> = ({ images, setSelected, selectedImage, side }) => {
  if (images.length == 0) {
    return null;
  }

  return <>
    <h1>{side}</h1>
    {images.map((d, i) => (<img onClick={() => setSelected(i)} key={i} src={d} style={selectedImage == i ? { border: '1px solid red' } : {}} />))}</>;
};
