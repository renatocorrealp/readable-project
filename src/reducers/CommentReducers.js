import { ADD_COMMENT, EDIT_COMMENT, RECEIVE_COMMENTS, REMOVE_COMMENT, REMOVE_COMMENT_VOTE,
  TURN_ON_OFF_EDIT_COMMENT, VOTE_COMMENT, } from '../actions/CommentActions';

  export const comments = (state = [], action) => {
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
