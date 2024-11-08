/**
 * Recursively walk a `hast` tree and decorate each node with the metadata
 * required for `remark-directive`
 *
 * @param {JSX.Element} node
 */
export const decorateHast = node => {
    Object.assign(node.data ?? (node.data = {}), {
        hName: node.tagName,
        hProperties: node.properties,
    });

    if (node.children && Array.isArray(node.children)) {
        node.children.forEach(decorateHast);
    }
};
