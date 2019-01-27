import React, { Component } from 'react';
import Forms from '../components/Forms';
import Cards from '../components/Cards';
import { connect } from 'react-redux';

class OverviewNote extends Component {
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

export default connect(mapStateToProps)(OverviewNote);