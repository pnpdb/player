<template>
    <div class="container home">
        <div class="info">
            <img class="logo" :src="player.avatorUrl" alt="" v-if="player.avatorUrl">
            <span class="logo" v-else></span>
            <p class="playerName">{{player.name}} <span>陪玩</span></p>
            <button class="onlineBtn" type="button" @click="duGetStatus" v-if="status === 0">正在线上接单</button>
            <button class="offlineBtn" type="button" @click="duGetStatus" v-else>正在离线休息</button>
            <router-link :to="{name: 'order'}">订单列表 &rsaquo;&rsaquo;</router-link>
        </div>
        <div class="offline" v-if="status && createDate">
            <p>你错过了{{createDate}}的一个订单</p>
            <p>自动切换为离线休息状态</p>
        </div>
        <ul class="list" v-else>
            <li v-for="item in orders" :key="item.id">
                <p>{{item.createDate}}</p>
                <div class="info">
                    <img class="photo" :src="item.avatorUrl">
                    <div>
                        <b>{{item.customerName}}</b>
                        <span>刺激战场{{item.platform}}区</span>
                        <label><i>￥{{item.totalPrice/100}}</i> / {{item.duration}}小时</label>
                    </div>
                    <button type="button" @click="doReceiptOrder(item)" v-if="!item.receiptDate">接单</button>
                </div>
                <p class="p" v-if="item.receiptDate">订单完成后可以切换为线上接单状态<br>预计完成时间<span>{{countTime(item)}}</span></p>
            </li>
        </ul>
        <div class="null" v-show="showNull">
            <img src="../assets/img/null.svg" alt="">
            <p>没有待处理的订单</p>
        </div>
    </div>
</template>

<script>
import {getInfo, receiptOrder, changeStatus, getStatus} from "@/api/api";
export default {
    data: function () {
        return {
            account: '',
            password: '',
            error: false,
            errorMes: '帐号或者密码不能为空',
            player: {},
            status: 0,
            orders: [],
            orderId: null,
            createDate: '',
            showNull: false,
            complateTime: ''
        }
    },
    mounted: function () {
        this.getPlayerInfo();
        // setTimeout( function () {
        //     this.getPlayerInfo();
        // },3*1000*60);
    },
    methods: {
        // 获取订单列表
        getPlayerInfo: async function () {
            this.showNull = false;
            let response = await getInfo();
            if(response.code === 0){
                let status = response.status.data;
                this.status = status;
                this.player = response;
                if(status === 1){
                    this.createDate = response.createDate;
                    this.orders = [];
                    if(!response.createDate){
                        this.showNull = true;
                    }
                } else {
                    this.orders = response.orders;
                    this.createDate === '';
                    if(response.orders.length === 0){
                        this.showNull = true;
                    }
                }
            }
        },
        // 接受订单
        doReceiptOrder: async function (item) {
            this.orderId = item.orderId;
            let data = {
                openId: item.openId,
                orderId: item.orderId
            }
            let response = await receiptOrder(data);
            if(response.meta.code === 0){
                this.getPlayerInfo();
            }
        },
        // 陪玩切换状态
        doChangeStatus: async function () {
            let status = this.status ? 0 : 1;
            let data = {
                status: status
            };
            let response = await changeStatus(data);
            if(response.meta.code === 0){
                this.getPlayerInfo();
            }
        },
        // 计算预计完成时间
        countTime: function (item) {
            let timestamp = Date.parse(new Date(item.receiptDate)) + item.duration*3600*1000 + 15*60*1000;
            let date = new Date(timestamp);
            let hours = date.getHours();
            let minute = date.getMinutes(); 
            return (hours < 10 ? '0' + hours : hours) + ':' + (minute < 10 ? '0' + minute : minute);
        },
        // 获取陪玩状态
        duGetStatus: async function () {
            let response = await getStatus();
            if(response.meta.code === 0){
                this.status = response.data;
                if(this.status === 2){
                    this.$toast('当前正在游戏中，不可切换状态');
                    return;
                }
                this.doChangeStatus();
            }
        }
    }
    
}
</script>
