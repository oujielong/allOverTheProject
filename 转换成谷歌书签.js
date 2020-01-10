const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./book.txt"), { encoding: "utf-8" }, (err, data) => {
  let dataArray = data.split("\r\n");
  let resultData = dataArray.map(item => {
    // h 标签
    if (item.search(/[hH]\d/) != -1) {
      return `<DT>${item.toUpperCase().replace(/<A[\s\S]+<\/A>/gi,"")}`;
    }
    if (item.search(/<ul>/) != -1) {
      return "<DL><p>";
    }
    if (item.search(/<li>/) != -1) {
      let lidata = item.replace("<li>", "").replace("</li>", "");
      let splitPosi = lidata.indexOf("http");
      let resData = `<A HREF="${lidata.substring(splitPosi)}">${lidata.substring(0, splitPosi)}</A>`;
      return `<DT>${resData}`;
    }
    if (item.search(/<\/ul>/) != -1) {
      return "</DL><p>";
    }
  });
  console.log(resultData);

  let writeString = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
  <!-- This is an automatically generated file.
       It will be read and overwritten.
       DO NOT EDIT! -->
  <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
  <TITLE>Bookmarks</TITLE>
  <H1>Bookmarks</H1>
  <DL><p>
      <DT><H3 ADD_DATE="1558322279" LAST_MODIFIED="1576632110" PERSONAL_TOOLBAR_FOLDER="true">书签栏</H3>
      <DL><p>${resultData.join("\r\n")}</DL><p>`;

  fs.writeFile(path.join(__dirname, "./标签.html"), writeString, "utf8", err => {
    if (err) throw err;
    console.log("文件已被保存");
  });
});
