(function () {
  if (typeof Crosser === "undefined") {
    window.Crosser = {};
  }

  var View = Crosser.View = function ($el) {
    this.$el = $el;
    this.board = new Crosser.Board();
    this.render();
    this.$el.keydown(this.moveTA.bind(this));
    setInterval(this.step.bind(this), 500);
  };

  View.prototype.moveTA = function (event) {
    switch (event.keyCode) {
      case 38:
        this.board.moveTA("N", this.$el);
        break;
      case 37:
        this.board.moveTA("W", this.$el);
        break;
      case 40:
        this.board.moveTA("S", this.$el);
        break;
      case 39:
        this.board.moveTA("E", this.$el);
        break;
      default:
        break;
    }
  };

  View.prototype.render = function () {
    this.$el.empty();
    this.$el.append(this.renderRow("sidewalk", 0));
    for (var i = 0; i < 2; i++) {
      for (var j = 1; j < 6; j++) {
        this.$el.append(this.renderRow("road", j + (i * 6)));
      }
      this.$el.append(this.renderRow("sidewalk", j + (i * 6)));
    }
  };

  View.prototype.renderRow = function (type, num) {
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

  View.prototype.step = function () {
    this.board.moveCars();
    this.render();
  };
})();
