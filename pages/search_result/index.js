import React from 'react';
import { withRouter } from 'next/router';
import SearchResult from '../../components/SearchResult/SearchResult';
import ErrorInfo from '../../components/UIElements/ErrorInfo/ErrorInfo';

const SearchResultPage = (props) => {
    //error handling after refresh
    const printContent = () => {
        if(typeof window === 'undefined') {
            return <ErrorInfo />
        }
        return <SearchResult dataSearch={props.router.query}/>
    };

    return(
        <div className="container">
            {printContent()}
        </div>
    );
};

export default withRouter(SearchResultPage);