import p5 from "p5";
import { updateUser } from "../store/actions/authActions";

export default function puzzleInit(
  puzzleRef,
  overlayRef,
  level,
  time,
  dispatch,
  userId
) {
  class Tile {
    constructor(i, img) {
      this.index = i;
      this.image = img;
    }
  }

  let source;
  let tiles = [];
  let cols = level > 15 ? 4 : 3;
  let rows = level > 15 ? 4 : 3;
  let board = [];
  let blankSpot = -1;
  let w, h;
  let mouseX, mouseY;
  let dimension = Math.min(window.innerHeight, window.innerWidth);
  dimension = Math.max(dimension, 400);

  function swap(i, j, arr) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function randomMove(arr) {
    let r1 = Math.floor(Math.random() * cols);
    let r2 = Math.floor(Math.random() * rows);
    move(r1, r2, arr);
  }
  function simpleShuffle(arr) {
    for (let i = 0; i < 50 * level; i++) {
      randomMove(arr);
    }
  }
  function updateTiles() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = j * w;
        let y = i * h;
        let index = i + j * cols;
        if (tiles[index])
          tiles[index].image.copy(source, x, y, w, h, 0, 0, w, h);
      }
    }
  }

  function move(i, j, arr) {
    let blank = findBlank();
    let blankCol = blank % cols;
    let blankRow = Math.floor(blank / rows);

    if (isNeighbor(i, j, blankCol, blankRow)) {
      swap(blank, i + j * cols, arr);
    }
  }

  function isNeighbor(i, j, x, y) {
    if (i !== x && j !== y) {
      return false;
    }
    if (Math.abs(i - x) == 1 || Math.abs(j - y) == 1) {
      return true;
    }
    return false;
  }

  function findBlank() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == -1) return i;
    }
  }

  function isSolved() {
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i] !== tiles[i].index) {
        return false;
      }
    }
    return true;
  }

  new p5((p) => {
    p.setup = function () {
      source = p.createCapture(p.VIDEO);

      p.createCanvas(dimension * 0.8, dimension * 0.8).parent(
        puzzleRef.current
      );
      w = p.width / cols;
      h = p.height / rows;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * w;
          let y = j * h;
          let img = p.createImage(w, h);
          source.size(p.width, p.height);
          let index = i + j * cols;
          board.push(index);
          img.copy(source, x, y, w, h, 0, 0, w, h);
          let tile = new Tile(index, img);
          tiles.push(tile);
        }
      }
      source.hide();
      tiles.pop();
      board.pop();
      board.push(-1);
      simpleShuffle(board);
    };

    p.draw = function () {
      p.background(255, 255, 255);
      updateTiles();
      mouseX = p.mouseX;
      mouseY = p.mouseY;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let index = i + j * cols;
          let x = i * w;
          let y = j * h;
          let tileIndex = board[index];
          if (tileIndex > -1) {
            let img = tiles[tileIndex].image;
            p.image(img, x, y);
          }

          p.strokeWeight(5);
          p.stroke(249, 185, 72);
          p.noFill();
          p.rect(x, y, w, h);
        }
      }
    };

    p.mousePressed = function () {
      let i = Math.floor(mouseX / w);
      let j = Math.floor(mouseY / h);
      move(i, j, board);
      if (isSolved()) {
        setTimeout(() => {
          console.log("SOLVED");
          const finalTime = new Date().getTime();
          overlayRef.current.style.display = "block";
          dispatch(updateUser(level + 1, finalTime - time, userId));
        }, 500);
      }
    };
  });
}
