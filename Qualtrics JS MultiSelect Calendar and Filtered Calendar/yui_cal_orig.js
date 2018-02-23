Please Choose a Date

<link href="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/calendar/assets/skins/sam/calendar.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/yahoo-dom-event/yahoo-dom-event.js"></script> 
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/yui/2.9.0/build/calendar/calendar-min.js"></script>
<script>Qualtrics.SurveyEngine.addOnload(function(){var qid =this.questionId;var calid = qid +'_cal';var y =QBuilder('div');
  $(y).setStyle({clear:'both'});var d =QBuilder('div',{className:'yui-skin-sam'},[QBuilder('div',{id:calid}),
    y
  ]);var c =this.questionContainer;
  c = $(c).down('.QuestionText');
  c.appendChild(d);var cal1 =new YAHOO.widget.Calendar(calid, { MULTI_SELECT: true }); 
  cal1.render();var input = $('QR~'+ qid);
  $(input).setStyle({marginTop:'20px',width:'150px'});var p =$(input).up();var x =QBuilder('div');
  $(x).setStyle({clear:'both'});
  p.insert(x,{position:'before'});
  resp = ""
	cal1.selectEvent.subscribe(function(e,dates){
		var date = dates[0][0];
		if(date[1]<10)
			date[1]='0'+ date[1];
		if(date[2]<10)
			date[2]='0'+ date[2];
		input.value = date[1]+'-'+date[2]+'-'+date[0];
	}
	)});</script>