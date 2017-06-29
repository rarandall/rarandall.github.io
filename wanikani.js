(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var user_info_cols = [
		{
            id: "username",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "level",
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
        }
		];

        var userInfoTable = {
            id: "UserInformation",
            columns: user_info_cols
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
	
		//schema for radicals
		var radicals_cols = [{
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
            id: "percentage_correct",
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
        }];

        var radicalsTable = {
            id: "RadicalsTable",
            columns: radicals_cols
        };
		
		//schema for kanji
		var kanji_cols = [{
            id: "level",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "character",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "meaning",
            dataType: tableau.dataTypeEnum.string
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
        }];

        var kanjiTable = {
            id: "KanjiTable",
            columns: kanji_cols
        };
		
		//schema for vocabulary
		var vocabulary_cols = [{
            id: "level",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "character",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "meaning",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "kana",
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
        }];

        var vocabularyTable = {
            id: "VocabularyTable",
            columns: vocabulary_cols
        };
        schemaCallback([userInfoTable, levelProgressionTable, criticalItemsTable, radicalsTable, kanjiTable, vocabularyTable]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/user-information", function(resp) {
            var ui = resp.user_information,
                userInfoTable = [];

            // Iterate over the JSON object
                userInfoTable.push({
                    "username": ui.username,
                    "level": ui.level,
                    "title": ui.title,
                    "creation_date": ui.creation_date,
                    "about": ui.about,
					"website": ui.website,
					"twitter": ui.twitter,
					"topics_count": ui.topics_count,
					"posts_count": ui.posts_count,
					"vacation_date": ui.vacation_date
                });

        if (table.tableInfo.id == "UserInformation") {
			table.appendRows(userInfoTable);
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
		
		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/radicals", function(resp) {
			var ri2 = resp.requested_information,
				radicalsTable = [];

			// Iterate over the JSON object
			for (i = 0, len = ri2.length; i < len; i++) {
				radicalsTable.push({
					"character": ri2[i].character,
					"meaning": ri2[i].meaning,
					"srs": ri2[i].user_specific.srs,
					"unlocked_date": ri2[i].user_specific.unlocked_date,
					"available_date": ri2[i].user_specific.available_date,
					"percentage_correct": ri2[i].percentage_correct,
					"burned": ri2[i].user_specific.burned,
					"burned_date": ri2[i].user_specific.burned_date,
					"meaning_correct": ri2[i].user_specific.meaning_correct,
					"meaning_incorrect": ri2[i].user_specific.meaning_incorrect,
					"meaning_max_streak": ri2[i].user_specific.meaning_max_streak,
					"meaning_current_streak": ri2[i].user_specific.meaning_current_streak
				});
			}
        if (table.tableInfo.id == "RadicalsTable") {
			table.appendRows(radicalsTable);
			doneCallback();
		};
		});
		
		
		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/kanji", function(resp) {
			var ri = resp.requested_information,
				kanjiTable = [];

			// Iterate over the JSON object
			for (i = 0, len = ri.length; i < len; i++) {
				kanjiTable.push({
					"level": ri[i].level,
					"character": ri[i].character,
					"meaning": ri[i].meaning,
					"onyomi": ri[i].onyomi,
					"kunyomi": ri[i].kunyomi,
					"important_reading": ri[i].important_reading,
					"srs": ri[i].user_specific.srs,
					"unlocked_date": ri[i].user_specific.unlocked_date,
					//"percentage_correct": ri[i].percentage_correct,
					"available_date": ri[i].user_specific.available_date,
					"burned": ri[i].user_specific.burned,
					"burned_date": ri[i].user_specific.burned_date,
					"meaning_correct": ri[i].user_specific.meaning_correct,
					"meaning_incorrect": ri[i].user_specific.meaning_incorrect,
					"meaning_max_streak": ri[i].user_specific.meaning_max_streak,
					"meaning_current_streak": ri[i].user_specific.meaning_current_streak
				});
			}
        if (table.tableInfo.id == "KanjiTable") {
			table.appendRows(kanjiTable);
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
		
		$.getJSON("https://www.wanikani.com/api/user/"+ tableau.connectionData + "/vocabulary", function(resp) {
			var ri = resp.requested_information.general,
				vocabularyTable = [];

			// Iterate over the JSON object, for user_specific: return empty string for locked vocabulary
			for (i = 0, len = ri.length; i < len; i++) {
						//console.log(ri[i].user_specific == null);
				vocabularyTable.push({
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
        if (table.tableInfo.id == "VocabularyTable") {
			table.appendRows(vocabularyTable);
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
