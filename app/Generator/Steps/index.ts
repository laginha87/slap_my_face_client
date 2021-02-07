import { InstructionsStep } from 'app/Generator/Steps/InstructionsStep'

import { UploadStep } from 'app/Generator/Steps/UploadStep'
import { ReviewStep } from 'app/Generator/Steps/ReviewStep'
import { TakePhotoStepDesktop } from 'app/Generator/Steps/TakePhotoStep'
import { TakePhotoStepMobile } from 'app/Generator/Steps/TakePhotoStepMobile'
import { IS_DESKTOP } from 'app/Utils/isDesktop'

const TakePhotoStep = IS_DESKTOP ? TakePhotoStepDesktop : TakePhotoStepMobile

export { InstructionsStep, UploadStep, ReviewStep, TakePhotoStep }
