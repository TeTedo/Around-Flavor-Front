export class MapUtils {
  static generateRandomPoint = (lat: number, lng: number, radius: number) => {
    const y0 = lat;
    const x0 = lng;
    const rd = radius / 111300; // about 111300 meters in one degree

    const u = Math.random();
    const v = Math.random();

    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    const newlat = y + y0;
    const newlon = x + x0;

    return new google.maps.LatLng(newlat, newlon);
  };
}
