import { Button, Input } from 'app/Common'
import { Form, Formik } from 'formik'
import { FC } from 'react'
import { object, SchemaOf, string } from 'yup'

interface FormProps {
  email: string
}

const VALIDATION_SCHEMA: SchemaOf<FormProps> = object({
  email: string().email().required()
})

export const UploadForm: FC<{ onSubmit: (values: FormProps) => void }> = ({
  onSubmit
}) => {
  return (
    <Formik
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{ email: '' }}
      onSubmit={onSubmit}
    >
      <Form>
        <div className='mb-4'>
          <Input name='email' label='Email' hideError />
        </div>
        <div className='flex justify-center'>
          <Button type='submit'>Generate</Button>
        </div>
      </Form>
    </Formik>
  )
}
