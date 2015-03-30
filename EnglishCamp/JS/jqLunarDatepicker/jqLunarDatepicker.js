/*!
* jQuery UI LunarDatepicker 1.10.3
* http://jqueryui.com
*
* Copyright 2013 jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/LunarDatepicker/
*
* Depends:
*	jquery.ui.core.js
*/
(function ($, undefined) {

    $.extend($.ui, { LunarDatepicker: { version: "1.10.3"} });

    var PROP_NAME = "LunarDatepicker",
	instActive;

    /* Date picker manager.
    Use the singleton instance of this class, $.LunarDatepicker, to interact with the date picker.
    Settings for (groups of) date pickers are maintained in an instance object,
    allowing multiple different settings on the same page. */

    function LunarDatepicker() {

        this._curInst = null; // The current instance in use
        this._keyEvent = false; // If the last event was a key event
        this._disabledInputs = []; // List of date picker inputs that have been disabled
        this._LunarDatepickerShowing = false; // True if the popup picker is showing , false if not
        this._inDialog = false; // True if showing within a "dialog", false if not
        this._mainDivId = "ui-LunarDatepicker-div"; // The ID of the main LunarDatepicker division
        this._inlineClass = "ui-LunarDatepicker-inline"; // The name of the inline marker class
        this._appendClass = "ui-LunarDatepicker-append"; // The name of the append marker class
        this._triggerClass = "ui-LunarDatepicker-trigger"; // The name of the trigger marker class
        this._dialogClass = "ui-LunarDatepicker-dialog"; // The name of the dialog marker class
        this._disableClass = "ui-LunarDatepicker-disabled"; // The name of the disabled covering marker class
        this._unselectableClass = "ui-LunarDatepicker-unselectable"; // The name of the unselectable cell marker class
        this._currentClass = "ui-LunarDatepicker-current-day"; // The name of the current day marker class
        this._dayOverClass = "ui-LunarDatepicker-days-cell-over"; // The name of the day hover marker class
        //=================

        //=================
        this.regional = []; // Available regional settings, indexed by language code
        this.regional[""] = { // Default regional settings
            closeText: "Done", // Display text for close link
            prevText: "Prev", // Display text for previous month link
            nextText: "Next", // Display text for next month link
            currentText: "Today", // Display text for current month link
            monthNames: ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"], // Names of months for drop-down and formatting
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], // Column headings for days starting at Sunday
            weekHeader: "Wk", // Column header for week of the year
            dateFormat: "mm/dd/yy", // See format options on parseDate
            // DivLunar: "",
            firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
            isRTL: false, // True if right-to-left language, false if left-to-right
            showMonthAfterYear: false, // True if the year select precedes month, false for month then year
            yearSuffix: "" // Additional text to append to the year in the month headers
        };

        this._defaults = { // Global defaults for all the date picker instances
            DivLunar: "",
            showOn: "focus", // "focus" for popup on focus,
            // "button" for trigger button, or "both" for either
            showAnim: "fadeIn", // Name of jQuery animation for popup
            showOptions: {}, // Options for enhanced animations
            defaultDate: null, // Used when field is blank: actual date,
            // +/-number for offset from today, null for today
            appendText: "", // Display text following the input box, e.g. showing the format
            buttonText: "...", // Text for trigger button
            buttonImage: "", // URL for trigger button image
            buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
            hideIfNoPrevNext: false, // True to hide next/previous month links
            // if not applicable, false to just disable them
            navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
            gotoCurrent: false, // True if today link goes back to current selection instead
            changeMonth: false, // True if month can be selected directly, false if only prev/next
            changeYear: false, // True if year can be selected directly, false if only prev/next
            yearRange: "c-10:c+10", // Range of years to display in drop-down,
            // either relative to today's year (-nn:+nn), relative to currently displayed year
            // (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
            showOtherMonths: false, // True to show dates in other months, false to leave blank
            selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
            showWeek: false, // True to show week of the year, false to not show it
            calculateWeek: this.iso8601Week, // How to calculate the week of the year,
            // takes a Date and returns the number of the week for it
            shortYearCutoff: "+10", // Short year values < this are in the current century,
            // > this are in the previous century,
            // string value starting with "+" for current year + value
            minDate: null, // The earliest selectable date, or null for no limit
            maxDate: null, // The latest selectable date, or null for no limit
            duration: "fast", // Duration of display/closure
            beforeShowDay: null, // Function that takes a date and returns an array with
            // [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
            // [2] = cell title (optional), e.g. $.LunarDatepicker.noWeekends
            beforeShow: null, // Function that takes an input field and
            // returns a set of custom settings for the date picker
            onSelect: null, // Define a callback function when a date is selected
            onChangeMonthYear: null, // Define a callback function when the month or year is changed
            onClose: null, // Define a callback function when the LunarDatepicker is closed
            numberOfMonths: 1, // Number of months to show at a time
            showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
            stepMonths: 1, // Number of months to step back/forward
            stepBigMonths: 12, // Number of months to step back/forward for the big links
            altField: "", // Selector for an alternate field to store selected dates into
            altFormat: "", // The date format to use for the alternate field
            constrainInput: true, // The input is constrained by the current date format
            showButtonPanel: false, // True to show button panel, false to not show it
            autoSize: false, // True to size the input for the date format, false to leave as is
            disabled: false // The initial disabled state
        };
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='ui-LunarDatepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }

    $.extend(LunarDatepicker.prototype, {
        /* Class name added to elements to indicate already configured with a date picker. */
        markerClassName: "hasLunarDatepicker",

        //Keep track of the maximum number of rows displayed (see #7043)
        maxRows: 4,

        // TODO rename to "widget" when switching to widget factory
        _widgetLunarDatepicker: function () {
            return this.dpDiv;
        },

        /* Override the default settings for all instances of the date picker.
        * @param  settings  object - the new settings to use as defaults (anonymous object)
        * @return the manager object
        */

        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },

        /* Attach the date picker to a jQuery selection.
        * @param  target	element - the target input field or division or span
        * @param  settings  object - the new settings to use for this date picker instance (anonymous)
        */
        _attachLunarDatepicker: function (target, settings) {
            var nodeName, inline, inst;
            nodeName = target.nodeName.toLowerCase();
            inline = (nodeName === "div" || nodeName === "span");
            if (!target.id) {
                this.uuid += 1;
                target.id = "dp" + this.uuid;
            }
            inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {});
            if (nodeName === "input") {
                this._connectLunarDatepicker(target, inst);
            } else if (inline) {
                this._inlineLunarDatepicker(target, inst);
            }
        },

        /* Create a new instance object. */
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
            return { id: id, input: target, // associated target
                selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
                drawMonth: 0, drawYear: 0, // month being drawn
                inline: inline, // is LunarDatepicker inline or not
                dpDiv: (!inline ? this.dpDiv : // presentation div
			bindHover($("<div class='" + this._inlineClass + " ui-LunarDatepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            };
        },

        /* Attach the date picker to an input field. */
        _connectLunarDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) {
                return;
            }
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
            //If disabled option is true, disable the LunarDatepicker once it has been attached to the input (see ticket #5665)
            if (inst.settings.disabled) {
                this._disableLunarDatepicker(target);
            }
        },

        /* Make attachments based on settings. */
        _attachments: function (input, inst) {
            var showOn, buttonText, buttonImage,
			appendText = this._get(inst, "appendText"),
			isRTL = this._get(inst, "isRTL");

            if (inst.append) {
                inst.append.remove();
            }
            if (appendText) {
                inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
                input[isRTL ? "before" : "after"](inst.append);
            }

            input.unbind("focus", this._showLunarDatepicker);

            if (inst.trigger) {
                inst.trigger.remove();
            }

            showOn = this._get(inst, "showOn");
            if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
                input.focus(this._showLunarDatepicker);
            }
            if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
                buttonText = this._get(inst, "buttonText");
                buttonImage = this._get(inst, "buttonImage");
                inst.trigger = $(this._get(inst, "buttonImageOnly") ?
				$("<img/>").addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$("<button type='button'></button>").addClass(this._triggerClass).
					html(!buttonImage ? buttonText : $("<img/>").attr(
					{ src: buttonImage, alt: buttonText, title: buttonText })));
                input[isRTL ? "before" : "after"](inst.trigger);
                inst.trigger.click(function () {
                    if ($.LunarDatepicker._LunarDatepickerShowing && $.LunarDatepicker._lastInput === input[0]) {
                        $.LunarDatepicker._hideLunarDatepicker();
                    } else if ($.LunarDatepicker._LunarDatepickerShowing && $.LunarDatepicker._lastInput !== input[0]) {
                        $.LunarDatepicker._hideLunarDatepicker();
                        $.LunarDatepicker._showLunarDatepicker(input[0]);
                    } else {
                        $.LunarDatepicker._showLunarDatepicker(input[0]);
                    }
                    return false;
                });
            }
        },

        /* Apply the maximum length for the date format. */
        _autoSize: function (inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var findMax, max, maxI, i,
				date = new Date(2009, 12 - 1, 20), // Ensure double digits
				dateFormat = this._get(inst, "dateFormat");

                if (dateFormat.match(/[DM]/)) {
                    findMax = function (names) {
                        max = 0;
                        maxI = 0;
                        for (i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i;
                            }
                        }
                        return maxI;
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					"monthNames" : "monthNamesShort"))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
                }
                inst.input.attr("size", this._formatDate(inst, date).length);
            }
        },

        /* Attach an inline date picker to a div. */
        _inlineLunarDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName)) {
                return;
            }
            divSpan.addClass(this.markerClassName).append(inst.dpDiv);
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), true);
            this._updateLunarDatepicker(inst);
            this._updateAlternate(inst);
            //If disabled option is true, disable the LunarDatepicker before showing it (see ticket #5665)
            if (inst.settings.disabled) {
                this._disableLunarDatepicker(target);
            }
            // Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
            // http://bugs.jqueryui.com/ticket/7552 - A LunarDatepicker created on a detached div has zero height
            inst.dpDiv.css("display", "block");
        },

        /* Pop-up the date picker in a "dialog" box.
        * @param  input element - ignored
        * @param  date	string or Date - the initial date to display
        * @param  onSelect  function - the function to call when a date is selected
        * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
        * @param  pos int[2] - coordinates for the dialog's position within the screen or
        *					event - with x/y coordinates or
        *					leave empty for default (screen centre)
        * @return the manager object
        */
        _dialogLunarDatepicker: function (input, date, onSelect, settings, pos) {
            var id, browserWidth, browserHeight, scrollX, scrollY,
			inst = this._dialogInst; // internal instance

            if (!inst) {
                this.uuid += 1;
                id = "dp" + this.uuid;
                this._dialogInput = $("<input type='text' id='" + id +
				"' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                $("body").append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, false);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst);
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);

            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                browserWidth = document.documentElement.clientWidth;
                browserHeight = document.documentElement.clientHeight;
                scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
            }

            // move input on screen for focus, but hidden behind dialog
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            inst.settings.onSelect = onSelect;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showLunarDatepicker(this._dialogInput[0]);
            if ($.blockUI) {
                $.blockUI(this.dpDiv);
            }
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this;
        },

        /* Detach a LunarDatepicker from its control.
        * @param  target	element - the target input field or division or span
        */
        _destroyLunarDatepicker: function (target) {
            var nodeName,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

            if (!$target.hasClass(this.markerClassName)) {
                return;
            }

            nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName === "input") {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).
				unbind("focus", this._showLunarDatepicker).
				unbind("keydown", this._doKeyDown).
				unbind("keypress", this._doKeyPress).
				unbind("keyup", this._doKeyUp);
            } else if (nodeName === "div" || nodeName === "span") {
                $target.removeClass(this.markerClassName).empty();
            }
        },

        /* Enable the date picker to a jQuery selection.
        * @param  target	element - the target input field or division or span
        */
        _enableLunarDatepicker: function (target) {
            var nodeName, inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

            if (!$target.hasClass(this.markerClassName)) {
                return;
            }

            nodeName = target.nodeName.toLowerCase();
            if (nodeName === "input") {
                target.disabled = false;
                inst.trigger.filter("button").
				each(function () { this.disabled = false; }).end().
				filter("img").css({ opacity: "1.0", cursor: "" });
            } else if (nodeName === "div" || nodeName === "span") {
                inline = $target.children("." + this._inlineClass);
                inline.children().removeClass("ui-state-disabled");
                inline.find("select.ui-LunarDatepicker-month, select.ui-LunarDatepicker-year").
				prop("disabled", false);
            }
            this._disabledInputs = $.map(this._disabledInputs,
			function (value) { return (value === target ? null : value); }); // delete entry
        },

        /* Disable the date picker to a jQuery selection.
        * @param  target	element - the target input field or division or span
        */
        _disableLunarDatepicker: function (target) {
            var nodeName, inline,
			$target = $(target),
			inst = $.data(target, PROP_NAME);

            if (!$target.hasClass(this.markerClassName)) {
                return;
            }

            nodeName = target.nodeName.toLowerCase();
            if (nodeName === "input") {
                target.disabled = true;
                inst.trigger.filter("button").
				each(function () { this.disabled = true; }).end().
				filter("img").css({ opacity: "0.5", cursor: "default" });
            } else if (nodeName === "div" || nodeName === "span") {
                inline = $target.children("." + this._inlineClass);
                inline.children().addClass("ui-state-disabled");
                inline.find("select.ui-LunarDatepicker-month, select.ui-LunarDatepicker-year").
				prop("disabled", true);
            }
            this._disabledInputs = $.map(this._disabledInputs,
			function (value) { return (value === target ? null : value); }); // delete entry
            this._disabledInputs[this._disabledInputs.length] = target;
        },

        /* Is the first field in a jQuery collection disabled as a LunarDatepicker?
        * @param  target	element - the target input field or division or span
        * @return boolean - true if disabled, false if enabled
        */
        _isDisabledLunarDatepicker: function (target) {
            if (!target) {
                return false;
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] === target) {
                    return true;
                }
            }
            return false;
        },

        /* Retrieve the instance data for the target control.
        * @param  target  element - the target input field or division or span
        * @return  object - the associated instance data
        * @throws  error if a jQuery problem getting data
        */
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME);
            }
            catch (err) {
                throw "Missing instance data for this LunarDatepicker";
            }
        },

        /* Update or retrieve the settings for a date picker attached to an input field or division.
        * @param  target  element - the target input field or division or span
        * @param  name	object - the new settings to update or
        *				string - the name of the setting to change or retrieve,
        *				when retrieving also "all" for all instance settings or
        *				"defaults" for all global defaults
        * @param  value   any - the new value for the setting
        *				(omit if above is an object or to retrieve a value)
        */
        _optionLunarDatepicker: function (target, name, value) {
            var settings, date, minDate, maxDate,
			inst = this._getInst(target);

            if (arguments.length === 2 && typeof name === "string") {
                return (name === "defaults" ? $.extend({}, $.LunarDatepicker._defaults) :
				(inst ? (name === "all" ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
            }

            settings = name || {};
            if (typeof name === "string") {
                settings = {};
                settings[name] = value;
            }

            if (inst) {
                if (this._curInst === inst) {
                    this._hideLunarDatepicker();
                }

                date = this._getDateLunarDatepicker(target, true);
                minDate = this._getMinMaxDate(inst, "min");
                maxDate = this._getMinMaxDate(inst, "max");
                extendRemove(inst.settings, settings);
                // reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
                if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
                    inst.settings.minDate = this._formatDate(inst, minDate);
                }
                if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
                    inst.settings.maxDate = this._formatDate(inst, maxDate);
                }
                if ("disabled" in settings) {
                    if (settings.disabled) {
                        this._disableLunarDatepicker(target);
                    } else {
                        this._enableLunarDatepicker(target);
                    }
                }
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDate(inst, date);
                this._updateAlternate(inst);
                this._updateLunarDatepicker(inst);
            }
        },

        // change method deprecated
        _changeLunarDatepicker: function (target, name, value) {
            this._optionLunarDatepicker(target, name, value);
        },

        /* Redraw the date picker attached to an input field or division.
        * @param  target  element - the target input field or division or span
        */
        _refreshLunarDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateLunarDatepicker(inst);
            }
        },

        /* Set the dates for a jQuery selection.
        * @param  target element - the target input field or division or span
        * @param  date	Date - the new date
        */
        _setDateLunarDatepicker: function (target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateLunarDatepicker(inst);
                this._updateAlternate(inst);
            }
        },

        /* Get the date(s) for the first entry in a jQuery selection.
        * @param  target element - the target input field or division or span
        * @param  noDefault boolean - true if no default date is to be used
        * @return Date - the current date
        */
        _getDateLunarDatepicker: function (target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline) {
                this._setDateFromField(inst, noDefault);
            }
            return (inst ? this._getDate(inst) : null);
        },

        /* Handle keystrokes. */
        _doKeyDown: function (event) {
            var onSelect, dateStr, sel,
			inst = $.LunarDatepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".ui-LunarDatepicker-rtl");

            inst._keyEvent = true;
            if ($.LunarDatepicker._LunarDatepickerShowing) {
                switch (event.keyCode) {
                    case 9: $.LunarDatepicker._hideLunarDatepicker();
                        handled = false;
                        break; // hide on tab out
                    case 13: sel = $("td." + $.LunarDatepicker._dayOverClass + ":not(." +
									$.LunarDatepicker._currentClass + ")", inst.dpDiv);
                        if (sel[0]) {
                            $.LunarDatepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        }

                        onSelect = $.LunarDatepicker._get(inst, "onSelect");
                        if (onSelect) {
                            dateStr = $.LunarDatepicker._formatDate(inst);

                            // trigger custom callback
                            onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
                        } else {
                            $.LunarDatepicker._hideLunarDatepicker();
                        }

                        return false; // don't submit the form
                    case 27: $.LunarDatepicker._hideLunarDatepicker();
                        break; // hide on escape
                    case 33: $.LunarDatepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.LunarDatepicker._get(inst, "stepBigMonths") :
							-$.LunarDatepicker._get(inst, "stepMonths")), "M");
                        break; // previous month/year on page up/+ ctrl
                    case 34: $.LunarDatepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.LunarDatepicker._get(inst, "stepBigMonths") :
							+$.LunarDatepicker._get(inst, "stepMonths")), "M");
                        break; // next month/year on page down/+ ctrl
                    case 35: if (event.ctrlKey || event.metaKey) {
                            $.LunarDatepicker._clearDate(event.target);
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break; // clear on ctrl or command +end
                    case 36: if (event.ctrlKey || event.metaKey) {
                            $.LunarDatepicker._gotoToday(event.target);
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break; // current on ctrl or command +home
                    case 37: if (event.ctrlKey || event.metaKey) {
                            $.LunarDatepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        // -1 day on ctrl or command +left
                        if (event.originalEvent.altKey) {
                            $.LunarDatepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.LunarDatepicker._get(inst, "stepBigMonths") :
								-$.LunarDatepicker._get(inst, "stepMonths")), "M");
                        }
                        // next month/year on alt +left on Mac
                        break;
                    case 38: if (event.ctrlKey || event.metaKey) {
                            $.LunarDatepicker._adjustDate(event.target, -7, "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break; // -1 week on ctrl or command +up
                    case 39: if (event.ctrlKey || event.metaKey) {
                            $.LunarDatepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        // +1 day on ctrl or command +right
                        if (event.originalEvent.altKey) {
                            $.LunarDatepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.LunarDatepicker._get(inst, "stepBigMonths") :
								+$.LunarDatepicker._get(inst, "stepMonths")), "M");
                        }
                        // next month/year on alt +right
                        break;
                    case 40: if (event.ctrlKey || event.metaKey) {
                            $.LunarDatepicker._adjustDate(event.target, +7, "D");
                        }
                        handled = event.ctrlKey || event.metaKey;
                        break; // +1 week on ctrl or command +down
                    default: handled = false;
                }
            } else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
                $.LunarDatepicker._showLunarDatepicker(this);
            } else {
                handled = false;
            }

            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },

        /* Filter entered characters - based on date format. */
        _doKeyPress: function (event) {
            var chars, chr,
			inst = $.LunarDatepicker._getInst(event.target);

            if ($.LunarDatepicker._get(inst, "constrainInput")) {
                chars = $.LunarDatepicker._possibleChars($.LunarDatepicker._get(inst, "dateFormat"));
                chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
            }
        },

        /* Synchronise manual entry and field/alternate field. */
        _doKeyUp: function (event) {
            var date,
			inst = $.LunarDatepicker._getInst(event.target);

            if (inst.input.val() !== inst.lastVal) {
                try {
                    date = $.LunarDatepicker.parseDate($.LunarDatepicker._get(inst, "dateFormat"),
					(inst.input ? inst.input.val() : null),
					$.LunarDatepicker._getFormatConfig(inst));

                    if (date) { // only if valid
                        $.LunarDatepicker._setDateFromField(inst);
                        $.LunarDatepicker._updateAlternate(inst);
                        $.LunarDatepicker._updateLunarDatepicker(inst);
                    }
                }
                catch (err) {
                }
            }
            return true;
        },

        /* Pop-up the date picker for a given input field.
        * If false returned from beforeShow event handler do not show.
        * @param  input  element - the input field attached to the date picker or
        *					event - if triggered by focus
        */
        _showLunarDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
                input = $("input", input.parentNode)[0];
            }

            if ($.LunarDatepicker._isDisabledLunarDatepicker(input) || $.LunarDatepicker._lastInput === input) { // already here
                return;
            }

            var inst, beforeShow, beforeShowSettings, isFixed,
			offset, showAnim, duration;

            inst = $.LunarDatepicker._getInst(input);
            if ($.LunarDatepicker._curInst && $.LunarDatepicker._curInst !== inst) {
                $.LunarDatepicker._curInst.dpDiv.stop(true, true);
                if (inst && $.LunarDatepicker._LunarDatepickerShowing) {
                    $.LunarDatepicker._hideLunarDatepicker($.LunarDatepicker._curInst.input[0]);
                }
            }

            beforeShow = $.LunarDatepicker._get(inst, "beforeShow");
            beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
            if (beforeShowSettings === false) {
                return;
            }
            extendRemove(inst.settings, beforeShowSettings);

            inst.lastVal = null;
            $.LunarDatepicker._lastInput = input;
            $.LunarDatepicker._setDateFromField(inst);

            if ($.LunarDatepicker._inDialog) { // hide cursor
                input.value = "";
            }
            if (!$.LunarDatepicker._pos) { // position below input
                $.LunarDatepicker._pos = $.LunarDatepicker._findPos(input);
                $.LunarDatepicker._pos[1] += input.offsetHeight; // add the height
            }

            isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css("position") === "fixed";
                return !isFixed;
            });

            offset = { left: $.LunarDatepicker._pos[0], top: $.LunarDatepicker._pos[1] };
            $.LunarDatepicker._pos = null;
            //to avoid flashes on Firefox
            inst.dpDiv.empty();
            // determine sizing offscreen
            inst.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" });
            $.LunarDatepicker._updateLunarDatepicker(inst);
            // fix width for dynamic number of date pickers
            // and adjust position before showing
            offset = $.LunarDatepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({ position: ($.LunarDatepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
                left: offset.left + "px", top: offset.top + "px"
            });

            if (!inst.inline) {
                showAnim = $.LunarDatepicker._get(inst, "showAnim");
                duration = $.LunarDatepicker._get(inst, "duration");
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                $.LunarDatepicker._LunarDatepickerShowing = true;

                if ($.effects && $.effects.effect[showAnim]) {
                    inst.dpDiv.show(showAnim, $.LunarDatepicker._get(inst, "showOptions"), duration);
                } else {
                    inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
                }

                if ($.LunarDatepicker._shouldFocusInput(inst)) {
                    inst.input.focus();
                }

                $.LunarDatepicker._curInst = inst;
            }
        },

        /* Generate the date picker content. */
        _updateLunarDatepicker: function (inst) {
            this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
            instActive = inst; // for delegate hover events
            inst.dpDiv.empty().append(this._generateHTML(inst));
            this._attachHandlers(inst);
            inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();

            var origyearshtml,
			numMonths = this._getNumberOfMonths(inst),
			cols = numMonths[1],
			width = 17;

            inst.dpDiv.removeClass("ui-LunarDatepicker-multi-2 ui-LunarDatepicker-multi-3 ui-LunarDatepicker-multi-4").width("");
            if (cols > 1) {
                inst.dpDiv.addClass("ui-LunarDatepicker-multi-" + cols).css("width", (width * cols) + "em");
            }
            inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
			"Class"]("ui-LunarDatepicker-multi");
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
			"Class"]("ui-LunarDatepicker-rtl");

            if (inst === $.LunarDatepicker._curInst && $.LunarDatepicker._LunarDatepickerShowing && $.LunarDatepicker._shouldFocusInput(inst)) {
                inst.input.focus();
            }

            // deffered render of the years select (to avoid flashes on Firefox)
            if (inst.yearshtml) {
                origyearshtml = inst.yearshtml;
                setTimeout(function () {
                    //assure that inst.yearshtml didn't change.
                    if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                        inst.dpDiv.find("select.ui-LunarDatepicker-year:first").replaceWith(inst.yearshtml);
                    }
                    origyearshtml = inst.yearshtml = null;
                }, 0);
            }
        },

        // #6694 - don't focus the input if it's already focused
        // this breaks the change event in IE
        // Support: IE and jQuery <1.9
        _shouldFocusInput: function (inst) {
            return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
        },

        /* Check positioning to remain on screen. */
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(),
			dpHeight = inst.dpDiv.outerHeight(),
			inputWidth = inst.input ? inst.input.outerWidth() : 0,
			inputHeight = inst.input ? inst.input.outerHeight() : 0,
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

            offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

            // now check if LunarDatepicker is showing outside window viewport - move to a better place if so.
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

            return offset;
        },

        /* Find an object's position on the screen. */
        _findPos: function (obj) {
            var position,
			inst = this._getInst(obj),
			isRTL = this._get(inst, "isRTL");

            while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
                obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            }

            position = $(obj).offset();
            return [position.left, position.top];
        },

        /* Hide the date picker from view.
        * @param  input  element - the input field attached to the date picker
        */
        _hideLunarDatepicker: function (input) {
            var showAnim, duration, postProcess, onClose,
			inst = this._curInst;

            if (!inst || (input && inst !== $.data(input, PROP_NAME))) {
                return;
            }

            if (this._LunarDatepickerShowing) {
                showAnim = this._get(inst, "showAnim");
                duration = this._get(inst, "duration");
                postProcess = function () {
                    $.LunarDatepicker._tidyDialog(inst);
                };

                // DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
                if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
                    inst.dpDiv.hide(showAnim, $.LunarDatepicker._get(inst, "showOptions"), duration, postProcess);
                } else {
                    inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
                }

                if (!showAnim) {
                    postProcess();
                }
                this._LunarDatepickerShowing = false;

                onClose = this._get(inst, "onClose");
                if (onClose) {
                    onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
                }

                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
                    if ($.blockUI) {
                        $.unblockUI();
                        $("body").append(this.dpDiv);
                    }
                }
                this._inDialog = false;
            }
        },

        /* Tidy up after a dialog display. */
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-LunarDatepicker-calendar");
        },

        /* Close date picker if clicked elsewhere. */
        _checkExternalClick: function (event) {
            if (!$.LunarDatepicker._curInst) {
                return;
            }

            var $target = $(event.target),
			inst = $.LunarDatepicker._getInst($target[0]);

            if ((($target[0].id !== $.LunarDatepicker._mainDivId &&
				$target.parents("#" + $.LunarDatepicker._mainDivId).length === 0 &&
				!$target.hasClass($.LunarDatepicker.markerClassName) &&
				!$target.closest("." + $.LunarDatepicker._triggerClass).length &&
				$.LunarDatepicker._LunarDatepickerShowing && !($.LunarDatepicker._inDialog && $.blockUI))) ||
			($target.hasClass($.LunarDatepicker.markerClassName) && $.LunarDatepicker._curInst !== inst)) {
                $.LunarDatepicker._hideLunarDatepicker();
            }
        },

        /* Adjust one of the date sub-fields. */
        _adjustDate: function (id, offset, period) {
            var target = $(id),
			inst = this._getInst(target[0]);

            if (this._isDisabledLunarDatepicker(target[0])) {
                return;
            }
            this._adjustInstDate(inst, offset +
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
			period);
            this._updateLunarDatepicker(inst);
        },

        /* Action for current link. */
        _gotoToday: function (id) {
            var date,
			target = $(id),
			inst = this._getInst(target[0]);

            if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear;
            } else {
                date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear();
            }
            this._notifyChange(inst);
            this._adjustDate(target);
        },

        /* Action for selecting a new month/year. */
        _selectMonthYear: function (id, select, period) {
            var target = $(id),
			inst = this._getInst(target[0]);

            inst["selected" + (period === "M" ? "Month" : "Year")] =
		inst["draw" + (period === "M" ? "Month" : "Year")] =
			parseInt(select.options[select.selectedIndex].value, 10);

            this._notifyChange(inst);
            this._adjustDate(target);
        },

        _selectLunarDay: function (inst, SonarDay, SonarMonth, SonarYear) {

            var aLunarDate = getLunarDate(SonarDay, parseInt(SonarMonth), SonarYear);
            var a = this._get(inst, "DivLunar");
            var LunarDay = String(aLunarDate.day);
            LunarMonth = String(aLunarDate.month);

            if (aLunarDate.day < 10) {
                LunarDay = "0" + String(aLunarDate.day);
            }
            if (aLunarDate.month < 10) {
                LunarMonth = "0" + String(aLunarDate.month);
            }


            if (this._get(inst, "dateFormat") == "dd/mm/yy") {
                $(a).val(LunarDay + "/" + LunarMonth + "/" + aLunarDate.year);
            }
            else if (this._get(inst, "dateFormat") == "mm/dd/yy") {
                $(a).val(LunarMonth + "/" + LunarDay + "/" + aLunarDate.year);
            }
            else if (this._get(inst, "dateFormat") == "yy/mm/dd") {
                $(a).val(aLunarDate.year + "/" + LunarMonth + "/" + LunarDay);
            }
            else {
                $(a).val(LunarDay + "/" + LunarMonth + "/" + aLunarDate.year);
            }
        },
        //=======================
        //Su kien click chon ngay
        /* Action for selecting a day. */

        _selectDay: function (id, month, year, td) {
            var inst,
			target = $(id);

            if ($(td).hasClass(this._unselectableClass) || this._isDisabledLunarDatepicker(target[0])) {
                return;
            }

            inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $("a", td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;


            this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
            this._selectLunarDay(inst, inst.selectedDay, inst.selectedMonth, inst.selectedYear);

        },

        /* Erase the input field and hide the date picker. */
        _clearDate: function (id) {
            var target = $(id);
            this._selectDate(target, "");
        },

        /* Update the input field with the selected date. */
        _selectDate: function (id, dateStr) {
            var onSelect,
			target = $(id),
			inst = this._getInst(target[0]);

            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));

            if (inst.input) {
                inst.input.val(dateStr);
            }
            this._updateAlternate(inst);

            onSelect = this._get(inst, "onSelect");
            if (onSelect) {
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
            } else if (inst.input) {
                inst.input.trigger("change"); // fire the change event
            }

            if (inst.inline) {
                this._updateLunarDatepicker(inst);
            } else {
                this._hideLunarDatepicker();
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) !== "object") {
                    inst.input.focus(); // restore focus
                }
                this._lastInput = null;
            }
        },

        /* Update any alternate field to synchronise with the main field. */
        _updateAlternate: function (inst) {
            var altFormat, date, dateStr,
			altField = this._get(inst, "altField");

            if (altField) { // update alternate field too
                altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                date = this._getDate(inst);
                dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () { $(this).val(dateStr); });
            }
        },

        /* Set as beforeShowDay function to prevent selection of weekends.
        * @param  date  Date - the date to customise
        * @return [boolean, string] - is this date selectable?, what is its CSS class?
        */
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), ""];
        },

        /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
        * @param  date  Date - the date to get the week for
        * @return  number - the number of the week within the year that contains this date
        */
        iso8601Week: function (date) {
            var time,
			checkDate = new Date(date.getTime());

            // Find Thursday of this week starting on Monday
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

            time = checkDate.getTime();
            checkDate.setMonth(0); // Compare with Jan 1
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
        },

        /* Parse a string value into a date object.
        * See formatDate below for the possible formats.
        *
        * @param  format string - the expected format of the date
        * @param  value string - the date in the above format
        * @param  settings Object - attributes include:
        *					shortYearCutoff  number - the cutoff year for determining the century (optional)
        *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
        *					dayNames		string[7] - names of the days from Sunday (optional)
        *					monthNamesShort string[12] - abbreviated names of the months (optional)
        *					monthNames		string[12] - names of the months (optional)
        * @return  Date - the extracted date value or null if value is blank
        */
        parseDate: function (format, value, settings) {
            if (format == null || value == null) {
                throw "Invalid arguments";
            }

            value = (typeof value === "object" ? value.toString() : value + "");
            if (value === "") {
                return null;
            }

            var iFormat, dim, extra,
			iValue = 0,
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			year = -1,
			month = -1,
			day = -1,
			doy = -1,
			literal = false,
			date,
            // Check whether a format character is doubled
			lookAhead = function (match) {
			    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
			    if (matches) {
			        iFormat++;
			    }
			    return matches;
			},
            // Extract a number from the string value
			getNumber = function (match) {
			    var isDoubled = lookAhead(match),
					size = (match === "@" ? 14 : (match === "!" ? 20 :
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
					digits = new RegExp("^\\d{1," + size + "}"),
					num = value.substring(iValue).match(digits);
			    if (!num) {
			        throw "Missing number at position " + iValue;
			    }
			    iValue += num[0].length;
			    return parseInt(num[0], 10);
			},
            // Extract a name from the string value and convert to an index
			getName = function (match, shortNames, longNames) {
			    var index = -1,
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
					    return [[k, v]];
					}).sort(function (a, b) {
					    return -(a[1].length - b[1].length);
					});

			    $.each(names, function (i, pair) {
			        var name = pair[1];
			        if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
			            index = pair[0];
			            iValue += name.length;
			            return false;
			        }
			    });
			    if (index !== -1) {
			        return index + 1;
			    } else {
			        throw "Unknown name at position " + iValue;
			    }
			},
            // Confirm that a literal character matches the string value
			checkLiteral = function () {
			    if (value.charAt(iValue) !== format.charAt(iFormat)) {
			        throw "Unexpected literal at position " + iValue;
			    }
			    iValue++;
			};

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", dayNamesShort, dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", monthNamesShort, monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "!":
                            date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }

            if (iValue < value.length) {
                extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw "Extra/unparsed characters found in date: " + extra;
                }
            }

            if (year === -1) {
                year = new Date().getFullYear();
            } else if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
            }

            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }

            date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw "Invalid date"; // E.g. 31/02/00
            }
            return date;
        },

        /* Standard date formats. */
        ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y", // RFC 822
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd", // ISO 8601

        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

        /* Format a date object into a string value.
        * The format can be combinations of the following:
        * d  - day of month (no leading zero)
        * dd - day of month (two digit)
        * o  - day of year (no leading zeros)
        * oo - day of year (three digit)
        * D  - day name short
        * DD - day name long
        * m  - month of year (no leading zero)
        * mm - month of year (two digit)
        * M  - month name short
        * MM - month name long
        * y  - year (two digit)
        * yy - year (four digit)
        * @ - Unix timestamp (ms since 01/01/1970)
        * ! - Windows ticks (100ns since 01/01/0001)
        * "..." - literal text
        * '' - single quote
        *
        * @param  format string - the desired format of the date
        * @param  date Date - the date value to format
        * @param  settings Object - attributes include:
        *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
        *					dayNames		string[7] - names of the days from Sunday (optional)
        *					monthNamesShort string[12] - abbreviated names of the months (optional)
        *					monthNames		string[12] - names of the months (optional)
        * @return  string - the date in the above format
        */

        formatDate: function (format, date, settings) {
            if (!date) {
                return "";
            }

            var iFormat,
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
            // Check whether a format character is doubled
			lookAhead = function (match) {
			    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
			    if (matches) {
			        iFormat++;
			    }
			    return matches;
			},
            // Format a number, with leading zero if necessary
			formatNumber = function (match, value, len) {
			    var num = "" + value;
			    if (lookAhead(match)) {
			        while (num.length < len) {
			            num = "0" + num;
			        }
			    }
			    return num;
			},
            // Format a name, short or long as requested
			formatName = function (match, value, shortNames, longNames) {
			    return (lookAhead(match) ? longNames[value] : shortNames[value]);
			},
			output = "",
			literal = false;

            if (date) {
                for (iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                            literal = false;
                        } else {
                            output += format.charAt(iFormat);
                        }
                    } else {
                        switch (format.charAt(iFormat)) {
                            case "d":
                                output += formatNumber("d", date.getDate(), 2);
                                break;
                            case "D":
                                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                break;
                            case "o":
                                output += formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                output += formatNumber("m", date.getMonth() + 1, 2);
                                break;
                            case "M":
                                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                break;
                            case "y":
                                output += (lookAhead("y") ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
                                break;
                            case "@":
                                output += date.getTime();
                                break;
                            case "!":
                                output += date.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                if (lookAhead("'")) {
                                    output += "'";
                                } else {
                                    literal = true;
                                }
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                    }
                }
            }
            return output;
        },

        /* Extract all possible characters from the date format. */
        _possibleChars: function (format) {
            var iFormat,
			chars = "",
			literal = false,
            // Check whether a format character is doubled
			lookAhead = function (match) {
			    var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
			    if (matches) {
			        iFormat++;
			    }
			    return matches;
			};

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        chars += format.charAt(iFormat);
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case "d": case "m": case "y": case "@":
                            chars += "0123456789";
                            break;
                        case "D": case "M":
                            return null; // Accept anything
                        case "'":
                            if (lookAhead("'")) {
                                chars += "'";
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            chars += format.charAt(iFormat);
                    }
                }
            }
            return chars;
        },

        /* Get a setting value, defaulting if necessary. */
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
        },

        /* Parse existing date and initialise date picker. */
        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() === inst.lastVal) {
                return;
            }

            var dateFormat = this._get(inst, "dateFormat"),
			dates = inst.lastVal = inst.input ? inst.input.val() : null,
			defaultDate = this._getDefaultDate(inst),
			date = defaultDate,
			settings = this._getFormatConfig(inst);

            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate;
            } catch (event) {
                dates = (noDefault ? "" : dates);
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst);
        },

        /* Retrieve the default date shown on opening. */
        _getDefaultDate: function (inst) {
            return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
        },

        /* A date may be specified as an exact value or a relative one. */
        _determineDate: function (inst, date, defaultDate) {
            var offsetNumeric = function (offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date;
            },
			offsetString = function (offset) {
			    try {
			        return $.LunarDatepicker.parseDate($.LunarDatepicker._get(inst, "dateFormat"),
						offset, $.LunarDatepicker._getFormatConfig(inst));
			    }
			    catch (e) {
			        // Ignore
			    }

			    var date = (offset.toLowerCase().match(/^c/) ?
					$.LunarDatepicker._getDate(inst) : null) || new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate(),
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
					matches = pattern.exec(offset);

			    while (matches) {
			        switch (matches[2] || "d") {
			            case "d": case "D":
			                day += parseInt(matches[1], 10); break;
			            case "w": case "W":
			                day += parseInt(matches[1], 10) * 7; break;
			            case "m": case "M":
			                month += parseInt(matches[1], 10);
			                day = Math.min(day, $.LunarDatepicker._getDaysInMonth(year, month));
			                break;
			            case "y": case "Y":
			                year += parseInt(matches[1], 10);
			                day = Math.min(day, $.LunarDatepicker._getDaysInMonth(year, month));
			                break;
			        }
			        matches = pattern.exec(offset);
			    }
			    return new Date(year, month, day);
			},
			newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
				(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));

            newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0);
            }
            return this._daylightSavingAdjust(newDate);
        },

        /* Handle switch to/from daylight saving.
        * Hours may be non-zero on daylight saving cut-over:
        * > 12 when midnight changeover, but then cannot generate
        * midnight datetime, so jump to 1AM, otherwise reset.
        * @param  date  (Date) the date to check
        * @return  (Date) the corrected date
        */
        _daylightSavingAdjust: function (date) {
            if (!date) {
                return null;
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        },

        /* Set the date(s) directly. */
        _setDate: function (inst, date, noChange) {
            var clear = !date,
			origMonth = inst.selectedMonth,
			origYear = inst.selectedYear,
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
                this._notifyChange(inst);
            }
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? "" : this._formatDate(inst));
            }
        },

        /* Retrieve the date(s) directly. */
        _getDate: function (inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate;
        },

        /* Attach the onxxx handlers.  These are declared statically so
        * they work with static code transformers like Caja.
        */
        _attachHandlers: function (inst) {
            var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function () {
                var handler = {
                    prev: function () {
                        $.LunarDatepicker._adjustDate(id, -stepMonths, "M");
                    },
                    next: function () {
                        $.LunarDatepicker._adjustDate(id, +stepMonths, "M");
                    },
                    hide: function () {
                        $.LunarDatepicker._hideLunarDatepicker();
                    },
                    today: function () {
                        $.LunarDatepicker._gotoToday(id);
                    },
                    selectDay: function () {
                        $.LunarDatepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false;
                    },
                    selectMonth: function () {
                        $.LunarDatepicker._selectMonthYear(id, this, "M");
                        return false;
                    },
                    selectYear: function () {
                        $.LunarDatepicker._selectMonthYear(id, this, "Y");
                        return false;
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
            });
        },

        /* Generate the HTML for the current state of the date picker. */
        _generateHTML: function (inst) {
            var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
			selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,
			tempDate = new Date(),
			today = this._daylightSavingAdjust(
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
			isRTL = this._get(inst, "isRTL"),
			showButtonPanel = this._get(inst, "showButtonPanel"),
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			numMonths = this._getNumberOfMonths(inst),
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			stepMonths = this._get(inst, "stepMonths"),
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
			currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			drawMonth = inst.drawMonth - showCurrentAtPos,
			drawYear = inst.drawYear;

            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--;
            }
            if (maxDate) {
                maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--;
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;

            prevText = this._get(inst, "prevText");
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));

            prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			"<a class='ui-LunarDatepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
			" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-LunarDatepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));

            nextText = this._get(inst, "nextText");
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));

            next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			"<a class='ui-LunarDatepicker-next ui-corner-all' data-handler='next' data-event='click'" +
			" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-LunarDatepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));

            currentText = this._get(inst, "currentText");
            gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

            controls = (!inst.inline ? "<button type='button' class='ui-LunarDatepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
			this._get(inst, "closeText") + "</button>" : "");

            buttonPanel = (showButtonPanel) ? "<div class='ui-LunarDatepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-LunarDatepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

            firstDay = parseInt(this._get(inst, "firstDay"), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);

            showWeek = this._get(inst, "showWeek");
            dayNames = this._get(inst, "dayNames");
            dayNamesMin = this._get(inst, "dayNamesMin");
            monthNames = this._get(inst, "monthNames");
            monthNamesShort = this._get(inst, "monthNamesShort");
            beforeShowDay = this._get(inst, "beforeShowDay");
            showOtherMonths = this._get(inst, "showOtherMonths");
            selectOtherMonths = this._get(inst, "selectOtherMonths");
            defaultDate = this._getDefaultDate(inst);
            html = "";
            dow;
            for (row = 0; row < numMonths[0]; row++) {
                group = "";
                this.maxRows = 4;
                for (col = 0; col < numMonths[1]; col++) {
                    selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    cornerClass = " ui-corner-all";
                    calender = "";
                    if (isMultiMonth) {
                        calender += "<div class='ui-LunarDatepicker-group";
                        if (numMonths[1] > 1) {
                            switch (col) {
                                case 0: calender += " ui-LunarDatepicker-group-first";
                                    cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
                                case numMonths[1] - 1: calender += " ui-LunarDatepicker-group-last";
                                    cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
                                default: calender += " ui-LunarDatepicker-group-middle"; cornerClass = ""; break;
                            }
                        }
                        calender += "'>";
                    }
                    calender += "<div class='ui-LunarDatepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					"</div><table class='ui-LunarDatepicker-calendar'><thead>" +
					"<tr>";
                    thead = (showWeek ? "<th class='ui-LunarDatepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
                    for (dow = 0; dow < 7; dow++) { // days of the week
                        day = (dow + firstDay) % 7;
                        thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-LunarDatepicker-week-end'" : "") + ">" +
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                    }
                    calender += thead + "</tr></thead><tbody>";
                    daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    }
                    leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
                    numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
                    this.maxRows = numRows;
                    printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                        calender += "<tr>";


                        tbody = (!showWeek ? "" : "<td class='ui-LunarDatepicker-week-col'>" +
						this._get(inst, "calculateWeek")(printDate) +"</td>");


                        for (dow = 0; dow < 7; dow++) { // create date picker days
                            daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
                            otherMonth = (printDate.getMonth() !== drawMonth);
                            unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);

                            //==========================================================================================
                            //NgocEdit
                            var solarDay = printDate.getDate();
                            var solarMonth = printDate.getMonth();
                            var solarYear = drawYear; //printDate.getYear();

                            var lunarDate = getLunarDate(solarDay, solarMonth + 1, solarYear);

                            var print;
                            if (solarDay === 1 || lunarDate.day === 1) {
                                print = lunarDate.day + "/" + parseInt(lunarDate.month);
                            }
                            else {
                                print = lunarDate.day;
                            }
                            //==========================================================================================

                            tbody += "<td class='" +
							((dow + firstDay + 6) % 7 >= 5 ? " ui-LunarDatepicker-week-end" : "") + // highlight weekends
							(otherMonth ? " ui-LunarDatepicker-other-month" : "") + // highlight days from other months
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
                            // or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + // highlight selected day
							(unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
							(printDate.getTime() === today.getTime() ? " ui-LunarDatepicker-today" : "")) + "'" + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
							(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
							(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +

							(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day

                            (otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months

                            "' href='#'>" + printDate.getDate() + "</a><span class='amlich'>" + print + "</span></td>")); // display selectable date

                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate);
                        }
                        calender += tbody + "</tr>";
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++;
                    }
                    calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
							((numMonths[0] > 0 && col === numMonths[1] - 1) ? "<div class='ui-LunarDatepicker-row-break'></div>" : "") : "");
                    group += calender;
                }
                html += group;
            }
            html += buttonPanel;
            inst._keyEvent = false;
            return html;
        },

        /* Generate the month and year header. */
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {

            var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
			changeMonth = this._get(inst, "changeMonth"),
			changeYear = this._get(inst, "changeYear"),
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			html = "<div class='ui-LunarDatepicker-title'>",
			monthHtml = "";

            // month selection
            if (secondary || !changeMonth) {
                monthHtml += "<span class='ui-LunarDatepicker-month'>" + monthNames[drawMonth] + "</span>";
            } else {
                inMinYear = (minDate && minDate.getFullYear() === drawYear);
                inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
                monthHtml += "<select class='ui-LunarDatepicker-month' data-handler='selectMonth' data-event='change'>";
                for (month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                        monthHtml += "<option value='" + month + "'" +
						(month === drawMonth ? " selected='selected'" : "") +
						">" + monthNamesShort[month] + "</option>";
                    }
                }
                monthHtml += "</select>";
            }

            if (!showMonthAfterYear) {
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
            }

            // year selection
            if (!inst.yearshtml) {
                inst.yearshtml = "";
                if (secondary || !changeYear) {
                    html += "<span class='ui-LunarDatepicker-year'>" + drawYear + "</span>";
                } else {
                    // determine range of years to display
                    years = this._get(inst, "yearRange").split(":");
                    thisYear = new Date().getFullYear();
                    determineYear = function (value) {
                        var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
                        return (isNaN(year) ? thisYear : year);
                    };
                    year = determineYear(years[0]);
                    endYear = Math.max(year, determineYear(years[1] || ""));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += "<select class='ui-LunarDatepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; year <= endYear; year++) {
                        inst.yearshtml += "<option value='" + year + "'" +
						(year === drawYear ? " selected='selected'" : "") +
						">" + year + "</option>";
                    }
                    inst.yearshtml += "</select>";

                    html += inst.yearshtml;
                    inst.yearshtml = null;
                }
            }

            html += this._get(inst, "yearSuffix");
            if (showMonthAfterYear) {
                html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
            }
            html += "</div>"; // Close LunarDatepicker_header
            return html;
        },

        /* Adjust one of the date sub-fields. */
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period === "Y" ? offset : 0),
			month = inst.drawMonth + (period === "M" ? offset : 0),
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
			date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period === "M" || period === "Y") {
                this._notifyChange(inst);
            }
        },

        /* Ensure a date is within any min/max bounds. */
        _restrictMinMax: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			newDate = (minDate && date < minDate ? minDate : date);
            return (maxDate && newDate > maxDate ? maxDate : newDate);
        },

        /* Notify change of month/year. */
        _notifyChange: function (inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            if (onChange) {
                onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
            }
        },

        /* Determine the number of months to show. */
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
        },

        /* Determine the current maximum date - ensure no time components are set. */
        _getMinMaxDate: function (inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
        },

        /* Find the number of days in a given month. */
        _getDaysInMonth: function (year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
        },

        /* Find the day of the week of the first of a month. */
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay();
        },

        /* Determines if we should allow a "next/prev" month display change. */
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst),
			date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

            if (offset < 0) {
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            }
            return this._isInRange(inst, date);
        },

        /* Is the given date in the accepted range? */
        _isInRange: function (inst, date) {
            var yearSplit, currentYear,
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			minYear = null,
			maxYear = null,
			years = this._get(inst, "yearRange");
            if (years) {
                yearSplit = years.split(":");
                currentYear = new Date().getFullYear();
                minYear = parseInt(yearSplit[0], 10);
                maxYear = parseInt(yearSplit[1], 10);
                if (yearSplit[0].match(/[+\-].*/)) {
                    minYear += currentYear;
                }
                if (yearSplit[1].match(/[+\-].*/)) {
                    maxYear += currentYear;
                }
            }

            return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()) &&
			(!minYear || date.getFullYear() >= minYear) &&
			(!maxYear || date.getFullYear() <= maxYear));
        },

        /* Provide the configuration settings for formatting/parsing. */
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return { shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")
            };
        },

        /* Format the given date for display. */
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear;
            }
            var date = (day ? (typeof day === "object" ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
        }
    });

    /*
    * Bind hover events for LunarDatepicker elements.
    * Done via delegate so the binding only occurs once in the lifetime of the parent div.
    * Global instActive, set by _updateLunarDatepicker allows the handlers to find their way back to the active picker.
    */
    function bindHover(dpDiv) {
        var selector = "button, .ui-LunarDatepicker-prev, .ui-LunarDatepicker-next, .ui-LunarDatepicker-calendar td a";
        return dpDiv.delegate(selector, "mouseout", function () {
            $(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-LunarDatepicker-prev") !== -1) {
                $(this).removeClass("ui-LunarDatepicker-prev-hover");
            }
            if (this.className.indexOf("ui-LunarDatepicker-next") !== -1) {
                $(this).removeClass("ui-LunarDatepicker-next-hover");
            }
        })
		.delegate(selector, "mouseover", function () {
		    if (!$.LunarDatepicker._isDisabledLunarDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
		        $(this).parents(".ui-LunarDatepicker-calendar").find("a").removeClass("ui-state-hover");
		        $(this).addClass("ui-state-hover");
		        if (this.className.indexOf("ui-LunarDatepicker-prev") !== -1) {
		            $(this).addClass("ui-LunarDatepicker-prev-hover");
		        }
		        if (this.className.indexOf("ui-LunarDatepicker-next") !== -1) {
		            $(this).addClass("ui-LunarDatepicker-next-hover");
		        }
		    }
		});
    }

    /* jQuery extend now ignores nulls! */
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null) {
                target[name] = props[name];
            }
        }
        return target;
    }

    /* Invoke the LunarDatepicker functionality.
    @param  options  string - a command, optionally followed by additional parameters or
    Object - settings for attaching new LunarDatepicker functionality
    @return  jQuery object */
    $.fn.LunarDatepicker = function (options) {

        /* Verify an empty collection wasn't passed - Fixes #6976 */
        if (!this.length) {
            return this;
        }

        /* Initialise the date picker. */
        if (!$.LunarDatepicker.initialized) {
            $(document).mousedown($.LunarDatepicker._checkExternalClick);
            $.LunarDatepicker.initialized = true;
        }

        /* Append LunarDatepicker main container to body if not exist. */
        if ($("#" + $.LunarDatepicker._mainDivId).length === 0) {
            $("body").append($.LunarDatepicker.dpDiv);
        }

        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
            return $.LunarDatepicker["_" + options + "LunarDatepicker"].
			apply($.LunarDatepicker, [this[0]].concat(otherArgs));
        }
        if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return $.LunarDatepicker["_" + options + "LunarDatepicker"].
			apply($.LunarDatepicker, [this[0]].concat(otherArgs));
        }
        return this.each(function () {
            typeof options === "string" ?
			$.LunarDatepicker["_" + options + "LunarDatepicker"].
				apply($.LunarDatepicker, [this].concat(otherArgs)) :
			$.LunarDatepicker._attachLunarDatepicker(this, options);
        });
    };

    $.LunarDatepicker = new LunarDatepicker(); // singleton instance
    $.LunarDatepicker.initialized = false;
    $.LunarDatepicker.uuid = new Date().getTime();
    $.LunarDatepicker.version = "1.10.3";

})(jQuery);


