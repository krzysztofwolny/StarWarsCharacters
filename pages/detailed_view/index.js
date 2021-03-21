import React from 'react';
import { withRouter } from 'next/router';
import DetailedView from '../../components/DetailedView/DetailedView';
import ErrorInfo from '../../components/UIElements/ErrorInfo/ErrorInfo';

const DetailedViewPage = (props) => {
    //error handling after refresh
    const printContent = () => {
        if(typeof window === 'undefined') {
            return <ErrorInfo />
        }
        return <DetailedView ordinaryNumber={props.router.query}/>
    }
    return(
        <div className="container">
            {printContent()}
        </div>
    );
};

export default withRouter(DetailedViewPage);