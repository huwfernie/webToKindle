# Web to Kindle

This is a project that will hopefully end up with a working solution to web-scraping an online blog/site and returning a well formatted and useable file to be used on kindle e-book readers.

### The approach:

This will be a node project. Using express to render a simple website will let a user input a blog address to be scraped. the result of the scrape will be formatted and then passed to the amazon KindleGen command line tool, that will generate a kindle file (XXX.mobi) which can be uploaded to any kindle via USB cable, another option would be to use the amazon send to kindle feature where you can email the file to yourself.

### Key Technology:

* Node.js
* Express
* Cheerio
* Nodemailer

references:

https://nodejs.org/en/

https://www.amazon.com/gp/feature.html?docId=1000765211

https://www.amazon.com/gp/sendtokindle/email

https://nodemailer.com/about/

https://medium.com/@manojsinghnegi/sending-an-email-using-nodemailer-gmail-7cfa0712a799


*I will also try to tutorialize the build, which may result in several versions of the app to represent different phases of development*


18 - Nov - 2017
