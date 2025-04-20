import type { App } from 'obsidian';
import type { InternalPluginInstance } from '../InternalPluginInstance.d.ts';
import type { AudioRecorderPlugin } from './AudioRecorderPlugin.d.ts';

/**
 * @public
 * @unofficial
 */
export interface AudioRecorderPluginInstance extends InternalPluginInstance<AudioRecorderPlugin> {
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    extension: string;

    /**
     * @todo Documentation incomplete.
     */
    plugin: AudioRecorderPlugin;

    /**
     * @todo Documentation incomplete.
     */
    recorder: MediaRecorder | null;

    /**
     * @todo Documentation incomplete.
     */
    recording: boolean;

    /**
     * @todo Documentation incomplete.
     */
    checkPermission(): Promise<boolean>;

    /**
     * @todo Documentation incomplete.
     */
    onRecordAudio(): Promise<void>;

    /**
     * @todo Documentation incomplete.
     */
    onStartRecording(): Promise<void>;

    /**
     * @todo Documentation incomplete.
     */
    onStopRecording(): void;

    /**
     * @todo Documentation incomplete.
     */
    saveRecording(audioBuffer: ArrayBuffer): Promise<void>;

    /**
     * @todo Documentation incomplete.
     */
    showRecordingMessage(message: string, isError: boolean): void;

    /**
     * @todo Documentation incomplete.
     */
    startRecording(stream: MediaStream): void;
}
