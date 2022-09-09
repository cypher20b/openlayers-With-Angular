import { Component } from '@angular/core';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currowner:any;
  ngmeasure:any;
  map: any;
  title = 'templato';
  map_color = new Style({
    stroke: new Stroke({
      color: "#0a0c0f",
      // width: 1.5
    })
  })

  mySource = new VectorSource({
    url: 'assets/map.json',
    // url: 'assets/c25Geo.json',
    format: new GeoJSON(),
  })
  vector = new VectorLayer({
    source: this.mySource,
    // style: map_color
  });

  raster = new TileLayer({
    source: new OSM(),
  });

  place = [0.0147, 5.7299];
        zoomValue = 15.3;
        view = new View({
          projection: 'EPSG:4326',
          center: this.place,
          zoom: this.zoomValue,
          minZoom: 9,
          maxZoom: 18,
        });
  ngOnInit():void{
    let self = this;
    
      
      this.map = new Map({
        target: 'map',
        layers: [
          this.raster, this.vector
        ],
        view: this.view
      });
  }
}
