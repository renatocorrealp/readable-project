
const api = "http://localhost:3001"

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
