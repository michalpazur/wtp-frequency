import json
from os import path
import geopandas
import pandas
from ..trips import Trips
from shapely.geometry import Point
from ..const import DATA_FOLDER, GPS
from typing import Dict, List

StopLookup = Dict[str, Dict[str, List[str]]]

def load_stops() -> geopandas.GeoDataFrame:
  stops = pandas.read_csv("gtfs/stops.txt", converters={ "stop_id": str })
  stop_points = [Point(xy) for xy in zip(stops.stop_lon, stops.stop_lat)]

  stops_gdf = geopandas.GeoDataFrame(geometry=stop_points, crs=GPS)
  stops_gdf["stopId"] = stops.stop_id
  stops_gdf["stopName"] = stops.stop_name

  return stops_gdf

def load_stop_times() -> pandas.DataFrame:
  stop_times = pandas.read_csv("gtfs/stop_times.txt", converters={ "stop_id": str })["trip_id,stop_id".split(",")]
  # Get rid of departure times from trip ids
  stop_times.trip_id = stop_times.trip_id.str.rsplit("/", 1).str[0]
  stop_times = stop_times.drop_duplicates()

  return stop_times

class Stops:
  def __init__(self, trips: Trips) -> None:
    self.trips = trips
    self.stops = load_stops()
    self.stop_times = load_stop_times()

  def make_stops_lookup(self) -> StopLookup:
    trips_lookup = self.trips.create_lookup()
    trip_ids = [k for k in trips_lookup]

    stop_times = self.stop_times
    # Only show stop times for current trips
    stop_times = stop_times[stop_times.trip_id.isin(trip_ids)]

    stops_lookup: StopLookup = {}
    for i, row in stop_times.iterrows():
      stop_id = row.stop_id
      trip_id = row.trip_id
      line = trips_lookup[trip_id]
      line_number = line["line"]
      headsign = line["headsign"]

      stop = stops_lookup.get(stop_id, {})
      headsigns = stop.get(line_number, [])
      if (headsign not in headsigns):
        headsigns.append(headsign)
        headsigns = sorted(headsigns, key=lambda x: x.lower())
        stop[line_number] = headsigns
        stops_lookup[stop_id] = stop
      
    return stops_lookup

  def save_data(self) -> None:
    stops_lookup = self.make_stops_lookup()
    with open(path.join(DATA_FOLDER, "stop_info.json"), "w", encoding="utf-8") as json_f:
      json.dump(stops_lookup, json_f, ensure_ascii=False)
    
    self.stops.to_file(path.join(DATA_FOLDER, "stops.json"), driver="GeoJSON")
