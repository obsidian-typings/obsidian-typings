import type { CodeMirrorAdapterEx } from '../../../@codemirror__view/internals/CodeMirrorAdapterEx.d.ts';
import type { VimApi } from '../../../@codemirror__view/internals/vim/VimApi.d.ts';

export {};

declare global {
  /**
   * vim.js based on https://github.com/codemirror/CodeMirror/commit/793c9e65e09ec7fba3f4f5aaf366b3d36e1a709e (2021-12-04)
   *
   * Modified from https://github.com/nightwing/cm6-vim-mode-experiment/blob/master/src/vim.js 103a9b5 2021-12-03
   *
   * CodeMirror, copyright (c) by Marijn Haverbeke and others
   *
   * Distributed under an MIT license: https://codemirror.net/5/LICENSE
   *
   * Supported keybindings:
   *   Too many to list. Refer to defaultKeymap below.
   *
   * Supported Ex commands:
   *   Refer to defaultExCommandMap below.
   *
   * Registers: unnamed, -, ., :, /, _, a-z, A-Z, 0-9
   *   (Does not respect the special case for number registers when delete
   *    operator is made with these commands: %, (, ),  , /, ?, n, N, {, } )
   *   TODO: Implement the remaining registers.
   *
   * Marks: a-z, A-Z, and 0-9
   *   TODO: Implement the remaining special marks. They have more complex
   *       behavior.
   *
   * Events:
   *  'vim-mode-change' - raised on the editor anytime the current mode changes,
   *                      Event object: {mode: "visual", subMode: "linewise"}
   *
   * Code structure:
   *  1. Default keymap
   *  2. Variable declarations and short basic helpers
   *  3. Instance (External API) implementation
   *  4. Internal state tracking objects (input state, counter) implementation
   *     and instantiation
   *  5. Key handler (the main command dispatcher) implementation
   *  6. Motion, operator, and action implementations
   *  7. Helper functions for the key handler, motions, operators, and actions
   *  8. Set up Vim to work as a keymap for CodeMirror.
   *  9. Ex command implementations.
   *
   * @param CodeMirror - The CodeMirror adapter instance.
   * @returns The Vim API instance.
   * @unofficial
   */
  function initVimMode(CodeMirror: CodeMirrorAdapterEx): VimApi;
}
