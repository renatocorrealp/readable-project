import {combineReducers} from 'redux';
import {RECEIVE_CATEGORIES, RECEIVE_POSTS, RECEIVE_COMMENTS, ADD_COMMENT, REMOVE_COMMENT, ADD_POST, REMOVE_POST} from '../actions';

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
      return [...state, action.newPost];
    }
    case RECEIVE_POSTS: {
      return action.posts
    }
    case REMOVE_POST: {
      return state.filter(post => post.id !== action.postId);
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
    default:{
      return state;
    }
  }
}

export default combineReducers({categories, posts, comments});
