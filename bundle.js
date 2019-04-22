(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Shorthand for $( document ).ready() --> ensure below code will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
$(function() {
  function loadData() {
    const $city = $('#city');
    const $celcius = $('#show-celcius');
    const $fahrenheit = $('#show-fahrenheit');
    const $body = $('body');
    const $displayCity = $('#temp-data');

    //clear out old data before new request
    $displayCity.empty();
    $('img[src*="unsplash"]').remove(); //Selects elements that have the specified attribute with a value containing a given substring

    //params required for the app functionality
    const city = $city.val();

    // photo api
    const unsplashUrl = 'https://source.unsplash.com/daily?nature,';

    // ipstack location
    const geoUrl =
      'http://api.ipstack.com/105.246.4.51?access_key=36abae59b119489a660b47b9ba7803d6';
    //get city property - to be used in weather api
    $.getJSON(geoUrl, function(ipstackResponse) {
      const APP_ID = 'e0e46f68f42f81a76ba608830c740dc2';
      const lat = ipstackResponse.latitude;
      const lon = ipstackResponse.longitude;

      if (!city) {
        openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`;
      } else {
        openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID}`;
      }

      // get weather info from openWeatherMap api
      $.getJSON(openWeatherURL, function(data) {
        //weather icons
        const icon = `<img src="http://openweathermap.org/img/w/${
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
    }).fail(function(jqxhr, textStatus, error) {
      console.log('ipstack api call failed with: ', error);
    });
    return false;
  }
  loadData();
  $('#form-container').submit(loadData);
});

},{}]},{},[1]);
