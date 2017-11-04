export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_POST_VOTE = 'REMOVE_POST_VOTE';
export const TURN_ON_OFF_EDIT_POST = 'TURN_ON_OFF_EDIT_POST';
export const VOTE_POST = 'VOTE_POST';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const REMOVE_COMMENT_VOTE = 'REMOVE_COMMENT_VOTE';
export const TURN_ON_OFF_EDIT_COMMENT = 'TURN_ON_OFF_EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

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

export const editComment = (commentId, body, timestamp) => {
  return {
    type: EDIT_COMMENT,
    commentId,
    body,
    timestamp
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
    type: VOTE_COMMENT,
    commentId
  }
}

export const turnOnOffEditComment = (commentId) => {
  return {
    type: TURN_ON_OFF_EDIT_COMMENT,
    commentId
  }
}

export const addPost = (newPost) => {
  return {
    type: ADD_POST,
    newPost
  }
}

export const editPost = (postId, title, body, timestamp) => {
  return {
    type: EDIT_POST,
    postId,
    title,
    body,
    timestamp
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

export const turnOnOffEditPost = (postId) => {
  return {
    type: TURN_ON_OFF_EDIT_POST,
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
