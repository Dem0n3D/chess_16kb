$(function () {
    var chess = new Chess(data.fen);

    var types = {
        r: '♜',
        n: '♞',
        b: '♝',
        q: '♛',
        k: '♚',
        p: '♟'
    };

    const ws = new WebSocket("ws://localhost:8080/");

    ws.onmessage = message => console.log(message.data);

    const render = function() {
        const figures = chess.board();
        const turn_color = chess.fen().split(" ")[1];
        const who_can_move = data.my_color == turn_color ? chess.moves({verbose: true}).map(m => m.from) : [];
        const possible_moves = data.my_color == turn_color ? chess.moves({verbose: true}).map(m => m.from + m.to) : [];

        var table = $("<table>");
        for (var i = 0; i < 8; i++) {
            var row = $("<tr>");
            for (var j = 0; j < 8; j++) {
                let p = "abcdefgh"[j] + (8 - i);
                var cell = $(`<td class='cell' data-id='${p}'>`);
                row.append(cell);
                if (figures[i][j]) {
                    var fig = $(`<div class='figure' data-id='${p}'>`);
                    fig.text(types[figures[i][j].type]);
                    fig.addClass(figures[i][j].color == "b" ? "black" : "white");
                    fig.addClass(who_can_move.includes(p) ? "can_move" : "cant_move");
                    cell.html(fig);
                }
            }
            table.append(row);
        }
        $("#board").html(table);

        const hist = chess.history({ verbose: true });
        $("#captured").html(
            hist
                .filter(r => r.captured)
                .map(r => $("<li>").text(types[r.piece]).addClass(r.color == "w" ? "black" : "white"))
        );

        $(".figure").draggable({
            cancel: '.cant_move',
            containment: table,
            revert: function (drop) {
                return !possible_moves.includes($(this).data("id") + $(drop).data("id"));
            }
        });

        $(".cell").droppable({
            accept: ".figure",
            drop: function (event, ui) {
                if (possible_moves.includes($(ui.draggable[0]).data("id") + $(this).data("id"))) {
                    chess.move({from: $(ui.draggable[0]).data("id"), to: $(this).data("id")});
                    const params = {
                        from: $(ui.draggable[0]).data("id"),
                        to: $(this).data("id"),
                        fen: chess.fen(),
                    };
                    axios.post(`/chess/game/${data.id}/moves`, params)
                        .then(res => {

                            render();
                        });
                }
            }
        });
    };

    render();
});
