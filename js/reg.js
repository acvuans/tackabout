// 账号检测
const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if(!val) {
        return '账号错误';
    }
    const resp = await API.exists(val)
    if(resp.data) {
        return '账号已存在'
    } else {
        return ''
    }
})

// 账号昵称检测
const nickNameValidator = new FieldValidator('txtNickName', function (val) {
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

// 账号密码再次检测
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if(!val) {
        return '请输入确认密码';
    }
    if(val !== loginPwdValidator.input.value) {
        return '两次密码请保持一致';
    }
})

const form = document.querySelector('.user-form')
console.log('表单参数', form)
form.onsubmit = async function(e) {
    e.preventDefault()
    const result =  await FieldValidator.validate(loginIdValidator,nickNameValidator,loginPwdValidator,loginPwdConfirmValidator)
    if(!result) {
        return
    }
    const formData = new FormData(form)
    console.log('mingsangmeiyouxiaojiji', formData)
    const data = Object.fromEntries(formData.entries())
    // const data = {
    //     loginId: loginIdValidator.input.value,
    //     nickname: nickNameValidator.input.value,
    //     loginPwd: loginPwdValidator.input.value,
    //     loginPwdConfirm: loginPwdConfirmValidator.input.value
    // }
    const resp = await API.reg(data)
    if(resp.code === 0) {
        alert('点击确定,跳转到登录页面')
        location.href = './login.html'
    }
}