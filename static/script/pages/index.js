// 连通前端界面与后端接口的代码
$.get('/ajax/index', function(d) {
    var windowWidth = $(window).width();    
    if (windowWidth < 320) {
        windowWidth = 320;
    }
    var offset = $($('.Swipe-tab').find('a')[0]).offset();
    var index_header_tab_width = offset.width;    
    console.log(d.items[6].data.data);
    new Vue({
        // 界定作用域
        el: '#app',
        // 界面渲染数据 
        data: {
            screen_width: windowWidth,
            double_screen_width: windowWidth*2,
            index_header_tab_width: index_header_tab_width,
            top: d.items[0].data.data,
            hot: d.items[1].data.data,
            recommend: d.items[2].data.data,
            female: d.items[3].data.data,
            male: d.items[4].data.data,
            free: d.items[5].data.data,
            topic: d.items[6].data.data,
            duration: 0,
            position: 0,
            header_position: 0,
            header_duration: 0,
            tab_1_class: 'Swipe-tab__on',
            tab_2_class: '',
        },
        methods: {
            tabSwitch: function(pos) {
            	this.duration = 0.5;
            	this.header_duration = 0.5;
            	if(pos=== 0) {
            		this.tab_1_class = 'Swipe-tab__on';
            		this.tab_2_class =  '';
            		this.header_position = 0;
            		this.position = 0;
            	} else {
            		this.tab_2_class = 'Swipe-tab__on';
            		this.tab_1_class =  '';
            		this.header_position = index_header_tab_width;
            		this.position = - windowWidth;
            	}
            }
        }

    });
}, 'json');
