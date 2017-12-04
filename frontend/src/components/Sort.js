import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {SORTBY_DATE, SORTBY_VOTE, sortByDate, sortByVote} from '../actions/sortActions.js';

class Sort extends Component{

  handleSortChange = (event, index, value) => {
    switch(value) {
      case SORTBY_DATE:
        this.props.sortByDate()
        break;
      case SORTBY_VOTE:
        this.props.sortByVote()
        break;
      default:
        this.props.sortByDate()
        break;
    }
  }

  render() {
    return(
      <SelectField value={this.props.sortby} onChange={this.handleSortChange} floatingLabelText="Sort By">
        <MenuItem key={SORTBY_DATE} value={SORTBY_DATE} primaryText={SORTBY_DATE}/>
        <MenuItem key={SORTBY_VOTE} value={SORTBY_VOTE} primaryText={SORTBY_VOTE}/>
      </SelectField>)
  }
}

function mapStateToProps({sortby}) {
  return {sortby}
}

function mapDispatchToProps(dispatch) {
  return {
    sortByDate: () => dispatch(sortByDate()),
    sortByVote: () => dispatch(sortByVote())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sort)
