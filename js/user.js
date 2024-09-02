// 用户注册与登录的表单验证项


class FieldValidator {
    /**
     * 
     * @param {String} txtId 文本框的id
     * @param {Function} validatorFnc 验证规则函数
     * 当需要对该文本框进行验证时,会调用该函数,函数的参数为当前文本框的值,函数的返回值为验证的错误消息,若没有返回则表示无错误
     */
    constructor(txtId, validatorFnc) {
        this.input = document.querySelector("#" + txtId)
        console.log("第一次获取"+this.input);
        this.p = this.input.nextElementSibling
        this.validatorFnc = validatorFnc
        this.input.onblur = () => {
            this.validate()
        }
    }
    async validate() {
        const err = await this.validatorFnc(this.input.value)
        if(err) {
            this.p.innerHTML = err
            return false
        } else {
            this.p.innerHTML = ''
            return true
        }
    }

    static async validate(...validators) {
        const proms = validators.map((v)=> v.validate())
        const result = await Promise.all(proms)
        return result.every((r)=>r)
    }
}