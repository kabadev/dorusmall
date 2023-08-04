"use client";
import React, { useState } from "react";

const PredictionComponent = () => {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [predictedUnit, setPredictedUnit] = useState(null);
  const [predictedColor, setPredictedColor] = useState(null);
  const [previousGameInfo, setPreviousGameInfo] = useState("");
  const [isloading, setIsloading] = useState(false);
  const fetchGameData = async () => {
    const url =
      "https://wea.dorus-mall.vip/api/project/game_now?project_id=4&id=908056";
    const headers = {
      Token: "6312cb0e-603d-4e0b-9617-a45e102690f8",
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Error in API request");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleGetData = async () => {
    setIsloading(true);
    try {
      const data = await fetchGameData();
      const gameHistory = data.data.game_history.list;
      const gameNow = data.data.game_now;
      setIsloading(false);
      if (gameNow) {
        const previousGame = gameHistory[0];
        const previoussGame = gameHistory[gameHistory.length - 1];

        setPredictedPrice(previoussGame.price);
        setPredictedUnit(previoussGame.unit);
        setPredictedColor(previoussGame.color);

        // const previousGameDetails = (

        // );

        setPreviousGameInfo(previousGame);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <button
        className="p-2 px-6 bg-black text-white rounded-full mb-3"
        onClick={handleGetData}
      >
        Get Predicted data
      </button>
      {predictedPrice ? (
        <>
          {" "}
          {isloading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              {" "}
              <div className="mb-5 drop-shadow-2xl bg-white rounded-[5px] p-4 w-[400px] max-sm:w-[300px] ">
                <h2 className="text-xl text-center mb-2 font-bold">
                  Predicted Information
                </h2>
                <p className="flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px] mb-1">
                  Predicted Price:{" "}
                  <span className="text-xl font-bold">{predictedPrice}</span>
                </p>
                <p className="flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px] mb-1">
                  Predicted Number:{" "}
                  <span className="text-xl font-bold">{predictedUnit}</span>
                </p>
                <p className="flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px]">
                  Predicted Color:{" "}
                  <span className="flex items-center gap-2 text-xl font-bold capitalize ">
                    {predictedColor === "red" && (
                      <>
                        <span className="bg-red-600  w-[1.5rem] h-[1.5rem] rounded-full"></span>
                        {predictedColor}
                      </>
                    )}
                    {predictedColor === "green" && (
                      <>
                        <span className="bg-green-400  w-[1.5rem] h-[1.5rem] rounded-full"></span>
                        {predictedColor}
                      </>
                    )}
                    {predictedColor === "green,violet" && (
                      <>
                        <span className="bg-green-400  w-[1rem] h-[1rem] rounded-full"></span>
                        <span className="bg-violet-600  w-[1rem] h-[1rem] rounded-full"></span>
                        {predictedColor}
                      </>
                    )}
                    {predictedColor === "red,violet" && (
                      <>
                        <span className="bg-red-600  w-[1rem] h-[1rem] rounded-full"></span>
                        <span className="bg-violet-600  w-[1rem] h-[1rem] rounded-full"></span>
                        {predictedColor}
                      </>
                    )}
                  </span>
                </p>
              </div>
              <div className="drop-shadow-2xl bg-white rounded-[5px] p-4 w-[400px] max-sm:w-[300px] ">
                <h2 className="text-xl text-center mb-2 font-bold">
                  Previous Game Info
                </h2>
                <p className="flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px] mb-1">
                  Previous Price:{" "}
                  <span className="text-xl font-bold">
                    {previousGameInfo.price}
                  </span>
                </p>
                <p className="flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px] mb-1">
                  Previous Number:{" "}
                  <span className="text-xl font-bold">
                    {previousGameInfo.unit}
                  </span>
                </p>
                <p className="flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px]">
                  Previous Color:{" "}
                  <span className="flex items-center gap-2 text-xl font-bold capitalize ">
                    {previousGameInfo.color === "red" && (
                      <>
                        <span className="bg-red-600  w-[1.5rem] h-[1.5rem] rounded-full"></span>
                        {previousGameInfo.color}
                      </>
                    )}
                    {previousGameInfo.color === "green" && (
                      <>
                        <span className="bg-green-400  w-[1.5rem] h-[1.5rem] rounded-full"></span>
                        {previousGameInfo.color}
                      </>
                    )}
                    {previousGameInfo.color === "green,violet" && (
                      <>
                        <span className="bg-green-400  w-[1rem] h-[1rem] rounded-full"></span>
                        <span className="bg-violet-600  w-[1rem] h-[1rem] rounded-full"></span>
                        {previousGameInfo.color}
                      </>
                    )}
                    {previousGameInfo.color === "red,violet" && (
                      <>
                        <span className="bg-red-600  w-[1rem] h-[1rem] rounded-full"></span>
                        <span className="bg-violet-600  w-[1rem] h-[1rem] rounded-full"></span>
                        {previousGameInfo.color}
                      </>
                    )}
                  </span>
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold">No Prediction Available</h2>
          <p>Click the button to get The data</p>
        </div>
      )}
    </div>
  );
};

export default PredictionComponent;

const Skeleton = () => (
  <div className="mt-1 h-[220px] mb-5 drop-shadow-2xl bg-white rounded-[5px] p-4 w-[400px] max-sm:w-[300px]">
    <div class="animate-pulse flex flex-col">
      <div class="rounded-[5px] bg-slate-200 h-6 mb-3 w-full"></div>
      <div class="h-[40px] flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px]">
        <div class="h-2 w-[30%] bg-slate-200 rounded"></div>
        <div class="h-4 w-[10%] bg-slate-200 rounded "></div>
      </div>
      <div class="h-[40px] flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px] mt-1">
        <div class="h-2 w-[30%] bg-slate-200 rounded"></div>
        <div class="h-4 w-[10%] bg-slate-200 rounded "></div>
      </div>
      <div class=" h-[40px] flex justify-between items-center border-solid border-2 border-slate-100 p-2 rounded-[5px] mt-1">
        <div class="h-2 w-[30%] bg-slate-200 rounded"></div>
        <div class="h-4 w-[10%] bg-slate-200 rounded "></div>
      </div>
    </div>
  </div>
);
