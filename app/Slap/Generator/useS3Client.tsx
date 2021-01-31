import { S3 } from '@aws-sdk/client-s3'
import { useCallback, useEffect, useRef } from 'react'
import { AWS_S3_ACCESS_KEY_ID, AWS_S3_BUCKET, AWS_S3_SECRET_ACCESS_KEY } from 'app/env'
import { generateRandomString } from '../Utils/generateRandomString'
import { Side } from './Reducer'
import { dataURItoBlob } from './dataURItoBlob'

export const useS3Client = () => {
  const s3Client = useRef<S3>()
  const hash = useRef<string>()

  useEffect(() => {
    hash.current = generateRandomString(40)
    s3Client.current = new S3({
      region: 'eu-west-3',
      credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY
      }
    })
  }, [])

  const uploadPublicImage = useCallback(async (side: Side, data: string) =>
    await s3Client.current.putObject({
      Bucket: AWS_S3_BUCKET,
      Key: [hash.current, side].join('/'),
      ContentType: 'image/jpeg',
      Body: dataURItoBlob(data),
      ACL: 'public-read'
    })
  , [])

  const uploadJsonFile = useCallback(async (name: string, data: Object, ACL = 'private') =>
    await s3Client.current.putObject({
      Bucket: AWS_S3_BUCKET,
      Key: [hash.current, name].join('/'),
      ContentType: 'application/json',
      Body: JSON.stringify(data),
      ACL
    })
  , [])

  return {
    uploadPublicImage,
    uploadJsonFile,
    hash: hash.current
  }
}
