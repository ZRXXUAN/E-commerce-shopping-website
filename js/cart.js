$('.user').html(`<span class="login">欢迎您！</span><span class="free">${localStorage.getItem('username')}!</span>`);
// console.log( JSON.parse(window.localStorage.getItem('cart')).length  );

//将数据转化为数组
const datas = JSON.parse(window.localStorage.getItem('cart'))

//根据购物车的内容写信息
function kong() {
    $('.content2').css({ display: "none" })
    let str = ``;
    $('.content1').css({ display: "block" })
    str = '您的购物车是空的哦，快去首页看看吧!&nbsp;<span class="glyphicon glyphicon-arrow-right indexs">首页</span>';
    $('.content1').html(str);
    $('.indexs').click(() => {
        location.href = './index.html'
    });
}

if (window.localStorage.getItem('cart') === null || JSON.parse(window.localStorage.getItem('cart')).length === 0) {
    kong();
} else {
    $('.content1').css({ display: "none" })
    $('.content2').css({ display: "block" })
    activeSet();
}

function activeSet() {
    let str = ``;
    let number = 0;
    let type = 0;
    let money = 0;
    let strr = '';
    datas.forEach((item, key) => {
        number += item.num;
        if (item.bool) {
            type++
        };
        money += item.num * item.goods_price;
        str += `<li>
                <input type="checkbox" index="${key}" class="buy1" ${item.bool === true ? 'checked="true"' : ''}>
                <img src="${item.goods_small_logo}">
                <div class="prices">
                    <span>${item.goods_name}</span>
                    <span>￥${item.goods_price}</span>
                    <span><button>购买</button><button index="${key}" class="nobuy">我不要了</button></span>
                </div>
                <div class="numbers">
                    <button index="${key}" class="jian" ${item.num === 0 ? 'disabled' : ''}>-</button>
                    <span class="buynum">${item.num}</span>
                    <button index="${key}" class="jia" ${item.num === item.goods_number ? 'disabled' : ''}>+</button>
                </div>
            </li>
        `;
    })

    strr += `
    您一共购买${type}种 一共购买${number}件 一共${money}元 
                <input type="button" value="结算">
    `
    $('.allprice').html(strr);
    $('.concont').html(str);


    //设置定时器
    let time1;
    let time2;
    //给加减按钮添加点击事件
    cliclj();
    function cliclj() {
        $('.jia').click(function () {
            if (datas[$(this).attr('index')].num < datas[$(this).attr('index')].goods_number) {
                $(this).parent().find('.jian').prop('disabled', false);
                datas[$(this).attr('index')].num++;
                $(this).parent().find('.buynum').html(datas[$(this).attr('index')].num);
                localStorage.setItem('cart', JSON.stringify(datas));
                // console.log(datas[$(this).attr('index')].num);
            } else {
                //禁用增加按钮
                $(this).prop('disabled', true);
            }
            activeSet();
        })
    }
    //鼠标按下快速加
    $('.jia').on('mousedown', (function () {
        //先将点击事件去掉
        $('.jia').off('click');
        //计数，让按下效果到达2s后开始
        let tt = 0;
        time1 = setInterval(() => {
            tt++;
            if (tt > 40) {
                if (datas[$(this).attr('index')].num < datas[$(this).attr('index')].goods_number) {
                    $(this).parent().find('.jian').prop('disabled', false);
                    datas[$(this).attr('index')].num++;
                    $(this).parent().find('.buynum').html(datas[$(this).attr('index')].num);
                } else if (datas[$(this).attr('index')].num > datas[$(this).attr('index')]) {
                    $(this).prop('disabled', true);
                }
            } else return;
        }, 50)

    }))
    //鼠标抬起停止
    $('.jia').on('mouseup', (function () {
        clearInterval(time1);
        //将localstorage中的数据重写
        localStorage.setItem('cart', JSON.stringify(datas));
        //再次添加点击事件
        cliclj();
    }))

    clickjian();
    function clickjian() {
        //给减按钮添加点击事件
        $('.jian').click(function () {
            if (datas[$(this).attr('index')].num > 0) {
                $(this).parent().find('.jia').prop('disabled', false);
                datas[$(this).attr('index')].num--;
                $(this).parent().find('.buynum').html(datas[$(this).attr('index')].num);
                localStorage.setItem('cart', JSON.stringify(datas));
            } else {
                $(this).prop('disabled', true);
            }
            activeSet();
        })
    }

    //鼠标按下快速减
    $('.jian').on('mousedown', (function () {
        //先将点击事件去掉
        $('.jian').off('click');
        //计数，让按下效果到达2s后开始
        let tt = 0;
        time2 = setInterval(() => {
            tt++;
            if (tt > 40) {
                if (datas[$(this).attr('index')].num > 0) {
                    $(this).parent().find('.jia').prop('disabled', false);
                    datas[$(this).attr('index')].num--;
                    $(this).parent().find('.buynum').html(datas[$(this).attr('index')].num);
                } else if (datas[$(this).attr('index')].num = 0) {
                    $(this).prop('disabled', true);
                }
            } else return;
        }, 50)

    }))
    //鼠标抬起停止
    $('.jian').on('mouseup', (function () {
        clearInterval(time2);
        //将localstorage中的数据重写
        localStorage.setItem('cart', JSON.stringify(datas));
        clickjian();
    }))



    //全选反选，商品默认选中
    $('.all').find('input').click(function () {
        $('.all').find('input').off('click');
        datas.forEach(item => {
            item.bool = $('.all').find('input').prop('checked');
            $('.buy1').prop('checked', item.bool);
        })
        localStorage.setItem('cart', JSON.stringify(datas));
        activeSet();
    })
    $('.fan').click(function () {
        $('.fan').off('click');
        datas.forEach(item => {
            item.bool = !item.bool;
        })
        localStorage.setItem('cart', JSON.stringify(datas));
        activeSet()
    })



    $('.buy1').click(function () {
        datas[$(this).attr('index')].bool = $(this).prop('checked');
        localStorage.setItem('cart', JSON.stringify(datas));
        activeSet()
    })

    //不要了
    $('.nobuy').click(() => {
        if (datas.length === 0) {
            kong();
        } else {
            datas.splice($(this).attr('index'), 1);
            localStorage.setItem('cart', JSON.stringify(datas));
        }
    })


}