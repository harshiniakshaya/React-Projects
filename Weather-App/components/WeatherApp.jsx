import React, { useEffect, useState } from 'react';
import "../styles/WeatherApp.css";

export const WeatherApp = () => {
    let api_key="e8f62bf48d8a0f18882eb5a730d4d079";
    const[icon, setIcon] = useState('clear.png');
    const[temp,setTemp]=useState(0);
    const[city,setCity]=useState("Chennai");
    const[country,setCountry]=useState("IN");
    const[lat,setLat]=useState(0);
    const[lon,setLon]=useState(0);
    const[wind,setWind]=useState(0);
    const[humidity,setHumidity]=useState(0);

    const[cityNotFound, setCityNotFound] = useState(false);
    const[loading, setLoading] = useState(false);
    const[error,setError] = useState(null);

    const weatherIconMap ={
        "01d":"clear.png",
        "01n":"clear.png",
        "02d":"cloudIcon.webp",
        "02n":"cloudIcon.webp",
        "03d":"drizzleIcon.png",
        "03n":"drizzleIcon.png",
        "04d":"drizzleIcon.png",
        "04n":"drizzleIcon.png",
        "09d":"rainIcon.png",
        "09n":"rainIcon.png",
        "10d":"rainIcon.png",
        "10n":"rainIcon.png",
        "13d":"snowIcon.png",
        "13n":"snowIcon.png"
    };

    const search = async()=>{
        setLoading(true);
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
        try{
            let res = await fetch(url);
            let data = await res.json();
            // console.log(data);
            if(data.cod=="404"){
                console.log("City not found!");
                setCityNotFound(true);
                setLoading(false);
                return;
            }
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp));
            setCity(data.name);
            setCountry(data.sys.country)
            setLat(data.coord.lat);
            setLon(data.coord.lon);
            const weatherIconCode = data.weather[0].icon;
            setIcon(weatherIconMap[weatherIconCode] || "clear.png");
            setCityNotFound(false);
        }
        catch(error){
            console.error("Error Occurred!",error);
            setError("An error occurred while fetching weather data!")
        }
        finally{
            setLoading(false);
        }
    }

    const[text, setText]= useState("Chennai");
    const handleCity = (e) =>{
        setText(e.target.value);
    }
    
    const handleKeyDown = (e) =>{
        if(e.key==="Enter"){
            search();
        }
    }

    useEffect(function(){
        search();
    }, []);

  return (
    <>
        <div className='container'>
            <div className='input-container'>
                <input type='text' className='cityInput' placeholder='Search City'
                    onChange={handleCity}
                    value={text}
                    onKeyDown={handleKeyDown}
                />
                <div className='search-icon' onClick={search}>
                    <img src='/images/search-icon.webp' alt='Search' />
                </div>
            </div>

            {loading && <div className='loading-message'>Loading...</div>}
            {error && <div className='error-message'>{error}</div>}
            {cityNotFound && <div className='city-not-found'>City Not Found</div>}

            {!loading && !cityNotFound && !error && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon}
                wind={wind} humidity={humidity}
            />}

            <p className='copyright'>Designed by <span>Harshini Akshaya</span></p>


        </div>
    </>
  )
}

function WeatherDetails({icon, temp, city, country, lat, lon, wind, humidity}){
    return(
        <>
            <div className='image'>
                <img src={`images/${icon}`} alt="Image"/>
            </div>
            <div className='temp'>
                {temp}°C
            </div>
            <div className='city'>
                {city}
            </div>
            <div className='country'>
                {country}
            </div>
            <div className='cord'>
                <div>
                    <span className='lat'>latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className='lon'>longitude</span>
                    <span>{lon}</span>
                </div>
            </div>
            <div className='data-container'>
                <div className='element'>
                    <img src='images/humidityicon.png' alt="humidity"/>
                    <div className='data'>
                        <div className='humidity-percent'>{humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src='images/windicon.png' alt="humidity"/>
                    <div className='data'>
                        <div className='wind-percent'>{wind} km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </>
    )
}

