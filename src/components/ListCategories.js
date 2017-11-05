import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class ListCategories extends Component{
  render(){
    const {categories} = this.props;
    return (
      <div>
        {categories.map((category) =>(
          <div key={category.name}>
            <Link to={category.path}>{category.name}</Link>
          </div>
        )
      )}
    </div>
  )
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

export default  withRouter(connect(mapStateToProps)(ListCategories));
