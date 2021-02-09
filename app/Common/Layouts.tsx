import { FC } from 'react'

export const ColLayout: FC<{className?: string}> = ({ children, className = '' }) => (
  <div className={`flex flex-col justify-center items-center ${className}`}>{children}</div>
)
