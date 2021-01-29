import * as React from 'react'
import { SyntheticEvent, useCallback, useState } from 'react';
import { Button } from '../../Common/Button';
import { useS3Client } from '../useS3Client';
import { Dispatch, getSelectedImage, IState, SIDES, } from '../Reducer'
import { ProgressBar } from '../../Common/ProgressBar';
import { Link } from '../../Common/Link';

interface PropTypes {
  dispatch: Dispatch,
  state: IState
}

const Input = ({ name, label, className = '', Component = null, type = 'text' }) => {
  const inputArgs = { name, className: "mt-1 block w-full border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-white bg-transparent p-0 pb-1" };
  return <label className={`block ${className}`}>
    <span>{label}</span>
    {Component ? <Component {...inputArgs} /> : <input type={type} {...inputArgs} />}
  </label>
};

const UPLOADED_STATUS = 'UPLOADED_STATUS';
const UPLOADING_STATUS = 'UPLOADING_STATUS';
const FORM_STATUS = 'FORM_STATUS';
const TOTAL_FILES = 5;

export const UploadStep = ({ state }: PropTypes) => {

  const [status, setStatus] = useState(FORM_STATUS);
  const {
    uploadPublicImage,
    uploadJsonFile,
    hash
  } = useS3Client();

  const [uploadProgress, setUploadProgress] = useState(0);

  const upload = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      setStatus(UPLOADING_STATUS);

      const imageUploads = SIDES.map((e) => {
        const img = getSelectedImage(state, e);
        return uploadPublicImage(e, img);
      })

      const fileUploads = [
        uploadJsonFile('public', {
          message: formData.get('message'),
          name: formData.get('name'),
        }, 'public-read'),
        uploadJsonFile('private', {
          email: formData.get('email')
        })
      ]
      const promises = [...imageUploads, ...fileUploads].map(async (e) => {
        await e;
        setUploadProgress((a) => a + 1);
      });

      await Promise.all(promises);
      setStatus(UPLOADED_STATUS);
    },
    [state],
  );

  return (
    <div className="mx-auto px-5">
      <div className="w-full lg:w-1/2 mx-auto">
        {
          status == FORM_STATUS ? <form onSubmit={upload}>

            <Input name="email" label="Email" className="mb-4" type="email" />
            <Input name="name" label="Name" className="mb-4" />
            <Input name="message" label="Message" Component={(args) => <textarea {...args} />} className="mb-8" />
            <div className="flex justify-center"><Button type="submit">Generate</Button></div>
          </form> : status == UPLOADING_STATUS ? <ProgressBar value={uploadProgress} total={TOTAL_FILES} /> : <div>
            <div className="text-2xl">
              All done checkout your link <Link href={`/slap/${hash}`}>here</Link>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
