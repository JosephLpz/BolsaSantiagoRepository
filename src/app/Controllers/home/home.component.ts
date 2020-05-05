import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ServicesHttpService} from '../../Services/services-http.service';
import { Chart } from 'Chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Nemos: any;
  myChart;
  token;
constructor(private services: ServicesHttpService) { }

  ngOnInit() {
//Se Utiizaba para hacer pruebas de manera offline
//this.Nemos = this.services.GetIndicesOffline().listaResult;

}

AccesToken(token){
  console.log(token);
  this.getInstrumentos(token);
}

 async getInstrumentos(token){
    this.services.GetIndices(token).subscribe((data)=>{
      this.Nemos = data['listaResult']
      console.log(this.Nemos);
   });
  }

crearGrafico(){
this.myChart = new Chart( 'myChart' , {
  type: 'line',
  data: {
      labels: ['Mayor', 'Medio', 'Menor', 'Valor', 'Variacion'],
      datasets: [{
          label: '',
          data: [],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
  }
  onClick(indice){
    this.crearGrafico();
    this.addData(indice.Nombre, this.randomColor(), [indice.Mayor, indice.Medio, indice.Menor, indice.Valor, indice.Variacion]);
  }

addData(label, color, data) {
    this.myChart.update();
    this.myChart.data.datasets.push({ label: label,
      borderColor: color, data: data});
    this.myChart.update();
}

MostrarTodos(indices){
this.crearGrafico();
indices.forEach(data => {
  this.addData(data.Nombre, this.randomColor()
  , [ data.Mayor, data.Medio, data.Menor,
    data.Valor, data.Variacion]);
});

}

limpiar(){
  this.myChart.destroy();

}

randomColor()
{
    var color='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';

     return color;
}

removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}
}
