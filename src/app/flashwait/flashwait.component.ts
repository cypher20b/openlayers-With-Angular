import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-flashwait',
  templateUrl: './flashwait.component.html',
  styleUrls: ['./flashwait.component.scss']
})
export class FlashwaitComponent implements OnInit {

  constructor(private service:WorkerService, private router:Router ) { }
  
  ngOnInit(): void {
  }

}
