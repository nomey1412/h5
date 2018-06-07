
/**
 * 接口配置文件
 */
const apis =  {
    banner:'getBanner',
    goodsList:'getGoodsList',
    goodsDetail:'getGoodsInfo',
    confirmOrder:'confirmOrder',
    checkUserStatus:'checkUserStatus',
    commitConfirmOrder:'commitConfirmOrder',
    getConfirmPayMoney:'getConfirmPayMoney',
    confirmPayMoney:'confirmPayMoney',
    orderPayStatus:'orderPayStatus',
    mine:'mine',
    myOrder:'myOrder',
    getAreasListByCustomerId:'getAreasListByCustomerId',
    getProvinceOther:'getProvinceOther',
    getCityOther:'getCityOther',
    getCountryOther:'getCountryOther',
    orderConfirm:'orderConfirm',
    withdrawalsApply:'withdrawalsApply',
    getRepaymentStatus:'getRepaymentStatus', //还款的status页面
    getOrderLog:'getOrderLog', //退款的status页面
    getRepayInfo:'getRepayInfo',
    getRepayCouponList:'getRepayCouponList',// 还款的优惠卷列表
    signIn:'signIn',
    signUp:'signUp',
    iousBills:'iousBills', //白条消费账单
    helpCenter:'helpCenter',
    getVerifyCode:'getVerifyCode',
    getCouponList:'getCouponList',// 优惠券列表
    getRepayCouponList:'getRepayCouponList', // 获取还款时的优惠券
    repaymentProcessing:'repaymentProcessing', // 确认还款
    checkRepeatGoodsStatus:'checkRepeatGoodsStatus',
    saveGoodsAddress:'saveGoodsAddress',
    getRepaymentDetails:'getRepaymentDetails', // ？接口
    logout:'logout',
    myBankCard:'myBankCard',
    checkVerifyCaptcha:'checkVerifyCaptcha',
    bankCardInfo:'bankCardInfo',
    getBankList:'getBankList',
    bindBankCard:'bindBankCard',
    bindCardSendSms:'bindCardSendSms',
    unBindBank:'unBindBank',
    cancelOrder:'cancelOrder'

};

export default apis;
