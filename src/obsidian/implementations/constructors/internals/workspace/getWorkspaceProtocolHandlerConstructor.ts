import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { WorkspaceProtocolHandler } from '../../../../internals/workspace/WorkspaceProtocolHandler.d.ts';

/**
 * Get the {@link WorkspaceProtocolHandler} constructor.
 *
 * @param app - The app instance.
 * @returns The {@link WorkspaceProtocolHandler} constructor.
 *
 * @public
 * @unofficial
 */
export function getWorkspaceProtocolHandlerConstructor(app: App): ExtractConstructor<WorkspaceProtocolHandler> {
  return app.workspace.protocolHandler.constructor as ExtractConstructor<WorkspaceProtocolHandler>;
}
