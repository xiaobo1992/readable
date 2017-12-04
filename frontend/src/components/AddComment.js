import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import {submitComment} from '../actions/commentActions.js';
import {updatePostByComment} from '../actions/postActions'
import * as UUID from '../util/uuid'

class AddComment extends Component{
  constructor(props){
  	super(props);
  	this.state = {
      parentId: this.props.parentId,
      body:"",
      bodyErrorText:"",
      author:"",
      authorErrorText:""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (!this.validate()) {
      return;
    }

    let comment = {};
    comment['author'] = this.state.author;
    comment['body'] = this.state.body;
    comment['parentId'] = this.state.parentId;
    comment['timestamp'] = Date.now();
    comment['id'] = UUID.guid();

    this.props.submitComment(comment).then(() => {
        this.props.updatePost(this.state.parentId);
        this.setState({
          body:"",
          author:"",
          errorText:""
        })
      }
    );
  }

  validate = () => {
    let pass = true;
    this.setState({
      bodyErrorText:"",
      authorErrorText:""
    })

    if (!this.state.body) {
        this.setState({bodyErrorText: "Requeired"})
        pass = false;
    }

    if (!this.state.author) {
        this.setState({authorErrorText: "Requeired"})
        pass = false;
    }

    return pass;
  }

  change = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    return (
      <div>
        <h2>New Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField name="author" id="author" hintText="Author" fullWidth={true}
            value={this.state.author}
            onChange={event=>this.change(event)}
            errorText={this.state.authorErrorText}/><br/>
          <TextField ref="body" name="body" id="body" hintText="Write Post"
            multiLine={true} value={this.state.body}
            onChange={event=>this.change(event)}
            rows={2} rowsMax={4} fullWidth={true}
            errorText={this.state.bodyErrorText}/><br/>
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
