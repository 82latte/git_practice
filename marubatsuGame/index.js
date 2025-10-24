//マークを定義
const CIRCLE = "●";
const CROSS = "×";
const ID_LIST = [
    ["cell_1","cell_2","cell_3",],
    ["cell_4","cell_5","cell_6",],
    ["cell_7","cell_8","cell_9",],
]

let turn = 1;
let isRun = true;
$("tools_result").style.display = "none";

function isCircle() {
    return turn % 2 === 1;
}

function $(id){
   return document.getElementById(id);
}

function winLossResult (message){
    isRun = false;
    $("tools_nowPlayer").style.display = "none";
    $("tools_result").style.display = "block";
    return $("tools_result").innerHTML = message;
}

//クリックした時のアクション
function clickToCheck(e){
    if(!isRun) return;
    let id = e.target.id;
    let object = $(id);
    if (object.value !== "") return;
    if (isCircle()) object.value = CIRCLE;
    else object.value = CROSS;
    if(completeMark()) return; 
    turn ++;
    changeNowPlayer();
}

//二次元配列上の位置指定
function onLoadAction(){
    for (let row = 0; row < 3; row++ ){
        for( let col = 0; col < 3; col++ ){
            $(ID_LIST[row][col]).onclick = clickToCheck;
        }
    } 
}

// 3つのマス目が同じマークかどうか判定する関数（終了判定）
function isComplite(firstId,secondId,thirdId){
// 3つのマス目にマークが入っていなければ、この関数の処理は終了(return)する
    if ($(firstId).value === "" || $(secondId).value === "" || $(thirdId).value === "") return;
// 3つのマス目のマークが同じマークなら、trueを返す
     else if ($(firstId).value === $(secondId).value && $(secondId).value === $(thirdId).value) return true;
// 同じマークでなけれfalseを返す 
     else return false;
}
    

//揃っている場所を調べる関数
function completeMark(){
    let isEnd = false;
//横一列の処理
    for (let row = 0; row < 3; row++){
        isEnd = isComplite(ID_LIST[row][0],ID_LIST[row][1],ID_LIST[row][2]);
        if (isEnd) {
            winLossResult($(ID_LIST[row][0]).value + "の勝利");
            return true;
        }
    }
//縦一列の処理
    for (let col = 0; col < 3; col++){
        isEnd = isComplite(ID_LIST[0][col],ID_LIST[1][col],ID_LIST[2][col]);
        if (isEnd){
            winLossResult($(ID_LIST[0][col]).value + "の勝利");
            return true;
        }
    }
//斜めの処理（左）
    isEnd = isComplite(ID_LIST[0][0],ID_LIST[1][1],ID_LIST[2][2]);
        if (isEnd) {
            winLossResult($(ID_LIST[0][0]).value + "の勝利");
            return true;
        }
//斜めの処理（右）
    isEnd = isComplite(ID_LIST[2][0],ID_LIST[1][1],ID_LIST[0][2]);
        if (isEnd){
            winLossResult($(ID_LIST[2][0]).value + "の勝利");
            return true;
        }
    if (turn >= 9){
        winLossResult("引き分け");
        return true;
    }
    return false;
}

//プレイヤー表示
function changeNowPlayer(){
    if (isCircle()) $("tools_nowPlayer").innerHTML = CIRCLE + " のターン";
    else  $("tools_nowPlayer").innerHTML = CROSS + " のターン";
}


function resetAction(){
    turn = 1;
    changeNowPlayer();
    for (let row = 0; row < 3; row++ ){
        for( let col = 0; col < 3; col++ ){
            $(ID_LIST[row][col]).value = "";
        }
    }
    winLossResult("");
    isRun = true;
    $("tools_result").style.display = "none";
    $("tools_nowPlayer").style.display = "block";
    return;
}

 $("tools_resetButton").onclick = resetAction;


//読み込み完了でスタート
window.onload = onLoadAction;