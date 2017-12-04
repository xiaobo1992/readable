import React, { Component } from 'react';
import {connect} from 'react-redux';
import {modifyComment} from '../actions/commentActions'
import serializeFrom from 'form-serialize'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class EditComment extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      id: this.props.match.params.id
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let comment = serializeFrom(event.target,{hash:true});
    this.props.modifyComment(this.state.id, comment['body']);
    this.props.history.goBack()
  }

  handleCancel = (event) =>{
    this.props.history.goBack()
  }

  render() {
    const comment = this.props.comments[this.state.id];
    return(
      <div>
        <h2>Edit Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <p>{comment.author}</p>
          <TextField name="body" hintText="Write Post" defaultValue={comment.body} fullWidth={true}/><br/>
          <FlatButton type="submit" label="submit"/>
          <FlatButton onClick={this.handleCancel}label="Cancel"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps({comments}) {
  return{comments}
}

function mapDispatchToProps(dispatch) {
  return {
    modifyComment: (id, body) => dispatch(modifyComment(id, body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditComment)
