import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      console.error(e)
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})
