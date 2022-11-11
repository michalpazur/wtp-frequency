import pandas
from ..util.date import get_today
from typing import Dict, List, TypedDict

trips_columns = "route_id,service_id,trip_id,shape_id,trip_headsign".split(",")
class Trip(TypedDict):
  line: str
  headsign: str

def load_services() -> List[str]:
  today = get_today()
  calendar_dates = pandas.read_csv("gtfs/calendar_dates.txt", converters={ "date": str })
  calendar_dates = calendar_dates[calendar_dates.date == today]
  return calendar_dates.service_id.to_list()

def load_trips() -> pandas.DataFrame:
  print("Loading trips...")
  trips = pandas.read_csv("gtfs/trips.txt")[trips_columns]
  services = load_services()
  trips = trips[trips.service_id.isin(services)]
  return trips

class Trips:
  def __init__(self) -> None:
    self.trips = load_trips()
    self.shape_count: pandas.DataFrame
    self.services = load_services()

  def count_shapes(self) -> None:
    trips = self.trips
    print("Counting trips made with each shape...")
    # Count number of trips by each shape_id
    shape_count = trips.groupby(["shape_id"]).size()
    shape_count = shape_count.reset_index(name="trip_count")
    self.shape_count = shape_count

  def make_trips_df(self) -> None:
    trips = self.trips
    print("Creating trips DataFrame...")
    # Get rid of departure times from trip ids
    trips.trip_id = trips.trip_id.str.rsplit("/", 1).str[0]
    trips = trips.drop_duplicates()
    self.trips = trips

  def create_lookup(self) -> Dict[str, Trip]:
    trips_lookup: Dict[str, Trip] = {}
    for i, row in self.trips.iterrows():
      trips_lookup[row.trip_id] = { "line": row.route_id, "headsign": row.trip_headsign }
    
    return trips_lookup