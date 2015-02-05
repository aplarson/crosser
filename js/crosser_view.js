(function () {
  if (typeof Crosser === "undefined") {
    window.Crosser = {};
  }

  var View = Crosser.View = function ($el) {
    this.$el = $el;
    this.board = new Crosser.Board();
    this.buildBoard();
    this.$taSquare = this.findTile(this.board.ta.pos);
    this.$carSquares = this.findCars();
    this.$el.keydown(this.moveTA.bind(this));
    this.loop = setInterval(this.step.bind(this), 500);
  };

  View.prototype.findCars = function () {
    var view = this;
    var cars = [];
    this.board.cars.forEach(function (car) {
      cars.push(view.findTile(car.pos));
    });
    return cars;
  };

  View.prototype.findTile = function (pos) {
    return this.$el.children().eq(pos[0]).children().eq(pos[1]);
  };

  View.prototype.moveTA = function (event) {
    switch (event.keyCode) {
      case 38:
        this.board.moveTA("N");
        break;
      case 37:
        this.board.moveTA("W");
        break;
      case 40:
        this.board.moveTA("S");
        break;
      case 39:
        this.board.moveTA("E");
        break;
      default:
        break;
    }
    this.render();
    if (this.board.detectCollisions()) {
      clearInterval(this.loop);
    }
  };

  View.prototype.buildBoard = function () {
    this.$el.empty();
    this.$el.append(this.buildRow("sidewalk", 0));
    for (var i = 0; i < 2; i++) {
      for (var j = 1; j < 6; j++) {
        this.$el.append(this.buildRow("road", j + (i * 6)));
      }
      this.$el.append(this.buildRow("sidewalk", j + (i * 6)));
    }
  };

  View.prototype.buildRow = function (type, num) {
    var $row = $("<div>").addClass("row").addClass(type);
    for (var i = 0; i < 10; i++) {
      var $tile = $("<div>").addClass("tile").data("pos", [num, i]);
      if (num === this.board.dest[0] && i === this.board.dest[1]) {
        $tile.addClass("machine");
      }
      if (num === this.board.ta.pos[0] && i === this.board.ta.pos[1]) {
        $tile.addClass("ta");
      }
      if (this.board.hasCar([num, i])) {
        $tile.addClass("car");
      }
      $row.append($tile);
    }
    return $row;
  };

  View.prototype.gameOver = function () {
    alert(this.board.score());
  };

  View.prototype.render = function () {
    this.renderTA();
    this.renderCars();
  };

  View.prototype.renderCars = function () {
    this.$carSquares.forEach(function (square) {
      square.removeClass('car');
    });
    this.$carSquares = this.findCars();
    this.$carSquares.forEach(function (square) {
      square.addClass('car');
    });
  }

  View.prototype.renderTA = function (taPos) {
    this.$taSquare.removeClass('ta');
    this.$taSquare = this.findTile(this.board.ta.pos).addClass('ta');
  };

  View.prototype.step = function () {
    this.board.moveCars();
    this.render();
    if (this.board.detectCollisions()) {
      clearInterval(this.loop);
      this.gameOver();
    } else if (this.board.over()) {
      clearInterval(this.loop);
      this.winner();
    }
  };

  View.prototype.winner = function () {
    alert(this.board.score());
  };
})();
