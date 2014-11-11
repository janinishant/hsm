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

        $.ajax({
            url: this.baseUrl+'models/DataManager.php/getAllInJson',
            type:"POST",
            success: function(response, responseState) {
                self.excelData = $.parseJSON(response);
                self.traverseToExcelData();

            },
            error: function(a,b,c) {
                //handle the error condition
            }
        })
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

    UscHsmGlobal.prototype.createOptions = function (options) {
        var opt = '<option>Select an option </option>';
        if(options instanceof Array) {
            for(var i = 0;i < options.length;i++) {
                opt+='<option value="'+options[i]+'">'+this.ucFirst(options[i])+'</option>';
            }
        }
        return opt;
    };

    UscHsmGlobal.prototype.buildRow = function (question,answerSelect) {
        return '<div class="row horizontal-separator"><div class="col-md-12"><hr></div>' +
            '</div><div class="row">' +
            '<div class="col-md-2 question-option-row"><strong>'+this.ucFirst(question)+'?</strong></div>' +
            '<div class="col-md-10 ' +
            '">'+answerSelect+'</div></div>'
    };

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

    function removeInvalidDOMElements(currentElement) {
        var invalidElements = $(currentElement).parent().parent().nextAll();
        for(var i =0;i< invalidElements.length;i++) {
            $(invalidElements[i].remove());
        }

    }

});