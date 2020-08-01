<template>
	<view class="container">
		<view>
			姓名
		</view>
		<input type="text" v-model="username" />
		<view>
			地址
		</view>
		<input type="text" v-model="address" />
		<view>
			电话号码
		</view>
		<input type="text" v-model="telephone" />
		<view class="button" @tap="goToIndex">
			进入
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				username:'',
				address:'',
				telephone:''
			}
		},
		methods:{
			goToIndex(){
				if(this.username==''||this.address==''||this.telephone=='')return uni.showModal({
					content:'必要信息不能为空'
				});
				else{
					let obj={
						username:this.username,
						address:this.address,
						telephone:this.telephone
					}
					uni.setStorage({
						key:'myInfo',
						data:obj
					});
					uni.switchTab({
						url:'../index/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		padding-left:30px;
		padding-top:100px;
		background-color: rgba(57,197,187,.5);
		height: 812px;
		box-sizing: border-box;
		view {
			color: gray;
			font-size: 16px;
		}
	}
	input {
		border: 1px solid gray;
		width:300px;
		height:30px;
		border-radius: 30px;
		text-indent: 1em;
		margin-bottom: 20px;
		margin-top: 10px;
		background-color: white;
	}
	.button {
		position: absolute;
		left:130px;
		bottom: 320px;
		width: 100px;
		height: 100px;
		border-radius: 100px;
		background-color: #3492d9;
		color:white !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px !important;
		box-shadow: 1px 1px 5px gray;
	}
</style>
