import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route }from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getPostsByCategory, deletePost, sendPost } from '../utils/apis';
import { receivePosts, removePost, addPost } from '../actions';
import ListComments from './ListComments';
import PostComment from './PostComment';
import crypto from 'crypto-browserify';
class ListPosts extends Component{
  componentDidMount = () => {
      const {category} = this.props;
      this.props.fetchPosts(category.name);
  }

  removePost = (postId) => {
    const { removePost } = this.props;
    removePost(postId);
  }

  post = (postMessage) => {
    const { addPost, category } = this.props;

    // TODO pegar username
    const username = "rcorrea";
    // TODO colocar geração de id em componente aparte
    const id = crypto.createHash('sha1').update(Date.now() + username).digest('hex');

    let newPost = {};
    newPost.id = id;
    newPost.category = category.name;
    // TODO ajustar
    newPost.title = "nova msg";
    newPost.timestamp = Date.now();
    newPost.body = postMessage;
    newPost.author = username;

    addPost(newPost);
  }

  render(){
    const {posts} = this.props;
    const {category} = this.props;
    return(
      <div>
        <Route
          exact path={category.path}
          render={() => (
            <div>
              {posts.map((post) =>(
                  <div key={post.id}>
                    <Link to={post.commentsPath}>
                      {post.body} - {post.author}
                    </Link>
                    <input type="button" value="Excluir" onClick={() => this.removePost(post.id)}/>

                  </div>
                )
              )}
              <PostComment action={this.post} />
              <Link to="/">Back</Link>
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

const mapStateToProps = ({posts}, {category}) =>{
  return {
    posts: posts.filter((post) => {
      post.commentsPath=`/${category.name}/${post.id}/comments`;
      post.postsPath=`/${category.name}`
      return !post.deleted;
    })

  };
}

const mapDispatchToProps = (dispatch) =>{
  return {
    addPost: (data) => sendPost(data).then(post => dispatch(addPost(data))),
    fetchPosts: (category) => getPostsByCategory(category).then(posts => dispatch(receivePosts(posts))),
    removePost: (postId) => deletePost(postId).then(() => dispatch(removePost(postId)))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
