import { deleteComment, getCommentsByPost, sendComment, updateCommentVote, updateComment, DOWN_VOTE, UP_VOTE } from '../utils/apis';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const REMOVE_COMMENT_VOTE = 'REMOVE_COMMENT_VOTE';
export const TURN_ON_OFF_EDIT_COMMENT = 'TURN_ON_OFF_EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const saveComment = (dispatch, comment) => sendComment(comment).then(newComment => dispatch(addComment(newComment)));

export const decreaseCommentVote = (dispatch, commentId) => updateCommentVote(commentId, DOWN_VOTE).then(() => dispatch(removeCommentVote(commentId)));

export const excludeComment = (dispatch, commentId) => deleteComment(commentId).then(() => dispatch(removeComment(commentId)));

export const fetchComment = (dispatch, commentId, body, timestamp) => updateComment(commentId, body, timestamp).then(() => dispatch(editComment(commentId, body, timestamp)));

export const fetchComments = (dispatch, postId) => getCommentsByPost(postId).then(comments => dispatch(receiveComments(comments)));

export const increaseCommentVote = (dispatch, commentId) => updateCommentVote(commentId, UP_VOTE).then(() => dispatch(voteComment(commentId)));

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
