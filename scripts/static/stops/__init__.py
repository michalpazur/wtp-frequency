from os import path
import geopandas
import pandas
from shapely.geometry import Point
from ..const import DATA_FOLDER, GPS

def load_stops() -> geopandas.GeoDataFrame:
  stops = pandas.read_csv("gtfs/stops.txt")
  stop_points = [Point(xy) for xy in zip(stops.stop_lon, stops.stop_lat)]

  stops_gdf = geopandas.GeoDataFrame(geometry=stop_points, crs=GPS)
  stops_gdf["stopId"] = stops.stop_id
  stops_gdf["stopName"] = stops.stop_name

  return stops_gdf

class Stops:
  def __init__(self) -> None:
    self.stops = load_stops()

  def save_data(self) -> None:
    self.stops.to_file(path.join(DATA_FOLDER, "stops.json"), driver="GeoJSON")
