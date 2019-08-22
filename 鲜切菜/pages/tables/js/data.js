;(function(){
    var api = "http://210.12.220.75:10036/Vegetables"
    var data_rop = document.getElementById("data_rop")
    $.ajax({
        url:api+"/info/getAllByPage.action",
        datatype:"json",
        async:false,
        type:"get",
        data:{
            "pageNum":1
        },
        success:(res)=>{
            console.log(res)
            auto(res)
        }
    })
    function auto(data){
        for(var i =0;i<data.length;i++){
            var d= data[i]
            var tr = document.createElement("tr")
            tr.innerHTML = `
                            <td>${d.pccode}</td>
                            <td>${d.beginTime}</td>
                            <td>${d.endtime}+</td>
                            <td>${d.operator}</td>
                            <td>不知道</td>
                            <td>${d.weight}</td>
                            <td>${d.zll}</td>
                            <td>0000000</td>
                            <td>0000000</td>
                            <td><button class="btn btn-primary" onclick="look(${d.id})">查看</button></td>
                            `
              data_rop.appendChild(tr)
        }
    }
})()
var api = "http://210.12.220.75:10036/Vegetables"
function look(id){
    console.log(id)
    $.ajax({
        url:api+"/info/detail.action",
        type:"get",
        datatype:"json",
        data:{
            "id":1
        },
        success:res=>{
            console.log(res)
        }
    })
}