//#######################################################################################################################
//#######################################################################################################################
//#######################################################################################################################
//#######################################################################################################################
/**
* Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.<p>
* Permission to use, copy, modify, and redistribute this software and its
* documentation for personal, non-commercial use is hereby granted provided that
* this copyright notice appears in all copies.
*/

var ABOUT = "\u00C2m l\u1ECBch Vi\u1EC7t Nam - Version 0.8" + "\n\u00A9 2004 H\u1ED3 Ng\u1ECDc \u0110\u1EE9c [http://come.to/duc]";
var TK19 = new Array(
	0x30baa3, 0x56ab50, 0x422ba0, 0x2cab61, 0x52a370, 0x3c51e8, 0x60d160, 0x4ae4b0, 0x376926, 0x58daa0,
	0x445b50, 0x3116d2, 0x562ae0, 0x3ea2e0, 0x28e2d2, 0x4ec950, 0x38d556, 0x5cb520, 0x46b690, 0x325da4,
	0x5855d0, 0x4225d0, 0x2ca5b3, 0x52a2b0, 0x3da8b7, 0x60a950, 0x4ab4a0, 0x35b2a5, 0x5aad50, 0x4455b0,
	0x302b74, 0x562570, 0x4052f9, 0x6452b0, 0x4e6950, 0x386d56, 0x5e5aa0, 0x46ab50, 0x3256d4, 0x584ae0,
	0x42a570, 0x2d4553, 0x50d2a0, 0x3be8a7, 0x60d550, 0x4a5aa0, 0x34ada5, 0x5a95d0, 0x464ae0, 0x2eaab4,
	0x54a4d0, 0x3ed2b8, 0x64b290, 0x4cb550, 0x385757, 0x5e2da0, 0x4895d0, 0x324d75, 0x5849b0, 0x42a4b0,
	0x2da4b3, 0x506a90, 0x3aad98, 0x606b50, 0x4c2b60, 0x359365, 0x5a9370, 0x464970, 0x306964, 0x52e4a0,
	0x3cea6a, 0x62da90, 0x4e5ad0, 0x392ad6, 0x5e2ae0, 0x4892e0, 0x32cad5, 0x56c950, 0x40d4a0, 0x2bd4a3,
	0x50b690, 0x3a57a7, 0x6055b0, 0x4c25d0, 0x3695b5, 0x5a92b0, 0x44a950, 0x2ed954, 0x54b4a0, 0x3cb550,
	0x286b52, 0x4e55b0, 0x3a2776, 0x5e2570, 0x4852b0, 0x32aaa5, 0x56e950, 0x406aa0, 0x2abaa3, 0x50ab50
); /* Years 2000-2099 */

