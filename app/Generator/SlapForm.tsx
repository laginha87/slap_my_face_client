import { Button } from 'app/Common/Button'
import { Input, Textarea } from 'app/Common/Input'
import { ColLayout } from 'app/Common/Layouts'
import { WithLoading } from 'app/Slap/Loading'
import { MouseControlled } from 'app/Slap/MouseControlled'
import { SlapArea, SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { TouchControlled } from 'app/Slap/TouchControlled'
import { IS_DESKTOP } from 'app/Utils/isDesktop'
import { Formik, Form } from 'formik'
import { compose } from 'lodash/fp'
import { FC } from 'react'
import { object, SchemaOf, string } from 'yup'

const LoadingSlapArea = compose(
  IS_DESKTOP ? MouseControlled : TouchControlled,
  WithLoading(640, 400)
)(SlapArea)

const SlapFields: FC<SlapAreaPropTypes> = (props) => {
  return (
    <ColLayout>
      <div className='mobile:w-full w-1/3 mb-3'>
        <Input name='name' placeholder='Your name here' />
      </div>
      <LoadingSlapArea {...props} />
      <div className='w-1/2 mb-4 mobile:w-full'>
        <Textarea name='message' placeholder='Leave a message' rows={5} />
      </div>
    </ColLayout>
  )
}

interface FormValues {
  name: string
  message: string
}

const VALIDATION_SCHEMA: SchemaOf<FormValues> = object({
  name: string()
    .label('Name')
    .required('This is needed so people know who they are slapping'),
  message: string()
    .label('Message')
    .required('This is what people will read when slapping you')
    .max(255)
})

type FormPropTypes = SlapAreaPropTypes & {
  onSubmit: (values: FormValues) => void
  onCancel: () => void
}

export const SlapForm: FC<FormPropTypes> = ({
  onCancel,
  onSubmit,
  ...props
}) => {
  return (
    <Formik
      initialValues={{
        name: '',
        message: ''
      }}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      <Form>
        <SlapFields {...props} />
        <div className='flex justify-center'>
          <Button type='submit' ml='2'>
            Looks good
          </Button>
          <Button onClick={onCancel} theme='secondary'>
            Start Over
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
