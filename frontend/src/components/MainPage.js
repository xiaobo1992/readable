import React, { Component } from 'react';
import {connect} from 'react-redux';
import ListCategory from "./ListCategory.js"
import ListPosts from "./ListPosts.js"
import NewPost from './NewPost.js'
import Sort from './Sort.js'
import {Row} from 'react-bootstrap'

class MainPage extends Component {

  render() {
    return(
      <div>
        <ListCategory {...this.props}/>
        <Sort  {...this.props}/>
        <NewPost  {...this.props}/>
        <Row>
          <ListPosts  {...this.props}/>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({categories, comments, posts, sortby}) {
  return{categories, comments, posts, sortby}
}

export default connect(
  mapStateToProps
)(MainPage)
