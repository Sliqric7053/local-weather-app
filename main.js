//Shorthand for $( document ).ready() --> ensure below code will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
$(function(){

function loadData() {
  var $icon   = $('#icon');
  var $number = $('#number');
  var $symbol = $('#symbol');
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
  var mapApiKey     = '&key=AIzaSyCzu6WxG9fwKEjct2c-iG2amQgHuf_d2-I';

  //weather api's
  var metric        = 'https://api.openweathermap.org/data/2.5/find?q=' + city + '&units=metric';
  // var imperial      = 'api.openweathermap.org/data/2.5/find?q=' + city + '&units=imperial';
  var tempUrl       = metric + weatherApiKey;
  console.log('tempUrl: ' + tempUrl);

  $.getJSON(tempUrl, function(data) {
    lists = data.list;
    console.log('lists: ' + lists);

    for (var i = 0; i < lists.length; i++) {
      var item       = lists[0];
      var icon       = "<img src='https://openweathermap.org/img/w/" + item.weather[0].icon + ".png'>";
      var background = '<img class="img" id="background" src="' + unsplashUrl + item.weather[0].main + '">';
      var bgImg      = unsplashUrl + item.weather[0].main;
      $body.css('background-image', 'url(' + bgImg + ')');
      console.log('icon string: ' + icon);
      console.log('background string: ' + bgImg);

      // var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + item.coord.lon + ',' + item.coord.lat + '&zoom=12&size=400x400&maptype=satellite' + mapApiKey;
      // console.log('mapUrl string: ' + mapUrl);
      // $displayCity.append(icon);
      $displayCity.append('<p>' + 'Temperature for city of ' + item.name + ', ' + item.sys.country + '</p>' + '<br>');
      $displayCity.append('<p>' + 'Current: ' + item.main.temp + '&#8451' + '</p>');
      if (item.main.temp !== item.main.temp_min) {
      $displayCity.append('<p>' + 'Min: ' + item.main.temp_min + '&#8451' + '</p>');
      }
      if (item.main.temp !== item.main.temp_max) {
      $displayCity.append('<p>' + 'Max: ' + item.main.temp_max + '&#8451' + '</p>');
      }
      $displayCity.append('<p>' + item.weather[0].description + '</p>').append(icon);
      // $displayCity.append('<img src="'+ mapUrl + '">');

    }

  });

  return false;
};
$('#form-container').submit(loadData);

});
