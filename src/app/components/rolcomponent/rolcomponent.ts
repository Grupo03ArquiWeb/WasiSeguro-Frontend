import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RolList } from './rol-list/rol-list';
import { Menucomponent } from "../menucomponent/menucomponent";

@Component({
  selector: 'app-rolcomponent',
  imports: [RolList, Menucomponent, RouterOutlet, Menucomponent],
  templateUrl: './rolcomponent.html',
  styleUrl: './rolcomponent.css',
})
export class Rolcomponent {
  constructor(public route:ActivatedRoute) {}
}

