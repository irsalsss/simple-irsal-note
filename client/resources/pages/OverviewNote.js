import React, { Component } from 'react';
import Forms from '../components/Forms';
import Cards from '../components/Cards';
import axios from 'axios';
import { connect } from 'react-redux';

class OverviewNote extends Component {

  componentDidMount (){

    const { onLoad } = this.props;
    axios('http://localhost:8000/api/notes').then((res) => onLoad(res.data));

  }

  render () {
    const { notes } = this.props;
    return (
      <div className="container">
        <div className="form-flex">
          <Forms />
        </div>
        <div className="card-title-flex">Your Notes Here</div>
        <hr className="hr" />
        <div className="card-flex">
          {notes.map((note) => <Cards key={note._id} note={note} />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.reducersNote.notes
  };
}

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data })
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewNote);