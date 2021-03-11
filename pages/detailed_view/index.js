import React from 'react';
import { withRouter } from 'next/router';
import DetailedView from '../../components/DetailedView/DetailedView';

const DetailedViewPage = (props) => {
    return(
        <div className="container">
            <DetailedView itemData={props.router.query}/>
        </div>
    );
};

export default withRouter(DetailedViewPage);