var TK20 = new Array(
	0x3c4bd8, 0x624ae0, 0x4ca570, 0x3854d5, 0x5cd260, 0x44d950, 0x315554, 0x5656a0, 0x409ad0, 0x2a55d2,
	0x504ae0, 0x3aa5b6, 0x60a4d0, 0x48d250, 0x33d255, 0x58b540, 0x42d6a0, 0x2cada2, 0x5295b0, 0x3f4977,
	0x644970, 0x4ca4b0, 0x36b4b5, 0x5c6a50, 0x466d50, 0x312b54, 0x562b60, 0x409570, 0x2c52f2, 0x504970,
	0x3a6566, 0x5ed4a0, 0x48ea50, 0x336a95, 0x585ad0, 0x442b60, 0x2f86e3, 0x5292e0, 0x3dc8d7, 0x62c950,
	0x4cd4a0, 0x35d8a6, 0x5ab550, 0x4656a0, 0x31a5b4, 0x5625d0, 0x4092d0, 0x2ad2b2, 0x50a950, 0x38b557,
	0x5e6ca0, 0x48b550, 0x355355, 0x584da0, 0x42a5b0, 0x2f4573, 0x5452b0, 0x3ca9a8, 0x60e950, 0x4c6aa0,
	0x36aea6, 0x5aab50, 0x464b60, 0x30aae4, 0x56a570, 0x405260, 0x28f263, 0x4ed940, 0x38db47, 0x5cd6a0,
	0x4896d0, 0x344dd5, 0x5a4ad0, 0x42a4d0, 0x2cd4b4, 0x52b250, 0x3cd558, 0x60b540, 0x4ab5a0, 0x3755a6,
	0x5c95b0, 0x4649b0, 0x30a974, 0x56a4b0, 0x40aa50, 0x29aa52, 0x4e6d20, 0x39ad47, 0x5eab60, 0x489370,
	0x344af5, 0x5a4970, 0x4464b0, 0x2c74a3, 0x50ea50, 0x3d6a58, 0x6256a0, 0x4aaad0, 0x3696d5, 0x5c92e0
); /* Years 1900-1999 */

