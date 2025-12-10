import { UilLocationPoint, UilSearch } from '@iconscout/react-unicons';
import React, { useState } from 'react';

function Inputs({ setQuery, units, setUnits }) {
    const [city, setCity] = useState('');

    const handleSearchClick = () => {
        const term = city.trim();
        if (term !== '') {
            setQuery({ q: term });
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setQuery({ lat, lon });
            });
        }
    };

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) setUnits(selectedUnit);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick();
        }
    };

    return (
        <div className='flex flex-row justify-center my-6'>
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-full"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <UilSearch
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    size={25}
                    onClick={handleSearchClick}
                />
                <UilLocationPoint
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                    size={25}
                    onClick={handleLocationClick}
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center">
                <button
                    name="metric"
                    className={`text-xl text-white font-light transition hover:scale-125 ${units === 'metric' ? 'font-bold' : ''}`}
                    onClick={handleUnitsChange}
                >
                    °C
                </button>
                <p className='text-xl mx-1 mb-0.5 text-white'>|</p>
                <button
                    name="imperial"
                    className={`text-xl text-white font-light transition hover:scale-125 ${units === 'imperial' ? 'font-bold' : ''}`}
                    onClick={handleUnitsChange}
                >
                    °F
                </button>
            </div>
        </div>
    );
}

export default Inputs;