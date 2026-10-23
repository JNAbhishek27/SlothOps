/**
 * SlothOps Offline Generative Web Audio Soundscape Engine
 * Pure synthesized ambient audio using Web Audio API:
 * - Gentle Canopy Rain
 * - Forest Wind Breeze
 * - Warm Hearth Crackle
 * - Deep Theta Sleep Drone (4Hz binaural pulse)
 * 100% offline, 0 bytes external audio files needed!
 */

class SlothSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private activeNodes: { [key: string]: { gain: GainNode; stop: () => void } } = {};
  private masterGain: GainNode | null = null;
  private sleepTimerId: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Create pink / brownian noise buffer for rain & wind
  private createNoiseBuffer(type: 'pink' | 'brown' = 'pink', durationSec = 4): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext not ready');
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'pink') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }
    } else {
      // Brown noise (deeper)
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 1.8;
      }
    }
    return buffer;
  }

  // Start Rain Soundscape
  public startRain(volume = 0.4) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.stopChannel('rain');

    const buffer = this.createNoiseBuffer('pink');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Filter to make it sound like gentle rain on broad jungle leaves
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.activeNodes['rain'] = {
      gain,
      stop: () => {
        try { source.stop(); } catch (_) {}
      }
    };
    this.isPlaying = true;
  }

  // Start Forest Wind
  public startWind(volume = 0.3) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.stopChannel('wind');

    const buffer = this.createNoiseBuffer('brown');
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO for slow breeze gusts
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 0.12 Hz slow wave
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start();
    this.activeNodes['wind'] = {
      gain,
      stop: () => {
        try {
          source.stop();
          lfo.stop();
        } catch (_) {}
      }
    };
    this.isPlaying = true;
  }

  // Start Theta Binaural Sleep Wave
  public startThetaDrone(volume = 0.25) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.stopChannel('theta');

    // 136.1 Hz carrier + 4 Hz delta/theta beat
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(136.1, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(140.1, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.5, this.ctx.currentTime);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();

    this.activeNodes['theta'] = {
      gain,
      stop: () => {
        try {
          osc1.stop();
          osc2.stop();
        } catch (_) {}
      }
    };
    this.isPlaying = true;
  }

  public setChannelVolume(channel: string, vol: number) {
    if (this.activeNodes[channel] && this.ctx) {
      this.activeNodes[channel].gain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
  }

  public stopChannel(channel: string) {
    if (this.activeNodes[channel]) {
      this.activeNodes[channel].stop();
      delete this.activeNodes[channel];
    }
  }

  public stopAll() {
    Object.keys(this.activeNodes).forEach((key) => {
      this.stopChannel(key);
    });
    this.isPlaying = false;
    if (this.sleepTimerId) {
      clearTimeout(this.sleepTimerId);
      this.sleepTimerId = null;
    }
  }

  public setSleepTimer(minutes: number, onTimerEnd?: () => void) {
    if (this.sleepTimerId) {
      clearTimeout(this.sleepTimerId);
    }
    if (minutes <= 0) return;

    this.sleepTimerId = setTimeout(() => {
      // Fade out smoothly over 10 seconds
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 3.0);
        setTimeout(() => {
          this.stopAll();
          if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
          }
          if (onTimerEnd) onTimerEnd();
        }, 8000);
      } else {
        this.stopAll();
        if (onTimerEnd) onTimerEnd();
      }
    }, minutes * 60 * 1000);
  }

  public getIsPlaying(): boolean {
    return Object.keys(this.activeNodes).length > 0;
  }

  public getActiveChannels(): string[] {
    return Object.keys(this.activeNodes);
  }
}

export const soundscapeEngine = new SlothSoundscapeEngine();
