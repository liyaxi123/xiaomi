$(function () {
    var index = 1;
    $('.direct-right').click(function () {

        if (index == 5) {
            index = 0;
        }
        if (!$('.menu-photo-totol').is(':animated')) {
            ++index
            $('.menu-dot :nth-child(' + index + ')').addClass('white').siblings().removeClass('white')
            $('.menu-photo-totol').animate({
                'left': '-=1200px'
            }, 1000, function () {
                var lef = parseInt($('.menu-photo-totol').css('left'));
                if (lef === -6000) {
                    $('.menu-photo-totol').css({
                        'left': '0'
                    })
                }
            })

        }
    })
    $('.direct-left').click(function () {
        var lef = parseInt($('.menu-photo-totol').css('left'));
        if (!$('.menu-photo-totol').is(':animated')) {
            if (lef == 0) {
                index = 5
                $('.menu-photo-totol').css({
                    'left': '-6000px'
                })
                $('.menu-photo-totol').animate({
                    'left': '+=1200px'
                }, 1000)
            } else {
                --index
                $('.menu-photo-totol').animate({
                    'left': '+=1200px'
                }, 1000)
            }
            $('.menu-dot :nth-child(' + index + ')').addClass('white').siblings().removeClass('white')
        }
    });

    var timer = null;
    timer = setInterval(function () {
        $('.direct-right').click()
    }, 2000)

    $('.menu-side').hover(function () {
        if (timer) {
            clearInterval(timer)
        }
    }, function () {
        timer = setInterval(function () {
            $('.direct-right').click()
        }, 2000)
    })
})
//指示点与图片实现联动
$('.menu-dot span').click(function () {
    $this = $(this);
    $this.addClass('white').siblings().removeClass('white')
    $index = $this.index();

    $('.menu-photo-totol').css({
        'left': -$index * 1200 + 'px'
    })
});
//下载app逻辑
$('.nav-left').find('.app').hover(function () {

    $('.trangle').css({
        'display': 'block'
    });
    $('.erweima').css({
        'display': 'block'
    })
    console.log(111)
}, function () {
    $('.trangle').css({
        'display': 'none'
    });
    $('.erweima').css({
        'display': 'none'
    })
});
//购物车模块显示逻辑
$('.nav-right').children('.shopcar').hover(function () {
    $this = $(this);
    $this.find('a,span').css({
        'color': 'red'
    })
    $this.css({
        'background-color': 'white',
        'color': 'red'
    })
    var $divs = $('<div class="shop_thing">空空如也~</div>');
    $divs.prependTo($this);
}, function () {
    $this.find('a,span').css({
        'color': '#999'
    });
    $this.css({
        'background-color': 'black',
        'color': '#bbb'
    });
    $('.shop_thing').remove()
});
//菜单导航栏div动态生成

//小米闪购
$(function () {
    //获取当前整点时间的函数
    function getFullHour() {
        var mydate = new Date();
        var h = addZero(mydate.getHours());
        var m = mydate.getMinutes();
        var s = addZero(mydate.getSeconds());
        if (m > 0) {
            ++h;
            if (h == 24) {
                h = 0;
            }
        }
        var t = setTimeout(function () {
            getFullHour()
        }, 60000);
        $('.time-start').find('.time').text(h + ':00');
    }
    getFullHour()
    //在单数面前加零
    function addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i
    };
    //距离活动结束时间
    function duringTime() {
        var ltime = new Date();
        var h = ltime.getHours();
        var m = ltime.getMinutes();
        var s = ltime.getSeconds();
        var ftime = $('.time-start').find('.time').text();
        //    var ftime_int = parseInt(ftime.substring(0,2))
        var time_new = 3600
        var shengyu = time_new - (m * 60) - s;

        var m_new = addZero(parseInt(shengyu / 60))
        var s_new = addZero(shengyu - m_new * 60)
        $('.time-end .hour').text('00');
        $('.time-end .minute').text(m_new);
        $('.time-end .second').text(s_new);

        var mer = setTimeout(function () {
            duringTime()
        }, 1000)

    }
    duringTime();
});
//搜索框搜索时间
$('.menu-search-button').click(function () {
    var value = $('.menu-serach-content').val();
    if (value == '') {
        return
    } else {
        window.location.href = './list.html?key=' + value;
    }
});
$('.menu-serach-content').val(tool.getParam('key'))
$('.woqu').hover(function () {
    $('.people_phone').css({
        'display': 'block'
    })
}, function () {
    $('.people_phone').css({
        'display': 'none'
    })
})
$(function () {

    var data = {
        list: [{
                'img': 'img/3G.png',
                'dec': '小米路由',
                'price': 99
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由1',
                'price': 98
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由2',
                'price': 97
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由3',
                'price': 96
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由4',
                'price': 95
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由5',
                'price': 94
            },
        ]
    }
    //定义模板
    var hml = '<ul>{{#list}}<li><a href="#"><img src="{{img}}" alt="图片"></a><p>{{dec}}</p><p class="price">{{price}}元</p></li>{{/list}}</ul>'
    //渲染模板
    var template = Hogan.compile(hml)
    //渲染数据
    var result = template.render(data)
    //菜单显示逻辑处理
    $('.menu-middle span').hover(function () {
        var $this = $(this)
        $this.append('<div class="menu-middle-content"></div>')
        if (!$('.menu-middle-content').is(':animated')) {
            $('.menu-middle-content')
                .stop(true)
                .animate({
                    'height': '300px'
                }, 1000, function () {
                    $('.menu-middle-content').css({
                        'box-shadow': '1px 0px 2px grey'
                    })
                }).html(result);
        }
    }, function () {
        $('.menu-middle-content').remove();
    })

});
//左侧菜单实现逻辑
$(function () {
    $('.menu-side .menu-parent .meun-item').hover(function () {
        var $this = $(this);
        $this.children('.menu-item-child').css({
            'display': 'block'
        })
    }, function () {
        var $this = $(this);
        $this.children('.menu-item-child').css({
            'display': 'none'
        })
    })
})
//左右箭头控制图片滑动和明暗，小米闪购
$(function () {
    var index = 1;
    var num = Math.floor($('.quickshop-content .baoguo li').length / 4);
    console.log(num)
    var wid = $('.quickshop-content .baoguo').width();
    $('.quick-control .pre-quick').click(function () {
        if (index == 1) {

            return;
        } else if (index == 2) {
            $('.quick-control .pre-quick').css({
                'color': '#00000033'
            })
            $('.quickshop-content .baoguo .quick-parent').animate({
                'left': "+=" + wid + 'px'
            }, function () {
                --index
            })
        } else {
            $('.quickshop-content .baoguo .quick-parent').animate({
                'left': "+=" + wid + 'px'
            }, function () {
                --index
                $('.quick-control .next-quick').css({
                    'color': 'black'
                })

            })

        }


    });
    $('.quick-control .next-quick').click(function () {

        if (index > num) {

            return;
        } else if (index == num) {

            $('.quick-control .next-quick').css({
                'color': '#00000033'
            })
            $('.quickshop-content .baoguo .quick-parent').animate({
                'left': "-=" + wid + 'px'
            }, function () {
                ++index

            })
        } else {
            $('.quick-control .pre-quick').css({
                'color': 'black'
            })
            $('.quickshop-content .baoguo .quick-parent').animate({
                'left': "-=" + wid + 'px'
            }, function () {
                ++index

            })
        }



    })
})

