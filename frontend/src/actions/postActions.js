import * as API from '../util/api.js'
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_VOTE = "UPDATE_VOTE";
export const UPDATE_POST = "UPDATE_POST";

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export const removePost = (post) => {
  return {
    type: DELETE_POST,
    post
  }
}

export const updateVote = (post) => {
  return{
    type:UPDATE_VOTE,
    post
  }
}

export const updatePost = (post) => {
  return {
    type:UPDATE_POST,
    post
  }
}

export const fetchPosts = () => dispatch => (
  API.fetchPosts().then(
    posts => dispatch(receivePosts(posts))
  )
)

export const fetchCategoryPosts = (category) => dispatch => (
  API.fetchCategoryPosts(category).then(
    posts => dispatch(receivePosts(posts))
  )
)

export const submitPost = (post) => dispatch => (
  API.submitPost(post).then(
    post => {
      dispatch(addPost(post))
    }
  )
)

export const upVotePost = (id) => dispatch => (
  API.upVotePost(id).then(
    post => dispatch(updateVote(post))
  )
)

export const downVotePost = (id) => dispatch => (
  API.downVotePost(id).then(
    post => dispatch(updateVote(post))
  )
)

export const deletePost = (id) => dispatch =>(
  API.deletePost(id).then(
    post=> dispatch(removePost(post))
  )
)

export const modifyPost = (id, body) => dispatch => (
  API.modifyPost(id, body).then(
    post => dispatch(updatePost(post))
  )
)

export const updatePostByComment = (id) => dispatch => (
  API.fetchPost(id).then(
    post => dispatch(updatePost(post))
  )
)
