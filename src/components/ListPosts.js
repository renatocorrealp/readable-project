import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route }from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getAllPosts, getPostsByCategory } from '../utils/apis';
import { receivePosts } from '../actions';
import ListComments from './ListComments';
import Post from './Post';
import '../style/ListPosts.css';
import { ROOT_PATH } from '../App';
import Select from 'react-select';
import NewPost from './NewPost';
import { orderMessages, orderTypes, ORDER_NONE } from '../utils/commons';

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

  render(){
    const {posts} = this.props;
    const {category, categories} = this.props;
    const {orderSelected} = this.state;
    const allCategories = [ROOT_PATH, ...categories];

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
                <NewPost category={category}/>
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
    fetchPosts: (category) => getPostsByCategory(category).then(posts => dispatch(receivePosts(posts))),
    fetchAllPosts: (category) => getAllPosts().then(posts => dispatch(receivePosts(posts))),
    updatePosts: (posts) => dispatch(receivePosts(posts))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
