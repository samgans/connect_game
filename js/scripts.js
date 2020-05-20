var player_1 = '';
var player_2 = '';
var player_1_count = 0;
var player_2_count = 0;
var blue = 'rgb(0, 0, 255)';
var red = 'rgb(255, 0, 0)';

var turn = blue;

var startButton = $('#startButton');
var circle = $('.table-col');
var table = $('table tr');

var new_game_table = {
    'border': '5px solid black',
    'height': '70px',
    'width': '70px',
    'border-radius': '50%',
    'margin-left': '5px',
    'margin-right': '5px',
    'display': 'inline-block'
};

function start () {
    player_1 = prompt('The name of Player One:')
    player_2 = prompt('The name of Player Two:')
    startButton.html('')
    $('.result-text').html('')
    $('.restart-button').html('')
    circle.css(new_game_table)
};

function checkColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('div').css('background-color')
};

function changeColor(rowIndex, colIndex){
    table.eq(rowIndex).find('td').eq(colIndex).find('div').css('background-color', turn)
    if (turn === blue){
        turn = red;
    } else{
        turn = blue;
    }
};

function paint(colIndex) {
    for (let row = 5; row >= 0; row--){
        if (checkColor(row, colIndex) == 'rgba(0, 0, 0, 0)'){
            changeColor(row, colIndex);
            checkWinnings(row, colIndex);
            break;
        }
    }
};

function checkWinnings(rowIndex, colIndex){
    checkVertical(colIndex);
    checkHorizontal(rowIndex, colIndex);
    checkDiagonalNegative(rowIndex, colIndex);
    // checkDiagonalPositive(rowIndex, colIndex)
};

function checkHorizontal(rowIndex, colIndex){
    row = table.eq(rowIndex)
    for (let i = 0; i < row.find('td').length; i++){
        if (checkColor(rowIndex, i) == 'rgb(255, 0, 0)'){
            player_2_count += 1;
            player_1_count = 0;
        } else if (checkColor(rowIndex, i) == 'rgb(0, 0, 255)'){
            player_1_count += 1;
            player_2_count = 0;
        } else {
            player_1_count = 0;
            player_2_count = 0;
        }
        check_counts();
    }
};

function checkVertical(colIndex){
    for (let i = 5; i >= 0; i--){
        if (checkColor(i, colIndex) == 'rgb(255, 0, 0)'){
            player_2_count += 1;
            player_1_count = 0;
        } else if (checkColor(i, colIndex) == 'rgb(0, 0, 255)'){
            player_1_count += 1;
            player_2_count = 0;
        } else {
            player_1_count = 0;
            player_2_count = 0;
        }
        check_counts();
    }
};

function checkDiagonalNegative(rowIndex, colIndex){

    for (let i = 3; i <= 7; i++){
        for (let j = 0; j <= 5; j++){
                if (checkColor(5 - j, i - j) == 'rgb(255, 0, 0)'){
                    player_2_count += 1;
                    player_1_count = 0;
                } else if (checkColor(5 - j, i - j) == 'rgb(0, 0, 255)'){
                    player_1_count += 1;
                    player_2_count = 0;
                } else {
                    player_1_count = 0;
                    player_2_count = 0;
                }
                check_counts();
            }
    };
    for (let r = 4; r >= 3; r--){
        console.log('Me too')
        for (let m = 0; m <= 4; m++){
            if (checkColor(r - m, 7 - m) == 'rgb(255, 0, 0)'){
                player_2_count += 1;
                player_1_count = 0;
            } else if (checkColor(r - m, 7 - m) == 'rgb(0, 0, 255)'){
                player_1_count += 1;
                player_2_count = 0;
            } else {
                player_1_count = 0;
                player_2_count = 0;
            };
            check_counts();
        }
    };
};   

function check_counts(){
    if (player_1_count == 4 || player_2_count == 4){
        circle.removeAttr('style')
        if (player_1_count == 4){
            $('.result-text').text(`${player_1} is Winner!`);
        } else{
            $('.result-text').text(`${player_2} is Winner!`);
        }
        $('.restart-button').html('<button class="btn btn-success btn-lg text-center startButton" onclick="start()">Restart</button>')
    }
};

startButton.click(start);

circle.click(function() {
    let column = $(this).closest('td')
    paint(column.index())
});