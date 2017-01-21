var koa = require('koa');
var app = koa();
var qs = require('querystring');

//路由模块配置
var controller = require('koa-route');

//模板渲染模块配置
var views = require('co-views');
var render = views('./view', {
    map: { html: 'ejs' }
});

//静态资源文件模块配置
var koa_static = require('koa-static-server');
app.use(koa_static({
	rootDir:'./static/',
	rootPath: '/static/',
	maxage : 0
}));

var service = require('./service/webAppService');

app.use(controller.get('/route_test', function*() {
    this.set('Cache-Control', 'no-cache')
    this.body = 'Hello koa!';
}));

app.use(controller.get("/ejs_test", function*() {
	//console.log('render: ' + render('ejs_test', {title: 'ejs_test'}));
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('ejs_test', {title: 'ejs_test'});
	// this.body = render('ejs_test', {title: 'ejs_test'});
}));

app.use(controller.get("/api_test", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}));

app.use(controller.get("/api_test_async", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = yield service.get_test_data_async();
}));




//
app.use(controller.get("/ejs_test", function*() {
	//console.log('render: ' + render('ejs_test', {title: 'ejs_test'}));
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('ejs_test', {title: 'ejs_test'});
	// this.body = render('ejs_test', {title: 'ejs_test'});
}));

//以下为前端页面请求处理
app.use(controller.get("/", function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index', {title: '书城首页'});	
}));

app.use(controller.get("/category", function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category', {title: '分类页'});	
}));

app.use(controller.get("/rank", function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank', {title: '排行页'});	
}));

app.use(controller.get("/search", function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search', {title: '搜索页'});	
}));

app.use(controller.get("/book", function*() {
	this.set('Cache-Control', 'no-cache');	
	var params = qs.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	if (!bookId) {
		bookId = '';
	}
	this.body = yield render('book', {nav: '书籍名称'});		
}));


//以下为后端AJAX请求代码
app.use(controller.get("/ajax/index", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

app.use(controller.get("/ajax/rank", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));

app.use(controller.get("/ajax/category", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

app.use(controller.get("/ajax/bookbacket", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_bookbacket_data();
}));

app.use(controller.get("/ajax/channel/female", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_channel_female_data();
}));

app.use(controller.get("/ajax/channel/male", function*() {
	this.set('Cache-Control', 'no-cache');
    this.body = service.get_channel_male_data();
}));

app.use(controller.get("/ajax/book/", function*() {
	this.set('Cache-Control', 'no-cache');	
	var params = qs.parse(this.req._parsedUrl.query);
	var id = params.id;
	if (!id) {
		id = '';
	}
    this.body = service.get_book_data();
}));

app.use(controller.get("/ajax/search", function*() {
	this.set('Cache-Control', 'no-cache');	
	var params = qs.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end =params.end;
	var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
    //this.body = service.get_search_data(start, end, keyword);
}));

app.listen(3000);
console.log("Server listened on port 3000");
