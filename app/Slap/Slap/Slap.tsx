import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { SlapArea } from './SlapArea';
import slapAudio from '../../assets/audio/slap.wav';

const Loading: FC<{ width: number, height: number }> = ({ width, height }) => {
  const [loadtext, setLoadtext] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => { setLoadtext((v) => Array((v.length + 1) % 3 + 1).fill('.').join('')) }, 200);
    return () => {
      clearInterval(interval)
    }
  }, []);
  return <div style={{ height, width }} className="text-3xl relative">
    <div className="absolute top-1/2 left-1/2 -ml-32"> Loading {loadtext}</div>
  </div>;
}

function useImage(path): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var newImg = new Image;
    newImg.onload = () => {
      setIsLoading(false);
    };
    newImg.src = path;
  }, []);

  return isLoading;
};

function useAudio(path): [boolean, HTMLAudioElement] {
  const [isLoading, setIsLoading] = useState(true);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audio = new Audio(path);
    setAudio(audio);
    audio.addEventListener('canplaythrough', () => {
      setIsLoading(false);
    })
  }, []);

  return [isLoading, audio];
};

export const Slap: FC<{ center: string, left: string, right: string, loading: boolean, name: string, message: string }> = ({
  center, left, right, name, message, loading
}) => {

  const [isLoadingAudio, audio] = useAudio(slapAudio);
  const isLoading = [useImage(center), useImage(left), useImage(right), loading, isLoadingAudio].some((e) => e);

  return <>
    {isLoading ? <div className="flex justify-center"> <Loading width={640} height={320} />  </div> :
      <>
        <h2 className="text-2xl text-center">{name}</h2>
        <SlapArea right={right} left={left} center={center} audio={audio} />
        <div> <div className="px-4 py-2 border-white mt-4 border-t w-96 mx-auto">{message}</div></div>
      </>}
  </>;
}
