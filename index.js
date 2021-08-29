const express = require("express");
const { html, style } = require("./utils/index.js");
let chatList = [];
let userList = []
const app = express();

app.use((req, res, next) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.setHeader("Transfer-Encoding", "chunked");
    next();
});

app.route("/").get((req, res) => {
    let userInfo = userList.find(ele => ele.ip === req.ip);
    if (userInfo) {
        userInfo.writeRes = res;
    } else {
        userInfo = {
            ip: req.ip,
            name: `机器人${userList.length + 1}号`,
            chatContent: "",
            writeRes: res,
            lastClass: "content",
            nextClass: "content" + new Date().getTime()
        };
        userList.push(userInfo);
    }
    res.write(style(userInfo.lastClass, userInfo.chatContent));
    res.write(html(userInfo.name, userInfo.nextClass, userInfo.chatContent, chatList));
});

app.route("/chat/:word").get((req, res) => {
    let userInfo = userList.find(ele => ele.ip === req.ip);
    userInfo.chatContent = req.params.word;
    userInfo.lastClass = userInfo.nextClass;
    userInfo.nextClass = "content" + new Date().getTime();
    userInfo.writeRes.write(style(userInfo.lastClass, userInfo.chatContent));
    userInfo.writeRes.write(html(userInfo.name, userInfo.nextClass, userInfo.chatContent, chatList));
    res.status(200).send();
});

app.route("/chat/:word/submit").get((req, res) => {
    let userInfo = userList.find(ele => ele.ip === req.ip);
    userInfo.chatContent = "";
    chatList.push({
        name: userInfo.name,
        content: req.params.word
    });
    userList.forEach(ele => {
        ele.lastClass = ele.nextClass;
        ele.nextClass = "content" + new Date().getTime();
        ele.writeRes.write(style(ele.lastClass, ele.chatContent));
        ele.writeRes.write(html(ele.name, ele.nextClass, ele.chatContent, chatList));
    });
    res.status(200).send();
});

app.listen(3000, () => {
    console.log("服务启动成功");
});