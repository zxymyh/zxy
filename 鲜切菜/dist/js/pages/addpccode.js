;(function(){
    var api = "http://210.12.220.75:10036/Vegetables"
    // 查询库存信息
    auto()
    function auto(){
        var news = document.getElementById("news")
        $.ajax({
        url:api+"/kcxx/list.action",
        datatype:"json",
        type:"get",
        data:{"pageNum":1},
        success:(res)=>{
            console.log(res)
                show(res,news)
        }
        })
    }
    function show(data,obj){
        for(var i=0;i<data.length;i++){
            var o = data[i];
            var tr = document.createElement('tr');
            tr.innerHTML = `<td>${i+1}</td>
                        <td>${o.type}</td>
                        <td>${o.zl}kg</td>
                        <td>${o.place}</td>
                        <td>出入库信息完整，采用的自定义鲜切菜，节水率提升</td>
            `
           obj.appendChild(tr)
        }
    }
    // 获取所有的input的name
    var obj = $("#inp_rop").serializeArray()
    var inp = $("#inp_rop input")
    var sel = $("#inp_rop select")
    var reNumber = /^\d+$/
    // 失焦验证
    
    function yz1(){
        if(sel[0].value=="0"){
            toastr.warning("请选择蔬菜");
            return true;
        }
    }
    function yz(){
        if(inp[0].value==""){
            toastr.warning("重量不能为空");
            return true;
        }else if(!reNumber.test(inp[0].value)){
            toastr.warning("请输入数字");
            return true
        }
    }
    var repeat = document.getElementById("repeat")
    var add = document.getElementById("add")
    repeat.onclick = function(){
        sel[0].value="0"
        inp[0].value=""
        inp[1].value=""
    }
    var arr= ""
    // 添加批次
    
    add.onclick = function(){
        // yz()
        // yz1()
        var arr = null
        if(yz1() || yz()){
            return 
        }else{
            $.ajax({
                url:api+"/info/getPccode.action",
                async:false,
                type:"get",
                datatype:"json",
                success:res=>{
                    arr = res.Back
                }
            })
            for(var i=0;i<arr.length;i++){
                if(inp[1].value==arr[i]){
                    toastr.warning("该批次已经存在");
                    return
                }
            }
            $.ajax({
                url:api+"/product/addpc.action",
                datatype:"json",
                type:"get",
                data:{
                    "pccode":inp[1].value,"scname":sel[0].value,"weight":inp[0].value
                },
                success:(res)=>{
                    if(res.Back=="true"){
                        $(".show").eq(1).hide(500)
                        $(".modal-dialog").hide(500)
                        toastr.success("添加批次成功");
                    }
                }
            })
        }
    }   
   
   
})()