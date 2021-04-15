//注册条件
let switch1 = false;
let switch2 = false;
let switch3 = false
//获取节点
$('[name="username"]').on('focus', () => { 
    $('[name="username"]')[0].setAttribute('placeholder', '');

    }).on('blur', () => {
    $('[name="username"]')[0].setAttribute('placeholder', '请输入账号');
})
$('[name="pwd"]').on('focus', () => { $('[name="pwd"]')[0].setAttribute('placeholder', '');}).on('blur', () => {$('[name="pwd"]')[0].setAttribute('placeholder', '请输入密码');})

//判断是否选中,并再选中的时候给登陆添加点击事件
$('[name="check"]').on('click',()=>{
    // console.log($('[name="check"]').prop('checked')); 
    if($('[name="check"]').prop('checked')){
        $('.p4').css({"background-color":"blue","cursor":"pointer"})
        //登陆函数
        $('.p4').on('click',logins);
        
    }else{
        $('.p4').css({"background-color":"skyblue","cursor":"default"})
        //取消事件
        $('.p4').off('click',logins);
    }
})

//判断用户名 只允许6-8位非数字
let str = /^\D{0,6}$/
// console.log(str.test('zacasc'));

$('[name="username"]').on('input',function(){
    // console.log(($('[name="username"]').val()==='')); 
    if(str.test($('[name="username"]').val())){
        $('.dot1').css({"background":"skyblue"}).show();
        switch1 = true;
    }else{
        $('.dot1').css({"background":"red"}).show();
    }
    if($('[name="username"]').val()===''){
        // console.log(123);
        $('.dot1').hide();
    }  
})

//判断密码 只允许6-10位数字字母
let str1 = /^(\d|[a-zA-Z]){6,10}$/
// console.log(str1.test('zaA1sc'));

$('[name="pwd"]').on('input',function(){
    // console.log(($('[name="pwd"]').val()==='')); 
    if(str1.test($('[name="pwd"]').val())){
        $('.dot2').css({"background":"skyblue"}).show();
        switch2 = true;
    }else{
        $('.dot2').css({"background":"red"}).show();
    }
    if($('[name="pwd"]').val()===''){
        console.log(123);
        $('.dot2').hide();
    }  
})
text();
//验证码
function text(){
    let oldma = getVc();
    $('.yanz').html(oldma);
    $('.yanz').on('click',function(){
        oldma = getVc();
        $('.yanz').html(oldma);
        let str3 = setColor();
        let str4 = setColor();
        $('.yanz').css({"background":str3,"color":str4});
    })
    $('[name="yanz"]').on('blur',function(){
        if($('[name="yanz"]').val().toUpperCase() === oldma.toUpperCase()){
            $('.dot4').css({"background":"skyblue"}).show();
            switch3 = true;
        }else{
            $('.dot4').css({"background":"red"}).show();
        }
        if($('[name="yanz"]').val()===''){
            console.log(123);
            $('.dot4').hide();
        }  
    })
}


//登陆判断
function logins(){
    if(switch1===true&&switch2===true&&switch3===true){
        pJQuery( '../server/goods_login.php' , 'post' , {userName:$('[name="username"]').val(),userPwd:$('[name="pwd"]').val()} , 'json' )
        .then(res=>{
            
            //登陆成功
            if(res.result === 1 ){
                $('.mask')[0].style.display = 'block';
                $('.in')[0].style.display = 'block';
                $('.in2')[0].style.display = 'block';
                
                //目的是为了登陆完成后跳转回上一页页面
                const urll = getUrlVal();
                console.log(urll.url);
                

                $('.in1').html('登录成功,5秒后跳转上一个页面');
                
                //设置cookie
                mySetCookie( 'login' , 1 , 7*24*60*60 , '/' );

                //设置localstorage
                localStorage.setItem('username', $('[name="username"]').val());
                //立即跳转函数
                $('.in2').html(`立即跳转`).click(()=>{
                    if(urll.url !== undefined){
                        window.location.href = `${urll.url}`;
                    }else{
                        window.location.href = './index.html'
                    }
                    
                });
                //5秒等待
                let time = 5;
                setInterval(()=>{
                    time--;
                    if(time===0){
                        if(urll.url !== undefined){
                            window.location.href = `${urll.url}`;
                        }else{
                            window.location.href = './index.html'
                        }
                    }   
                    $('.in1').html(`登录成功,${time}秒后跳转上一个页面`);
                },1000)
                $('[name="check"]').prop('checked',false);
            }
            if(res.result === 0){
                $('.mask')[0].style.display = 'block';
                $('.in')[0].style.display = 'block';
                $('.in2')[0].style.display = 'block';
                $('.in1').html(`账号或者密码 不匹配 登录失败`);
                $('.in2').html(`确定`).click(()=>{
                    $('.mask')[0].style.display = 'none';
                    $('.in')[0].style.display = 'none';
                    $('.in2')[0].style.display = 'none';
                });
                
                //失败后重新生成验证码  同时清空密码和验证码的内容
                text();
                $('[name="yanz"]').val('');
                $('[name="pwd"]').val('');
                $('.dot2').hide();
                $('.dot4').hide();
            }
        }).catch(()=>{
            alert('啊没网了，请检查您的网络后重新登录');
            window.location.reload();
        });
    }else{
        text();
        let str3 = setColor();
        let str4 = setColor();
        $('.yanz').css({"background":str3,"color":str4});
        alert('请正确输入的账号密码');
    }
    //阻止默认事件
    return false;
}