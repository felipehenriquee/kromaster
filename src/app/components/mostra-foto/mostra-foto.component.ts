import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mostra-foto',
  templateUrl: './mostra-foto.component.html',
  styleUrls: ['./mostra-foto.component.scss'],
})
export class MostraFotoComponent implements OnInit {

  @Input() fotoRecebida;
  @Input() mode;
 
  @Output() modeChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    
  }
  setStatus(status:number){
    
    this.mode = status;
    this.modeChange.emit(status);
  }

}
