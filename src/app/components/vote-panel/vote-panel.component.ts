import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../services/session.service';
import {UserService} from '../../services/user.service';
import {CommonModule} from '@angular/common';
import {Vote} from '../../models/vote.model';

@Component({
  selector: 'app-vote-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vote-panel.component.html'
})
export class VotePanelComponent
{
  passphrase = '';

  hasVoted = false;

  options = ['1', '3', '5', '8', '?'];

  votes: Vote[] = [];

  average: number | null = null;

  allSame = false;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService
  )
  {
    this.passphrase = this.route.snapshot.paramMap.get('passphrase') || '';
  }

  vote(value: string): void
  {
    const userId = this.userService.getUsername(); // this should ideally be a UUID from backend
    this.sessionService.submitVote(this.passphrase, userId!, value).subscribe({
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
    this.sessionService.getVotes(this.passphrase).subscribe({
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
