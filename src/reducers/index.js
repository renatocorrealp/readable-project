import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, RECEIVE_COMMENTS, ADD_COMMENT, REMOVE_COMMENT,
  ADD_POST, REMOVE_POST, REMOVE_POST_VOTE, VOTE_POST, VOTE_COMMENT,
  REMOVE_COMMENT_VOTE, EDIT_COMMENT, EDIT_POST, TURN_ON_OFF_EDIT_POST, TURN_ON_OFF_EDIT_COMMENT }
  from '../actions';

  const categories = (state = [], action) =>{
    switch(action.type){
      case RECEIVE_CATEGORIES:{
        return action.categories;
      }
      default:{
        return state;
      }
    }
  }

  const posts = (state = [], action) => {
    switch(action.type){
      case ADD_POST: {
        const { newPost } = action;
        newPost.edit = false;
        return [...state, newPost];
      }
      case EDIT_POST: {
        const { postId, title, body, timestamp } = action;
        const newState = Array.from(state);

        return newState.map((post) => {
          if(post.id === postId){
            post.title = title;
            post.body = body;
            post.timestamp = timestamp;
          }

          return post;
        });
      }
      case RECEIVE_POSTS: {
        return action.posts
      }
      case REMOVE_POST: {
        return state.filter(post => post.id !== action.postId);
      }
      case REMOVE_POST_VOTE: {
        const newState = Array.from(state);

        return newState.map(post => {

          if(post.id === action.postId){
            post.voteScore--;
          }

          return post;
        });


      }
      case TURN_ON_OFF_EDIT_POST: {
        const newState = Array.from(state);

        return newState.map(post => {
          if(post.id === action.postId){
            post.edit = !post.edit;
          }else{
            post.edit = false;
          }

          return post;
        });
      }
      case VOTE_POST: {
        return state.map(post => {

          if(post.id === action.postId){
            post.voteScore++;
          }

          return post;
        });
      }
      default:{
        return state;
      }
    }
  }

  const comments = (state = [], action) => {
    switch(action.type){
      case ADD_COMMENT: {
        return [...state, action.newComment];
      }
      case EDIT_COMMENT: {
        const { commentId, body, timestamp } = action;
        const newState = Array.from(state);

        return newState.map((comment) => {
          if(comment.id === commentId){
            comment.body = body;
            comment.timestamp = timestamp;
          }

          return comment;
        });
      }
      case RECEIVE_COMMENTS: {
        return action.comments;
      }
      case REMOVE_COMMENT: {
        return state.filter(comment => comment.id !== action.commentId);
      }
      case REMOVE_COMMENT_VOTE: {
        const newState = Array.from(state);

        return newState.map(comment => {

          if(comment.id === action.commentId){
            comment.voteScore--;
          }

          return comment;
        });
      }
      case VOTE_COMMENT: {
        const newState = Array.from(state);

        return newState.map(comment => {

          if(comment.id === action.commentId){
            comment.voteScore++;
          }

          return comment;
        });
      }
      case TURN_ON_OFF_EDIT_COMMENT: {
        const newState = Array.from(state);

        return newState.map(comment => {
          if(comment.id === action.commentId){
            comment.edit = !comment.edit;
          }else{
            comment.edit = false;
          }

          return comment;
        });
      }
      default:{
        return state;
      }
    }
  }

  export default combineReducers({categories, posts, comments});
