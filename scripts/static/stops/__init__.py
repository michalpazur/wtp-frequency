import json
from os import mkdir, path
from typing import Dict, List
import geopandas
import pandas
from shapely.geometry import Point
from ..const import GPS
from ..trips import Trips
from ..util.folder import get_folder_name

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
    print("Creating stops lookup table...")
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
      
    print(f"Created lookup for {len(stops_lookup)} stops.")
    return stops_lookup

  def filter_stops(self, stops_lookup: StopLookup) -> None:
    print("Removing unused stops...")
    all_stops_len = len(self.stops)
    stops = self.stops
    stops_with_trips = [k for k in stops_lookup]
    stops = stops[stops.stopId.isin(stops_with_trips)]
    self.stops = stops
    filtered_stops_len = len(stops)
    print(f"Removed {all_stops_len - filtered_stops_len} stops. {filtered_stops_len} stops remaining.")

  def save_data(self) -> None:
    stops_lookup = self.make_stops_lookup()
    self.filter_stops(stops_lookup)

    folder_name = get_folder_name()
    if (not path.isdir(folder_name)):
      print(f"Creating new data directory ({folder_name})...")
      mkdir(folder_name)
    
    with open(path.join(folder_name, "stop_info.json"), "w", encoding="utf-8") as json_f:
      json.dump(stops_lookup, json_f, ensure_ascii=False)
    
    self.stops.to_file(path.join(folder_name, "stops.json"), driver="GeoJSON")
