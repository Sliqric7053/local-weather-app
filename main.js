// NEW YAHOO WEATHER API

//automatically run this code when the page loads
document.addEventListener(
  'DOMContentLoaded',
  function() {
    var $body = $('body');
    var $city = $('#city');
    var $displayCity = $('#temp-data');

    // params required for the app functionality
    var city = $city.val();

    //get geo location
    var geoUrl =
      'http://api.ipstack.com/105.246.4.51?access_key=36abae59b119489a660b47b9ba7803d6';
    console.log('geoUrl: ' + geoUrl);

    //get city property - to be used in weather api
    $.getJSON(geoUrl, function(ipstackResponse) {
      console.log('TCL: ipstackResponse', ipstackResponse);
      const lat = ipstackResponse.latitude;
      const long = ipstackResponse.longitude;

      // photo api
      var unsplashUrl = 'https://source.unsplash.com/daily?nature,';
      console.log('unsplashUrl: ' + unsplashUrl);

      // weather unlocked api
      const appID = 'c6c98a22';
      const appKey = '3206ac48280890c02318a26313c19bca';
      const weatherUrl = `http://api.weatherunlocked.com/api/current/${lat},${long}?app_id=${appID}&app_key=${appKey}`;

      // get weather info from Yahoo weather api
      $.getJSON(weatherUrl, function(weatherunlockedResponse) {
        console.log('TCL: weatherunlockedResponse', weatherunlockedResponse);

        // weather icons
        var icon = '<img src="icons/' + weatherunlockedResponse.wx_icon + '">';

        //display background photo using unsplash api
        var bgImg;
        switch (weatherunlockedResponse.wx_desc) {
          case 'Breezy':
            bgImg = unsplashUrl + 'wind';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          case 'Showers':
            bgImg = unsplashUrl + 'rain';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          case 'Mostly Cloudy':
            bgImg = unsplashUrl + 'clouds';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          case 'Partly Cloudy':
            bgImg = unsplashUrl + 'cloudy';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          case 'Mostly Clear':
            bgImg = unsplashUrl + 'sky';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          case 'Mostly Sunny':
            bgImg = unsplashUrl + 'sunny';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          case 'Thunderstorms':
            bgImg = unsplashUrl + 'storm';
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
            break;
          default:
            bgImg =
              unsplashUrl + weatherunlockedResponse.wx_desc.replace(/\s/g, '');
            $body.css('background-image', 'url(' + bgImg + ')');
            console.log('background string: ' + bgImg);
        }

        //add text from apis to HTML
        $displayCity.append(
          '<p>' +
            'Temperature for city of ' +
            ipstackResponse.city +
            ', ' +
            ipstackResponse.country_name +
            ' ' +
            ipstackResponse.location.country_flag_emoji +
            '</p>' +
            '<br>'
        );
        $displayCity.append(
          '<p>' +
            'Current: ' +
            Math.round(weatherunlockedResponse.temp_c) +
            '&#8451' +
            ' (' +
            Math.round(weatherunlockedResponse.temp_f) +
            '&#8457)' +
            '</p>'
        );
        $displayCity.append(
          '<p>' +
            'Feels like: ' +
            Math.round(weatherunlockedResponse.feelslike_c) +
            '&#8451' +
            ' (' +
            Math.round(weatherunlockedResponse.feelslike_f) +
            '&#8457)' +
            '</p>'
        );
        $displayCity.append(
          '<p>' +
            'Wind speed: ' +
            Math.round(weatherunlockedResponse.windspd_kmh) +
            ' kmh' +
            ' (' +
            Math.round(weatherunlockedResponse.windspd_mph) +
            ' mph)' +
            '</p>'
        );
        $displayCity.append(icon);
      });
    });
  },
  false
);

//Shorthand for $( document ).ready() --> ensure below code will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
// $(function() {
//   function loadData() {
//     var $city = $('#city');
//     var $body = $('body');
//     var $displayCity = $('#temp-data');

//     //clear out old data before new request
//     $displayCity.empty();
//     $('img[src*="unsplash"]').remove(); //Selects elements that have the specified attribute with a value containing a given substring

//     //params required for the app functionality
//     var city = $city.val();

//     // photo api
//     var unsplashUrl = 'https://source.unsplash.com/daily?nature,';
//     console.log('unsplashUrl: ' + unsplashUrl);

//     //weather api - using FreeGeoIP api to obtain current location of computer
//     var tempUrl =
//       "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
//       city +
//       "') and u='c'&format=json";
//     console.log('tempUrl: ' + tempUrl);

//     // get weather info from Yahoo weather api
//     $.getJSON(tempUrl, function(data) {
//       //convert json to array so you can traverse the properties
//       var resultArr = [];
//       for (var x in data.query.results.channel) {
//         resultArr.push([x, data.query.results.channel[x]]);
//       }
//       console.log('resultArr: ' + resultArr);

//       //weather icons
//       var icon =
//         '<img src="http://l.yimg.com/a/i/us/we/52/' +
//         data.query.results.channel.item.condition.code +
//         '.gif">';
//       console.log(icon);

//       //display background photo using unsplash api
//       var bgImg;
//       switch (data.query.results.channel.item.condition.text) {
//         case 'Breezy':
//           bgImg = unsplashUrl + 'wind';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         case 'Showers':
//           bgImg = unsplashUrl + 'rain';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         case 'Mostly Cloudy':
//           bgImg = unsplashUrl + 'clouds';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         case 'Partly Cloudy':
//           bgImg = unsplashUrl + 'cloudy';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         case 'Mostly Clear':
//           bgImg = unsplashUrl + 'sky';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         case 'Mostly Sunny':
//           bgImg = unsplashUrl + 'sun';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         case 'Thunderstorms':
//           bgImg = unsplashUrl + 'storm';
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//           break;
//         default:
//           bgImg = unsplashUrl + data.query.results.channel.item.condition.text;
//           $body.css('background-image', 'url(' + bgImg + ')');
//           console.log('background string: ' + bgImg);
//       }

//       //add text from apis to HTML
//       $displayCity.append(
//         '<p>' +
//           'Temperature for city of ' +
//           data.query.results.channel.location.city +
//           ', ' +
//           data.query.results.channel.location.country +
//           '</p>' +
//           '<br>'
//       );
//       $displayCity.append(
//         '<p>' +
//           'Current: ' +
//           Math.round(data.query.results.channel.item.condition.temp) +
//           '&#8451' +
//           ' (' +
//           Math.round(
//             (data.query.results.channel.item.condition.temp * 9) / 5 + 32
//           ) +
//           '&#8457)' +
//           '</p>'
//       );
//       $displayCity.append(
//         '<p>' +
//           'Min: ' +
//           Math.round(data.query.results.channel.item.forecast[0].low) +
//           '&#8451' +
//           ' (' +
//           Math.round(
//             (data.query.results.channel.item.forecast[0].low * 9) / 5 + 32
//           ) +
//           '&#8457)' +
//           '</p>'
//       );
//       $displayCity.append(
//         '<p>' +
//           'Max: ' +
//           Math.round(data.query.results.channel.item.forecast[0].high) +
//           '&#8451' +
//           ' (' +
//           Math.round(
//             (data.query.results.channel.item.forecast[0].high * 9) / 5 + 32
//           ) +
//           '&#8457)' +
//           '</p>'
//       );
//       $displayCity
//         .append(icon)
//         .append(
//           '<p>' +
//             '<em>' +
//             data.query.results.channel.item.condition.text +
//             '<em>' +
//             '</p>'
//         );
//     });
//     return false;
//   }
//   $('#form-container').submit(loadData);
// });
