class BVSelect {

    constructor({
        selector = 'defaultId',
        width = "100%",
        searchbox = false,
        offset = true,
        search_placeholder = "Search...",
        placeholder = "Select Option"
    }) {

        // Random Number generated
        var randomID = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
        var SearchPlaceholder = search_placeholder;
        var MainPlaceholder = placeholder;
        var selectedIDFocus = 0; // Save wich dropdown is currently open
        var selectedMultiple = [];
        var selected_option_text = "";
        var first_option_text = "";

        // Define Variables
        this.selector = selector.substring(1);
        this.searchbox = searchbox;
        this.width = width;
        this.offset = offset;
        this.randomID = randomID;
        this.search_placeholder;

        // Hides native selector
        document.getElementById(this.selector).style.display = "none";

        // ** ADD OPTIONS TO LIST ** 
        this.SetupListOptions = function() {
            // Get All options inside Selectbox
            var x = document.getElementById(this.selector);
            for (var i = 0; i < x.length; i++) {

                var optionText = x[i].text;
                var optionValue = x[i].value;
                var optionDisabled = x[i].disabled;
                var optionSeparator = x[i].getAttribute("data-separator");
                var optionImg = x[i].getAttribute("data-img");
                var optionIcon = x[i].getAttribute("data-icon");

                // Option Disabled
                if (optionDisabled == true) {
                    var is_disabled = "bv_disabled";
                } else {
                    var is_disabled = "";
                }
                // Separator
                if (optionSeparator) {
                    var is_separator = "bv_separator";
                } else {
                    var is_separator = "";
                }
                // Check for Attachment  
                if (optionImg) {
                    var has_attachment = "<img src=" + optionImg + ">";
                } else {
                    if (optionIcon) {
                        var has_attachment = "<i class='" + optionIcon + "' aria-hidden='true'></i>";
                    } else {
                        var has_attachment = "";
                    }
                }

                // Append
                document.getElementById("ul_" + randomID).insertAdjacentHTML('beforeend', "<li class='" + is_disabled + " " + is_separator + "'  > " + has_attachment + " " + optionText + "</li>");
            }

            document.querySelectorAll('#ul_' + randomID + ' li').forEach((item) => {

                item.addEventListener('click', (e) => {
                    const index = Array.from(item.parentNode.children).indexOf((item))
                    var selected_option = document.getElementById(this.selector);

                    if (this.searchbox == true) {
                        var numberless = -1;
                    } else {
                        var numberless = "";
                    }

                    if (item.classList.contains("bv_disabled") || item.classList.contains("nofocus") || item.classList.contains("bv_separator")) {} else {
                        if (selected_option.attributes.multiple) {
                            var SelectedNames = "";
                            event.preventDefault();

                            if (selectedMultiple.indexOf(index) > -1) {
                                var index_test = selectedMultiple.indexOf(index);
                                selectedMultiple.splice(index_test, 1);
                                document.getElementById(this.selector)[index + numberless].selected = false;
                            } else {
                                selectedMultiple.push(index);
                            } // Adds to array 

                            // Check if array is empty, if it is, gets the first option
                            if (selectedMultiple.length == 0) {
                                SelectedNames = selected_option[0].innerHTML;
                            } else {

                                for (var i = 0; i < selectedMultiple.length; i++) {

                                    var indexValFromArray = selectedMultiple[i];
                                    document.getElementById(this.selector).getElementsByTagName('option')[indexValFromArray + numberless].selected = 'selected';
                                    SelectedNames += ", " + selected_option[indexValFromArray - 1].innerHTML;

                                }
                                SelectedNames = SelectedNames.substring(2);
                            }

                            // Adds the texto o the main DIV
                            document.getElementById("main_" + randomID).innerHTML = SelectedNames + "<i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>";

                        } else {
                            // Get Index of option
                            document.getElementById(this.selector).getElementsByTagName('option')[index + numberless].selected = 'selected';
                            // Trigger onchange function
                            if (x.getAttribute("onchange") != null) {
                                document.getElementById(this.selector).onchange();
                            }
                            // Updates main div
                            document.getElementById("main_" + randomID).innerHTML = item.textContent + "<i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>";
                            document.getElementById("ul_" + randomID).style.display = "none";
                        }

                        // When click, resets search filter
                        if (this.searchbox == true) {
                            document.getElementById("input_" + randomID).value = "";
                            Array.from(document.querySelectorAll("#ul_" + randomID + " li")).forEach(function(val) {
                                val.style.display = "block";
                            });
                        }
                          FixVerticalViewPort();
                    }

                  
                })
            });
        }

        // ** CREATE MAIN **
        this.CriarDivBase = function() {

            document.getElementById(this.selector).insertAdjacentHTML('afterend', '<div id="bv_' + randomID + '" data-search="' + this.searchbox + '" class="bv_mainselect"></div>');
            document.getElementById("bv_" + randomID).insertAdjacentHTML('afterbegin', '<div id="main_' + randomID + '" style="width:' + this.width + ';" class="bv_atual bv_background"></div><ul id="ul_' + randomID + '" class="bv_ul_inner bv_background"></ul>');

            var element_ul = document.getElementById('ul_' + randomID);
            var element_bv = document.getElementById('bv_' + randomID);

            // Set Width of UL
            var select_width = document.getElementById("main_" + randomID).offsetWidth;
            element_ul.style.width = select_width + "px";

            if (this.searchbox == true) {
                document.querySelector("#ul_" + randomID).insertAdjacentHTML('afterbegin', '<li class="nofocus"><div class="innerinput"><input placeholder="' + SearchPlaceholder + '" class="bv_input" id="input_' + randomID + '" type="text"></div</li>');
            }

            // Get Selected Option
            var selected_option = document.getElementById(this.selector);
            if (!selected_option.attributes.multiple) {
                // Check if exists any selected option in the native selectbox
                for (var i = 0; i < selected_option.length; i++) {
                    if (selected_option[i].getAttribute("selected") == "") {
                        var FoundSelectedOP = 1;
                    }
                }

                // if is 1, its because found it, if not get the placeholder.
                if (FoundSelectedOP == 1) {
                    first_option_text = selected_option.options[selected_option.selectedIndex].text;
                } else {
                    first_option_text = MainPlaceholder;
                }

            } else {
                // Se for multiple, vai buscar sempre o placeholder
                first_option_text = MainPlaceholder;
            }

            document.getElementById("main_" + randomID).innerHTML = first_option_text + "<i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>";

            // Add event Listener on click main div
            document.getElementById("main_" + randomID).addEventListener("click", function() {

                // Correct the width of the UL when window is resized
                var select_width = document.getElementById("main_" + randomID).offsetWidth;
                element_ul.style.width = select_width + "px";

                if (document.getElementById('ul_' + randomID).style.display == 'block') {

                    document.getElementById('ul_' + randomID).style.display = 'none';
                    Array.from(document.querySelectorAll(".arrows_bv"))
                        .forEach(function(val) {
                            val.classList.remove("up");
                            val.classList.add("down");
                        });

                } else {

                    Array.from(document.querySelectorAll(".bv_ul_inner"))
                        .forEach(function(val) {
                            val.style.display = 'none';
                        });
                    BVfadeIn(document.getElementById('ul_' + randomID));
                    Array.from(document.querySelectorAll(".arrows_bv"))
                        .forEach(function(val) {
                            val.classList.remove("up");
                            val.classList.add("down");
                        });
                    document.querySelector("#arrow_" + randomID).classList.remove("down");
                    document.querySelector("#arrow_" + randomID).classList.add("up");
                }

                if (offset == true) {
                    FixVerticalViewPort();
                }


            }, false);

            // ** SETUP LIST OPTIONS **
            this.SetupListOptions();
        }

        // ** CREATES MAIN DIV **
        this.CriarDivBase();

        // ** ON SCROLL EVENT TO PREVENT OUT OF VIEWPORT **
        document.addEventListener("scroll", function() {
            if (selectedIDFocus != 0) {

                var currentWindowViewOffSet = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
                var container = document.getElementById("main_" + randomID);
                var lastchild = container.lastChild;
                var currentElementViewOffSet = lastchild.getBoundingClientRect().top;

                var MainDivOff = document.getElementById("ul_" + randomID).clientHeight;
                var DiffBetW = currentWindowViewOffSet - currentElementViewOffSet // Difference between Element and Window

                // If Difference is greater than List's height
                if (DiffBetW > MainDivOff) {
                    FixVerticalViewPort();
                }
            }
        }, false);

        // ** FADE OUT FUNCTION **
        function BVfadeOut(el) {
            el.style.opacity = 1;
            (function fade() {
                if ((el.style.opacity -= .1) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        };
        // ** FADE IN FUNCTION **
        function BVfadeIn(el, display) {
            el.style.opacity = 0;
            el.style.display = display || "block";
            (function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .1) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        };

        // ** CHECK VIEW PORT OFFSET **
        function FixVerticalViewPort() {
            var currentWindowView = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            var container = document.getElementById("ul_" + randomID);
            var lastchild = container.lastChild;
            var currentElementView = lastchild.getBoundingClientRect().top;

            // +50 to fix outer border
            if (Math.round(currentElementView + 50) > Math.round(currentWindowView)) {

                selectedIDFocus = randomID;
                document.getElementById("ul_" + randomID).style.position = "fixed";
                document.getElementById("ul_" + randomID).style.bottom = "0px";

            } else {

                selectedIDFocus = 0;
                document.getElementById("ul_" + randomID).style.position = "absolute";
                document.getElementById("ul_" + randomID).style.bottom = "";
            }
        }

        // ** SEARCH BAR **
        if (this.searchbox == true) {
            document.getElementById("input_" + randomID).addEventListener("keyup", function() {
                var input, filter, ul, li, i, txtValue;
                input = document.getElementById("input_" + randomID);
                filter = input.value.toUpperCase();
                ul = document.getElementById("ul_" + randomID);
                li = ul.getElementsByTagName("li");

                // Hides all separators
                Array.from(document.querySelectorAll(".bv_separator")).forEach(function(val) {
                    val.style.display = "none";
                });

                for (i = 0; i < li.length; i++) {

                    // If Empty, appears every line
                    if (filter == "") {
                        Array.from(document.querySelectorAll("#ul_" + randomID + " li")).forEach(function(val) {
                            val.style.display = "block";
                        });
                    } else {
                        // Removes separators from search
                        txtValue = li[i].innerText || li[i].textContent;
                        if (txtValue.toUpperCase().indexOf(filter) > -1 && !li[i].classList.contains("bv_separator")) {
                            li[i].style.display = "";
                        } else {
                            if (!li[i].classList.contains("nofocus")) {
                                li[i].style.display = "none";
                            }
                        }
                    }
                }
            }, false);
        }
        // ** CLICK OUTSIDE **
        document.addEventListener("click", function(e) {
            if (!e.target.closest(".bv_ul_inner") || !event.target.classList.contains('bv_input')) {
                if (!event.target.classList.contains('bv_input') && !event.target.classList.contains('bv_atual')) {

                    if (event.target.nodeName != "LI") {
                        Array.from(document.querySelectorAll(".bv_ul_inner"))
                            .forEach(function(val) {
                                val.style.display = 'none';
                            });
                        Array.from(document.querySelectorAll(".arrows_bv"))
                            .forEach(function(val) {
                                val.classList.remove("up");
                                val.classList.add("down");
                            });

                        // When click outside, resets search filter
                        Array.from(document.querySelectorAll("#input_" + randomID)).forEach(function(val) {
                            val.value = "";
                        });
                        Array.from(document.querySelectorAll("#ul_" + randomID + " li")).forEach(function(val) {
                            val.style.display = "block";
                        });

                        if (document.getElementById("ul_" + randomID)) // Checks if element existed in case it was destroyed
                        {
                            selectedIDFocus = 0;
                            document.getElementById("ul_" + randomID).style.position = "absolute";
                            document.getElementById("ul_" + randomID).style.bottom = "";
                        }
                    }
                }
            }
        }, true);
    }

    // ** METHODS ** 

    // DESTROY
    Destroy() {
        // Destroy main element and shows up native selectbox
        document.getElementById("bv_" + this.randomID).remove();
        document.getElementById(this.selector).style.display = "block";
    }
    // UPDATE
    Update() {
        // Removes all Li that does not contain class "nofocus" - Its the search. 
        Array.from(document.querySelectorAll("#ul_" + this.randomID + " li"))
            .forEach(function(val) {
                if (!val.classList.contains("nofocus")) {
                    val.remove();
                }
            });
        this.SetupListOptions();
    }
    // GET ID
    GetID() {
        // Return ID Generated when building Dropdown, so you can add custom classes
        return this.randomID;
    }
}