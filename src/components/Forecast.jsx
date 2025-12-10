import React from 'react';
import { iconUrlFromCode } from '../services/weatherService';

function Forecast({ title, items }) {
    if (!items || !items.length) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase">{title}</p>
            </div>
            <hr className="my-2" />
            <div className="text-white flex flex-row justify-between items-center">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm">{item.title}</p>
                        <img
                            src={iconUrlFromCode(item.icon)}
                            alt="weather icon"
                            className="w-12 my-1"
                        />
                        <p className="font-medium">{`${Math.round(item.temp)}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;