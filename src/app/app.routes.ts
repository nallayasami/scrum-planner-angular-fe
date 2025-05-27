import { Routes } from '@angular/router';
import { SessionListComponent } from './components/session-list/session-list.component';
import { JoinSessionComponent } from './components/join-session/join-session.component';
import { CreateSessionComponent } from './components/create-session/create-session.component';
import {VotePanelComponent} from './components/vote-panel/vote-panel.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'sessions', component: SessionListComponent },
      { path: 'join-session', component: JoinSessionComponent },
      { path: 'create-session', component: CreateSessionComponent },
      { path: 'vote/:sessionName', component: VotePanelComponent },
      { path: '**', redirectTo: 'sessions' } // Keep this last!
    ]
  }
];
