import axios from 'axios'
import {Loader, LoaderOptions} from 'google-maps';
const express = require('express')
const app = express();
import circle  from '@turf/circle'
import { Units } from './enums'

app.listen(3000);
console.log('server running on port 3000')
app.get('/', async (req:any,res:any) =>{
    res.json('server running');
    //initMap();
    //const area = getPolygonCoord(34.067719, -118.380412, 50);
    const area = getPolygon(34.067719, -118.380412, 80);
    console.log(area);
    
})

function getPolygon(lat: number, long: number, radius: number) {
  const center = [long, lat];
  let units1 : Units;
  units1 = "meters"
  const options = {steps: 15, units: units1, properties: {foo: 'bar'}};
  const circle1 = circle(center, radius, options);
  const arrayInitial = circle1.geometry.coordinates;
  const points = [];

  arrayInitial.forEach(function(number) {
    number.forEach(function(item) {
        const p = [item[1], item[0]]
        // save to our results array
        points.push(p)
    })
  });

  console.log(points);
}

app.get('/characters', async (req:any,res:any) =>{
    const response= await axios.get("https://rickandmortyapi.com/api/character")
    console.log(response.data);
})

function initMap(): void {    
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};
map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 8
});
}

function getPolygonCoord(lat: number, long: number, radius: number) {
    //Degrees to radians
    var d2r = Math.PI / 180
  
    //  Radians to degrees
    var r2d = 180 / Math.PI
  
    // Earth radius is 3,963 miles
    var cLat = (radius / 3963) * r2d
    console.log('cLat',cLat)
  
    var cLng = cLat / Math.cos(lat * d2r)
    console.log('cLng',cLng)
  
    //Store points in array
    var points = []
    // Calculate the points
    // Work around 360 points on circle
    let circleX: number = 0
    let circleY: number = 0
    for (var i = 0; i<360;i+=360/16) {
      var theta = Math.PI * (i / 180)
      console.log('theta',theta)
  
      // Calculate next X point
      circleY = long + cLng * Math.cos(theta)
      circleY = Number(circleY.toFixed(6))
      // Calculate next Y point
      circleX = lat + cLat * Math.sin(theta)
      circleX = Number(circleX.toFixed(6))
      // Add point to array
      const p = [circleX,circleY]
      points.push(p)
      }
      //points.push(points[0])
      return points;
  }
