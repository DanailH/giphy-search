import React, {
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { searchParamName } from '../../constants';
import './searchBar.css';

// Props type validation
SearchBar.propTypes = {
  query: PropTypes.string.isRequired
};

export default function SearchBar({ query }) {
  const [searchQuery, setSearchQuery] = useState(query);
  const history = useHistory();

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Handler to react on form submit event
  const handleSearchQuerySubmit = event => {
    event.preventDefault();

    if (searchQuery !== '') {
      history.push(`?${searchParamName}=${searchQuery}`);
    }
  };

  // Handler to react on input value change event
  const handleSearchQueryChange = (event) => {
    event.persist();

    setSearchQuery(event.target.value);
  };

  return (
    <form className='search-bar' onSubmit={handleSearchQuerySubmit}>
      <input
        type='text'
        className='search-input'
        placeholder='Search for Giphy gifs'
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />

      <button type='submit' className='search-button'>
        <i className="material-icons">
          search
        </i>
      </button>
    </form>
  );
};
