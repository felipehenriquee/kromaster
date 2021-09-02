import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Cards } from './../models/cards';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from "rxjs/operators"

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private productCollection: AngularFirestoreCollection<Cards>;
  private path = window.localStorage.getItem("userId")+"/"
  

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { 
    this.productCollection = this.afs.collection<Cards>("cards");
    
    
    
  }
  getCards(){
    return this.db.list(this.path)
    .snapshotChanges()
    .pipe(
      map(actions=>{
        return actions.map(a =>{
          
          console.log({key: a.payload.key, tes: a.payload.val()})
          const id = a.payload.key;
          let data: Cards = a.payload.val();
          data.id = id;
          return {...data}
        })
      })
    )
    
  }
 
  getCard(id: string){
    
    return this.db.object(this.path+id)
    .snapshotChanges().pipe(map(a => {
      const id = a.payload.key;
      let data: Cards = a.payload.val();
      data.id = id;
      return {...data}
    }))
    
  }
  addCards(card: Cards){
    return new Promise<void>((resolve, reject) =>{
      if (card.id != "none"){
        this.db.list(this.path)
        .update(card.id, {nome: card.nome, 
          descricao: card.descricao, 
          pm: card.pm, 
          pa: card.pa, 
          pv: card.pv, 
          poderes: card.poderes, 
          foto: card.foto})
          .then(() => resolve())
          .catch((e) => reject(e));
      }
      else{
        this.db.list(this.path).push({nome: card.nome, 
          descricao: card.descricao, 
          pm: card.pm, 
          pa: card.pa, 
          pv: card.pv, 
          poderes: card.poderes, 
          foto: card.foto}).then(() => resolve())
      }
    })
  }
  
  deleteCards(id: string){
    return this.db.list(this.path).remove(id);
  }
}
