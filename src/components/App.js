import React, { Component } from 'react';
import '../style/App.css';
import { getAllCategories } from '../utils/apis';
import { receiveCategories } from '../actions';
import { Route, Switch }from 'react-router-dom';
import { connect } from 'react-redux';
import ListPosts from './ListPosts';
import { withRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';
export const ROOT_PATH = {name:'all', path: '/'};

class App extends Component {
  componentDidMount = () => {
    this.props.fetchCategories();
  }

  render() {
    let {categories} = this.props;

    return (
      <div className="App">
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <ListPosts category={ROOT_PATH}/>
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
          ))}
          <Route component={ PageNotFound }/>
        </Switch>
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