var TK21 = new Array(
	0x46c960, 0x2ed954, 0x54d4a0, 0x3eda50, 0x2a7552, 0x4e56a0, 0x38a7a7, 0x5ea5d0, 0x4a92b0, 0x32aab5,
	0x58a950, 0x42b4a0, 0x2cbaa4, 0x50ad50, 0x3c55d9, 0x624ba0, 0x4ca5b0, 0x375176, 0x5c5270, 0x466930,
	0x307934, 0x546aa0, 0x3ead50, 0x2a5b52, 0x504b60, 0x38a6e6, 0x5ea4e0, 0x48d260, 0x32ea65, 0x56d520,
	0x40daa0, 0x2d56a3, 0x5256d0, 0x3c4afb, 0x6249d0, 0x4ca4d0, 0x37d0b6, 0x5ab250, 0x44b520, 0x2edd25,
	0x54b5a0, 0x3e55d0, 0x2a55b2, 0x5049b0, 0x3aa577, 0x5ea4b0, 0x48aa50, 0x33b255, 0x586d20, 0x40ad60,
	0x2d4b63, 0x525370, 0x3e49e8, 0x60c970, 0x4c54b0, 0x3768a6, 0x5ada50, 0x445aa0, 0x2fa6a4, 0x54aad0,
	0x4052e0, 0x28d2e3, 0x4ec950, 0x38d557, 0x5ed4a0, 0x46d950, 0x325d55, 0x5856a0, 0x42a6d0, 0x2c55d4,
	0x5252b0, 0x3ca9b8, 0x62a930, 0x4ab490, 0x34b6a6, 0x5aad50, 0x4655a0, 0x2eab64, 0x54a570, 0x4052b0,
	0x2ab173, 0x4e6930, 0x386b37, 0x5e6aa0, 0x48ad50, 0x332ad5, 0x582b60, 0x42a570, 0x2e52e4, 0x50d160,
	0x3ae958, 0x60d520, 0x4ada90, 0x355aa6, 0x5a56d0, 0x462ae0, 0x30a9d4, 0x54a2d0, 0x3ed150, 0x28e952
); /* Years 2000-2099 */

