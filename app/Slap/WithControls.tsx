import { Hoc } from 'app/Slap/Hoc'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { FC, ReactNode } from 'react'

interface Controls {
  controls?: ReactNode[]
}

export type Controlled<T> = T & Controls

export const WithControls: Hoc<SlapAreaPropTypes> = (Fc) => {
  const ResComponent: FC<Controlled<SlapAreaPropTypes>> = ({ controls, ...rest }) => {
    return <div className="relative">
      <div className="flex justify-end">{controls}</div>
      <Fc {...rest}/>
    </div>
  }

  ResComponent.displayName = `WithControls${Fc.displayName === undefined ? '' : Fc.displayName}`
  return ResComponent
}
