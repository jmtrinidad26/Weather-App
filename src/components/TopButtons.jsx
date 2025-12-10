import React from 'react';

function TopButtons({ setQuery }) {
    const cities = [
        {
            id: 1,
            title: 'New York',
            q: 'new york'
        },
        {
            id: 2,
            title: 'San Francisco',
            q: 'san francisco'
        },
        {
            id: 3,
            title: 'Tokyo',
            q: 'tokyo'
        },
        {
            id: 4,
            title: 'London',
            q: 'london'
        },
        {
            id: 5,
            title: 'Paris',
            q: 'paris'
        },
        {
            id: 6,
            title: 'Manila',
            q: 'manila'
        },
    ];

    return (
        <div className="flex items-center justify-around my-6">
            {cities.map((city) => (
                <button
                    key={city.id}
                    className="text-white text-lg font-medium transition ease-out hover:scale-105"
                    onClick={() => setQuery({ q: city.q })}
                >
                    {city.title}
                </button>
            ))}
        </div>
    );
}

export default TopButtons;