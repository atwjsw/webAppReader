var fs = require('fs');

//获取mock数据
exports.get_test_data = function() {
    var content = fs.readFileSync('./mock/test.json', 'utf-8');
    console.log('read data: ' + content);
    return content;
};

//获取主页数据
exports.get_index_data = function() {
    var content = fs.readFileSync('./mock/home.json', 'utf-8');    
    return content;
};

//获取章节数据
exports.get_chapter_data = function() {
    var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');    
    return content;
};

//获取章节内容
exports.get_chapter_content_data = function(id) {
    if (!id) {
        id="1";
    }
    var content = fs.readFileSync('./mock/reader/data/data' + id +'.json', 'utf-8');    
    return content;
};

//获取排行数据
exports.get_rank_data = function() {
    var content = fs.readFileSync('./mock/rank.json', 'utf-8');    
    return content;
};

//获取分类数据
exports.get_category_data = function() {
    var content = fs.readFileSync('./mock/category.json', 'utf-8');    
    return content;
};

//获取书架数据
exports.get_bookbacket_data = function() {
    var content = fs.readFileSync('./mock/get_bookbacket_data.json', 'utf-8');    
    return content;
};

//获取女生频道数据
exports.get_channel_female_data = function() {
    var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');    
    return content;
};

//获取男生频道数据
exports.get_channel_male_data = function() {
    var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');    
    return content;
};

//获取书内容
exports.get_book_data = function(id) {
	if(!id) {
		id = "18218";
	}

    if  (fs.existsSync('./mock/book/'+ id +'.json')) {
        return fs.readFileSync('./mock/book/'+ id +'.json', 'utf-8');   
    } else {
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');   
    } 
};

//异步方式获取mock数据
exports.get_test_data_async = function() {
	var readfile = function(callback) {
		fs.readFile('./mock/test.json', 'utf8', (err, data) => {
  			if (err) throw err;
  			callback(null, data);
  		});
  	};
  	return readfile;
  };

//获取http接口数据
exports.get_search_data = function(start, end, keyword) {
    // body...
    return function(cb) {
        var http = require('http');
        var qs = require('querystring');
        var data = { s: keyword, start: start, end: end }
        var content = qs.stringify(data);
        var options = {
            host: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content,
            method: 'GET'
        };

        var req = http.request(options, function(res) {
        	var content = '';            
            res.setEncoding('utf8');
            res.on('data', function(chunk) {                
                content += chunk;
            });
            res.on('end', function() {
            	// console.log('res body: ' + content);
            	cb(null, content);
            });
        });

        req.on('error', function(e) {
            console.log("Error in http request: " + e.message);
        });

        req.end();
    };
};
