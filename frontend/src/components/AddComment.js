import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {submitComment} from '../actions/commentActions.js';
import serializeFrom from 'form-serialize'
import {updatePostByComment} from '../actions/postActions'
import * as UUID from '../util/uuid'

class AddComment extends Component{
  constructor(props){
  	super(props);
  	this.state = {
      parentId: this.props.parentId,
      author:"",
      body:""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let comment = serializeFrom(event.target, {hash:true});
    comment['parentId'] = this.state.parentId;
    comment['timestamp'] = Date.now();
    comment['id'] = UUID.guid();

    this.props.submitComment(comment).then(() => {
      this.props.updatePost(this.state.parentId)
    });

    this.refs.author.getInputNode().value = ""
    this.refs.body.getInputNode().value = ""
  }


  handleTextChange = (event, newValue) => {
    console.log(newValue)
  }

  onChange = (event) => {
      console.log(event)
  }

  render() {
    return (
      <div>
        <h2>New Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField  name="author" id="author" hintText="Author" fullWidth={true}
            ref="author"/><br/>
          <TextField ref="body" name="body" id="body" hintText="Write Post" multiLine={true}
            rows={2} rowsMax={4} fullWidth={true} ref="body"/><br/>
          <FlatButton type="submit" label="Submit"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps({comments}) {
  return {comments}
}

function mapDispatchToProps(dispatch) {
  return {
    submitComment: (comment) => dispatch(submitComment(comment)),
    updatePost: (parentId) => dispatch(updatePostByComment(parentId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment)
