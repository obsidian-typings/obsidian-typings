import type { CodeMirrorEditor } from '../CodeMirrorEditor.d.ts';
import type { VimInsertModeChanges } from './VimInsertModeChanges.d.ts';

/**
 * Tracks macro recording and playback — what `q` starts and `@` replays.
 *
 * @public
 * @unofficial
 */
export interface VimMacroModeState {
  /**
   * Whether a macro is currently being replayed.
   */
  isPlaying: boolean;

  /**
   * Whether keystrokes are currently being recorded into a register.
   */
  isRecording: boolean;

  /**
   * The insert-mode edits recorded since the last time insert mode was entered.
   */
  lastInsertModeChanges: VimInsertModeChanges;

  /**
   * The register being recorded into, or `undefined` when nothing is being recorded.
   */
  latestRegister: string | undefined;

  /**
   * Closes the recording indicator, or `undefined` when nothing is being recorded.
   */
  onRecordingDone: ((newVal?: string) => void) | undefined;

  /**
   * The search queries queued up for the macro currently being replayed.
   */
  replaySearchQueries: string[];

  /**
   * Start recording keystrokes into the given register.
   *
   * @param cm - The editor to show the recording indicator in.
   * @param registerName - The register to record into.
   */
  enterMacroRecordMode(cm: CodeMirrorEditor, registerName: string): void;

  /**
   * Stop recording and close the recording indicator.
   */
  exitMacroRecordMode(): void;
}
