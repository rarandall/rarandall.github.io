(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {		
        var cols = [{
            id: "as_of_date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "classification_for_rate_setting",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "effective_date",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "explanation_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "nadac_per_unit",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "ndc",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ndc_description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "otc",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "pharmacy_type_indicator",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "pricing_unit",
            dataType: tableau.dataTypeEnum.string
        }
		];

        var tableSchema = {
            id: "NADAC",
            alias: "Medicaid - National Average Drug Acquisition Cost",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

        $.getJSON("https://data.medicaid.gov/resource/tau9-gfwr.json?$limit=" + tableau.connectionData + "&$$app_token=1RGjNxy2MWtMGOptBxslMowXl", function(resp) {
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "as_of_date": resp[i].as_of_date,
                    "classification_for_rate_setting": resp[i].classification_for_rate_setting,
                    "effective_date": resp[i].effective_date,
                    "explanation_code": resp[i].explanation_code,
                    "nadac_per_unit": resp[i].nadac_per_unit,
					"ndc": resp[i].ndc,
					"ndc_description": resp[i].ndc_description,
					"otc": resp[i].otc,
					"pharmacy_type_indicator": resp[i].pharmacy_type_indicator,
					"pricing_unit": resp[i].pricing_unit
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };
	
tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
			tableau.connectionData = $('#limitrows').val().trim();
			tableau.connectionName = 'NADAC Medicaid.gov Feed' // name the data source. This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
