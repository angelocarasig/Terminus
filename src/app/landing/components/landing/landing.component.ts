import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  subheadingTexts: string[] = [
    'A VNDB Uplift.',
    'Umineko no Naku Koro Ni.',
    'Ao no Kanata no Four Rhythm.',
    'The House in Fata Morgana.',
    'STEINS;GATE 0.'
  ];

  currentTextIndex: number = 0;
  currentText: string = this.subheadingTexts[0];

  ngOnInit() {
    setInterval(() => {
      this.currentTextIndex = (this.currentTextIndex + 1) % this.subheadingTexts.length;
      this.currentText = this.subheadingTexts[this.currentTextIndex];
    }, 4000);
  }
}