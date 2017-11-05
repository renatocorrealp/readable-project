import React, { Component } from 'react';
import { sendPost } from '../utils/apis';
import { addPost } from '../actions';
import { connect } from 'react-redux';
import { ROOT_PATH } from '../App';
import { withRouter } from 'react-router-dom';
import crypto from 'crypto-browserify';

class NewPost extends Component{
  post = (e) => {
    const { addPost, category } = this.props;
    // prevent form to submit
    e.preventDefault();

    const titleInput = e.target.querySelector("#post-title");
    const bodyTextArea = e.target.querySelector("#post-body");
    const categorySelect = e.target.querySelector("#categorySelect");

    const postTitle = titleInput.value;
    const postBody = bodyTextArea.value;

    let categorySelected = null;
    if(categorySelect){
      categorySelected = categorySelect.value;
    }else{
      categorySelected = category.name;
    }

    // TODO pegar username
    const username = "rcorrea";

    // TODO colocar geração de id em componente aparte
    const id = crypto.createHash('sha1').update(Date.now() + username).digest('hex');

    let newPost = {};
    newPost.id = id;
    newPost.category = categorySelected;
    // TODO ajustar
    newPost.title = postTitle;
    newPost.timestamp = Date.now();
    newPost.body = postBody;
    newPost.author = username;

    addPost(newPost);
    bodyTextArea.value = "";
    titleInput.value = "";
  }

  render(){
    const { category, categories } = this.props;
    return (
      <div className="post-form">
        <div className="title">Write New Post</div>
        <form onSubmit={(event)=> this.post(event)}>
          <div>
            <input placeholder="Input the title" type="text" id="post-title" />
          </div>
          {(category.name === ROOT_PATH.name) &&
            <div>
              <div className="category-title">
                Category
              </div>
              <select id="categorySelect">
                {categories.map(category =>(
                  <option key={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          }
          <div>
            <textarea rows="5" placeholder="Write the message" type="text" id="post-body" />
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
    addPost: (post) => sendPost(post).then(response => dispatch(addPost(response)))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));
