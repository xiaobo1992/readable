import React, { Component } from 'react';
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

class ListCategory extends Component {

  handleCategoryChange = (event, index, value) => {
    if (value === 'All') {
      this.props.history.push("/")
    } else {
      this.props.history.push(`/${value}`)
    }
  }

  getCurrSelect = () => {
    let currCategory = this.props.match.params.category;
    return currCategory === undefined? "All" : currCategory;
  }

  render() {
    let {categories} = this.props;
    const keys = Object.keys(categories);

    return (
      <SelectField value={this.getCurrSelect()}
        onChange={this.handleCategoryChange} floatingLabelText="Category">
        {keys.map((key) => {
            return <MenuItem key={key} value={categories[key].name} primaryText={categories[key].name}/>
        })}
      </SelectField>
    )
  }
}

function mapStateToProps({categories}) {
  return {categories};
}

export default connect(
  mapStateToProps
)(ListCategory)
