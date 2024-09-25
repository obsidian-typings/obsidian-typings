import type { App } from 'obsidian';
import type { AudioRecorderPlugin } from './AudioRecorderPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface AudioRecorderPluginInstance extends InternalPluginInstance {
    app: App;
    plugin: AudioRecorderPlugin;
    recording: boolean;
    recorder: MediaRecorder | null;
    extension: string;

    init(app: App, plugin: AudioRecorderPlugin): void;
    checkPermission(): Promise<boolean>;
    onRecordAudio(): Promise<void>;
    onStartRecording(): Promise<void>;
    onStopRecording(): void;
    startRecording(stream: MediaStream): void;
    saveRecording(audioBuffer: ArrayBuffer): Promise<void>;
    showRecordingMessage(message: string, isError: boolean): void;
}
