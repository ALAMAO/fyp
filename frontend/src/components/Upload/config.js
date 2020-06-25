import { BASE_URL } from '../../Api'

const config = {
  sizeRestrictions: {
    minSizeInMB: 0,
    maxSizeInMB: 5,
  },
  errorMessages: {
    invalidFileMessage: "Please upload an image file of type jpg, jpeg or png",
    fileSizeExceedMessage: (size) => `File is too large. Max size: ${size} MB`,
  },
  uiMessages: {
    spinnerMessage: `Please wait while we upload your image.`,
    spinnerEmoji: `🤗`,
  },
  endpoints: {
    dbPostURL: `${BASE_URL}/image/new`
  }
}



export default config;