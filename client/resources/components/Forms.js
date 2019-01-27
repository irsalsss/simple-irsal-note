import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Forms extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      body: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField (key, event){
    this.setState({
      [key]: event.target.value
    });
  } 

  handleSubmit (){
    const { onSubmit } = this.props;
    const { title, body } = this.state;

    axios.post('http://localhost:8000/api/notes', {
      title,
      body
    })
    .then((res) => onSubmit(res.data))
    .then(() => this.setState({ title: '', body: ''}));

  }

  render (){
    const { title, body } = this.state;
    return (
      <div className="form-note">
        <span className="title-note">Your Note</span><br /><br />

        <label className="label-note">Title</label> <br />
        <input required 
        type="text" 
        className="input-title-note" 
        placeholder="enter the title"
        maxLength="21"
        onChange={(e) => this.handleChangeField('title', e)}
        value={title}
         /> <br /><br />

        <label className="label-note">Message</label> <br />
        <textarea 
        required 
        type="text" 
        className="input-message-note" 
        placeholder="enter the message" 
        maxLength="235"
        onChange={(e) => this.handleChangeField('body', e)}
        value={body}
        /> <br /><br />

        <button onClick={this.handleSubmit} className="button-submit">Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch ({ type: 'ADD_NOTE', data })
});

export default connect(null, mapDispatchToProps)(Forms);