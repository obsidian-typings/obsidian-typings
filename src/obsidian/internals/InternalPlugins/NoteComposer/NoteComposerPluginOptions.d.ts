/** @public @unofficial */
export interface NoteComposerPluginOptions {
    askBeforeMerging?: boolean;
    replacementText?: 'link' | 'embed' | 'none';
    template?: string;
}
