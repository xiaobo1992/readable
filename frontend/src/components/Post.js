import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {upVotePost, downVotePost, deletePost} from '../actions/postActions';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import {toDate} from '../util/timeutil'
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';

class Post extends Component{
    constructor(props){
    	super(props);
    	this.state = {
        id : this.props.id
      };
    }

    handleDeletePost = (event, id) =>{
      this.props.deletePost(id);
    }

    handleUpVotePost = (event, id) => {
      this.props.upVote(id);
    }

    handleDownVotePost = (event, id) => {
      this.props.downVote(id);
    }

    handleEditPost = (event) => {
      this.props.history.push(`/edit/post/${this.state.id}`)
    }


    render() {
      const post = this.props.posts[this.state.id];
      return(
        <Card>
            <Link to={"/"+ post.category +"/"+ post.id}>
              <CardTitle title={post.title} subtitle={post.author}/>
            </Link>
            <CardText>{post.body}</CardText>
            <CardActions>
              <FlatButton onClick={event=>this.handleEditPost(event)} label="Edit" icon={<ActionEdit/>}/>
              <FlatButton onClick={event=>this.handleDeletePost(event, `${post.id}`)} label="Delete" icon={<ActionDelete/>}/>
              <FlatButton onClick={event=>this.handleUpVotePost(event, `${post.id}`)} label="upVote" icon={<ActionThumbUp/>}/>
              <FlatButton onClick={event=>this.handleDownVotePost(event, `${post.id}`)}  label="downVote" icon={<ActionThumbDown/>}/>
            </CardActions>
            <CardText>
              <Chip style={{display:"inline-block"}}>Score {post.voteScore}</Chip>
              <Chip style={{display:"inline-block"}}>{post.category}</Chip>
              <Chip style={{display:"inline-block"}}>{toDate(post.timestamp)}</Chip>
              <Chip style={{display:"inline-block"}}>Comment {post.commentCount}</Chip>
            </CardText>
        </Card>
      );
    }
}

function mapStateToProps({posts}) {
  return{posts}
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (id) => dispatch(upVotePost(id)),
    downVote: (id) => dispatch(downVotePost(id)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post);
