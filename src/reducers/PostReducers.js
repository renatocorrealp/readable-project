import { RECEIVE_POSTS, ADD_POST, REMOVE_POST, REMOVE_POST_VOTE, VOTE_POST,
  EDIT_POST, TURN_ON_OFF_EDIT_POST } from '../actions/PostActions';

export const posts = (state = [], action) => {
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
