<template>
    <div id="tep">
        <div @click="substrict" class="div">-</div>
        <div v-text="initCount" class="div"></div>
        <div @click="add" class="div">+</div>
    </div>
</template>

<script>
    export default {
        props:['initCount','goodsid'],
        data:function(){
            return{
                count:1,
                resObj:{goodsid:0,type:'add'}

            }

        },

        created:function(){
            this.count = this.initCount;

        },
        methods:{
            add:function(){
                this.count++;
                this.sendmessage('add');
            },
            substrict:function(){

                this.count--;
//				确保最小值为1
                if(this.count <1){
                    this.count = 1;
                    return;
                }
                this.sendmessage('substrict');
            },
            sendmessage:function(type){
                this.resObj.type = type;
                this.resObj.goodsid = this.goodsid;
                this.$emit("cardataobj",this.resObj)
            }
        }

    }
</script>
<style scoped>
    #tep .div{
        width: 40px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #000;
        display: inline-block;
        text-align: center;
    }
</style>