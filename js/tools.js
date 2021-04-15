// 判断 质数 函数 
// num 是 外界输入的,需要判断的数值
// 如果是 质数 返回值是 true 如果不是 质数 返回值是 false
function isPrime(num) {
    // 因为 需要的 返回值是 true 或者 false
    // 变量bool 中 默认 存储 true
    var bool = true;
    for (var i = 2; i <= num / 2; i++) {
        if (num % i === 0) {
            // 如果 发生整除 bool 赋值 false break 终止循环
            bool = false;
            break;
        }
    }
    // 判断结果存储在 bool 中 
    // 通过 return 来定义函数的返回值是 bool 中存储的数据
    return bool;
}

/*  
    随机验证码函数
    
    @param number number   验证码字符串位数
    @param str    string   验证码字符串内容  
    @param bool   boolean  验证码字符串是否允许有重复的字符出现

    @return vc    string   返回值是生成的验证码字符串 

    说明: 随机设定 指定位数 指定内容 是否允许重复字符出现的 验证码字符串
          
          验证码最少4位,默认值是6位
    
          验证码字符串内容 默认是 数字,大小写字母

          默认验证码允许出现重复字符
*/
function getVc(number = 6, str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', bool = true) {
    // 1,验证码位数参数判断
    if (number < 4) {
        return '验证码位数不能小于4位';
    }

    // 2, 定义一个变量储存随机生成的验证码字符串
    var vc = '';

    // 3, 循环遍历,判断生成验证码字符串
    // 验证码位数 也就是 循环的次数 是 number 次 也就是 循环 1-number次
    for (var i = 1; i <= number; i++) {
        // 生成随机索引下标
        var index = parseInt(Math.random() * str.length);

        // 如果 bool 是 true 就直接拼接 随机生成的 验证码字符
        if (bool) {
            // 通过索引下标,直接获取字符,拼接入vc验证码字符串
            vc += str[index];
        } else {
            // 如果 bool 是 false 不允许 有重复字符
            // 执行判断如果 随机字符串 不在 vc验证码中 再拼接 
            if (vc.indexOf(str[index]) === -1) {
                vc += str[index];
            } else {
                // 随机字符,已经在vc验证码中,再次循环一次
                i--;
            }
        }
    }

    // 将生成的字符串,作为返回值
    return vc;
}


/*
    随机数函数

    返回值 是 随机颜色 
        方法1 返回值是 css3 支持的 颜色的英文单词
        方法2 返回值是 #和6位十六进制数值
        方法3 返回值是 rgb() 形式

*/

function setColor() {
    // 方法1: 定义数组,存储所有支持的颜色英文单词
    // 随机生成索引下标 从数组中 获取一个英文单词
    // var colorArr = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua','orange','aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','limegreen','linen','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace','olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise','violet','wheat','whitesmoke','yellowgreen','rebeccapurple'];
    // 随机生成 索引下标 从数组中获取 颜色单词 设定为返回值
    // 随机数的范围 0 - 最后一个单元的索引下标 
    // 也就是 0 -  colorArr.length-1
    // return colorArr[parseInt( Math.random()*colorArr.length )];

    // 方法2: #和6位十六进制数值
    // 定义一个字符串,内容是 0-9和a-f 十六进制的所有字符
    // 现在需要6位可以重复的 随机的 十六进制字符 
    // 通过循环 循环6次 每次生成一个 随机的索引下标 从字符串中获取 十六进制字符

    // 十六进制字符
    // var str = '0123456789abcdef';
    // // 定义空字符串,存储颜色字符,默认内容为#
    // var color = '#';
    // // 循环6次,每次生成一个随机索引下标,从字符串中获取随机字符,拼接入color字符串
    // for(var i = 1 ; i <= 6 ; i++){
    //     // 每次循环,生成一个随机的索引下标
    //     var index = parseInt( Math.random()*str.length );
    //     // 通过随机索引下标获取 随机字符,拼接入 color 字符串
    //     color += str[index];
    // }
    // return color;

    // 方法3 rgb()
    // rgb() 每一个属性值 是 0-255 的数值
    // 通过 随机数 设定 三个 随机数值
    return `rgb(${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)})`;
}


// 获取时间对象储存的具体时间信息
function getTimeObj(time) {
    // 使用兼容语法,创建时间对象
    // 如果没有输入实参,按照当前时间 创建时间对象
    // 如果有输入的实参,按照实参时间 创建时间对象
    var t = time === undefined ? new Date() : new Date(time);

    // 获取对应的时间数据

    // 年
    var year = t.getFullYear();

    // 月
    var month = t.getMonth() + 1;
    // 前导补零
    month = month < 10 ? '0' + month : month;

    // 日
    var day = t.getDate();
    // 前导补零
    day = day < 10 ? '0' + day : day;


    // 星期
    var weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var week = weekArr[t.getDay()];

    // 时
    var hour = t.getHours();
    // 前导补零
    hour = hour < 10 ? '0' + hour : hour;

    // 分
    var minute = t.getMinutes();
    // 前导补零
    minute = minute < 10 ? '0' + minute : minute;

    // 秒
    var second = t.getSeconds();
    // 前导补零
    second = second < 10 ? '0' + second : second;

    // 使用对象的特殊语法,创建对象
    return { year, month, day, week, hour, minute, second };
}

