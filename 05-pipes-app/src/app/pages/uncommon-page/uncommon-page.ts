import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { interval, map, tap } from 'rxjs';
import { Card } from '../../components/card/card';

const client1 = {
  name: 'Angel',
  gender: 'male',
  age: 24,
  address: 'Chiclayo, Perú',
};

const client2 = {
  name: 'Rosa',
  gender: 'female',
  age: 62,
  address: 'Chiclayo, Perú',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    AsyncPipe,
    I18nPluralPipe,
    I18nSelectPipe,
    JsonPipe,
    KeyValuePipe,
    SlicePipe,
    TitleCasePipe,
    UpperCasePipe,
    Card
  ],
  templateUrl: './uncommon-page.html',
  styles: ``,
})
export default class UncommonPage {
  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  // i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal([
    'Mireya',
    'Angel',
    'Fabian',
    'Enrique',
    'Rosa',
    'Valeria',
    'Vanessa',
    'Jeanpier',
  ]);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  // KeyValue Pipe
  profile = {
    name: 'Angel',
    age: 24,
    address: 'Chiclayo, Perú',
  };

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Tenemos un error en la data');
      resolve('Tenemos data en la promesa.');
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap:', value))
  );
}
