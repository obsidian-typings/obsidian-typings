import type { ElectronBeforeSendResponse } from './ElectronBeforeSendResponse.d.ts';
import type { ElectronHeadersReceivedResponse } from './ElectronHeadersReceivedResponse.d.ts';
import type { ElectronOnBeforeRedirectListenerDetails } from './ElectronOnBeforeRedirectListenerDetails.d.ts';
import type { ElectronOnBeforeRequestListenerDetails } from './ElectronOnBeforeRequestListenerDetails.d.ts';
import type { ElectronOnBeforeSendHeadersListenerDetails } from './ElectronOnBeforeSendHeadersListenerDetails.d.ts';
import type { ElectronOnCompletedListenerDetails } from './ElectronOnCompletedListenerDetails.d.ts';
import type { ElectronOnErrorOccurredListenerDetails } from './ElectronOnErrorOccurredListenerDetails.d.ts';
import type { ElectronOnHeadersReceivedListenerDetails } from './ElectronOnHeadersReceivedListenerDetails.d.ts';
import type { ElectronOnResponseStartedListenerDetails } from './ElectronOnResponseStartedListenerDetails.d.ts';
import type { ElectronOnSendHeadersListenerDetails } from './ElectronOnSendHeadersListenerDetails.d.ts';
import type { ElectronResponse } from './ElectronResponse.d.ts';
import type { ElectronWebRequestFilter } from './ElectronWebRequestFilter.d.ts';

/**
 * Intercepts and observes a session's network requests at various life-cycle stages.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebRequest {
  /**
   * Registers a listener called when a server initiated redirect is about to occur, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onBeforeRedirect(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnBeforeRedirectListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when a server initiated redirect is about to occur.
   *
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onBeforeRedirect(listener: ((details: ElectronOnBeforeRedirectListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when a request is about to occur, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details and a response callback, or `null` to remove the listener.
   */
  onBeforeRequest(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnBeforeRequestListenerDetails, callback: (response: ElectronResponse) => void) => void) | null): void;

  /**
   * Registers a listener called when a request is about to occur.
   *
   * @param listener - Called with the request details and a response callback, or `null` to remove the listener.
   */
  onBeforeRequest(listener: ((details: ElectronOnBeforeRequestListenerDetails, callback: (response: ElectronResponse) => void) => void) | null): void;

  /**
   * Registers a listener called before sending an HTTP request, once the request headers are available, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details and a response callback, or `null` to remove the listener.
   */
  onBeforeSendHeaders(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnBeforeSendHeadersListenerDetails, callback: (beforeSendResponse: ElectronBeforeSendResponse) => void) => void) | null): void;

  /**
   * Registers a listener called before sending an HTTP request, once the request headers are available.
   *
   * @param listener - Called with the request details and a response callback, or `null` to remove the listener.
   */
  onBeforeSendHeaders(listener: ((details: ElectronOnBeforeSendHeadersListenerDetails, callback: (beforeSendResponse: ElectronBeforeSendResponse) => void) => void) | null): void;

  /**
   * Registers a listener called when a request is completed, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onCompleted(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnCompletedListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when a request is completed.
   *
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onCompleted(listener: ((details: ElectronOnCompletedListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when an error occurs, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onErrorOccurred(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnErrorOccurredListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when an error occurs.
   *
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onErrorOccurred(listener: ((details: ElectronOnErrorOccurredListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when HTTP response headers of a request have been received, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details and a response callback, or `null` to remove the listener.
   */
  onHeadersReceived(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnHeadersReceivedListenerDetails, callback: (headersReceivedResponse: ElectronHeadersReceivedResponse) => void) => void) | null): void;

  /**
   * Registers a listener called when HTTP response headers of a request have been received.
   *
   * @param listener - Called with the request details and a response callback, or `null` to remove the listener.
   */
  onHeadersReceived(listener: ((details: ElectronOnHeadersReceivedListenerDetails, callback: (headersReceivedResponse: ElectronHeadersReceivedResponse) => void) => void) | null): void;

  /**
   * Registers a listener called when the first byte of the response body is received, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onResponseStarted(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnResponseStartedListenerDetails) => void) | null): void;

  /**
   * Registers a listener called when the first byte of the response body is received.
   *
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onResponseStarted(listener: ((details: ElectronOnResponseStartedListenerDetails) => void) | null): void;

  /**
   * Registers a listener called just before a request is going to be sent to the server, filtered by `filter`.
   *
   * @param filter - The filter narrowing which requests are observed.
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onSendHeaders(filter: ElectronWebRequestFilter, listener: ((details: ElectronOnSendHeadersListenerDetails) => void) | null): void;

  /**
   * Registers a listener called just before a request is going to be sent to the server.
   *
   * @param listener - Called with the request details, or `null` to remove the listener.
   */
  onSendHeaders(listener: ((details: ElectronOnSendHeadersListenerDetails) => void) | null): void;
}
