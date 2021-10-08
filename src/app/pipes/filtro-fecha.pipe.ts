import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFecha'
})
export class FiltroFechaPipe implements PipeTransform {

  transform(array: any[], texto: string, columna: string ): any[] {

    if (texto === '') {
      return array;
    }
    texto = texto.toLowerCase();

    return array.filter( item => {
      return item[columna].toLowerCase()
          .includes( texto);
    });
  }

}
