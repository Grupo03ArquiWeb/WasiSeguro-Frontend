import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-suscripcioncomponent',
  standalone: true,
  imports: [Menucomponent, RouterOutlet],
  templateUrl: './suscripcioncomponent.html',
  styleUrl: './suscripcioncomponent.css',
})
export class Suscripcioncomponent {
  constructor(public route: ActivatedRoute) {}
}