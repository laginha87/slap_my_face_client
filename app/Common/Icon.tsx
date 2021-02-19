import { FC, HTMLAttributes } from 'react'

interface IconProps extends HTMLAttributes<HTMLElement>{
  type: 'camera'| 'volume-off'| 'volume-up'| 'cancel'| 'desktop'| 'help'| 'info'| 'share'
  size: 'xl'|'2xl' |'3xl'
  color?: 'black' | 'white'
}

export const Icon: FC<IconProps> = ({ type, size, color = 'white', ...rest }) => <i className={`icon-${type} text-${size} text-${color} cursor-pointer`} {...rest}/>
