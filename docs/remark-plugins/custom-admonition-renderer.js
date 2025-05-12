import { fromHtml } from 'hast-util-from-html';
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import { decorateHast } from './util.js';

const acceptableCalloutTypes = {
    'todo': {
        representation: 'Todo',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>`
    },
    'tutorial': {
        representation: 'Tutorial',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
            </svg>`
    },
    'remark': {
        representation: 'Remark',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
            </svg>`
    },
    'deprecated': {
        representation: 'Deprecated',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="6" cy="6" r="3"/><path d="M6 9v12"/><path d="m21 3-6 6"/><path d="m21 9-6-6"/><path d="M18 11.5V15"/><circle cx="18" cy="18" r="3"/>
            </svg>`
    },
    'unofficial': {
        representation: 'Unofficial',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m13.5 8.5-5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>`
    },
    'official': {
        representation: 'Official',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>`
    }
};

export default function remarkToc() {
    return function(tree) {
        visit(tree, (node) => {
            if (
                !(
                    node.type === 'textDirective'
                    || node.type === 'leafDirective'
                    || node.type === 'containerDirective'
                )
            ) {
                return;
            }

            if (!acceptableCalloutTypes[node.name]) {
                return;
            }

            const svgContent = acceptableCalloutTypes[node.name].svg;
            const svg = fromHtml(svgContent);

            const bodyContainer = h(
                'section',
                {
                    class: 'starlight-aside__content'
                },
                node.children
            );

            const titleContainer = h(
                'p',
                {
                    class: 'starlight-aside__title',
                    'aria-hidden': 'true'
                },
                [svg, acceptableCalloutTypes[node.name].representation]
            );

            node.tagName = 'aside';
            node.properties = {
                'aria-label': acceptableCalloutTypes[node.name].representation,
                class: `starlight-aside starlight-aside--${node.name}`
            };
            node.children = [titleContainer, bodyContainer];

            decorateHast(node);
        });
    };
}
