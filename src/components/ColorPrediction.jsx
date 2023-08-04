"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ColorPrediction() {
  const [predictedColor, setPredictedColor] = useState(null);
  const [game_now, setGame_now] = useState([]);

  const fetchAPIAndPredict = async () => {
    const url = "https://wea.dorus-mall.vip/api/project/game_now";
    const headers = {
      Token: "6312cb0e-603d-4e0b-9617-a45e102690f8",
    };
    const params = {
      project_id: 4,
      id: 908056,
    };

    try {
      const response = await axios.get(url, { headers, params });

      if (response.status === 200) {
        const apiData = response.data.data;
        setGame_now(apiData);
      } else {
        console.log("Error fetching data from API.");
      }
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };

  const getData = async () => {
    await fetchAPIAndPredict();

    const gameHistory = game_now?.game_history?.list;
    console.log(gameHistory);
    // Analyze historical game data to find patterns in colors
    const colorCounts = gameHistory.reduce((acc, game) => {
      const colors = game.color.split(",");
      colors.forEach((color) => {
        acc[color] = (acc[color] || 0) + 1;
      });
      return acc;
    }, {});

    // Make a prediction based on the color counts
    const predictedColor = Object.keys(colorCounts).reduce((a, b) =>
      colorCounts[a] > colorCounts[b] ? a : b
    );
    setPredictedColor(predictedColor);
  };

  return (
    <div>
      <p>Predicted Color for Game Now: {predictedColor}</p>
      <button onClick={getData}>getData</button>
    </div>
  );
}

export default ColorPrediction;
