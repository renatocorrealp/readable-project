import React, { Component } from 'react';
import './App.css';
import ListCategories from './components/ListCategories';
import {getAllCategories} from './utils/apis';
import {receiveCategories} from './actions';
import {Route}from 'react-router-dom';
import {connect} from 'react-redux';
import ListPosts from './components/ListPosts';
import { withRouter } from 'react-router-dom';
class App extends Component {
  componentDidMount = () => {
      this.props.fetchCategories();
  }

  render() {
    const {categories} = this.props;

    return (
      <div className="App">
        <Route
          exact path="/"
          render={() => (
            <ListCategories/>
          )}
        />
        {categories.map((category) =>(
          <Route
            key={category.name}
            path={category.path}
            render={() => (
              <ListPosts category={category}/>
            )}
          />
          )
        )}

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchCategories: () => getAllCategories().then(categories => dispatch(receiveCategories(categories)))
  }
}

const mapStateToProps = ({categories}) =>{
  return {
    categories:
      categories.map(category => {
        return {
          name : category.name,
          path: "/" + category.path
        }
      })
  };
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
