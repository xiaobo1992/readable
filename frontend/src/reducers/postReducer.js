import _ from 'lodash';
import {ADD_POST, RECEIVE_POSTS, DELETE_POST, UPDATE_POST, UPDATE_VOTE} from "../actions/postActions";

export function postReducer(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      return _.mapKeys(action.posts, 'id')
    case ADD_POST:
      return {
        ...state,
        [action.post.id]:  action.post
      }
    case DELETE_POST:
      return Object.keys(state).reduce((res, key) => {
        if (state[key].id !== action.post.id) {
          res[key] = state[key]
        }
        return res
      }, {})
    case UPDATE_POST:
      return {
        ...state,
        [action.post.id]:action.post
      }
    case UPDATE_VOTE:
      return {
        ...state,
        [action.post.id]: action.post
      }
    default:
      return state;
  }
}
