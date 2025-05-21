
type Coordinates = {
  latitude: number;
  longitude: number;
};

class LocationService {
  private static instance: LocationService;
  private currentPosition: Coordinates | null = null;
  private locationListeners: ((coords: Coordinates | null) => void)[] = [];

  private constructor() {}

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  public async requestLocationPermission(): Promise<boolean> {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return false;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      this.currentPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      
      this.notifyLocationListeners();
      return true;
    } catch (error) {
      console.error('Error getting location', error);
      return false;
    }
  }

  public watchLocation(): void {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      return;
    }

    navigator.geolocation.watchPosition(
      (position) => {
        this.currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.notifyLocationListeners();
      },
      (error) => {
        console.error('Error watching location', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  public getCurrentPosition(): Coordinates | null {
    return this.currentPosition;
  }

  public addLocationListener(listener: (coords: Coordinates | null) => void): void {
    this.locationListeners.push(listener);
    // If we already have a position, notify the listener immediately
    if (this.currentPosition) {
      listener(this.currentPosition);
    }
  }

  public removeLocationListener(listener: (coords: Coordinates | null) => void): void {
    const index = this.locationListeners.indexOf(listener);
    if (index !== -1) {
      this.locationListeners.splice(index, 1);
    }
  }

  private notifyLocationListeners(): void {
    this.locationListeners.forEach(listener => {
      listener(this.currentPosition);
    });
  }

  // Calculate distance between two coordinates in kilometers
  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return parseFloat(d.toFixed(1));
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export default LocationService.getInstance();
