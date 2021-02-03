import { FieldHookConfig, FieldMetaProps, useField } from 'formik'
import { FC, memo } from 'react'

const INPUT_CLASS =
  'mt-1 block w-full border-0 border-b-2 border-gray-400 focus:ring-0 bg-transparent p-0 pb-1 outline-none'

type InputAttributes = FieldHookConfig<string> & {
  label?: string
  className?: string
  hideError?: boolean
}

interface ErrorProps {
  meta: FieldMetaProps<string>
}

const Error: FC<ErrorProps> = ({ meta: { error, touched } }) => {
  const hasErrored = touched && error !== undefined
  if (hasErrored) {
    return <div className='text-red-500'>{error}</div>
  } else {
    return <div className='text-transparent select-none'>PLACEHOLDER</div>
  }
}

const inputClasses = ({ error, touched }: FieldMetaProps<string>): string =>
  INPUT_CLASS +
  (touched && error !== undefined
    ? ' border-red-500 focus:border-red-500 placeholder-red-300'
    : ' focus:border-white')

export const Input: FC<InputAttributes> = memo(
  ({ label, className = '', hideError = false, ...rest }) => {
    const [field, meta] = useField(rest)

    return (
      <label className={`block ${className}`}>
        {label !== undefined && <span>{label}</span>}
        <input {...field} {...(rest as any)} className={inputClasses(meta)} />
        {!hideError && <Error meta={meta} />}
      </label>
    )
  }
)

export const Textarea: FC<InputAttributes> = memo(
  ({ label, className = '', ...rest }) => {
    const [field, meta] = useField(rest)

    return (
      <label className={`block ${className}`}>
        {label !== undefined && <span>{label}</span>}
        <textarea
          {...field}
          {...(rest as any)}
          className={inputClasses(meta)}
        />
        <Error meta={meta} />
      </label>
    )
  }
)
