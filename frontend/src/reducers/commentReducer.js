import _ from 'lodash'
import {FETCH_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT, ADD_COMMENT} from "../actions/commentActions.js"

export function commentReducer(state={}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      action.comments.sort((a, b) => a.timestamp <= b.timestamp)
      return _.mapKeys(action.comments, 'id')
    case UPDATE_COMMENT:
      return{
        ...state,
        [action.comment.id] : action.comment
      }
    case ADD_COMMENT:
      return{
        ...state,
        [action.comment.id] : action.comment
      }
    case DELETE_COMMENT:
      return Object.keys(state).reduce((res, key) => {
        if (state[key].id !== action.comment.id) {
          res[key] = state[key]
        }
        return res
      },{})
    default:
      return state;
  }
}
