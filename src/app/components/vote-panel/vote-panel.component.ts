import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../services/session.service';
import {UserService} from '../../services/user.service';
import {CommonModule} from '@angular/common';
import {Vote} from '../../models/vote.model';
import {FireworksAnimationComponent} from '../fireworks-animation/fireworks-animation.component';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-vote-panel',
  standalone: true,
  imports: [CommonModule, FireworksAnimationComponent, MatCard, MatCardTitle, MatCardContent,
            MatButtonToggleGroup, MatButtonToggle, MatList, MatListItem, MatButtonToggle,
            FormsModule],
  templateUrl: './vote-panel.component.html',
  styleUrls: ['./vote-panel.component.scss']
})
export class VotePanelComponent
{
  sessionName = '';

  hasVoted = false;

  options = ['1', '3', '5', '8', '?'];

  votes: Vote[] = [];

  average: number | null = null;

  allSame = false;

  public selectedVote: string = '';

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService
  )
  {
    this.sessionName = this.route.snapshot.paramMap.get('sessionName') || '';
  }

  vote(value: string): void
  {
    const userId = this.userService.getUsername(); // this should ideally be a UUID from backend
    this.sessionService.submitVote(this.sessionName, userId!, value).subscribe({
      next: () =>
      {
        this.hasVoted = true;
        this.loadVotes();
      },
      error: () => alert('Error submitting vote')
    });
  }

  loadVotes(): void
  {
    this.sessionService.getVotes(this.sessionName).subscribe({
      next: (votes) =>
      {
        this.votes = votes;
        const numericVotes = votes
          .map(v => parseInt(v.voteValue))
          .filter(v => !isNaN(v));
        if (numericVotes.length > 0)
        {
          const total = numericVotes.reduce((a, b) => a + b, 0);
          this.average = total / numericVotes.length;
        }

        this.allSame = votes.every(v => v.voteValue === votes[0].voteValue);
      }
    });
  }
}
