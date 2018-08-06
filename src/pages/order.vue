<template>
    <div class="container" style="padding:0;">
        <p class="header">
            <router-link :to="{name: 'index'}" class="back"></router-link>
            {{total}}个接单记录</p>
        <ul class="orderList">
            <li v-for="(item, index) in orders" :key="index">
                <p>{{item.createDate}}</p>
                <div class="info">
                    <img class="photo" :src="item.avatorUrl">
                    <div>
                        <b>{{item.customerName}}</b>
                        <span>刺激战场{{item.platform}}区</span>
                        <label><i>￥{{item.totalPrice/100}}</i> / {{item.duration}}小时</label>
                    </div>
                </div>
            </li>
        </ul>
        <p class="loadMore" @click="getAllOrders(beginNo)" v-show="orders.length < total">加载更多</p>
        <div class="null"  v-show="orders.length == 0">
            <img src="../assets/img/null.svg" alt="">
            <p>还没有接过订单</p>
        </div>
    </div>
</template>
<script>
import {getHistoryOrder} from "@/api/api";
import {baseURL} from '@/config/env';
export default {
    data: function () {
        return {
            orders: [],
            beginNo: 0,
            total: 0
        }
    },
    mounted: function () {
        this.getAllOrders(0);
    },
    methods: {
        // 获取订单
        getAllOrders: async function (beginNo) {
            let data = {
                beginNo: beginNo,
                num: 20
            }
            let response = await getHistoryOrder(data);
            if(response.code === 0){
                for(let obj of response.orders){
                    this.orders.push(obj);
                }
                this.beginNo = this.orders.length - 1;
                this.total = response.total;
                return;
            }
            this.$toast('加载订单失败');
        }
    }
}
</script>


