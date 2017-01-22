// 连通前端界面与后端接口的代码
var id = location.href.split('?id=').pop();
var windowWidth = $(window).width();
if (windowWidth < 320) {
    windowWidth = 320;
}
$.get('/ajax/book?id=' + id, function(d) {
    d.screen_width = windowWidth;
    new Vue({
        // 界定作用域
        el: '#app',
        // 界面渲染数据 
        data: d,
        methods: {
            readBook: function() {
                location.href = "/reader";
            }
        }
    });
}, 'json');
