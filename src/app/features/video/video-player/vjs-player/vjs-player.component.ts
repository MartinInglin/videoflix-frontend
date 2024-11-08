import {
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import { VideoService } from '../../../../services/video.service';

@Component({
  selector: 'app-vjs-player',
  standalone: true,
  template: `
    <video #target class="video-js" muted playsinline preload="none"></video>
  `,
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  videoService = inject(VideoService);
  @ViewChild('target', { static: true }) target!: ElementRef;

  @Input() options!: {
    autoplay: boolean;
    sources: { src: string; type: string; label: string }[];
    controls: boolean;
    fluid: boolean;
    muted: boolean;
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
    this.player = videojs(this.target.nativeElement, playerOptions, () => {});
    this.getCurrentTimestamp();
  }

  ngOnDestroy() {
    if (this.player) {
      const currentTime = this.player.currentTime();

      if (currentTime) {
        const timeAsInteger = Math.floor(currentTime);
        this.videoService.storeWatchHistory(timeAsInteger);
      }

      this.player.dispose();
    }
  }

  changeTimestamp(seconds: number) {
    const currentTime = this.player.currentTime();
    if (currentTime) {
      this.player.currentTime(currentTime + seconds);
    }
  }

  setCurrentTimestamp() {
    const timestamp = this.player.currentTime();
    if (timestamp) {
      this.videoService.storeVideoTimestampSessionStorage(timestamp);
    }
  }

  getCurrentTimestamp() {
    const timestamp = this.videoService.getVideoTimestampFromSessionStorage();
    if (timestamp) {
      this.player.currentTime(timestamp);
    }
  }

  reloadVideo(newResolutionUrl:string) {
    this.player.src({ src: newResolutionUrl, type: 'application/x-mpegURL' });
    const currentTime = this.player.currentTime();
    this.player.load()
    this.player.currentTime(currentTime);
    this.playVideo()
  }

  playVideo() {
    this.player.play()
  }
}
