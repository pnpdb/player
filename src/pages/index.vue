<template>
    <div class="container login">
        <img class="logo" src="../assets/img/logo.png" alt="">
        <p class="slogan">带飞服务端</p>
        <form id="myForm">
            <label class="error" v-show="error">{{errorMes}}</label>
            <p>
                <span class="icon-user"></span>
                <input name="account" type="text" placeholder="输入账号" v-model.trim="account">
            </p>
            <p>
                <span class="icon-psw"></span>
                <input name="password" type="password" placeholder="输入密码" v-model.trim="password">
            </p>
            <button type="button" @click="doLogin">登录</button>
        </form>
    </div>
</template>
<script>
import {login} from "@/api/api";
export default {
    data: function () {
        return {
            account: 'abc',
            password: '123456',
            error: false,
            errorMes: '帐号或者密码不能为空'
        }
    },
    methods: {
        doLogin: async function () {
            let data = new FormData(document.getElementById('myForm'));
            if(!this.account || !this.password){
                this.error = true;
                return;
            }
            let response = await login(data);
            let mes = response.data.meta.message;
            if(response.data.meta.code === 0){
                this.error = false;
                this.$store.set('player', response.data.data)
                this.$router.push({name: 'index'});
                return;
            }
            this.errorMes = mes;
            this.error = true;
        }
    }
}
</script>

