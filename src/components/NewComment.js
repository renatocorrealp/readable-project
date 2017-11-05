import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendComment } from '../utils/apis';
import { addComment } from '../actions';
import crypto from 'crypto-browserify';

class NewComment extends Component{
  saveComment = (e) => {
    const { addComment, post } = this.props;

    // prevent form to submit
    e.preventDefault();

    const textarea = e.target.querySelector("textarea");
    const commentMsg = textarea.value;

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
    post.commentCount++;
    textarea.value = "";
  }

  render(){
    return(
      <div className="post-form">
        <div className="title">Reply</div>
        <form onSubmit={(event)=> this.saveComment(event)}>
          <div>
            <textarea rows="5" placeholder="Write reply" type="text" />
          </div>
          <div>
            <input type="submit" value="Send"/>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) =>{
  return { categories };
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addComment: (comment) => sendComment(comment).then(newComment => dispatch(addComment(newComment)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
