import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/Rol';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-rol-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './rol-list.html',
  styleUrl: './rol-list.css',
})
export class RolList implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  constructor(private rS: Rolservice) {}

  ngOnInit(): void {
    this.cargarRoles();
  }
  cargarRoles() {
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
  eliminarRol(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
