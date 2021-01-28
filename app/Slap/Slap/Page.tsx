import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { AWS_S3_BUCKET, AWS_S3_REGION } from '../../../env';
import { Slap } from './Slap';

function buildS3Url(path: string): string {
  return `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${path}`;
}

function useS3File<T>(path: string): [boolean, Partial<T>] {
  const s3Url = buildS3Url(path);
  const [file, setFile] = useState<Partial<T>>({});
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
  const [loading, { name, message }] = useS3File<{ message: string, name: string }>(`${id}/public`);

  return <div>
    <h1 className="text-4xl text-center">Slap My Face</h1>

    <Slap loading={loading}
      left={buildS3Url(`${id}/left`)}
      right={buildS3Url(`${id}/right`)}
      center={buildS3Url(`${id}/center`)}
      name={name}
      message={message}
    />
  </div>;
}
