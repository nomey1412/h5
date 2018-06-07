
/**
 * 路由与接口的对应关系配置文件
 */

const map = {
  home:'getBanner,getGoodsList',
  goods_detail:'getGoodsInfo,checkUserStatus',
  login:'signIn,getVerifyCode,checkVerifyCaptcha',
  regis:'signUp,getVerifyCode,checkVerifyCaptcha',
  confirmOrder:'confirmOrder,commitConfirmOrder',
  confirmPay:'getConfirmPayMoney,confirmPayMoney,getVerifyCode,cancelOrder',
  confirmPayResult:'orderPayStatus,myBankCard',
  confirmRefund:'orderConfirm,withdrawalsApply,getVerifyCode',
  refundStatus:'getRepaymentStatus,getOrderLog',
  mine:'mine,logout',
  HelpCenter:'helpCenter',
  repur:'myOrder,checkRepeatGoodsStatus',
  myCoupon:'getCouponList',
  helpCenter:'helpCenter',
  ConHistory:'getCouponList',
  WhitePage:'iousBills,getRepaymentDetails',
  myOrder:'myOrder',
  repay:'getRepayInfo,repaymentProcessing,getRepaymentDetails',
  couponList:'getRepayCouponList',
  address:'getProvinceOther,getCityOther,getCountryOther,saveGoodsAddress',
  repayStatus:'getRepaymentStatus',
  bankCardInfo:'myBankCard,unBindBank',
  AddBankCardInfo:'getBankList,getProvinceOther,getCityOther,getCountryOther,bindBankCard,bindCardSendSms'


};
export default map;
