Qualtrics.SurveyEngine.addOnload(function()
{
	var qid =this.questionId;
	var today = new Date();
	var sixweeksago = new Date();
	sixweeksago.setDate(sixweeksago.getDate()-42);
	var input = $('QR~'+ qid);
	$(input).setStyle({marginTop:'20px',width:'800px',display:'none'});
	var resp = "";
	var delimiter = ',';
	function formatDate(value)
{
   return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear();
}
function datearray2filter(dates) {
        var ret = {};
        for (var i in dates) {
            var d = new Date(dates[i]),
                y = d.getFullYear(),
                m = d.getMonth();
            if (!ret[y]) ret[y] = {};
            if (!ret[y][m]) ret[y][m] = {};
            ret[y][m][d.getDate()] = "mydisableddays";
        }
        return ret;
    };
var stringdates = "${e://Field/ssdates}";
var arraydates = stringdates.split(',');
console.log(arraydates);
var ruledates = datearray2filter(arraydates);

YUI().use('calendar', function (Y) {
  var calendar = new Y.Calendar({
          contentBox: "#mycalendardd",
          height:'300px',
          width:'290px',
          showPrevMonth: true,
          showNextMonth: false,
		  selectionMode: "multiple-sticky",
		  minimumDate: sixweeksago,
		  maximumDate: today,
		  customRenderer: {
            rules: ruledates},
		  enabledDatesRule: "mydisableddays"
}).render();

calendar.on('selectionChange', function(e) {
		resp = [];
		var selected_dates = e.newSelection;
		var arrayLength = selected_dates.length;
		for (var i = 0; i < arrayLength; i++) 
		{
		resp.push(formatDate(selected_dates[i]));
		//console.log(resp);
};
	  input.value = resp;
    });

});
});
