/**
 * 淘宝双十二活动脚本
 *
 * Author: YBQ789
 * Date: 2020/12/07
 * Versions: 2.1.0
 * Github: https://github.com/YBQ789/taobao-1212
 */

//全局参数
versions = 'V2.1.0';
width = device.width;
height = device.height;
speed = 1;
speedChooseList = ["正常", "快速", "缓慢"];
ChooseList = [1, 0.5,3.5];
txt = ["任务完成","任务已完成","任务已经全部完成啦"];  

//无障碍判定
try {
    auto();
} catch (error) {
    toast("请手动开启无障碍并授权给Auto.js");
    sleep(2000);
    exit();
}

//速度选择
function speedChoose() {
    var option = dialogs.singleChoice("选择运行速度", speedChooseList);
    if (option == -1) {
        toastLog("脚本已退出");
        exit();
    }
    speed = ChooseList[option];
}

//获取控件是否存在操作
function get(txt)
{
    return descContains(txt).exists() || textContains(txt).exists();
}

//升级领红包任务
function redEnvelopeStart()
{
    textContains("领欢乐币").waitFor();
    sleep(1000+1000*speed);
    if(get("领欢乐币")){
        textContains("领欢乐币").click();
    }    
    sleep(1000+1000*speed);
    if(get("去打卡")){
        console.info("去打卡");
        textContains("去打卡").click();
    }   
    sleep(1000+1000*speed); 
    num = 1;
    j=0;
    while(true){
        if(text("去完成").findOnce(j)!=null){
            t = className("android.widget.Button").text("去完成").findOnce(j).parent().child(0).child(0).text();
            if(t=="去芭芭农场施肥1次(0/1)"||t.split("(")[0]=="邀请5个好友一起玩"||t=="开通金币月卡得欢乐币(0/1)"||t=="去淘宝特价版领奖励！(0/1)"||t=="玩省钱消消消得欢乐币(0/1)"||t=="连续包月得欢乐币！(0/1)"){
                log("跳过-"+t.split("(")[0]+"-任务");
                j++;
            }else{
                while(true){
                    console.info("第"+num+"次去完成");
                    num++;
                    text("去完成").findOnce(j).click(); 
                    sleep(random(5500,7500)+1000*speed);
                    if(get("浏览")){   
                        while(true){
                            if(get(txt[0]) || get(txt[1]) || get(txt[2])){
                                break;
                            }else{
                                sleep(1000);
                            }
                        }
                        back();
                        break;
                    }else{
                        back();break;
                    }
                }
            }   
        }else{
            break;   
        }
        sleep(3000+1000*speed);
    }
    //立即领取任务
    count = 3;
    while(text("立即领取").exists()){
        text("立即领取").findOne().click();
        sleep(1000+1000*speed);
        count--;
        if(count<0){
            break;
        }
    }
}

//淘金币任务
function goldStart(){
    text("做任务赚金币").waitFor();
    sleep(6000+1000*speed);
    num = 1;
    j = 0;
    while(true){
        while(text("领取奖励").exists()){
            log("领取奖励");
            text("领取奖励").findOne().click();
            sleep(4000);
        }
        if(className("android.widget.Button").text("去领取").exists()){
            className("android.widget.Button").text("去领取").click();
            log("去领取，大约10秒");
            sleep(10000);
            back();
            sleep(5000);
        }
        if(className("android.widget.Button").text("去完成").findOnce(j)!=null){
            t = className("android.widget.Button").text("去完成").findOnce(j).parent().child(0).child(0).text();
            if(t=="逛蚂蚁庄园喂小鸡(0/1)"||t=="淘宝人生逛街领能量(0/1)"||t=="买猫超商品得淘金币(0/1)"||t=="逛省钱消消乐拿红包(0/1)"||t=="去天猫APP领红包(0/1)"||t=="惊喜！充话费拿金币(0/1)"){
                log("跳过-"+t.split("(")[0]+"-任务");
                sleep(1000);
                j++;
            }else{
                className("android.widget.Button").text("去完成").findOnce(j).click();
                console.info("第"+num+"次-"+t.split("(")[0]);
                num++;
                while(true){
                    sleep(random(5500,7500)+1000*speed);
                    if (textContains("浏览以下商品 10 秒").exists()) {
                        log("正在浏览商品，大约10秒");
                        sleep(10000);
                        back();
                        break;
                    }
                    if (t=="逛聚划算双11爆款(0/1)") {
                        log("正在浏览，大约10秒");
                        sleep(10000);
                        back();
                        break;
                    }
                    if (t.split("(")[0]=="每日来访领能量") {
                        sleep(500);
                        break;
                    }
                    if (t.split("(")[0]=="签到领话费充值金") {
                        log("正在浏览，大约10秒");
                        sleep(10000);
                        back();
                        break;
                    }
                    if (t=="看免费小说领能量(0/1)") {
                        log("正在浏览，大约10秒");
                        sleep(10000);
                        back();
                        break;
                    }
                    if(get("滑动浏览")){
                        while(true){
                            if(get(txt[0]) || get(txt[1]) || get(txt[2])){
                                toast("浏览完成");break;
                            }else{
                                sleep(1000);
                            }
                        }
                        back(); 
                        sleep(2000);
                        if(text("残忍离开").exists()){
                            text("残忍离开").click();
                            sleep(2000);
                        }
                        break;
                    }
                }
            }
            sleep(4000+1000*speed);
        }else{
            break;   
        }
    }
}

//开始运行
function run()
{
    //开启悬浮窗并设置大小
    console.show();
    sleep(500);
    console.setSize(width/1.5,height/5);
    //进入活动的链接和提示信息数组
    array = ["taobao://pages.tmall.com/wow/z/tmtjb/town/1212-home","taobao://pages.tmall.com/wow/z/tmtjb/town/task","正在进入升级领红包活动界面","正在进入淘金币活动界面"];
    //循环执行升级领红包任务和淘金币任务
    for(i=0;i<2;i++){
        log(array[i+2]);
        activityData = array[i];
        app.startActivity({
            action: "VIEW",
            data: activityData,
        });
        sleep(5000+1000*speed);
        if(i==0){
            redEnvelopeStart();
            log("------------");
        }else{
            goldStart();
            log("------------");
        }
    }
    //关闭悬浮窗
    console.info("脚本结束")
    sleep(500);
    console.hide();
}

//开始执行run
alert("【淘宝双十二活动脚本"+versions+"】\n\n脚本执行过程请勿手动点击屏幕，否则脚本执行可能会错乱，导致任务失败\n执行过程中可按音量+键终止\n\n执行淘宝任务时请确保使用低版本淘宝（V9.0.0及以下），否则无法获取奖励\n\n最新版脚本请到GitHub获取\nhttps://github.com/YBQ789/taobao-1212\n\nPowered By YBQ789");
speedChoose();
run();
alert("任务已完成！");
exit();

