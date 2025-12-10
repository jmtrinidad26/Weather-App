import React from 'react';
import { formatToLocalTime } from '../services/weatherService';

function TimeAndLocation({ weather }) {
    if (!weather) return null;

    const timezone = weather.timezone || weather.timezoneOffset || 'UTC';

    return (
        <div>
            <div className="flex items-center justify-center my-6">
                <p className="text-white text-xl font-extralight">
                    {formatToLocalTime(weather.dt, timezone)}
                </p>
            </div>
            <div className="flex items-center justify-center my-3">
                <p className="text-white text-3xl font-medium">
                    {weather.name}, {weather.country}
                </p>
            </div>
        </div>
    );
}

export default TimeAndLocation;