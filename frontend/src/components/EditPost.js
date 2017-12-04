import React, { Component } from 'react';
import {connect} from 'react-redux';
import {modifyPost} from '../actions/postActions'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class EditPost extends Component {

  constructor(props){
  	super(props);
  	this.state = {
      id: this.props.match.params.id,
      title:"",
      body:"",
      titleError:"",
      bodyError:""
    };
  }

  componentDidMount() {
    this.setState({
      title : this.props.posts[this.state.id].title,
      body : this.props.posts[this.state.id].body })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.validate()) {
      return;
    }
    let body = {}
    body['title'] = this.state.title;
    body['body'] = this.state.body;
    this.props.modifyPost(this.state.id, body);
    this.props.history.goBack()
  }

  handleCancel = (event) =>{
    this.props.history.goBack()
  }

  change = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  validate = () => {
    let pass = true;
    this.setState({
      bodyError:"",
      titleError:""
    })
    if (!this.state.body) {
      pass = false;
      this.setState({bodyError: "Requeired"})
    }

    if (!this.state.title) {
      pass = false;
      this.setState({titleError: "Requeired"})
    }
    return pass;
  }

  render() {
    return(
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField name="title" hintText="Title" fullWidth={true}
            errorText={this.state.titleError} value={this.state.title}
            onChange={e=>this.change(e)}/><br/>
          <TextField name="body" hintText="Write Post" fullWidth={true}
            errorText={this.state.bodyError} value={this.state.body}
            onChange={e=>this.change(e)}/>
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
