var width  = device.width, height = device.height;
//获取控件是否存在操作
function get(txt)
{
    return descContains(txt).exists() || textContains(txt).exists();
}
//开始运行
function run()
{
    setScreenMetrics(width, height);
    toast("设备宽："+width+"，高："+height);
    launchApp("手机淘宝");
    sleep(3000);
    //进入搜索界面
    var text = "搜索";
    if(get(text)){
        var widget = id("search_icon").findOne().bounds();
        click(widget.centerX(),widget.centerY());
        sleep(1000);
        setText("欢乐造红包");
        sleep(1000);
        textContains(text).click();
        sleep(1000);
        start();
    }
}
//任务开始
function start()
{
    console.show();
    console.setPosition(0, 0);
    sleep(1000);
    console.setSize(width/1.5,height/5);
    textContains("领欢乐币").waitFor();
    sleep(1500);
    if(get("领欢乐币")){
        console.info("领欢乐币");
        textContains("领欢乐币").click();
    }    
    sleep(1500);
    if(get("去打卡")){
        console.info("去打卡");
        textContains("去打卡").click();
    }   
    sleep(1500);
    var title = ["去完成"];
    for(var i = 0; i < title.length; i++){
        num = 1;
        while(true){
            var flag = get(title[i]);
            toast("["+title[i]+"]返回值为："+flag);
            if(flag){
                console.info("第"+num+"次"+title[i]);
                num++;
                goto(title[i])
            }else{
                break;   
            }
            sleep(3000);
        }
    }
    while(get("立即领取")){
        textContains("立即领取").findOne().click();
        console.info("立即领取");
        sleep(1500);
    }
    console.info("脚本结束")
    sleep(500);
    console.hide();
    exit();
}
//访问页面
function goto(act)
{  
    textContains(act).findOne().click();       
    //如果过去15秒后没有 任务完成 等字样则 已时间判断超时回到上一页
    sleep(random(6500,8500));
    var txt = ["任务完成","任务已完成","任务已经全部完成啦"];
    while(true){           
        sleep(18000);
        if(get(txt[0]) || get(txt[1]) || get(txt[2])){
            toast("浏览完成"); back(); break;
        }else{
            back(); break;
        }
    }
}
 
//开始执行run
run();