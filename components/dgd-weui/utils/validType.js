const pattern = {
    id: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i'),
    cn: /^[\u4E00-\u9FA5]$/,
    enName: /^[a-zA-Z\s]+$/,
    cnName: /^[\u4E00-\u9FA5]{2,}$/,
    userName: /^[\da-zA-Z\u4E00-\u9FA5 \s]{2,20}$/,
    carId: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    mobile: /^1[34578]\d{9}$/,
    address: /^[\da-zA-Z\u4E00-\u9FA5 \s]{4,400}$/,
    date: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/,
    numVcode: /^[0-9]{4,8}$/,
    vcode: /^[a-zA-Z0-9]{4,8}$/,
    code: /^[a-zA-Z0-9]+$/,
    hkMc: /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/,
    taiWan: /(^[0-9]{8}$)|(^[0-9]{10}$)/,
    passport: /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/
}
//定义字符串的trim方法
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
}
//身份证的完整检测
function IdentityCodeValid(code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
    }

    else if (!city[code.substr(0, 2)]) {
        pass = false;
    }
    else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if (parity[sum % 11] != code[17]) {
                pass = false;
            }
        }
    }
    return pass;
}

module.exports = {
    // required 校验方法
    required(value) {
        // 如果是数组，则判断数组长度
        if (Array.isArray(value)) {
            return value.length > 0
        } else if (typeof value === 'object') {
            return Object.keys(value).length > 0
        } else {
            return !!(value && value !== 0)
        }
    },
    // 身份证规则检测
    id(value) {
        console.log('身份证验证')
        return typeof (value) === 'string' && IdentityCodeValid(value.trim())
    },
    // 中文检测
    cn(value) {
        return typeof (value) === 'string' && pattern.cn.test(value.trim())
    },
    // 手机号码检测
    mobile(value) {
        return typeof (value) === 'string' && pattern.mobile.test(value.trim())
    },
    // 邮箱检测
    email(value) {
        return typeof (value) === 'string' && pattern.email.test(value.trim())
    },
    // URL检测
    url(value) {
        return typeof (value) === 'string' && pattern.url.test(value.trim())
    },
    //车牌检测
    carId(value) {
        return typeof (value) === 'string' && pattern.carId.test(value.trim())
    },
    //中文名检测
    cnName(value) {
        return typeof (value) === 'string' && pattern.cnName.test(value.trim())
    },
    //英文名检测
    enName(value) {
        return typeof (value) === 'string' && pattern.enName.test(value.trim())
    },
    //用户名检测
    userName(value) {
        return typeof (value) === 'string' && pattern.userName.test(value.trim())
    },
    //地址检测
    address(value) {
        return typeof (value) === 'string' && pattern.address.test(value.trim())
    },
    //日期检测
    date(value) {
        return typeof (value) === 'string' && pattern.date.test(value.trim())
    },
    //数字验证码检测
    numVcode(value) {
        return typeof (value) === 'string' && pattern.numVcode.test(value.trim())
    },
    //其它验证码检测
    vcode(value) {
        return typeof (value) === 'string' && pattern.vcode.test(value.trim())
    },
    //编码检测
    code(value) {
        return typeof (value) === 'string' && pattern.code.test(value.trim())
    },
    //港澳通行证检测
    hkMc(value) {
        return typeof (value) === 'string' && pattern.hkMc.test(value.trim())
    },
    //台湾通行证检测
    taiWan(value) {
        return typeof (value) === 'string' && pattern.taiWan.test(value.trim())
    },
    //护照检测
    passport(value) {
        return typeof (value) === 'string' && pattern.passport.test(value.trim())
    }
}