<template>
	<view class="container">
		<uni-card v-for="item in orderArray" :key="item.index">
			<view>时间:{{item.date}}</view>
			<view>店家:{{item.shopname}}</view>
			<view>
				<view>订单详情</view>
				<view v-for="subitem in item.cart" :key="subitem.index" style="text-indent: 1em;font-size: 12px;">
					{{subitem.name}}¥{{subitem.price}}  x{{subitem.num}}
				</view>
				</view>
			<view>总价:{{item.total}}</view>
			<view v-if="item.comment==false" class="comment" @tap="comment(item)"><view>评论</view></view>
			<view  v-else class="hasCommented"><view>已评论</view></view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				orderArray:[]
			}
		},
		created() {
			this.getOrder();
		},
		methods:{
			getOrder(){
				let that=this;
				let username='';
				uni.getStorage({
					key:'myInfo',
					success(res){
						username = res.data.username;
					}
				});
				uni.request({
					url:'http://localhost:3000/getMyOrder?name='+username,
					success(res) {
						that.orderArray=res.data[0].orderArray;
					}
				})
			},
			comment(value){
				uni.setStorage({
					key:'shopname',
					data:value.shopname
				})
				uni.navigateTo({
					url:'../comment/comment'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 14px;
		color: gray;
		view {
			margin:5px 0;
		}
		.comment {
			display: flex;
			justify-content: flex-end;
			width: 100%;
			view {
				width: 100px;
				display: flex;
				justify-content: center;
				border-radius: 10px;
				border:1px solid gray;
				
			}
		}
		.hasCommented {
			display: flex;
			justify-content: flex-end;
			width: 100%;
			opacity: .3;
			view {
				width: 100px;
				display: flex;
				justify-content: center;
				border-radius: 10px;
				border:1px solid gray;
				
			}
		}
	}
</style>
