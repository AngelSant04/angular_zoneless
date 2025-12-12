import { afterEveryRender, afterNextRender, Component, effect, signal } from '@angular/core';
import { Title } from '../../components/title/title';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(',')}`, 'color: #bada55');
};

@Component({
  selector: 'app-home-page',
  imports: [Title],
  templateUrl: './home-page.html',
})
export class HomePage {
  traditionalProperty = 'Angel';
  signalProperty = signal<string>('Angel');

  constructor() {
    log('Constructor llamado');
  }

  changeTraditional() {
    this.traditionalProperty = 'Angel Santamaria';
  }

  changeSignal() {
    this.signalProperty.set('Angel Santamaria');
  }

  basicEffect = effect((onCleanUp) => {
    log('effect ', 'disparar efectos secundarios');

    onCleanUp(() => {
      log('onCleanUp', 'Se ejecuta cuando el efecto se va a destruir');
    });
  });

  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }

  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }

  ngDoCheck() {
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }

  ngAfterContentInit() {
    log('Runs', "once after the component's content has been initialized.");
  }

  ngAfterContentChecked() {
    log(
      'ngAfterContentInit',
      'Runs every time this component content has been checked for changes.'
    );
  }

  ngAfterViewInit() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }

  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  ngOnDestroy() {
    log('ngOnDestroy', 'Runs once before the component is destroyed.');
  }

  afterNextRenderEffect = afterNextRender(() => {
    console.log(
      'afterNextRender',
      'Runs once the next time that all components have been rendered to the DOM.'
    );
  });

  afterEveryRender = afterEveryRender(() => {
    console.log(
      'afterEveryRender',
      '	Runs every time all components have been rendered to the DOM.'
    );
  });
}
