import {Component, OnInit} from '@angular/core';
import {Session} from '../../models/session.model';
import {SessionService} from '../../services/session.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatIcon, MatCardTitle,
            MatCardSubtitle, MatButton],
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit
{
  sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void
  {
    this.loadSessions();
  }

  loadSessions(): void
  {
    this.sessionService.getSessions().subscribe({
      next: (data) => this.sessions = data,
      error: (err) => console.error('Error loading sessions:', err)
    });
  }
}
