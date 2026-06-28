import type { Font } from 'satori';

import { Resvg } from '@resvg/resvg-js';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import satori from 'satori';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const BACKGROUND_COLOR = '#111213';
const ACCENT_COLOR = '#67ACAC';
const TITLE_COLOR = '#ffffff';
const DESCRIPTION_COLOR = '#9CA3AF';
const OFFICIAL_COLOR = '#4ADE80';
const OFFICIAL_BG = 'rgba(74, 222, 128, 0.2)';
const UNOFFICIAL_COLOR = '#FB923C';
const UNOFFICIAL_BG = 'rgba(251, 146, 60, 0.2)';
const BORDER_WIDTH = 8;
const LOGO_HEIGHT = 96;
const LOGO_OPACITY = 0.6;
const PADDING_X = 80;
const PADDING_TOP = 70;
const PADDING_BOTTOM = 60;
const TITLE_FONT_SIZE = 56;
const DESCRIPTION_FONT_SIZE = 26;
const BADGE_FONT_SIZE = 18;
const BADGE_ICON_SIZE = 20;
const BADGE_FONT_WEIGHT = 600;
const FONT_WEIGHT_REGULAR = 400;
const FONT_WEIGHT_BOLD = 700;
const TITLE_LINE_HEIGHT = 1.2;
const DESCRIPTION_LINE_HEIGHT = 1.5;

// Lucide "badge-check" icon SVG path (same as global.css .icon-official)
const OFFICIAL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${OFFICIAL_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`;

// Lucide "circle-help" icon SVG path (same as global.css .icon-unofficial)
const UNOFFICIAL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${UNOFFICIAL_COLOR}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`;

export interface OgImageParams {
  readonly badge?: string;
  readonly description?: string;
  readonly title: string;
}

export function computeOgHash(params: OgImageParams): string {
  const input = JSON.stringify({
    badge: params.badge ?? '',
    description: params.description ?? '',
    title: params.title
  });
  const HASH_LENGTH = 16;
  return createHash('sha256').update(input).digest('hex').slice(0, HASH_LENGTH);
}

export async function loadFonts(docsDir: string): Promise<Font[]> {
  const fontsDir = `${docsDir}/assets/fonts`;
  const [regularData, boldData] = await Promise.all([
    readFile(`${fontsDir}/inter-latin-400-normal.ttf`),
    readFile(`${fontsDir}/inter-latin-700-normal.ttf`)
  ]);

  return [
    { data: regularData, name: 'Inter', style: 'normal' as const, weight: FONT_WEIGHT_REGULAR },
    { data: boldData, name: 'Inter', style: 'normal' as const, weight: FONT_WEIGHT_BOLD }
  ];
}

export async function loadLogoBase64(docsDir: string): Promise<string> {
  const logoPath = `${docsDir}/assets/icon.png`;
  const logoData = await readFile(logoPath);
  return `data:image/png;base64,${logoData.toString('base64')}`;
}

export async function renderOgImage(params: OgImageParams, fonts: Font[], logoBase64: string): Promise<Buffer> {
  const markup = buildOgImageMarkup(params, logoBase64);
  const svg = await satori(markup, {
    fonts,
    height: OG_HEIGHT,
    width: OG_WIDTH
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH }
  });
  return resvg.render().asPng();
}

function buildBadgeMarkup(badge: string): null | Record<string, unknown> {
  const isOfficial = badge.toLowerCase() === 'official';
  const color = isOfficial ? OFFICIAL_COLOR : UNOFFICIAL_COLOR;
  const bg = isOfficial ? OFFICIAL_BG : UNOFFICIAL_BG;
  const iconSvg = isOfficial ? OFFICIAL_ICON_SVG : UNOFFICIAL_ICON_SVG;
  const iconDataUri = `data:image/svg+xml,${encodeURIComponent(iconSvg)}`;

  return {
    props: {
      children: [
        {
          props: {
            height: BADGE_ICON_SIZE,
            src: iconDataUri,
            width: BADGE_ICON_SIZE
          },
          type: 'img'
        },
        {
          props: {
            children: badge,
            style: {
              color
            }
          },
          type: 'span'
        }
      ],
      style: {
        alignItems: 'center',
        background: bg,
        borderRadius: '20px',
        display: 'flex',
        fontSize: `${String(BADGE_FONT_SIZE)}px`,
        fontWeight: BADGE_FONT_WEIGHT,
        gap: '6px',
        padding: '6px 14px 6px 10px'
      }
    },
    type: 'div'
  };
}

function buildOgImageMarkup(params: OgImageParams, logoBase64: string): Record<string, unknown> {
  const badgeNode = params.badge ? buildBadgeMarkup(params.badge) : null;

  // Top row with badge
  const topRow = {
    props: {
      children: badgeNode
        ? [
          // Spacer to push badge right
          { props: { style: { flex: 1 } }, type: 'div' },
          badgeNode
        ]
        : [],
      style: {
        display: 'flex',
        marginBottom: '24px'
      }
    },
    type: 'div'
  };

  // Title
  const title = {
    props: {
      children: params.title,
      style: {
        color: TITLE_COLOR,
        fontSize: `${String(TITLE_FONT_SIZE)}px`,
        fontWeight: FONT_WEIGHT_BOLD,
        lineHeight: TITLE_LINE_HEIGHT,
        marginBottom: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    type: 'div'
  };

  // Description
  const description = {
    props: {
      children: params.description ?? '',
      style: {
        color: DESCRIPTION_COLOR,
        flex: 1,
        fontSize: `${String(DESCRIPTION_FONT_SIZE)}px`,
        lineHeight: DESCRIPTION_LINE_HEIGHT,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    type: 'div'
  };

  // Footer with logo
  const footer = {
    props: {
      children: [
        { props: { style: { flex: 1 } }, type: 'div' },
        {
          props: {
            height: LOGO_HEIGHT,
            src: logoBase64,
            style: {
              height: `${String(LOGO_HEIGHT)}px`,
              objectFit: 'contain',
              opacity: LOGO_OPACITY
            }
          },
          type: 'img'
        }
      ],
      style: {
        alignItems: 'flex-end',
        display: 'flex'
      }
    },
    type: 'div'
  };

  // Root container
  return {
    props: {
      children: [
        {
          props: {
            children: [topRow, title, description],
            style: {
              display: 'flex',
              flex: 1,
              flexDirection: 'column'
            }
          },
          type: 'div'
        },
        footer
      ],
      style: {
        background: BACKGROUND_COLOR,
        borderLeft: `${String(BORDER_WIDTH)}px solid ${ACCENT_COLOR}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: `${String(PADDING_TOP)}px ${String(PADDING_X)}px ${String(PADDING_BOTTOM)}px ${String(PADDING_X)}px`,
        width: '100%'
      }
    },
    type: 'div'
  };
}
