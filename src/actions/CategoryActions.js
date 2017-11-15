import { getAllCategories } from '../utils/apis';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const fetchCategories = (dispatch) => () => getAllCategories().then(categories => dispatch(receiveCategories(categories)))


export const receiveCategories = (categories) =>{
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}
