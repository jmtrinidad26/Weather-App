import { DateTime } from 'luxon';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            throw error;
        });
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        weather,
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        sys: { country, sunrise, sunset },
        wind: { speed },
        dt,
        timezone 
    } = data;

    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise,
        sunset,
        speed,
        details,
        icon,
        dt: Number.isFinite(dt) ? dt : Math.floor(Date.now() / 1000),
        timezone: timezone || null,          // may be an offset (current) or a name (onecall)
        timezoneOffset: Number.isFinite(timezone) ? timezone : null
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        };
    });

    hourly = hourly.slice(1, 6).map(h => {
        return {
            title: formatToLocalTime(h.dt, timezone, 'hh:mm a'),
            temp: h.temp,
            icon: h.weather[0].icon
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    try {
        const formattedCurrentWeather = await getWeatherData('weather', searchParams)
            .then(formatCurrentWeather);

        const { lat, lon } = formattedCurrentWeather;

        let forecastData;
        try {
            forecastData = await getWeatherData('onecall', {
                lat,
                lon,
                exclude: 'current,minutely,alerts',
                units: searchParams.units
            }).then(formatForecastWeather);
        } catch (error) {
            console.warn('Forecast data unavailable. The One Call API may require a subscription:', error);
            return { 
                ...formattedCurrentWeather, 
                daily: [], 
                hourly: [], 
                timezone: formattedCurrentWeather.timezoneOffset || formattedCurrentWeather.timezone || 'UTC' 
            };
        }

        return { ...formattedCurrentWeather, ...forecastData };
    } catch (error) {
        console.error('Error getting formatted weather data:', error);
        throw error;
    }
};

export const formatToLocalTime = (
    secs,
    zone,
    format = "cccc,dd LLLL yyyy' | Local time:' hh:mm a"
) => {
    if (!Number.isFinite(secs)) return 'N/A';
    const base = DateTime.fromSeconds(secs, { zone: 'utc' });

    if (typeof zone === 'string' && zone.trim()) {
        const maybeNumber = Number(zone);
        if (Number.isFinite(maybeNumber)) {
            return base.plus({ seconds: maybeNumber }).toFormat(format);
        }
        return base.setZone(zone).toFormat(format);
    }

    if (Number.isFinite(zone)) {
        return base.plus({ seconds: zone }).toFormat(format);
    }

    return base.toUTC().toFormat(format);
};

export const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;