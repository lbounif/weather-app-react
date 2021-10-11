import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Img from './sky.png'

const Weather = () => {
    // const [a, setA] = useState("")
    // a= ""
    // a = 45 //we can not do this!
    //setA(45) //do this
    const [input, setInput] = useState("")
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchWeather = async (city) => {
        const API_KEY = "fea4c23781be9b16d29e7f4b6b4537d4" 
        try {
            setLoading(true)
            const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            console.log("response is: ",response)
            setLoading(false)
            // console.log(`Response: ${response.data}`)
            if(response.status === 200) {
                setData(response.data)
            }

        } catch (err) {
            setLoading(false)
            setData(null)
            console.log(`Error: ${err}`)
        }
    }
    useEffect(()=> {
        fetchWeather("Algiers")
    }, [])
    
    return (
        <div className= "weather-card">
            <div className="search-bar">
                <div className="search-bar-content">
                    <input
                        placeholder= "City"
                        onChange={(e)=>{
                        setInput(e.target.value)
                        }} 
                    /> 
                    <div className="search-btn"
                        onClick={() => {
                            fetchWeather(input)
                        }}
                        >
                        Search
                    </div>
                </div>
            </div>
            <img src={Img} height="150" width="150" alt="weather"/>
            { loading ? (
                "Loading..."
            ) : (
                <React.Fragment>
                  {
                    data ? (
                    <>
                        <div className="city">{data.name}</div>
                        <div className="weather-infos"> 
                            <div className="row"> 
                                <div className="info-title">Temerature</div>
                                <div className="info-title">Weather</div>
                                <div className="info-title">Wind</div>
                            </div>
                            <div className="row"> 
                                <div className="info">{`${Math.round(data.main.temp - 273.15)} `} </div>
                                <div className="info"> {data.weather[0].description}  </div>
                                <div className="info"> {`${data.wind.speed} Km/h` }  </div>
                            </div>
                        </div>
                    </> 
                ): (
                    'No available Data to Display'
                )
            } 
            </React.Fragment> 
            )}
        </div>
    )
}
export default Weather
    