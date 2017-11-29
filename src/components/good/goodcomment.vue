<template>
    <div id="temp">
     <comment :id="id">

     </comment>
    </div>
</template>

<script>
    import comment from"../subcom/comment.vue"
    export default {
        data:function(){
            return{
                id:0
            }
        },
        created:function(){
            this.id=this.$route.params.id
        },
        components:{
            comment:comment
        }
    }
</script>

<style scoped>

</style>