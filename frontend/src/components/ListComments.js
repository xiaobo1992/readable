import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions/commentActions.js'
import {ListItem, List} from 'material-ui/List'
import Comment from './Comment.js';

class ListComments extends Component{
  constructor(props){
  	super(props);
  	this.state = {
      postId : this.props.postId,
    };
  }

  componentDidMount() {
    this.props.getComments(this.state.postId)
  }

  render() {
    const {comments} = this.props;
    const keys = Object.keys(comments)
    return(
      <List>
      {
        keys.map(key => {
          const comment = comments[key]
          return (
            <ListItem key={key}>
              <Comment {...this.props} postId={this.state.postId} commentId={comment.id}/>
            </ListItem>
          )
        })
      }
      </List>
    )
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (id) => dispatch(getComments(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComments)
