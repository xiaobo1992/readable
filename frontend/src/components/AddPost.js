import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {submitPost} from '../actions/postActions'
import {connect} from 'react-redux';
import * as UUID from '../util/uuid'

class AddPost extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      category:"",
      title:"",
      author:"",
      body:"",
      categoryError:"",
      titleError:"",
      authorError:"",
      bodyError:"",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }
    let post = {};
    post['title'] = this.state.title;
    post['author'] = this.state.author;
    post['body'] = this.state.body;
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

  change = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  validate = () => {
    let pass = true;
    this.setState({
      categoryError :"",
      titleError : "",
      authorError : "",
      bodyError : ""
    })

    if (!this.state.title) {
      pass = false;
      this.setState({titleError:"Requeired"})
    }

    if (!this.state.category) {
      pass = false;
      this.setState({categoryError:"Requeired"})
    }

    if (!this.state.author) {
      pass = false;
      this.setState({authorError:"Requeired"})
    }

    if (!this.state.body) {
      pass = false;
      this.setState({bodyError:"Requeired"})
    }
    return pass;
  }

  render() {
    const {categories} = this.props;
    const keys = Object.keys(categories);
    return(
        <div>
          <h2>New Post</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField name="title" id="title" hintText="Title" fullWidth={true}
              errorText={this.state.titleError}
              onChange={e=>this.change(e)}/><br/>
            <TextField name="author" id="author" hintText="Author" fullWidth={true}
              errorText={this.state.authorError}
              onChange={e=>this.change(e)}/><br/>
            <TextField name="body" id="body" hintText="Write Post" multiLine={true} rows={2}
              rowsMax={4} fullWidth={true}
              errorText={this.state.bodyError}
              onChange={e=>this.change(e)}/><br/>
            <SelectField value={this.state.category}
              onChange={this.handleCategoryChange} fullWidth={true} floatingLabelText="Category"
              errorText={this.state.categoryError}>
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
