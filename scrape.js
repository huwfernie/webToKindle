const fs = require('fs');
const request = require('request');		// to load the target website
const cheerio = require('cheerio');		// to scrape/parse the result
var temp = [];

function scrapeAllBlogs(url,selectorBlog,selectorNext,numberOfBlogs) {
  temp=[];
  console.log('scrapeAllBlogs');
  return new Promise((resolve, reject)=>{
    const i=0;
    loop(url,selectorBlog,selectorNext,i);
    function loop(url,selectorBlog,selectorNext,i) {
      scrapeOneBlog(url,selectorBlog,selectorNext,i).then((nextBlogUrl)=> {
        i++;
        if(i >= numberOfBlogs) {
          console.log('total blog limit reached');
          saveBlog(temp).then(()=>{
            saveNcx(temp).then(()=>{
              resolve();
            });
          });
        } else if(!nextBlogUrl) { // run this if there is no "next-blog"
          console.log('no \'next blog url\' found');
          saveBlog(temp).then(()=>{
            saveNcx(temp).then(()=>{
              resolve();
            });
          });
        } else { // run the loop again to get another blog
          loop(nextBlogUrl,selectorBlog,selectorNext,i);
        }
      });
    }
  });
}


function scrapeOneBlog(url,selectorBlog,selectorNext,i) {
  console.log('scrapeOneBlog - ',url);
  return new Promise((resolve, reject)=>{
    request(url, function(err, resp, body){
      if(err) {
        reject(err);
      } else {
        const liveData = cheerio.load(body);
        //liveData(--css selector here--).html();
        const snippet = liveData(selectorBlog).html();
        const title = liveData('title').html();
        console.log('title',title);
        let nextBlogAddress = liveData(selectorNext).html();
        nextBlogAddress = nextBlogAddress.split(/<a href="/)[1].split(/" /)[0];
        console.log('scrapeOneBlog -- success - trying to get ',nextBlogAddress);
        combineFile(title,snippet,url,i).then(()=>{
          resolve(nextBlogAddress);
        });
      }
    });
  });
}

function combineFile(title,snippet,url,i) {
  return new Promise((resolve, reject)=>{
    const thisBlog = new Object();
    thisBlog.title = title;
    thisBlog.body = snippet;
    thisBlog.url = url;
    thisBlog.number = i+1;
    temp.push(thisBlog);
    resolve();
  });
}

function saveBlog(temp) {
  console.log('saveFile');
  console.log('temp looks like this now',temp);
  return new Promise((resolve, reject)=>{
    const template = fs.readFileSync('template/index.html');
    const $ = cheerio.load(template);
    let snippet = $('html').html();
    temp.forEach((blog)=>{
      const prefix = `\n<!-- Start of snippet from ${blog.url} -->`;
      const suffix = `<div class="pagebreak"></div>\n<!-- End of snippet from ${blog.url} -->`;
      $('#toc ul').append(`    <li><a href="#ch${blog.number}">${blog.title}</a></li>\n`);
      $('.main').append(`${prefix}\n<h2 id="ch${blog.number}">${blog.number} : ${blog.title}</h2>\n${blog.body}\n${suffix}\n\n`);
      snippet = $('html').html();
    });
    saveBlogEnd(snippet).then(() => {
      resolve();
    });
  });
}
function saveBlogEnd(file) {
  return new Promise((resolve, reject)=>{
    //cheerio gets rid of the <html> tag, so we replace it with a prefix and suffix here.
    const prefix = '<!doctype html>\n<html lang="en">';
    const suffix = '</html>';
    fs.writeFile('output/index.html', `${prefix}\n${file}\n${suffix}\n`, function (err) {
      if (err) throw err;
      else {
        console.log('Saved! - ');
        resolve();
      }
    });
  });
}

function saveNcx(temp) {
  console.log('saveNCX');
  return new Promise((resolve, reject)=>{
    const template = fs.readFileSync('template/index.ncx');
    // const $ = cheerio.load(template);
    // let snippet = $.html();
    let snippet = template.toString();
    console.log('snippet: ',snippet);
    const array = snippet.split('-replace-');
    temp.forEach((blog)=>{
      array[0] = array[0] + `\t\t<navPoint id="${blog.number+1}" playOrder="${blog.number+1}">\n				<navLabel>\n					<text>\n						${blog.title}\n					</text>\n				</navLabel>\n				<content src="index.html#ch${blog.number}" />\n			</navPoint>\n`;
    });
    snippet = array[0] + array[1];
    saveNcxEnd(snippet,'output/index.ncx').then(() => {
      resolve();
    });
  });
}
function saveNcxEnd(file,filename) {
  return new Promise((resolve, reject)=>{
    // const prefix = `<?xml version="1.0"?>\n<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN"\n"http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">\n<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n<head>\n</head>\n  <docTitle>\n    <text>Book title</text>\n  </docTitle>\n  <navMap>\n    <navPoint id="toc" playOrder="1">\n      <navLabel>\n        <text>\n          Table of Contents\n        </text>\n      </navLabel>\n    <content src="indexToc.html#toc" />\n  </navPoint>`;
    // const suffix = '  </navMap>\n</ncx>';
    fs.appendFile(filename, `\n${file}\n`, function (err) {
      if (err) throw err;
      else {
        console.log('Saved! - ');
        resolve();
      }
    });
  });
}

module.exports.scrapeAllBlogs = scrapeAllBlogs;
