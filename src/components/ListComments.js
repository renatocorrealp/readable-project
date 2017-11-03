import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCommentsByPost, sendComment, deleteComment} from '../utils/apis';
import {receiveComments, addComment, removeComment} from '../actions';
import crypto from 'crypto-browserify';
import PostComment from './PostComment';
class Comments extends Component{
  componentDidMount = () => {
      const { post } = this.props;
      this.props.fetchComments(post.id);
  }

  saveComment = (commentMsg) => {
    const { addComment, post } = this.props;

    // TODO pegar username
    const username = "rcorrea";
    // TODO colocar geração de id em componente aparte
    const id = crypto.createHash('sha1').update(Date.now() + username).digest('hex');

    let newComment = {};
    newComment.id = id;
    newComment.parentId = post.id;
    newComment.timestamp = Date.now();
    newComment.body = commentMsg;
    newComment.author = username;

    addComment(newComment);
  }

  removeComment = (commentId) => {
    const { removeComment } = this.props;
    removeComment(commentId);
  }

  render(){
    const { comments } = this.props;
    const { post } = this.props;
    return(
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.body}
            <input type="button" value="excluir" onClick={() => this.removeComment(comment.id)} />
          </div>
        ))}
        <PostComment action={this.saveComment} />

        <Link to={post.postsPath}>Back</Link>
      </div>
    )
  }
}

const mapStateToProps = ({comments}) =>{
  return {comments: comments.filter(comment => comment && !comment.deleted && !comment.parentDeleted)};
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchComments: (postId) => getCommentsByPost(postId).then(comments => dispatch(receiveComments(comments))),
    addComment: (data) => sendComment(data).then(comment => dispatch(addComment(data))),
    removeComment: (commentId) => deleteComment(commentId).then(() => dispatch(removeComment(commentId)))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));
