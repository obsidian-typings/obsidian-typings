/** @todo Documentation incomplete */
export default interface Token extends EditorRange {
    text: string;
    type: "tag" | "external-link" | "internal-link";
}
