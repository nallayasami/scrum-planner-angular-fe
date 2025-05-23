import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PassphraseService {
  constructor(private http: HttpClient) {}

  getRandomPassphrase(): Observable<string> {
    return this.http.get<string[]>('passphrases.json').pipe(
      map(list => list[Math.floor(Math.random() * list.length)])
    );
  }
}
