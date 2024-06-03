/** @todo Documentation incomplete */
interface Token extends EditorRange {
    text: string;
    type: "tag" | "external-link" | "internal-link";
}
