import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [VjsPlayerComponent, CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent {
  playerWidth: string = '100%';

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef;
  @ViewChild('container', { static: true }) container!: ElementRef;

  ngOnInit() {
    this.adjustPlayerSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustPlayerSize();
  }

  adjustPlayerSize() {
    const containerWidth = this.container.nativeElement.offsetWidth;
    const containerHeight = this.container.nativeElement.offsetHeight -160;
    const aspectRatio = 16 / 9;

    if (containerWidth / containerHeight > aspectRatio) {
      const newWidth =
        (aspectRatio / (containerWidth / containerHeight)) * 100 - 0.1;
      this.playerWidth = `${newWidth}%`;
    } else {
      this.playerWidth = '100%';
    }
  }
}
