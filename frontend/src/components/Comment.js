import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {upVoteComment, downVoteComment, deleteComment} from '../actions/commentActions'
import {updatePostByComment} from '../actions/postActions'
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import {toDate} from '../util/timeutil'
import Chip from 'material-ui/Chip';


class Comment extends Component{
  constructor(props){
  	super(props);
  	this.state = {
      commentId:this.props.commentId,
      postId:this.props.postId
    };
  }

  handleUpVoteComment = (event, id) => {
    this.props.upVoteComment(id)
  }

  handleDownVoteComment = (event, id) => {
    this.props.downVoteComment(id)
  }

  handleDeleteComment = (event, id, parentId) => {
    this.props.deleteComment(id).then(
      () => {
        this.props.updatePost(parentId)
      }
    )
  }

  handleEdit = (event) => {
    this.props.history.push(`/edit/comment/${this.state.commentId}`)
  }

  render() {

    const comment = this.props.comments[this.state.commentId]
    return(
      <Card>
        <CardTitle title={comment.author}/>
        <CardText>{comment.body}</CardText>
        <CardActions>
          <FlatButton onClick={event=>this.handleEdit(event)} label="Edit" icon={<ActionEdit/>}/>
          <FlatButton onClick={event=>this.handleDeleteComment(event, `${comment.id}`, `${comment.parentId}`)} label="Delete" icon={<ActionDelete/>}/>
          <FlatButton onClick={event=>this.handleUpVoteComment(event, `${comment.id}`)} label="upVote" icon={<ActionThumbUp/>}/>
          <FlatButton onClick={event=>this.handleDownVoteComment(event, `${comment.id}`)}  label="downVote" icon={<ActionThumbDown/>}/>
        </CardActions>
        <CardText>
          <Chip style={{display:"inline-block"}}>Score {comment.voteScore}</Chip>
          <Chip style={{display:"inline-block"}}>{toDate(comment.timestamp)}</Chip>
        </CardText>
      </Card>
    )
  }
}

function mapStateToProps({comments}) {
  return {comments};
}

function mapDispatchToProps(dispatch) {
  return {
    upVoteComment: (id) => dispatch(upVoteComment(id)),
    downVoteComment: (id) => dispatch(downVoteComment(id)),
    deleteComment:(id) => dispatch(deleteComment(id)),
    updatePost: (postId) => dispatch(updatePostByComment(postId))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
