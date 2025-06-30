const timer = document.getElementById("timer");
const minutes_text_input = document.getElementById("input_minutes_text").value;
const seconds_text_input = document.getElementById("input_seconds_text").value;
const start_button = document.getElementById("start");
const stop_button = document.getElementById("stop");
const timer_start_audio = new Audio('sounds/timer_start.mp3');
const timer_end_audio = new Audio('sounds/timer_end.mp3');

/* left right to left, so left digit is the tens and right digit is the digits*/

var time_minutes_first_digit = minutes_text_input[minutes_text_input.length - 1];
var time_minutes_second_digit = minutes_text_input.slice(0, (minutes_text_input.length - minutes_text_input[minutes_text_input.length - 1].length));
var time_seconds_first_digit = seconds_text_input[seconds_text_input.length -1];
var time_seconds_second_digit = seconds_text_input[seconds_text_input.length -2];
var interval;

//
// var currentdate = new Date(); //
//

var timestring;
var running = false;
var paused = false;
var done = false;

start_button.onclick = function() {
  if (!running){
    running = true;
    if(!checkforerrors()){
      timer_start_audio.play();
      interval = setInterval(update_timer, 1000);
        update_timer();
      console.log("timer start!");
    };
  }

  if (running){
    console.log("you can't click this twice!");
  };
}

stop_button.onclick = function() {
  running = false;
  interval = clearInterval(interval);
  console.log("timer stop!");
};;

function checkforerrors(){
  if (!minutes_text_input && !seconds_text_input){
    console.log("enter a number for both minutes and seconds and start the timer!");
    return false;
  };

  if (!minutes_text_input){
    console.log("nothing entered for minutes, setting it to zero!!");
    time_minutes_first_digit = 0;
    time_minutes_second_digit = 0;
  };

  if (!seconds_text_input){
    console.log("nothing entered for seconds, setting it to zero!!");
    time_seconds_first_digit = 0;
    time_seconds_second_digit = 0;
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

function update_timer() {
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
    timer_end_audio.play();
    console.log("timer ended!!");
  }
}
