import React from 'react';
import SearchResult from '../components/SearchResult/SearchResult';
import { useSearchParams } from 'react-router-dom';

function Result() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return <SearchResult query={query} />;
}

export default Result;
