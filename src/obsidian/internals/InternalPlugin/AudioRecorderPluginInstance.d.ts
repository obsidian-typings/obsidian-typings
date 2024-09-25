import type { App } from 'obsidian';
import type { AudioRecorderPlugin } from './AudioRecorderPlugin.js';
import type { InternalPluginInstance } from './InternalPluginInstance.js';

/** @public */
export interface AudioRecorderPluginInstance extends InternalPluginInstance {
    app: App;
    extension: string;
    plugin: AudioRecorderPlugin;
    recorder: MediaRecorder | null;
    recording: boolean;

    checkPermission(): Promise<boolean>;
    init(app: App, plugin: AudioRecorderPlugin): void;
    onRecordAudio(): Promise<void>;
    onStartRecording(): Promise<void>;
    onStopRecording(): void;
    saveRecording(audioBuffer: ArrayBuffer): Promise<void>;
    showRecordingMessage(message: string, isError: boolean): void;
    startRecording(stream: MediaStream): void;
}
