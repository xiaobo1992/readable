import _ from 'lodash'
import {RECEIVE_CATEGORIES} from "../actions/categoryActions.js"

export function categoryReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      let categories = {...action.categories,
        All: {name:"All", path:""}
      }
      return _.mapKeys(categories, 'name')
    default:
      return state;
  }
}
