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

```
export interface User {
  nick: string,
  subnick?: string,
  age?: number,
  email: string,
  friend: boolean,
  uid: any
}
```

### *ngFor

NgFor es una directiva estructural que afecta (agrega, modifica o elimina) un elemento HTML. Las directivas estructurales las identificamos porque llevan un * antes de la directiva, por ejemplo: *ngFor

NgFor nos permite recorrer un arreglo de datos y por cada elemento generar o imprimir en el DOM un elemento HTML nuevo, con algún valor cambiado basado en el elemento leído del arreglo.

```
<p *ngFor="let user of friends; let i = index">
 {{ i }}. {{ user.nick }} - {{ user.email }}
</p>
```

### *ngIf

NgIF es una directiva estructural de Angular que evalúa un valor o una expresión buleana, en función de la cual se mostrará o no, un elemento HTML. El elemento se mostrará sólo cuando la condición sea verdadera (true).

```
ng-container *ngFor="let user of friends; let i = index">
  <p *ngIf="user.friend" >
    {{ i }}. {{ user.nick }} - {{ user.email }}
  </p>
</ng-container>
```

### Navegacion con Parametros

Al navegar entre pantallas, hay ocasiones en las que es necesario pasar datos particulares. Usando routerLink podemos incluir parámetros de manera similar a como lo hacemos con subdominios o subdirectorios. Para recibir e interpretar estos parámetros correctamente es necesario definir las rutas específicas en appRoutes y consultarlos luego en el componente con el objeto ActivatedRoute.

El componente que recibe los parametros debe realizar este import: `import { ActivatedRoute } from '@angular/router';`
En el constructor realizar lo siguiente:

```
export class ConversationComponent implements OnInit {
  friendId: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    console.log(this.friendId);
   }

  ngOnInit() {
  }
}
```

En el array de rutas se debe incorporar el parametros en el path que se va a mandar:

```
const appRoutes: Routes = [
  { path: 'conversation/:uid', component: ConversationComponent },
];
```

### Servicios

Un servicio es una clase que puede ser inyectada en uno o varios componentes y que es muy útil para compartir datos o funciones entre éstos, evitando la duplicidad de código.

Se crean a través del Angular CLI con el siguiente comando:

`ng generate service <directorio>/<nombre del servicio>`
Al ejecutar este comando se generan en nuestro proyecto los siguientes archivos:
```
/<directorio>
  <nombre del servicio>.service.spec.ts
  <nombre del servicio>.service.ts
```
Luego en el componente, inyectamos el Servicio de manera similar a cómo inyectamos el ActivatedRoute.

```
export class HomeComponent implements OnInit {
  friends: User[];
  constructor(private userService: UserService) { 
    this.friends = userService.getFriends();
  }
  
  ngOnInit() {}
}
```

### Pipes

Los pipes en angular, son elementos que se pueden incluir en el HTML y nos permiten aplicar transformaciones a los datos antes de mostrarlos.

Algunos de los pipes más usados son:

1. json
2. number: ‘<formato-decimal>’
3. date: ‘<formato de fecha>’

```
<p>
  {{ friend | json }}
</p>
<p>
  {{ price | number: '1.2-2' }}
</p>
<p>
  {{ today | date: 'short' }}
</p>
<p>
  {{ today | date: 'medium' }}
</p>
<p>
  {{ today | date: 'full' }}
</p>
<p>
  {{ today | date: 'EEEE dd/MM/yy' }}
</p>
```

output:
```
{ "nick": "Eduardo", "subnick": "Mi mensaje personal", "status": "online", "age": 28, "email": "eduardo@platzi.com", "friend": true, "uid": 1 }

78.23

3/27/19, 1:43 PM

Mar 27, 2019, 1:43:00 PM

Wednesday, March 27, 2019 at 1:43:00 PM GMT-03:00

Wednesday 27/03/19
```

