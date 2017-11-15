import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { turnOnOffEditPost, fetchPost, excludePost, increasePostVote, decreasePostVote  } from '../actions/PostActions';
import { connect } from 'react-redux';
import '../style/Post.css';
import { formatTimestamp } from '../utils/commons';

class Post extends Component{
  turnOnOffEditPost = (postId) => {
    const { turnOnOffEditPost } = this.props;
    turnOnOffEditPost(postId);
  }

  editPost = (postId, title, body) => {
    const {editPost} = this.props;
    editPost(postId, title, body, Date.now());
    this.turnOnOffEditPost();
  }

  removePost = (postId) => {
    const { history } = this.props;
    const { removePost } = this.props;
    removePost(postId);
    history.push('/');
  }

  removePostVote = (postId) => {
    const { removePostVote } = this.props;
    removePostVote(postId);
  }

  votePost = (postId, voteMode) => {
    const { votePost } = this.props;
    votePost(postId);
  }

  render(){
    const {post} = this.props;
    let titleEdited = post.title;
    let bodyEdited = post.body;
    return(
      <div className="post-item">
        {!post.edit &&
          <div className="post-view">
            <div className="post-description">
              <div className="post-headers">
                <div className="post-actions">
                  <div className="post-score">
                    <div>{post.voteScore}</div>
                    <div>votes</div>
                    <div className="post-like-actions">
                      <div className="like" onClick={() => this.votePost(post.id)}></div>
                      <div className="unlike" onClick={() => this.removePostVote(post.id)}></div>
                    </div>
                  </div>
                  <div className="post-score">
                    <div>{post.commentCount}</div>
                    <div>comments</div>
                  </div>
                </div>
                <div className="post-title">
                  <div className="post-link">
                    <Link to={post.commentsPath}>
                      {post.title}
                    </Link>
                  </div>
                </div>
                <div className="post-actions">
                  <div className="pencil" onClick={() => this.turnOnOffEditPost(post.id)}></div>
                  <div className="trash" onClick={() => this.removePost(post.id)}></div>
                </div>
              </div>
              <div className="post-body">
                <div className="post-message">
                  <div className="post-author">
                    {post.author} says:
                  </div>
                  <div>
                    {post.body}
                  </div>
                </div>
                <div className="post-details">
                  { formatTimestamp(post.timestamp) }
                </div>
              </div>
            </div>
          </div>
        }
        {post.edit &&
          <div className="post-form">
            <div>
              <input type="text" defaultValue={post.title} onChange={(e) => titleEdited=e.target.value}></input>
            </div>
            <textarea type="text" defaultValue={post.body} onChange={(e) => bodyEdited=e.target.value}></textarea>
            <div className="edit-buttons">
              <input type="button" value="Save" onClick={() => this.editPost(post.id, titleEdited, bodyEdited)} />
              <input type="button" value="Cancelar" onClick={() => this.turnOnOffEditPost(post.id)} />
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return state;
}

const mapDispatchToProps = (dispatch) =>{
  return {
    editPost: (commentId, title, body, timestamp) => fetchPost(dispatch, commentId, title, body, timestamp),
    removePost: (postId) => excludePost(dispatch, postId),
    votePost: (postId) => increasePostVote(dispatch, postId),
    removePostVote: (postId) => decreasePostVote(dispatch, postId),
    turnOnOffEditPost: (postId) => dispatch(turnOnOffEditPost(postId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
