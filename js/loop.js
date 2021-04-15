//大的图
const loopcUl = document.querySelector('.loopc>ul');

const loopc = document.querySelector('.loopc');
const loopcl = document.querySelector('.loopcl');
let str = '';
for(let i = 0;i<=7;i++){
    str+=
        i===0  ? ` <img class="actor" src="../image/${i+1}.jpg">` : `<img src="../image/${i+1}.jpg">
        `;
}
loopcl.innerHTML = str;
let str1 = '';
for(var i = 0;i<=7;i++){
    str1+=
        i===0 ? `<li class="activess" index="${i}"></li>` : `<li index="${i}"></li>`
    ;
}
loopcUl.innerHTML = str1;

//获取小红点
const loopLi = document.querySelectorAll('.loopc>ul>li');
//获取图片数组
const loopImg = document.querySelectorAll('.loopcl>img');
//设置起始位置 和 定时器
let start = 0;
let time;
//小图
let small;
let smallnub = 0;

clickdot();
autoloop();
mouseMove()

function clearC(){
    loopLi.forEach(item=>{
        item.classList.remove('activess');
    })
    loopLi[start].classList.add('activess');
    loopImg.forEach(item=>{
        item.classList.remove('actor');
    })
    loopImg[start].classList.add('actor'); 
}
//点击小红点效果和左右切换
function clickdot(){
    loopc.addEventListener('click',e=>{
        if(e.target.tagName === 'LI'){
            console.log(e.target.getAttribute('index')-0);
            loopLi.forEach(item=>{
                item.classList.remove('activess');
            })
            loopLi[e.target.getAttribute('index')-0].classList.add('activess');
            loopImg.forEach(item=>{
                item.classList.remove('actor');
            })
            loopImg[e.target.getAttribute('index')-0].classList.add('actor');  
            start = e.target.getAttribute('index')-0;
        }
        if(e.target.getAttribute('name') === 'zz'){
            start--;
            if(start===-1) start=loopImg.length-1;
            clearC();
        }
        if(e.target.getAttribute('name') === 'yy'){
            start++;
            if(start===8) start=0;
            clearC();
        }
    })
}
//小图左右键
$('.loopr').on('click',(e)=>{
    if(e.target.className === 'smallz'){
        console.log(123);
        smallnub--;
        if(smallnub===-1) smallnub=2;
        $('.loopr>div').each((key,item)=>{
            item.classList.remove('activeSmall');
        })
        $('.loopr>div')[smallnub].classList.add('activeSmall');
    }
    if(e.target.className === 'smally'){
        smallnub++;
        if(smallnub===3) smallnub=0;
        $('.loopr>div').each((key,item)=>{
            item.classList.remove('activeSmall');
        })
        $('.loopr>div')[smallnub].classList.add('activeSmall');
    }
})

//小图

smallLoop();

function smallLoop(){
    small=setInterval(()=>{
        $('.loopr>div').each((key,item)=>{
            item.classList.remove('activeSmall');
        })
        $('.loopr>div')[smallnub].classList.add('activeSmall');
        smallnub++;
        if(smallnub === 3){
            smallnub = 0;
        }
    },2000)
}
//自动轮播
function autoloop(){
    time = setInterval(function(){
        if(start === loopImg.length-1){
            //从第一张开始
            start=-1;
        }
        start++;
        loopImg.forEach(item=>{
            item.classList.remove('actor');
        })
        loopImg[start].classList.add('actor');
        followDot();
        // console.log(start);
    },2000)
}
//红点更随
function followDot(){
    loopLi.forEach(item=>{
        item.classList.remove('activess');
    })
    loopLi[start].classList.add('activess');
}
//鼠标移入移出
function mouseMove(){
    loopc.addEventListener('mouseenter',function(){
        clearInterval(time);
    })
    loopc.addEventListener('mouseleave',function(){
        autoloop();
    })

    $('.loopr').on('mouseenter',function(){
        clearInterval(small);
    })
    $('.loopr').on('mouseleave',function(){
        smallLoop();
    })

}


