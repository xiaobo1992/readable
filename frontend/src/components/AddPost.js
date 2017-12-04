import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {submitPost} from '../actions/postActions'
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import serializeFrom from 'form-serialize'
import * as UUID from '../util/uuid'

class AddPost extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      category:null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let post = serializeFrom(event.target,{hash:true});
    if (this.state.category == null) {
      return;
    }
    post['category'] = this.state.category;
    post['timestamp'] = Date.now();
    post['id'] = UUID.guid();
    this.props.submitPost(post)
    .then(this.props.history.goBack());
  }

  handleCategoryChange = (event, index, value) =>{
    this.setState({category:value})
  }

  handleCancel = (event) =>{
    this.props.history.goBack()
  }

  render() {
    const {categories} = this.props;
    const keys = Object.keys(categories);
    return(
        <div>
          <h2>New Post</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField name="title" id="title" hintText="Title" fullWidth={true}/><br/>
            <TextField name="author" id="author" hintText="Author" fullWidth={true}/><br/>
            <TextField name="body" id="body" hintText="Write Post" multiLine={true} rows={2} rowsMax={4} fullWidth={true}/><br/>
            <SelectField value={this.state.category}
              onChange={this.handleCategoryChange} fullWidth={true} floatingLabelText="Category">
              {keys.filter(key => key !== "All").map((key) => {
                  return <MenuItem key={key} value={categories[key].name} primaryText={categories[key].name}/>
              })}
            </SelectField><br/>
            <FlatButton type="Submit">Submit</FlatButton>
            <FlatButton onClick={this.handleCancel} label="Cancel"/>
          </form>
        </div>
    )
  }
}

function mapStateToProps({categories, posts}) {
  return {categories, posts}
}

function mapDispatchToProps(dispatch) {
  return{
    submitPost: (post) => dispatch(submitPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost);
