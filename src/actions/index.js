export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_POST_VOTE = 'REMOVE_POST_VOTE';
export const VOTE_POST = 'VOTE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const REMOVE_COMMENT_VOTE = 'REMOVE_COMMENT_VOTE';
export const COMMENT_VOTE = 'COMMENT_VOTE';

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

export const removeCommentVote = (commentId) => {
  return {
    type: REMOVE_COMMENT_VOTE,
    commentId
  }
}

export const voteComment = (commentId) => {
  return {
    type: COMMENT_VOTE,
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

export const votePost = (postId) => {
  return {
    type: VOTE_POST,
    postId
  }
}

export const removePostVote = (postId) => {
  return {
    type: REMOVE_POST_VOTE,
    postId
  }
}
