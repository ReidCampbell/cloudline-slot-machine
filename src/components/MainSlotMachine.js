import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToWins, addToTries, resetTally } from "../actions/tallyActions";
import Tries from "./Tries";
import Wins from "./Wins";

const Parent = styled.div`
  width: 100%;
  background: #dcdcf3;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const SubDiv = styled.div`
  height: 80vh;
  width: 40%;
  min-width: 350px;
  margin: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: #e09e9e;
  max-height: 460px;
  border-radius: 25px;
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: #cc6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
`;

const Slots = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Slot = styled.div`
  height: 250px;
  width: 35%;
  border: 2px solid black;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.borderRadius};
`;

const Spin = styled.button`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  background: blue;
  color: white;
  user-select: none;
  border-radius: 10px;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const Tally = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 20px;
`;

const MainSlotMachine = () => {
  // The dispatch function for dispatching actions when we
  // call our action creators.
  const dispatch = useDispatch();

  // Getting our main tally data from redux state.
  const tally = useSelector((state) => state.tally);

  // A few random base colors. To worsen the odds of winning,
  // you can add more colors.
  const baseColors = ["red", "blue", "yellow"];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  const [newColors, setColors] = useState(["grey", "grey", "grey"]);

  // TASK
  // Here is the main spin function which should be called
  // every time we press the Spin button. This function should:

  // 1. Add to our tally tries in the redux state. (i.e dispatch(addToTries()))
  // 2. Randomly select a color 3 times from our base colors, and
  // set them in our local state above, newColors.

  // 3. If all the colors are the same, we add to our tally wins.

  // Get a random color from our base colors
  const getRandomColor = () =>
    baseColors[Math.floor(Math.random() * baseColors.length)];

  // Check if the user has won
  const checkIfWin = (colors) => colors.every((color) => color === colors[0]);

  function spin() {
    dispatch(addToTries());
    const randomColors = [getRandomColor(), getRandomColor(), getRandomColor()];

    // If the user has won add a win
    checkIfWin(randomColors) && dispatch(addToWins());

    setColors(randomColors);
  }

  // TASK
  // In this lifecycle function, of the tally wins reaches 5,
  // have a window.confirm message come up telling the user to 'Stop Gambling!'.
  // on 5 wins the spin button should also become disabled.
  // On selecting 'ok', the tally wins and tries are reset.
  useEffect(() => {
    if (tally.wins === 5) {
      const confirmation = window.confirm("Stop Gambling!");

      // Reset tally on player confirmation
      confirmation && dispatch(resetTally());
    }
  }, [dispatch, tally.wins]);

  // TASK
  // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
  // and render it out 3 times). Their background colors should be those stored
  // in the newColors array. (Use inline styling)

  return (
    <Parent>
      <SubDiv>
        <Slots>
          <Slot color={newColors[0]} borderRadius="10px 0 0 10px" />
          <Slot color={newColors[1]} />
          <Slot color={newColors[2]} borderRadius="0 10px 10px 0" />
        </Slots>
        {/* Disable button on 5 wins */}
        <Spin onClick={spin} disabled={tally.wins >= 5}>
          Spin!
        </Spin>
      </SubDiv>
      <SubDiv>
        <Header>Tally</Header>
        <Tally>
          <Tries />
          <Wins />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
