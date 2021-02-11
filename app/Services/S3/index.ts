import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_BUCKET,
  AWS_S3_REGION,
  AWS_S3_SECRET_ACCESS_KEY
} from 'app/env'
import { dataURItoBlob } from 'app/Utils/dataURItoBlob'
import { useEffect, useState } from 'react'

export const generateS3Client = (): S3Client =>
  new S3Client({
    region: 'eu-west-3',
    credentials: {
      accessKeyId: AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: AWS_S3_SECRET_ACCESS_KEY
    }
  })

export const generatePath = (hash: string, fileName: string): string =>
  [hash, fileName].join('/')

export async function uploadFile (
  s3Client: S3Client,
  data: string | any,
  key: string,
  type: 'json' | 'image',
  privateFile = true
): Promise<any> {
  const dataTransform = type === 'json' ? JSON.stringify : dataURItoBlob

  return await s3Client.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: key,
      ContentType: type === 'json' ? 'application/json' : 'image/png',
      Body: dataTransform(data),
      ACL: privateFile ? 'private' : 'public-read'
    })
  )
}

export function buildS3Url (path: string): string {
  return `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${path}`
}

export function useS3File<T> (path: string): [boolean, Partial<T>] {
  const s3Url = buildS3Url(path)
  const [file, setFile] = useState<Partial<T>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      const f = await fetch(s3Url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setFile(await f.json())
      setLoading(false)
    })()
  }, [s3Url])

  return [loading, file]
}
