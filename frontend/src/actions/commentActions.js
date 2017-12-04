import * as API from '../util/api.js'
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT ";
export const DELETE_COMMENT = "DELETE_COMMENT ";
export const ADD_COMMENT = "ADD_COMMENT ";

export const fetchComments = (comments) => {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}

export const updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export const removeComment = (comment) => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export const addComment = (comment) => {
  return{
    type: ADD_COMMENT,
    comment
  }
}

export const getComments = (post_id) => dispatch => (
  API.fetchComments(post_id).then(
    comments => dispatch(fetchComments(comments))
  )
)

export const upVoteComment = (comment_id) => dispatch => (
  API.upVoteComment(comment_id).then(
    comment => dispatch(updateComment(comment))
  )
)

export const downVoteComment = (comment_id) => dispatch => (
  API.downVoteComment(comment_id).then(
    comment => dispatch(updateComment(comment))
  )
)

export const deleteComment = (comment_id) => dispatch => (
  API.deleteComment(comment_id).then(
    comment => dispatch(removeComment(comment))
  )
)

export const submitComment = (comment) => dispatch => (
  API.submitComment(comment).then(
    comment => dispatch(addComment(comment))
  )
)

export const modifyComment = (id, body) => dispatch => (
  API.modifyComment(id, body).then(
    comment => dispatch(updateComment(comment))
  )
)
