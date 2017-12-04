import React, { Component } from 'react';
import Post from './Post.js';
import ListComments from './ListComments.js'
import AddComment from './AddComment.js'

class PostDetail extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      postId : this.props.match.params.id,
      category: this.props.match.params.category
    };
  }

  render() {
    return(
      <div>
        <h2>Post</h2>
        <Post {...this.props} id={this.state.postId}/>
        <h2>Comments</h2>
        <ListComments {...this.props} postId={this.state.postId}/>
        <AddComment parentId={this.state.postId}/>
      </div>
    )
  }
}

export default PostDetail;
