
$("#submit").click(function(){
	var event = $('#event').val();
	var start = $('#start').val();
	var due = $('#due').val();
	console.log(event+"asd"+start+"a"+"due");
	if (event && start && due) {
		//檢查日期是否正確
		$.post('/Api/upload',{method: event,start:start,due:due},function(d ,s){
			console.log('success');
		});
	}
});