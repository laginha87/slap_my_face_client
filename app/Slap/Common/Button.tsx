import { Spinner } from 'app/Slap/Common/Spinner'
import { FC } from 'react'

type Theme = 'primary' | 'secondary'

const CLASSES: { [k in Theme]: string } = {
  primary:
    'rounded-sm bg-white hover:text-white hover:border-white border-4 border-black hover:bg-black text-black',
  secondary:
    'text-white hover:text-underline border-4 border-black hover:border-gray-500'
}

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ml?: string
  theme?: Theme
}

export const Button: FC<PropTypes> = ({
  children,
  ml = '0',
  theme = 'primary',
  className: _className,
  ...args
}) => (
  <button
    className={`cursor-pointer px-5 py-2 ml-${ml} ${CLASSES[theme]}`}
    {...args}
  >
    {children}
  </button>
)

export const ButtonWithSpinner: FC<PropTypes & { loading: boolean }> = ({
  loading,
  children,
  ...buttonProps
}) => (
  <Button {...buttonProps}>
    {children} <Spinner loading={loading} />
  </Button>
)
