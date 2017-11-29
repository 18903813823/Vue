<template>
    <div id="temp">
      <slider :imgs="list"></slider>
        <div id="buy">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li class="price">
                    市场价: <s>￥{{info.market_price}}</s>    销售价：<span>￥{{info.sell_price}}</span>
                </li>
                <li class="inputli">
                    购买数量：<inputNumber @dataobj="getinput"></inputNumber>
                    <transition name="show"
                                @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                            >
                        <div id="ball" v-if="isShow"></div>
                    </transition>
                </li>
                <li>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>

                </li>
            </ul>
        </div>

        <div id="params">
            <h6>商品参数</h6>
            <p class="line"></p>
            <ul>
                <li>商品货号：{{info.goods_no}}</li>
                <li>库存情况：{{info.stock_quantity}}</li>
                <li>上架时间：{{info.add_time | dateformt('YYYY-MM-DD')}}</li>
            </ul>
        </div>

        <!--3.0 图文详情-->
        <!--4.0 商品评论-->
        <div id="other">
            <router-link v-bind="{to:'/good/gooddesc/'+id}">
            <mt-button class="imgdesc" type="primary" size="large">图文详情</mt-button>
            </router-link>


            <router-link v-bind="{to:'/good/goodcomment/'+id}">
            <mt-button type="danger" size="large">商品评论</mt-button>
            </router-link>
        </div>

    </div>
</template>
<script>
    import inputNumber from"../subcom/inputNumber.vue"
    import slider from"../subcom/slider.vue";
    import common from"../kits/common.js";
    import {bus} from"../kits/vm.js";
    import {setitem,valueObj} from "../kits/locg.js";
 export default {
     components:{
         slider:slider,
         inputNumber:inputNumber

     },
     created:function(){
         this.get();
         this.getinfo()

     },
     data:function(){
         return{
             list:[],
             info:{},
             ainputNumber:1,
             isShow:false,
             id : 0  //表示商品id
         }
     },
     methods:{
         beforeEnter:function(el){
//				设定小球的初始位置
        el.style.transform = "translate(0px,0px)";
    },
    enter:function(el,done){
//				保证小球出现动画
        el.offsetWidth;

//				设置小球的结束位置
        el.style.transform = "translate(75px,366px)";

//				结束动画
        done();
    },
    afterEnter:function(el){
//			重置小球的初始状态
        this.isShow = !this.isShow;
    },
         getinput:function(input){
             this.ainputNumber=input
         },
         toshopcar:function(){
             bus.$emit("sCount",this.ainputNumber);
             valueObj.goodsid = this.id;
             valueObj.count = this.ainputNumber;
             setitem(valueObj);
             this.isShow = !this.isShow;

         },
         get:function(){
             this.id = this.$route.params.id;
             var url=common.apimin+'api/getthumimages/'+this.id

             this.$http.get(url).then(function(res){
                 this.list=res.body.message
             })
         },

      getinfo:function(){
             var url = common.apimin +'api/goods/getinfo/'+this.id;
             this.$http.get(url).then(function(res){
                 //判断状态
                 this.info =res.body.message[0];
             });
         }
     }
 }
</script>
<style scoped>

    .silder{
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
        margin: 5px;
    }

    #buy,#params,#other
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h4{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }

    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli{
        position: relative;
    }
    #ball{
        background-color: red;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        position: absolute;
        left:150px;
        top:10px;
        transition: all 0.4s ease;
        z-index: 100;
    }

</style>