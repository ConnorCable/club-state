import type {HeatmapLayer} from 'react-map-gl';

const MAX_ZOOM_LEVEL = 20;

export const heatmapLayer: HeatmapLayer = {
  id: 'heatmap',
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
    // Increase the heatmap color weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
    // Color ramp for heatmap. Domain is 0 (low) to 1 (high).
    // Use bright white colors to stand out against dark backgrounds.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(255,255,255,0)',      // Transparent white for low density
      0.2,
      'rgba(255,255,255,0.4)',    // Light white
      0.4,
      'rgba(255,255,255,0.6)',    // Medium white
      0.6,
      'rgba(255,255,255,0.8)',    // Bright white
      0.8,
      'rgba(255,255,255,0.9)',    // Very bright white
      0.9,
      'rgba(255,255,255,1)'       // Solid white for high density
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, 20],
    // Transition from heatmap to circle layer by zoom level
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0.8]
  }
};