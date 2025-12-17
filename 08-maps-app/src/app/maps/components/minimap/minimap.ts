import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.html',
  styles: ``,
})
export class Minimap implements AfterViewInit {
  lngLat = input.required<{ lng: number; lat: number }>();
  zoom = input<number>(14)

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

  ngAfterViewInit(): void {
    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 30
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);

    this.map.set(map);
  }
}
