/** @todo Documentation incomplete */
export default interface VimState {
    vim: {
        inputState: {
            changeQueue: null;
            keyBuffer: [];
            motion: null;
            motionArgs: null;
            motionRepeat: [];
            operator: null;
            operatorArgs: null;
            prefixRepeat: [];
            registerName: null;
        };
        insertMode: false;
        insertModeRepeat: undefined;
        lastEditActionCommand: undefined;
        lastEditInputState: undefined;
        lastHPos: number;
        lastHSPos: number;
        lastMotion: {
            name?: string;
        };
        lastPastedText: null;
        lastSelection: null;
    };
    vimPlugin: {
        lastKeydown: string;
    };
}
