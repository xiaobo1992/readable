import React, { Component } from 'react';
import {connect} from 'react-redux';
import {modifyPost} from '../actions/postActions'
import serializeFrom from 'form-serialize'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class EditPost extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      id: this.props.match.params.id
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let body = serializeFrom(event.target,{hash:true});
    this.props.modifyPost(this.state.id, body);
    this.props.history.goBack()
  }

  handleCancel = (event) =>{
    this.props.history.goBack()
  }

  render() {
    const post = this.props.posts[this.state.id];
    return(
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField name="title" hintText="Title" defaultValue={post.title} fullWidth={true}/><br/>
          <TextField name="body" hintText="Write Post"  defaultValue={post.body} fullWidth={true}/>
          <FlatButton type="submit" label="Submit"/>
          <FlatButton onClick={this.handleCancel} label="Cancel"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {posts};
}

function mapDispatchToProps(dispatch) {
  return {
    modifyPost: (id, body) => dispatch(modifyPost(id, body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)
