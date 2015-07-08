/*
  経過時間
  year:基準となる西暦
  month:基準となる月
  day:基準となる日
  target:結果の文字列を表示するid要素
*/
function elapsedTime(start,goal,target){
	//var start = new Date(year,month,day);
	//var current = new Date();
  //var t = $(target);
  var elapsed = new Date(goal-start);
	// //一度空にする
	// target.empty();
  	//var year = elapsed.getUTCFullYear()-1970;
  	//var month = elapsed.getUTCMonth();
  	var date = Math.floor((goal-start)/(1000 * 60 * 60 *24));
  	var hours = elapsed.getUTCHours();
  	var minutes = elapsed.getUTCMinutes();
  	var seconds = elapsed.getUTCSeconds();
  	var milli = elapsed.getUTCMilliseconds();
	//年追加
	//target.append(returnSpan('val year',('0'+year).slice(-2)));
	//target.append(returnSpan('un','年'));
	//月追加
	//target.append(returnSpan('val month',('0'+month).slice(-2)));
	//target.append(returnSpan('un','ヶ月'));
	//日を追加
	//$(target + ' #day').empty();
	$(target + ' #day .val').text(date);
	//$(target + ' #day').append(returnSpan('un date','DAYS'));
	//時間を追加
	//$(target + ' #time').empty();
	$(target + ' #time .val.hours').text(('0'+hours).slice(-2));
	//$(target + ' #time').append(returnSpan('ul hours',':'));
	//分
	//$(target + ' #time').empty();
	$(target + ' #time .val.minutes').text(('0'+minutes).slice(-2));
	//$(target + ' #time').append(returnSpan('ul hours',':'));
	//秒
	//$(target + ' #time').empty();
	$(target + ' #time .val.seconds').text(('0'+seconds).slice(-2));
	//$(target + ' #time').append(returnSpan('un seconds',' '));
	//ミリ秒
	//$(target + ' #time').empty();
	$(target + ' #time .val.milliseconds').text(('00'+milli).slice(-3));
  //
  //return goal-start;
}
/*
 * ２つの日付の差を計算しtargetに出力する関数
*/
function difference(start,goal,target){
  //$(target).empty();
  if(start.getTime() > goal.getTime()){
    //startがgoalよりも後ろなら
    //start-goalの計算
    $(target).append(elapsedTime(goal,start,target));
  }else{
    $(target).append(elapsedTime(start,goal,target));
  }
}

//<span class="c">t</span>を返す関数
function returnSpan(c,t){
	return $('<span></span>').addClass(c).text(t);
}