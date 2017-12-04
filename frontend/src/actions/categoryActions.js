import * as API from '../util/api.js'
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => dispatch => (
  API.fetchCategories().then(
    categories => dispatch(receiveCategories(categories))
  )
)
