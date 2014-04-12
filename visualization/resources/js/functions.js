// for events loaded outside of the DOM: 
$(document).on("click", "#main-table a#dummy-link.problem-detail-link", function(event) {	
		event.preventDefault();
		var url = $(this).attr('data');
		url = "resources/ajax_includes/" + url;
		displayProblemDetail(url, "#detail-modal .modal-body");
	});
	var option_day;
	var option_month;
	var option_year;
	$(document).on("change", "option", function() {
		alert('clicked');
		option_day = ($(this).attr('value'));
	});
	$(document).on("change", "#option-month option", function() {
		option_month = ($(this).attr('value'));
	});
	$(document).on("change", "#option-year option", function() {
		option_year = ($(this).attr('value'));
		alert(option_year);
	});
	
	$(document).on("click", "#specific-date", function() {
		var specific_date = '.' + option_month + '-' + option_day + '-' + option_year;
		alert(specific_date);
		getNearest(specific_date, "#display-problems table td");
	});

// for events loaded within the DOM:	
$(document).ready(function() {
	var user_problem;
	var user_IP = $("#ip-address").val();
	var user_twitter;
	var user_email; 
	var display_location = "table tbody#main-table";
	var search_div = "#search-terms";
	var buttons_div = "#problem-buttons";
	 
	$("#main-button").click(function(event) { 
		event.preventDefault()
		showHide(this, "Have a problem?", "#problem");
	});
	
	if ($("#problem_param").val()) {
		var user_problem = $('#problem_param').val();
	
		displayProblemsParams(user_problem, display_location); 
		var last_entry = $(display_location + " table tbody tr td.time-stamp").first(); 
		$("#last_entry").val(last_entry.html());

		displayTableButtons(buttons_div);
		
	}
	
		p2 = new ProblemStream(display_location);
		p2.alternate_main(user_IP); 
		var last_entry = $(display_location + " table tbody tr td.time-stamp").first(); 
		$("#last_entry").val(last_entry.html());
		
		displayTableButtons(buttons_div);
		
	//check if the anonymous button is selected
	$('#anonymous').change(function() {
		//if it has, create the social media buttons 
			var problem = $("#problem-input").val();
			var s1 = new SocialMedia(problem);
			s1.tweetButton();				
			$('#id-form').removeClass('hidden');
			//if facebook link is clicked
			$('#facebook-link').click(function(event) { 
				event.preventDefault()
				// create FB button
				s1.facebookButton();
			});
			//if Tumblr link is clicked
			$('#tumblr-link').click(function(event) { 
				event.preventDefault()
				// check if Tumblr field is empty
				if (checkField($('#tumblr-name').attr('id'))) {
					var blogname = $('#tumblr-name').val();
					// create Tumblr button
					s1.tumblrButton(blogname);
				}
			});
		});

// the main code block that handles the problem output, and all necessary function calls
	$('#submit-problem').click(function(event) { 
		event.preventDefault()
	
	// make sure the field isn't empty
		if (checkField($('#problem-input').attr('id'))) {
			$('#id-form').addClass('hidden');
			// values that will be added to the DB
			var user_problem = $("#problem-input").val();
			var user_twitter = $("#twitter-handle").val();
			var user_email = $("#email-address1").val() + "@" + $("#email-address2").val(); 
		
			// create the ProblemStream object
			var p1 = new ProblemStream(display_location);
			// execute ProblemStream
			p1.main(user_problem, user_IP, user_twitter, user_email); 
			
			var last_entry = $(display_location + " table tbody tr td.time-stamp").first(); 
			$("#last_entry").val(last_entry.html());
			
			var search_div = "#search-terms";
			var buttons_div = "#problem-buttons";
			displayTableButtons(buttons_div);
			var unique_id = $("#unique-id").val();
			setTimeout(function() {
				//deleteRow(unique_id);
			  }, 5000);
		}
	});
	
	//info for the most recent entry in the table, used for getting new ones on the fly
	var last_entry_location = display_location + " table tbody";
	var last_entry_time = $("#last_entry").val();
	
	//there's a bug currently, where the table is sometimes displayed without the most recent entry
	//will have to fix later, but i can't figure it out at the moment, so this is a quick fix
		
	
		//check the DB every 15 seconds to see if there's a new entry
		setInterval(function() {
				checkDB(display_location, last_entry_time); 
			}, 15000);
	$('#problem-input').keyup(function(event) {
		if (event.keyCode == 13) {
			$('#submit-problem').click();
		}
	});
	$('#media-modal-dismiss').click(function(event) {
		event.preventDefault();
		$('#submit-problem').click();
	});
	$("#problem-buttons").on("click", "button", function() { 
		var button_class = '.' + $(this).attr('class');
		getNearest(button_class, "#display-problems table td");
	});
});

