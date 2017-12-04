import {combineReducers} from 'redux'
import {categoryReducer} from "./categoryReducer.js"
import {postReducer} from "./postReducer.js"
import {commentReducer} from "./commentReducer.js"
import {sortByReducer} from "./sortReducer.js"


const reducers = combineReducers({
  categories: categoryReducer,
  posts: postReducer,
  comments: commentReducer,
  sortby: sortByReducer
})

export default reducers
