<template>
    <div id="temp">
        <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{ info.add_time | dateformt('YYYY-MM-DD') }}  {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content" ></div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
 import common from"../kits/common.js";
 import comment from"../subcom/comment.vue";

    export default{

        data(){
        return {
            id: 0,
            info: {

            }
        }
    },
 components:{
     comment:comment
 },
    created()
    {

        this.id = this.$route.params.id;

        this.getinfo();
    },
    methods:{
        getinfo(){
//
            var url =common.apimin+ "api/getnew/"+this.id;

//
            this.$http.get(url).then(function(res){
                var body = res.body;
                if(body.status != 0){
                    alert(body.message);
                    return;
                }

//
                this.info = body.message[0];
            });
        }
    }
    }

</script>

<style scoped>
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,#content{
        padding: 5px;
    }

</style>