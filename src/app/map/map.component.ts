import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../services/worker.service';
import { Router } from '@angular/router';
import Overlay from 'ol/Overlay.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private router: Router, private service: WorkerService) { 
   
  }
  


ngOnInit(): void {
  let self = this
  this.service.ngOnInit()
  this.service.map.on('click', (e: any) => {
    // console.log(e)
    // console.log(this.service.map)
    this.service.zoomOutToDefault()
    if (this.service.selected !== null) {
      console.log('if')
      this.service.selected.setStyle(undefined)
      this.service.searchResult.pop()
      this.service.selected = null
    }
  this.service.map.forEachFeatureAtPixel(e.pixel, function (feature: any, layer: any) {
    self.service.place = e.coordinate;
    self.service.zoomValue = 18.5;
    // console.log(e.target);
    // console.log(layer);
    let partialInfo = document.createElement('div')
    partialInfo.innerHTML = `<span class="partial-info">${feature}</span>`
    self.service.map.addOverlay(new Overlay({
      element: partialInfo
    }))
    if (self.service.selected !== null) {
      console.log('if');
      self.service.selected.setStyle(undefined);
      self.service.selected = null;
    }


    
    else{
      console.log('else')
      self.service.itsComingFromMap = true
      self.service.searchResult.push({name:feature.values_, pixel:e.pixel, coodinate: e.coordinate})
      feature.setStyle(self.service.highlightStyle);
      self.service.view.animate({
        center: self.service.place,
        duration: 500,
        zoom: self.service.view.getZoom()! + 1
    });
    self.service.selected = feature;
    }


  // }

})

    
})
///////////////////////////////////////////////
// this.map.on('click', (e: any) => {
//   if (this.selected !== null || this.editing===true) {
//     if (this.focused===false) {
//       this.map.forEachFeatureAtPixel(e.pixel, function (feature: any, layer: any) {
//         // feature.setStyle(undefined)
//         self.selected = feature
//       })
//       this.selected.setStyle(undefined);
//       console.log(e.pixel);
//       // console.log(this.selected.values_.Propcode);
//       // console.log(this.selected.values_);
//      this.selected = null;
//     this.view.animate({
//       center: [-0.0310, 5.7120],
//       duration: 200,
//       zoom: 15.3
//   }); 
// }
//   this.focused = false;
//   }
// this.map.forEachFeatureAtPixel(e.pixel, function (feature: any, layer: any) {
//   self.view.animate({
//     center: [-0.0310, 5.7120],
//     duration: 200,
//     zoom: 15.3
// });
//   // console.log();
//   self.place = e.coordinate;
//   self.zoomValue = 18.5;
//   // console.log(e.coordinate);
// self.selected=feature;
// if (self.selected === null) {
//   feature.setStyle(undefined);
//   self.selected.setStyle(undefined)
//   self.selected = null;
// }
// else{
//   for (let i = 0; i < self.searchResult.length; i++) {
//     self.map.forEachFeatureAtPixel(self.searchResult, (feat:any, lay:any)=>{
//       feat.setStyle(undefined)
//     })
    
//   }
//   self.view.animate({
//     center: self.place,
//     duration: 500,
//     zoom: self.view.getZoom()! + 1
// }); 
//   self.itsComingFromMap = true
//   self.searchResult.push({name:feature.values_.Prop_Owner, pixel:e.pixel})
//   feature.setStyle(self.highlightStyle)
// }

// })

  
// }) 
}
  
}
