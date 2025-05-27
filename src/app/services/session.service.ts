import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session} from '../models/session.model';
import { Vote } from '../models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = '/api/sessions';

  constructor(private http: HttpClient) {}

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.baseUrl);
  }

  createSession(name: string, passphrase: string): Observable<Session> {
    return this.http.post<Session>(this.baseUrl, { name, passphrase });
  }

  joinSession(passphrase: string, username: string): Observable<Session> {
    return this.http.post<Session>(`${this.baseUrl}/join`, { passphrase, username });
  }

  submitVote(sessionId: string, userId: string, voteValue: string): Observable<Vote> {
    return this.http.post<Vote>(`${this.baseUrl}/${sessionId}/vote`, { userId, voteValue });
  }

  getVotes(sessionId: string): Observable<Vote[]> {
    return this.http.get<Vote[]>(`${this.baseUrl}/${sessionId}/votes`);
  }
}
