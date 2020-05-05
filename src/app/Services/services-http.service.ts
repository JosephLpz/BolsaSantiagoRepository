import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Componente } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicesHttpService {

  constructor(private http: HttpClient) { }

GetIndices(token: string){

  return this.http.post('https://startup.bolsadesantiago.com/api/consulta/TickerOnDemand/getIndices?access_token=' + token, '');

      }

  GetIndicesOffLine(){
    return ({
    listaResult: [
        {
          Nombre: "SPCLXIGPA",
          Valor: 19295.38,
          Mayor: 19823.332477926,
          Menor: 19193.67,
          Medio: 0,
          Variacion: -2.66
        },
        {
          Nombre: "SP IPSA",
          Valor: 3853.27,
          Mayor: 3977.564009755,
          Menor: 3833.26,
          Medio: 0,
          Variacion: -3.12
        },
        {
          Nombre: "SPCLXIN10",
          Valor: 4983.5,
          Mayor: 5151.813241753,
          Menor: 4921.56,
          Medio: 0,
          Variacion: -3.27
        }
      ]
    });
  }

}
