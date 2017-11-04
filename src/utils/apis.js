
const api = "http://localhost:3001"
export const UP_VOTE = "upVote";
export const DOWN_VOTE = "downVote";

const headers = {
  'Accept': 'application/json',
  'Authorization': 'rcorrea'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const sendComment = (comment) =>
  fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
    .then(res => {return res.json()})

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers
    })
  .then(res => {return res.json()})

export const updateComment = (commentId, body, timestamp) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestamp, body})
  })
  .then(res => {return res.json()})

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`,
    {
      method: 'DELETE',
      headers
    })
  .then(res => {return res.json()})

export const getCommentsByPost = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const sendPost = (post) =>
  fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    .then(res => {return res.json()})

export const updateCommentVote = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option})
    })
    .then(res => {return res.json()})

export const updatePostVote = (postId, option) =>
  fetch(`${api}/posts/${postId}`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option})
    })
    .then(res => {return res.json()})

export const updatePost = (postId, title, body, timestamp) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestamp, title, body})
  })
  .then(res => {return res.json()})
