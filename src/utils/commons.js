export const ORDER_NONE = 'none';
export const ORDER_TIME_ASC = 'time_asc';
export const ORDER_TIME_DESC = 'time_desc';
export const ORDER_SCORE_ASC = 'score_asc';
export const ORDER_SCORE_DESC = 'score_desc';

export const orderMessages = (posts, orderType) => {

  if(orderType === ORDER_TIME_ASC){
    return posts.sort((a, b) => a.timestamp - b.timestamp);
  } else if(orderType === ORDER_TIME_DESC){
    return posts.sort((a, b) => b.timestamp - a.timestamp);
  } else if(orderType === ORDER_SCORE_ASC){
    return posts.sort((a, b) => a.voteScore - b.voteScore);
  } else if(orderType === ORDER_SCORE_DESC){
    return posts.sort((a, b) => b.voteScore - a.voteScore);
  }

  return posts;
}

export const orderTypes = [
  {
    label: 'None',
    value: ORDER_NONE
  },
  {
    label: 'Score Ascending',
    value: ORDER_SCORE_ASC
  },
  {
    label: 'Score Descending',
    value: ORDER_SCORE_DESC
  },
  {
    label: 'Time Ascending',
    value: ORDER_TIME_ASC
  },
  {
    label: 'Time Descending',
    value: ORDER_TIME_DESC
  }
];
