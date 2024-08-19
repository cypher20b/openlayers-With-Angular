import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';
import Feature from 'ol/Feature';
import {
  Modify,
  Select,
  defaults as defaultInteractions,
} from 'ol/interaction';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  wait_bool:boolean = false;
  searchResult:any = []
  currowner: any;
  ngmeasure: any;
  not_clicked = true
  map: any;
  highlightStyle = new Style({
    fill: new Fill({
      color: 'blue',
    }),
    stroke: new Stroke({
      color: '#FF0000',
      width: 3,
    }),
  });

  
  my_selected = false;
  features:any = [];
  s_features:any = [];
  selected :any = null;
  focused = false;
  editing = false;
  searchKeyWord: any;
  itsComingFromMap = false
  pleaseWait = false
  Search_by = ''

    map_color = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 1.5
      })
    })

    mySource = new VectorSource({
      url: 'assets/map3.json',
      // url: 'assets/c25Geo.json',
      format: new GeoJSON(),
    })
    vector = new VectorLayer({
      source: this.mySource,
      // style: this.map_color
    });

    raster = new TileLayer({
      source: new OSM(),
    });
    select = new Select({
      // wrapX: false,
    });
    modify = new Modify({
      features: this.select.getFeatures(),
    });

    place = [-0.0310, 5.7120];
    // place = [1248832.3328308172,378715.06667509256]
    zoomValue = 15.6;
    // zoomValue = 10.6;
    view = new View({
      projection: 'EPSG:4326',
      // projection: 'EPSG:32630',
      center: this.place,
      zoom: this.zoomValue,
      minZoom: 9,
      maxZoom: 18,
    });
  constructor(private router:Router) { }
  waitFnx(){
    this.router.navigate(['/wait'])
  }
  clearSearch(){
    this.pleaseWait = true
    this.wait_bool = true
    this.view.animate({
      center: [-0.0310, 5.7120],
      duration: 100,
      zoom: 15.3
    });
    // this.service.waitFnx()
    if (this.itsComingFromMap) {
      this.searchKeyWord = ''
      console.log('if')
      this.searchResult = []
      this.itsComingFromMap = false
  
      
    } 
    else {
      console.log('wait true')
      let i = 0
    this.mySource.forEachFeature((feature:any)=>{
      if (feature.values_.Prop_Owner.toLowerCase().includes(this.searchKeyWord.toLowerCase())) {
        let coordi = [(feature.values_.geometry.extent_[0]+feature.values_.geometry.extent_[2])/2,(feature.values_.geometry.extent_[1]+feature.values_.geometry.extent_[3])/2]
        // console.log(coordi);
        let self =this
        // self.features.push({feature:feature.values_, pixel:self.map.getPixelFromCoordinate(coordi)});
        self.map.forEachFeatureAtPixel(self.map.getPixelFromCoordinate(coordi), (feat:any, layer:any)=>{
          // console.log(feat);
          // self.my_selected.push(feat)
          self.features.push({feature:feat, pixel:self.map.getPixelFromCoordinate(coordi)})
          feat.setStyle(undefined)
          // console.log(layer)
        })
          if (i<1137) {
            console.log(this.pleaseWait)
            console.log('wait false')
            i = i+1
          }else{
          }
        
      }
      if (this.searchResult.length) {
        this.searchResult.pop()
      }
      else{
        // this.searchResult = []  
        this.searchKeyWord = ''
      }
    })
    
    this.pleaseWait = false
    
    }
    
  }
  zoomToResult(id: number){
    this.view.animate({
      center: [-0.0310, 5.7120],
      duration: 100,
      zoom: 15.3
    });
    if (this.searchResult.length && this.not_clicked) {
      this.itsComingFromMap = true
      console.log(this.searchResult[id].coodinate);
      this.searchResult[id].name.Acre = Math.round(((this.searchResult[id].name.Acre * 4046.86)*100)/100) 
      console.log(this.searchResult[id]);
      this.view.animate({
        center: this.searchResult[id].coodinate,
        duration: 350,
        zoom: this.view.getZoom()! + 1
      });
      
    }
    this.not_clicked = !this.not_clicked
  }
  zoomOutToDefault() { 
    this.view.animate({
            center: [-0.0310, 5.7120],
            duration: 200,
            zoom: 15.3
          });
  }
  search(){
    this.searchResult = []
    this.mySource.forEachFeature((feature:any)=>{
      switch (this.Search_by) {
        case 'name':
          if (feature.values_.Prop_Owner.toLowerCase().includes(this.searchKeyWord.toLowerCase())) {
            let coordi = [(feature.values_.geometry.extent_[0]+feature.values_.geometry.extent_[2])/2,(feature.values_.geometry.extent_[1]+feature.values_.geometry.extent_[3])/2]
            let self =this
            self.map.forEachFeatureAtPixel(self.map.getPixelFromCoordinate(coordi), (feat:any, layer:any)=>{
              // console.log(feat.values_);
              this.searchResult.push({name:feat.values_, coodinate: coordi})
              self.features.push({feature:feat, pixel:self.map.getPixelFromCoordinate(coordi)})
              feat.setStyle(self.highlightStyle)
            })
          }
          break;
          case 'plot':
            if (feature.values_.Propcode.toLowerCase().includes(this.searchKeyWord.toLowerCase())) {
              let coordi = [(feature.values_.geometry.extent_[0]+feature.values_.geometry.extent_[2])/2,(feature.values_.geometry.extent_[1]+feature.values_.geometry.extent_[3])/2]
              let self =this
              self.map.forEachFeatureAtPixel(self.map.getPixelFromCoordinate(coordi), (feat:any, layer:any)=>{
                // console.log(feat.values_);
                this.searchResult.push({name:feat.values_, coodinate: coordi})
                self.features.push({feature:feat, pixel:self.map.getPixelFromCoordinate(coordi)})
                feat.setStyle(self.highlightStyle)
              })
            }
            break;
            
        default:
          console.log('please make a selection')
          break;
      }
    })
  }
  
  
  ngOnInit() {
  let self = this;
  
    
    this.map = new Map({
      target: 'map',
      layers: [
        this.raster, this.vector
      ],
      view: this.view
    });
    
     
  //   this.map.on('click', (e: any) => {
        
  //     self.view.animate({
  //       center: [-0.0310, 5.7120],
  //       duration: 200,
  //       zoom: 15.3
  //     });
  //     if (self.selected !== null) {
  //       console.log('if')
  //       self.selected.setStyle(undefined)
  //       this.searchResult.pop()
  //     self.selected = null
  //     }
  //   this.map.forEachFeatureAtPixel(e.pixel, function (feature: any, layer: any) {
  //     self.place = e.coordinate;
  //     self.zoomValue = 18.5;
  //   // if (self.focused === false) {
    
  //     if (self.selected !== null) {
  //       console.log('if')
  //       self.selected.setStyle(undefined)
    
  //     self.selected = null
  //     }
  
  
      
  //     else{
  //     //   self.view.animate({
  //     //     center: [-0.0310, 5.7120],
  //     //     duration: 200,
  //     //     zoom: 15.3
  //     // });
  //       console.log('else')
  //       self.itsComingFromMap = true
  //       self.searchResult.push({name:feature.values_, pixel:e.pixel, coodinate: e.coordinate})
  //       feature.setStyle(self.highlightStyle);
  //       self.view.animate({
  //         center: self.place,
  //         duration: 500,
  //         zoom: self.view.getZoom()! + 1
  //     });
  //     self.selected = feature;
  //     }
  
  
  //   // }
  
  // })
  
      
  // })  
}
}