var TK22 = new Array(
		0x4eb520, 0x38d727, 0x5eada0, 0x4a55b0, 0x362db5, 0x5a45b0, 0x44a2b0, 0x2eb2b4, 0x54a950, 0x3cb559,
		0x626b20, 0x4cad50, 0x385766, 0x5c5370, 0x484570, 0x326574, 0x5852b0, 0x406950, 0x2a7953, 0x505aa0,
		0x3baaa7, 0x5ea6d0, 0x4a4ae0, 0x35a2e5, 0x5aa550, 0x42d2a0, 0x2de2a4, 0x52d550, 0x3e5abb, 0x6256a0,
		0x4c96d0, 0x3949b6, 0x5e4ab0, 0x46a8d0, 0x30d4b5, 0x56b290, 0x40b550, 0x2a6d52, 0x504da0, 0x3b9567,
		0x609570, 0x4a49b0, 0x34a975, 0x5a64b0, 0x446a90, 0x2cba94, 0x526b50, 0x3e2b60, 0x28ab61, 0x4c9570,
		0x384ae6, 0x5cd160, 0x46e4a0, 0x2eed25, 0x54da90, 0x405b50, 0x2c36d3, 0x502ae0, 0x3a93d7, 0x6092d0,
		0x4ac950, 0x32d556, 0x58b4a0, 0x42b690, 0x2e5d94, 0x5255b0, 0x3e25fa, 0x6425b0, 0x4e92b0, 0x36aab6,
		0x5c6950, 0x4674a0, 0x31b2a5, 0x54ad50, 0x4055a0, 0x2aab73, 0x522570, 0x3a5377, 0x6052b0, 0x4a6950,
		0x346d56, 0x585aa0, 0x42ab50, 0x2e56d4, 0x544ae0, 0x3ca570, 0x2864d2, 0x4cd260, 0x36eaa6, 0x5ad550,
		0x465aa0, 0x30ada5, 0x5695d0, 0x404ad0, 0x2aa9b3, 0x50a4d0, 0x3ad2b7, 0x5eb250, 0x48b540, 0x33d556
); /* Years 2100-2199 */

