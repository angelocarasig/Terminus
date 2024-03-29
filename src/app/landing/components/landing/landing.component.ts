import { Component, OnInit } from '@angular/core';

import { Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

import { getParticleOptions } from '../../helpers/particles.helper';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  subheadingTexts: string[] = [
    'A VNDB Uplift.',
    'A VNDB Helper.',
    'Umineko no Naku Koro Ni.',
    'Ao no Kanata no Four Rhythm.',
    'The House in Fata Morgana.',
    'STEINS;GATE 0.'
  ];

  particles: {
    id: string;
    particleOptions: any;
  };

  currentTextIndex: number = 0;
  currentText: string = this.subheadingTexts[0];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.particles = {
      id: 'tsparticles',
      particleOptions: getParticleOptions()
    };

    setInterval(() => {
      this.currentTextIndex = (this.currentTextIndex + 1) % this.subheadingTexts.length;
      this.currentText = this.subheadingTexts[this.currentTextIndex];
    }, 4000);
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadSlim(engine);
  }

  errorMessageHandler(msg: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
