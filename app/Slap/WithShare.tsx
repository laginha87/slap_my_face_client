import { Hoc } from 'app/Slap/Hoc'
import { Loadable, LoadableComponent } from 'app/Slap/Loading'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { Controlled } from 'app/Slap/WithControls'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Icon } from 'app/Common/Icon'
import { Popup } from 'app/Common/Popup'
import { Button } from 'app/Common'

export const WithShare: Hoc<Loadable<Controlled<SlapAreaPropTypes>>> = (
  Fc
) => {
  const ResComponent: LoadableComponent<Controlled<SlapAreaPropTypes>> = ({
    loading,
    controls = [],
    ...props
  }) => {
    const copyElement = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [hasCopied, setHasCopied] = useState(false)

    const openPopup = useCallback(() => setIsOpen(true), [])

    const newControls = useMemo(() => [...controls,
      <Icon key="sharePopup" size='3xl' onClick={openPopup} type={'share'}/>], [controls, openPopup])

    const copy = useCallback(
      () => {
        /* Select the text field */
        copyElement.current?.select()
        copyElement.current?.setSelectionRange(0, 99999) /* For mobile devices */
        setHasCopied(true)
        /* Copy the   ext inside the text field */
        document.execCommand('copy')
        copyElement.current?.blur()
      },
      []
    )

    const close = useCallback(() => {
      setHasCopied(false)
      setIsOpen(false)
    }, [])

    return <>
      <Popup open={isOpen} title="Share" close={close}>
        <input className="absolute" style={{ left: -1000, top: -1000 }} value={location.href} ref={copyElement}/>
        <div className="flex">
          <div className='bg-gray-500 px-4 flex-grow flex items-center overflow-hidden pr-10'>{hasCopied ? 'Copied' : location.href}</div>
          <Button onClick={copy}>COPY</Button>
        </div>
      </Popup>
      <Fc loading={loading} controls={newControls} {...props} />
    </>
  }
  ResComponent.displayName = `WithShare${Fc.displayName === undefined ? '' : Fc.displayName}`
  return ResComponent
}