Puedes consultar más formatos en la documentación oficial de [Angular - Pipes](https://angular.io/api/common/DatePipe).

#### Pipes - Custom

Para crear un pipe personalizado debemos crear un archivo de TypeScript e importar las clases Pipe y PipeTransform desde @angular/core.

```
import {Pipe, PipeTransform} from '@angular/core';

@Pipe ({
  name: 'nombre-del-pipe' // --- este es el nombre con que se implementa en el html
})
export class MiCustomPipe implements PipeTransform {
  public transform ( value, args: string ) {
     return <valor transformado>
  }
}
```

### Estilos

Se recomienda instalar los paquetes con versiones exactas para evitar incompatibilidades con versiones futuras de las librerías.

`npm install bootstrap --save-exact`
`npm install @fortawesome/fontawesome-free --save-exact`

Luego de instalados los paquetes con npm, la implementación se hace importando las librerías en la sección styles del archivo angular.json

...
  ""styles"": [
    ""node_modules/bootstrap/dist/css/bootstrap.css"",
    ""node_modules/@fortawesome/fontawesome-free/css/all.css"",
    ""src/styles.css""
  ]
...

### NgClass 
Es una directiva que te permite aplicar una u otra clase a un elemento de html, dependiendo de una condición o expresión buleana.
La forma de implementar NgClass es la siguiente:

```
  <div [ngClass] = ""{ '<nombre-de-la-clase': <expresión buleana> }"">
    <!-- -->
  </div>
```

La clase indicada se aplicará al elemento cuando la expresión buleana sea verdadera.

Ejemplo:

```
<div [ngClass]="{'generalContent': router.url !='/login'}">
    <router-outlet></router-outlet>
</div>
```

### Guards

Los guards son scripts que implementan una estrategia de seguridad para accesos no autorizados a las deferentes rutas de nuestra aplicación. Se crean de manera similar a los servicios y componentes, con el siguiente comando de AngularCLI:

```ng generate guard <directorio>/<nombre-del-guard>```

Resultando en la creación de los archivos: <nombre-del-guard>.specs.guard.ts y <nombre-del-guard>.guard.ts

El guard se basa en un atributo llamado canActivate que, dependiendo de una condición o expresión buleana, retornará verdadero o falso al constructor del componente en el que se haya inyectado para indicarle cuando deberá mostrar o no el contenido de dicho componente.

### Tiempo real - conversaciones

Generalmente, en sistemas tradicionales, un cliente envía la información al servidor, donde va a quedar almacenada hasta que otro cliente haga una petición y descargue los datos actualizados a su entorno local. Esto debe hacerlo el cliente dos en intervalos frecuentes que pueden ir desde algunos minutos hasta un segundo o menos, lo que pudiera significar una sobre carga del servidor. Esto va a depender de la cantidad de clientes que realicen peticiones en simultáneo.

Firebase por su parte, usa una estrategia de sockets para manejar las actualizaciones que suceden en su servicio de base de datos en tiempo real. Esto significa que una vez realizada la primera conexión entre la app y el servidor, queda abierto un canal de comunicación permanente entre el servidor y el cliente, y al haber alguna actualización en la base de datos, ésta es notificada al navegador en cuestión de milisegundos, sin necesidad de que éste haya hecho una petición explícitamente, ni sometiendo al servidor a atender peticiones recurrentes en intervalos específicos.

En nuestra app sólo deberemos tener un método que esté subscrito a los cambios notificados por el servicio de base de datos de firebase a través de un Observable, para actualizar la información de nuestro componente.

## Componentes anidados

Los componentes en Angular, pueden contener internamente a otros componentes. A éstos se les denomina componentes anidados.

Para poder utilizar información proveniente de un componente externo en uno anidado, es necesario incluir en este último el decorador @Input. Al incluir el nuevo componente en el html del componente padre, deberá pasarse, a través de un atributo colocado entre corchetes “”[ ]"", el valor indicado en el decorador @Input.

En el componente padre:

```
<div *ngIf="user && user.friends">
  <div class="disblo marbo5">      
    <app-contact class="col-md-12" *ngFor="let user of user.friends" [uid]="user"></app-contact>
  </div>
</div>
```

El componente hijo en su .ts:

```
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'firebase';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  //para recibir datos de un componente padre
@Input() uid: string;
contact: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log(this.uid);
    this.userService.getUserById(this.uid).valueChanges().subscribe( (data: User)=> {
      this.contact = data;
    });
  }

}
```

En su .html:

```
<div *ngIf="contact" routerLink="/conversation/{{contact.uid}}">
  <img src="./assets/img/logo_live_{{contact.status}}.png"  class="icon" alt="{{contact.status}}" />
  <b>{{ contact.nick }}</b> - {{ contact.subnick || 'No subnick' }}
  <small>{{ contact.email }}</small> 
</div>
```