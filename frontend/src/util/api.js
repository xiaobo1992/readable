const root = "http://localhost:3001"

const header = { headers: { 'Authorization': 'bobo' }}

export const fetchCategories = () =>
  fetch(`${root}/categories`, header)
    .then(res => res.json())
    .then(data => data.categories)

export const fetchPosts = () =>
  fetch( `${root}/posts`, header)
    .then(res => res.json())

export const fetchCategoryPosts = (category) => {
  return fetch(`${root}/${category}/posts`,
    header
  ).then(res => res.json())
}

export const fetchPost = (id) => {
  return fetch(`${root}/posts/${id}`,
    header
  ).then(res => res.json())
}

export const submitPost = (post) => {
  return fetch(`${root}/posts`, {
    method:"POST",
    headers:{
        'Authorization': 'bobo',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(post)
  }).then(res => res.json())
}

export const upVotePost = (id) => {
  return fetch(`${root}/posts/${id}`, {
    method:"POST",
    headers: {
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option:"upVote"})
  }).then(res => res.json())
}

export const downVotePost = (id) =>
  fetch(`${root}/posts/${id}`, {
    method:"POST",
    headers: {
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({option:"downVote"})
  }).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${root}/posts/${id}`, {
    method:"DELETE",
    headers: {
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    }
  }).then(res=>res.json())

export const modifyPost = (id, body) =>
  fetch( `${root}/posts/${id}`, {
    method:"PUT",
    headers: {
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

export const fetchComments = (id) =>
  fetch(`${root}/posts/${id}/comments`, header)
  .then(res => res.json())

export const submitComment = (comment) =>
  fetch(`${root}/comments`, {
    method:"POST",
    headers:{
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const upVoteComment = (id) =>
  fetch(`${root}/comments/${id}`, {
    method:"POST",
    headers:{
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({option:"upVote"})
  }).then(res => res.json())

export const downVoteComment = (id) =>
  fetch(`${root}/comments/${id}`, {
    method:"POST",
    headers:{
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({option:"downVote"})
  }).then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${root}/comments/${id}`, {
    method:"DELETE",
    headers: {
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    }
  }).then(res=>res.json())

export const modifyComment = (id, body) =>
  fetch(`${root}/comments/${id}`, {
    method:"PUT",
    headers:{
      'Authorization': 'bobo',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      body:body,
      timestamp:Date.now()
    })
  }).then(res=> res.json())
