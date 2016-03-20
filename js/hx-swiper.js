+function ($) {
    'use strict';

    // hxswiper CLASS DEFINITION
    // ======================

    var HxSwiper = function (el, options) {
        this.$el=$(el)
        this.options = $.extend({}, HxSwiper.DEFAULTS, options)

    }

    HxSwiper.VERSION = '1.0.0'

    HxSwiper.DEFAULTS = {

    }

    HxSwiper.prototype.swiper= function () {
        var that=this,
            startPos,
            endPos,
            index = 0,
            isScrolling,
            slider = that.$el[0];
        var start = function (event) {
            var touch = event.targetTouches[0]; //touches�����������Ļ�����е�touch��ȡ��һ��touch
            startPos = {x: touch.pageX, y: touch.pageY, time: +new Date}; //ȡ��һ��touch������ֵ
            slider.addEventListener('touchmove', move, false);
            slider.addEventListener('touchend', end, false);
        };
        var move = function (event) {
//����Ļ�ж��touch����ҳ�汻���Ź����Ͳ�ִ��move����
            if (event.targetTouches.length > 1 || event.scale && event.scale !== 1)return;

            var touch = event.targetTouches[0];
            endPos = {x: touch.pageX - startPos.x, y: touch.pageY - startPos.y};
            isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;//isScrollingΪ1ʱ����ʾ���򻬶���0Ϊ���򻬶�
            if (isScrolling === 0) {
                event.preventDefault();
            }
        };
        var end = function (event) {
            var duration = +new Date - startPos.time; //�����ĳ���ʱ��
            if (isScrolling === 0) { //��Ϊˮƽ����ʱ
                if (Number(duration) > 20 && Math.abs(endPos.x) > 80) {
//�ж������ƻ������ƣ���ƫ��������20ʱִ��
                    /*if (endPos.x > 80) {
                        if (index !== 0) index -= 1;
                    } else if (endPos.x < -80) {
                        if (index !== optional.num - 1) index += 1;
                    }*/

                    //$("#" + optional.tabId).children().eq(index).children("a").trigger("click");
                    that.$el.trigger('swiperHorizontal.hx.swiper')
                }
            }
            startPos=endPos=isScrolling=undefined;
//����¼�
            slider.removeEventListener('touchmove', move);
            slider.removeEventListener('touchend', end);
        };

        var touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        if (!!touch)
            slider.addEventListener('touchstart', start);
    }

    // hxswiper PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('hx.swiper')
            var options = typeof option == 'object' && option

            if (!data) $this.data('hx.swiper', (data = new HxSwiper(this, options)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.hxswiper

    $.fn.hxswiper = Plugin
    $.fn.hxswiper.Constructor = HxNumber


    // hxswiper NO CONFLICT
    // =================

    $.fn.hxswiper.noConflict = function () {
        $.fn.hxswiper = old
        return this
    }


    // hx-swiper DATA-API
    // ==============

}(jQuery);