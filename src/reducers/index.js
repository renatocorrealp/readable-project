import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, RECEIVE_COMMENTS, ADD_COMMENT, REMOVE_COMMENT,
        ADD_POST, REMOVE_POST, VOTE_POST, REMOVE_POST_VOTE, COMMENT_VOTE, REMOVE_COMMENT_VOTE } from '../actions';

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
      return [...state, newPost];
    }
    case RECEIVE_POSTS: {
      return action.posts
    }
    case REMOVE_POST: {
      return state.filter(post => post.id !== action.postId);
    }
    case REMOVE_POST_VOTE: {
      return state.map(post => {

        if(post.id === action.postId){
          post.voteScore--;
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
    case RECEIVE_COMMENTS: {
      return action.comments
    }
    case REMOVE_COMMENT: {
      return state.filter(comment => comment.id !== action.commentId);
    }
    case REMOVE_COMMENT_VOTE: {
      return state.map(comment => {

        if(comment.id === action.commentId){
          comment.voteScore--;
        }

        return comment;
      });
    }
    case COMMENT_VOTE: {
      return state.map(comment => {

        if(comment.id === action.commentId){
          comment.voteScore++;
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
