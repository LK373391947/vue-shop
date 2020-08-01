<template>
	<view class="container">
		<view v-if="hasItems==true">
			<view class="title">
				店家信息:
			</view>
			<view class="body">
				<view class="main" v-for="item in cart" :key="item.id">
					<view>{{item.name}} ￥{{item.price}} </view>
					<view class="addAndSub">
						<view class="addbutton" @tap="addToCart(item)">+</view>
						<view>{{item.num}}</view>
						<view class="subbutton" @tap="subToCart(item)">-</view>
						<view class="deletebutton" @tap="deleteItem(item)">删除</view>
					</view>
				</view>
			</view>

			<view class="footer">
				<view class="total">
					当前总价:{{this.$store.state.total}}
				</view>
				<view class="deleteAll" @tap="deleteAll">清空购物车</view>
				<view class="addOrder" @tap="addOrder">确认下单</view>
			</view>
		</view>

		<view v-else style="text-align: center;">
			购物车空空如也...
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cart: [],
				hasItems: true,
				addForm: {
					shopname: '',
					user:{},
					date: '',
					cart: [],
					total: 0,
					comment:false
				}
			}
		},
		onShow() {
			this.cart = this.$store.state.cart;
			if (this.cart.length == 0) this.hasItems = false;
			else this.hasItems = true;
		},
		created() {
			this.cart = this.$store.state.cart;
			if (this.cart.length == 0) this.hasItems = false;
			let that = this;
			
		},
		methods: {
			//增加
			addToCart(value) {
				this.$store.commit('addToCart', value);
				this.cart = this.$store.state.cart;
			},
			//减少
			subToCart(value) {
				this.$store.commit('subToCart', value);
				this.cart = this.$store.state.cart;
			},
			//删除当前商品
			deleteItem(value) {
				this.$store.commit('deleteItem', value);
				if (this.cart.length == 0) this.hasItems = false;
				this.cart = this.$store.state.cart;
			},
			//删除所有商品
			deleteAll() {
				this.$store.commit('deleteAll');
				this.hasItems = false;
			},
			//下单
			addOrder() {
				let that = this;
				uni.getStorage({
					key: 'shopname',
					success(res) {
						that.addForm.shopname = res.data;
					}
				});
				uni.removeStorage({
					key: 'shopname'
				});
				uni.getStorage({
					key:'myInfo',
					success(res){
					that.addForm.user=	res.data;
					}
				})
				uni.showModal({
					content: '确认下单',
					success(res) {
						if (res.confirm) {
							that.addForm.cart = that.$store.state.cart;
							that.addForm.total = that.$store.state.total;
							that.addForm.date = that.getLocalTime();
							uni.request({
								url: 'http://localhost:3000/addOrder',
								method: 'POST',
								data: {
									addForm: that.addForm
								},
								success(res) {
									if (res.data == 'success'){
										//that.deleteAll();
										return uni.showToast({
										title: '下单成功'
									});}
									else return uni.showModal({
										content: '下单失败'
									});
								}
							})


						}
						if (res.cancel) {
							return;
						}
					}
				})
			},
			//获取当前时间
			getLocalTime() {
				let result = "";
				let time = new Date();
				let year = time.getFullYear().toString();
				let month = (time.getMonth() + 1).toString();
				let date = time.getDate().toString();
				let hour = time.getHours().toString();
				let minutes = time.getMinutes().toString();
				result = year + "-" + month + "-" + date + " " + hour + ":" + minutes;
				return result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		background-color: white;
		padding: 10rpx;
		box-sizing: border-box;
		height: 100%;
	}

	.main {
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		padding: 10px;
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		box-shadow: 1rpx 1rpx black;
		background-color: white;
	}

	.total {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
		color: gray;

		padding: 10px;
		border-top: 2px solid #39c5bb;
		border-bottom: 2px solid #39c5bb;
	}

	.footer {
		display: flex;
		justify-content: space-around;
		font-size: 14px;
		align-items: center;

		.deleteAll {
			background-color: red;
			color: white;
			border-radius: 10px;
			width: 100px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.addOrder {
			background-color: #39c5bb;
			color: white;
			border-radius: 10px;
			width: 100px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.addAndSub {
		display: flex;
		justify-content: space-around;

		.addbutton {
			margin: 0 10rpx;
			font-size: 18px;
			width: 40rpx;
			height: 40rpx;
			border-radius: 40rpx;
			color: white;
			background-color: #39c5bb;
			box-shadow: 1rpx 1rpx black;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.subbutton {
			margin: 0 10rpx;
			font-size: 18px;
			width: 40rpx;
			height: 40rpx;
			border-radius: 40rpx;
			box-shadow: 1rpx 1rpx black;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.deletebutton {
			color: white;
			background-color: red;
			font-size: 12px;
			border-radius: 5px;
			height: 20px;
			width: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 10px;
		}
	}
</style>
