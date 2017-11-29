<template >
    <div id="temp">
        <h4>评论</h4>
        <p id="postline"></p>
        <textarea v-model="postcotent"></textarea>
        <mt-button type="danger" size="large" @click="getshuju">发表</mt-button>


        <div id="list">
            <h3>评论列表</h3>
            <p class="p"></p>
            <div v-for="(item,index) in list">
                <div class="title">
                    <span>第{{index + 1}}楼:</span>
                    <span>用户：{{item.user_name}}</span>
                    <span>发表时间：{{item.add_time | dateformt("YYYY-MM-DD HH:mm:ss")}}</span>
                </div>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
                </ul>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>




</template>

<script>
    import common from '../kits/common.js';
    import { Toast } from 'mint-ui';
    export default {
        created:function(){
            this.getlist(this.pageindex)
        },
       props:["id"],
        data:function(){
            return{
                pageindex:1,
                postcotent:"",
                list:[],

            }

    },



        methods:{

            getmore:function(){
                this.pageindex++;
                this.getlist(this.pageindex);

            },

            getlist:function(pageindex){
                var url= common.apimin +'api/getcomments/'+this.id+'?pageindex='+pageindex;
                this.$http.get(url).then(function(res){
                    if(res.body.status != 0 ){
                        Toast(res.body.message);
                        return;
                    }
                    this.list = this.list.concat(res.body.message)

                })

            },

        getshuju:function(){
            if(this.postcotent.trim().length == 0){
                Toast('您要评论的内容不能为空');
                return;
            }

           var url =common.apimin+'api/postcomment/'+this.id;
            this.$http.post(url,{content:this.postcotent},{emulateJSON:true}).then(function(res){
                Toast(res.body.message);
                this.list = [{
                    "user_name": "匿名用户",
                    "add_time": new Date(),
                    "content": this.postcotent
                }].concat(this.list);
                this.postcotent = '';
            })

        }
    }


    }
</script>

<style scoped>
 #postline{
     height: 1px;
     width: 100%;
     background-color: rgba(0,0,0,0.3);

 }
    #temp{
        padding: 5px;
    }
 #list{
         padding: 5px;
     }
 .title{
     padding: 5px;
     color: #6d6d72;
     font-size: 15px;
     background-color: rgba(0,0,0,0.1);
 }

</style>