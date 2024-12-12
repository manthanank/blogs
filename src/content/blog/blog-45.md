---
author: Manthan Ankolekar
pubDatetime: 2024-12-09T08:44:00Z
modDatetime: 
title: Building a Modern Music Player App with Angular and Tailwind CSS
postSlug: building-a-modern-music-player-app-with-angular-and-tailwind-css
featured: false
draft: false
tags:
  - Angular
  - Tailwind CSS
ogImage: ""
description: "Learn how to build a modern music player app using Angular and Tailwind CSS. This tutorial will guide you through creating a sleek and interactive music player with features like track navigation, a custom progress slider, and a curated playlist."
---

## Introduction

In the age of digital music, a sleek and functional music player is essential. This tutorial walks you through creating a music player app using Angular and Tailwind CSS. With features like track navigation, a custom progress slider, and a curated playlist, this app is both visually appealing and highly interactive.

---

**Key Features of Harmonic Beats**  

- **Track Navigation:** Skip forward or backward between tracks.  
- **Custom Progress Slider:** Built with CSS for precise playback control.  
- **Playlist Management:** Display and select tracks from a scrollable list.  
- **Error Handling:** Alerts for playback issues.  

---

## Step-by-Step Guide to Building the App

### 1. **Setting Up the Angular Project**

Start by setting up an Angular project. If you don't already have Angular CLI installed, do so with:

```bash
npm install -g @angular/cli
```

Then create a new project:

```bash
ng new music-player
cd music-player
```

Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Configure `tailwind.config.js` to include Angular components:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add Tailwind directives in `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 2. **Designing the UI with Tailwind CSS**

Use Tailwind CSS to create a modern, responsive UI. Below is the HTML structure for the component:

```html
<div class="w-full h-screen flex flex-col items-center justify-center p-6 bg-gray-800 text-white">
  <h1 class="text-3xl font-bold mb-8">Music Player</h1>
  @if (error()) {
  <div class="bg-red-500 p-4 mb-4 rounded w-full max-w-md">
    <div class="flex items-center">
      <span class="material-icons mr-2">error_outline</span>
      <div>
        <h4 class="font-bold">Error</h4>
        <p>{{ error() }}</p>
      </div>
    </div>
  </div>
  }

  <!-- Current Track -->
  <div class="text-center mb-4 w-full max-w-md">
    <h2 class="text-2xl font-bold">{{ tracks[currentTrackIndex()].title }}</h2>
    <p class="text-gray-400">{{ tracks[currentTrackIndex()].artist }}</p>
  </div>

  <!-- Custom Slider -->
  <div class="relative mb-4 w-full max-w-md">
    <input type="range" min="0" max="100" [value]="progress()" (input)="handleSeek($event)"
      class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb" />
  </div>

  <!-- Player Controls -->
  <div class="flex justify-center space-x-4 mb-6 w-full max-w-md">
    <button (click)="handlePrevious()" class="btn">
      <i class="fas fa-step-backward"></i>
    </button>
    <button (click)="handlePlayPause()" class="btn">
      @if (isPlaying()) {
      <i class="fas fa-pause"></i>
      }
      @else {
      <i class="fas fa-play"></i>
      }
    </button>
    <button (click)="handleNext()" class="btn">
      <i class="fas fa-step-forward"></i>
    </button>
  </div>

  <!-- Track List -->
  <h3 class="text-xl font-semibold mb-2">Track List</h3>
  <div class="h-[200px] w-full max-w-md rounded-md border border-gray-700 p-4 overflow-y-auto custom-scrollbar"
    #trackListContainer>
    @for (track of tracks; track $index) {
    <div class="p-2 cursor-pointer hover:bg-gray-700 rounded-md"
      [ngClass]="{ 'bg-gray-700': $index === currentTrackIndex() }" (click)="handleTrackSelect($index)">
      <p class="font-medium">{{ track.title }}</p>
      <p class="text-sm text-gray-400">{{ track.artist }}</p>
    </div>
    }
    @empty {
    <p class="text-gray-400">No tracks found</p>
    }
  </div>
