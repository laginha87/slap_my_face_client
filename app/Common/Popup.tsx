import { Icon } from 'app/Common/Icon'
import * as React from 'react'
import { FC, useCallback, useEffect } from 'react'

interface Props {
  open: boolean
  setOpen: (a: boolean) => void
  title: string
}

export const Popup: FC<Props> = ({ children, open, setOpen, title }) => {
  const closePopup = useCallback(
    () => {
      setOpen(false)
    },
    [setOpen]
  )
  useEffect(() => {
    const cleanup = (): void => { document.body.classList.remove('h-full', 'overflow-hidden') }
    if (open) {
      document.body.classList.add('h-full', 'overflow-hidden')
    } else {
      cleanup()
    }
    return cleanup
  }, [open])
  if (!open) { return null }
  return <div className="h-screen absolute w-screen top-0 left-0 flex justify-center items-center z-50">
    <div className="bg-gray-200 opacity-80 w-full h-full absolute top-0 left-0"></div>
    <div className="bg-white px-5 py-10 w-full sm:w-1/3 z-50">
      <div className="pb-2 mb-4 flex border-b border-black justify-between">
        <div className="text-black">{title}</div>
        <Icon size='xl' type='cancel' color='black' onClick={closePopup}/>
      </div>
      {children}</div>
  </div>
}
