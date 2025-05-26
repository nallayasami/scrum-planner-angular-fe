import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../shared/material.module';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterModule] // ensure these are added
})
export class LayoutComponent {}
