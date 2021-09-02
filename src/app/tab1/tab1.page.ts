import { CardsService } from './../services/cards.service';
import { Component } from '@angular/core';
import { Cards } from '../models/cards';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  public cards = new Array<Cards>();
  
  private cardsSubscription: Subscription;
  fotoEscolhida;
  mode = 0;
  constructor(private cardsService: CardsService) {
    this.cardsSubscription = this.cardsService.getCards().subscribe(data => {
      this.cards = data;
      console.log(this.cards)
      this.cards[0].descricao="teste";
      
    
    })
  }

  abreFoto(fotoEscolhida){
    this.fotoEscolhida = fotoEscolhida;
    this.mode = 1;
  }
  ngOnDestroy(){
    this.cardsSubscription.unsubscribe();
  }
  async delete(id){
    
    await this.cardsService.deleteCards(id);
  }
  
}
