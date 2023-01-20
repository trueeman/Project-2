// De navigatie bar openen.
function open_nav() {
    document.getElementById("nav").style.width = "250px";
}


// De navigatie bar sluiten.
function close_nav() {
    document.getElementById("nav").style.width = "0";
}


// Muziek speler.
let audio = document.getElementById('audio');
let play_pause_button = document.getElementById('play_pause_button');
let count = 0;


function play_pause() {
    if (count == 0) {
        count = 1;
        audio.play();
        play_pause_button.innerHTML = "Pause &#9208;";
    } else {
        count = 0;
        audio.pause();
    }
}


function stop() {
    play_pause()
    audio.pause();
    audio.currentTime = 0;
}


// De game (regel 43 t/m 301).




// De canvas oproepen en tekenen.
const game_board1 = document.querySelector("#game_board");
const ctx = game_board1.getContext("2d");


// De score en reset knop terug sturen.
const score_text = document.querySelector("#score_text");
const reset_button = document.querySelector("#reset_button");


// De canvas breedte, hoogte en achtergrond's kleur.
const game_width = game_board1.width;
const game_height = game_board1.height;
const board_background = "black";


// De peddel kleuren, grens kleur en snelheid.
const paddle1_color = "white";
const paddle2_color = "white";
const paddle_border = "9e9e9e";
const paddle_speed = 50;


// De bal kleur, grens kleur en snelheid.
const ball_color = "white";
const ball_border_color = "#9e9e9e";
const ball_radius = 12.5;


// Identiteit van het interval.
let interval_id;


// Positie van de bal.
let ball_speed;
let ball_x = game_width / 2;
let ball_y = game_height / 2;
let ball_x_direction = 0;
let ball_y_direction = 0;


// Het begin score van beide spelers.
let player_1_score = 0;
let player_2_score = 0;


// Speler 1.
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 200
}


// Speler 2.
let paddle2 = {
    width: 25,
    height: 100,
    x: game_width - 25,
    y: game_height - 300
}


// Luisteren naar de Eventlistener voor het toetsenbord en reset knop.
window.addEventListener("keydown",  controls);
reset_button.addEventListener("click", reset_game);


// De game (functie) starten.
game_start();


// De functie om de game te starten.
function game_start() {
    create_ball();
    next_tick();
}

// Tik updater.
function next_tick() {
    interval_id = setTimeout(() => {
        clear_board();
        draw_paddles();
        move_ball();
        draw_ball(ball_x, ball_y);
        check_collision();
        next_tick();
    }, 10)
}


// Canvas legen.
function clear_board() {
    ctx.fillStyle = board_background;
    ctx.fillRect(0, 0, game_width, game_height);
}


// Het tekenen van de spelers.
function draw_paddles() {
    ctx.strokeStyle = paddle_border;

    ctx.fillStyle = paddle1_color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2_color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}


// Het creëren van de bal.
function create_ball() {
    ball_speed = 2;
    if (Math.round( Math.random() ) == 1) {
        ball_x_direction =  1; 
    }
    else {
        ball_x_direction = -1; 
    }
    if (Math.round( Math.random() ) == 1) {
        ball_y_direction = Math.random() * 1; //more random directions
    }
    else {
        ball_y_direction = Math.random() * -1; //more random directions
    }

    ball_x = game_width / 2;
    ball_y = game_height / 2;
    draw_ball(ball_x, ball_y);
}


// Hoe de bal beweegt.
function move_ball() {
    ball_x += (ball_speed * ball_x_direction);
    ball_y += (ball_speed * ball_y_direction);
}


// Het tekenen van de bal.
function draw_ball(ball_x, ball_y) {
    ctx.fillStyle = ball_color;
    ctx.strokeStyle = ball_border_color;
    ctx.line_width = 2;
    ctx.beginPath();
    ctx.arc(ball_x, ball_y, ball_radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}


// Het checken voor botsingen.
function check_collision() {
    if (ball_y <= 0 + ball_radius) {
        ball_y_direction *= -1;
    }
    if (ball_y >= game_height - ball_radius) {
        ball_y_direction *= -1;
    }
    if (ball_x <= 0) {
        player_2_score+=1;
        update_score();
        create_ball();
        return;
    }
    if (ball_x >= game_width) {
        player_1_score+=1;
        update_score();
        create_ball();
        return;
    }
    if (ball_x <= (paddle1.x + paddle1.width + ball_radius) ) {
        if (ball_y > paddle1.y && ball_y < paddle1.y + paddle1.height) {
            ball_x = (paddle1.x + paddle1.width) + ball_radius; // Als de bal vast gaat zitten.
            ball_x_direction *= -1;
            ball_speed += 1;
        }
    }
    if (ball_x >= (paddle2.x - ball_radius) ) {
        if (ball_y > paddle2.y && ball_y < paddle2.y + paddle2.height) {
            ball_x = paddle2.x - ball_radius; // Ook als de bal vast gaat zitten.
            ball_x_direction *= -1;
            ball_speed += 1;
        }
    }
}


// De besturing van beide spelers.
function controls(event) {
    const key_pressed = event.keyCode;
    const paddle_1_up = 87;
    const paddle_1_down = 83;
    const paddle_2_up = 38;
    const paddle_2_down = 40;

    switch(key_pressed) {
        case(paddle_1_up):
            if(paddle1.y > 0) {
                paddle1.y -= paddle_speed;
            }
            break;
        case(paddle_1_down):
            if(paddle1.y < game_height - paddle1.height){
                paddle1.y += paddle_speed;
            }
            break;


        case(paddle_2_up):
            if(paddle2.y > 0){
                paddle2.y -= paddle_speed;
            }
            break;
        case(paddle_2_down):
            if(paddle2.y < game_height - paddle2.height){
                paddle2.y += paddle_speed;
            }
            break;
    }
}


// De score updaten
function update_score() {
    score_text.textContent = `${player_1_score} : ${player_2_score}`
}


// Reset functie
function reset_game() {
    player_1_score = 0;
    player_2_score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 200
    }
    
    paddle2 = {
        width: 25,
        height: 100,
        x: game_width - 25,
        y: game_height - 300
    }

    ball_speed = 1;
    ball_x = 0;
    ball_y = 0;
    ball_x_direction = 0;
    ball_y_direction = 0;
    update_score();
    clearInterval(interval_id);
    game_start();
}