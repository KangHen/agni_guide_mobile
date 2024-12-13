import mapboxgl from 'mapbox-gl';

class ClickableMarker extends mapboxgl.Marker {
  private _handleClick?: () => void;

  // Method to set the click handler
  onClick(handleClick: () => void): this {
    this._handleClick = handleClick;
    return this;
  }

  // Override the existing _onMapClick to trigger the custom handler
  override _onMapClick(e: mapboxgl.MapMouseEvent & { originalEvent: MouseEvent }): void {
    const targetElement = e.originalEvent.target as HTMLElement;
    const element = this._element;

    if (
      this._handleClick &&
      (targetElement === element || element.contains(targetElement))
    ) {
      this._handleClick();
    }
  }
}

export default ClickableMarker;