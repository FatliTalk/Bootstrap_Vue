// Vue.js
var vm = new Vue({
    el: "#app",
    data: {
        newMessage: '',
        oldTasks: [
            {name: "阅读《人类简史》", todo: true, show: true},
            {name: "思考古罗马城是如何建成的", todo: true, show: true},
        ]
    },
    methods: {
        addTask: function(message) {
            if (message=="") {
                alert("请不要添加空任务");
            }
            else {
                this.oldTasks.push({name: message, todo: true, show: true});
            }
        },
        // 计时器
        // 以下倒计时仍然存在问题：移动设备离开页面较长时间导致倒计时出错
        startTimer: function (duration, display) {
            var start = Date.now(),
                diff, //时差
                minutes,
                seconds;
            var __timer;
            function timer() {
                // 剩余时长 = 倒计时设置的时长 - 过去start到现在的时长，单位：秒，
                // startTimer() 函数被调用
                diff = duration - (((Date.now() - start) / 1000) | 0);

                // “| 0”是去掉小数部分取整操作。与parseInt做同样的工作：截断浮动float
                minutes = (diff / 60) | 0;
                seconds = (diff % 60) | 0;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds; 

                if (diff <= 0) {
                    // 时差<=0时，增加一秒钟（1000毫秒），以便在整个持续时间内开始倒计时
                    // 例如 05:00 而非 04:59
                    start = Date.now() + 1000;
                }
                if (--minutes < 0 && --seconds < 0) {
                    // 取消由setInterval()函数设定的定时执行操作
                    // clearInterval(id_of_setinterval) ，参数为：调用setInterval()函数时所获得的返回值
                    clearInterval(__timer);
                }
            }
            // setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式
            // setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
            __timer = setInterval(timer, 1000);
        },

        // 开始番茄
        go: function() {
            // 点击事件：开始番茄（待完善：点击事件，防止重复触发）
            // 显示剩余时间
            var tenSeconds = 60 * (1 / 6);
            var display = document.querySelector('#time');
            // 使用 this 调用上面的 startTimer 属性
            this.startTimer(tenSeconds, display);

            // 动态百分比进度条(待完善：将进度条与上面计时器联系起来)
            var barPercent = document.getElementById("barPercent");
            var width = 0;
            var id;
            function frame() {
                // 不能保证正确运行：进度条可能在离开页面或在移动设备上因为电源管理原因而暂停
                // if (width == 100) {
                if (display.textContent === '00:00' ) {
                    alert("恭喜你完成了一个番茄钟！休息5分钟吧");
                    display.textContent = "开始番茄";
                    clearInterval(id);
                    barPercent.style.width = 0 + '%';
                } else {
                    // 不能保证正确运行：进度条可能在离开页面或在移动设备上因为电源管理原因而暂停
                    // width++; // 调用该函数一次进 1%
                    width++;
                    barPercent.style.width = width + '%';
                }
            }
            // 1500秒（25分钟）÷100份=15秒调用一次frame函数
            // 10秒÷100份=0.1秒（100毫秒）调用一次frame函数
            id = setInterval(frame, 100);
        },
    }
})
