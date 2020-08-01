<template>
	<view class="container">
		<view class="title">店铺</view>
		<view class="item" v-for="item in shopList" :key="item._id" @tap="goToShop(item)">
			<view>{{item.shopname}}</view>
			<view style="text-overflow: ellipsis;
			white-space: nowrap;">描述:{{item.describe}}</view>
			<view>类别:{{item.category}}</view>
		</view>
		<button type="warn" size="mini" @tap="loginout">退出</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopList:[]
			}
		},
		created() {
			var that=this;
			uni.request({
				url:'http://localhost:3000/getShop',
				success(res) {
					that.shopList=res.data;
				}
			})
		},
		methods: {
			goToShop(item){
				let obj={
						username:item.username,
						shopname:item.shopname,
						describe:item.describe,
						address:item.address,
						telephone:item.telephone
					}
				uni.navigateTo({
					
					//防止数据过长超过url的长度限制
					url:'../item/item?item='+encodeURIComponent(JSON.stringify(obj)),
				})
			},
			loginout(){
				uni.clearStorage();
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 16px;
		line-height: 24px;
		box-sizing: border-box;
		.title {
			font-size: 20px;
			margin-bottom:10rpx ;
			box-sizing: border-box;
		}
		.item {
			box-sizing: border-box;
			margin-bottom: 10rpx;
			border: 1rpx solid #39c5bb;
			width: 100%;
			height: 100px;
			padding: 10px;
			background-color: #39c5bb;
			color: white;
			border-radius: 10px;
		}
	}
</style>
