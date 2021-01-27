import * as React from 'react'
import { SyntheticEvent, useCallback, useState } from 'react';
import { Button } from '../../Common/Button';
import { useS3Client } from '../useS3Client';
import { Dispatch, getSelectedImage, IState, SIDES, } from '../Reducer'

interface PropTypes {
  dispatch: Dispatch,
  state: IState
}

const Input = ({ name, label, className = '', Component = null, type = 'text' }) => {
  const inputArgs = { name, className: "mt-1 block w-full border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-white bg-transparent p-0 pb-1" };
  return <label className={`block font-title text-white ${className}`}>
    <span>{label}</span>
    {Component ? <Component {...inputArgs} /> : <input type={type} {...inputArgs} />}
  </label>
};

const UPLOADED_STATUS = 'UPLOADED_STATUS';
const UPLOADING_STATUS = 'UPLOADING_STATUS';
const FORM_STATUS = 'FORM_STATUS';
const TOTAL_FILES = 5;

const ProgressBar = ({ value, total }) => <div className="relative pt-1">
  <div className="flex mb-2 items-center justify-between">
    <div>
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
        Generating
    </span>
    </div>
    <div className="text-right">
      <span className="text-xs font-semibold inline-block text-green-600">
        {Math.ceil((value / total) * 100)} %
    </span>
    </div>
  </div>
  <div className="overflow-hidden h-10 mb-4 text-xs flex rounded bg-green-200">
    <div style={{ width: value / total + "%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
  </div>
</div>

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
              All done checkout your link at <a href={`/slap/${hash}`}>here</a>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
