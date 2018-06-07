/**
 * Created by biyajuan on 2018/1/9.
 * 说明:登录路由入口文件
 */
import React from 'react';
import { connect } from 'dva';
import LoginLayout from "../../components/login/Login";
function LoginRoute({ location, dispatch, login, layout , loading }) {
  return (
    <LoginLayout {...login} dispatch={dispatch} location={location} />
  );
}

LoginRoute.propTypes = {
};


function mapStateToProps({ login, layout ,loading}) {
  return { login, layout, loading};
}
export default connect(mapStateToProps)(LoginRoute);
