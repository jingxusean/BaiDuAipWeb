//增加身份证验证  需要引入 getIdCardInfo()函数
function isIdCardNo(field, rules, i, options) {
    var info = getIdCardInfo(field.val());
    if (info.isTrue){
        return false;
    }else{
        return "身份证号码输入不正确";
    }
}