/**helper method for handling click events and showing/hiding elements
	@param input = the element value
	@param default_text = the default element value
	@param element = the element to target
**/	
	
		function showHide(input, default_text, element) {
			if ($(element).is(":visible")) {
				$(element).hide();
				$(input).val(default_text);
			}
			else {
				$(element).show();
				$(input).val("Return");
			}
		}
		
/**helper method for checking if field is empty
	@param id = the field to be checked
**/		
		function checkField(id) {
			var field = '#' + id;
			var field_parent = '#' + $(field).parent().attr('id');
			if ($(field).val()) {
				$(field_parent + ' .red-alert').hide();
				$(field_parent + ' #submit').hide();
				return true;
			}
			else {
				$(field_parent + ' .red-alert').fadeIn();
				return false;
			}
		}
		
/**helper method for getting the problem detail
	@param link = the link to go to
	@param location_div = the div to put the result into
**/			
		
	function displayProblemDetail(link, location_div) {
		var url = link;
		$.ajax({
			url: url,
			success: function(response) {
				$(location_div).html(response);
			}
		}).done(function() {
			$(location_div).delay(5000).fadeIn();
		});
	}	

/**helper method for creating the table buttons 		
	@param location_div = the div to put the result into
**/	
			
	function displayTableButtons(location_div) {
		$.ajax({
			url: 'resources/ajax_includes/table_buttons.php',
			success: function(response) {
				$(location_div).html(response);
			}
		}).done(function() {
			$(location_div).delay(5000).fadeIn();
		});
	}
	
/**helper method for creating the problem stream relative to parameters terms box
	@param params = the parameters to search the DB for
	@param location_div = the div to put the result into
**/					
		
	function displayProblemsParams(params, location_div) {
		$.ajax({
			url: 'resources/db_files/query_db_params.php',
			type: 'POST',
			data: {params: params},
			success:function(response){ 
					$(location_div).html(response);
					console.log(response);
					},
				error:function(response){alert("Error Displaying Problems." + response)},
		}).done(function() {
			var problem_outputs = [];
			$(location_div).children().each(function() {
				$(this).removeClass('hidden');
			});
		});
	}
	
/**helper method for taking out each element in an array and recursively fading them in 
	@param link = the link to go to
	@param location_div = the div to put the result into
**/		

	function loadProblems(display_location, finder) {	
		var problem_outputs = new Array();
		$(display_location).on("find", function(finder) {
			$(finder).children().each(function() {
				problem_outputs.push(this);	
			});
		});
		return problem_outputs;
		//fadeAllIn(problem_outputs);
	}
	 
/**helper method for taking out each element in an array and recursively fading them in **/

	function fadeAllIn(children) {
		var current = children.shift();
		$(current).fadeIn(1000, function() {
			fadeAllIn(children);
		});
	}
	
/** helper method for matching the nearest table row with the button clicked
	@param value = the value to search
	@param location = the location to search (the data table)
**/	
	
	function getNearest(value, location_div) {
			$(location_div).not(value).addClass('hidden');
			$(location_div + value).parent().closest('tr').find('td').not('.skip').removeClass('hidden');
	}
	
/**helper method for checking the Database for new entries
	@param location = the location to output the problems to
	@param date = date of last entry
**/			
		
	function checkDB(location_div, date) {
		var last_location = location_div + " table tbody";
		date = ($("input#last_entry").val());
		$.ajax({
			url: 'resources/db_files/check_db.php',
			type: "POST",
			data: {date: date},
			success: function(response) { 
				$(last_location).prepend(response);
			}
		}).done(function() {
			var last_entry = $(location_div + " table tbody tr td.time-stamp").first(); 
			$("#last_entry").val(last_entry.html());
			//alert($(last_location + ' tr').first().find('td').not('.time-stamp').html());
			$(last_location + ' tr').first().fadeIn();
		});
	}
	
/**helper method for deleting rows **/			
		
	function deleteRow(row_id) {
		$.ajax({
			url: 'resources/ajax_includes/delete_row.php',
			data: { id: row_id }, 
			success: function(response) {
				alert(response);
			},
			error:function(response){
						alert("Error Deleting Row " + response);
						}
		}).done(function() {
			p2 = new ProblemStream("table tbody#main-table");
			p2.alternate_main(); 
		});
	}

