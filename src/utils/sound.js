// Web Audio API Synth Sound System
// Programmatic, asset-free, premium UI sound effects.
// Loads instantly, zero latency, highly customizable.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = true; // Default to muted to comply with browser autoplay policies
    this.ambientOsc = null;
    this.ambientGain = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setMuted(state) {
    this.muted = state;
    if (this.muted) {
      this.stopAmbient();
    } else {
      this.init();
      this.playAmbient();
    }
  }

  playHover() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      // Gentle swoosh sweep frequency
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {
      console.warn("Audio Context blocked or failed:", e);
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(220, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {
      console.warn("Audio Context blocked or failed:", e);
    }
  }

  playAmbient() {
    if (this.muted) return;
    this.init();
    try {
      if (this.ambientOsc) return; // Already playing

      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();
      
      this.ambientOsc.type = "sine";
      // Extremely low, warm, pulsing ambient rumble
      this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // low A note
      
      // Warm pulsing volume modulation
      this.ambientGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      
      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
      
      this.ambientOsc.start();
      
      // Gentle pulsing effect
      let up = false;
      this.pulseInterval = setInterval(() => {
        if (this.muted || !this.ambientGain || !this.ctx) return;
        const targetGain = up ? 0.03 : 0.015;
        this.ambientGain.gain.exponentialRampToValueAtTime(targetGain, this.ctx.currentTime + 1.8);
        up = !up;
      }, 2000);
      
    } catch (e) {
      console.warn("Ambient fail:", e);
    }
  }

  stopAmbient() {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
    try {
      if (this.ambientOsc) {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
        this.ambientOsc = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch (e) {
      console.warn(e);
    }
  }
}

export const sounds = new SoundManager();
export const handleHoverSound = () => sounds.playHover();
export const handleClickSound = () => sounds.playClick();
export const setMuted = (muted) => sounds.setMuted(muted);
