Select the days when you had sex

<link href="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/calendar/assets/skins/sam/calendar.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/yahoo-dom-event/yahoo-dom-event.js"></script> 
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/calendar/calendar-min.js"></script>
<script>
Qualtrics.SurveyEngine.addOnload(
function(){
	var qid =this.questionId;
	var calid = qid +'_cal';
	var y =QBuilder('div');
  $(y).setStyle({clear:'both'});
  var d =QBuilder('div',{className:'yui-skin-sam'},[QBuilder('div',{id:calid}),y]);
  var c =this.questionContainer;
  c = $(c).down('.QuestionText');
  c.appendChild(d);
  var cal1 =new YAHOO.widget.Calendar(calid, { MULTI_SELECT: true }); 
  cal1.render();
  var input = $('QR~'+ qid);
  $(input).setStyle({marginTop:'20px',width:'800px'});
  var p =$(input).up();
  var x =QBuilder('div');
  $(x).setStyle({clear:'both'});
  p.insert(x,{position:'before'});
    var resp = "";
	var delimiter = ',';
	cal1.selectEvent.subscribe(function(e,dates){
		var date = dates[0][0];
		if(date[1]<10)
			date[1]='0'+ date[1];
		if(date[2]<10)
			date[2]='0'+ date[2];
		selected_date = date[1]+'-'+date[2]+'-'+date[0];
		if (resp == "") {
			resp = selected_date;
			} else {
			resp = resp + delimiter + selected_date;
			};
		input.value = resp;
});
cal1.deselectEvent.subscribe(function(e,dates){
		var date = dates[0][0];
		if(date[1]<10)
			date[1]='0'+ date[1];
		if(date[2]<10)
			date[2]='0'+ date[2];
		selected_date = date[1]+'-'+date[2]+'-'+date[0];
		//does the resp contain the selected date at the beginning (with more than one) or in the middle
		if (resp.indexOf(selected_date+delimiter) !== -1) {
			resp = resp.replace(selected_date+delimiter, "");
		//is the date at the end?
		} else if (resp.indexOf(delimiter+selected_date) !== -1) {
			resp = resp.replace(delimiter+selected_date, "");
		//is the date at the beginning?
		} else if (resp.indexOf(selected_date) !== -1)
			resp = resp.replace(selected_date, "");
		input.value = resp;
		});
});
</script>