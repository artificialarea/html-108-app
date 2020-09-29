import React from 'react';
import './SearchBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default class SearchBox extends React.Component {
  render() {
    const { searchTerm } = this.props;
    return (
      <div className="SearchBox">
        <FontAwesomeIcon icon={faSearch}/>
        <input 
          placeholder="Search term" 
          value={searchTerm}
          onChange={event => this.props.handleUpdate(event.target.value)}
        />
      </div>
    )
  }
}