export default EmbeddableConstructor;

/** @todo Documentation incomplete */
type EmbeddableConstructor = (context: EmbedContext, file: TFile, path?: string) => Component;
