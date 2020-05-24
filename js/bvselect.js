(function($) {
    $.fn.BVSelect = function(parameters) {

        // VARIABLES
        var selectorID = $(this).attr("id"); // Selector ID
        var select = $(this); // Native Selector Object
        var randomID = Math.floor(Math.random() * (9999 - 0 + 1)) + 0; // Random ID Generated
        var selectedIDFocus = 0; // Save wich dropdown is currently open
        var selectedMultiple = []; //

        // SETUP LIST
        function SetListBV(options) {
            options.find("option").each(function(index, element) {
                // Separator Element
                if (element.disabled == true) {
                    var is_disabled = "bv_disabled"
                } else {
                    is_disabled = ""
                }
                // Disabled Element   
                if ($(this).data('separator') == true) {
                    var is_separator = "bv_separator"
                } else {
                    is_separator = ""
                }
                // Check for Attachment  
                if ($(this).data("img")) {
                    var has_attachment = "<img src=" + $(this).data('img') + ">";
                } else {
                    if ($(this).data("icon")) {
                        var has_attachment = "<i class='" + $(this).data('icon') + "' aria-hidden='true'></i>";
                    } else {
                        var has_attachment = "";
                    }
                }
                // Apend li to ul
                $("#ul_" + randomID).append("<li class='" + is_disabled + " " + is_separator + "'  > " + has_attachment + " " + $(this).text() + "</li>");
            });

            // ** SELECT OPTION  **
            $("#ul_" + randomID).children().click(function(event) {
                if ($(this).hasClass("nofocus") || $(this).hasClass("bv_disabled")) {} else // if this li is searchbox
                {
                    var index = $(this).index(); // Index of list
                    if ($("#ul_" + randomID + " li").hasClass("nofocus")) {
                        index = index - 1;
                    } // Fix for lists with extra Li (Searchbar)
                    var SelectedNames = "";

                    // Checks if user is holding any below keys
                    if (select.is("[multiple]")) // Check if native select has multiple attribute
                    {
                            event.preventDefault();
                            $("#" + selectorID).removeAttr("selected"); // Removes all selections
                            if (selectedMultiple.indexOf(index) > -1) {
                                $('#' + selectorID + " option:eq(" + index + ")").removeAttr("selected");
                                var index_test = selectedMultiple.indexOf(index);
                                selectedMultiple.splice(index_test, 1);
                            } else {
                                selectedMultiple.push(index);
                            } // Adds to array 

                            // Check if array is empty, if it is, gets the first option
                            if (selectedMultiple.length == 0) {
                                SelectedNames = options.find("option:eq(0)").text();
                            } else {

                                for (var i = 0; i < selectedMultiple.length; i++) {
                                    var indexValFromArray = selectedMultiple[i];
                                    $('#' + selectorID + " option:eq(" + indexValFromArray + ")").prop('selected', true);
                                    if ($('#' + selectorID + " option:eq(" + indexValFromArray + ")").text() != "undefined") // Removes the first selection
                                    {
                                        SelectedNames = SelectedNames + ", " + $('#' + selectorID + " option:eq(" + indexValFromArray + ")").text();
                                    }
                                }
                                SelectedNames = SelectedNames.substring(2);
                            }
                            // Adds the texto o the main DIV
                            $("#main_" + randomID).html(SelectedNames + " <i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>");
                        
                    } else {
                        if ($(this).hasClass("bv_disabled")) {} else {
                            $("#main_" + randomID).html($(this).text() + " <i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>");
                            $("#" + selectorID).removeAttr("selected"); // Removes all selected options in case of used multiple before
                            selectedMultiple = []; // Empty array of Multiple Selected
                            $("#" + selectorID).prop("selectedIndex", index).trigger("change");
                            $("#ul_" + randomID).slideUp("fast");
                            $("#input_" + randomID).val("").keyup();
                            selectedIDFocus = 0;
                        }
                    }
                }
            });

            // ** SEARCHBAR  **
            $("#input_" + randomID).on("keyup", function() {
                var value = this.value.toLowerCase().trim();
                $("#ul_" + randomID + " li").show().filter(function() {
                    if ($(this).hasClass("nofocus") == false) {
                        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
                    }
                }).hide();
            });

            // ** HIDE WHEN CLICK OUTSIDE ** 
            $(document).on('click.bv_mainselect', function(event) {
                if ($(event.target).closest('.bv_mainselect').length === 0) {
                    $("#ul_" + randomID).hide();
                    $("#arrow_" + randomID).removeClass("up").addClass("down");
                    $(".bv_input").val("").keyup();

                    // Reset ViewPort Offset
                    selectedIDFocus = 0;
                    $(".bv_ul_inner").css("position", "absolute");
                    $(".bv_ul_inner").css("bottom", "");
                }
            });
        }

        // ON SCROLL EVENT TO PREVENT OUT OF VIEWPORT
        $(window).scroll(function() {
            // If Dropdown in focus
            if (selectedIDFocus != 0) {
                var currentWindowViewOffSet = $(window).scrollTop() + $(window).height(); // Window Offset
                var currentElementViewOffSet = $("#main_" + randomID).offset().top; // Main Element Offset
                var MainDivOff = $("#ul_" + randomID).height(); // Height of the List
                var DiffBetW = currentWindowViewOffSet - currentElementViewOffSet // Difference between Element and Window
                // If Difference is greater than List's height
                if (DiffBetW > MainDivOff) {
                    FixVerticalViewPort();
                }
            }
        });

        // SETUP BASE DIV
        function SetBaseBV(options, config) {
            options.after($('<div id="bv_' + randomID + '" data-search="' + config.searchbox + '" style="width:' + config.width + ';"></div>').addClass('bv_mainselect ').addClass(options.attr('class') || '').addClass(options.attr('disabled') ? 'disabled' : '').attr('tabindex', options.attr('disabled') ? null : '0'));
            $("#bv_" + randomID).append('<div id="main_' + randomID + '" class="bv_atual bv_background"></div><ul id="ul_' + randomID + '" class="bv_ul_inner bv_background"></ul>');

            if (config.searchbox == true) {
                $("#ul_" + randomID).prepend('<li class="nofocus"><div class="innerinput"><input placeholder="Search..." class="bv_input" id="input_' + randomID + '" type="text"></div</li>');
            }

            var select_width = $("#main_" + randomID).width();
            $("#ul_" + randomID).css("width", select_width + 24 + "px");

            var selected_option = options.find("option:selected").text();
            if (selected_option == "") {
                var selected_option = options.find("option:eq(0)").text();
            }
            $("#main_" + randomID).html(selected_option + "<i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>");

            // ** MAIN DIV CLICK ** 
            $("#main_" + randomID).click(function() {

                // Check if it is open, if yes, close it.
                if ($("#ul_" + randomID).css('display') == 'block') {
                    $(".bv_ul_inner").slideUp("fast");
                    $(".arrows_bv").removeClass("up").addClass("down");
                } else {
                    $(".bv_ul_inner").hide();
                    $("#ul_" + randomID).slideDown("fast");
                    $(".arrows_bv").removeClass("up").addClass("down");
                    $("#arrow_" + randomID).removeClass("down").addClass("up");

                    if (parameters.offset == true) {
                        FixVerticalViewPort();
                    }
                }
            });
            // Append List
            SetListBV(options);
        }

        // FIX VIEWPORT OFFSET
        function FixVerticalViewPort() {
            var currentWindowView = $(window).scrollTop() + $(window).height();
            var currentElementView = $("#ul_" + randomID + " li:last-child").offset().top;
            // +50 to fix outer border
            if (Math.round(currentElementView + 50) > Math.round(currentWindowView)) {
                selectedIDFocus = randomID;
                $("#ul_" + randomID).css("position", "fixed");
                $("#ul_" + randomID).css("bottom", "0px");
            } else {
                selectedIDFocus = 0;
                $(".bv_ul_inner").css("position", "absolute");
                $(".bv_ul_inner").css("bottom", "");
            }
        }
        // ** ---------- METHODS ----------- **
        if (typeof parameters == 'string') {

            // ** DESTROY **
            if (parameters == 'destroy') {
                this.each(function() {
                    var divselect = $(this).next('.bv_mainselect');
                    if (divselect.length > 0) {
                        divselect.remove();
                        select.css('display', 'block');
                    }
                });
            }

            // ** UPDATE **  
            if (parameters == 'update') {
                this.each(function() {
                    var current_id = $(this).next(".bv_mainselect").children().attr("id").match(/\d+/);
                    randomID = current_id;

                    // Remove all lines without .nofocus class (search input)
                    $("#ul_" + current_id + " li:not(.nofocus)").remove();
                    $("#main_" + current_id + "").children().off();

                    // Fetches fields and append to main div
                    SetListBV(select);
                });
            }

            // ** GET GENERATED ID **  
            if (parameters == 'getid') {
                this.each(function() {
                    var current_id = $(this).next(".bv_mainselect").children().attr("id").match(/\d+/);
                    randomID = current_id;
                });
                return randomID[0];
            }
        } else {

            // Default Parameters
            var defaults = {
                width: "100%", // Width 100%
                searchbox: false, // Searchbox not included
                offset: true // Fixes Viewport Overflow
            }
            
            var parameters = $.extend({}, defaults, parameters);
            // Hide Native Select
            $(this).hide();

            // Setup main div
            SetBaseBV(select, parameters);
            return this;
        }
    };
}(jQuery));