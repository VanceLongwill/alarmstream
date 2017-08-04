import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export default class TitleInput extends Component {
  state = {
    value: this.props.value || '',
  }
  handleChange = (e, data) => {
    this.setState({
      value: data.value,
    });
  }
  handleBlur = () => {
    this.props.onSubmit(this.state.value);
  }
  render() {
    return (
      <Input
        placeholder="Enter a title"
        id="titleInput"
        type="text"
        value={this.state.value}
        transparent
        fluid
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}
