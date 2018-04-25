const fs = require('fs');

function makeOPF(title,lang,author,copyright) {
  console.log('I want to make an OPF please.');
  const template = `<?xml version="1.0" encoding="iso-8859-1"?>
<package unique-identifier="uid" xmlns:opf="http://www.idpf.org/2007/opf" xmlns:asd="http://www.idpf.org/asdfaf">
  <metadata>
    <dc-metadata  xmlns:dc="http://purl.org/metadata/dublin_core" xmlns:oebpackage="http://openebook.org/namespaces/oeb-package/1.0/">
      <dc:Title>${title}</dc:Title>
      <dc:Language>${lang}</dc:Language>
      <dc:Creator>${author}</dc:Creator>
      <dc:Copyrights>${copyright}</dc:Copyrights>
      <dc:Publisher>BlogToKindle</dc:Publisher>
      <x-metadata>
        <EmbeddedCover>images/cover.jpg</EmbeddedCover>
      </x-metadata>
    </dc-metadata>
  </metadata>
  <manifest>
    <item id="content" media-type="text/x-oeb1-document" href="index.html#toc"></item>
    <item id="ncx" media-type="application/x-dtbncx+xml" href="toc.ncx"/>
    <item id="text" media-type="text/x-oeb1-document" href="index.html#ch1"></item>
    <item id="Images" media-type="text/x-oeb1-document" href="Images.html"></item>
  </manifest>
  <spine toc="ncx">
    <itemref idref="content"/>
    <itemref idref="text"/>
    <itemref idref="Images"/>
  </spine>
  <guide>
    <reference type="toc" title="Table of Contents" href="toc.html"/>
    <reference type="text" title="Book" href="index.html"/>
  </guide>
</package>`;
  fs.writeFile('output/index.opf',template);
  return;
}

module.exports.makeOPF = makeOPF;
