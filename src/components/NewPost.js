import React, { Component } from 'react';
import { savePost } from '../actions/PostActions';
import { connect } from 'react-redux';
import { ROOT_PATH } from './App';
import { withRouter } from 'react-router-dom';
import { getNewId } from '../utils/commons';

class NewPost extends Component{
  state = {
    invalidAuthor: false,
    invalidTitle: false,
    invalidMessage: false
  }
  post = (e) => {
    const { addPost, category } = this.props;

    // prevent form to submit
    e.preventDefault();

    const authorInput = e.target.querySelector("#post-author");
    const titleInput = e.target.querySelector("#post-title");
    const bodyTextArea = e.target.querySelector("#post-body");
    const categorySelect = e.target.querySelector("#category-select");

    const postTitle = titleInput.value;
    const postBody = bodyTextArea.value;
    const postAuthor = authorInput.value;

    let categorySelected = null;
    if(categorySelect){
      categorySelected = categorySelect.value;
    }else{
      categorySelected = category.name;
    }

    if(!this.validateFields(postAuthor, postTitle, postBody)){
      return;
    }

    const id = getNewId(postAuthor);

    let newPost = {};
    newPost.id = id;
    newPost.category = categorySelected;
    newPost.title = postTitle;
    newPost.timestamp = Date.now();
    newPost.body = postBody;
    newPost.author = postAuthor;

    addPost(newPost);
    bodyTextArea.value = "";
    titleInput.value = "";
    authorInput.value = "";
  }

  validateFields = (postAuthor, postTitle, postBody) => {
    let invalidAuthor = false;
    let invalidTitle = false;
    let invalidMessage = false;

    if(!postAuthor){
      invalidAuthor = true;
    }
    if(!postTitle){
      invalidTitle = true;
    }
    if(!postBody){
      invalidMessage = true;
    }

    this.setState({
      invalidAuthor,
      invalidTitle,
      invalidMessage
    })

    return !(invalidMessage || invalidTitle || invalidAuthor);
  }

  render(){
    const { category, categories } = this.props;
    const { invalidAuthor, invalidTitle, invalidMessage } = this.state;
    return (
      <div className="post-form">
        <div className="title">Write New Post</div>
        <form onSubmit={(event)=> this.post(event)}>
          <div>
            <input placeholder="Input your name" type="text" id="post-author" className={invalidAuthor ? "invalid-field" : ""}/>
          </div>
          <div>
            <input placeholder="Input the title" type="text" id="post-title" className={invalidTitle ? "invalid-field" : ""}/>
          </div>
          {(category.name === ROOT_PATH.name) &&
            <div>
              <div className="category-title">
                Category
              </div>
              <select id="category-select">
                {categories.map(category =>(
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          }
          <div>
            <textarea rows="5" placeholder="Write the message" type="text" id="post-body" className={invalidMessage ? "invalid-field" : ""}/>
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
    addPost: (post) => savePost(dispatch, post)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));
