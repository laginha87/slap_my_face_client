
import { FC } from 'react'
import { INSTRUCTIONS_STEP, REVIEW_STEP, SlapStep, TAKE_PHOTO_STEP, UPLOAD_STEP } from 'app/Slap/Generator/Reducer'

const STEPS = [
  INSTRUCTIONS_STEP,
  TAKE_PHOTO_STEP,
  REVIEW_STEP,
  UPLOAD_STEP
]

const Bar: FC<{ fullWidth?: boolean, color: string }> = ({ fullWidth = false, color }) => <div className={`w-0 bg-${color} h-2 rounded`} style={{ width: fullWidth ? '100%' : '50%' }} />

const Step: FC<{ currentIndex: number, indexOfStep: number }> = ({ currentIndex, indexOfStep }) => {
  const isActive = currentIndex <= indexOfStep
  const isNext = currentIndex === indexOfStep + 1
  return (
    <div className='w-1/4'>

      <div className='relative mb-2'>
        {currentIndex !== 0 &&
          <div className='absolute flex align-center items-center align-middle content-center' style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className='w-full bg-gray-200 rounded items-center align-middle align-center flex-1 h-2'>
              {isActive ? <Bar fullWidth color='gray-500' /> : isNext && <Bar color='gray-500' />}
            </div>
          </div>}
        <div className={'w-10 h-10 mx-auto rounded-full text-lg flex items-center ' + (isActive ? 'bg-gray-500' : 'bg-white')}>
          <span className='text-center w-full'>
            <svg className='w-full fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' />
          </span>
        </div>
      </div>
    </div>
  )
}

export const StepCounter: React.FC<{ step: SlapStep }> = ({ step }) => {
  const indexOfStep = STEPS.indexOf(step)

  return (
    <div className='w-full pt-6'>
      <div className='flex'>
        {STEPS.map((e, i) => <Step currentIndex={i} indexOfStep={indexOfStep} key={e} />)}
      </div>
    </div>
  )
}