var CAN = new Array("Gi\341p", "\u1EA4t", "B\355nh", "\u0110inh", "M\u1EADu", "K\u1EF7", "Canh", "T\342n", "Nh\342m", "Qu\375");
var CHI = new Array("T\375", "S\u1EEDu", "D\u1EA7n", "M\343o", "Th\354n", "T\u1EF5", "Ng\u1ECD", "M\371i", "Th\342n", "D\u1EADu", "Tu\u1EA5t", "H\u1EE3i");
var TUAN = new Array("Ch\u1EE7 nh\u1EADt", "Th\u1EE9 hai", "Th\u1EE9 ba", "Th\u1EE9 t\u01B0", "Th\u1EE9 n\u0103m", "Th\u1EE9 s\341u", "Th\u1EE9 b\u1EA3y");
var GIO_HD = new Array("110100101100", "001101001011", "110011010010", "101100110100", "001011001101", "010010110011");
var TIETKHI = new Array("Xu\u00E2n ph\u00E2n", "Thanh minh", "C\u1ED1c v\u0169", "L\u1EADp h\u1EA1", "Ti\u1EC3u m\u00E3n", "Mang ch\u1EE7ng",
	"H\u1EA1 ch\u00ED", "Ti\u1EC3u th\u1EED", "\u0110\u1EA1i th\u1EED", "L\u1EADp thu", "X\u1EED th\u1EED", "B\u1EA1ch l\u1ED9",
	"Thu ph\u00E2n", "H\u00E0n l\u1ED9", "S\u01B0\u01A1ng gi\u00E1ng", "L\u1EADp \u0111\u00F4ng", "Ti\u1EC3u tuy\u1EBFt", "\u0110\u1EA1i tuy\u1EBFt",
	"\u0110\u00F4ng ch\u00ED", "Ti\u1EC3u h\u00E0n", "\u0110\u1EA1i h\u00E0n", "L\u1EADp xu\u00E2n", "V\u0169 Th\u1EE7y", "Kinh tr\u1EADp"
);

/* Create lunar date object, stores (lunar) date, month, year, leap month indicator, and Julian date number */
function LunarDate(dd, mm, yy, leap, jd) {
    this.day = dd;
    this.month = mm;
    this.year = yy;
    this.leap = leap;
    this.jd = jd;
}

var PI = Math.PI;

/* Discard the fractional part of a number, e.g., INT(3.2) = 3 */
function INT(d) {
    return Math.floor(d);
}

function jdn(dd, mm, yy) {
    //alert(dd+"-" +mm+"-"+ yy);
    mm = parseInt(mm);
    dd = parseInt(dd);
    yy = parseInt(yy);

    var a = INT((14 - mm) / 12);
    var y = yy + 4800 - a;
    var m = mm + 12 * a - 3;
    var jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;



    return jd;

}

