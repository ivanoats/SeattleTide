# Seattle Weather and Tide Graph

I just wanted a simple way to see weather and tidal information for where I like to paddle.

This example is hard-coded to West Point for weather, and Meadow Point (near Golden Gardens) for tide, but you can get your own widget code from [here](https://www.tidegraph.com/index.php?page=339264.txt&src=//tides.tidegraph.com/api/tidegraph.php?bg%3Dwhite%26scale%3D1%26color%3Dblack%26lat%3D47.6733790%26lng%3D-122.4076660&background_option=white-black&scale=1&station_option=latlng_station&lat=47.6733790&lng=-122.4076660).

### Data sources

- National Weather Service (NWS) Station ID: https://api.weather.gov/stations/WPOW1/observations this has been offline since 2019, and the NWS's backlog of software development is so huge, I doubt it will ever get fixed.
- National Buoy Data Center (NBDC): This is a more reliable API, even if it only provides CSV data instead of JSON. 

### License

Open source: [MIT](https://opensource.org/licenses/MIT)
