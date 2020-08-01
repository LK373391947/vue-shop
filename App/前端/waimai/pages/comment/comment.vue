<template>
	<view class="container">
		<view class="main">
			<textarea v-model="commentForm.message" maxlength="140" />
			<button type="default" size="mini" @tap="addComment">确定</button></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				commentForm:{
					message:'',
					date:'',
					shopname:'',
					username:''
				}
			}
		},
		methods:{
			addComment(){
				this.commentForm.date=this.getLocalTime();
				let that =this;
				uni.getStorage({
					key:'shopname',
					success(res) {
						that.commentForm.shopname=res.data;
						uni.getStorage({
							key:'myInfo',
							success(res) {
						that.commentForm.username=res.data.username;
						uni.request({
							url:'http://localhost:3000/addComment',
							method:'POST',
							data:{
								commentForm:that.commentForm
							},
							success(res) {
								if (res.data == 'success'){
									uni.showModal({
									content: '评论成功'
								});
								uni.removeStorage({
									key:'shopname'
								});
								uni.navigateBack({
										delta:1
									});
									
								}
								else return uni.showModal({
									content: '评论失败'
								});
							}
						})
					}
				});
					}
				});
				
				
			}
			,
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
	.main {
		padding: 10px;
		textarea {
			border:1px solid;
			width: 100%;
			margin-bottom: 20px;
			border-radius: 10px;
			font-size: 14px;
			padding: 10px;
			box-sizing: border-box;
		}
	}
</style>
