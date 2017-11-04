import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { turnOnOffEditPost, editPost, removePost, votePost, removePostVote  } from '../actions';
import { connect } from 'react-redux';
import { updatePost, deletePost, updatePostVote, DOWN_VOTE, UP_VOTE } from '../utils/apis';
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
      const { removePost } = this.props;
      removePost(postId);
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
            <div>
              <Link to={post.commentsPath}>
                <div>
                  <div>{post.title}</div>
                  <div>{post.body}</div>
                </div>
              </Link>
              <input type="button" value="Edit" onClick={() => this.turnOnOffEditPost(post.id)} />

              <div>
                {post.voteScore}
                <input type="button" value="Vote" onClick={() => this.votePost(post.id)}/>
                <input type="button" value="Remove vote" onClick={() => this.removePostVote(post.id)}/>
                <input type="button" value="Remove" onClick={() => this.removePost(post.id)}/>
              </div>
            </div>
          }
          {post.edit &&
            <div>
              <div>
                <input type="text" defaultValue={post.title} onChange={(e) => titleEdited=e.target.value}></input>
              </div>
              <textarea type="text" defaultValue={post.body} onChange={(e) => bodyEdited=e.target.value}></textarea>
              <div>
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
    editPost: (commentId, title, body, timestamp) => updatePost(commentId, title, body, timestamp).then(() => dispatch(editPost(commentId, title, body, timestamp))),
    removePost: (postId) => deletePost(postId).then(() => dispatch(removePost(postId))),
    votePost: (postId) => updatePostVote(postId, UP_VOTE).then(() => dispatch(votePost(postId))),
    removePostVote: (postId) => updatePostVote(postId, DOWN_VOTE).then(() => dispatch(removePostVote(postId))),
    turnOnOffEditPost: (postId) => dispatch(turnOnOffEditPost(postId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
