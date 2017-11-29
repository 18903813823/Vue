
export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};

export function setitem(value){
    var jsonstring=localStorage.getItem(KEY);
    jsonstring = jsonstring || '[]';
    var arr=JSON.parse(jsonstring);
    arr.push(value);
    localStorage.setItem(KEY,JSON.stringify(arr));






}



export function getitem(){

    var jsonstring =localStorage.getItem(KEY);
    jsonstring= jsonstring|| '[]';
    return JSON.parse(jsonstring)

}


//export function getitem(){
//    var jsonString =  localStorage.getItem(KEY);
////    将json格式字符串转换成 js对象
//    // jsonString：是一个标准的json格式
//    jsonString = jsonString || '[]';
//
//    return JSON.parse(jsonString);
//}




//export function getgoodsObject(){
//    var arr  = getitem();
//    console.log(arr);
//// 将arr数组中的goodid相同的多个对象合并成同一个对象
//    var resObj ={};
//    for(var i = 0 ; i<arr.length; i++){
//        var item = arr[i];
//        if(!resObj[item.goodsid]){
//            //    如果没有当前商品的数据，则添加一个数据
//            resObj[item.goodsid] = item.count;
//        }else{
//            //    已经有当前商品的数据了，则将cont追加
//            var count = resObj[item.goodsid];
//            resObj[item.goodsid] = count + item.count;
//        }
//    }
//
//    return resObj;
//
//
//}

export  function getgoodsObject(){
    var arr=getitem();
    var resObj={};

    for(var i=0; i<arr.length;i++){
        var item=arr[i];
        if(!resObj[item.goodsid]){
            resObj[item.goodsid]=item.count
        }else{
            var count =resObj[item.goodsid];
            resObj[item.goodsid]=count+item.count;
        }
    }
    return resObj
}


//export  function getgoodsObject(){
//    var arr=getitem();
//    var resObj={};
//    for(var i=0;i<arr.length;i++){
//
//        var item =arr[i];
//        if(!resObj[item.goodsid])
//        {
//            resObj[item.goodsid]=item.count
//        }else{
//            var count=resObj[item.goodsid];
//            resObj[item.goodsid]=count+item.count;
//        }
//    }
//    return resObj
//}


export function updateData(obj){
    var arr  = getitem();

    var count = 1;
    if(obj.type =='add'){
        //加
        arr.push({goodsid:obj.goodsid,count:count});
    }else{
        //减
        for(var i =0 ;i < arr.length ; i++){
            //如果这个对象中的count值等于1，则删除这个对象，否则将这个对象的count减1以后保存回去
            if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1){
                    arr[i].count = arr[i].count -1;
                    break;
                }else{
                    //删除此对象
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }

//    将最新的arr保存回localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));

}


export function remoteItem(goodsid){
var arr=getitem();
    for(var i=arr.length-1;i>=0;i--){

        if(arr[i].goodsid==goodsid){
            arr.splice(i,1);
        }
    }

    localStorage.setItem(KEY,JSON.stringify(arr));

}