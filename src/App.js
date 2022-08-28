import React from 'react';
import { useState } from "react";
import image from "./background.jpg";
import "./index.css";

const App = () => {
  //winning numbers
  const winning = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  //Players State
  const player1 = '<i class="bi bi-x-lg"></i>';
  const player2 = '<i class="bi bi-circle"></i>';

  const [player2Scores, setPlayer2Scores] = useState(0);
  const [player1Scores, setPlayer1Scores] = useState(0);
  const [nextPlayer, setNextPlayer] = useState(1);
  const [player_1_numbers, setPlayer_1_numbers] = useState([]);
  const [player_2_numbers, setPlayer_2_numbers] = useState([]);

  //handling the next players turn
  const handleClick = (e) => {
    if (nextPlayer == 1) {
      setNextPlayer(2);
      e.target.innerHTML = player1;
      setPlayer_1_numbers([
        ...player_1_numbers,
        e.target.id[e.target.id.length - 1],
      ]);
      e.target.classList.add("disable-click");
    } else if (nextPlayer == 2) {
      setNextPlayer(1);
      e.target.innerHTML = player2;
      setPlayer_2_numbers([
        ...player_2_numbers,
        e.target.id[e.target.id.length - 1],
      ]);
      e.target.classList.add("disable-click");
    }
  };

  //reseting the game to inital
  const initial = () => {
    const allEle = document.querySelectorAll(".game-box");

    [...allEle].forEach((ele) => {
      ele.innerHTML = "";
      ele.classList.remove("disable-click");
    });

    setPlayer_1_numbers([]);
    setPlayer_2_numbers([]);
    setNextPlayer(1);
  };

  //resume game after win or draws
  const resumeGame = () => {
    setTimeout(() => {
      initial();

      setNextPlayer(1);
      setPlayer_1_numbers([]);
      setPlayer_2_numbers([]);

      document.querySelectorAll(".game-box").forEach((ele) => {
        ele.style.border = "1px solid rgba(0,0,0,0.25) ";
        ele.classList.add("text-warning");
      });
      document.querySelector(".winner-text").classList.add("hide-winner-text");
      document
        .querySelector(".winner-text")
        .classList.remove("show-winner-text");
      document.querySelector(".draw").classList.add("hide-draw-game");
      document.querySelector(".draw").classList.remove("show-draw-game");
    }, 2000);
  };

  //winning game
  const winner = (index) => {
    initial();

    if (nextPlayer == 2) {
      setPlayer1Scores((prevState) => prevState + 1);
    } else if (nextPlayer == 1) {
      setPlayer2Scores((prevState) => prevState + 1);
    }

    //Timeout for displaying the winner
    setTimeout(() => {
      document
        .querySelector(".winner-text")
        .classList.remove("hide-winner-text");
      document.querySelector(".winner-text").classList.add("show-winner-text");

      const gamebox = document.querySelectorAll(".game-box");
      gamebox.forEach((ele) => {
        ele.style.border = "none";
        ele.classList.add("disable-click");
        ele.classList.remove("style-winning-box");
        ele.innerHTML = "";
      });

      const winPlayer = document.querySelector(".win-player");

      nextPlayer === 2
        ? (winPlayer.innerHTML = "Player 1")
        : (winPlayer.innerHTML = "Player 2");
    }, 1000);

    const winningBox = document.querySelectorAll(
      `#box${winning[index][0]}, #box${winning[index][1]}
        , #box${winning[index][2]}`
    );

    winningBox.forEach((ele) => {
      ele.classList.add("style-winning-box");
      ele.classList.remove("text-warning");
      nextPlayer == 2 ? (ele.innerHTML = player1) : (ele.innerHTML = player2);
    });

    resumeGame();
  };

  //draw game
  const draw = () => {
    initial();

    const gamebox = document.querySelectorAll(".game-box");
    gamebox.forEach((ele) => {
      ele.style.border = "none";
      ele.classList.add("disable-click");
      ele.classList.remove("style-winning-box");
      ele.innerHTML = "";
    });

    document.querySelector(".draw").classList.add("show-draw-game");
    resumeGame();
  };

  //detect the winning player
  const win = winning.map((winArr) => {
    if (winArr.every((x) => player_1_numbers.includes(x))) {
      return true;
    } else if (winArr.every((x) => player_2_numbers.includes(x))) {
      return true;
    }

    return false;
  });
  if (win.includes(true)) {
    winner(win.indexOf(true));
  }

  //detect draw game
  if (
    (player_2_numbers.length > 4 || player_1_numbers.length > 4) &&
    !win.includes(true)
  ) {
    draw();
  }

  //restart game
  const restartGame = () => {
    setPlayer1Scores(0);
    setPlayer2Scores(0);
    initial();
  };

  return (
    <>
      {/* background image */}
      <img src={image} alt="" className="img-fluid bg-image" />
      <div className="box bg-primary shadow-lg">
        <div className="container-box">
          <div
            className="game-box text-warning"
            id="box1"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box2"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box3"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box4"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box5"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box6"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box7"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box8"
            onClick={handleClick}
          ></div>
          <div
            className="game-box text-warning"
            id="box9"
            onClick={handleClick}
          ></div>
        </div>
        <div className="winner-text hide-winner-text position-absolute text-center translate-middle top-50 start-50">
          <div className="display-1 text-warning fw-bolder">Winner</div>
          <div className="win-player display-4 text-primary rounded-3 p-3 bg-warning"></div>
        </div>
        <div className="draw hide-draw-game  display-1 text-warning fw-bolder  position-absolute translate-middle start-50 top-50 display-1 text-warning fw-bolder">
          Draw !!!
        </div>
      </div>
      <div className="player-1">
        <div className="player-title text-warning text-center display-3">
          Player 1
        </div>
        <div className="player-scores p-3 mt-4 text-center">
          <div className="score-title lead text-uppercase text-warning">
            scores
          </div>
          <div className="score display-3 text-warning">{player1Scores}</div>
        </div>
      </div>
      <div className="player-2">
        <div className="player-title text-warning text-center display-3">
          Player 2
        </div>
        <div className="player-scores p-3 mt-4 text-center">
          <div className="score-title lead text-uppercase text-warning">
            scores
          </div>
          <div className="score display-3 text-warning">{player2Scores}</div>
        </div>
      </div>
      <div className="restart-mode text-center px-2 p-2">
        {/*<button className="btn text-secondary"><i class="bi bi-arrow-clockwise display-5"></i></button>*/}
        <button className="btn btn-warning" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    </>
  );
};

export default App;
