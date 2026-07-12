/**
 * The Graphics Feature Status from `chrome://gpu/`.
 *
 * @public
 * @unofficial
 */
export interface ElectronGPUFeatureStatus {
  /** Canvas. */
  '2d_canvas': string;

  /** Flash. */
  'flash_3d': string;

  /** Flash Stage3D. */
  'flash_stage3d': string;

  /** Flash Stage3D Baseline profile. */
  'flash_stage3d_baseline': string;

  /** Compositing. */
  'gpu_compositing': string;

  /** Multiple Raster Threads. */
  'multiple_raster_threads': string;

  /** Native GpuMemoryBuffers. */
  'native_gpu_memory_buffers': string;

  /** Rasterization. */
  'rasterization': string;

  /** Video Decode. */
  'video_decode': string;

  /** Video Encode. */
  'video_encode': string;

  /** VPx Video Decode. */
  'vpx_decode': string;

  /** WebGL. */
  'webgl': string;

  /** WebGL2. */
  'webgl2': string;
}
