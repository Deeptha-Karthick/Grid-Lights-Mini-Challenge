import "./styles.css";
import { useState, useMemo, useEffect, useRef } from "react";

export default function App() {
  const [gridSize, setGridSize] = useState(3);
  const [duration, setDuration] = useState(500);
  const [selected, setSelected] = useState([]);

  const timerId = useRef(null);

  console.log("selected", selected);

  const selectedLength = gridSize * gridSize;

  const gridConfig = useMemo(() => {
    return Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, (_, index) => index)
    );
  }, [gridSize]);

  const onCellClick = (rowIndex, cell) => {
    const encodeString = `${rowIndex}-${cell}`;
    setSelected((prev) => {
      if (!prev.includes(encodeString)) {
        return [...prev, encodeString];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (selected.length === selectedLength) {
      timerId.current = setInterval(() => {
        setSelected((prev) => {
          if (prev.length === 0) {
            clearInterval(timerId.current);
            return prev;
          }
          // Remove the last item from the array and return the new array
          const updatedSelected = prev.slice(0, prev.length - 1);
          return updatedSelected;
        });
      }, duration);

      // return () => clearInterval(timerId.current);
    }
  }, [selected.length, selectedLength, duration]);
  return (
    <div className="App">
      <h1>GRID LIGHTS</h1>

      <div className="gridlights">
        {gridConfig.map((row, rowIndex) => {
          return (
            <div className="grid-row" key={rowIndex}>
              {row.map((cell) => {
                return (
                  <div
                    key={`${rowIndex}-${cell}`}
                    className={`cell ${
                      selected.includes(`${rowIndex}-${cell}`)
                        ? "selected"
                        : "cell"
                    }`}
                    onClick={() => onCellClick(rowIndex, cell)}
                  >
                    {selected.includes(`${rowIndex}-${cell}`)
                      ? "selected"
                      : "cell"}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
