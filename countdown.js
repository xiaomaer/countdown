/**
 * Created by xiaoma on 2017/6/27.
 */
//倒计时组件，最大支持99天
var CountDown = {
    /**
     *  倒计时组件，可配置倒计时名称、结束时间和倒计时结束提示信息。
     * @param options：object，{'title':'倒计时名称','end_time':'结束时间，格式为Date.parse()支持的时间格式','end_remind':'倒计时结束提示'}
     * @param elem：dom元素
     */
    init: function (options, elem) {
        this.options = options;
        this.elem = elem;
        this.interval = 0;
        elem.innerHTML = '<div class="time_countdown">' +
            '<div class="time_title"><span>' + options.title + '</span></div>' +
            '<div class="time_counter theme_one">' +
            '</div></div>';
        this.renderTimer();
    },
    //计算倒计时剩余时间
    handleTimer: function () {
        var endTimeMilliseconds = Date.parse(this.options.end_time),
            currTimeMilliseconds = Date.now(),
            dis = Math.round((endTimeMilliseconds - currTimeMilliseconds) / 1000),
            timer = {
                day: '00',
                hour: '00',
                minute: '00',
                second: '00',
                interval: '0'
            };
        if (dis > 0) {
            //计算倒计时数据
            timer.interval = ++this.interval;
            timer.second = this.checkZero(dis % 60);
            timer.minute = parseInt((dis / 60)) > 0 ? this.checkZero(parseInt((dis / 60)) % 60) : "00";
            timer.hour = parseInt((dis / 3600)) > 0 ? this.checkZero(parseInt((dis / 3600)) % 24) : "00";
            timer.day = parseInt((dis / 86400)) > 0 ? this.checkZero(parseInt(dis / 86400)) : "00";//最大99天
            if (timer.interval === 10) {
                timer.interval = 0;
                this.interval = 0;
            }
            return timer;
        } else {
            return false;
        }
    },
    //根据剩余时间，重新渲染倒计时
    renderTimer: function () {
        var that = this,
            timer = that.handleTimer();
        if (timer) {
            //重新渲染倒计时
            var seconds = timer.second.split(''),
                minute = timer.minute.split(''),
                hour = timer.hour.split(''),
                day = timer.day.split('');
            this.elem.querySelector('.time_counter').innerHTML =
                '<span>' + day[0] + '</span><span>' + day[1] + '</span> 天 ' +
                '<span>' + hour[0] + '</span><span>' + hour[1] + '</span> 时 ' +
                '<span>' + minute[0] + '</span><span>' + minute[1] + '</span> 分 ' +
                '<span>' + seconds[0] + '</span><span>' + seconds[1] + '</span> 秒 ' +
                '<span class="msec">' + timer.interval + '</span>';
        } else {
            //显示倒计时结束信息，并停止定时
            this.elem.querySelector('.time_counter').innerHTML = this.options.end_remind;
            clearTimeout(this.timerOutID);
        }
        this.timerOutID = setTimeout(that.renderTimer.bind(that), 100);//修改作用域——bind()
    },
    //验证时间是否为0，并对小于10的数据进行处理
    checkZero: function (param) {
        var num = parseInt(param);
        if (param > 0) {
            return param > 9 ? num.toString() : '0' + num;
        } else {
            return "00"
        }
    }
};

//倒计时模块，最大支持99天
var timer = (function () {
    var i = 0, timerID,
        timer = {
            day: '00',
            hour: '00',
            minute: '00',
            second: '00',
            interval: '0'
        };
    //验证时间是否为0，不为0时，小于10的数字处理
    function checkZero(param) {
        var num = parseInt(param);
        if (param > 0) {
            return param > 9 ? num.toString() : '0' + num;
        } else {
            return "00"
        }
    }

    /**
     *  倒计时计算，并渲染
     * @param options：object，{'title':'倒计时名称','end_time':'结束时间，格式为Date.parse()支持的格式','end_remind':'倒计时结束提示'}
     * @param elem：dom元素
     */
    function countdown(options, elem) {
        var endTimeMilliseconds = Date.parse(options.end_time),
            currTimeMilliseconds = Date.now(),
            dis = Math.round((endTimeMilliseconds - currTimeMilliseconds) / 1000);
        if (dis > 0) {
            //计算倒计时数据
            timer.interval = ++i;
            timer.second = checkZero(dis % 60);
            timer.minute = parseInt((dis / 60)) > 0 ? checkZero(parseInt((dis / 60)) % 60) : "00";
            timer.hour = parseInt((dis / 3600)) > 0 ? checkZero(parseInt((dis / 3600)) % 24) : "00";
            timer.day = parseInt((dis / 86400)) > 0 ? checkZero(parseInt(dis / 86400)) : "00";//最大99天
            if (timer.interval === 10) {
                timer.interval = 0;
                i = 0;
            }
            var seconds = timer.second.split(''),
                minute = timer.minute.split(''),
                hour = timer.hour.split(''),
                day = timer.day.split('');//最大99天
            elem.innerHTML = '<div class="time_countdown">' +
                '<div class="time_title"><span>' + options.title + '</span></div>' +
                '<div class="time_counter theme_one">' +
                '<span>' + day[0] + '</span><span>' + day[1] + '</span> 天 ' +
                '<span>' + hour[0] + '</span><span>' + hour[1] + '</span> 时 ' +
                '<span>' + minute[0] + '</span><span>' + minute[1] + '</span> 分 ' +
                '<span>' + seconds[0] + '</span><span>' + seconds[1] + '</span> 秒 ' +
                '<span class="msec">' + timer.interval + '</span>' +
                '</div></div>';
        } else {
            //显示倒计时结束信息，并停止定时
            elem.innerHTML = '<div class="time_countdown">' +
                '<div class="time_title"><span>' + options.title + '</span></div>' +
                '<div class="time_counter theme_one" id="time_counter">' + options.end_remind +
                '</div></div>';
            clearInterval(timerID);
        }
        timerID = setTimeout(countdown, 100, options, elem);
    }

    return countdown;
})();