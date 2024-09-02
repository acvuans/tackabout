(async function () {
    const resp = await API.profile()
    const user = resp.data
    if(!user) {
        location.href= './login.html'
        alert('你有账号嘛你就来 去登录!')
        return
    }
    // 以下全部为成功登录状态

    const dome = {
        aside: {
            nickname: document.querySelector('.nickname'),
            loginId: document.querySelector('.loginId'),
            img: document.querySelector('.ppmm')
        },
        close: document.querySelector('.aside_buttom'),
        two_me: document.querySelector('.two_me'),
        two_rbt: document.querySelector('.two_rbt'),
        txtmsg: document.querySelector('.txtmsg'),
        threeInput: document.querySelector('.three_input')
    }

    dome.close.onclick = function() {
        localStorage.removeItem('token')
        location.href = './login.html'
    }

    setUserID()
    function setUserID() {
        dome.aside.nickname.innerText = user.nickname
        dome.aside.loginId.innerText = user.loginId
        dome.aside.img.src = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.pL9aeO50HMujMSzGcOPhKwAAAA?rs=1&pid=ImgDetMain'
    }


    function addMessage(userInfo, nums) {
        const div = document.createElement('div')
        // if(userInfo.data) {
        //     div.twoList.add('.two_me')
        // }
        // 图片
        const img = document.createElement('img')
        img.className = 'bbll_Plc'
        img.src = userInfo.from? 'https://tse1-mm.cn.bing.net/th/id/OIP-C.pL9aeO50HMujMSzGcOPhKwAAAA?rs=1&pid=ImgDetMain': 'https://tse4-mm.cn.bing.net/th/id/OIP-C.vKJorGHusPWOMS0kXNLhYgAAAA?rs=1&pid=ImgDetMain'
        // 消息
        const content = document.createElement('div')
        content.className = 'bbll_Message'
        content.innerText = userInfo.content
        // 时间
        const date = document.createElement('div')
        date.className = 'bbll_Time'
        date.innerText = TimeStamp(userInfo.createdAt)
        // 将数据加载至对话框
        div.appendChild(img)
        div.appendChild(content)
        div.appendChild(date)
        if(nums === 1) {
            dome.two_rbt.appendChild(div)
        } else {
            dome.two_me.appendChild(div)
        }
    }

    await getUserHistory()
    async function getUserHistory(){
        const resp = await API.getHistory()
        for(const item of resp.data) {
            if(item.from) {
                addMessage(item, 1)
            } else {
                addMessage(item, 2)
            }
        }
    }

    dome.threeInput.onsubmit = function(e) {
        e.preventDefault();
        sendMessage();
    }

    function TimeStamp(Timestamp) {
        let now = new Date(Timestamp),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }

    async function sendMessage() {
        const mes = dome.txtmsg.value.trim()
        if(!mes) {
            return
        }
        addMessage({
            from: user.loginId,
            to: null,
            createdAt: Date.now(),
            content: mes
        })
        dome.txtmsg.value = ''
        const resp = await API.sendChat(mes)
        addMessage({
            from: null,
            to: user.loginId,
            ...resp.data
        })
    }
    window.sendMessage= sendMessage
})();