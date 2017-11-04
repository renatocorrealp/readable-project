import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Route }from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getPostsByCategory, sendPost } from '../utils/apis';
import { addPost, receivePosts } from '../actions';
import ListComments from './ListComments';
import '../style/ListPosts.css';
import Post from './Post';
import crypto from 'crypto-browserify';

class ListPosts extends Component{
  componentDidMount = () => {
      const {category} = this.props;
      this.props.fetchPosts(category.name);
  }

  post = (e) => {
    const { addPost, category } = this.props;
    // prevent form to submit
    e.preventDefault();

    const titleInput = e.target.querySelector("#post-title");
    const postTitle = titleInput.value;
    const bodyTextArea = e.target.querySelector("#post-body");
    const postBody = bodyTextArea.value;

    // TODO pegar username
    const username = "rcorrea";

    // TODO colocar geração de id em componente aparte
    const id = crypto.createHash('sha1').update(Date.now() + username).digest('hex');

    let newPost = {};
    newPost.id = id;
    newPost.category = category.name;
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
    const {category} = this.props;
    return(
      <div className="list-posts">
        <Route
          exact path={category.path}
          render={() => (
            <div>
              {posts.map((post) =>(
                  <Post key={post.id} post={post}/>
              ))}
              <div>
                <form onSubmit={(event)=> this.post(event)}>
                  <div>
                    <input type="text" id="post-title" />
                  </div>
                  <div>
                    <textarea type="text" id="post-body" />
                  </div>
                  <div>
                    <input type="submit" value="Send"/>
                  </div>
                </form>
              </div>
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
    addPost: (post) => sendPost(post).then(response => dispatch(addPost(response))),
    fetchPosts: (category) => getPostsByCategory(category).then(posts => dispatch(receivePosts(posts)))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts));
