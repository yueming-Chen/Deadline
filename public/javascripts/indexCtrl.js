var data =[];
//實作修改、刪除
var add = function(){
	var eventCount = 0;
	var deadlineCount = 0;
	var commitImg = "https://cdn1.iconfinder.com/data/icons/mini-solid-icons-vol-3/16/143-128.png";
	for(var key in data){
		eventCount++;
		var start = data[key].start.split("/");
		var due = data[key].due.split('/');
		var nowDay = CalcDate(due);//現在剩餘幾天
		var progressDay = CalcProgress(due,start);//從一開始到截止有幾天
		var percentage = (progressDay - nowDay) / progressDay * 100;
		percentage = Math.round(percentage * 100) / 100;
		if (percentage>100) {percentage=100}
		if(nowDay <= 0){nowDay = "done"}
		$("#main").append("<tr id=" + data[key]._id + "><td>"+ data[key].method +"</td><td>"+data[key].start+
		"</td><td>"+data[key].due +	"</td><td>" + nowDay + 
		"</td><td><div class='progress'><div class='active progress-bar progress-bar-success progress-bar-striped'"+
		"role='progressbar'  aria-valuenow='" + percentage +"' aria-valuemin='0' aria-valuemax='100'  style='width:" +
		 percentage + "%'><div class='w3-center w3-text-white'>" + percentage +
		 "%</div></div></div></td><td>"+
		"<figure><img id='edit' class='icon' src='./img/edit.png'><img id='remove' class='icon' src='./img/remove.png'>"+
		"<img id='remove' class='icon' src='" + commitImg + "'></figure></td></tr>");
		if(percentage >= 50){
			deadlineCount++;
			$("#" + key).addClass("danger");
		} 
	}
	$("#eventAmount").text(eventCount);
	$("#deadAmount").text(deadlineCount);
	$("#deadPer").text(Math.round(deadlineCount/eventCount*10000)/ 100 + '%');
}

var CalcDate = function(dead){

	var date = new Date();
	var date1 = new Date(date.getFullYear(),date.getMonth(),date.getDate());
	var date2 = new Date(dead[0],dead[1]-1,dead[2]);
 	var days = ((date2 - date1) / (1000 * 60 * 60 * 24));
 	return days;
}

var CalcProgress = function(dead,due){

	var date1 = new Date();
	var date1 = new Date(due[0],due[1] - 1,due[2]);
	var date2 = new Date(dead[0],dead[1] - 1,dead[2]);
 	var days = ((date2 - date1) / (1000 * 60 * 60 * 24));
 	return days;
}

$(document).ready(function(){
	//call api to get Data
	data.length = 0;
	$.get('/Api/getList',function(d,status){
		data = d.results;
		console.log(data);
		add();
	});
});

$('#main').on('click','img',function(){
	var id = $(this).parentsUntil('tr').attr('id');
	console.log(id);
});