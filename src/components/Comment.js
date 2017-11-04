import React, { Component } from 'react';
import { deleteComment, updateCommentVote, updateComment, UP_VOTE, DOWN_VOTE } from '../utils/apis';
import { removeComment, voteComment, removeCommentVote, editComment, turnOnOffEditComment } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class Comment extends Component{
    state = {
      editState:false
    }

    removeComment = (commentId) => {
      const { removeComment } = this.props;
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
        <div>
          {!comment.edit &&
            <div>
            <div>
              {comment.body}
            </div>
            <input type="button" value="Edit" onClick={() => this.turnOnOffEditComment(comment.id)} />
            <div>
              {comment.voteScore}
              <input type="button" value="Vote" onClick={() => this.voteComment(comment.id)}/>
              <input type="button" value="Remove vote" onClick={() => this.removeCommentVote(comment.id)}/>
              <input type="button" value="Remove" onClick={() => this.removeComment(comment.id)} />
            </div>
            </div>}
          {comment.edit &&
            <div>
              <textarea type="text" defaultValue={comment.body} onChange={(e) => bodyEdited=e.target.value}></textarea>
              <input type="button" value="Salvar" onClick={() => { this.editComment(comment.id, bodyEdited);this.showEdit(editState);}} />

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
