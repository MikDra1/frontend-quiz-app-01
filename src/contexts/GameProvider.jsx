import React, { createContext, useState, useEffect, useContext } from "react";

// Create a context for the game data
const GameContext = createContext();

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined)
    throw new Error("DataContext was used outside the GameProvider");
  return context;
};

// Context Provider component
export const GameProvider = ({ children }) => {
  const [game, setGame] = useState(null);
  const [score, setScore] = useState(0);

  // Fetch game data when the component mounts
  useEffect(() => {
    const fetchData = async function () {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means the effect runs only once when the component mounts

  return <GameContext.Provider value={{game, score, setScore}}>{children}</GameContext.Provider>;
};
