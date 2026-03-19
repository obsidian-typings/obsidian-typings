import type { App } from 'obsidian';

import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { AudioRecorderPlugin } from './AudioRecorderPlugin.d.ts';

/**
 * Plugin instance for the audio recorder, providing methods to record and save audio clips.
 *
 * @public
 * @unofficial
 */
export interface AudioRecorderPluginInstance extends InternalPluginInstance<AudioRecorderPlugin> {
  /** Reference to the app. */
  app: App;

  /** File extension used for saved audio recordings. */
  extension: string;

  /** Reference to the audio recorder plugin registration. */
  plugin: AudioRecorderPlugin;

  /** Active MediaRecorder instance, or `null` when not recording. */
  recorder: MediaRecorder | null;

  /** Whether audio is currently being recorded. */
  recording: boolean;

  /**
   * Check if the user has granted microphone permission.
   *
   * @returns Whether microphone permission is granted.
   */
  checkPermission(): Promise<boolean>;

  /**
   * Initiate the audio recording flow.
   *
   * @returns A promise that resolves when the recording flow completes.
   */
  onRecordAudio(): Promise<void>;

  /**
   * Start a new audio recording session.
   *
   * @returns A promise that resolves when recording has started.
   */
  onStartRecording(): Promise<void>;

  /** Stop the current audio recording session. */
  onStopRecording(): void;

  /**
   * Save the recorded audio buffer to a file in the vault.
   *
   * @param audioBuffer - The recorded audio data.
   * @returns A promise that resolves when the recording is saved.
   */
  saveRecording(audioBuffer: ArrayBuffer): Promise<void>;

  /**
   * Display a recording status message or error to the user.
   *
   * @param message - The message to display.
   * @param isError - Whether the message is an error.
   */
  showRecordingMessage(message: string, isError: boolean): void;

  /**
   * Begin recording audio from the given media stream.
   *
   * @param stream - The media stream to record from.
   */
  startRecording(stream: MediaStream): void;
}
