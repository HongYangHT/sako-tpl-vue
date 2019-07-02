import { SET_POEMS } from './constants'

export default {
  [SET_POEMS](state, payload) {
    state.poems = payload
  }
}
