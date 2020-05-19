var player_1 = ''
var player_2 = ''
var player_1_count = 0
var player_2_count = 0
var turn = 'blue'

var startButton = $('#startButton');
var circle = $('.table-col')

var new_game_table = {
    'border': '5px solid black',
    'height': '70px',
    'width': '70px',
    'border-radius': '50%',
    'margin-left': '5px',
    'margin-right': '5px',
    'display': 'inline-block'
};

function paint(columns) {
    for (let i = 5; i >= 0; i--){

        let col = $('.'+columns).eq(i)

        if (col.css('backgroundColor') === 'rgba(0, 0, 0, 0)'){

            col.css('backgroundColor', turn);
            let row = col.parent().children()
        
            for (let m = 0; m < row.length; m++){
                row_element = row[m]
                console.log(row_element.style.backgroundColor)
                if (row_element.style.backgroundColor == 'red'){
                    player_2_count += 1;
                    player_1_count = 0;
                } else if (row_element.style.backgroundColor == 'blue'){
                    player_1_count += 1;
                    player_2_count = 0;
                } else{
                    player_2_count = 0;
                    player_1_count = 0;
                }
                check_counts();
            }

            if (turn === 'blue'){
                turn = 'red'
            } else{
                turn = 'blue'
            }
            break;       
        };
    };
};

function check_counts(){
    if (player_1_count == 4 || player_2_count == 4){
        circle.removeAttr('style')
        if (player_1_count == 4){
            $('.result-text').text(`${player_1} is Winner!`)
        } else{
            $('.result-text').text(`${player_2} is Winner!`) 
        }
        $('.restart-button').html('<button class="btn btn-success btn-lg text-center startButton" onclick="start()">Restart</button>')
    }
}

startButton.click(start);

circle.click(function() {
    paint(this.classList[2])
});

function start () {
    player_1 = prompt('The name of Player One:')
    player_2 = prompt('The name of Player Two:')
    startButton.html('')
    $('.result-text').html('')
    $('.restart-button').html('')
    circle.css(new_game_table)
}
