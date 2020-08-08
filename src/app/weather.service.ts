import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  currentWeather() {
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=46f97e94666bf88e12a8b5dfc5d07cf9");
  }
  dailyForecast(){
    return this._http.get("http://api.openweathermap.org/data/2.5/onecall?lat=17.3850&lon=78.4867&%20exclude=minutely,hourly&appid=46f97e94666bf88e12a8b5dfc5d07cf9");
  }
  searchWeather(cityname) {
    return this._http.get("http://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=46f97e94666bf88e12a8b5dfc5d07cf9");
  }
  searchForecast(lat,lon){
    return this._http.get("http://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&%20exclude=minutely,hourly&appid=46f97e94666bf88e12a8b5dfc5d07cf9");
  }

}
