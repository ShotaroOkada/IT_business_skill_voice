/**
 * 公立はこだて未来大学　高度ICT ビジネススキル 開発技術 2019年度
 * Honda Research Institute JP 提供
 * Author: Yukihisa Yonemochi
 * Date: 2019/09/17
 *
 * input: マイクからの入力テキスト
 * return スピーカーから発話したいテキストを返してください。
 * だまっていたいときは . （ピリオド）を返してください。
 */
var response = function(input){
    if(input.indexOf('こんにちは')!= -1){
        return 'はい、こんにちは';
    } else
    if(input.indexOf('今何時') != -1){
        var date = new Date();
        return date.getHours() + '時' + date.getMinutes() + '分です';
    } else
    if(input.indexOf('今日') != -1 && input.indexOf('何日') != -1){
        var date = new Date();
        return (date.getMonth()+1) + '月' + date.getDate() + '日です';
    }
    return '.';
}