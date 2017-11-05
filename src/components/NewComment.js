import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendComment } from '../utils/apis';
import { addComment } from '../actions';
import { getNewId } from '../utils/commons';

class NewComment extends Component{

  state = {
    invalidAuthor: false,
    invalidMessage: false
  }

  saveComment = (e) => {
    const { addComment, post } = this.props;

    // prevent form to submit
    e.preventDefault();

    const messageTextarea = e.target.querySelector("#comment-message");
    const authorInput = e.target.querySelector("#comment-author");

    const commentMsg = messageTextarea.value;
    const author = authorInput.value;

    if(!this.validateFields(author, commentMsg)){
      return;
    }

    const id = getNewId(author);

    let newComment = {};
    newComment.id = id;
    newComment.parentId = post.id;
    newComment.timestamp = Date.now();
    newComment.body = commentMsg;
    newComment.author = author;

    addComment(newComment);
    post.commentCount++;
    messageTextarea.value = "";
    authorInput.value = "";
  }

  validateFields = (author, commentMsg) => {
    let invalidAuthor = false;
    let invalidMessage = false;
    if(!author){
      invalidAuthor = true;
    }

    if(!commentMsg){
      invalidMessage = true;
    }

    this.setState({
      invalidAuthor,
      invalidMessage
    })

    return !(invalidMessage || invalidAuthor);
  }

  render(){
    const { invalidAuthor, invalidMessage } = this.state;
    return(
      <div className="post-form">
        <div className="title" >Reply</div>
        <form onSubmit={(event)=> this.saveComment(event)}>
          <div>
            <input placeholder="Input your name" type="text" id="comment-author"
              className={invalidAuthor ? "invalid-field" : ""}/>
          </div>
          <div>
            <textarea id="comment-message" className={invalidMessage ? "invalid-field" : ""}
                rows="5" placeholder="Write reply" type="text" />
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
