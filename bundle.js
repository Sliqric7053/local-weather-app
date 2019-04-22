(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener(
  'DOMContentLoaded',
  function init() {
    let lat;
    let lon;
    let openWeatherURL;
    const APP_ID = 'e0e46f68f42f81a76ba608830c740dc2';

    function getGeoInfo() {
      // Get GEO info

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      function success(pos) {
        const crd = pos.coords;
        lat = crd.latitude.toString();
        lon = crd.longitude.toString();
        updateUI();
      }

      function error(err) {
        // set default latlon
        lat = '34.5133';
        lon = '-94.1629';
        updateUI();

        console.info(`
        The Latitude and Longitude of center of the earth is 34.5133 and -94.1629 respectively.
        34.5133 Latitude and -94.1629 Longitude can be mapped to closest address of Earth Lane, Mena, AR 71953, USA.
        Center of the earth is located in sub-locality, Mena locality, Polk District, Arkansas State of 71953 Country.
        `);
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        // centre of the earth :)
        lat = '34.5133';
        lon = '-94.1629';
      }
    }

    function updateUI() {
      const $city = $('#city');
      const $celcius = $('#show-celcius');
      const $fahrenheit = $('#show-fahrenheit');
      const $body = $('body');
      const $displayCity = $('#temp-data');

      //params required for the app functionality
      const city = $city.val();

      // photo api
      const unsplashUrl = 'https://source.unsplash.com/daily?nature,';

      //clear out old data before new request
      $displayCity.empty();
      //Selects elements that have the specified attribute with a value containing a given substring
      $('img[src*="unsplash"]').remove();

      if (!city) {
        openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`;
      } else {
        openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID}`;
      }

      // get weather info from openWeatherMap api
      $.getJSON(openWeatherURL, function(data) {
        //weather icons
        const icon = `<img src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png">`;

        //display background photo using unsplash api
        const backgroundImage =
          unsplashUrl +
          data.weather[0].description.replace(/\s/g, '').toUpperCase();
        $body.css('background-image', 'url(' + backgroundImage + ')');

        //add text from apis to HTML
        $displayCity.append(
          '<p>' +
            'Temperature for city of ' +
            data.name +
            ', ' +
            data.sys.country +
            '</p>' +
            '<br>'
        );

        $fahrenheit.click(function() {
          document.querySelector('.celsius_fahrenheit').innerHTML =
            '<p>' +
            'Current: ' +
            Math.round((data.main.temp * 9) / 5 + 32) +
            '&#8457' +
            '</p>';

          document.querySelector('.temp_min').innerHTML =
            '<p>' +
            'Min: ' +
            Math.round((data.main.temp_min * 9) / 5 + 32) +
            '&#8457' +
            '</p>';

          document.querySelector('.temp_max').innerHTML =
            '<p>' +
            'Max: ' +
            Math.round((data.main.temp_max * 9) / 5 + 32) +
            '&#8457' +
            '</p>';
        });

        $celcius.click(function() {
          document.querySelector('.celsius_fahrenheit').innerHTML =
            '<p>' +
            'Current: ' +
            Math.round(data.main.temp) +
            '&#8451' +
            '</p>';

          document.querySelector('.temp_min').innerHTML =
            '<p>' +
            'Min: ' +
            Math.round(data.main.temp_min) +
            '&#8451' +
            '</p>';

          document.querySelector('.temp_max').innerHTML =
            '<p>' +
            'Max: ' +
            Math.round(data.main.temp_max) +
            '&#8451' +
            '</p>';
        });

        $displayCity.append(
          '<p class="celsius_fahrenheit">' +
            'Current: ' +
            Math.round(data.main.temp) +
            '&#8451' +
            '</p>'
        );
        $displayCity.append(
          '<p class="temp_min">' +
            'Min: ' +
            Math.round(data.main.temp_min) +
            '&#8451' +
            '</p>'
        );
        $displayCity.append(
          '<p class="temp_max">' +
            'Max: ' +
            Math.round(data.main.temp_max) +
            '&#8451' +
            '</p>'
        );
        $displayCity
          .append(icon)
          .append(
            '<p>' + '<em>' + data.weather[0].description + '<em>' + '</p>'
          );
      }).fail(function(jqxhr, textStatus, error) {
        $displayCity.append(`<p>City ${error}! 😢</p>`);
      });
      return false;
    }
    getGeoInfo();
    $('#form-container').submit(updateUI);
  },
  false
);

},{}]},{},[1]);
