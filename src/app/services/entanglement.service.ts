import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntanglementService {
  public $sendSignal = new BehaviorSubject<any>(null);
  
  constructor() { }
}
