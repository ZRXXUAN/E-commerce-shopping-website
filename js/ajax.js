// 参数1: 请求地址
// 参数2: 请求方式
// 参数3: 请求携带的参数,默认值是空字符串
// 参数4: 操作请求结果,响应体数据的函数程序,默认值是空函数

function myAjax(url , type , val = '' , cb = function(){}){
                // 1, 创建 ajax 对象
            // 兼容 低版本IE浏览器
            let xhr;
            if (XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            // 2, 设定 open
            if(type === 'get'){
                xhr.open('get',`${url}?${val}`);
            }else{
                xhr.open('post', url);
            }

            // 3, 如果是 post 设定请求头
            if(type === 'post'){
                xhr.setRequestHeader('content-type' , 'application/x-www-form-urlencoded');
            }

            // 4, 设定 send
            if(type === 'get'){
                xhr.send()
            }else{
                xhr.send(val)
            }

            // 5, 接收结果
            // 做兼容处理
            xhr.onreadystatechange = ()=>{
                // ajax状态码是 4
                // http状态码是 200-299
                // 正则表达式  /2\d{2}/.test(xhr.status)
                if(xhr.readyState === 4 && (  xhr.status >= 200 && xhr.status <= 299  )){
                    // 当请求结束将获取的响应体数据,赋值给 回调函数
                    // 也就是 给 形参 赋值实参
                    cb(xhr.response);
                }
            }
}


// 使用 promise 方式 执行异步ajax请求的函数
// 参数1: 请求地址
// 参数2: 请求方式
// 参数3: 请求携带的参数,默认值是空字符串
function pAjax(url, type, val = '') {
    // 创建一个 promise 对象 在对象中完成 ajax
    const p = new Promise((f, r) => {
        // 异步的ajax请求

        // 1, 创建 ajax 对象
        // 兼容 低版本IE浏览器
        let xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // 2, 设定 open
        if (type === 'get') {
            xhr.open('get', `${url}?${val}`);
        } else {
            xhr.open('post', url);
        }

        // 3, 如果是 post 设定请求头
        if (type === 'post') {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        }

        // 4, 设定 send
        if (type === 'get') {
            xhr.send()
        } else {
            xhr.send(val)
        }

        // 5, 接收结果
        xhr.onload = () => {
            // ajax状态码是 4
            // http状态码是 200-299
            // 正则表达式  /2\d{2}/.test(xhr.status)
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 299)) {
                // 当请求结束将获取的响应体数据,赋值给 回调函数
                // 也就是 给 形参 赋值实参
                // 请求成功,执行 promise参数1 对应的回调函数
                f(xhr.response);
            } else {
                // 请求成功,执行 promise参数2 对应的回调函数
                r();
            }
        }
    })

    // 返回 promise 对象
    return p;
}


// 使用 promise 执行的 jQuery,ajax请求
// 参数1  url地址 
// 参数2  请求方式,默认值是 get
// 参数3  携带参数,默认值是 没有携带参数 
// 参数4  响应体格式,默认值是 字符串 
function pJQuery( url , type = 'get' , data = {} , dataType = 'text' ){
    // 定义promise对象 以及 两个形参
    const p = new Promise((f,r)=>{
        // 调用 jQuery的 ajax请求
        $.ajax({
            url: url,
            type:type,
            data:data,
            dataType:dataType,
            success: f ,
            error: r ,
        })
    })

    return p;
}
