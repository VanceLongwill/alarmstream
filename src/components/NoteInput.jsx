import React, { Component } from 'react';
import { TextArea } from 'semantic-ui-react';

export default class NoteInput extends Component {
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
      <TextArea
        placeholder="Write a note (optional)"
        id="noteInput"
        rows={8}
        autoHeight={false}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.state.value}
      />
    );
  }
}
