# countdown
一款可配置倒计时名称、结束时间和结束提示信息的倒计时组件

# 使用：
首先，引入countdown.js文件，代码如下：
```
<script src="countdown.js"></script>
```
然后，调用CountDown.init(options,elem)方法即可实现倒计时效果。
CountDown.init(options,elem)方法参数说明如下：
```
options：对象，是配置倒计时的数据，里面的属性名称固定，格式如下：
{
    'title':'倒计时名称',
    'end_time':'结束时间，格式为Date.parse()支持的时间·格式',
    'end_remind':'倒计时结束提示'
}
elem：dom元素，是显示倒计时的dom元素；注意不支持jQuery获取的元素格式。
```
`注意`：本文的倒计时，最多支持倒计时100天，如需支持月、年，可以根据自己的需要添加月、年计算即可。
3、示例
```
<div id="timer"></div>

<script src="countdown.js"></script>
<script>
    CountDown.init({
        title: '距离倒计时结束还有',
        end_time: '2017/08/30 10:20:30',
        end_remind: '本场秒杀结束，等待下一场吧！'
    }, document.getElementById('timer'));
</script>
```

