import type { loadPixi } from 'obsidian';
import type {
  GraphLink,
  GraphNode,
  GraphRenderer,
  PowerTag
} from 'obsidian-typings';
import type {
  Application,
  Container,
  DisplayObject,
  Graphics,
  Matrix,
  Sprite,
  Text,
  TextStyle,
  Texture
} from 'pixi.js-legacy';

import type {} from 'obsidian-typings/pixi';

declare const renderer: GraphRenderer;
declare const node: GraphNode;
declare const link: GraphLink;
declare const tag: PowerTag;
declare const container: Container;
declare const graphics: Graphics;
declare const sprite: Sprite;
declare const text: Text;
declare const application: Application;
declare const style: TextStyle;
declare const texture: Texture;
declare const matrix: Matrix;
declare const pixi: Awaited<ReturnType<typeof loadPixi>>;

// Real assignments in both directions, including the nominal class identities.
const upstreamContainer: Container = renderer.hanger;
renderer.hanger = container;
const upstreamApplication: Application = renderer.px;
renderer.px = application;
const upstreamGraphics: Graphics | null = node.circle;
node.circle = graphics;
node.highlight = graphics;
const upstreamText: Text | null = node.text;
node.text = text;
const upstreamStyle: TextStyle = node.getTextStyle();
const upstreamTagText: Text = tag.text;
tag.text = text;
const upstreamTagStyle: TextStyle = tag.getTextStyle();
link.arrow = graphics;
link.line = sprite;
link.px = container;
const upstreamSprite: Sprite | null = link.line;
const upstreamLinkContainer: Container | null = link.px;
const upstreamArrow: Graphics | null = link.arrow;
const upstreamDisplay: DisplayObject = renderer.hanger;
const upstreamTexture: Texture = pixi.Texture.WHITE;
const upstreamMatrix: Matrix = new pixi.Matrix();
const created: Container = new pixi.Container();
created.addChild(graphics, sprite, text);
created.transform.setFromMatrix(matrix);
sprite.texture = texture;
text.style = style;
const windowModule: typeof pixi | undefined = window.PIXI;
const globalModule: typeof pixi | undefined = PIXI;
// Graph/vendor members remain reachable after opting in.
renderer.setPan(node.x, node.y);
link.source.renderer.changed();
tag.renderer.changed();
void [upstreamContainer, upstreamApplication, upstreamGraphics, upstreamText, upstreamStyle, upstreamTagText, upstreamTagStyle, upstreamSprite, upstreamLinkContainer, upstreamArrow, upstreamDisplay, upstreamTexture, upstreamMatrix, created, windowModule, globalModule];
