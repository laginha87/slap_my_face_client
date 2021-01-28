import * as React from 'react';
import { FC, useCallback, useEffect, useState } from "react";


// const useImageDimensions = (path: string) => {
//   const [dimensions, setDimensions] = useState();
//   useEffect(() => {
//     const canvas = document.createElement('canvas');
//     const img = new Image;
//     img.src = path;
//     img.onload = () => {
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       const data = ctx.getImageData(0,0, img.width, img.height);
//       fo
//     };

//   }, []);
// }

export const SlapArea: FC<{
  left: string, right: string, center: string, hideCounter?: boolean, audio: HTMLAudioElement
}> = ({
  left, right, center, hideCounter = false, audio
}) => {
    const [currentImage, setCurrentImage] = useState(center);
    const [mouseEnterPos, setMouseEnterPos] = useState(0);
    const [slapCount, setSlapCount] = useState(0);

    const [audioIndex, setAudioIndex] = useState(0);

    const [audioSources, setAudioSources] = useState([]);

    useEffect(() => {
      setAudioSources(Array(100).fill(undefined).map(() => new Audio(audio.src)));
    }, []);

    const onMouseEnter = useCallback(
      (e) => {
        setMouseEnterPos(e.pageX)
      },
      [setMouseEnterPos],
    )

    const slap = useCallback(
      (e) => {
        e.pageX < mouseEnterPos ? setCurrentImage(left) : setCurrentImage(right);
        audioSources[audioIndex].play();
        setAudioIndex((n) => (n + 1) % audioSources.length);
        setSlapCount((s) => s + 1);
      },
      [mouseEnterPos, setCurrentImage],
    )


    useEffect(() => {
      const timeout = setTimeout(() => {
        setCurrentImage(center);
      }, 400)
      return () => {
        clearTimeout(timeout);
      }
    }, [slapCount]);

    return (
      <div>
        <img src={currentImage} className="mx-auto" onMouseEnter={onMouseEnter} onMouseLeave={slap} />
        {!hideCounter && <div className="text-center">{slapCount}</div>}
      </div>
    )
  }