/**Complex object for showing the stream of problems 
	@param problem = the problem text;
	@param IP = the IP address of the user
	@param twitter = the user's twitter handle (optional)
	@param email = the user's email (optional)
	@param location_div = the div to output the stream to
**/
function ProblemStream(location_div) {
	this.location_div = location_div;
	this.update_link = "resources/db_files/update_db.php";
	this.display_link = "resources/ajax_includes/display_problems.php";
	this.elements = new Array();

//the main method	
	this.main = function(problem, IP, twitter, email) {
		this.problem = problem;
		this.IP = IP;
		this.twitter = twitter;
		this.email = email;
		this.location_div = location_div;
		this.updateDB();
		$(this.location_div).html(this.displayProblems());
		showAllProblems();
		//fadeInAllProblemsFast(bind_events(this.location_div));
		//showAllProblems(bind_events(this.location_div + " table tbody"));
	};

this.alternate_main = function(IP){
	this.user_IP = IP;
	$(this.location_div).html(this.displayProblems());
	showAllProblems();
	
};

/**helper method for updating the database **/
		
	this.updateDB = function() {
		var url = this.update_link;
		var problem = this.problem;
		var IP = this.IP;
		var email = this.email;
		var twitter = this.twitter;
		$.ajax({
				url: url,
				type: "POST",
				async: false,
				data: {problem: problem, IP: IP, email: email, twitter: twitter},
				success:function(response){
				},
				error:function(response){
					alert("Error updating Database: " + response);
					}
			}).done(function() {
				
			});
	};
	
/**helper method for creating the problem stream**/	
		
	this.displayProblems = function() {
		var url = this.display_link;
		var IP = this.user_IP;
		console.log(IP);
		var data;
		$.ajax({
				url: url,
				type: "POST",
				async: false,
				data: {IP: IP},
				success:function(response){ 
					data = response;
				},
				error:function(response){
					alert("Error Displaying Problems: " + response)
					}
			}).done(function() {
			
			});
		return data; 
	};
		
	/** function for binding elements together, with some help from stackoverflow user "face". Thanks buddy!**/	
	function bind_events(data) {
		var elements_array = new Array();
		$(data).children().each(function() {
			elements_array.push(this);
		});
		return elements_array;
	}
	
	this.get_update_link = function() {
		return this.update_link;
	};
	
	this.set_update_link = function(url) {
		this.update_link = url;
	};
	
	this.get_display_link = function() {
		return this.display_link;
	};
	
	this.set_display_link = function(url) {
		this.display_link = url;
	};
	
	this.get_elements = function() {
		return this.elements;
	};
	
	this.set_elements = function(elements) {
		this.elements = elements;
	};
	
	/**FAST helper method for taking out each element in an array and recursively fading them in **/

	function fadeInAllProblemsFast(children) {
		var current = children.shift();
		$(current).fadeIn(1000, function() {
			fadeInAllProblemsFast(children)
		});
	}
	
	/**MEDIUM helper method for taking out each element in an array and recursively fading them in **/
	
	function fadeInAllProblemsMedium(children) {
		var current = children.shift();
		$(current).fadeIn(1000, function() {
			fadeInAllProblemsMedium(children)
		});
	}
	
	/**SLOW helper method for taking out each element in an array and recursively fading them in **/
	
	function fadeInAllProblemsSlow(children) {
		var current = children.shift();
		$(current).fadeIn(5000, function() {
			fadeInAllProblemsSlow(children)
		});
	}
	
	/**helper method for showing all elements without fading in**/
	
	function showAllProblems(children) {
		$('tr').removeClass('hidden');
	}
	
	/**old function, may have to delete later:
	
		var current = children.shift();
		$(current).show(function() {
			displayAllProblems(children)
		});
	**/
} // end ProblemStream object

/**Complex object for social media buttons 
	@param problem = the problem text;
**/	
function SocialMedia(problem) {
	this.problem = problem;
	
	// global variables to avoid code duplication
	this.facebook = "#facebook";
	this.twitter = "#twitter";
	this.tumblr = "#tumblr";
	this.box = '-box';

/**helper method for creating the Tweet button**/

	this.tweetButton = function() {
		location_div = this.twitter + this.box;
		$.ajax({
				url: "resources/api_resources/tweet_button.php",
				type: "POST",
				data: {problem: this.problem},
				success:function(result){
					$(location_div).html(result);
					},
				error:function(response){alert("Error creating Tweet Button" + response);}
			}).done(function() {
		});
	};

/**helper method for creating the FB button**/

	this.facebookButton = function(problem, location) {
		location_div = this.facebook + this.box;
		$.ajax({
				url: "resources/api_resources/fb_button.php",
				type: "POST",
				data: {problem: this.problem},
				success:function(result){
					$(location_div).html(result);
					},
				error:function(response){alert("Error creating FB Button" + response);}
			}).done(function() {
		});
	};

/**helper method for creating the tumblr button
	@blogname = the name of the user's blog
**/
	this.tumblrButton = function(blogname) {
		location_div = this.tumblr + this.box;
		$.ajax({
				url: "resources/api_resources/tumblr_button.php",
				type: "POST",
				data: {problem: this.problem, blogname: blogname},
				success:function(result){
					$(location_div).html(result);
					},
				error:function(response){alert("Error creating Tumblr Button" + response);}
			}).done(function() {
		});
	};
} // end SocialMedia Object