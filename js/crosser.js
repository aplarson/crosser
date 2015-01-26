(function () {
  if (typeof Crosser === "undefined") {
    window.Crosser = {};
  }

  var Board = Crosser.Board = function () {
    this.cars = [];
    this.spawnCars();
    this.ta = new Crosser.TA(this);
    this.dest = [0, 6];
    this.createGrid();
  };

  Board.prototype.createGrid = function () {
    this.grid = new Array(13);
    for (var i = 0; i < 13; i++) {
      this.grid[i] = new Array(10);
    }
  };

  Board.prototype.hasCar = function (pos) {
    var hasCar = false;
    this.cars.forEach(function (car) {
      if (car.pos[0] === pos[0] && car.pos[1] === pos[1]) {
        hasCar = true;
      }
    });
    return hasCar;
  };

  Board.prototype.moveCars = function () {
    this.cars.forEach(function (car) {
      car.move();
    });
  };

  Board.prototype.moveTA = function (direction) {
    this.ta.move(direction);
  };

  Board.prototype.spawnCars = function () {
    for (var i = 0; i < 13; i++) {
      if (i !== 0 && i !== 6 && i !== 12) {
        var dir = i % 2 === 0 ? -1 : 1;
        this.cars.push(new Car([i, Math.floor(Math.random() * 10)], dir));
      }
    }
  };

  var Car = Crosser.Car = function (pos, dir) {
    this.pos = pos;
    this.dir = dir;
  };

  Car.prototype.move = function () {
    this.pos = [this.pos[0], this.pos[1] + this.dir];
    if (this.pos[1] > 9) {
      this.pos[1] -= 10;
    }
    if (this.pos[1] < 0) {
      this.pos[1] += 10;
    }
  };

  var TA = Crosser.TA = function (options) {
    this.board = options.board;
    this.pos = [12, 5];
  };

  TA.DIRS = {
    "N": [-1, 0],
    "S": [1, 0],
    "E": [0, 1],
    "W": [0, -1]
  };

  TA.prototype.move = function (direction) {
    var dir = TA.DIRS[direction];
    this.pos = [this.pos[0] + dir[0], this.pos[1] + dir[1]];
  };
})();
