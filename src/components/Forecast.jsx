import React from 'react';

function Forecast({title}) {
  return (
    <div>
        <div className="flex items-center justify-start mt-6">
            <p className = "text-white font-medium uppercase"> {title}</p>
        </div>
        <hr className = "my-2" />
        <div className="text-white flex flex-row justify-between items-center">
            <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">4:30 PM</p>
                <img src="" alt="icon" />
                <p className = "font-medium">22</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">4:30 PM</p>
                <img src="" alt="icon" />
                <p className = "font-medium">22</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">4:30 PM</p>
                <img src="" alt="icon" />
                <p className = "font-medium">22</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">4:30 PM</p>
                <img src="" alt="icon" />
                <p className = "font-medium">22</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">4:30 PM</p>
                <img src="" alt="icon" />
                <p className = "font-medium">22</p>
            </div>
        </div>






    </div>
  );
}

export default Forecast;