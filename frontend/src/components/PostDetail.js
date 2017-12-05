import React, { Component } from 'react'
import Post from './Post.js'
import ListComments from './ListComments.js'
import AddComment from './AddComment.js'
import {connect} from 'react-redux'
import NotFound from './NotFound.js'

class PostDetail extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      postId : this.props.match.params.id,
      category: this.props.match.params.category
    };
  }

  render() {
    const post = this.props.posts[this.state.postId]
    return(
      <div>
        {post &&
          <div>
            <h2>Post</h2>
            <Post {...this.props} id={this.state.postId}/>
            <h2>Comments</h2>
            <ListComments {...this.props} postId={this.state.postId}/>
            <AddComment parentId={this.state.postId}/>
          </div>
        }
        {!post &&
          <NotFound />
          }
      </div>
    )
  }
}

function mapStateToProps({posts, comments}) {
  return{posts, comments}
}

export default connect(mapStateToProps)(PostDetail);
