import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    public transform(value: any, args: string) {
        
        if(!value) {
            return;
        }
        //si viene vacio, que devuelva el arreglo vacio, para que muestren todos los contactos
        if(!args) {
            return value;
        }

        args = args.toLowerCase();
        return value.filter( (item: any)=> {
            return JSON.stringify(item).toLowerCase().includes(args);
        })
    }
}