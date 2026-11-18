// Self-contained Web Audio API synthesizer for game SFX and optional background music

class SoundManager {
  private ctx: AudioContext | null = null;
  private sfxEnabled = true;
  private musicEnabled = false;
  private musicInterval: number | null = null;
  private musicGain: GainNode | null = null;
  private stepIndex = 0;

  // Gentle pentatonic twilight melody notes (Hz)
  private readonly melody = [
    261.63, // C4
    329.63, // E4
    392.0,  // G4
    493.88, // B4
    392.0,  // G4
    329.63, // E4
    293.66, // D4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    440.0,  // A4
    349.23, // F4
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setSfxEnabled(enabled: boolean): void {
    this.sfxEnabled = enabled;
  }

  public isSfxEnabled(): boolean {
    return this.sfxEnabled;
  }

  public setMusicEnabled(enabled: boolean): void {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public playFlip(): void {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(560, now + 0.06);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.11, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playMatch(streak = 1): void {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const pitchBoost = Math.min(streak - 1, 4) * 28;
    const notes = [523.25 + pitchBoost, 659.25 + pitchBoost, 783.99 + pitchBoost];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.065;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.26);
    });
  }

  public playMismatch(): void {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [280, 220];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.08, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.16);
    });
  }

  public playVictory(): void {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const fanfare = [523.25, 659.25, 783.99, 1046.5];

    fanfare.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.1;
      const duration = idx === fanfare.length - 1 ? 0.55 : 0.22;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.14, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    });
  }

  private playMusicStep(): void {
    if (!this.musicEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    if (!this.musicGain) {
      this.musicGain = ctx.createGain();
      this.musicGain.gain.value = 0.035;
      this.musicGain.connect(ctx.destination);
    }

    const now = ctx.currentTime;
    const freq = this.melody[this.stepIndex % this.melody.length];
    this.stepIndex += 1;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(1, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + 0.68);
  }

  public startMusic(): void {
    if (typeof window === 'undefined') return;
    if (this.musicInterval !== null) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.playMusicStep();
    this.musicInterval = window.setInterval(() => {
      this.playMusicStep();
    }, 620);
  }

  public stopMusic(): void {
    if (typeof window === 'undefined') return;
    if (this.musicInterval !== null) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundManager = new SoundManager();
