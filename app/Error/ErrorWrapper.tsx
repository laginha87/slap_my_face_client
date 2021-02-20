import { VIDEO_CONSTRAINTS } from 'app/Services/Tensorflow/requestVideoAccess'
import { Component, ReactNode } from 'react'

interface ErrorProps {
  handleError: (error: any) => string
}

interface ErrorState {
  error: any
  hasError: boolean
}

export class ErrorWrapper extends Component<ErrorProps, ErrorState> {
  constructor (props: any) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError (error: any): ErrorState {
    return { hasError: true, error }
  }

  // componentDidCatch (error, errorInfo): void {
  //   // TODO add rollbar
  // }

  render (): ReactNode {
    const { hasError, error } = this.state
    const { children, handleError } = this.props

    if (hasError) {
      return <div className="flex h-full items-center justify-center mx-auto border-4 border-white w-full" style={{
        maxWidth: VIDEO_CONSTRAINTS.width,
        height: VIDEO_CONSTRAINTS.height
      }}>
        <div>{handleError(error)}</div>
      </div>
    } else {
      return children
    }
  }
}