// 获取时间差函数
// 参数1 : 设定的终止时间
// 返回值 : 当前时间距离终止时间的天,小时,分钟,秒
//         返回值的形式是 对象
function getCountDown(endTime) {
    // 创建时间对象
    // 起始时间对象就是当前时间
    var st = new Date();
    // 结束事件对象是参数输入的时间
    var et = new Date(endTime);

    // 获取时间差 转化为秒数
    // 两个时间戳相减 结果除以1000 取整
    var time = parseInt((et.getTime() - st.getTime()) / 1000);

    // 转化为对应的天,小时,分钟,秒
    var d = parseInt(time / (24 * 60 * 60));
    var h = parseInt(time % (24 * 60 * 60) / (60 * 60));
    var m = parseInt(time % (60 * 60) / 60);
    var s = time % 60;

    // 前导补零
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    return { d, h, m, s };
}

function getUrlVal(){
    // 1, 创建对象,存储键值对数据
    var obj = {};
    // 2, 获取地址栏参数字符串,去掉第一个字符?问号
    // 从索引是1 也就是 第二个字符 开始截取
    var str = window.location.search.substr(1);
    // 3, 将字符串 以 & 符号为间隔 分割为数组
    // 单元存储的就是 每一个独立的 键值对字符串
    var arr1 = str.split('&');
    // 4, 循环遍历 arr1数组 将存储的 键值对字符串 以 =等号 为间隔分为个数组
    arr1.forEach(function(item){
        var arr2 = item.split('=');
        obj[arr2[0]] = window.decodeURIComponent( arr2[1] ); 
    })
    // 5, 返回值 是 设定的对象
    return obj;
}


//获取标签css属性值
//参数一：对象
//参数二：属性
//
function myGetStyle(element, type) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[type];
    } else {
        return element.currentStyle[type];
    }


}


// 设定参数:
// 参数1: 运动的标签对象
// 参数2: 对象形式 键名是css属性 键值是 css属性值
// 参数3: 当所有运动停止 执行的函数程序 
//        设定默认值是 空函数
// 参数3 有实参 执行输入的程序 没有实参 执行空函数
// 参数3 可以是 没有赋值 赋值 匿名函数 赋值 定义好的函数名称
function move(element, styleObj, endFun = function () { }) {
    // 定义一个变量 存储 定时器个数
    // 初始值 是 0 也就是 定时器默认 是 0个
    let t = 0;

    for (let type in styleObj) {
        // 每循环一次 一定会 有一个属性 对应一个定时器
        // 变量储存数值 累加1
        t++;

        // 如果 type 属性 是 opacity 透明度 就 将最终数值 乘以100 其他属性不变
        endVal = type === 'opacity' ? styleObj[type] * 100 : styleObj[type];

        // 如果 type 属性 是 opacity 透明度 就 获取结果直接*100 其他属性 parseInt() 获取整数部分
        let startVal = type === 'opacity' ? myGetStyle(element, type) * 100 : parseInt(myGetStyle(element, type));

        let time = setInterval(function () {

            let sped = (endVal - startVal) / 10;

            sped = sped > 0 ? Math.ceil(sped) : Math.floor(sped);

            startVal += sped;

            // 如果 type 属性 是 opacity 透明度 就 除以100赋值 其他属性 拼接px单位赋值
            element.style[type] = type === 'opacity' ? startVal / 100 : startVal + 'px';

            if (startVal === endVal) {


                clearInterval(time);
                // 清除定时器 变量 执行 累减操作
                t--;

                // 如果 t 为 0 证明所有的定时器 清除完毕
                // 证明运动真正的停止了
                if (t === 0) {
                    // 运动停止了,调用 对应的 参数3 输入的函数程序
                    endFun();
                }
            }
        }, 30)
    }
}

// 设定cookie函数
// 参数1: 键名
// 参数2: 键值
// 参数3: 时效时间 如果没有时间戳 时效属性赋值 '' 空字符串
// 参数4: 路径/作用域 默认值是 空字符串
function mySetCookie(key, value, time, path = '') {
    // 1, 获取时间对象
    const t = new Date();

    // 2, 设定时间对象的时效
    // 当前时间戳 - 8小时的毫秒 + 时效的毫秒
    t.setTime(t.getTime() - 8 * 60 * 60 * 1000 + time * 1000);

    // 3, 设定 cookie 键值对
    document.cookie = `${key}=${value};path=${path};expires=${time === undefined ? '' : t}`;
}

// 获取cookie函数
// 将 cookie 键值对字符串转化为cookie键值对对象
function myGetCookie() {
    // 创建对象
    const obj = {};

    // 1 获取cookie键值对字符串
    let str = document.cookie;

    // 2 以 分号空格为间隔转化为数组
    const arr1 = str.split('; ');

    // 3 循环遍历数组,以 = 等号为间隔,分割
    arr1.forEach((item) => {
        const arr2 = item.split('=');
        obj[arr2[0]] = arr2[1];
    })

    // 4 返回对象
    return obj;
}