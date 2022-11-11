import pandas
from ..trips import Trips

def load_shapes() -> pandas.DataFrame:
  return pandas.read_csv("gtfs/shapes.txt")

class Shapes:
  def __init__(self, trips: Trips) -> None:
    self.shapes = load_shapes()
    self.trips = trips
    self.segments: pandas.DataFrame

  def make_start_end(self) -> pandas.DataFrame:
    shapes = self.shapes.rename(columns={ "shape_pt_lat": "ex", "shape_pt_lon": "ey" })
    shapes["sx"] = shapes["ex"].shift(1)
    shapes["sy"] = shapes["ey"].shift(1)
    # Sequence number 0 would overlap with previous shape
    return shapes[shapes["shape_pt_sequence"] != 0]

  def count_shape_trips(self) -> pandas.DataFrame:
    print("Adding trip count to each shape segment...")
    shape_count = self.trips.shape_count
    start_end = self.make_start_end()
    # Merge DataFrames based on shape_id
    shape_count = pandas.merge(shape_count, start_end, on="shape_id")
    return shape_count

  def swap_coordinates(self) -> pandas.DataFrame:
    shape_count = self.count_shape_trips()
    print("Swapping shape coordinates...")
    # Normalize segments so that A -> B is equal to B -> A
    shape_count["start_x"] = shape_count.apply(lambda row: row["sx"] if row["sx"] > row["ex"] else row["ex"], axis=1)
    shape_count["start_y"] = shape_count.apply(lambda row: row["sy"] if row["sx"] > row["ex"] else row["ey"], axis=1)
    shape_count["end_x"] = shape_count.apply(lambda row: row["ex"] if row["sx"] > row["ex"] else row["sx"], axis=1)
    shape_count["end_y"] = shape_count.apply(lambda row: row["ey"] if row["sx"] > row["ex"] else row["sy"], axis=1)

    print("Swapping coordinates done.")
    return shape_count["start_x,start_y,end_x,end_y,trip_count".split(",")]

  def count_segment_trips(self):
    shape_count = self.swap_coordinates()
    print("Counting trips for each segment...")
    len_shape_start = len(shape_count)
    segments_grouped = shape_count.groupby("start_x,start_y,end_x,end_y".split(","), sort=False)
    segments = segments_grouped["trip_count"].sum().reset_index()
    len_shape_end = len(segments)
    print(f"Merged {len_shape_start} segments into {len_shape_end} segments.")

    self.segments = segments
