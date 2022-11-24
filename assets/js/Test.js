define("OpportunityPageV2", [], function() {
    return {
        /* The name of the section entity schema. */
        entitySchemaName: "Opportunity",
		 messages: {
            "SetNewQuoteButtonVisibility": {
                mode: this.Terrasoft.MessageMode.PTP,
                direction: this.Terrasoft.MessageDirectionType.PUBLISH
            }
        },
		attributes: {
			/* Attribute name. */
			"Owner": {
				/* Data type. */
				"dataValueType": this.Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig":{
					"filters":[
						function(){
							var OppAccount = this.get("Account").value;
							//this.console.log(OppAccount,"OppAccount");
							var filterGroup = new this.Terrasoft.createFilterGroup();
							 var filterAGroup = new this.Terrasoft.createFilterGroup();
							  var filterBGroup = new this.Terrasoft.createFilterGroup();
							
							filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
							filterAGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
							filterBGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
							
							filterAGroup.add("AccountContactsFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Account", OppAccount));
							
							filterBGroup.add("ContactTypeFilter1", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "DheerContactType", "7852D5E3-4578-4E56-A190-582190898E4C"));//Employee
							filterBGroup.add("ContactTypeFilter2", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "DheerContactType", "432B3EF1-4A50-46C7-8DB6-A85293A68301"));//Employee
				filterGroup.addItem(filterAGroup);
				filterGroup.addItem(filterBGroup);
   				 return filterGroup;

						
						}
							 
						
					]
				}
			},
		
		},
        /* The methods of the section view model. */
        methods: {
			ButtonVisbility:function(){
				var OppAccount  = this.get("Account").value;
				console.log(OppAccount,"OppAccount");
				this.set("ButtonValue",true);
				//return false;
			},
			 onNewQuoteClick: function() {
                //TODO: implement your logic here
                this.showInformationDialog("Hi You Pushed the Button");
            },
            getNewQuoteButtonVisible: function() {
                var newMode = this.isNewMode();
                var result = !newMode;
				
                this.sandbox.publish("SetNewQuoteButtonVisibility", result, [this.sandbox.id]);
                return result;
            },
			ProbabilityCal:function(){
				var BudgetVal  = this.get("Budget");
				var ProbabilityVal = this.get("Probability");
				var StageVal = this.get("Stage").value;
				console.log(StageVal);
				console.log("Hello");
				if(StageVal === "325f0619-0ee0-df11-971b-001d60e938c6")
					{
						if(BudgetVal >= 10000)
					{
						ProbabilityVal = 7;
						this.set("Probability",70);
					}
				else if(BudgetVal < 10000 && BudgetVal > 2000)
					{
						ProbabilityVal = 5;
						this.set("Probability",50);
					}
				if(BudgetVal <= 2000)
					{
						ProbabilityVal = 3;
						this.set("Probability",30);
					}
					}
				
			},
			onEntityInitialized:function()
            {
                this.callParent(arguments);
			    //this.ButtonVisibility();
				this.ProbabilityCal();
			},
		},
        /* Display the button in the section. */
        diff: /**SCHEMA_DIFF*/[
            /* Metadata to add the custom button to the section. */
			{
                "operation": "insert",
                "name": "NewQuoteButton",
                "parentName": "LeftContainer",
                "propertyName": "items",
                "values": {
                    "itemType": Terrasoft.ViewItemType.BUTTON,
                    "style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
                    "caption": {"bindTo": "Resources.Strings.NewQuoteBtn"},
                    "click": {"bindTo": "onNewQuoteClick"},
                    "visible": {"bindTo": "getNewQuoteButtonVisible"},
                    "classes": {
                        "textClass": ["actions-button-margin-right"]
                    }
                }
            }
       
        ]/**SCHEMA_DIFF*/
    };
});