//总搜索框
$('.inpSelect1').on('focus', () => {
    $('.inpSelect1').attr('placeholder', '');
})
$('.inpSelect1').on('blur', () => {
    $('.inpSelect1').attr('placeholder', '输入你想搜索的内容');
})
$('.glyphicon-search').on('click', () => {
    var valuecon = $('.inpSelect1')[1].value;

    window.location.href = `./select.html?keyword=${valuecon}`

})
//向数据库找数据

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
$('.shopcar').click(() => {
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

    // 个位数要变成双位数
    obj.seconds = obj.seconds < 10 ? "0" + obj.seconds : obj.seconds;
    obj.mintes = obj.mintes < 10 ? "0" + obj.mintes : obj.mintes;
    obj.hours = obj.hours < 10 ? "0" + obj.hours : obj.hours;
    obj.days = obj.days < 10 ? "0" + obj.days : obj.days;


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
    $('.seltitle>li').each((key, item) => {
        item.classList.remove('seleactive');
    })
    e.target.classList.add('seleactive');
    //大选
    if (e.target.getAttribute('name') === 'phoneFee') {
        $('.selcontents>li').each((key, item) => {
            item.style.display = 'none';
        })
        $('.selcontents>li:nth-child(1)').css({ 'display': 'block' });


        $('.recharge>li').on('mouseenter', (e) => {
            //最内层      
            if (e.target.getAttribute('name') === 'one') {
                $('.rechargeCont>li:nth-child(1)').css({ 'display': 'block' });
                $('.rechargeCont>li:nth-child(2)').css({ 'display': 'none' });
            }
            else if (e.target.getAttribute('name') === 'two') {

                $('.rechargeCont>li:nth-child(2)').css({ 'display': 'block' });
                $('.rechargeCont>li:nth-child(1)').css({ 'display': 'none' });
            }


        })
    }
    else if (e.target.getAttribute('name') === 'airphone') {
        $('.selcontents>li').each((key, item) => {
            item.style.display = 'none';
        })
        $('.selcontents>li:nth-child(2)').css({ 'display': 'block' });

        // 板块
        $('.recharge>li').on('mouseenter', (e) => {
            //最内层    
            const back = document.querySelector('.rechargeCont2');
            if (e.target.getAttribute('name') === 'one') {
                move(back, { 'left': 0 });
            }
            else if (e.target.getAttribute('name') === 'two') {
                move(back, { 'left': -208 });
            }
            else if (e.target.getAttribute('name') === 'three') {
                move(back, { 'left': -416 });
            }


        })
        console.log('话费');
    }
    else if (e.target.getAttribute('name') === 'hotel') {
        $('.selcontents>li').each((key, item) => {
            item.style.display = 'none';
        })
        $('.selcontents>li:nth-child(3)').css({ 'display': 'block' });

        // 板块
        $('.recharge>li').on('mouseenter', (e) => {
            //最内层    
            const back = document.querySelector('.rechargeCont3');
            if (e.target.getAttribute('name') === 'one') {
                move(back, { 'left': 0 });
            }
            else if (e.target.getAttribute('name') === 'two') {
                move(back, { 'left': -208 });
            }
        })
        console.log('酒店');
    }
})
$('.reClose').on('click', () => {
    $('.selects').css({ 'display': 'none' });
    $('.servers').css({ 'display': 'block' });
})



//头部和右部导航栏
$(window).scroll(function () {
    if ($(document).scrollTop() > 470) {
        $('.fixedSel').slideDown();
        $('.floorNav').css({ "position": "fixed", "top": "200px" });
    } else {
        $('.fixedSel').slideUp();
        $('.floorNav').css({ "position": "absolute", "top": "0" });
    }
    //跟随移动
    if($(document).scrollTop() > $('.contentAll').offset().top - 240){
        $('.floorNav>li').removeClass('flooractive').find('a').removeClass('flooractive');
        $('.ll1').addClass('flooractive').find('a').addClass('flooractive');
    }
    if($(document).scrollTop() > $('.specialSelBack').offset().top - 240){
        $('.floorNav>li').removeClass('flooractive').find('a').removeClass('flooractive');
        $('.ll2').addClass('flooractive').find('a').addClass('flooractive');

    }
    if($(document).scrollTop() > $('.channels').offset().top - 240){
        $('.floorNav>li').removeClass('flooractive').find('a').removeClass('flooractive');
        $('.ll3').addClass('flooractive').find('a').addClass('flooractive');
    }
    if($(document).scrollTop() > $('.recommends').offset().top - 240){
        $('.floorNav>li').removeClass('flooractive').find('a').removeClass('flooractive');
        $('.ll4').addClass('flooractive').find('a').addClass('flooractive');
    }
});
$('.floorNav').on('click', (e) => {
    if (e.target.getAttribute('name') === 'sha') {
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({ 'scrollTop': `${$('.contentAll').offset().top - 200}` }, 1000)

    }
    if (e.target.getAttribute('name') === 'youxuan') {
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({ 'scrollTop': `${$('.specialSelBack').offset().top - 200}` }, 1000)
    }
    if (e.target.getAttribute('name') === 'guangchang') {
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({ 'scrollTop': `${$('.channels').offset().top - 200}` }, 1000)
    }
    if (e.target.getAttribute('name') === 'tuijian') {
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({ 'scrollTop': `${$('.recommends').offset().top - 200}` }, 1000)
    }
    if (e.target.getAttribute('name') === 'kefu') {
        //元素距离页面的高度减去元素距离窗口的高度
        console.log('客服');
    }
    if (e.target.getAttribute('name') === 'ding') {
        //元素距离页面的高度减去元素距离窗口的高度
        $('html').animate({ 'scrollTop': `0` }, 1000)
    }
})
//广告触摸出现
$('.advertising').on('mouseenter', () => {
    $('.tuizhan img').css({ "width": "790px" })
}).on('mouseleave', () => {
    $('.tuizhan img').css({ "width": "0" })
}).on('click', () => {
    window.open('https://pro.jd.com/mall/active/38QtBtNgxmjDY5qbh1RqMHXuXw7H/index.html?babelChannel=ttt5');
})

