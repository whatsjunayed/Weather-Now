"use client";
import React, { useState } from "react";
import apikey from "./apikey";
import { IoSearchOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import moment from "moment";
const page = () => {
  const [location, setLocation] = useState("");
  const [weatherNow, setWeatherNow] = useState({});
  const fetchweather = async () => {
    const fetchApi = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`
    );
    return fetchApi.json();
  };
  const response = async () => {
    const responseApi = await fetchweather();
    setWeatherNow(responseApi);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    response();
  };
  return (
    <div>
      <div className="h-screen w-full flex flex-col justify-center items-center relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/09/05/20/07/cabin-924958_1280.jpg"
          className="absolute h-full w-full top-0 left-0 bg-cover bg-center object-cover -z-10"
        />
        ;
        <form
          onSubmit={submitHandle}
          className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[50%] xl:[35%] bg-[rgba(0,0,0,0.51)] flex justify-center "
        >
          <input
            type="text"
            placeholder="Enter your city"
            className="border-b-2 outline-none border-white text-orange-400 text-xl bg-transparent h-10 w-[80%] mt-6 px-3 capitalize"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="text-2xl text-orange-400 mx-4 mt-4">
            <IoSearchOutline />
          </button>
        </form>
        <div className=" w-[90%] sm:w-[75%] md:w-[65%] lg:w-[50%] xl:[35%] px-6 bg-[rgba(0,0,0,0.51)] text-white">
          <div className="flex items-center justify-around">
            {weatherNow && (
              <div className="text-2xl sm:text-4xl text-center my-5 text-orange-400">
                {weatherNow.name}
              </div>
            )}
            {weatherNow && weatherNow.weather&&(
              <div className="text-sm sm:text-xl">{moment().format("dddd")}</div>
            )}
          </div>
          <div className=" flex gap-6 items-center justify-center text-6xl ">
            {weatherNow && weatherNow.weather && (
              <img
                src={`http://openweathermap.org/img/wn/${weatherNow.weather[0].icon}.png`}
                alt={weatherNow.weather[0].description}
                className="w-[15%] sm:w-[20%]"
              />
            )}

            {weatherNow && weatherNow.main && (
              <h1 className="text-2xl sm:text-4xl">
                {Math.round(weatherNow.main.temp)}° C
              </h1>
            )}
            {weatherNow && weatherNow.main && (
              <div className="h-8 w-1 bg-orange-400"></div>
            )}

            {weatherNow && weatherNow.weather && (
              <div className="text-lg sm:text-2xl">
                {weatherNow.weather[0].description}
              </div>
            )}
          </div>

          {weatherNow && weatherNow.main && (
            <div className="mb-3 sm:text-lg text-center duration-500">
              Feels Like : {weatherNow.main.feels_like}
            </div>
          )}
          <div className="flex items-center justify-around">
            {weatherNow && weatherNow.main && (
              <div className="flex flex-col items-center justify-center py-7">
                <WiHumidity className="text-4xl sm:text-5xl mb-2 text-orange-400" />
                <div className="sm:text-lg">{weatherNow.main.humidity} %</div>
              </div>
            )}
            {weatherNow && weatherNow.wind && (
              <div className="flex flex-col items-center justify-center py-7">
                <LuWind className="text-2xl sm:text-5xl mb-2 text-orange-400" />
                <div className="sm:text-lg">
                  {Math.round(weatherNow.wind.speed * 3.6)} Km/h
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
