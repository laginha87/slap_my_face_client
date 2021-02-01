import { FC } from 'react'

export const Input: FC<{
  name: string
  label: string
  className: string
  Component?: FC<any>
  type?: 'email' | 'text'
}> = ({ name, label, className = '', Component = null, type = 'text' }) => {
  const inputArgs = {
    name,
    className:
      'mt-1 block w-full border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-white bg-transparent p-0 pb-1'
  }
  return (
    <label className={`block ${className}`}>
      <span>{label}</span>
      {Component !== null ? (
        <Component {...inputArgs} />
      ) : (
        <input type={type} {...inputArgs} />
      )}
    </label>
  )
}

export const Textarea: FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  args
) => <textarea {...args} />
