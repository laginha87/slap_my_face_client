import { FC } from 'react'

export type Hoc<T> = (Fc: FC<T>) => FC<T>
