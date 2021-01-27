import * as React from 'react';
import { FC } from 'react'


interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ml?: string
};
export const Button: FC<PropTypes> = ({ children, ml = '0', className: _className, ...args }) => {
  return (
    <button className={`bg-blue-500 font-title text-white border-white rounded-sm cursor-pointer inline-block px-5 py-2 ml-${ml}`} {...args}>
      {children}
    </button>
  )
}
