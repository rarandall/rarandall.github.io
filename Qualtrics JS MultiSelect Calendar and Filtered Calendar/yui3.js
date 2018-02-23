Qualtrics.SurveyEngine.addOnload(function()
{
	var today = new Date();
	var sixweeksago = new Date();
	sixweeksago.setDate(sixweeksago.getDate()-42);
YUI().use('calendar', function (Y) {
  var calendar = new Y.Calendar({
          contentBox: "#mycalendar",
		  customRenderer: {
            rules: {
                2017: {
                    8: {
                        5: "mydisableddays",
                        1: "mydisableddays"
                    }
                }
            }
        },
          height:'300px',
          width:'300px',
          showPrevMonth: true,
          showNextMonth: false,
		  selectionMode: "multiple-sticky",
		  minimumDate: sixweeksago,
		  maximumDate: today,
		  enabledDatesRule: "mydisableddays"
          
}).render();
calendar.on("selectionChange", function (e,dates){
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
});
});