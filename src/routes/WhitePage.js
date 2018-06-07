import React from 'react';
import {connect} from 'dva';
import GradWhite from '../components/white/WhiteTop';
import ListWhite from '../components/white/WhiteCenter';
import MuchListWhite from '../components/white/WhiteBottom';

function WhitePageRoute({ location, dispatch, white, layout , loading }) {
    return (
        <div className="tsd_write">
            <GradWhite {...white} dispatch={dispatch} location={location} />
            <ListWhite {...white} dispatch={dispatch} location={location} />
            <MuchListWhite {...white} dispatch={dispatch} location={location} />
        </div>
    );
}
WhitePageRoute.propTypes = {};


function mapStateToProps({ white, layout ,loading}) {
    return { white, layout, loading};
}

export default connect(mapStateToProps)(WhitePageRoute);