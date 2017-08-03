import React, { Component } from 'react';
import { TextArea } from 'semantic-ui-react';

export class NoteInput extends Component {
  state = {
    value: this.props.value || "",
  }
  handleChange = (e, data) => {
    // ADD : 150 char limit?
    this.setState({
      value: data.value,
    });
    this.props.onSubmit(data.value);
  }
  componentWillUnmount = () => {
    this.props.onSubmit(this.state.value);
  }
  render(){
    return(
      <TextArea
        placeholder='Write a note (optional)'
        id="noteInput"
        rows={8}
        autoHeight={false}
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}
