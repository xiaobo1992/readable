import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class NewPost extends Component{

  render() {
    return(
      <FloatingActionButton href="/post/new">
        <ContentAdd />
      </FloatingActionButton>
    )
  }
}

export default NewPost;
