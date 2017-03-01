var Calendar = function () { 
		console.log('I AM IN CALENDAR');

	    var wrap, label,  
	            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
 		
	    function init(newWrap) {
	    	wrap     = $(newWrap || "#cal"); 
			label    = wrap.find("#label"); 
			wrap.find("#prev").on("click.calendar", function () { switchMonth(false); }); 
			wrap.find("#next").on("click.calendar", function () { switchMonth(true);  }); 
			label.on("click", function () { 
				switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });        
				label.click();
	    	} 

 
	    function switchMonth(next, month, year) { 
	    	var curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10); 

			if (!month) { 
	    		if (next) { 
			        if (curr[0] === "December") { 
			            month = 0; 
			        } else { 
			            month = months.indexOf(curr[0]) + 1; 
			        } 
			    } else { 
			        if (curr[0] === "January") { 
			            month = 11; 
			        } else { 
			            month = months.indexOf(curr[0]) - 1; 
			        } 
			    }
			} 

			if (!year) { 
			    if (next && month === 0) { 
			        year = tempYear + 1; 
			    } else if (!next && month === 11) { 
			        year = tempYear - 1; 
			    } else { 
			        year = tempYear; 
			    } 
			}

			console.profile("createCal")
			calendar =  createCal(year, month); 
	        console.profileEnd("createCal")
	        
	        var Wrap = $("#cal-frame", wrap) 
	            .find(".curr") 
	                .removeClass("curr") 
	                .addClass("temp") 
	                .end()    
	            .prepend(calendar.calendar()) 
	            .find(".temp") 
	             .fadeOut("slow", function () { $(this).remove() }); 

	        $('#label').text(calendar.label);
	    }

	    function createCal(year, month) {   
	    	//mule allows this to happend/ connect the frontend logic with the database
	    	console.log("this is mule : " + mule)
	    	console.log(month)
	    	var emotionYear = mule.emotions.filter(obj => (new Date(obj.time)).getFullYear() === year)
	    	var emotionMonth = emotionYear.filter(obj => (new Date(obj.time)).getMonth() === month)
	    	//put emotionMonth.length at the end to see how many object we have in these arrays!
	    	console.log(emotionMonth.length)
	    	console.log(emotionMonth)

	    	var day = 1, i, j, haveDays = true,  
	        startDay = new Date(year, month, day).getDay(),
	        daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
	        calendar = [];

	        if (createCal.cache[year]) { 
	    		if (createCal.cache[year][month]) { 
	        		return createCal.cache[year][month]; 
			    } 
			} else { 
			    createCal.cache[year] = {}; 
			}
			//the calendar is created day by day :
			i = 0; 
			while (haveDays) {  
	
			    calendar[i] = []; 
			    
			    // if there are several emotions on a day we must select the last one.
			   
			    for (j = 0; j < 7; j++) { 
			        if (i === 0) { 
			            if (j === startDay) { // startDay is the day of the week Wenesday = 3 as it starts from 0 =sunday
			                console.log(day)
			                var emotionDay = emotionMonth.filter(obj => {
			            	//debugger
			            	console.log("£££££" + (new Date(obj.time)).getDate())
			            	return (new Date(obj.time)).getDate() === day
			        	})	

			        	//if there are several emotions on a day we must select the last one => slice()	            
			            var lastDay = (new Date((emotionDay.slice(-1)[0] || {}).time)).getDate()
			            console.log("%%%%" + lastDay) //the right day
			            var lastEmotion = (new Number((emotionDay.slice(-1)[0] || {}).number)) //get the emotion of that lastDay
			            
			            console.log("emo : " + lastEmotion)
			            calendar[i][j] = day++;
			            startDay++; 
			            if (isNaN(lastDay) === false){
			            	//create 3 jquery variables so that it can be transform in image front end
			       	      	if (lastEmotion == "1"){
			       	 //      		var img = document.createElement('img');
    								// img.src = "<img /public/img/1.jpg";
    								
								calendar[i][j] = "<img src='/public/img/1.svg' class='happy'/>"
						    	console.log("jjjjjjj" + calendar[i])
			       	      	}
			       	      	if (lastEmotion == "2"){
			       	      		calendar[i][j] = "<img src='/public/img/2.svg' class='soso'/>"
						    	console.log("jjjjjjj" + calendar[i])
			       	      	} 
			       	      	if (lastEmotion == "3")
			       	      		calendar[i][j] = "<img src='/public/img/3.svg' class='unhappy'/>"
						    	console.log("jjjjjjj" + calendar[i])
			       	      	}
			            } 
			        } else if (day <= daysInMonths[month]) { 
			        	console.log(day)
			            var emotionDay = emotionMonth.filter(obj => {
			            	//debugger
			            	console.log("£££££" + (new Date(obj.time)).getDate())
			            	return (new Date(obj.time)).getDate() === day
			        	})	

			        	//if there are several emotions on a day we must select the last one => slice()	            
			            var lastDay = (new Date((emotionDay.slice(-1)[0] || {}).time)).getDate()
			            console.log("%%%%" + lastDay) //the right day
			            var lastEmotion = (new Number((emotionDay.slice(-1)[0] || {}).number)) //get the emotion of that lastDay
			            
			            console.log("emo : " + lastEmotion)
			            calendar[i][j] = day++;
			            
			            if (isNaN(lastDay) === false){
			            	//create 3 jquery variables so that it can be transform in image front end
			       	      	if (lastEmotion == "1"){
			       	 //      		var img = document.createElement('img');
    								// img.src = "<img /public/img/1.jpg";
    								
								calendar[i][j] = "<img src='/public/img/1.svg' class='happy'/>"
						    	console.log("jjjjjjj" + calendar[i])
			       	      	}
			       	      	if (lastEmotion == "2"){
			       	      		calendar[i][j] = "<img src='/public/img/2.svg' class='soso'/>"
						    	console.log("jjjjjjj" + calendar[i])
			       	      	} 
			       	      	if (lastEmotion == "3")
			       	      		calendar[i][j] = "<img src='/public/img/3.svg' class='unhappy'/>"
						    	console.log("jjjjjjj" + calendar[i])
			       	      	}
		        		
			        } else { 
			            calendar[i][j] = " "; 
			            haveDays = false; 
			        } 
			        if (day > daysInMonths[month]) { 
			            haveDays = false; 
			        } 
			    } 
			    i++; 

			}
			if (calendar[5]) {   // this is to make the calendar stay at maximum 5 weeks and not 6 but we don't need that!
	    		for (i = 0; i < calendar[5].length; i++) { 
			        if (calendar[5][i] !== "") { 
			            calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>"; 
			        } 
	    		} 

	    		calendar = calendar.slice(0, 5); 
			}

			for (i = 0; i < calendar.length; i++) { 
		    	calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>"; 
			} 
			
			calendar = $("<table>" + calendar.join("") + "</table>").addClass("curr"); 
	
			$("td:empty", calendar).addClass("nil"); 
		
			if (month === new Date().getMonth()) { 
			    $('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today"); 
			}	 
			
			createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year }; 
	 
			return createCal.cache[year][month];

    		} //end of function createCal
		    
		    createCal.cache = {}; 
		    
		    return { 
		        init : init, 
		        switchMonth : switchMonth, 
		        createCal   : createCal 
		    }; 
		};