import { getAllPosts, getPostsByCategory, sendPost, updatePost, deletePost,
  updatePostVote, DOWN_VOTE, UP_VOTE } from '../utils/apis';

  export const ADD_POST = 'ADD_POST';
  export const EDIT_POST = 'EDIT_POST';
  export const RECEIVE_POSTS = 'RECEIVE_POSTS';
  export const REMOVE_POST = 'REMOVE_POST';
  export const REMOVE_POST_VOTE = 'REMOVE_POST_VOTE';
  export const TURN_ON_OFF_EDIT_POST = 'TURN_ON_OFF_EDIT_POST';
  export const VOTE_POST = 'VOTE_POST';

  export const savePost = (dispatch, post) => sendPost(post).then(response => dispatch(addPost(response)));

  export const fetchAllPosts = (dispatch, category) => getAllPosts().then(posts => dispatch(receivePosts(posts)));

  export const fetchPosts = (dispatch, category) => getPostsByCategory(category).then(posts => dispatch(receivePosts(posts)));

  export const fetchPost = (dispatch, commentId, title, body, timestamp) => updatePost(commentId, title, body, timestamp).then(() => dispatch(editPost(commentId, title, body, timestamp)));

  export const excludePost = (dispatch, postId) => deletePost(postId).then(() => dispatch(removePost(postId)));

  export const increasePostVote = (dispatch, postId) => updatePostVote(postId, UP_VOTE).then(() => dispatch(votePost(postId)));

  export const decreasePostVote = (dispatch, postId) => updatePostVote(postId, DOWN_VOTE).then(() => dispatch(removePostVote(postId)));

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
