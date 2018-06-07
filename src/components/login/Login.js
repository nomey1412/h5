/**
 * Created by biyajuan on 2018/1/9.
 *
 */
import {Tabs, WhiteSpace, List, InputItem, Toast, Button,} from 'antd-mobile';
import React, {Component} from 'react';
import {createForm} from 'rc-form';
import styles from './Login.css';
import md5 from '../../utils/md5';
import './Glogin.less'



const typeProps = {
    mobile: 'mobile',
    verify: 'verify',
    captcha: 'captcha',
};

function failToast(msg) {
    Toast.fail(msg, 1);
}
function checkMobile(mobile) {
    const re = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (!mobile || mobile.length < 11 || !(re.test(mobile.replace(/\s/g, '')))) {
        failToast('请输入正确的手机号');
        return false;
    } else {
        return true;
    }
}


function checkVerifyCode(verify) {
    if (!verify || verify.length < 6) {
        failToast('请输入正确的验证码');
        return false;
    } else {
        return true;
    }
}


function checkCaptcha(captcha) {
    if(!captcha || captcha.length < 4){
        failToast('请输入正确的图形验证码');
        return false;
    }else{ // 验证图形验证码是否正确
        return true;
    }
}
class LoginForm extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVerifyCode = this.handleVerifyCode.bind(this);
        this.handleChangeCaptcha = this.handleChangeCaptcha.bind(this);
    }

    clock = '';
    state = {
        mobile: '',
        password:'',
        captcha_url: 'http://amc.com/getVerifyCaptcha',
        captcha:'',
        verify: '',
        verifyText: '获取验证码',
        second: 60,
        disable: false,
        TabCheckStatus: true
    };

    // 定义处理方法
    dropSecond = () => {
        let newSecond = 0;
        newSecond = this.state.second - 1;
        if (newSecond > 0) {
            this.setState({
                verifyText: newSecond + 's',
                disable: true,
                second: newSecond
            });
        } else {
            clearInterval(this.clock);
            this.setState({
                verifyText: '重新获取',
                disable: false,
                second: 60
            });
        }
    };

    handleVerifyCode(e) {
        if (!checkMobile(this.state.mobile))return;
        if(!this.props.captcha_result){
            failToast('图文验证码错误')
            return;
        }
        this.setState({
            disable: false
        });
        this.clock = setInterval(this.dropSecond, 1000);
        this.props.dispatch({
            type: 'confirmPay/sendVerifyCode',
            payload: {
                type: 10, // 登陆验证码
                mobile: this.state.mobile
            }
        });
    }

    handleChange(type, e) {
        if (type === 'mobile') {
            this.setState({mobile: e});
        }
        if (type === 'verify') {
            this.setState({verify: e});
        }
        if (type === 'captcha') {
            this.setState({captcha: e});
          
            this.props.dispatch({
                type:'login/queryCheckCaptcha',
                payload:{
                    captcha : e
                 }
            });
        }
        //console.log(this.state);
    }

    handleChangeCaptcha(e){
        this.setState({
            captcha_url:"http://amc.com/getVerifyCaptcha/"+Math.random()
        });
    }

    handleSubmit(e) {
        if (!checkMobile(this.state.mobile))return;
        if(!checkCaptcha(this.state.captcha))return;
        if (!checkVerifyCode(this.state.verify))return;
        this.props.dispatch({
            type: 'login/queryLogin',
            payload: {
                mobile: this.state.mobile,
                password:this.state.password,
                verify: this.state.verify,
                captcha:this.state.captcha
            }
        });
    }


    render() {

        const {getFieldProps} = this.props.form;

        return (
            <div className="tsd_login" style={{height: '100%', backgroundColor: '#FFFFFF'}}>
                <div className="logo">
                    <img src="./src/assets/login/regist_logo.png" alt=""/>

                </div>

                <WhiteSpace />

                <div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            flexDirection: "column"
                        }}>

                            <InputItem placeholder="请输入手机号" type="phone"

                                       onChange={this.handleChange.bind(this, typeProps.mobile)}>
                                <div className={styles.loginNameIcon}/>
                            </InputItem>

                            <InputItem placeholder="请输入图形验证码" type="text"

                                onChange={this.handleChange.bind(this, typeProps.captcha)} 
                                extra={<div className="vertify_img"><img src={this.state.captcha_url} 
                                onClick={this.handleChangeCaptcha.bind(this)}/></div>}>
                                <div className={styles.loginVerifyIcon}/>
                            </InputItem>


                            <InputItem placeholder="请输入验证码" type="text"
                            onChange={this.handleChange.bind(this, typeProps.verify)}  extra={<Button className="verification" disabled={this.state.disable} onClick={this.handleVerifyCode.bind(this)}>{this.state.verifyText}</Button>}>
                                <div className={styles.loginVerifyIcon}/>
                        </InputItem>
                        </div>


                </div>
                <div styles='float: left;'>
                    <a href="/regis" styles='color:#FF7F00'>没有帐户点击注册</a>
                </div>

                <List className={styles.loginList}>
                    <Button type='warning' onClick={this.handleSubmit.bind(this)}>立即登录</Button>
                </List>

            </div>


        );
    }
}
const LoginLayout = createForm()(LoginForm);
export default LoginLayout;
