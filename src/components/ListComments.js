import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveComments, fetchComments } from '../actions/CommentActions';
import NewComment from './NewComment';
import Comment from './Comment';
import Post from './Post';
import '../style/ListComments.css';
import Select from 'react-select';
import { orderTypes, orderMessages, ORDER_NONE } from '../utils/commons';
class Comments extends Component{
  state = {
    orderSelected: ORDER_NONE
  }

  componentDidMount = () => {
    const { post, fetchComments } = this.props;
    fetchComments(post.id);
  }

  orderComments = (orderType) => {
    const {comments, updateComments, fetchComments, post} = this.props;

    this.setState({orderSelected: orderType});

    if(orderType === ORDER_NONE){
      fetchComments(post.id);
    } else {
      updateComments(orderMessages(comments, orderType));
    }
  }

  render(){
    const { comments } = this.props;
    const { post } = this.props;
    const { orderSelected } = this.state;
    return(
      <div>
        <Post post={post}/>
        {(comments && comments.length > 0) &&
          <div>
            <div align="right" className="filters">
              <div className="width-13-percent message-sort">
                <div className="margin-top-15">
                  Sorted By
                </div>
                <div className="margin-left-2-percent">
                  <Select
                    options={orderTypes}
                    className="width-100-percent sort-selector"
                    searchable={false}
                    onChange={(event) => {
                      if(event){
                        this.orderComments(event.value)
                      }
                    }}
                    value={orderSelected}/>
                </div>
              </div>
            </div>

            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} post={post}/>
            ))}
          </div>
        }
        {(!comments || comments.length < 1) &&
          <div className="no-message-found">
            <div>
              No replies found.
            </div>
            <div>
              Be the first to reply this post.
            </div>
          </div>
        }
        <NewComment post={post} />

        <div className="down-buttons">
          <Link to={post.postsPath}className="back-buttom">
            <div className="image"/>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({comments}) =>{
  return {comments: comments.filter(comment => comment && !comment.deleted && !comment.parentDeleted)};
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchComments: (postId) => fetchComments(dispatch, postId),
    updateComments: (comments) => dispatch(receiveComments(comments))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));
