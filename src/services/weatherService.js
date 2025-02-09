const API_KEY = '7475ae531a2fe7e9eae3bb673af9f200';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType,searchParams) => {
    const url = new URL (BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams,appid:API_KEY});
    
    return fetch(url)
            .then((response) => response.json())
};

const formatCurrentWeather = (data)=>{
    const {
        coord:{lat,lon},
        weather,
        main:{temp,  feels_like,temp_min,temp_max,humidity},
        name,
        sys:{country,sunrise,sunset},
        wind:{speed}
    }=data

    const {main:details,icon} = weather[0];

    return {lat,lon,temp,feels_like,temp_min,temp_max,
    humidity,name,country,sunrise,sunset,speed,details,icon};
};

const formattedForecastWeather = (data)=>{
    let { timezone, daily, hourly} = data;
    daily = daily.slice(1,6).map(d =>{
        return{
            
        }
    })
}


const getFormattedWeatherData =async(searchParams)=>{
    const formattedCurrentWeather = await getWeatherData
    ('weather',searchParams)
    .then(formatCurrentWeather);

    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('onecall',{
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units
    }).then (formattedForecastWeather)

    return formattedCurrentWeather;
};

const formatToLocalTime = (secs, zone, format = "cccc,dd LLLL yyyy' | Local time:' hh:mm a")=>DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;