/*
  経過時間
  year:基準となる西暦
  month:基準となる月
  day:基準となる日
  target:結果の文字列を表示するid要素
*/
function elapsedTime(start,goal){
	//var start = new Date(year,month,day);
	//var current = new Date();
  var target = $('<span></span>');
	// //一度空にする
	// target.empty();
	//年追加
	target.append(returnSpan('val',affixZero2(dateDiff(start,goal,'Y',false))));
	target.append(returnSpan('un','年'));
	//月追加
	target.append(returnSpan('val',affixZero2(dateDiff(start,goal,'YM',false))));
	target.append(returnSpan('un','ヶ月'));
	//日を追加
	target.append(returnSpan('val',affixZero2(dateDiff(start,goal,'MD',false))));
	target.append(returnSpan('un','日'));
	//時間を追加
	target.append(returnSpan('val',affixZero2(goal.getHours())));
	target.append(returnSpan('ul','時間'));
	//分
	target.append(returnSpan('val',affixZero2(goal.getMinutes())));
	target.append(returnSpan('un','分'));
	//秒
	target.append(returnSpan('val',affixZero2(goal.getSeconds())));
	target.append(returnSpan('un','秒'));
	//ミリ秒
	target.append(returnSpan('val',affixZero3(goal.getMilliseconds())));
  //
  return target;
}
/*
  カウントアップ
*/
function countup(start,target){
  //var start = new Date(year,month-1,day);
  var current = new Date();
  $(target).empty();
  $(target).append(elapsedTime(start,current));
}
/*
  カウントダウン
  target:結果の文字列を表示するid要素
*/
function countdown(goal,target){
  var current = new Date();
  //var goal = new Date(year,month-1,day);
  $(target).empty();
  $(target).append(elapsedTime(current,goal));
}

//<span class="c">t</span>を返す関数
function returnSpan(c,t){
	return $('<span></span>').addClass(c).text(t);
}

//2桁で左に0を埋める関数
function affixZero2(int){
	if(int < 10){
		int = "0" + int;
	}
	return "" + int;
}
//3桁で左に0を埋める関数
function affixZero3(int){
	if(int < 10){
		int = "00"+int;
	}else if(int < 100){
		int = "0"+int;
	}
	return ""+int;
}
function affixZero(num,digit){

}
/*
 *  日数または月数を加算
 *
 *  dt: 基準となる Date オブジェクト
 *  dd: 日数または月数
 *   u: 'D': dd は日数
 *      'M': dd は月数
 *
 */
var dateAdd = function(dt, dd, u) {
  if (typeof u == 'undefined') u = 'D';
  var y = dt.getFullYear();
  var m = dt.getMonth();
  var d = dt.getDate();
  var r = new Date(y, m, d);
  if (u == 'D') {
    r.setDate(d + dd);
  } else if (u == 'M') {
    var e1 = (new Date(y, m+1, 0)).getDate();
    m += dd;
    y += parseInt(m/12);
    m %= 12;
    var e2 = (new Date(y, m+1, 0)).getDate();
    r.setFullYear(y, m, (d == e1 || d > e2 ? e2 : d));
  }
  return r;
};
/*
 *  経過年・月・日数の計算
 *
 *  dt1: 開始年月日の Date オブジェクト
 *  dt2: 終了年月日の Date オブジェクト
 *    u:  'Y': 経過年数を求める
 *        'M': 経過月数を求める
 *        'D': 経過日数を求める
 *       'YM': 1年に満たない月数
 *       'MD': 1ヶ月に満たない日数
 *       'YD': 1年に満たない日数
 *    f: true: 初日算入
 *      false: 初日不算入
 */
var dateDiff = function(dt1, dt2, u, f) {
  if (typeof u == 'undefined') u = 'D';
  if (typeof dt2 == 'undefined') dt2 = new Date;
  if (f) dt1 = dateAdd(dt1, -1, 'D');
  var y1 = dt1.getFullYear();
  var m1 = dt1.getMonth();
  var y2 = dt2.getFullYear();
  var m2 = dt2.getMonth();
  var dt3, r = 0;
  if (u == 'Y') {
    r = parseInt(dateDiff(dt1, dt2, 'M') / 12);
  } else if (u == 'M') {
    r = (y2 * 12 + m2) - (y1 * 12 + m1);
    dt3 = dateAdd(dt1, r, 'M');
    if (dateDiff(dt3, dt2, 'D') < 0) --r;
  } else if (u == 'D') {
    dt1 = new Date(y1, m1, dt1.getDate());
    dt2 = new Date(y2, m2, dt2.getDate());
    r = parseInt((dt2-dt1)/(24*3600*1000));
  } else if (u == 'YM') {
    r = dateDiff(dt1, dt2, 'M') % 12;
  } else if (u == 'MD') {
    r = dateDiff(dt1, dt2, 'M');
    dt3 = dateAdd(dt1, r, 'M');
    r = dateDiff(dt3, dt2, 'D');
  } else if (u == 'YD') {
    r = dateDiff(dt1, dt2, 'Y');
    dt3 = dateAdd(dt1, r*12, 'M');
    r = dateDiff(dt3, dt2, 'D');
  }
  return r;
};