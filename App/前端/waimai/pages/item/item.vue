<template>
	<view class="container">
		<view class="title">
			<view>{{items.shopname}}</view>
			<view>简介:{{items.describe}}</view>
			<view>电话:{{items.telephone}}</view>
			<view>地址:{{items.address}}</view>
			<view>电话:{{items.telephone}}</view>
		</view>
		<view class="button">
			<view ref="itemRef" @click="showItemPage">菜 品</view>
			<view ref="commentRef" @click="showCommentPage">评 论</view>
		</view>
		<view class="body" v-if="pageChange==true">
		<view  class="main" v-for="item in itemArr" :key="item.name">
			<view class="item">
				{{item.name}}<br>
				月销量：{{item.number}}
			</view>
			<view>￥{{item.price}}</view>

			<view class="addAndSub">
				<view class="addbutton" @tap="addToCart(item)">+</view>
				<view>{{item.itemnumber}}</view>
				<view class="subbutton" @tap="subToCart(item)">-</view>
			</view>

		</view>
		
		</view>
		<view v-else class="comment">
			<view v-for="item in commentArr" :key="item.index" class="commentMain">
				<view class="message">{{item.username}}:{{item.message}}</view>
				<view class="date">{{item.date}}</view>
			</view>
		</view>
		<view class="cart" @tap="goToCart">
			<view>前往下单</view>
			<view class="space"></view>
			<view>目前总价：{{this.$store.state.total}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//店铺的对象
				items: {
					username: "",
					shopname: "",
					password: "",
					confirm: "",
					describe: "",
					address: "",
					telephone: "",
					category: ""
				},
				//所有商品的数组
				itemArr: [],
				pageChange:true,
				commentArr:[]
			}
		},
		onLoad(option) {
			this.items = JSON.parse(decodeURIComponent(option.item));
		},
		created() {
			let that = this;
			uni.request({
				url: 'http://localhost:3000/getItem?username=' + that.items.username,
				success(res) {
					that.itemArr = res.data;
				}
			});
			uni.request({
				url:'http://localhost:3000/getComment?shopname='+that.items.shopname,
				success(res){
					that.commentArr=res.data[0].commentArray;
					console.log(that.commentArr);
				}
			})
		},
		methods: {
			//增加
			addToCart(value) {
				this.$store.commit('addToCart', value);
				value.itemnumber++;
			},
			//减少
			subToCart(value) {
				this.$store.commit('subToCart', value);
				if(value.itemnumber>0)value.itemnumber--;				
			},
			//显示商品页面
			showItemPage(){
				this.pageChange=true;
			},
			//显示评论页面
			showCommentPage(){
				this.pageChange=false;
			},
			//点击下方按钮进入购物车页面
			goToCart(){
				let that=this;
				uni.setStorage({
					key:'shopname',
					data:that.items.shopname
				});
				uni.switchTab({
					url:'../cart/cart'
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 14px;
		.comment {
			background-color: white;
			padding: 10px;
			box-sizing: border-box;
			.commentMain {
				border-bottom: 2px solid #39c5bb;
				box-sizing: border-box;
				margin-bottom: 10px;
				box-shadow: 1px 1px 2px #39c5bb;
				border-radius: 5px;
				padding: 5px;
				.date {
					font-size: 12px;
					color: gray;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
		background-color: #39c5bb;
		.cart {
			position: fixed;
			bottom: 10%;
			width: 100%;
			height: 50px;
			font-size: 18px;
			color: white;
			background-color: #39c5bb;
			display: flex;
			justify-content: space-around;
			align-items: center;
			border-radius: 100px;
			.space {
				width: 2px;
				height: 100%;
				background-color: white;
			}
		}
		.title {
			width:100%;
			background-color: #39c5bb;
			color: white;
			padding: 10px;
			box-sizing: border-box;
		}
		.button {
			width: 100%;
			height: 100rpx;
			background-color: rgba(255,255,255,.2);
			border-top-right-radius: 20px;
			border-top-left-radius: 20px;
			overflow: hidden;
			view {
				display: inline-block;
				width: 50%;
				height: 100%;
				font-size: 17px;
				text-align: center;
				line-height: 100rpx;
				color: white;
				background-color: rgba(255,255,255,.2);
			}
		}
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
			}
		}
	}
</style>
