import {SORTBY_DATE, SORTBY_VOTE} from "../actions/sortActions"

export function sortByReducer(state=SORTBY_DATE, action) {
  switch (action.type) {
    case SORTBY_DATE:
      return SORTBY_DATE;
    case SORTBY_VOTE:
      return SORTBY_VOTE;
    default:
      return state;
  }
}
