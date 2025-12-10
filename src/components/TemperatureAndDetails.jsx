import {
    UilSun,
    UilSunset,
    UilTear,
    UilTemperature,
    UilWind
} from "@iconscout/react-unicons";
import React from 'react';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({ weather, units }) {
    if (!weather) return null;

    const tempUnit = units === 'metric' ? '°C' : '°F';
    const windUnit = units === 'metric' ? 'm/s' : 'mph';
    const tempSymbol = units === 'metric' ? 'C' : 'F';
    const timezone = weather.timezone || weather.timezoneOffset || 'UTC';

    return (
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
                <p>{weather.details || 'N/A'}</p>
            </div>
            <div className="flex flex-row items-center justify-between text-white py-3">
                <img
                    src={iconUrlFromCode(weather.icon)}
                    alt="weather icon"
                    className="w-20"
                />
                <p className="text-5xl">{`${Math.round(weather.temp)}°${tempSymbol}`}</p>
                <div className="flex flex-col space-y-2 items-start">
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilTemperature size="18" className="mr-1" />
                        Real feel: <span className="font-medium ml-1">{`${Math.round(weather.feels_like)}°`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilTear size="18" className="mr-1" />
                        Humidity: <span className="font-medium ml-1">{`${weather.humidity}%`}</span>
                    </div>
                    <div className="flex font-light text-sm items-center justify-center">
                        <UilWind size="18" className="mr-1" />
                        Wind: <span className="font-medium ml-1">{`${Math.round(weather.speed)} ${windUnit}`}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2 text-white text-sm py-3">
                <UilSun />
                <p className="font-light">
                    Rise: <span className="font-medium ml-1">{formatToLocalTime(weather.sunrise, timezone, 'hh:mm a')}</span>
                </p>
                <p className="font-light">|</p>
                <UilSunset />
                <p className="font-light">
                    Set: <span className="font-medium ml-1">{formatToLocalTime(weather.sunset, timezone, 'hh:mm a')}</span>
                </p>
                <p className="font-light">|</p>
                <UilSun />
                <p className="font-light">
                    High: <span className="font-medium ml-1">{`${Math.round(weather.temp_max)}°`}</span>
                </p>
                <p className="font-light">|</p>
                <UilSun />
                <p className="font-light">
                    Low: <span className="font-medium ml-1">{`${Math.round(weather.temp_min)}°`}</span>
                </p>
            </div>
        </div>
    );
}

export default TemperatureAndDetails;