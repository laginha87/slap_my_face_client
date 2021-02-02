import { generateRandomString } from 'app/Utils/generateRandomString'
import { useState } from 'react'

export const useId = (): string => useState(() => generateRandomString(40))[0]
