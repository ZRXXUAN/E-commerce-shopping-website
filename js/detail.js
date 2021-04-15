//  1, 获取 url地址栏中携带的数据信息
const urlObj = getUrlVal();
console.log(urlObj);
// 定义变量 存储 res 也就是 ajax请求 响应的商品信息对象数据
let msgObj;
//  2, 向后端PHP程序发送请求
pJQuery( '../server/goods_detail.php' , 'post' , { goods_id: urlObj.goods_id } , 'json' )
.catch(()=>{
  alert('页面崩溃了呜呜呜。。。。。还是回首页吧');
  window.location.href = './index.html';
}).then(res => {
  console.log(res);

  // 将 获取的 res 也就是当前商品信息存储在变量中
  msgObj = res;
  // 根据数据动态生成页面内容
  let str = `
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">商品详细信息</h3>
    </div>
    <div class="panel-body">
     <div class="bigGlass"></div> 
      <div class="media">
        <div class="media-left">
          <a href="javascript:;" class="imgss">
            <img class="media-object" src="${res.goods_small_logo}" alt="...">
          </a>
          <div class="mask"></div>
        </div>
        <div class="media-body">
          <h4 class="media-heading">${res.goods_name}</h4>
          <p>
            <i class="glyphicon glyphicon-yen"></i>
            <span>${res.goods_price}</span>
          </p>
          <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default">XL</button>
            <button type="button" class="btn btn-default">L</button>
            <button type="button" class="btn btn-default">M</button>
            <button type="button" class="btn btn-default">S</button>
            <button type="button" class="btn btn-default">XS</button>
          </div>
          <p>
            <a href="javascript:;" class="btn btn-warning btn-lg" role="button">立即购买</a>
            <a href="javascript:;" name="cart" class="btn btn-danger btn-lg" role="button">加入购物车</a>
          </p>
        </div>
      </div>
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a href="#">商品详细信息</a></li>
        <li role="presentation"><a href="#">商品参数信息</a></li>
        <li role="presentation"><a href="#">相关商品</a></li>
      </ul>
      <div>
          ${res.goods_introduce}
      </div>
    </div>
  </div>
  `;

  // 将字符串结果写入到标签中
  $('.container').html(str);
  console.log();
  $('.bigGlass').css({'background-image':`url(${res.goods_big_logo})`})
})


$('.container').on('click', '[name="cart"]', function () {

  // 先获取 cookie 存储的数据信息
  const cookieObj = myGetCookie();
  // console.log( cookieObj );
  if (cookieObj.login === undefined) {
    if (window.confirm('您还没有登录,点击确定跳转登录页面')) {
      window.location.href = `./login.html?url=${window.encodeURIComponent(window.location.href)}`;
    }
  } else {
    const goodsObj = JSON.parse(localStorage.getItem('cart'));

    // 根据 goodsObj 获取的数据结果,执行判断
    if (goodsObj === null) {
      msgObj.num = 1;
      msgObj.bool = true;
      localStorage.setItem('cart', JSON.stringify([msgObj]));
    } else {
      let bool = true;

      for (let i = 0; i <= goodsObj.length - 1; i++) {
        if (goodsObj[i].goods_id === msgObj.goods_id) {
          // 有当前商品 给 当前商品id主键值相同的数据 num存储的数值累加1
          goodsObj[i].num++;
          // 变量赋值 false
          bool = false;
          break;
        }
      }

      if (bool) {
        // 如果 bool 是 true 证明 没有id主键值相等的情况 证明 购物车中没有当前商品
        msgObj.num = 1;
        msgObj.bool = true;
        goodsObj.push(msgObj);
        localStorage.setItem('cart', JSON.stringify(goodsObj));

      } else {
        localStorage.setItem('cart', JSON.stringify(goodsObj));
      }
    }
    window.location.href = './cart.html';
  }
})
//放大镜
$('.container').on('mouseenter', '.media-object', (e) => {
  $('.mask').css({display:"block"});
  $('.bigGlass').css({display:"block"});
  //获取鼠标移动的坐标
  $('.container').on('mousemove',(e)=>{
    // console.log($('.mask').css('width'),$('.mask').prop('width'));
    //获取鼠标的位置  将鼠标置于mask的中心
    //offset()返回的是一个对象{top: ,left:} 获取匹配元素在当前document的相对偏移
    let x = parseInt(e.pageX - $('.media-object').offset().left - parseInt($('.mask').css('width'))/2);
    let y = parseInt(e.pageY - $('.media-object').offset().top - parseInt($('.mask').css('height'))/2);
    //设置阈值
    // if(x < parseInt($('.mask').css('width'))/2){
    //     x = parseInt($('.mask').css('width'))/2;
    // }
    x = x < 0 ? 0 : x;
    x = x > $('.media-object').width() /2  ? $('.media-object').width()/2  : x;
      
    y = y < 0 ? 0 : y;
    y = y > $('.media-object').height() / 2 ? $('.media-object').height() / 2 : y;
    
    // console.log(x,y);

    $('.mask').css({top:`${y}px`,left:`${x}px`});
    $('.bigGlass').css({'background-position-x': `${- x * 4}px`,'background-position-y': `${ - y * 4}px`})


    //放大区域
  })

})
$('.container').on('mouseleave', '.media-left', () => {
  $('.mask').css({display:"none"});
  $('.bigGlass').css({display:"none"});
  
})
console.log(urlObj);
