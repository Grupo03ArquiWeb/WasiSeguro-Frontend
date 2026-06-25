import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-plansuscripcioncomponent',
  standalone: true,
  imports: [Menucomponent, RouterOutlet],
  templateUrl: './plansuscripcioncomponent.html',
  styleUrl: './plansuscripcioncomponent.css',
})
export class Plansuscripcioncomponent {
  constructor(public route: ActivatedRoute) {}
}