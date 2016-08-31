
//automatically run this code when the page loads
document.addEventListener('DOMContentLoaded', function() {

  var $body        = $('body');
  var $displayCity = $('#temp-data');

  //get geo location
  var geoUrl = 'http://freegeoip.net/json/';
  console.log(geoUrl);

  //get city property
  $.getJSON(geoUrl, function(data) {
    geoCity = data.city;
    console.log(geoCity);

    countryName = data.country_name;
    console.log(countryName);

    // photo api
    var unsplashUrl = 'https://source.unsplash.com/daily?nature,';
    console.log('unsplashUrl: ' + unsplashUrl);

    // api keys
    var weatherApiKey = '&APPID=e0e46f68f42f81a76ba608830c740dc2';

    //weather api's
    var metric        = 'http://api.openweathermap.org/data/2.5/find?q=' + geoCity + '&units=metric';
    var tempUrl       = metric + weatherApiKey;
    console.log('tempUrl: ' + tempUrl);

    // get weather info and use ip location as param
    $.getJSON(tempUrl, function(data) {
      lists = data.list;
      console.log('lists: ' + lists);

      for (var i = 0; i < lists.length; i++) {
        var item       = lists[0];
        var icon       = "<img src='http://openweathermap.org/img/w/" + item.weather[0].icon + ".png'>";
        var bgImg      = unsplashUrl + item.weather[0].main;
        $body.css('background-image', 'url(' + bgImg + ')');
        console.log('icon string: ' + icon);
        console.log('background string: ' + bgImg);

        $displayCity.append('<p>' + 'Temperature for city of ' + item.name + ', ' + countryName + '</p>' + '<br>');
        $displayCity.append('<p>' + 'Current: ' + Math.round(item.main.temp) + '&#8451' + ' (' + Math.round((item.main.temp * 9 / 5 + 32)) + '&#8457)' + '</p>');
        //prevent returned json to display same digits for main/min/max temp
        if (item.main.temp !== item.main.temp_min) {
        $displayCity.append('<p>' + 'Min: ' + Math.round(item.main.temp_min) + '&#8451' + ' (' + Math.round((item.main.temp_min * 9 / 5 + 32)) + '&#8457)' + '</p>');
        }
        if (item.main.temp !== item.main.temp_max) {
        $displayCity.append('<p>' + 'Max: ' + Math.round(item.main.temp_max) + '&#8451' + ' (' + Math.round((item.main.temp_max * 9 / 5 + 32)) + '&#8457)' + '</p>');
        }
        $displayCity.append('<p>' + item.weather[0].description + '</p>').append(icon);
      }
    });
  });
}, false);

//Shorthand for $( document ).ready() --> ensure below code will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
$(function(){

function loadData() {
  var $city   = $('#city');
  var $body   = $('body');
  var $displayCity = $('#temp-data');

  //clear out old data before new request
  $displayCity.empty();
  $('img[src*="unsplash"]').remove(); //Selects elements that have the specified attribute with a value containing a given substring

  //params required for the app functionality
  var city          = $city.val();

  // photo api
  var unsplashUrl = 'https://source.unsplash.com/daily?nature,';
  console.log('unsplashUrl: ' + unsplashUrl);

  // api keys
  var weatherApiKey = '&APPID=e0e46f68f42f81a76ba608830c740dc2';

  //weather api's
  var metric        = 'http://api.openweathermap.org/data/2.5/find?q=' + city + '&units=metric';
  var tempUrl       = metric + weatherApiKey;
  console.log('tempUrl: ' + tempUrl);

  $.getJSON(tempUrl, function(data) {
    lists = data.list;
    console.log('lists: ' + lists);

    for (var i = 0; i < lists.length; i++) {
      var item       = lists[0];
      var icon       = "<img src='http://openweathermap.org/img/w/" + item.weather[0].icon + ".png'>";
      var bgImg      = unsplashUrl + item.weather[0].main;
      $body.css('background-image', 'url(' + bgImg + ')');
      console.log('icon string: ' + icon);
      console.log('background string: ' + bgImg);

      //check if city is already appended to html
      if (!$('.tempPara').length > 0) {
        $displayCity.append('<p class="tempPara">' + 'Temperature for city of ' + item.name + ', ' + item.sys.country + '</p>' + '<br>');
        $displayCity.append('<p class="tempPara">' + 'Current: ' + Math.round(item.main.temp) + '&#8451' + ' (' + Math.round((item.main.temp * 9 / 5 + 32)) + '&#8457)' + '</p>');
        //prevent returned json to display same digits for main/min/max temp
        if (item.main.temp !== item.main.temp_min) {
          $displayCity.append('<p class="tempPara">' + 'Min: ' + Math.round(item.main.temp_min) + '&#8451' + ' (' + Math.round((item.main.temp_min * 9 / 5 + 32)) + '&#8457)' + '</p>');
        }
        if (item.main.temp !== item.main.temp_max) {
          $displayCity.append('<p class="tempPara">' + 'Max: ' + Math.round(item.main.temp_max) + '&#8451' + ' (' + Math.round((item.main.temp_max * 9 / 5 + 32)) + '&#8457)' + '</p>');
        }
        $displayCity.append('<p class="tempPara">' + item.weather[0].description + '</p>').append(icon);
      }
    };

  });

  return false;
};
$('#form-container').submit(loadData);

});
