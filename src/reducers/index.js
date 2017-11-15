import { combineReducers } from 'redux';
import { categories } from './CategoryReducers';
import { posts } from './PostReducers';
import { comments } from './CommentReducers';

export default combineReducers({ categories, posts, comments });
