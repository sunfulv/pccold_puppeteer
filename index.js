const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36");
  await page.setRequestInterception(true);
  page.on('request', request => {
	if(request._url.indexOf('lapi/live/getH5Play')!=-1){
    	// console.log('get play',request._url);
    	request.continue({});
	}else if(request._url.indexOf('douyucdn.cn/live')!=-1){
		console.log(request._url);
	}else{
	    request.continue({});
	}
});
  await page.goto('https://douyu.com/20360');//room config
  await browser.close();
})();