const oDiv = document.querySelector('.recommend1');
const oUls = oDiv.querySelectorAll('ul');
pubu('家居生活');
//瀑布
function pubu(keyword) {
    let st = 0;

    //控制请求执行
    let bool = true;
    getData(keyword);
    window.onscroll = () => {
        //浏览器上卷高度
        let scrollHeight = document.documentElement.scrollTop;
        //视窗窗口高度
        let windowHeight = document.documentElement.clientHeight;
        //获取最矮ul高度
        let minUl = oUls[0];
        oUls.forEach(ul => {
            if (minUl.offsetHeight > ul.offsetHeight) {
                minUl = ul;
            }
        })
        // minUl.innerHTML += str;
        let minUlHeight = minUl.offsetHeight;
        //设置预留高度
        let h = 500;



        if (scrollHeight + windowHeight + h > (minUlHeight + $('.recommend1').offset().top + 500)) {
            if (bool) {
                // start+=24;

                getData(keyword);
                bool = false;
            } else {
                return;
            }

        }
    }
}
function getData(keyword) {
    const time = new Date();
    let t = parseInt(time.getTime() / 1000);
    //获取数据


    myAjax('/dt', 'get', `include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=${keyword}&start=24&_=${t}`, res => {
        const obj = JSON.parse(res)
        console.log(obj);

        st = obj.data.next_start;

        const arr = obj.data.object_list;
        arr.forEach(item => {
            let str = `
            <li>
                <div class="imgBox" style="height:${parseInt(250 * item.photo.height / item.photo.width)}px">
                    <img src="${item.photo.path}">
                </div>
                <div class="contBox">
                    <p><span>${item.msg}</span></p>
                    <p>
                        <span style="${item.like_count === 0 ? 'display:none' : ''}">
                            <i class="glyphicon glyphicon-thumbs-up"></i><span>${item.like_count}</span>
                        </span>   
                        <span style="${item.favorite_count === 0 ? 'display:none' : ''}"> 
                            <i class="glyphicon glyphicon-star"></i><span>${item.favorite_count}</span>
                        </span> 
                    </p>
                    <p>
                        <img src="${item.sender.avatar}" alt="">
                        <span>
                            <span>
                                <a href="javascripy:;">${item.sender.username}</a>
                            </span>
                            <span>
                                发布到<a href="javascripy:;">${item.album.name}</a>
                            </span>
                        </span>
                    </p>
                </div>
            </li>
            `;


            //找最矮的ul
            let minUl = oUls[0];
            oUls.forEach(ul => {
                if (minUl.offsetHeight > ul.offsetHeight) {
                    minUl = ul;
                }
            })
            minUl.innerHTML += str;
            bool = true;
        });
    });
}


//瀑布流切换
$('.navs').on('click', (e) => {
    let nameLi = e.target.innerHTML;
    console.log(nameLi);
    if (e.target.getAttribute('index') < 5) {
        console.log(e.target.getAttribute('index'));
        $('.recommend1>ul').html('');
        pubu(nameLi);
    }
    if (e.target.getAttribute('index') > 4) {
        console.log(e.target.getAttribute('index'));
        //先清除掉
        $('.recommend1>ul').html('');
        // 设定个数
        let page = 1;
        let line = 24;
        pJQuery('./server/goods_list.php', 'get', { cat_one_id: e.target.innerHTML, line: line, page: page }, 'json')
            .catch(() => {
                alert('页面崩溃了呜呜呜。。。。。还是回首页吧');
                window.location.href = './index.html';
            }).then(res => {
                const arr = res.data;
                console.log(arr);

                arr.forEach((item,key)=>{
                    str = `
                    <li class="list-item" height="612px">
                      <div class="panel panel-primary">
                        <div class="panel-body">
                          <ol class="breadcrumb">
                            <li><a href="#">${item.cat_one_id}</a></li>
                            <li><a href="#">${item.cat_two_id}</a></li>
                            <li class="active">${item.cat_three_id}</li>
                          </ol>
                        </div>
                        <div class="panel-footer">
                          <div class="row">
                            <div class="">
                              <div class="thumbnail">
                                <img src="${item.goods_big_logo}" alt="...">
                                <div class="caption">
                                  <h3>${item.goods_name}</h3>
                                  <p class="moneyss">
                                    <i class="glyphicon glyphicon-yen"></i>
                                    <span>${item.goods_price}</span>
                                  </p>
                                  <p>
                                    <a href="javascript:;" class="btn btn-primary" role="button">查找相似商品</a> 
                                    <a href="./detail.html?goods_id=${item.goods_id}" class="btn btn-danger" role="button">查看商品详情</a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    `;
                    let a = key % 4;
                    // console.log(key,a);
                    $('.recommend1>ul')[a].innerHTML += str;
                  })
                  

            })
    }
})


