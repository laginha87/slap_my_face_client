import { FC } from 'react'

export const Title: FC = ({ children }) => (
  <div className={SIZES.title}>{children}</div>
)

export const SIZES = {
  title: 'text-2xl'
}
