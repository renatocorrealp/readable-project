import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getCommentsByPost, sendComment} from '../utils/apis';
import {receiveComments, addComment} from '../actions';
import crypto from 'crypto-browserify';
import NewComment from './NewComment';
import Comment from './Comment';
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

  render(){
    const { comments } = this.props;
    const { post } = this.props;
    return(
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment}/>
          </div>
        ))}
        <NewComment action={this.saveComment} />

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
    addComment: (comment) => sendComment(comment).then(newComment => dispatch(addComment(newComment)))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));
