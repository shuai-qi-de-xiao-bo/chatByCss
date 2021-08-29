module.exports = {
    style: function (lastClass, chatContent) {
        let str = "";
        for (let i = 97; i <= 122; i++) {
            str = str + `.${String.fromCharCode(i)}:active {
                            background: url(chat/${chatContent}${String.fromCharCode(i)});
                        }`;
        }
        return `<style>
                    ${str}
                    .submit:active {
                        background: url(chat/${chatContent}/submit);
                    }
                    .${lastClass} {
                        display: none;
                    }
                </style>`;
    },
    html: function(userName, nextClass, chatContent, chatList) {
        let str = "";
        chatList.forEach(ele => {
            str = str + `<div>${ele.name}: ${ele.content}</div>`;
        });
        return `<div class="box ${nextClass}">
                    <h1>纯css聊天展示</h1>
                    <div>你的姓名: ${userName}</div>
                    <div class="btn-group">
                        <button class="a">a</button>
                        <button class="b">b</button>
                        <button class="c">c</button>
                        <button class="d">d</button>
                        <button class="e">e</button>
                        <button class="f">f</button>
                        <button class="g">g</button>
                        <button class="h">h</button>
                        <button class="i">i</button>
                    </div>
                    <div class="btn-group">
                        <button class="j">j</button>
                        <button class="k">k</button>
                        <button class="l">l</button>
                        <button class="m">m</button>
                        <button class="n">n</button>
                        <button class="o">o</button>
                        <button class="p">p</button>
                        <button class="q">q</button>
                        <button class="r">r</button>
                    </div>
                    <div class="btn-group">
                        <button class="s">s</button>
                        <button class="t">t</button>
                        <button class="u">u</button>
                        <button class="v">v</button>
                        <button class="w">w</button>
                        <button class="x">x</button>
                        <button class="y">y</button>
                        <button class="z">z</button>
                        <button class="submit">确定</button>
                    </div>
                    <div>
                        请点击上面的按钮进行内容输入,点击确定进行发送:
                        <hr>
                        <div>${chatContent}</div>
                        <hr>
                    </div>
                    <div>
                        <strong>聊天信息:</strong>
                        ${str}
                    </div>
                </div>`;
    }
}