import React from 'react';

function TopButtons() {

    const cities = [
        {
            id: 1,
            name: 'New York',
        },
        {
            id: 2,
            name: 'San Francisco',
        },
        {
            id: 3,
            name: 'Priva',
        },
        {
            id: 4,
            name: 'Cainta',
        },
        {
            id: 5,
            name: 'Cubao',
        },
        {
            id: 6,
            name: 'Manila',
        },
    ];
  return (
    <div className="flex items-center justify-around my-6">
        {cities.map((city)=>(
            <button key = {city.id} className="text-white text-lg font-medium transition ease-out hover:scale-105"> {city.name}</button>

        ))}
    </div>
  );
}

export default TopButtons;