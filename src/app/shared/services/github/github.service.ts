import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GitHubCommit } from '../../models/github-commit/github-commit';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private REPOSITORY_URL = 'https://api.github.com/repos/angelocarasig/Terminus/commits';

  constructor(private http: HttpClient) {}

  getCommits(): Observable<Array<GitHubCommit>> {
    return this.http.get<Array<GitHubCommit>>(this.REPOSITORY_URL);
  }
}
