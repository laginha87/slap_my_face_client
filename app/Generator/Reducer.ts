import { Reducer } from 'react'

export const INSTRUCTIONS_STEP = 'INSTRUCTIONS_STEP'
export const TAKE_PHOTO_STEP = 'TAKE_PHOTO_STEP'
export const UPLOAD_STEP = 'UPLOAD_STEP'
export const REVIEW_STEP = 'REVIEW_STEP'

export type SlapStep =
  | typeof INSTRUCTIONS_STEP
  | typeof TAKE_PHOTO_STEP
  | typeof UPLOAD_STEP
  | typeof REVIEW_STEP
export type Side = 'left' | 'right' | 'center'

interface ImageMap<T> {
  left: T
  right: T
  center: T
}

export type TakenImages = ImageMap<string[]>
export type SelectedImages = ImageMap<number>
export interface IState {
  step: SlapStep
  takenImages: TakenImages
  selectedImages: SelectedImages
  name: string
  message: string
}

export const ADD_IMAGES = 'ADD_IMAGES'

export function addImagesAction(images: string[], side: Side): AddImagesAction {
  return { type: ADD_IMAGES, images, side }
}

export interface AddImagesAction {
  type: typeof ADD_IMAGES
  images: string[]
  side: Side
}

export const SET_STEP = 'SET_STEP'

export function setStepAction(step: SlapStep): SetStepAction {
  return { type: SET_STEP, step }
}

export interface SetStepAction {
  type: typeof SET_STEP
  step: SlapStep
}

export const SELECT_IMAGE = 'SELECT_IMAGE'

export function selectImageAction(
  image: string,
  side: Side
): SelectImageAction {
  return { type: SELECT_IMAGE, image, side }
}

export interface SelectImageAction {
  type: typeof SELECT_IMAGE
  image: string
  side: Side
}

type Action =
  | AddImagesAction
  | SetStepAction
  | SelectImageAction
  | ResetImagesAction
  | SetTextElementsAction

export type Dispatch = React.Dispatch<Action>

export const INITIAL_STATE: IState = {
  step: INSTRUCTIONS_STEP,
  selectedImages: { left: 0, right: 0, center: 0 },
  takenImages: {
    left: [],
    right: [],
    center: []
  },
  name: '',
  message: ''
}

export const RESET_IMAGES = 'RESET_IMAGES'

export function resetImagesAction(): ResetImagesAction {
  return { type: RESET_IMAGES }
}

export interface ResetImagesAction {
  type: typeof RESET_IMAGES
}

export const SET_TEXT_ELEMENTS = 'SET_TEXT_ELEMENTS'

export function setTextElementsAction(
  name: string,
  message: string
): SetTextElementsAction {
  return { type: SET_TEXT_ELEMENTS, name, message }
}

export interface SetTextElementsAction {
  type: typeof SET_TEXT_ELEMENTS
  name: string
  message: string
}

export const reducer: Reducer<IState, Action> = (state, action): IState => {
  switch (action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.step
      }
    case ADD_IMAGES:
      return {
        ...state,
        takenImages: {
          ...state.takenImages,
          [action.side]: action.images
        }
      }
    case SELECT_IMAGE:
      return {
        ...state,
        selectedImages: {
          ...state.selectedImages,
          [action.side]: action.image
        }
      }
    case RESET_IMAGES:
      return {
        ...INITIAL_STATE,
        takenImages: {
          left: [],
          right: [],
          center: []
        },
        step: TAKE_PHOTO_STEP
      }
    case SET_TEXT_ELEMENTS:
      return {
        ...state,
        name: action.name,
        message: action.message,
        step: UPLOAD_STEP
      }
    default:
      return state
  }
}

export const getSelectedImage = (state: IState, side: Side): string => {
  return state.takenImages[side][state.selectedImages[side]]
}

export const SIDES: Side[] = ['left', 'right', 'center']
export interface StepPropTypes {
  state: IState
  dispatch: Dispatch
}
