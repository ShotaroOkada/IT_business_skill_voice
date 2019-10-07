/**
 * 公立はこだて未来大学　高度ICT ビジネススキル 開発技術 2019年度
 * Honda Research Institute JP 提供
 * Author: Yukihisa Yonemochi
 * Date: 2019/09/17
 */
 
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
/**
 * 音声認識を制御するオブジェクト
 */
var Recorder = {
    recognition : null,
    prevText: "",
    init: function(){
        var o = this;
        o.recognition = new SpeechRecognition();
        o.recognition.lang = 'ja';
        o.recognition.continuous = true;
        o.recognition.interimResults = true;
    },
    recStart: function(){
        var o = this;
        o.recognition.start();
    },
    recStop: function(){
        var o = this;
        o.recognition.stop();
    },
    getRecText: function(results, resultIndex){
        var o = this;
        var text;
        for(var i = resultIndex; i < results.length; i++){
            var result = results.item(i);
            var cText = result.item(0).transcript;
            console.log(cText);
            if(o.prevText == cText){
                o.recognition.stop();
            }
            o.prevText = cText;
            if(result.final === true || result.isFinal === true){
                text = result.item(0).transcript;
            }
        }
        return text;
    }
}
 
/**
 * 音声合成を制御するオブジェクト
 */
var Speaker = {
    synthes: null,
    init: function(){
        var o = this;
        o.synthes = new SpeechSynthesisUtterance();
        o.synthes.lang = "ja-JP"
    },
    say: function(msgText){
        var o = this;
        o.synthes.text = msgText;
        speechSynthesis.speak(o.synthes);
    }
}
 
/**
 * 画面表示を制御するオブジェクト
 */
var View = {
    getResultItem: function(text){
        var el = document.createElement('li');
        el.textContent = text;
        return el;
    }
}
 
/**
 * アプリ全体
 */
var App = {
    el: {
        recBtn: document.getElementById('recPlayer__recBtn'),
        resultList: document.getElementById('recPlayer__results')
    },
    status: {
        nowRec: false,
        recorderText: ''
    },
    init: function(){
        var o = this;
        Recorder.init();
        Speaker.init();
        // ボタン押し下げ接続
        o.el.recBtn.onclick = function(){
            if(o.status.nowRec){
                Recorder.recStop();
            }
            else{
                Recorder.recStart();
            }
        };
        // ボタン開始処理
        Recorder.recognition.addEventListener('start',  function(){
            o.status.nowRec = true;
            o.el.recBtn.textContent = '停止';
        });
        // ボタン終了処理
        Recorder.recognition.addEventListener('end', function(){
            o.status.nowRec = false;
            o.el.recBtn.textContent = '録音';
        });
        // 音声認識結果処理
        Recorder.recognition.addEventListener('result', function(event){
            var text = Recorder.getRecText(event.results, event.resultIndex);
            if(text == null) return;
            o.el.resultList.insertBefore(
                View.getResultItem(text),
                o.el.resultList.firstChild
            );
            output = response(text);
            if(output != '.') {
                console.log(' > '+output);
            }
            Speaker.say(output);
        });
        // 音声発話終了時（発話が終わってから音声認識をスタートすることでエコーを抑制する）
        Speaker.synthes.addEventListener('end', function(){
            console.log('Speech ended.');
            if(o.status.nowRec){
                Recorder.recStop();
                Recorder.recStart();
            }
            else{
                Recorder.recStart();
            }
        });
        alert('Google Speech API has successfully initialized.');
    }
}
App.init();