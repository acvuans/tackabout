// 账号检测
const loginIdValidator = new FieldValidator('txtLoginId', function (val) {
    if(!val) {
        return '请输入昵称';
    }
})
// 账号密码检测
const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if(!val) {
        return '请输入密码';
    }
})

const form =  document.querySelector('.user-form');
form.onsubmit = async function(params) { 
    params.preventDefault()
    const result =  await FieldValidator.validate(loginIdValidator,loginPwdValidator)
    if(!result) {
        return
    }
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    console.log('我是login页面的代码', data)
    const resp = await API.login(data)
    if(resp.code === 0) {
        alert('登录成功')
        location.href = './index.html'
    }
    
}
