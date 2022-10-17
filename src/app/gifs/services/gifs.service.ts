import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey:string ='OzXyprhoKINGATwLoRjb61qDwsvPPmt5'
  private _historial:string[]=[];

  private servicioUrl:string='https://api.giphy.com/v1/gifs';

  //todo: cambiar any por su tipo
  public resultados:Gif[]=[]

  get historial(){
  

    return [...this._historial]
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')! ) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []


    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')! )
    // }
  }

  buscarGifs(query:string=''){

    query=query.toLowerCase();
    if(!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('limit', '10')
    .set('q', query);
    console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) =>{
        console.log(resp.data)
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })

  }


}
