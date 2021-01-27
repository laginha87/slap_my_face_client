import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
// import center from '../../assets/center.png';
// import left from '../../assets/left.png';
// import right from '../../assets/right.png';
import { Side } from '../Generator/Reducer';
import { Slap } from './Slap';
import { AWS_S3_BUCKET, AWS_S3_REGION } from '../../../env';

function buildS3Url(path: string): string {
  return `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${path}`;
}

const Loading: FC<{ width: number, height: number }> = ({ width, height }) => {
  const [loadtext, setLoadtext] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => { setLoadtext((v) => Array((v.length + 1) % 3 + 1).fill('.').join('')) }, 200);
    return () => {
      clearInterval(interval)
    }
  }, []);
  return <div style={{ height, width }} className="font-title text-3xl relative text-white">
    <div className="absolute top-1/2 left-1/2 -ml-32"> Loading {loadtext}</div>
  </div>;
}

function useS3Image(s3Id: string, side: Side): [boolean, string] {
  const [src, setSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var newImg = new Image;
    newImg.onload = () => {
      setSrc(newImg.src);
      setIsLoading(false);
    };
    newImg.src = buildS3Url(`${s3Id}/${side}`);
  }, []);

  return [isLoading, src];
};

function useS3File<T>(path: string): [boolean, T] {
  const s3Url = buildS3Url(path);
  const [file, setFile] = useState<T>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(s3Url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async (f) => {
      setFile(await f.json());
      setLoading(false);
    });
  }, []);

  return [loading, file];
}

export const SlapPage = () => {
  const { id } = useParams<{ id: string }>();
  const [centerImgLoading, centerImgPath] = useS3Image(id, 'center');
  const [leftImgLoading, leftImgPath] = useS3Image(id, 'left');
  const [rightImgLoading, rightImgPath] = useS3Image(id, 'right');
  const [loadingData, data] = useS3File<{ message: string, name: string }>(`${id}/public`);

  const isLoading = centerImgLoading || leftImgLoading || rightImgLoading || loadingData;

  return <div className="text-white font-title">
    <h1 className="text-4xl text-center">Slap My Face</h1>

    {isLoading ? <div className="flex justify-center"> <Loading width={640} height={320} />  </div> :
      <>
        <h2 className="text-2xl text-center">{data.name}</h2>
        <Slap right={rightImgPath} left={leftImgPath} center={centerImgPath} />
        <div> <div className="px-4 py-2 border-white mt-4 border-t w-96 mx-auto">{data.message}</div></div>
      </>}
  </div>;
}
