import React, { Component } from 'react';
import { deleteComment, updateCommentVote, updateComment, UP_VOTE, DOWN_VOTE } from '../utils/apis';
import { removeComment, voteComment, removeCommentVote, editComment, turnOnOffEditComment } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style/Comment.css';
import { formatTimestamp } from '../utils/commons';
class Comment extends Component{
  state = {
    editState:false
  }

  removeComment = (commentId) => {
    const { removeComment, post } = this.props;
    post.commentCount--;
    removeComment(commentId);
  }

  removeCommentVote = (commentId) => {
    const { removeCommentVote } = this.props;
    removeCommentVote(commentId);
  }

  voteComment = (commentId) =>{
    const { voteComment } = this.props;
    voteComment(commentId);
  }

  editComment = (commentId, body) => {
    const {editComment} = this.props;
    editComment(commentId, body, Date.now());
    this.turnOnOffEditComment();
  }

  showEdit = (editState) => {
    this.setState({ editState: !editState })
  }

  turnOnOffEditComment = (commentId) => {
    const { turnOnOffEditComment } = this.props;
    turnOnOffEditComment(commentId);
  }

  render(){
    const {comment} = this.props;
    const {editState} = this.state;
    let bodyEdited = comment.body;
    return(
      <div className="comment-item">
        {!comment.edit &&
          <div className="comment-view">
            <div className="comment-actions">
              <div className="comment-score">
                <div>{comment.voteScore}</div>
                <div>votes</div>
                <div className="comment-like-actions">
                  <div className="like" onClick={() => this.voteComment(comment.id)}></div>
                  <div className="unlike" onClick={() => this.removeCommentVote(comment.id)}></div>
                </div>
              </div>
            </div>

            <div className="comment-message">
              <div className="comment-author">
                {comment.author} says:
              </div>
              <div>
                {comment.body}
              </div>
            </div>
            <div className="comment-actions">
              <div className="pencil" onClick={() => this.turnOnOffEditComment(comment.id)}></div>
              <div className="trash" onClick={() => this.removeComment(comment.id)}></div>
            </div>
            <div className="comment-details">
              {formatTimestamp(comment.timestamp)}
            </div>
          </div>}
          {comment.edit &&
            <div className="post-form">
              <div>Editing post...</div>
              <textarea type="text" defaultValue={comment.body} onChange={(e) => bodyEdited=e.target.value}></textarea>
              <div className="edit-buttons">
                <input type="button" value="Salvar" onClick={() => { this.editComment(comment.id, bodyEdited);this.showEdit(editState);}} />
                <input type="button" value="Cancelar" onClick={() => this.turnOnOffEditComment(comment.id)} />
              </div>
            </div>
          }


        </div>
      )
    }
  }

  const mapStateToProps = ({comments}) =>{
    return {comments: comments.filter(comment => comment && !comment.deleted && !comment.parentDeleted)};
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
      removeComment: (commentId) => deleteComment(commentId).then(() => dispatch(removeComment(commentId))),
      voteComment: (commentId) => updateCommentVote(commentId, UP_VOTE).then(() => dispatch(voteComment(commentId))),
      removeCommentVote: (commentId) => updateCommentVote(commentId, DOWN_VOTE).then(() => dispatch(removeCommentVote(commentId))),
      editComment: (commentId, body, timestamp) => updateComment(commentId, body, timestamp).then(() => dispatch(editComment(commentId, body, timestamp))),
      turnOnOffEditComment: (postId) => dispatch(turnOnOffEditComment(postId))

    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));
