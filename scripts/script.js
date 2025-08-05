const timer = document.getElementById("timer");

var minutes_text_input;
var minutes_text_input_new;
var seconds_text_input;
var seconds_text_input_new;

const start_button = document.getElementById("start");
const stop_button = document.getElementById("stop");

const timer_start_audio = new Audio('sounds/timer_start.mp3');
const timer_end_audio = new Audio('sounds/timer_end.mp3');

/* left right to left, so left digit is the tens and right digit is the digits*/

var time_minutes_first_digit;
var time_minutes_second_digit;
var time_seconds_first_digit;
var time_seconds_second_digit;
var interval;

var timestring;
var running = false;
var paused = false;
var ran_already = false;
var done = false;

start_button.onclick = function() {
    console.log("button pressed;");
    if (!running){
	init_timer();

	if(!checkforerrors()){
	    if(!ran_already){timer_start_audio.play()};
	    interval = setInterval(update_timer, 1000);
	    update_timer();
	    ran_already = true;
	    paused = false;
	    console.log("timer start!");
	}
  }

  if (running){
    console.log("you can't click this twice!");
  };
  running = true;
}

stop_button.onclick = function() {
  running = false;
  paused = true;
  
  interval = clearInterval(interval);
  console.log("timer stop!");
};;

function checkforerrors(){
  if (!minutes_text_input && !seconds_text_input){
    console.log("enter a number for both minutes and seconds and start the timer!");
    return false;
  };

  if(isNaN(parseInt(minutes_text_input)) || isNaN(parseInt(seconds_text_input))){
    console.log("enter minutes and seconds as an interger only!");
    return false;
  };

  if(seconds_text_input.length >= 3 || parseInt(seconds_text_input) > 59){
    console.log("you need to enter a number between 0 and 59 for seconds! dummy");
    time_seconds_first_digit = 0;
    time_seconds_second_digit = 0;
    return false;
  }
};

function extract_timer_digits_from_input(){
    	time_minutes_first_digit = minutes_text_input[minutes_text_input.length - 1];
	time_minutes_second_digit = minutes_text_input.slice(0, (minutes_text_input.length - minutes_text_input[minutes_text_input.length - 1].length));
	time_seconds_first_digit = seconds_text_input[seconds_text_input.length -1];
	time_seconds_second_digit = seconds_text_input[seconds_text_input.length -2];
	timer_start_audio.play();
};

function init_timer(){
	if(done){
	    done = !done;
	}
	
	if(ran_already && paused){
	    minutes_text_input_new = document.getElementById("input_minutes_text").value;
	    seconds_text_input_new = document.getElementById("input_seconds_text").value;
	    console.log(minutes_text_input_new);
	    
	    if(minutes_text_input == minutes_text_input_new && seconds_text_input == seconds_text_input_new){
		console.log("should NOT update! if it eosh awow wtf");
		
	    }else{
		console.log("shouldve updated");
		minutes_text_input = minutes_text_input_new;
		seconds_text_input = seconds_text_input_new;
		
		// put input error handling here
		checkforinputerrors();
		
		// exteractinating
		extract_timer_digits_from_input();
	    };
	}
    
      if(!ran_already){
	  minutes_text_input = document.getElementById("input_minutes_text").value;
	  seconds_text_input = document.getElementById("input_seconds_text").value;

	  // i'm error handling all over the place
	  checkforinputerrors();

	  extract_timer_digits_from_input();
      };   
}

function update_timer() {
    /* the time that will be shown on the screen
       , a mix of all the extracted timer digits*/
timestring = String(time_minutes_second_digit) + String(time_minutes_first_digit) + ":" + String(time_seconds_second_digit) + String(time_seconds_first_digit);
  timer.innerHTML = "time left: " + timestring;

  if (time_minutes_second_digit == 0 && time_minutes_first_digit == 0 &&
      time_seconds_second_digit == 0 && time_seconds_first_digit == 0){
    done = true;
  }

  if(!done){
    time_seconds_first_digit -= 1;

    if(time_seconds_first_digit == -1){
      time_seconds_first_digit = 9;
      time_seconds_second_digit -= 1;
    };

    if(time_seconds_second_digit == -1){
      time_seconds_second_digit = 5;
      time_minutes_first_digit -= 1;
    };

    if(time_minutes_first_digit == -1 && time_minutes_second_digit >= 1){
      time_minutes_first_digit = 9;
      time_minutes_second_digit -= 1;
    };
  }
  if(done){
    clearInterval(interval);
    running = false;
    paused = false;
    ran_already = false;
    timer_end_audio.play();
    console.log("timer ended!!");
  }
}

function checkforinputerrors(){
    if(seconds_text_input.length == 1){
	seconds_text_input = "0" + seconds_text_input;
    };
    if(minutes_text_input.length == 1){
	minutes_text_input = "0" + minutes_text_input;
    };
    if (!minutes_text_input){
	minutes_text_input = "00";
    };
    
    if (!seconds_text_input){
	seconds_text_input = "00";
    };
}
