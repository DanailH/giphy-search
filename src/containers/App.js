import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '../hooks/helperHooks';
import { searchParamName } from '../constants';
import { getGiphySearchResults } from '../services/giphyService';
import SearchBar from '../components/searchBar/searchBar';
import Gallery from '../components/gallery/gallery'
import './App.css';

// Props type validation
App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default function App(props) {
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  // Used to cache the previous props
  const prevSearchQuery = useRef();
  // Invoke custom hook get the query params
  const query = useQuery();
  const queryParamValue = query.get(searchParamName);

  const handleLoadMoreGifs = async offset => {
    const loadMoreData = await getGiphySearchResults(initialSearchQuery, offset);

    setSearchData([...searchData, ...loadMoreData]);
  };

  useEffect(() => {
    const setComponentState = async () => {
      if (queryParamValue && prevSearchQuery.current !== queryParamValue) {
        setInitialSearchQuery(queryParamValue);
        setSearchData([]);

        prevSearchQuery.current = queryParamValue;

        const data = await getGiphySearchResults(queryParamValue);
        setSearchData(data);
      }
    };

    setComponentState();
  }, [props, queryParamValue]);

  return (
    <div className='container'>
      <SearchBar query={initialSearchQuery || ''} />
      <br /><br />
      <Gallery images={searchData} loadMoreGifs={handleLoadMoreGifs} />
    </div>
  );
};
