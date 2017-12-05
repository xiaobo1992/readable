import React, { Component } from 'react';
import {connect} from 'react-redux';
import {ListItem, List} from 'material-ui/List'
import Post from "./Post.js";
import {SORTBY_VOTE} from '../actions/sortActions.js';

class ListPosts extends Component{

  sort() {
    const {posts} = this.props;
    let display = [];
    for (var id in posts) {
      display.push(posts[id])
    }
    switch(this.props.sortby) {
      case SORTBY_VOTE:
        display.sort((a, b) => b.voteScore - a.voteScore)
        break;
      default:
        display.sort((a, b) => b.timestamp - a.timestamp)
        break;
    }
    return display;
  }

  filter(posts) {
    const currCategory = this.props.match.params.category;
    return posts.filter(post=> currCategory === undefined
      || currCategory === post.category)
  }

  render() {
    let posts = this.filter(this.sort())
    return(
        <List>
          {posts.map((post) => {
              return (<ListItem key={post.id}>
                  <Post {...this.props} id={post.id}/>
                </ListItem>)
              }
            )
          }
        </List>
    );
  }
}

function mapStateToProps({posts}) {
  return {posts};
}

export default connect(
  mapStateToProps,
)(ListPosts);
