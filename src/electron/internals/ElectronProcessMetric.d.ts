import type { ElectronCPUUsage } from './ElectronCPUUsage.d.ts';
import type { ElectronMemoryInfo } from './ElectronMemoryInfo.d.ts';

/**
 * Memory and CPU usage statistics for a process associated with the app.
 *
 * @public
 * @unofficial
 */
export interface ElectronProcessMetric {
  /** CPU usage of the process. */
  cpu: ElectronCPUUsage;

  /** Creation time for this process, represented as number of milliseconds since epoch. */
  creationTime: number;

  /** The security integrity level of the process. Windows only. */
  integrityLevel?: 'high' | 'low' | 'medium' | 'unknown' | 'untrusted';

  /** Memory information for the process. */
  memory: ElectronMemoryInfo;

  /** The name of the process. */
  name?: string;

  /** Process id of the process. */
  pid: number;

  /** Whether the process is sandboxed on OS level. macOS and Windows only. */
  sandboxed?: boolean;

  /** The non-localized name of the process. */
  serviceName?: string;

  /** Process type. */
  type: 'Browser' | 'GPU' | 'Pepper Plugin' | 'Pepper Plugin Broker' | 'Sandbox helper' | 'Tab' | 'Unknown' | 'Utility' | 'Zygote';
}
