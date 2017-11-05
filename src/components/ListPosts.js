import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route }from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getAllPosts, getPostsByCategory, sendPost } from '../utils/apis';
import { addPost, receivePosts } from '../actions';
import ListComments from './ListComments';
import Post from './Post';
import crypto from 'crypto-browserify';
import '../style/ListPosts.css';
import {ROOT_PATH} from '../App';
import Select from 'react-select';
import {orderMessages, ORDER_NONE, ORDER_TIME_ASC, ORDER_TIME_DESC, ORDER_SCORE_ASC, ORDER_SCORE_DESC} from '../utils/commons';

class ListPosts extends Component{

  state = {
    orderSelected: ORDER_NONE
  }

  loadPosts = () => {
    const {category, fetchPosts, fetchAllPosts} = this.props;
    if(category.name === ROOT_PATH.name){
      fetchAllPosts();
    }else{
      fetchPosts(category.name);
    }
  }

  componentDidMount = () => {
    this.loadPosts();
  }

  orderPosts = (orderType) => {
    const {posts, updatePosts} = this.props;

    this.setState({orderSelected: orderType});

    if(orderType === ORDER_NONE){
      this.loadPosts();
    } else {
      updatePosts(orderMessages(posts, orderType));
    }

  }

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
    console.log(categorySelect);
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
    const {posts} = this.props;
    const {category, categories} = this.props;
    const {orderSelected} = this.state;
    const allCategories = [ROOT_PATH, ...categories];
    const orderTypes = [
      {
        label: 'None',
        value: ORDER_NONE
      },
      {
        label: 'Score Ascending',
        value: ORDER_SCORE_ASC
      },
      {
        label: 'Score Descending',
        value: ORDER_SCORE_DESC
      },
      {
        label: 'Time Ascending',
        value: ORDER_TIME_ASC
      },
      {
        label: 'Time Descending',
        value: ORDER_TIME_DESC
      }
    ];

    return(
      <div className="list-posts">
        <Route
          exact path={category.path}
          render={() => (
            <div>
              <div className="categories">
                {allCategories.map(category => (
                  <div className="category-name" key={category.name}>
                    <Link to={category.path}>{category.name}</Link>
                  </div>
                ))}
              </div>
              <div align="right" className="filters">
                <div className="width-13-percent message-sort">
                  <div className="margin-top-15">
                    Sorted By
                  </div>
                  <div className="margin-left-2-percent">
                    <Select
                      options={orderTypes}
                      className="width-100-percent sort-selector"
                      searchable={false}
                      onChange={(event) => {
                        if(event){
                          this.orderPosts(event.value)
                        }
                      }}
                      value={orderSelected}/>
                  </div>
                </div>
              </div>

              <div className="posts-details">
                {posts.map((post) =>(
                    <Post key={post.id} post={post}/>
                ))}
                <div className="new-post-form">
                  <div className="title">Write New Post</div>
                  <form onSubmit={(event)=> this.post(event)}>
                    <div>
                      <input placeholder="Input the title" type="text" id="post-title" />
                    </div>
                    {(category.name === ROOT_PATH.name) &&
                      <div>
                        <select id="categorySelect">
                          {categories.map(category =>(
                            <option key={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                    }
                    <div>
                      <textarea placeholder="Write the message" type="text" id="post-body" />
                    </div>
                    <div>
                      <input type="submit" value="Send"/>
                    </div>
                  </form>
                </div>
                <Link to="/">Back</Link>
              </div>
            </div>
          )}
        />
        {posts.map((post) =>(
          <Route
            exact key={post.id} path={post.commentsPath}
            render={() => (
              <div>
                <ListComments post={post} />
              </div>
            )}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({posts, categories}) =>{
  return {
    posts: posts.filter((post) => {
      post.commentsPath=`/${post.category}/${post.id}/comments`;
      post.postsPath=`/${post.category}`
      return !post.deleted;
    }),
    categories

  };
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addPost: (post) => sendPost(post).then(response => dispatch(addPost(response))),
    fetchPosts: (category) => getPostsByCategory(category).then(posts => dispatch(receivePosts(posts))),
    fetchAllPosts: (category) => getAllPosts().then(posts => dispatch(receivePosts(posts))),
    updatePosts: (posts) => dispatch(receivePosts(posts))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
