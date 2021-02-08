import { useCallback, useState, FC } from 'react'
import { ProgressBar, Link } from 'app/Common'
import { generateS3Client, generatePath, uploadFile } from 'app/Services/S3'

import { getSelectedImage, SIDES, StepPropTypes } from 'app/Generator/Reducer'
import { useId } from 'app/Hooks/useId'
import { UploadForm } from 'app/Generator/Steps/UploadForm'

const UPLOADED_STATUS = 'UPLOADED_STATUS'
const UPLOADING_STATUS = 'UPLOADING_STATUS'
const FORM_STATUS = 'FORM_STATUS'
const TOTAL_FILES = 5

export const UploadStep: FC<StepPropTypes> = ({ state }) => {
  const [status, setStatus] = useState(FORM_STATUS)
  const [s3Client] = useState(generateS3Client)
  const slapId = useId()
  const [uploadProgress, setUploadProgress] = useState(0)

  const upload = useCallback(
    async ({ email }) => {
      const { name, message } = state
      setStatus(UPLOADING_STATUS)
      const imageUploads = SIDES.map(async (e) => {
        const img = getSelectedImage(state, e)
        return await uploadFile(
          s3Client,
          img,
          generatePath(slapId, e),
          'image',
          false
        )
      })

      const fileUploads = [
        uploadFile(
          s3Client,
          {
            message,
            name
          },
          generatePath(slapId, 'public'),
          'json',
          false
        ),
        uploadFile(
          s3Client,
          {
            email
          },
          generatePath(slapId, 'private'),
          'json',
          true
        )
      ]
      const promises = [...imageUploads, ...fileUploads].map(async (e) => {
        await e
        setUploadProgress((a) => a + 1)
      })

      await Promise.all(promises)
      setStatus(UPLOADED_STATUS)
    },
    [state]
  )

  return (
    <div className='mx-auto px-5'>
      <div className='w-full lg:w-1/2 mx-auto'>
        {status === FORM_STATUS
          ? (
          <UploadForm onSubmit={upload} />
            )
          : status === UPLOADING_STATUS
            ? (
          <ProgressBar value={uploadProgress} total={TOTAL_FILES} />
              )
            : (
          <div>
            <div className='text-2xl'>
              All done checkout your link{' '}
              <Link href={`/slap/${slapId}`}>here</Link>
            </div>
          </div>
              )}
      </div>
    </div>
  )
}
