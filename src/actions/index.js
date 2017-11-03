export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const receiveCategories = (categories) =>{
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export const addComment = (newComment) => {
  return {
    type: ADD_COMMENT,
    newComment
  }
}

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export const removeComment = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    commentId
  }
}

export const addPost = (newPost) => {
  return {
    type: ADD_POST,
    newPost
  }
}

export const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export const removePost = (postId) => {
  return {
    type: REMOVE_POST,
    postId
  }
}
