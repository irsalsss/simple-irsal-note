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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount (){
    const { onLoad } = this.props;

    axios('http://localhost:8000/api/notes').then((res) => onLoad(res.data));
  }

  componentWillReceiveProps (nextProps){
    if(nextProps.noteToEdit) {
      this.setState ({
        title: nextProps.noteToEdit.title,
        body: nextProps.noteToEdit.body
      });
    }
  }

  handleSubmit(){
    const { onSubmit, onEdit, noteToEdit } = this.props;
    const { title, body } = this.state;

    if(!noteToEdit){
      axios.post('http://localhost:8000/api/notes', {
      title,
      body
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ title: '', body: ''}));
    } else {
        return axios.patch(`http://localhost:8000/api/notes/${noteToEdit._id}`, {
          title,
          body 
        })
          .then((res) => onEdit(res.data))
          .then(() => this.setState({ title: '', body: '' }))
    }
  }
  

  handleDelete(id){
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:8000/api/notes/${id}`).then(() => onDelete(id));
  }

  handleEdit(note){
    const { setEdit } = this.props;

    setEdit(note);
  }

  render(){
    const { note, noteToEdit } = this.props;

    return (
      <div className="card-note">      
        <div className="card-header">
          <span className="card-title">{note.title}</span>
          
          <i className='bx bx-x-circle bx-sm orange float-right'
          onClick={() => this.handleDelete(note._id)} />
          {!noteToEdit ?
            <i className='bx bxs-edit bx-sm orange float-right gap' 
            onClick={() => this.handleEdit(note)} /> :
            <i class='bx bx-check-circle bx-sm orange float-right gap'
            onClick={this.handleSubmit} />
            }
            
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
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
  onSubmit: data => dispatch({ type: 'ADD_NOTE', data }),
  onDelete: id => dispatch({ type: 'DELETE_NOTE', id }),
  onEdit: data => dispatch({ type: 'EDIT_NOTE', data }),
  setEdit: note => dispatch({ type: 'SET_EDIT', note}),
});

const mapStateToProps = state => ({
  noteToEdit: state.reducersNote.noteToEdit
});

export default connect (mapStateToProps, mapDispatchToProps)(Cards);
