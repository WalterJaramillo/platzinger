# Platzinger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notas

### Interfaces
Los tipos de datos Interfaces de TypScript, son muy parecidos a una clase, en la que se definen propiedades internas que pueden ser de cualquiera de los otros tipos. Estas propiedades internas pueden definirse como obligatorias u opcionales usando el símbolo “”?"". Las interfaces definen en cierto modo estructuras personalizadas de datos en las que lo principal es que al ser implementadas usando ciertas IDEs (como Webstorm), muestran mensajes de control y validación para asegurar el uso adecuado de dicha interface, en tiempo real durante el desarrollo.

La forma de declarar una interface se puede ver en el siguiente ejemplo:

`export interface User {
  nick: string,
  subnick?: string,
  age?: number,
  email: string,
  friend: boolean,
  uid: any
}`

### *ngFor

NgFor es una directiva estructural que afecta (agrega, modifica o elimina) un elemento HTML. Las directivas estructurales las identificamos porque llevan un * antes de la directiva, por ejemplo: *ngFor

NgFor nos permite recorrer un arreglo de datos y por cada elemento generar o imprimir en el DOM un elemento HTML nuevo, con algún valor cambiado basado en el elemento leído del arreglo.

`<p *ngFor="let user of friends; let i = index">
 {{ i }}. {{ user.nick }} - {{ user.email }}
</p>`

### *ngIf

NgIF es una directiva estructural de Angular que evalúa un valor o una expresión buleana, en función de la cual se mostrará o no, un elemento HTML. El elemento se mostrará sólo cuando la condición sea verdadera (true).

`<ng-container *ngFor="let user of friends; let i = index">
  <p *ngIf="user.friend" >
    {{ i }}. {{ user.nick }} - {{ user.email }}
  </p>
</ng-container>`
