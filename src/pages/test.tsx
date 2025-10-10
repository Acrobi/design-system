import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { SensoryProvider } from '../components/ui/sensory-provider';
import { Spinner } from '../components/ui/spinner';
import { Icon } from '../components/ui/icons';

// Web Audio API sound function for sensory feedback
const playSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (error) {
    // Fallback: console log if audio is not supported
    console.log('🔊 Audio feedback:', { frequency, duration, type });
  }
};

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <SensoryProvider>
      <div className="min-h-screen bg-background text-foreground p-8">
          <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Complete Button Test Suite</h1>
            <p className="text-muted-foreground text-lg">
              All button variants, sizes, and states from shadcn/ui documentation
            </p>
          </div>

          {/* Button Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Test different button styles and theme switching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="default" onClick={() => playSound(440, 0.1)}>Default</Button>
                <Button variant="destructive" onClick={() => playSound(330, 0.1)}>Destructive</Button>
                <Button variant="outline" onClick={() => playSound(550, 0.1)}>Outline</Button>
                <Button variant="secondary" onClick={() => playSound(660, 0.1)}>Secondary</Button>
                <Button variant="ghost" onClick={() => playSound(770, 0.1)}>Ghost</Button>
                <Button variant="link" onClick={() => playSound(880, 0.1)}>Link</Button>
              </div>
            </CardContent>
          </Card>

          {/* Button Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
              <CardDescription>Different button sizes with click feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Button size="sm" onClick={() => playSound(440, 0.1)}>Small</Button>
                <Button size="default" onClick={() => playSound(550, 0.1)}>Default</Button>
                <Button size="lg" onClick={() => playSound(660, 0.1)}>Large</Button>
              </div>
            </CardContent>
          </Card>

          {/* Icon Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Buttons</CardTitle>
              <CardDescription>Buttons with icons using the Icon Metaphor System</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon Only</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="icon" onClick={() => playSound(440, 0.1)}>
                    <Icon metaphor="add" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => playSound(550, 0.1)}>
                    <Icon metaphor="download" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => playSound(330, 0.1)}>
                    <Icon metaphor="delete" />
                  </Button>
                  <Button size="icon" variant="secondary" onClick={() => playSound(660, 0.1)}>
                    <Icon metaphor="chevron-right" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon with Text</h3>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => playSound(440, 0.1)}>
                    <Icon metaphor="add" className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                  <Button variant="outline" onClick={() => playSound(550, 0.1)}>
                    <Icon metaphor="download" className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="destructive" onClick={() => playSound(330, 0.1)}>
                    <Icon metaphor="delete" className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button variant="secondary" onClick={() => playSound(660, 0.1)}>
                    <Icon metaphor="success" className="mr-2 h-4 w-4" />
                    Success
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Buttons with loading spinners and states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button disabled>
                  <Spinner className="mr-2 h-4 w-4" />
                  Loading...
                </Button>
                <Button variant="outline" disabled>
                  <Spinner className="mr-2 h-4 w-4" />
                  Please wait
                </Button>
                <Button variant="secondary" disabled>
                  <Spinner className="mr-2 h-4 w-4" />
                  Processing
                </Button>
                <Button
                  variant={isLoading ? "secondary" : "default"}
                  onClick={() => {
                    playSound(550, 0.1);
                    handleLoadingClick();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Icon metaphor="add" className="mr-2 h-4 w-4" />
                      Click to Load
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disabled States */}
          <Card>
            <CardHeader>
              <CardTitle>Disabled States</CardTitle>
              <CardDescription>Disabled buttons with different variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled Default</Button>
                <Button variant="destructive" disabled>Disabled Destructive</Button>
                <Button variant="outline" disabled>Disabled Outline</Button>
                <Button variant="secondary" disabled>Disabled Secondary</Button>
                <Button variant="ghost" disabled>Disabled Ghost</Button>
                <Button size="icon" disabled>
                  <Icon metaphor="add" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* As Child Pattern */}
          <Card>
            <CardHeader>
              <CardTitle>As Child Pattern</CardTitle>
              <CardDescription>Buttons rendered as other elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button asChild onClick={() => playSound(440, 0.1)}>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <Icon metaphor="success" className="mr-2 h-4 w-4" />
                    Link Button
                  </a>
                </Button>
                <Button asChild variant="outline" onClick={() => playSound(550, 0.1)}>
                  <label>
                    <Icon metaphor="upload" className="mr-2 h-4 w-4" />
                    Upload File
                    <input type="file" className="hidden" />
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sensory Feedback Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Sensory Feedback</CardTitle>
              <CardDescription>Enhanced feedback with audio, visual, and haptic responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Audio Feedback</h3>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => playSound(261.63, 0.2, 'sine')}>Low Tone</Button>
                  <Button onClick={() => playSound(523.25, 0.2, 'sine')}>Mid Tone</Button>
                  <Button onClick={() => playSound(1046.50, 0.2, 'sine')}>High Tone</Button>
                  <Button onClick={() => playSound(440, 0.1, 'square')}>Square Wave</Button>
                  <Button onClick={() => playSound(440, 0.1, 'sawtooth')}>Sawtooth</Button>
                  <Button onClick={() => playSound(440, 0.1, 'triangle')}>Triangle</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interactive Feedback</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => {
                      playSound(440, 0.1);
                      if (navigator.vibrate) {
                        navigator.vibrate(50);
                      }
                    }}
                  >
                    <Icon metaphor="star-filled" className="mr-2 h-4 w-4 relative z-10" />
                    Haptic + Sound
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      playSound(880, 0.15);
                      if (navigator.vibrate) {
                        navigator.vibrate([50, 30, 50]);
                      }
                    }}
                  >
                    <Icon metaphor="notification" className="mr-2 h-4 w-4 relative z-10" />
                    Double Pulse
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Feedback</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      playSound(220, 0.3, 'sawtooth');
                      if (navigator.vibrate) {
                        navigator.vibrate(100);
                      }
                    }}
                  >
                    <Icon metaphor="warning" className="mr-2 h-4 w-4" />
                    Error Alert
                  </Button>
                  <Button
                    onClick={() => {
                      playSound(659.25, 0.2);
                      if (navigator.vibrate) {
                        navigator.vibrate(50);
                      }
                    }}
                  >
                    <Icon metaphor="heart" className="mr-2 h-4 w-4" />
                    Success
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Size Variations with Icons */}
          <Card>
            <CardHeader>
              <CardTitle>Size Variations with Icons</CardTitle>
              <CardDescription>Different icon sizes with buttons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon Sizes</h3>
                <div className="flex items-center gap-4">
                  <Button size="sm" onClick={() => playSound(440, 0.1)}>
                    <Icon metaphor="add" className="mr-2 h-3 w-3" />
                    Small
                  </Button>
                  <Button size="default" onClick={() => playSound(550, 0.1)}>
                    <Icon metaphor="add" className="mr-2 h-4 w-4" />
                    Default
                  </Button>
                  <Button size="lg" onClick={() => playSound(660, 0.1)}>
                    <Icon metaphor="add" className="mr-2 h-5 w-5" />
                    Large
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon Only Sizes</h3>
                <div className="flex items-center gap-4">
                  <Button size="sm" onClick={() => playSound(440, 0.1)}>
                    <Icon metaphor="settings" size="sm" />
                  </Button>
                  <Button size="default" onClick={() => playSound(550, 0.1)}>
                    <Icon metaphor="settings" size="default" />
                  </Button>
                  <Button size="lg" onClick={() => playSound(660, 0.1)}>
                    <Icon metaphor="settings" size="lg" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Combinations */}
          <Card>
            <CardHeader>
              <CardTitle>Special Combinations</CardTitle>
              <CardDescription>Advanced button patterns and combinations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Icon Groups</h3>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => playSound(440, 0.1)}>
                    <Icon metaphor="user" className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="outline" onClick={() => playSound(550, 0.1)}>
                    <Icon metaphor="users" className="mr-2 h-4 w-4" />
                    Team
                  </Button>
                  <Button variant="secondary" onClick={() => playSound(660, 0.1)}>
                    <Icon metaphor="delete" className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                  <Button variant="ghost" onClick={() => playSound(770, 0.1)}>
                    <Icon metaphor="edit" className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => playSound(880, 0.1)}>
                    <Icon metaphor="close" className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">External Links</h3>
                <div className="flex flex-wrap gap-4">
                  <Button asChild onClick={() => playSound(440, 0.1)}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Documentation
                      <Icon metaphor="external-link" className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild onClick={() => playSound(550, 0.1)}>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Download PDF
                      <Icon metaphor="download" className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motion and Animation Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Motion & Animations</CardTitle>
              <CardDescription>Buttons with different animation and motion effects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hover Animations</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => playSound(440, 0.1)}
                  >
                    Scale Up
                  </Button>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    onClick={() => playSound(550, 0.1)}
                  >
                    Lift Up
                  </Button>
                  <Button
                    variant="secondary"
                    className="transition-all duration-300 hover:rotate-3 hover:scale-110"
                    onClick={() => playSound(660, 0.1)}
                  >
                    Wiggle
                  </Button>
                  <Button
                    variant="ghost"
                    className="transition-all duration-300 hover:bg-gradient-to-r hover:from-primary hover:to-primary-foreground hover:text-background"
                    onClick={() => playSound(770, 0.1)}
                  >
                    Gradient
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Active State Animations</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="transition-all duration-200 active:scale-95 active:shadow-inner"
                    onClick={() => playSound(440, 0.1)}
                  >
                    Click Press
                  </Button>
                  <Button
                    variant="outline"
                    className="transition-all duration-200 active:rotate-12 active:scale-90"
                    onClick={() => playSound(550, 0.1)}
                  >
                    Spin Click
                  </Button>
                  <Button
                    variant="secondary"
                    className="transition-all duration-300 active:bg-destructive active:text-destructive-foreground"
                    onClick={() => playSound(660, 0.1)}
                  >
                    Color Change
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Loading Animations</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="relative overflow-hidden"
                    onClick={() => playSound(440, 0.1)}
                  >
                    <span className="relative z-10">Ripple Effect</span>
                    <div className="absolute inset-0 bg-primary/20 transform scale-0 animate-ping"></div>
                  </Button>
                  <Button
                    variant="outline"
                    className="animate-pulse hover:animate-none"
                    onClick={() => playSound(550, 0.1)}
                  >
                    Pulse
                  </Button>
                  <Button
                    variant="secondary"
                    className="animate-bounce hover:animate-none"
                    onClick={() => playSound(660, 0.1)}
                  >
                    Bounce
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Haptic Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Haptic Feedback</CardTitle>
              <CardDescription>Comprehensive haptic patterns for different interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Success Patterns</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => {
                      playSound(523.25, 0.1);
                      if (navigator.vibrate) navigator.vibrate(50);
                    }}
                  >
                    <Icon metaphor="success" className="mr-2 h-4 w-4" />
                    Short Success
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      playSound(659.25, 0.15);
                      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
                    }}
                  >
                    <Icon metaphor="success" className="mr-2 h-4 w-4" />
                    Double Tap
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      playSound(783.99, 0.2);
                      if (navigator.vibrate) navigator.vibrate([30, 20, 30, 20, 30]);
                    }}
                  >
                    <Icon metaphor="success" className="mr-2 h-4 w-4" />
                    Triple Pulse
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Warning Patterns</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      playSound(329.63, 0.2);
                      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                    }}
                  >
                    <Icon metaphor="warning" className="mr-2 h-4 w-4" />
                    Warning Pulse
                  </Button>
                  <Button
                    onClick={() => {
                      playSound(293.66, 0.3);
                      if (navigator.vibrate) navigator.vibrate(200);
                    }}
                  >
                    <Icon metaphor="warning" className="mr-2 h-4 w-4" />
                    Long Vibrate
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Error Patterns</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      playSound(174.61, 0.3);
                      if (navigator.vibrate) navigator.vibrate([50, 100, 50, 100, 50]);
                    }}
                  >
                    <Icon metaphor="error" className="mr-2 h-4 w-4" />
                    Error Shake
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      playSound(220, 0.25);
                      if (navigator.vibrate) navigator.vibrate([150, 100, 150]);
                    }}
                  >
                    <Icon metaphor="error" className="mr-2 h-4 w-4" />
                    Strong Alert
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Patterns</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      playSound(880, 0.08);
                      if (navigator.vibrate) navigator.vibrate(20);
                    }}
                  >
                    <Icon metaphor="notification" className="mr-2 h-4 w-4" />
                    Light Tap
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      playSound(698.46, 0.1);
                      if (navigator.vibrate) navigator.vibrate([25, 15, 25]);
                    }}
                  >
                    <Icon metaphor="notification" className="mr-2 h-4 w-4" />
                    Gentle Nudge
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      playSound(440, 0.12);
                      if (navigator.vibrate) navigator.vibrate([40, 25, 40, 25]);
                    }}
                  >
                    <Icon metaphor="notification" className="mr-2 h-4 w-4" />
                    Rhythm
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interactive Patterns</h3>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => {
                      playSound(523.25, 0.05);
                      if (navigator.vibrate) navigator.vibrate(10);
                    }}
                    onMouseEnter={() => {
                      if (navigator.vibrate) navigator.vibrate(5);
                    }}
                  >
                    Hover + Click
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      playSound(587.33, 0.08);
                      if (navigator.vibrate) navigator.vibrate([15, 10, 15]);
                    }}
                    onMouseDown={() => {
                      if (navigator.vibrate) navigator.vibrate(25);
                    }}
                    onMouseUp={() => {
                      if (navigator.vibrate) navigator.vibrate(15);
                    }}
                  >
                    Press Sensation
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      playSound(659.25, 0.1);
                      if (navigator.vibrate) navigator.vibrate([30, 20, 30, 20, 30, 20]);
                    }}
                    onMouseEnter={() => {
                      playSound(440, 0.03);
                      if (navigator.vibrate) navigator.vibrate(8);
                    }}
                  >
                    Rich Interaction
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Testing Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Testing</CardTitle>
              <CardDescription>Use the theme selector in the navigation bar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">
                  🎨 <strong>Color Themes:</strong> Use the theme selector in navigation to switch between:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Base (shadcn/ui default theme)</li>
                  <li>• Blue (Professional blue primary)</li>
                  <li>• Purple (Creative purple primary)</li>
                  <li>• Green (Natural green primary)</li>
                  <li>• Orange (Energetic orange primary)</li>
                  <li>• Red (Bold red primary)</li>
                </ul>
                <p className="text-sm">
                  🌙 <strong>Dark Mode:</strong> Click the sun/moon/system icon to toggle light/dark/system modes
                </p>
                <p className="text-sm">
                  🔊 <strong>Audio Feedback:</strong> Click any button to hear audio feedback
                </p>
                <p className="text-sm">
                  📳 <strong>Haptic Feedback:</strong> Some buttons provide vibration feedback on mobile devices
                </p>
                <p className="text-sm">
                  🎯 <strong>Icon System:</strong> All icons use the Icon Metaphor System with Lucide icons
                </p>
                <p className="text-sm">
                  🎬 <strong>Motion & Animation:</strong> Buttons include various animation and motion effects
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SensoryProvider>
  );
}