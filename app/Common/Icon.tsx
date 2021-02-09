import { FC } from 'react'

interface IconProps {
  type: 'camera'
  size: 'xl'|'2xl' |'3xl'
}
export const Icon: FC<IconProps> = ({ type, size }) => <i className={`icon-${type} text-${size}`}/>
