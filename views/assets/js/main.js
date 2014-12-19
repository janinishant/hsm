$(document).ready(function() {

    /**
     * Defining the constructor
     * @constructor
     */
    function UscHsmGlobal() {
        //use this like a global for this main for consistencies. Single point of change.
        this.baseUrl = "http://localhost/uscHSM/minh_project/HSM/";

        //a global variable in scope of the doc ready, to hold excel data. Its not a global in the global scope.
        this.excelData = {};

        this.traversedExcelData = {};

        this.keysTraversed = [];
    }

    /**
     * Get all data from the backend using AJAX
     */
    UscHsmGlobal.prototype.fetchAllExcelData = function () {
        //take care of javascript closures.
        var self = this;

        self.excelData = {"what time is it":{"After hours":{"job type":{"electrical":{"problem":{"stairwell light out":{"action":"Priority B\u00a0<br> 1-8 hours <br> Area first. If they are closed or can't do the work <br> Ask resident if they can wait till morning <br> If not, assign to Raul if he's still here. <br> If resident can not wait and Raul is not there, call one of the GMTs on call <br> If neither of above, call O&M."},"Repair\/Replace Breaker":{"action":"Priority B\u00a0<br> 1-8 hours <br> <li>If Broken\/Loose:  then Schedule<\/li> <li> If not then wait until morning <\/li>"},"Light bulb replacement":{"action":"Priority B\u00a0<br> 1-8 hours <br> If it is the only light in the room, call one of the GMTs <br> If not, wait until morning"},"Ballast":{"Parts scheduled ?":{"Yes":{"action":"Priority B\u00a0<br> 1-8 hours <br> <li>Wait until morning <\/li>"},"No":{"action":"Priority B\u00a0<li>Wait until parts are scheduled<\/li>"},"Replacement":{"action":"Priority B\u00a0<br> 1-8 hours <br> <li> Assign to Iram or Raul whoever comes in first or any other GMT available <\/li>"}}},"Power out":{"Location Type":{"Building":{"action":"Priority A\u00a0<br> 1 hour <br> <li> Assign it to FMS O&M and DPS <br>Refer to Fire\/Life\/ Safety Flowchart<\/li>"},"Individual Room\/ Apartment":{"action":"Priority B\u00a0<br> 1-4 hours <br> <li> Ask Which rooms and\/or what part of the appartment is out?<\/li><li>Assign it to on of the GMTs to reset the breakers<\/li> <li>Assign it to the area, If they are closed or can't do the work, assign to Raul if he's still here. If not, call O&M. <\/li>"}}},"Elevator":{"action":"Priority A <br> 1 hour <br>Ask the following question<li>On which floor is it stuck? <\/li>\n<li>\n Is anyone trapped inside?\n<\/li><li>\nAre the doors opened\/closed?<\/li><li>Ask if there is another elevator available?<\/li> Assign in to FMS O&M"},"Sparking Outlet":{"action":"Priority A <br> 1 hour <br>  Assign to Raul or Iram if either of them are still there. <br> Ask the resident if they can put a \u201cdo not use\u201d sign. <br> If not, call O&M"},"Emergency Lighting":{"action":"Priority B <br> 1-8 hour <br>  Assign to Raul or Iram if either of them are still there. <br> If not, call O&M"},"Exposed Wires":{"action":"Priority A <br> 1 hour <br>  <li>Assign to Raul or Iram if either of them are still there. <\/li><li> Ask if the wires are in common area or inside the apartment <\/li>  If Raul or Iram not available, call O&M"}}},"Life\/Fire\/Safety":{"problem":{"Security Grill":{"action":"Priority C <br> 24 hours <br> Wait until morning"},"Sprinkler system":{"Location Type":{"Inside the building":{"action":"Priority A <br> 1 hour <br> Ask the following questions <li> Is the sprinkler activated ? <\/li> <li> Is there any water damage ? <\/li> <br> Assign it to FMS_O&M"},"Outside the building":{"action":"Refer to landscape flow chart. <br> Assign it to FMS"}}},"Gas smell":{"action":"Ask the student since how long has been smelling off gas ? <br> Instruct the student to turn off all the appliances, keep away from stove and open all the windows. <br> Has there been too many complaints for the same isse ? <li> <strong>Yes, Major Problem<\/strong> Inform DPS to evaluate and evacuate as necessary. Call O&M, Building Manager, and\/or building AD. If instructed call the Gas company. <\/li> <li> Minor Problem, Wait until morning<\/li>"},"Smoke Detectors":{"Type":{"Activation":{"Location Type":{"Room":{"action":"Priority A <br> 1 hour <br> Call DPS to evaluate the situation. Based on their input, call GMT."},"Hallway":{"action":"Priority A <br> 1 hour <br> Call DPS to evaluate the situation. Based on their input, call , FMS-O&M."}}},"Replacement":{"Location Type":{"Room":{"action":"Priority A <br> 1 hour <br> Wait until morning for a gmt to address it."},"Hallway":{"action":"Priority A <br> 1 hour <br> Wait until morning for FMS_O&M to address it."}}}}},"Exit Sign":{"Type":{"Light Bulb":{"action":"Priority B <br> 1 \u2013 8 Hours <br> Wait until morning"},"Sign":{"action":"Priority C <br> 1 - 24 Hours Hours <br> Wait until morning"}}},"Fire Alarm":{"action":"Priority A <br> 1 hour <br>  Assign FMS_O&M"},"Fire Drill":{"action":"Priority A <br> 1 hour <br>  Assign FMS_O&M"},"Fire Panel":{"Type":{"Alarm Sounding":{"action":"Assign it to FMS_O&M"},"Light Flashing":{"action":"Priority B <br> 1-8 hours <br> Wait until morning"}}},"Fire":{"action":"Call everyone off the following: <li>Fire Department<\/li> <li> DPS<\/li> <li>O&M to have an electrician turn off the alarm <\/li> <li>Area Director & Building Manager<\/li> <li>Create a work order for HSM<\/li> <li> Call Landry <\/li> <li>Call Minh <\/li> <li> Area if necessary to warn the residents<\/li>"}}},"Plumbing":{"problem":{"Water Shutdown":{"action":"Priority B <br> 1 \u2013 8 Hours <br> <li>If <strong>scheduled:<\/strong> Inform CSC <\/li><li> If <strong>Emergency shutdown: <\/strong> Inform resident off the emergency due to which shutdown was done."},"Toilet":{"Type":{"Overflowing":{"action":"<li> <strong>Priority A: <\/strong> Page GMT <\/li><li><strong>Priority B: <\/strong><li>If water is dripping wait until morning<\/li><li> If there is stream of water, page gmts<\/li> <\/li> <li>If clean up is required, call BSM to coordinate<\/li>"},"Leaking":{"action":"<li> <strong>Priority B:  <\/strong> <br>1-8 hours<br> Ask The following questions <li>Is water water running inside the tank<\/li><li> Is There water damage to the building\/rooms.<\/li><li>Can anyone slip or fall on the water? <\/li> <If there is water damage, call GMT <\/li>"},"Not Flushing":{"action":"<li> <strong>Priority A:  <\/strong> <br>1-4 hours<br> Ask The following questions <li>Is water water running inside the tank<\/li><li> Is There water damage to the building\/rooms.<\/li><li>Can anyone slip or fall on the water? <\/li> < Ask, if there is any other toilet they can use <\/li>"},"Clogged":{"action":"<li> <strong>Priority A:  <\/strong> <br>Ask can they use other toilet ? <br> <strong>If NOT <\/strong> <br> Page a GMT <br> <\/li><li><strong>Priority B:  <\/strong><br>Ask can they use other toilet ? <br> <strong>If NOT <\/strong> <br> Page a GMT <br><\/li>"}}},"No water pressure \/ No Hot or Cold water":{"Location Type":{"Apartment":{"action":"Priority B <br> 1 \u2013 8 Hours <br> Wait until morning"},"Building":{"action":"Priority A <br> 1 hour <br> Assign it to FMS O&M"}}},"Pipe Burst":{"action":"Priority A <br> 1 hour <br>  Assign FMS_O&M <br> Follow up with FMS, after half (\u00bd) an hour"},"Problem with boiler or Hot water Header":{"action":"Priority A <br> 1 hour <br>  Assign FMS_O&M"},"Faucet Leak":{"Severity":{"Dripping":{"action":"Priority C <br> 1 - 24 Hours Hours <br> Wait until morning"},"Stream of water":{"action":"Priority A\u00a0<br> 1 hour <br> Page it to HSM GMT on call."}}},"Shower or Tub Repairs":{"action":"Priority C <br> If Scheduled, Wait until Morning"},"Garbage Disposal":{"action":"Priority C <br> Wait until Morning"},"Sink":{"Type":{"Leaking":{"action":"Priority C <br> 1 - 24 Hours Hours <br> Wait until morning"},"Clogged":{"action":"Priority C <br> 1 - 24 Hours Hours <br> Wait until morning, unless it is overflowing"},"Repair \/ Replacement":{"action":"Schedule - Wait until morning"}}}}},"Appliance":{"problem":{"Laundry":{"Type":{"Washer\/ Dryer":{"Is Broken":{"Yes":{"action":"Priority C <br> 1 -24 hours <br> Wait until next day then call Web Services"},"No":{"action":"Ask what exactly is broken, is it not spinning or not drying or machine took the money, are there any clothes inside? <br> Wait until next day and call Web Services <br> If there is a severe leak, call wash services, they are 24\/7"}}}}},"Dishwasher":{"Type":{"Water not draining or not working":{"action":"Priority C <br> 1 - 24 Hours Hours <br> Askthe resident to turn it off. <li>Ask What kind of soap is being used?<\/li> <br> Wait until morning"},"Other Problem":{"action":"Ask What other problem <br> Ask What kind of soap is being used <br> Wait until Morning"}}},"Stove":{"Did Pilot Light go out":{"Yes":{"Is there gas smell":{"No":{"action":"Ask the following questions <ul><li>How did the pilot light go out<\/li><li>Is the knob turned on?<\/li><br> Instruct the resident to turn off appliances, keep away from the stove and open all the windows. Wait until morning to assign to area."},"Yes":{"action":"Refer the FIRE\/LIFE\/SAFETY chart"}}},"No":{"Is there gas smell":{"Yes":{"action":"<li> Refer the FIRE\/LIFE\/SAFETY chart <\/li> <li>Page the GMT on call<\/li><li>Request windows to be opened <\/li>"},"No":{"action":"Priority B <br> 48 hours <br> Wait until morning"}}}}},"Refrigerator \/ freezer":{"action":"Priority B <br> 1-8 hours <br> Wait until morning"}}},"Carpentry":{"problem":{"Furniture to be repaired":{"action":"Priority C <br> 24 hours <br> Wait until morning"},"Iron-rod repair":{"action":"Priority C <br> 24 hours <br> Scheduled: Wait until morning"},"Window screen replacement":{"action":"Priority C <br> 48 hours <br> Wait until morning"},"Window ligh replacement":{"0":[],"":{"Priority C <br> 48 hours <br> Wait until morning":[]}},"Window frame replacement":{"action":"Priority C <br> 48 hours <br> Schedule: Wait until morning"},"Window glass cleanup":{"action":"Priority A <br> 1 hour <br>  Ask the following questions: <ul><li>How did the glass break?<\/li><li>Where exactly is it located ?<\/li> <\/ul> Call BSM call Building Manager to schedule his cleaning crew. "},"Window glass replacement":{"action":"Priority B <br> 4 hours <br> Ask the following questions: <ul><li>How did the glass break?<\/li><li>Where exactly is it located ?<\/li> <\/ul> Call DPS to verify if it is a security issue or vandalism. Ask for extra patrol. Call HSM GMT to board-up only. Wait until morning to inform the area and assigned a vendor for glass replacement"},"Closet Replace\/ Tighten\/ Fix the closet rods or wheels":{"action":"Priority C <br> 48 hours <br> Wait until AM, then assign to area. If area sends it back, reassign to GMT or vendor."},"Drawer Replace\/ Tighten\/ Fix the loose drawer(s)":{"action":"Priority C <br> 48 hours <br> Ask the following questions: <ul><li>How did the drawer break or get loose?<\/li><li>Where exactly is it located ?<\/li> <\/ul> Wait until AM, then assign to area. If area sends it back, reassign to GMT or vendor."},"Front Door repair\/replacement":{"Is it secure":{"Yes":{"action":"Wait until morning and assign Lock\/Frame problem"},"No":{"action":"Priority A\u00a0<br> 1 -4 hour <br> Ask the following questions: <li> Is it off track or hinges ?<\/li> <li>Is the lock broken? <\/li> Call DPS to determine if it's a security issue or vandalism. Ask for extra patrol. <br> Call FMS O&M to report the problem"}}}}},"Roof":{"problem":{"Damage Prevention":{"action":"It is scheduled, Assign it to area"},"Leak":{"Is it raining?":{"Yes":{"action":"Wait for rain to stop"},"No":{"action":"Priority A or B <br> 1- 72 hours <br> Ask the following questions:  <li>Where exactly is the leak<\/li> <li>How much water flowing<\/li> <li> Is there visible water damange ?<\/li>  <br> <li> Is it dripping or stream of water? <\/li> <li>If Drip: there another room above? no room above - did it rain the previous day\/send to the area to clean the roof.. Instruct the resident to place a bucket to receive the water and wait 'till the AM to send a GMT or FMS <\/li> <li>If Stream: <\/li>is there another room above, no room above - did it rain the previous day\/send to the area to clean the roof. Page gmts to inspect or FMS if GMTs state that they can fix it"}}},"Repair":{"action":"Need to Wait until morning"}}},"Phone":{"problem":{"Can't Make outgoing calls":{"action":"Priority B <br> 1 \u2013 8 hours <br> Ask the following questions <li>Can you please provide the phone number you are having problems with<\/li> <li>Have you tried plugging the phone into another jack ?<\/li>"},"Can't hear dial tone":{"action":"Wait until morning"},"Can't hear rings":{"action":"Wait until morning"},"Problem calling long distance":{"action":"Notify the resident that USC does not offer long distance calls. She\/he may use a calling card."},"Problem with Second line":{"action":"It is Scheduled. Wait until morning."},"Building outage":{"action":"Call Manny at home and wait until morning to call ISD. Or do what Manny says. <br> Also call ITS after hours"}}},"Patch and Paint":{"problem":{"General":{"action":"It is Scheduled, wait until morning"},"There is a hole in the hallway":{"action":"Priority C <br> 24 hours <br> Wait until morning"},"There an graffiti":{"action":"Priority A or B <br> 1 \u2013 8 hours <br> Ask the following questions <li>Where exactly is the graffiti?<\/li><li>Is the wording offensive or can cause an outrage?<\/li> <br> Call the area on call technician depending on the severity and the location. Else wait till morning"}}},"Landscape":{"problem":{"Is the sprinkler broken?":{"action":"Priority A or B <br> 1- 8 hours <br> Ask the following questions <li>Is the water  spilling onto the sidewalk? <\/li><li>Can someone split and get hurt?<\/li><li>Is there a flood?<\/li> <br> Assign it to FMS"},"Trim\/ remove trees\/plants":{"action":"Priority C <br> 5 days <br> Wait until Morning"}}},"Pool":{"problem":{"repair":{"action":"Wait until morning, then assign it to the area to handle"},"Cleaning":{"action":"Wait until morning, then assign it to the area to handle"}}},"Auto gate":{"problem":{"Is it not making a sounds?":{"action":"Priority A <br> 1 - 4 hours <br> The motor is probably not working <br> Ask the following questions: <ul><li>The door in open or closed position<\/li><li>What happens when you swipe the card?<\/li><li>If there is not light, did you try replacing the batteries<\/li> <\/ul> After hours autogates call DPS and if problem is not resolve by DPS ask them to patol and call Transportation Services in the morning or Pablo's office at 213-743-1738 <strong>Transportation Services: 08709<\/strong><strong>Call DPS and ask them for security around that area.<\/strong>"},"Is it not opening":{"action":"If stuck in a closed position: Priority A <br> 1 \u2013 4 hours <br> What is the exact building and location of the gate? <br> Use the autogate flowchart from the desk handbook for autogate number. <br> After hours autogates call DPS and if problem is not resolve by DPS ask them to patol and call Transportation Services in the morning or Pablo's office at 213-743-1738 <strong>Transportation Services: 08709<\/strong><strong>Call DPS and ask them for security around that area.<\/strong>"},"Is it not closing":{"action":"Priority A <br> 1 \u2013 8 hours <br> <li>Is it partially or completely open<\/li> <li> What is the exact building and location of the gate? <\/li> <br> Use the autogate flowchart from the desk handbook for autogate number. <br> After hours autogates call DPS and if problem is not resolve by DPS ask them to patol and call Transportation Services in the morning or Pablo's office at 213-743-1738 <strong>Transportation Services: 08709<\/strong><strong>Call DPS and ask them for security around that area.<\/strong>"}}},"Access card":{"Mode of card when swiped":{"green":{"action":"Priority A or B <br> 1 \u2013 4 hours <br> If it is not releasing or is broken, the door magnet is not working. <br> Do the following:  <li> Call RA on duty and ask them to let the student into his\/her appartment.<\/li><li>Call DPS to patrol the area more frequently.<\/li><li>In the morning: Contact USCard (08709)<\/li> "},"red":{"action":"Priority A or B <br> 1 \u2013 4 hours <br> If it is not reading or releasing, it is a card reader problem. <br> Do the following:  <li> Call RA on duty and ask them to let the student into his\/her appartment.<\/li><li>Call DPS to patrol the area more frequently.<\/li><li>In the morning: Contact USCard (08709)<\/li><br>"}}},"Custodial":{"Type":{"Shampoo rugs \/ rugs need cleaning":{"action":"Scheduled <br> Ask the follow: <li>Why does your rug need cleanning?<\/li> Inform Area on call technician depending on severity & location. Request, BSM to coordinate, if the need to come after hours. Otherwise, wait until morning."},"Move or replace furniture":{"action":"Scheduled, Inform Area on call technician depending on severity & location. Request BMS to coordinate if they need to come after hours. Otherwise, wait until morning."}}}}}}};
        self.traverseToExcelData();
//        $.ajax({
//            url: self.baseUrl+'models/DataManager.php/getAllInJson',
//            type: 'POST',
//            success: function(response) {
//                self.excelData = response;
//                self.traverseToExcelData();
//            }
//        })
    };

    /**
     * Build a select HTML
     * @param data
     * @param depth
     * @returns {string}
     */
    UscHsmGlobal.prototype.buildSelect = function(data,depth) {
        return '<select class="form-control answer-select" data-old-value="">'+this.createOptions(data)+'</select>'
    };

    /**
     * Create select2 for options
     * @param options
     * @returns {string}
     */
    UscHsmGlobal.prototype.createOptions = function (options) {
        var opt = '<option>Select an option </option>';
        if(options instanceof Array) {
            for(var i = 0;i < options.length;i++) {
                opt+='<option value="'+options[i]+'">'+this.ucFirst(options[i])+'</option>';
            }
        }
        return opt;
    };

    /**
     * Builds a single row the app, i.e a label and a select with options
     * @param question label
     * @param answerSelect Options for the question
     * @returns {string} HTML string returned
     */
    UscHsmGlobal.prototype.buildRow = function (question,answerSelect) {
       return '<div class="row horizontal-separator"><div class="col-md-12"><hr></div>' +
            '</div><div class="row">' +
            '<div class="col-md-2 question-option-row"><strong>'+this.ucFirst(question)+'?</strong></div>' +
            '<div class="col-md-10 options-row' +
            '">'+answerSelect+'</div></div>'
    };

    /**
     * Based on the key traversed upto now, the program will
     */
    UscHsmGlobal.prototype.traverseToExcelData = function() {
        var i =0;
        var options;
        this.traversedExcelData = this.excelData;
        while(i < (this.keysTraversed.length)) {
            this.traversedExcelData = this.traversedExcelData[this.keysTraversed[i]][this.keysTraversed[i+1]];
            i+=2;
        }

        var question = Object.keys(this.traversedExcelData)[0];
        this.keysTraversed.push(question);
        if(this.traversedExcelData[question] instanceof Object) {
            options = Object.keys(this.traversedExcelData[question]);
        }
        else {
            options = this.traversedExcelData[question];
        }
        this.partialRender(question,options);
    };


    /**
     * Start rendering the data returned from the excel in key value pairs
     */
    UscHsmGlobal.prototype.partialRender = function (question,options) {
        var answerSelect;
        if(options instanceof Array) {
            answerSelect = this.buildSelect(options);
        }
        else {
            answerSelect = '<div class="row"> <div class="col-md-7 editable" contenteditable="true">'+options+'</div></div>';
        }

        var rowHtml = this.buildRow(question,answerSelect);
        $('#control-flow').append(rowHtml);

        var listOfSelects = $("select");
        for(var i=0;i<listOfSelects.length;i++){
            $(listOfSelects[i]).select2();
        }
    };

    /**
     * Basically a util function, that converts text to sentence case.
     * @param str string to be converted to sentence case
     * @returns {string} converted string
     */
    UscHsmGlobal.prototype.ucFirst = function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    var HsmObj = new UscHsmGlobal();
    HsmObj.fetchAllExcelData();

    $(document).on('change','.answer-select',{'hsmObj': HsmObj},function(event){

        var oldValue = $(event.currentTarget).data('old-value');

        //get the current target
        var selectedVal = event.currentTarget.value;

        //check if the first redundant option is not selected, in which case just ignore !
        if(selectedVal.trim() == $(event.currentTarget).find('option:eq(0)').text().trim()) {
            removeInvalidDOMElements(event.currentTarget);
            return false;
        }

        //if not in traversed array push else slice traversed array and re-render4
        var index = event.data.hsmObj.keysTraversed.indexOf(oldValue);

        if(index == -1) {
            event.data.hsmObj.keysTraversed.push(selectedVal);
        }
        else if(index + 1 < (event.data.hsmObj.keysTraversed.length)) {
            event.data.hsmObj.keysTraversed.splice(index, event.data.hsmObj.keysTraversed.length - index);
            event.data.hsmObj.keysTraversed.push(selectedVal);
        }

        $(event.currentTarget).data('old-value',selectedVal);

        removeInvalidDOMElements(event.currentTarget);

        //now re-render
        event.data.hsmObj.traverseToExcelData();

        window.scrollTo(0,document.body.scrollHeight);

    });

    /**
     * Clear button click handler
     * Will empty the container and just display the first select box
     */
    $(document).on('click','.clear',{'hsmObj': HsmObj}, function() {
        HsmObj.keysTraversed = [];
        $('#control-flow').empty();
        HsmObj.traverseToExcelData();
    });

    /**
     * Once a select changes, we want to remove the select following it, since they are now invalid
     * @param currentElement Element that is selected
     */
    function removeInvalidDOMElements(currentElement) {
        var invalidElements = $(currentElement).parent().parent().nextAll();
        for(var i =0;i< invalidElements.length;i++) {
            $(invalidElements[i]).fadeOut('slow',function(){
                $(this).remove();
            });
        }

    }

});