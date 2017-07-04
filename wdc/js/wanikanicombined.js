(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var combined_cols = [{
            id: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "username",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "user_level",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "creation_date",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "about",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "website",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "twitter",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "topics_count",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "posts_count",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "vacation_date",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "level",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "character",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "meaning",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "srs",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "unlocked_date",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "available_date",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "burned",
            dataType: tableau.dataTypeEnum.bool
        }, {
            id: "burned_date",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "meaning_correct",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "meaning_incorrect",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "meaning_max_streak",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "meaning_current_streak",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reading_correct",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reading_incorrect",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reading_max_streak",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "reading_current_streak",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "onyomi",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kunyomi",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "important_reading",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kana",
            dataType: tableau.dataTypeEnum.string
        }];

        var combinedTable = {
            id: "combinedTable",
            columns: combined_cols
        };
		
		//schema for level progression
		var level_progression_cols = [{
            id: "radicals_progress",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "radicals_total",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "kanji_progress",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "kanji_total",
            dataType: tableau.dataTypeEnum.int
        }];

        var levelProgressionTable = {
            id: "LevelProgression",
            alias: "Level Progression Data",
            columns: level_progression_cols
        };
		
		//schema for critical items
		var critical_items_cols = [{
            id: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "character",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kana",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "meaning",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "level",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "percentage",
            dataType: tableau.dataTypeEnum.int
        }];

        var criticalItemsTable = {
            id: "CriticalItemsTable",
            alias: "Critical Items",
            columns: critical_items_cols
        };
	
        schemaCallback([combinedTable, levelProgressionTable, criticalItemsTable]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
	combinedTable = [];
		
		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/radicals", function(resp) {
			var ri = resp.requested_information;
			// Iterate over the JSON object
			for (i = 0, len = ri.length; i < len; i++) {
				combinedTable.push({
					"type": 'radical',
					"username": resp.user_information.username,
					"user_level": resp.user_information.level,
					"title": resp.user_information.title,
					"creation_date": resp.user_information.creation_date,
					"about": resp.user_information.about,
					"website": resp.user_information.website,
					"twitter": resp.user_information.twitter,
					"topics_count": resp.user_information.topics_count,
					"posts_count": resp.user_information.posts_count,
					"vacation_date": resp.user_information.vacation_date,
					"level": ri[i].level,
					"character": ri[i].character,
					"meaning": ri[i].meaning,
					"srs": (ri[i].user_specific == null) ? "" : ri[i].user_specific.srs,
					"unlocked_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.unlocked_date,
					"available_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.available_date,
					//"percentage_correct": (ri[i].user_specific == null) ? "" : ri[i].percentage_correct,
					"burned": (ri[i].user_specific == null) ? "" : ri[i].user_specific.burned,
					"burned_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.burned_date,
					"meaning_correct": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_correct,
					"meaning_incorrect": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_incorrect,
					"meaning_max_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_max_streak,
					"meaning_current_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_current_streak
				});
			}
		//if (table.tableInfo.id == "combinedTable") {
		//	table.appendRows(combinedTable);
		//	};
		});
		
		
		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/kanji", function(resp) {
			var ri = resp.requested_information;
			
			// Iterate over the JSON object
			for (i = 0, len = ri.length; i < len; i++) {
				combinedTable.push({
					"type": 'kanji',
					"username": resp.user_information.username,
					"user_level": resp.user_information.level,
					"title": resp.user_information.title,
					"creation_date": resp.user_information.creation_date,
					"about": resp.user_information.about,
					"website": resp.user_information.website,
					"twitter": resp.user_information.twitter,
					"topics_count": resp.user_information.topics_count,
					"posts_count": resp.user_information.posts_count,
					"vacation_date": resp.user_information.vacation_date,
					"level": ri[i].level,
					"character": ri[i].character,
					"meaning": ri[i].meaning,
					"onyomi": ri[i].onyomi,
					"kunyomi": ri[i].kunyomi,
					"important_reading": ri[i].important_reading,
					"srs": (ri[i].user_specific == null) ? "" : ri[i].user_specific.srs,
					"unlocked_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.unlocked_date,
					//"percentage_correct": ri[i].percentage_correct,
					"available_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.available_date,
					"burned": (ri[i].user_specific == null) ? "" : ri[i].user_specific.burned,
					"burned_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.burned_date,
					"meaning_correct": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_correct,
					"meaning_incorrect": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_incorrect,
					"meaning_max_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_max_streak,
					"meaning_current_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_current_streak,
					"reading_correct": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_correct,
					"reading_incorrect": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_incorrect,
					"reading_max_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_max_streak,
					"reading_current_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_current_streak
				});
			}
		//if (table.tableInfo.id == "combinedTable") {
		//	table.appendRows(combinedTable);
		//	};
		});
		

		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/vocabulary", function(resp) {
			var ri = resp.requested_information.general;

			// Iterate over the JSON object, for user_specific: return empty string for locked vocabulary
			for (i = 0, len = ri.length; i < len; i++) {
						//console.log(ri[i].user_specific == null);
				combinedTable.push({
					"type": 'vocabulary',
					"username": resp.user_information.username,
					"user_level": resp.user_information.level,
					"title": resp.user_information.title,
					"creation_date": resp.user_information.creation_date,
					"about": resp.user_information.about,
					"website": resp.user_information.website,
					"twitter": resp.user_information.twitter,
					"topics_count": resp.user_information.topics_count,
					"posts_count": resp.user_information.posts_count,
					"vacation_date": resp.user_information.vacation_date,
					"level": ri[i].level,
					"character": ri[i].character,
					"kana": ri[i].kana,
					"meaning": ri[i].meaning,
					"srs": (ri[i].user_specific == null) ? "" : ri[i].user_specific.srs,
					"unlocked_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.unlocked_date,
					"available_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.available_date,
					"burned": (ri[i].user_specific == null) ? "" : ri[i].user_specific.burned,
					"burned_date": (ri[i].user_specific == null) ? "" : ri[i].user_specific.burned_date,
					"meaning_correct": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_correct,
					"meaning_incorrect": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_incorrect,
					"meaning_max_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_max_streak,
					"meaning_current_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.meaning_current_streak,
					"reading_correct": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_correct,
					"reading_incorrect": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_incorrect,
					"reading_max_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_max_streak,
					"reading_current_streak": (ri[i].user_specific == null) ? "" : ri[i].user_specific.reading_current_streak
				});
			}
		if (table.tableInfo.id == "combinedTable") {
			table.appendRows(combinedTable);
			doneCallback();
			};
		});

		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/level-progression", function(resp) {
			var ri = resp.requested_information,
				levelProgressionTable = [];

			// Iterate over the JSON object
				levelProgressionTable.push({
					"radicals_progress": ri.radicals_progress,
					"radicals_total": ri.radicals_total,
					"kanji_progress": ri.kanji_progress,
					"kanji_total": ri.kanji_total
				});
        if (table.tableInfo.id == "LevelProgression") {
			table.appendRows(levelProgressionTable);
			doneCallback();
			};
		});
		
		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/critical-items", function(resp) {
			var ri = resp.requested_information,
				criticalItemsTable = [];

			// Iterate over the JSON object
			for (i = 0, len = ri.length; i < len; i++) {
				criticalItemsTable.push({
					"type": ri[i].type,
					"character": ri[i].character,
					"kana": ri[i].kana,
					"meaning": ri[i].meaning,
					"level": ri[i].level,
					"percentage": ri[i].percentage
				});
			}
        if (table.tableInfo.id == "CriticalItemsTable") {
			table.appendRows(criticalItemsTable);
			doneCallback();
		};
		});
	};
			
     setupConnector = function() {
         var apiKey = $('#wanikaniapikey').val().trim();
         if (apiKey) {
             tableau.connectionData = apiKey; // set the key as the connection data so we can get to it when we fetch the data
             tableau.connectionName = 'WaniKani' // name the data source. This will be the data source name in Tableau
             tableau.submit();
         }
     };
	 
    tableau.registerConnector(myConnector);


    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			setupConnector();
		});
	$('#apiForm').submit(function(event) {
             event.preventDefault();
             setupConnector();
         });
    });
})();
