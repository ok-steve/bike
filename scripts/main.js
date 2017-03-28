(function( root ) {
  'use strict';

  const API_KEY = root.API_KEY;
  const LATITUDE = root.LATITUDE;
  const LONGITUDE = root.LONGITUDE;

  const PREFERENCES = {
    high: 90,
    low: 50,
    precip: 10,
    offset: 0,
    limit: 8
  };

  const getLocation = () => {
    return new Promise(( resolve, reject ) => {
      if ( navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, err => {
          resolve({
            latitude: LATITUDE,
            longitude: LONGITUDE
          });
        });
      } else {
        resolve({
          latitude: LATITUDE,
          longitude: LONGITUDE
        });
      }
    });
  };

  const getForecast = () => {
    return getLocation().then(response => {
      return fetch(`https://api.forecast.io/forecast/${API_KEY}/${response.latitude},${response.longitude}'?exclude=currently,minutely,daily,alerts,flags&callback=JSON_CALLBACK`)
        .then(response => response.json())
        .catch( console.log );
    }).then(response => {
      const offset = PREFERENCES.offset;
      const limit = PREFERENCES.limit;

      return response.hourly.data.splice( offset, offset + limit );
    }).then(response => {
      const temperature = response.map(hour => hour.temperature);
      const precipProbability = response.map(hour => hour.precipProbability);

      return {
        high: Math.max( ...temperature ),
        low: Math.min( ...temperature ),
        precip: Math.max( ...precipProbability ) * 100
      };
    });
  };

  const getAnswer = () => {
    return getForecast().then(forecast => {
      if (forecast.high <= PREFERENCES.high && forecast.low >= PREFERENCES.low && forecast.precip <= PREFERENCES.precip) {
        return 'yes';
      } else if (forecast.high > PREFERENCES.high + PREFERENCES.offset && forecast.low < PREFERENCES.low - PREFERENCES.offset && forecast.precip > PREFERENCES.precip + PREFERENCES.offset) {
        return 'no';
      } else {
        return 'maybe';
      }
    });
  };

  const answerText = document.querySelector('.answer');

  getAnswer().then(response => {
    answerText.textContent = `${response}!`;
  });
})( window );
