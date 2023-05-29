import React, { useEffect, useState } from "react";
import "./Block.css";
const Block = (props) => {
  const n = 3;
  const hiddenBlocks = [
    [1, 2],
    [1, 1],
  ];
  // const { data } = props;
  // const [renderData, setRenderData] = useState(data);
  const [clickedState, setClickedState] = useState([]);
  const [totalClickedCount, setTotalClickedCount] = useState(0);

  const onClickHandler = (idForItem) => {
    console.log("idForItem", idForItem);
    if (clickedState.findIndex((stateItem) => stateItem === idForItem) > -1) {
      // ignore for now
    } else {
      setClickedState((prev) => {
        return [...prev, idForItem];
      });
      setTotalClickedCount(totalClickedCount + 1);
      const elem = document.getElementById(`BLOCK_${idForItem}`);
      console.log("elem", elem, elem.style);
      elem.style.background = "blue";
    }
  };

  useEffect(() => {
    if (totalClickedCount === n * n - hiddenBlocks.length) {
      console.log("trigged");
      console.log(clickedState);

      for (let i = clickedState.length - 1, j = 1; i >= 0; i--, j++) {
        setTimeout(() => {
          console.log("called");
          const elem = document.getElementById(`BLOCK_${clickedState[i]}`);

          elem.style.background = "white";
        }, j * 1000);
      }
      setTotalClickedCount(0);
      setClickedState([]);
    }
  }, [totalClickedCount]);

  const getHiddenElement = (m, n) => {
    if (hiddenBlocks.findIndex((item) => item[0] === m && item[1] === n) > -1) {
      return true;
    }
    return false;
  };

  const someFn = () => {
    const arr = new Array(n).fill(new Array(n).fill(true));
    let idTemp = -1;
    return (
      <>
        {arr.map((item, index) => {
          return (
            <div className="flexContainer" key={index}>
              {item.map((subItem, subItemIndex) => {
                idTemp++;
                const idForElement = idTemp;
                return (
                  <div
                    className={`child ${
                      getHiddenElement(index, subItemIndex) ? "hidden" : ""
                    }`}
                    id={`BLOCK_${idForElement}`}
                    key={`BLOCK_${idForElement}`}
                    onClick={() => onClickHandler(idForElement)}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return <div className="parentContainer">{someFn()}</div>;
};

export default Block;
