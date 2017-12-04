import React, { Component } from 'react';
import {connect} from 'react-redux';
import {modifyComment} from '../actions/commentActions'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class EditComment extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      id: this.props.match.params.id,
      body:"",
      bodyError:""
    };
  }

  componentDidMount() {
    this.setState({body: this.props.comments[this.state.id].body})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (!this.validate()) {
      return;
    }
    this.props.modifyComment(this.state.id, this.state.body);
    this.props.history.goBack()
  }

  handleCancel = (event) =>{
    this.props.history.goBack()
  }

  validate = () => {
    let pass = true;
    this.setState({bodyError:""})
    if (!this.state.body) {
      pass = false;
      this.setState({bodyError: "Requeired"})
    }
    return pass;
  }

  change = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const comment = this.props.comments[this.state.id];
    return(
      <div>
        <h2>Edit Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <p>Author : {comment.author}</p>
          <TextField name="body" hintText="Write Post" fullWidth={true}
            value={this.state.body} onChange={e=>this.change(e)}
            errorText={this.state.bodyError}/><br/>
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
