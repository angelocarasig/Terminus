import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubCommit } from '../../models/github-commit/github-commit';
import { REPOSITORY } from '../../../../constants';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getCommits(): Observable<Array<GitHubCommit>> {
    return this.http.get<Array<GitHubCommit>>(REPOSITORY.COMMITS);
  }
}
