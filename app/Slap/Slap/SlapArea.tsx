import * as React from 'react';
import { FC, useCallback, useEffect, useState } from "react";

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

    useEffect(() => {
      const app = document.getElementById('app');
      const listener = (e) => {
        const cursor = e.clientX > window.innerWidth / 2 ? 'left' : 'right';
        app.classList.remove('right', 'left');
        app.classList.add(cursor);
      };
      app.addEventListener('mousemove', listener);

      return () => {
        app.classList.remove('right', 'left');
        app.removeEventListener('mousemove', listener);
      }
    }, []);

    return (
      <div>
        <img src={currentImage} className="mx-auto" onMouseEnter={onMouseEnter} onMouseLeave={slap} />
        {!hideCounter && <div className="text-center py-5 text-3xl">{slapCount}</div>}
      </div>
    )
  }