<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 1.0 template主要是放html元素的（html的页面结构） -->



		<mt-header fixed title="Vue项目商场"></mt-header>
		<div v-if="isshow" id="back">
			<a href="javascript:void(0)" @click="backto">返回</a>
		</div>
		<!-- 路由占位符 -->
		<router-view></router-view>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/Home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/car">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>



		<!-- 使用mint-ui中的button组件 -->

		<!-- 使用mui中的9宫格样式 -->
</div>

</template>

<script>
// 按需导入
import {bus} from"./components/kits/vm.js";
bus.$on("sCount",function(count){
	var badgeobj=document.querySelector("#badge");
	badgeobj.innerHTML=parseInt(badgeobj.innerHTML)+count;
})

	// 负责导出 .vue这个组件对象(它本质上是一个Vue对象,所以Vue中该定义的元素都可以使用)
	// function add(x,y){console.log(x+y)}	
	// module.exports = {  //es5的导出对象的写法
	export default{  // es6的导出对象的写法

		 data:function(){
			 return{
				 isshow:false
			 }
		 },
		methods:{
			backto:function(){
				this.$router.go(-1);
			}
		},
		watch:{
//			'$route':function(newroute,oldroute){
//				if(newroute.path.toLowerCase() == '/home'){
//					this.isshow = false;
//				}else{
//					this.isshow = true;
//				}
//			}


		$route:function(newroute,oldroute){
			 if(newroute.path.toLowerCase()=="/home"){
				 this.isshow=false;
			 }
			else{
				 this.isshow=true;
			 }

		}

		}

	}
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
#back{
	width: 60px;
	position: absolute;
	top:10px;
	left:10px;
	z-index: 101;
}
#back a{
	color:white;
	font-size: 16px;
	font-weight: bold;
}
</style>