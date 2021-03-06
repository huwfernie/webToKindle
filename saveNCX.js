//this file is for testing only, the functions here are also in scrape.js

const fs = require('fs');
const request = require('request');		// to load the target website
const cheerio = require('cheerio');		// to scrape/parse the result
let blogNumber = 0;


let temp = [ { title: 'Meet Mr. Money Mustache',
body: '\n<p><em><a href="http://www.mrmoneymustache.com/wp-content/uploads/2011/04/mmm.jpg"><img class="alignleft size-thumbnail wp-image-3101" style="border: 1px solid black; margin-left: 10px; margin-right: 10px;" title="mmm" src="http://www.mrmoneymustache.com/wp-content/uploads/2011/04/mmm-135x180.jpg" alt="" width="135" height="180" srcset="http://www.mrmoneymustache.com/wp-content/uploads/2011/04/mmm-135x180.jpg 135w, http://www.mrmoneymustache.com/wp-content/uploads/2011/04/mmm-225x300.jpg 225w, http://www.mrmoneymustache.com/wp-content/uploads/2011/04/mmm-768x1024.jpg 768w" sizes="(max-width: 135px) 100vw, 135px"></a>“What do you mean you retired at 30?”</em></p>\n<p>This is a blog about money. We’re going to cover a lot of ground and make plenty of amusing side trips into lifestyle and culture issues, but when it boils down to it, we are talking about money, and the freedom it can give you. Freedom from worry, and freedom from most forms of bullshit. And the best way to illustrate such freedom is to have an opinionated but wise role model guide you through your daily life from this point onwards. That role model is ME, Mr. Money Mustache.</p>\n<p>I’m going to teach you a radical new way to think about and enjoy money that will get you off of your current debt-powered treadmill and into a lifestyle that is completely unimaginable to most people where I live, which happens to be in the United States, ground zero for self-imposed treadmills.</p>\n<p>Once you are off the mill, you’ll feel like Neo did when he unplugged the suction cups from his pale naked body in The Matrix and looked around at the other imprisoned humans. “Holy Shit!”, you will say. “I’ve been living in this ridiculous slave world and never noticed.. and everyone else still is! <em><strong>WAKE UP DRONE PEOPLE!!!</strong></em>“.</p>\n<p>You will suddenly be able to fly freely through the world, free from having to work for a living, able to start living life as you choose, doing exotic things like spending time raising your young children, taking a 3-week vacation each month, or just enjoying understated shows of leisure like sweeping your driveway in pajamas at 11am on a sunny Thursday morning.</p>\n<p>Let’s talk about YOU first. If you are one of the 99% of working people I hear and read about every day, you are in a bad place right now. Young folks today seem to live somewhere on a Spectrum of Financial Idiocy.</p>\n<p>” I am…</p>\n<ol>\n<li>Retired, and my money situation is perfect</li>\n<li>Still working, saving max in 401k, no loans on cars or credit cards, paying regular mortgage payments</li>\n<li>Same as above but add one or more <strong>car loans</strong></li>\n<li>Same as above but<strong> not quite able to max out 401k plans</strong> due to life’s little expenses</li>\n<li>Same as above but have a few <strong>credit cards</strong> that I’m making payments on</li>\n<li><strong>Can’t always make all my payments</strong>, got some bad marks on my credit score.. I’d be screwed if I lose my job now</li>\n<li>Everything has collapsed – losing my house and possessions, can’t find work, debt is more than I can pay off in a lifetime, <strong>why is the world so cruel to me!?</strong></li>\n</ol>\n<p>So your goal is to move up this spectrum. Everyone can do it. But most people think they can’t because they’re still stuck in the Matrix. They blame “the economy” or other bullshit external factors, when really the only problem is they aren’t listening hard enough to Mr. Money Mustache. Become a regular reader of this blog and you’ll move up fast. See you at #1.</p>\n\t\t\t\t',
url: 'http://www.mrmoneymustache.com/2011/04/06/meet-mr-money-mustache/',
number: 1 },
{ title: 'Meet the Realist',
body: '\n<p><a href="http://www.mrmoneymustache.com/wp-content/uploads/2011/04/The-Realist-is-a-Family-Man.jpg" target="_blank"><img class="alignleft wp-image-110 size-medium" style="border: 1px solid black; margin-left: 10px; margin-right: 10px;" title="The Realist is a Family Man" src="http://www.mrmoneymustache.com/wp-content/uploads/2011/04/The-Realist-is-a-Family-Man-300x256.jpg" alt="" width="300" height="256" srcset="http://www.mrmoneymustache.com/wp-content/uploads/2011/04/The-Realist-is-a-Family-Man-300x256.jpg 300w, http://www.mrmoneymustache.com/wp-content/uploads/2011/04/The-Realist-is-a-Family-Man-1024x875.jpg 1024w" sizes="(max-width: 300px) 100vw, 300px"></a>Whoa, did you read that opinionated garbage yesterday?</p>\n<p>Who is this Mr. Money Mustache? The guy thinks he’s got it all figured out. And is he trying to offer financial advice, or just financial <em>scorn</em> to those less fortunate than himself? Sure, maybe you can retire early if you are born to a frugal family, get a good education and never make any mistakes. But what about the rest of us? Is there any hope at all?</p>\n<p>My name is The Realist. I’m contributing to this blog to add some perspective to the hard-edged idealism of this “Mr. Money Mustache” (who needs a fake catchy name like that anyway?).</p>\n<p>So, life is hard in the modern world. Rapid changes in the business environment mean frequent layoffs and difficulty in holding a steady job. Health care inflation means we waste more of our small paychecks on medical costs each year. Gas prices are higher than they used to be, and so are other costs like food, child care, and education.</p>\n<p>Yet some people manage to get by while others go bankrupt. Is it all just luck, or is there something we can do to beat the odds ourselves? As the Realist, I’ll step in to present small but powerful steps to help you get ahead. There is sometimes a fine line between financial solvency and bankruptcy.</p>\n<p>How fine? How about $25 a month?</p>\n<p>Here’s your lesson for the day: say you are breaking even – paying all your bills, buying $500 monthly of necessities on a credit card which gets paid off IN FULL each month with no interest, but not able to save a cent.</p>\n<p>Then a McDonald’s opens up next to the office where you work and you start buying lunch <strong>once a week</strong> instead of brown-bagging it. All of a sudden, you can’t quite pay the credit card bill each month so a small balance starts to accrue.</p>\n<ul>\n<li>Month #1: there’s a $525 balance and you pay $500</li>\n<li>Month #2: you are charged interest on the unpaid $25 from the first month at 20% ($0.42) so you’re $25.42 short</li>\n<li>Month #3: interest on $25.42 ($0.43) plus this month’s shortfall ($25) – you are now $50.85 short</li>\n<li>Oops, you are just a few days late for a payment and suddenly the whole $550 balance is subject to interest ($9.16) plus a late fee ($30). Now you’re $89.16 in the hole.</li>\n</ul>\n<p>Ahh, one burger a week, 89 bucks after 3 months. That’s not so bad, is it? <strong>YES IT IS.</strong></p>\n<p>After 10 years, you’ll have a credit card debt of <strong>about $5,000</strong>. If you couldn’t pay it off when it was $525, things are looking much tougher now.</p>\n<p>And that is $25 per month. Imagine someone so free spending that they went to McDonald’s once per DAY?</p>\n<p>That person would be over <strong>$50,000 in debt after ten years.</strong></p>\n<p>Wow, that is truly extreme. So the lessons for the day are:</p>\n<ul>\n<li>Never <strong>EVER </strong>let a credit card go even one month without paying the balance in full – because the interest rate is ridiculous, and if you ever slip up on the due date, they trick you by charging you interest on all your purchases for the whole month.</li>\n<li>There is a surprisingly fine line between staying afloat and sinking, even over a short period like ten years. Understand this and then all those stories about people going bankrupt start to make sense.</li>\n<li>But there also a fine line between staying afloat and rising up quickly to become very wealthy. What if the person breaking even above found a way to save $10 a day instead of spending $25 more than she made each month?</li>\n</ul>\n\t\t\t\t',
url: 'http://www.mrmoneymustache.com/2011/04/07/meet-the-realist/',
number: 2 } ];



function saveNcx(temp) {
  console.log('saveNCX');
  return new Promise((resolve, reject)=>{
    const template = fs.readFileSync('template/index.ncx');
    let snippet = template.toString();
    // console.log('snippet: ',snippet);
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
    // const prefix = '<?xml version="1.0"?>\n<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN"\n"http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">\n<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">\n<head>\n</head>\n  <docTitle>\n    <text>Book title</text>\n  </docTitle>\n  <navMap>\n    <navPoint id="toc" playOrder="1">\n      <navLabel>\n        <text>\n          Table of Contents\n        </text>\n      </navLabel>\n    <content src="indexToc.html#toc" />\n  </navPoint>';
    // const suffix = '  </navMap>\n</ncx>';
    fs.writeFile(filename, `\n${file}\n`, function (err) {
      if (err) throw err;
      else {
        console.log('Saved! - saveNcxEnd');
        resolve();
      }
    });
  });
}

saveNcx(temp);
