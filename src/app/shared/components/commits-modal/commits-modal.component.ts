import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { Observable } from 'rxjs';
import { GitHubCommit } from '../../models/github-commit/github-commit';
import { formattedDate } from '../../helpers/utilities.helper';

@Component({
  selector: 'app-commits-modal',
  templateUrl: './commits-modal.component.html',
  styleUrls: ['./commits-modal.component.scss']
})
export class CommitsModalComponent implements OnInit {
  @Output() outsideClicked = new EventEmitter<void>();

  loading = true;
  commits$: Observable<Array<GitHubCommit>>;

  constructor(public githubService: GithubService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.commits$ = this.githubService.getCommits();
    this.loading = false;
  }

  handleClickOutside(): void {
    this.outsideClicked.emit();
  }

  openUrl(url: string): void {
    const link = this.renderer.createElement('a');
    this.renderer.setAttribute(link, 'href', url);
    this.renderer.setAttribute(link, 'target', '_blank');
    link.click();
  }

  protected readonly formattedDate = formattedDate;
}