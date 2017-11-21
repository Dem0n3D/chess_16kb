var chess = new Chess();

var types = {
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
    p: '♟'
};

$(function () {
    var figures = chess.board();
    var moves = chess.moves({ verbose: true }).map(m => m.from);

    var table = $("<table>");
    for(var i = 0; i < 8; i++) {
        var row = $("<tr>");
        for(var j = 0; j < 8; j++) {
            var cell = $("<td>");
            row.append(cell);
            if(figures[i][j]) {
                var p = "abcdefgh"[7-j] + (8 - i);

                var fig = $("<div class='figure'>");
                fig.text(types[figures[i][j].type]);
                fig.addClass(figures[i][j].color == "b" ? "black" : "white");
                console.log(p, moves)
                fig.addClass(moves.includes(p) ? "can_move" : "cant_move");
                cell.html(fig);
            }
        }
        table.append(row);
    }
    $("body").append(table);

    $(".figure").draggable({
        cancel: '.cant_move'
    });
});
