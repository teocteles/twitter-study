import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TweetRecord } from '../model/Tweet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TweetService {


  private storageKey = 'meusTweets';

  constructor() { }

  // Método para salvar um novo tweet no LocalStorage
  criarTweet(item: any): void {
    const tweetsAnteriores = this.listarTweets();
    const tweetsAtualizados = [...tweetsAnteriores, item];
    localStorage.setItem(this.storageKey, JSON.stringify(tweetsAtualizados));
  }

  // Método para listar todos os tweets salvos no LocalStorage
  listarTweets(): any[] {
    const tweetsArmazenados = localStorage.getItem(this.storageKey);
    return tweetsArmazenados ? JSON.parse(tweetsArmazenados).sort(function(a,b) {return b.created - a.created;}) : [];
  }

  // Método para consultar um tweet específico pelo seu índice
  consultarTweet(index: number): any {
    const tweetsArmazenados = this.listarTweets();
    return tweetsArmazenados[index];
  }

  // Método para deletar um item específico pelo seu índice
  deletarTweet(index: number): void {
    const tweetsArmazenados = this.listarTweets();
    tweetsArmazenados.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(tweetsArmazenados));
  }


}
