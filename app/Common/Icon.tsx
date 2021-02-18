import { FC, HTMLAttributes } from 'react'

interface IconProps extends HTMLAttributes<HTMLElement>{
  type: 'camera'|'volume-off'|'volume-up'
  size: 'xl'|'2xl' |'3xl'
}

export const Icon: FC<IconProps> = ({ type, size, ...rest }) => <i className={`icon-${type} text-${size} cursor-pointer`} {...rest}/>
