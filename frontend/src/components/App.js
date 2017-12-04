import React, { Component } from 'react';
import MainPage from './MainPage.js';
import PostDetail from "./PostDetail.js";
import AddPost from './AddPost.js';
import EditComment from './EditComment.js';
import EditPost from './EditPost.js'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {fetchCategories} from "../actions/categoryActions"
import {fetchPosts} from "../actions/postActions"
import {connect} from 'react-redux';
import "../index.css"

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div className="body">
            <Switch>
              <Route exact path='/' render={(props)=>(
                <MainPage {...props}/>
              )}/>
              <Route exact path="/post/new" render={(props)=>(
                <AddPost {...props}/>
              )}/>
              <Route exact path="/edit/comment/:id" render={(props)=>(
                <EditComment {...props}/>
              )}/>
              <Route exact path="/edit/post/:id" render={(props)=>(
                <EditPost {...props}/>
              )}/>
              <Route exact path='/:category' render={(props)=>(
                <MainPage {...props}/>
              )}/>
              <Route exact path="/:category/:id" render={(props)=>(
                <PostDetail {...props}/>
              )}/>
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({categories, comments, posts, sortby}) {
  return{categories, comments, posts, sortby}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts:() => dispatch(fetchPosts()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
