;(function(){
    var lower = document.getElementById("lower")
    var api = "http://210.12.220.75:10036/Vegetables"
    // 出库的批次号
    // $.ajax({
    //     url:api+"/retrieval/getNumber.action",
    //     type:"get",
    //     datatype:"json",
    //     success:res=>{
    //         console.log(res)
    //     }
    // })
    // 生产的批次号
    $.ajax({
        url:api+"/info/getPccode.action",
        type:"get",
        datatype:"json",
        success:res=>{
            console.log(res)
            display(res.Back)
        }
    })
    function display(data){
        for(var i=0;i<data.length;i++){
                var n = data[i]
                var option = document.createElement("option")
                option.innerHTML = `${n}`
                lower.appendChild(option)
        }
    }
    lower.onchange = ()=>{
        if(lower.value=="0"){
            toastr.info("请选择批次");
            return
        }
        // 根据批次号 得到蔬菜
        $.ajax({
            url:api+"/product/getVegetables.action",
            type:"get",
            datatype:"json",
            data:{
                "pccode":lower.value
            },
            success:res=>{
                console.log(res)
                console.log(res.Back)
                if(res.Back==null){
                    toastr.warning("此批次暂无信息");
                    ("请选择批次");
                }
            }
        })
    }
})()