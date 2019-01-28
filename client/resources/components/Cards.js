import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(id){
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:8000/api/notes/${id}`).then(() => onDelete(id));
  }

  handleEdit(note){
    const { setEdit } = this.props;

    setEdit(note);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render(){
    const { note } = this.props;

    return (
      <div className="card-note">      
        <div className="card-header">
          <span className="card-title">{note.title}</span>
          
          <i className='bx bx-x-circle bx-sm orange float-right'
          onClick={() => {if (window.confirm("Do you really want to delete?")) this.handleDelete(note._id)}} />
          <i className='bx bxs-edit bx-sm orange float-right gap' 
          onClick={() => this.handleEdit(note)} />
            
        </div>
        <div className="card-body">
          {note.body}
        </div>
        <div className="card-footer">
          <span className="card-date">{moment(new Date(note.createdAt)).fromNow()}</span>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch({ type: 'DELETE_NOTE', id }),
  setEdit: note => dispatch({ type: 'SET_EDIT', note}),
});

export default connect (null, mapDispatchToProps)(Cards);
