import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  template: `
    <video
      #target
      class="video-js"
      muted
      playsinline
      preload="none"
    ></video>
  `,
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  @Input() options!: {
    autoplay: boolean;
    sources: { src: string; type: string; label: string }[];
    controls: boolean;
    fluid: boolean;
  };

  player!: ReturnType<typeof videojs>;

  ngOnInit() {
    const playerOptions = {
      ...this.options,
      controlBar: {
        children: {
          playToggle: true,
          volumePanel: true,
          progressControl: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true,
        },
      },
    };

    this.player = videojs(this.target.nativeElement, playerOptions, () => {
      console.log('Player initialized with custom controls');
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