function jdn2date(jd) {
    var Z, A, alpha, B, C, D, E, dd, mm, yyyy, F;
    Z = jd;
    if (Z < 2299161) {
        A = Z;
    } else {
        alpha = INT((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - INT(alpha / 4);
    }
    B = A + 1524;
    C = INT((B - 122.1) / 365.25);
    D = INT(365.25 * C);
    E = INT((B - D) / 30.6001);
    dd = INT(B - D - INT(30.6001 * E));
    if (E < 14) {
        mm = E - 1;
    } else {
        mm = E - 13;
    }
    if (mm < 3) {
        yyyy = C - 4715;
    } else {
        yyyy = C - 4716;
    }
    return new Array(dd, mm, yyyy);
}

function decodeLunarYear(yy, k) {
    var monthLengths, regularMonths, offsetOfTet, leapMonth, leapMonthLength, solarNY, currentJD, j, mm;
    var ly = new Array();
    monthLengths = new Array(29, 30);
    regularMonths = new Array(12);
    offsetOfTet = k >> 17;
    leapMonth = k & 0xf;
    leapMonthLength = monthLengths[k >> 16 & 0x1];
    solarNY = jdn(1, 1, yy);
    currentJD = solarNY + offsetOfTet;
    j = k >> 4;
    for (i = 0; i < 12; i++) {
        regularMonths[12 - i - 1] = monthLengths[j & 0x1];
        j >>= 1;
    }
    if (leapMonth == 0) {
        for (mm = 1; mm <= 12; mm++) {
            ly.push(new LunarDate(1, mm, yy, 0, currentJD));
            currentJD += regularMonths[mm - 1];
        }
    } else {
        for (mm = 1; mm <= leapMonth; mm++) {
            ly.push(new LunarDate(1, mm, yy, 0, currentJD));
            currentJD += regularMonths[mm - 1];
        }
        ly.push(new LunarDate(1, leapMonth, yy, 1, currentJD));
        currentJD += leapMonthLength;
        for (mm = leapMonth + 1; mm <= 12; mm++) {
            ly.push(new LunarDate(1, mm, yy, 0, currentJD));
            currentJD += regularMonths[mm - 1];
        }
    }
    return ly;
}

function getYearInfo(yyyy) {
    var yearCode;
    if (yyyy < 1900) {
        yearCode = TK19[yyyy - 1800];
    } else if (yyyy < 2000) {
        yearCode = TK20[yyyy - 1900];
    } else if (yyyy < 2100) {
        yearCode = TK21[yyyy - 2000];
    } else {
        yearCode = TK22[yyyy - 2100];
    }
    return decodeLunarYear(yyyy, yearCode);
}

var FIRST_DAY = jdn(25, 1, 1800); // Tet am lich 1800
var LAST_DAY = jdn(31, 12, 2199);

function findLunarDate(jd, ly) {
    if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
        return new LunarDate(0, 0, 0, 0, jd);
    }
    var i = ly.length - 1;
    while (jd < ly[i].jd) {
        i--;
    }
    var off = jd - ly[i].jd;
    ret = new LunarDate(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd);
    return ret;
}


function ConvertSonarDateToLunarDate(SonarDay, SonarMonth, SonarYear, dateFormat) {

    var aLunarDate = getLunarDate(SonarDay, parseInt(SonarMonth), SonarYear);

    var LunarDay = String(aLunarDate.day);
    var LunarMonth = String(aLunarDate.month);
    var LunarYear = String(aLunarDate.year);

    if (aLunarDate.day < 10) {
        LunarDay = "0" + String(aLunarDate.day);
    }
    if (aLunarDate.month < 10) {
        LunarMonth = "0" + String(aLunarDate.month);
    }

    if (dateFormat == "dd/MM/yyyy") {

        return LunarDay + "/" + LunarMonth + "/" + aLunarDate.year;
    }
    else if (dateFormat == "MM/dd/yyyy") {
        return LunarMonth + "/" + LunarDay + "/" + aLunarDate.year;
    }
    else if (dateFormat == "yyyy/MM/dd") {
        return aLunarDate.year + "/" + LunarMonth + "/" + LunarDay;
    }
    else {
        return LunarDay + "/" + LunarMonth + "/" + aLunarDate.year;
    }
}


function getLunarDate(dd, mm, yyyy) {

    var ly, jd;
    if (yyyy < 1800 || 2199 < yyyy) {
        //return new LunarDate(0, 0, 0, 0, 0);
    }
    ly = getYearInfo(yyyy);
    jd = jdn(dd, mm, yyyy);

    if (jd < ly[0].jd) {
        ly = getYearInfo(yyyy - 1);
    }
    return findLunarDate(jd, ly);
}

/* Compute the longitude of the sun at any time.
* Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
* Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
*/
function SunLongitude(jdn) {
    var T, T2, dr, M, L0, DL, lambda, theta, omega;
    T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    T2 = T * T;
    dr = PI / 180; // degree to radian
    M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
    L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
    DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    theta = L0 + DL; // true longitude, degree
    // obtain apparent longitude by correcting for nutation and aberration
    omega = 125.04 - 1934.136 * T;
    lambda = theta - 0.00569 - 0.00478 * Math.sin(omega * dr);
    // Convert to radians
    lambda = lambda * dr;
    lambda = lambda - PI * 2 * (INT(lambda / (PI * 2))); // Normalize to (0, 2*PI)
    return lambda;
}

/* Compute the sun segment at start (00:00) of the day with the given integral Julian day number.
* The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
* The function returns a number between 0 and 23.
* From the day after March equinox and the 1st major term after March equinox, 0 is returned.
* After that, return 1, 2, 3 ...
*/
function getSunLongitude(dayNumber, timeZone) {
    return INT(SunLongitude(dayNumber - 0.5 - timeZone / 24.0) / PI * 12);
}

var today = new Date();
//var currentLunarYear = getYearInfo(today.getFullYear());
var currentLunarDate = getLunarDate(today.getDate(), today.getMonth() + 1, today.getFullYear());
var currentMonth = today.getMonth() + 1;
var currentYear = today.getFullYear();

function parseQuery(q) {
    var ret = new Array();
    if (q.length < 2) return ret;
    var s = q.substring(1, q.length);
    var arr = s.split("&");
    var i, j;
    for (i = 0; i < arr.length; i++) {
        var a = arr[i].split("=");
        for (j = 0; j < a.length; j++) {
            ret.push(a[j]);
        }
    }
    return ret;
}

function getSelectedMonth() {
    var query = window.location.search;
    var arr = parseQuery(query);
    var idx;
    for (idx = 0; idx < arr.length; idx++) {
        if (arr[idx] == "mm") {
            currentMonth = parseInt(arr[idx + 1]);
        } else if (arr[idx] == "yy") {
            currentYear = parseInt(arr[idx + 1]);
        }
    }
}

function getMonth(mm, yy) {
    var ly1, ly2, tet1, jd1, jd2, mm1, yy1, result, i;
    if (mm < 12) {
        mm1 = mm + 1;
        yy1 = yy;
    } else {
        mm1 = 1;
        yy1 = yy + 1;
    }
    jd1 = jdn(1, mm, yy);
    jd2 = jdn(1, mm1, yy1);
    ly1 = getYearInfo(yy);
    //alert('1/'+mm+'/'+yy+' = '+jd1+'; 1/'+mm1+'/'+yy1+' = '+jd2);
    tet1 = ly1[0].jd;
    result = new Array();
    if (tet1 <= jd1) { /* tet(yy) = tet1 < jd1 < jd2 <= 1.1.(yy+1) < tet(yy+1) */
        for (i = jd1; i < jd2; i++) {
            result.push(findLunarDate(i, ly1));
        }
    } else if (jd1 < tet1 && jd2 < tet1) { /* tet(yy-1) < jd1 < jd2 < tet1 = tet(yy) */
        ly1 = getYearInfo(yy - 1);
        for (i = jd1; i < jd2; i++) {
            result.push(findLunarDate(i, ly1));
        }
    } else if (jd1 < tet1 && tet1 <= jd2) { /* tet(yy-1) < jd1 < tet1 <= jd2 < tet(yy+1) */
        ly2 = getYearInfo(yy - 1);
        for (i = jd1; i < tet1; i++) {
            result.push(findLunarDate(i, ly2));
        }
        for (i = tet1; i < jd2; i++) {
            result.push(findLunarDate(i, ly1));
        }
    }
    return result;
}

function getDayName(lunarDate) {
    if (lunarDate.day == 0) {
        return "";
    }
    var cc = getCanChi(lunarDate);
    var s = "Ng\u00E0y " + cc[0] + ", th\341ng " + cc[1] + ", n\u0103m " + cc[2];
    return s;
}

function getYearCanChi(year) {
    return CAN[(year + 6) % 10] + " " + CHI[(year + 8) % 12];
}

/*
* Can cua gio Chinh Ty (00:00) cua ngay voi JDN nay
*/
function getCanHour0(jdn) {
    return CAN[(jdn - 1) * 2 % 10];
}

function getCanChi(lunar) {
    var dayName, monthName, yearName;
    dayName = CAN[(lunar.jd + 9) % 10] + " " + CHI[(lunar.jd + 1) % 12];
    monthName = CAN[(lunar.year * 12 + lunar.month + 3) % 10] + " " + CHI[(lunar.month + 1) % 12];
    if (lunar.leap == 1) {
        monthName += " (nhu\u1EADn)";
    }
    yearName = getYearCanChi(lunar.year);
    return new Array(dayName, monthName, yearName);
}

function getDayString(lunar, solarDay, solarMonth, solarYear) {
    var s;
    var dayOfWeek = TUAN[(lunar.jd + 1) % 7];
    s = dayOfWeek + " " + solarDay + "/" + solarMonth + "/" + solarYear;
    s += " -+- ";
    s = s + "Ng\u00E0y " + lunar.day + " th\341ng " + lunar.month;
    if (lunar.leap == 1) {
        s = s + " nhu\u1EADn";
    }
    return s;
}

function getTodayString() {
    var s = getDayString(currentLunarDate, today.getDate(), today.getMonth() + 1, today.getFullYear());
    s += " n\u0103m " + getYearCanChi(currentLunarDate.year);
    return s;
}

function getCurrentTime() {
    today = new Date();
    var Std = today.getHours();
    var Min = today.getMinutes();
    var Sec = today.getSeconds();
    var s1 = ((Std < 10) ? "0" + Std : Std);
    var s2 = ((Min < 10) ? "0" + Min : Min);
    //var s3  = ((Sec < 10) ? "0" + Sec : Sec);
    //return s1 + ":" + s2 + ":" + s3;
    return s1 + ":" + s2;
}

function getGioHoangDao(jd) {
    var chiOfDay = (jd + 1) % 12;
    var gioHD = GIO_HD[chiOfDay % 6]; // same values for Ty' (1) and Ngo. (6), for Suu and Mui etc.
    var ret = "";
    var count = 0;
    for (var i = 0; i < 12; i++) {
        if (gioHD.charAt(i) == '1') {
            ret += CHI[i];
            ret += ' (' + (i * 2 + 23) % 24 + '-' + (i * 2 + 1) % 24 + ')';
            if (count++ < 5) ret += ', ';
            if (count == 3) ret += '\n';
        }
    }
    return ret;
}

var DAYNAMES = new Array("CN", "T2", "T3", "T4", "T5", "T6", "T7");
var PRINT_OPTS = new OutputOptions();
var FONT_SIZES = new Array("9pt", "13pt", "17pt");
var TAB_WIDTHS = new Array("180px", "420px", "600px");

function OutputOptions() {
    this.fontSize = "13pt";
    this.tableWidth = "420px";
}

function setOutputSize(size) {
    var idx = 1;
    if (size == "small") {
        idx = 0;
    } else if (size == "big") {
        idx = 2;
    } else {
        idx = 1;
    }
    PRINT_OPTS.fontSize = FONT_SIZES[idx];
    PRINT_OPTS.tableWidth = TAB_WIDTHS[idx];
}

function printSelectedMonth() {
    getSelectedMonth();
    return printMonth(currentMonth, currentYear);
}

function printMonth(mm, yy) {
    var res = "";
    res += printStyle();
    res += printTable(mm, yy);
    res += printFoot();
    return res;
}

function printYear(yy) {
    var yearName = "N&#x103;m " + getYearCanChi(yy) + " " + yy;
    var res = "";
    res += printStyle();
    res += '<table align=center>\n';
    res += ('<tr><td colspan="3" class="tennam" onClick="showYearSelect();">' + yearName + '</td></tr>\n');
    for (var i = 1; i <= 12; i++) {
        if (i % 3 == 1) res += '<tr>\n';
        res += '<td>\n';
        res += printTable(i, yy);
        res += '</td>\n';
        if (i % 3 == 0) res += '</tr>\n';
    }
    res += '<table>\n';
    res += printFoot();
    return res;
}

function printSelectedYear() {
    getSelectedMonth();
    return printYear(currentYear);
}

function printStyle() {
    var fontSize = PRINT_OPTS.fontSize;
    var res = "";
    res += '<style type="text/css">\n';
    res += '<!--\n';
    //res += '  body {margin:0}\n';
    res += '  .tennam {text-align:center; font-size:150%; line-height:120%; font-weight:bold; color:#000000; background-color: #CCCCCC}\n';
    res += '  .thang {font-size: ' + fontSize + '; padding:1; line-height:100%; font-family:Tahoma,Verdana,Arial; table-layout:fixed}\n';
    res += '  .tenthang {text-align:center; font-size:125%; line-height:100%; font-weight:bold; color:#330033; background-color: #CCFFCC}\n';
    res += '  .navi-l {text-align:center; font-size:75%; line-height:100%; font-family:Verdana,Times New Roman,Arial; font-weight:bold; color:red; background-color: #CCFFCC}\n';
    res += '  .navi-r {text-align:center; font-size:75%; line-height:100%; font-family:Verdana,Arial,Times New Roman; font-weight:bold; color:#330033; background-color: #CCFFCC}\n';
    res += '  .ngaytuan {width:14%; text-align:center; font-size:125%; line-height:100%; color:#330033; background-color: #FFFFCC}\n';
    res += '  .ngaythang {background-color:#FDFDF0}\n';
    res += '  .homnay {background-color:#FFF000}\n';
    res += '  .tet {background-color:#FFCC99}\n';
    res += '  .am {text-align:right;font-size:75%;line-height:100%;color:blue}\n';
    res += '  .am2 {text-align:right;font-size:75%;line-height:100%;color:#004080}\n';
    res += '  .t2t6 {text-align:left;font-size:125%;color:black}\n';
    res += '  .t7 {text-align:left;font-size:125%;line-height:100%;color:green}\n';
    res += '  .cn {text-align:left;font-size:125%;line-height:100%;color:red}\n';
    res += '-->\n';
    res += '</style>\n';
    return res;
}

function printTable(mm, yy) {
    var i, j, k, solar, lunar, cellClass, solarClass, lunarClass;
    var currentMonth = getMonth(mm, yy);
    if (currentMonth.length == 0) return;
    var ld1 = currentMonth[0];
    var emptyCells = (ld1.jd + 1) % 7;
    var MonthHead = mm + "/" + yy;
    var LunarHead = getYearCanChi(ld1.year);
    var res = "";
    res += ('<table class="thang" border="2" cellpadding="1" cellspacing="1" width="' + PRINT_OPTS.tableWidth + '">\n');
    res += printHead(mm, yy);
    for (i = 0; i < 6; i++) {
        res += ("<tr>\n");
        for (j = 0; j < 7; j++) {
            k = 7 * i + j;
            if (k < emptyCells || k >= emptyCells + currentMonth.length) {
                res += printEmptyCell();
            } else {
                solar = k - emptyCells + 1;
                ld1 = currentMonth[k - emptyCells];
                res += printCell(ld1, solar, mm, yy);
            }
        }
        res += ("</tr>\n");
    }
    res += ('</table>\n');
    return res;
}

function getPrevMonthLink(mm, yy) {
    var mm1 = mm > 1 ? mm - 1 : 12;
    var yy1 = mm > 1 ? yy : yy - 1;
    //return '<a href="'+window.location.pathname+'?yy='+yy1+'&mm='+mm1+'"><img src="left1.gif" width=8 height=12 alt="PrevMonth" border=0></a>';
    return '<a href="' + window.location.pathname + '?yy=' + yy1 + '&mm=' + mm1 + '">&lt;</a>';
}

function getNextMonthLink(mm, yy) {
    var mm1 = mm < 12 ? mm + 1 : 1;
    var yy1 = mm < 12 ? yy : yy + 1;
    //return '<a href="'+window.location.pathname+'?yy='+yy1+'&mm='+mm1+'"><img src="right1.gif" width=8 height=12 alt="NextMonth" border=0></a>';
    return '<a href="' + window.location.pathname + '?yy=' + yy1 + '&mm=' + mm1 + '">&gt;</a>';
}

function getPrevYearLink(mm, yy) {
    //return '<a href="'+window.location.pathname+'?yy='+(yy-1)+'&mm='+mm+'"><img src="left2.gif" width=16 height=12 alt="PrevYear" border=0></a>';
    return '<a href="' + window.location.pathname + '?yy=' + (yy - 1) + '&mm=' + mm + '">&lt;&lt;</a>';
}

function getNextYearLink(mm, yy) {
    //return '<a href="'+window.location.pathname+'?yy='+(yy+1)+'&mm='+mm+'"><img src="right2.gif" width=16 height=12 alt="NextYear" border=0></a>';
    return '<a href="' + window.location.pathname + '?yy=' + (yy + 1) + '&mm=' + mm + '">&gt;&gt;</a>';
}

function printHead(mm, yy) {
    var res = "";
    var monthName = mm + "/" + yy;
    //res += ('<tr><td colspan="7" class="tenthang" onClick="showMonthSelect();">'+monthName+'</td></tr>\n');
    res += ('<tr><td colspan="2" class="navi-l">' + getPrevYearLink(mm, yy) + ' &nbsp;' + getPrevMonthLink(mm, yy) + '</td>\n');
    //res += ('<td colspan="1" class="navig"><a href="'+getPrevMonthLink(mm, yy)+'"><img src="left1.gif" alt="Prev"></a></td>\n');
    res += ('<td colspan="3" class="tenthang" onClick="showMonthSelect();">' + monthName + '</td>\n');
    //res += ('<td colspan="1" class="navi-r"><a href="'+getNextMonthLink(mm, yy)+'"><img src="right1.gif" alt="Next"></a></td>\n');
    res += ('<td colspan="2" class="navi-r">' + getNextMonthLink(mm, yy) + ' &nbsp;' + getNextYearLink(mm, yy) + '</td></tr>\n');
    //res += ('<tr><td colspan="7" class="tenthang"><a href="'+getNextMonthLink(mm, yy)+'"><img src="right.gif" alt="Next"></a></td></tr>\n');
    res += ('<tr onClick="alertAbout();">\n');
    for (var i = 0; i <= 6; i++) {
        res += ('<td class=ngaytuan>' + DAYNAMES[i] + '</td>\n');
    }
    res += ('<\/tr>\n');
    return res;
}

function printEmptyCell() {
    return '<td class=ngaythang><div class=cn>&nbsp;</div> <div class=am>&nbsp;</div></td>\n';
}

function printCell(lunarDate, solarDate, solarMonth, solarYear) {
    var cellClass, solarClass, lunarClass, solarColor;
    cellClass = "ngaythang";
    solarClass = "t2t6";
    lunarClass = "am";
    solarColor = "black";
    var dow = (lunarDate.jd + 1) % 7;
    if (dow == 0) {
        solarClass = "cn";
        solarColor = "red";
    } else if (dow == 6) {
        solarClass = "t7";
        solarColor = "green";
    }
    if (solarDate == today.getDate() && solarMonth == today.getMonth() + 1 && solarYear == today.getFullYear()) {
        cellClass = "homnay";
    }
    if (lunarDate.day == 1 && lunarDate.month == 1) {
        cellClass = "tet";
    }
    if (lunarDate.leap == 1) {
        lunarClass = "am2";
    }
    var lunar = lunarDate.day;
    if (solarDate == 1 || lunar == 1) {
        lunar = lunarDate.day + "/" + lunarDate.month;
    }
    var res = "";
    var args = lunarDate.day + "," + lunarDate.month + "," + lunarDate.year + "," + lunarDate.leap;
    args += ("," + lunarDate.jd + "," + solarDate + "," + solarMonth + "," + solarYear);
    res += ('<td class="' + cellClass + '"');
    if (lunarDate != null) res += (' title="' + getDayName(lunarDate) + '" onClick="alertDayInfo(' + args + ');"');
    res += (' <div style=color:' + solarColor + ' class="' + solarClass + '">' + solarDate + '</div> <div class="' + lunarClass + '">' + lunar + '</div></td>\n');
    return res;
}

function printFoot() {
    var res = "";
    res += '';
    return res;
}

function showMonthSelect() {
    var home = "";
    window.open(home, "win2702", "menubar=yes,scrollbars=yes,status=yes,toolbar=yes,resizable=yes,location=yes");
    //window.location = home;
    //alertAbout();
}

function showYearSelect() {
    //window.open("selectyear.html", "win2702", "menubar=yes,scrollbars=yes");
    window.print();
}

function infoCellSelect(id) {
    if (id == 0) {
    }
}

function alertDayInfo(dd, mm, yy, leap, jd, sday, smonth, syear) {
    var lunar = new LunarDate(dd, mm, yy, leap, jd);
    var s = getDayString(lunar, sday, smonth, syear);
    s += " \u00E2m l\u1ECBch\n";
    s += getDayName(lunar);
    s += "\nGi\u1EDD \u0111\u1EA7u ng\u00E0y: " + getCanHour0(jd) + " " + CHI[0];
    s += "\nTi\u1EBFt: " + TIETKHI[getSunLongitude(jd + 1, 7.0)];
    s += "\nGi\u1EDD ho\u00E0ng \u0111\u1EA1o: " + getGioHoangDao(jd);
    alert(s);
}

function alertAbout() {
    alert(ABOUT);
}

function showVietCal() {

    window.status = getCurrentTime() + " -+- " + getTodayString();
    window.window.setTimeout("showVietCal();", 5000);
}

//showVietCal();
