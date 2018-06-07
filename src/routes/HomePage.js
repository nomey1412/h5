/**
 * Created by huozhenguang on 2018/1/9.
 */
import React from 'react';
import { connect } from 'dva';
import BannerComponents from '../components/home/Banner';
import BodyComponents from '../components/home/Body';
import TaberComponents from '../components/home/Taber';
import 'antd-mobile/dist/antd-mobile.css';

function HomePage({ location, dispatch, home, layout , loading }) {
    return (
        <div>
        <BannerComponents {...home} dispatch={dispatch} location={location}/>
        <BodyComponents {...home} dispatch={dispatch} location={location}/>
        <TaberComponents {...home} dispatch={dispatch} location={location}/>
        </div>
);
}

function mapStateToProps({ home, layout ,loading}) {
    return { home, layout, loading};
}

export default connect(mapStateToProps)(HomePage);