import React from 'react';
import { withRouter } from 'next/router';
import SearchResult from '../../components/SearchResult/SearchResult';

const SearchResultPage = (props) => {
    return(
        <div className="container">
            <SearchResult dataSearch={props.router.query}/>
        </div>
    );
};

export default withRouter(SearchResultPage);