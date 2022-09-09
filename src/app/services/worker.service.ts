import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  wait_bool:boolean = false;
  constructor(private router:Router) { }
  waitFnx(){
    this.router.navigate(['/wait'])
  }
  
}