//智能模块逻辑
$(function () {
    $('.quickshop.smart').find('.quick-control>span').click(function () {
        var $index = $(this).index();
        console.log($index)
        var $obj = $('.quickshop.smart .quickshop-content>ul:eq(' + $index + ')');
        if ($obj.hasClass('smart-active')) {
            return;
        } else {
            $obj.addClass('smart-active').siblings().removeClass('smart-active')
        }
    })
})


//小轮播图逻辑
$(function () {
    $('.quick-parent.content-x .quick-item').hover(function () {
        var $this = $(this);
        $(this).children('.left').css({
            'display': 'block'
        })
        $(this).children('.right').css({
            'display': 'block'
        })
    }, function () {
        $(this).children('.right').css({
            'display': 'none'
        })
        $(this).children('.left').css({
            'display': 'none'
        })
    })
    var index = 1;
    $('.quick-item .right').click(function () {
        var lef = parseInt($('.biaoji').css('left'));
        if (lef === -288) {
            return;
        }
        if (!$('.biaoji').is(':animated')) {
            ++index
            $('.quick-item .dot :nth-child(' + index + ')').addClass('white').siblings().removeClass('white')
            $('.biaoji').animate({
                'left': '-=288px'
            }, 1000)

        }
    })
    $('.quick-item .left').click(function () {
        var lef = parseInt($('.biaoji').css('left'));
        if (!$('.biaoji').is(':animated')) {
            if (lef == 0) {
                return;
            } else {
                --index
                $('.biaoji').animate({
                    'left': '+=288px'
                }, 1000)
                $('.quick-item .dot :nth-child(' + index + ')').addClass('white').siblings().removeClass('white')
            }
        }
    });

})
//文字滚动特效
$(function () {
    var t = null;
    var b = null

    function scrollText() {

        t = setInterval(function () {
            var s = $('.text-s').scrollTop();
            $('.text-s').scrollTop(s + 1);
            if ((($('.text-s').scrollTop()) % 80) == 0) {
                // clearInterval(t)
                // t = null
                //   b=setTimeout(function () { scrollText() }, 1000)
            }
            if ($('.text-s').scrollTop() == 560) {
                $('.text-s').scrollTop(0)
            }
        }, 20)

    };
    scrollText();
    $('.quick-item.text-s').mouseover(function () {

            clearInterval(t)

        }

    )
    $('.quick-item.text-s').mouseout(function () {
        scrollText();
    })
})
//翻转逻辑
$(function () {
    $(".img-box").hover(function () { //鼠标移动的function
        $(this).css("transform", "rotateY(180deg)"); //鼠标移上去旋转180度

        $(".font").css("display", "block"); //让back显示出来
        $(".back").hide(); //隐藏front
    }, function () {
        $(this).css("transform", "rotateY(0deg)"); //鼠标移开让旋转度数归零

        $(".back").css("display", "block");
        $(".font").hide();
    });

    //返回顶部
    $(window).scroll(function () {
        var ch = $(window).scrollTop(); //滚动高度

        if (ch > 0) {
            $('.gotop').css({
                'display': 'block'
            })
        } else {
            $('.gotop').css({
                'display': 'none'
            })
        }

    })
    $('.gotop').click(function () {
        $(window).scrollTop(0);
    })
    $(window).scroll();
})
//登录界面遮罩实现，以及登录逻辑处理
$(function () {
    //遮罩成出现
    $('.nav-item.login').click(function () {
        $('.zhezhao').css({
            'display': 'block'
        });
    })
    //
    $('.zhezhao').click(function (e) {
        if (e.target.className != 'zhezhao') {
            return;
        } else {
            $('.zhezhao').css({
                'display': 'none'
            });
        }

    })
});
// localstorage存储登录信息
$(function(){
    var username=localStorage.getItem('username');
   if(username){
       
      $('.login .one').css({'display':'none'});
      $('.login .two').css({'display':'inline-block'})
      $('.login .two .username').text(username)
   }
    
})