</div>
```

---

### 3. **Adding Interactivity**

Define the logic in `music-player.component.ts`:

- **Handle Playback:** Play, pause, and navigate tracks.
- **Update Progress:** Monitor and display playback progress.
- **Error Handling:** Provide user feedback for audio issues.

```typescript
import { NgClass } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  computed,
  ViewChild,
  ElementRef,
} from '@angular/core';

interface Track {
  title: string;
  artist: string;
  url: string;
}

@Component({
  selector: 'app-root',
  imports: [NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('trackListContainer') trackListContainer!: ElementRef;
  tracks: Track[] = [
    {
      title: 'Serenity',
      artist: 'Piano and Strings',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      title: 'Energetic Beats',
      artist: 'Drum and Bass Collective',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      title: 'Smooth Jazz',
      artist: 'Sax and Keys',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      title: 'Classical Symphony',
      artist: 'Orchestra Ensemble',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
      title: 'Electronic Dreams',
      artist: 'Synthwave Collective',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
      title: 'Ambient Relaxation',
      artist: 'Chillout Lounge',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    {
      title: 'Country Folk',
      artist: 'Acoustic Guitar Trio',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    },
    {
      title: 'Rocking Blues',
      artist: 'Electric Guitar Band',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
    {
      title: 'Hip Hop Beats',
      artist: 'Rap Collective',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    },
    {
      title: 'Reggae Vibes',
      artist: 'Island Rhythms',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    }
  ];

  currentTrackIndex = signal(0);
  isPlaying = signal(false);
  progress = signal(0);
  error = signal<string | null>(null);
  private audio: HTMLAudioElement | null = null;

  ngOnInit() {
    this.loadTrack();
  }

  loadTrack() {
    this.audio?.pause();
    this.audio = new Audio(this.tracks[this.currentTrackIndex()].url);

    this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
    this.audio.addEventListener('ended', this.handleNext.bind(this));
    this.audio.addEventListener('canplay', () => this.error.set(null));
    this.audio.addEventListener('error', () => {
      this.error.set('Unable to load audio. Please check the audio source.');
      this.isPlaying.set(false);
    });
  }

  handlePlayPause() {
    if (this.audio) {
      if (this.isPlaying()) {
        this.audio.pause();
      } else {
        this.audio.play().catch(() => {
          this.error.set('Playback failed. Please try again.');
        });
      }
      this.isPlaying.set(!this.isPlaying());
    }
  }

  scrollToCurrentTrack() {
    const container = this.trackListContainer.nativeElement;
    const selectedTrack = container.children[this.currentTrackIndex()];
    if (selectedTrack) {
      selectedTrack.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  handleNext() {
    this.currentTrackIndex.set(
      (this.currentTrackIndex() + 1) % this.tracks.length
    );
    this.loadTrack();
    this.isPlaying.set(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handlePrevious() {
    this.currentTrackIndex.set(
      (this.currentTrackIndex() - 1 + this.tracks.length) % this.tracks.length
    );
    this.loadTrack();
    this.isPlaying.set(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handleTrackSelect(index: number) {
    this.currentTrackIndex.set(index);
    this.loadTrack();
    this.isPlaying.set(true);
    this.audio?.play();
    this.scrollToCurrentTrack();
  }

  handleSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    this.progress.set(value);

    if (this.audio) {
      const newTime = (value / 100) * this.audio.duration;
      this.audio.currentTime = newTime;
    }
  }

  updateProgress() {
    if (this.audio) {
      const duration = this.audio.duration || 1;
      const currentTime = this.audio.currentTime;
      this.progress.set((currentTime / duration) * 100);
    }
  }
}
```

### 5. **Deploy and Test**

Use Angular CLI to serve the app locally:

```bash
ng serve
```

Visit `http://localhost:4200` to see **Harmonic Beats** in action!

---

**Conclusion**  

In this tutorial, you learned how to build a modern music player app using Angular and Tailwind CSS. By combining Angular's component-based architecture with Tailwind's utility-first CSS framework, you created a visually appealing and interactive music player. Feel free to customize the app further by adding features like volume control, shuffle mode, or a dark mode theme.

Happy coding! 🚀

---

### Exploring the Code

Visit the [GitHub repository](https://github.com/manthanank/music-player) to explore the code in detail.

---
