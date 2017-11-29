<template>
    <div id="tep">
         <div @click="substrict" class="div">-</div>
        <div v-text="account" class="div"></div>
        <div @click="add" class="div">+</div>
    </div>
</template>

<script>
    export default {

        data:function(){
            return{
             account:1
            }

        },
        methods:{
            add:function(){
                this.account++;
                this.sendmessage()
            },
            substrict:function(){

                this.account--;
                if(this.account<=1){
                    this.account=1
                }
                this.sendmessage()
            },
            sendmessage:function(){
                this.$emit("dataobj",this.account)
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