import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronMessageDetails } from './ElectronMessageDetails.d.ts';
import type { ElectronRegistrationCompletedDetails } from './ElectronRegistrationCompletedDetails.d.ts';
import type { ElectronServiceWorkerInfo } from './ElectronServiceWorkerInfo.d.ts';

/**
 * Provides access to the service workers registered within a session.
 *
 * @public
 * @unofficial
 */
export interface ElectronServiceWorkers {
  /**
   * Registers a listener for the `console-message` event, emitted when a service worker logs to the console.
   *
   * @param event - The event name.
   * @param listener - Called with the console message details.
   * @returns This service workers instance.
   */
  addListener(event: 'console-message', listener: (event: ElectronEvent, messageDetails: ElectronMessageDetails) => void): this;

  /**
   * Registers a listener for the `registration-completed` event, emitted when a service worker has been registered.
   *
   * @param event - The event name.
   * @param listener - Called with the registration details.
   * @returns This service workers instance.
   */
  addListener(event: 'registration-completed', listener: (event: ElectronEvent, details: ElectronRegistrationCompletedDetails) => void): this;

  /**
   * Returns all running service workers keyed by version ID.
   *
   * @returns A map whose keys are the service worker version IDs and whose values describe each service worker.
   */
  getAllRunning(): Record<number, ElectronServiceWorkerInfo>;

  /**
   * Returns information about the service worker with the given version ID.
   *
   * @param versionId - The service worker version ID.
   * @returns Information about the service worker.
   */
  getFromVersionID(versionId: number): ElectronServiceWorkerInfo;

  /**
   * Registers a listener for the `console-message` event, emitted when a service worker logs to the console.
   *
   * @param event - The event name.
   * @param listener - Called with the console message details.
   * @returns This service workers instance.
   */
  on(event: 'console-message', listener: (event: ElectronEvent, messageDetails: ElectronMessageDetails) => void): this;

  /**
   * Registers a listener for the `registration-completed` event, emitted when a service worker has been registered.
   *
   * @param event - The event name.
   * @param listener - Called with the registration details.
   * @returns This service workers instance.
   */
  on(event: 'registration-completed', listener: (event: ElectronEvent, details: ElectronRegistrationCompletedDetails) => void): this;

  /**
   * Registers a one-time listener for the `console-message` event.
   *
   * @param event - The event name.
   * @param listener - Called with the console message details.
   * @returns This service workers instance.
   */
  once(event: 'console-message', listener: (event: ElectronEvent, messageDetails: ElectronMessageDetails) => void): this;

  /**
   * Registers a one-time listener for the `registration-completed` event.
   *
   * @param event - The event name.
   * @param listener - Called with the registration details.
   * @returns This service workers instance.
   */
  once(event: 'registration-completed', listener: (event: ElectronEvent, details: ElectronRegistrationCompletedDetails) => void): this;

  /**
   * Removes a previously registered `console-message` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This service workers instance.
   */
  removeListener(event: 'console-message', listener: (event: ElectronEvent, messageDetails: ElectronMessageDetails) => void): this;

  /**
   * Removes a previously registered `registration-completed` event listener.
   *
   * @param event - The event name.
   * @param listener - The listener to remove.
   * @returns This service workers instance.
   */
  removeListener(event: 'registration-completed', listener: (event: ElectronEvent, details: ElectronRegistrationCompletedDetails) => void): this;
}
