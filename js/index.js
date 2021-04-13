//总搜索框
$('.inpSelect1').on('focus', () => {
    $('.inpSelect1')[0].setAttribute('placeholder', '');
    // $('.inpSelect1')[0].setAttribute('border','none');
})
$('.inpSelect1').on('blur', () => {
    $('.inpSelect1')[0].setAttribute('placeholder', '输入你想搜索的内容');
    // $('.inpSelect1')[0].setAttribute('border','none');
})

//登录
let cookieObj = myGetCookie();
if (cookieObj.login === undefined) {
    $('.user').html('<span class="login">您好！请登录</span><span class="free">免费注册</span>')
}
if (cookieObj.login === '1') {
    $('.user').html(`<span class="login">欢迎您！</span><span class="free">${localStorage.getItem('username')}!</span>`);
}
// console.log(myGetCookie().login);
loginRes();
function loginRes() {
    $('.login').on('click', () => {
        console.log(cookieObj.login);
        if (cookieObj.login === undefined) {
            window.location.href = `./login.html?url=${window.encodeURIComponent(window.location.href)}`;
        }
    });
    $('.free').on('click', () => {
        if (cookieObj.login === '1') {
            const a = confirm('您是要退出登陆么');
            if (a) {
                localStorage.removeItem('username');
                mySetCookie('login', 1, -1, '/');
                cookieObj = myGetCookie();
                $('.user').html('<span class="login">您好！请登录</span><span class="free">免费注册</span>');
                loginRes();
            }

        } else if (cookieObj.login === undefined) {
            window.location.href = './redister.html';
        }

    });
}

//点击进入列表
const oLi = document.querySelectorAll('.listz>li');
// console.log(oLi);
oLi.forEach((item, key) => {
    item.addEventListener('click', () => {
        window.location.href = `./page.html?cat_one_id=${item.innerHTML}`
    })
})


//购物车
$('#shopcar').click(() => {
    if (cookieObj.login === undefined) {
        var a = confirm('你还未登录，是否登录');
        if (a) {
            window.location.href = `./login.html?url=${window.encodeURIComponent(window.location.href)}`;
        }
        return
    } else {
        window.location.href = `./cart.html`;
    }
})

//倒计时
function countDown() {
    const obj = {};
    const present = new Date();
    let furtureTime = parseInt(new Date('2021-6-18 12:00:00').getTime() / 1000);
    let presentTime = parseInt(present.getTime() / 1000);

    obj.seconds = parseInt((furtureTime - presentTime) % 60);
    obj.mintes = parseInt((furtureTime - presentTime) / 60 % 60);
    obj.hours = parseInt((furtureTime - presentTime) / 60 / 60 % 24);
    obj.days = parseInt(((furtureTime - presentTime) / 60 / 60 / 24));
    return obj;
}
//先加载一个
function autoCount() {
    const time = countDown();
    $('.date>ul').html(`
                <li>${time.hours}</li>
                <li>${time.mintes}</li>
                <li>${time.seconds}</li>
                `);
    $('.date>span:nth-of-type(3)').html(`${time.days}天`);
}
autoCount();
//开始倒计时
const counttime = setInterval(() => {
    autoCount();
}, 1000)

//选项卡
//最外层
$('.servers').on('click', (e) => {
    $('.servers').css({ 'display': 'none' });
    $('.selects').css({ 'display': 'block' });
    //设置默认第一张
    // $('.selcontents>li:nth-child(1)').css({ 'display': 'block' });
    // $('.rechargeCont>li:nth-child(1)').css({ 'display': 'block' });
})
//内层
$('.seltitle>li').on('mouseenter', (e) => {
    //大标题统一删除下划线
    $('.seltitle>li').each((key,item)=>{
        item.classList.remove('seleactive');
    })
    e.target.classList.add('seleactive');
    //大选
    if (e.target.getAttribute('name') === 'phoneFee') {
        $('.selcontents>li').each((key,item)=>{
            item.style.display = 'none';
        })
        $('.selcontents>li:nth-child(1)').css({ 'display': 'block' });

        
        $('.recharge>li').on('mouseenter', (e) => {
            //最内层      
            if (e.target.getAttribute('name') === 'one') {
                $('.rechargeCont>li:nth-child(1)').css({ 'display': 'block' });
                $('.rechargeCont>li:nth-child(2)').css({ 'display': 'none' });
            } 
            else if(e.target.getAttribute('name') === 'two') {

                $('.rechargeCont>li:nth-child(2)').css({ 'display': 'block' });
                $('.rechargeCont>li:nth-child(1)').css({ 'display': 'none' });
            }
    
    
        })
    } 
    else if(e.target.getAttribute('name') === 'airphone'){
        $('.selcontents>li').each((key,item)=>{
            item.style.display = 'none';
        })
        $('.selcontents>li:nth-child(2)').css({ 'display': 'block' });

        // 板块
        $('.recharge>li').on('mouseenter', (e) => {
            //最内层    
            const back = document.querySelector('.rechargeCont2'); 
            if (e.target.getAttribute('name') === 'one') {
                move(back,{'left':0});
            } 
            else if(e.target.getAttribute('name') === 'two') {
                move(back,{'left':-208});
            }
            else if(e.target.getAttribute('name') === 'three') {
                move(back,{'left':-416});
            }
    
    
        })
        console.log('话费');
    }
    else if(e.target.getAttribute('name') === 'hotel'){
        $('.selcontents>li').each((key,item)=>{
            item.style.display = 'none';
        })
        $('.selcontents>li:nth-child(3)').css({ 'display': 'block' });

        // 板块
        $('.recharge>li').on('mouseenter', (e) => {
            //最内层    
            const back = document.querySelector('.rechargeCont3'); 
            if (e.target.getAttribute('name') === 'one') {
                move(back,{'left':0});
            } 
            else if(e.target.getAttribute('name') === 'two') {
                move(back,{'left':-208});
            }
        })
        console.log('酒店');
    }
})
$('.reClose').on('click',()=>{
    $('.selects').css({ 'display': 'none' });
    $('.servers').css({ 'display': 'block' });
})



//头部和右部导航栏
$(window).scroll(function(){
    if($(document).scrollTop() > 470){
        $('.fixedSel').slideDown();
        $('.floorNav').css({"position":"fixed","top":"200px"});
    }else{
        $('.fixedSel').slideUp();
        $('.floorNav').css({"position":"absolute","top":"0"});
    }
});
$('.floorNav').on('click',(e)=>{
    if(e.target.getAttribute('name') === 'sha'){
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({'scrollTop':`${$('.contentAll').offset().top-200}`},1000)
    }
    if(e.target.getAttribute('name') === 'youxuan'){
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({'scrollTop':`${$('.specialSelBack').offset().top-200}`},1000)
    }
    if(e.target.getAttribute('name') === 'guangchang'){
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({'scrollTop':`${$('.channels').offset().top-200}`},1000)
    }
    if(e.target.getAttribute('name') === 'tuijian'){
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({'scrollTop':`${$('.contentAll').offset().top-200}`},1000)
        $(document).scrollTop(($('.contentAll').offset().top-200));
    }
    if(e.target.getAttribute('name') === 'kefu'){
        //元素距离页面的高度减去元素距离窗口的高度
        console.log('客服');
    }
    if(e.target.getAttribute('name') === 'ding'){
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({'scrollTop':`0`},1000)
    }
})


