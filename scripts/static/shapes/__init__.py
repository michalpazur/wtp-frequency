import math
from os import path
from typing import List, TypedDict
import geopandas
import pandas
from shapely.geometry import LineString, Point
from shapely.geometry.base import BaseGeometry
from shapely.ops import linemerge
from ..const import DATA_FOLDER, GPS
from ..trips import Trips

class SegmentInfo(TypedDict):
  trip_count: int
  geometry: BaseGeometry

def load_shapes() -> pandas.DataFrame:
  return pandas.read_csv("gtfs/shapes.txt")

bins = [0, 40, 80, 120, 155, 190, 230, 270, 310, 350, 385, 425, 470, 510, 555, 605, 655, 750, 860, 1040]

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

  def count_segment_trips(self) -> None:
    shape_count = self.swap_coordinates()
    print("Counting trips for each segment...")
    len_shape_start = len(shape_count)
    segments_grouped = shape_count.groupby("start_x,start_y,end_x,end_y".split(","), sort=False)
    segments = segments_grouped["trip_count"].sum().reset_index()
    len_shape_end = len(segments)
    print(f"Merged {len_shape_start} segments into {len_shape_end} segments.")

    self.segments = segments

  def create_line_strings(self) -> geopandas.GeoDataFrame:
    print("Creating LineStrings...")
    segments = self.segments
    start_points = [Point(xy) for xy in zip(segments.start_y, segments.start_x)]
    end_points = [Point(xy) for xy in zip(segments.end_y, segments.end_x)]
    line_strings = [LineString(xy) for xy in zip(start_points, end_points)]

    line_strings = geopandas.GeoDataFrame(geometry=line_strings, crs=GPS)
    line_strings["trip_count"] = segments["trip_count"]
    line_strings = line_strings[line_strings.trip_count != 0]
    print("LineStrings DataFrame created.")
    return line_strings

  def merge_segments(self) -> geopandas.GeoDataFrame:
    line_strings = self.create_line_strings()
    print("Merging segments...")
    unique_counts = line_strings.trip_count.drop_duplicates().reset_index()
    merged_list: List[SegmentInfo] = []

    for i, row in unique_counts.iterrows():
      trip_count = row.trip_count
      geometry = linemerge(line_strings.geometry[line_strings.trip_count == trip_count].to_list())
      segment_info: SegmentInfo = { "geometry": geometry, "trip_count": trip_count }
      merged_list.append(segment_info)
    
    merged_segments = geopandas.GeoDataFrame(merged_list, crs=GPS)
    print("Simplifying geometry...")
    merged_segments.geometry = merged_segments.simplify(0.00006)
    return merged_segments

  def make_geojson(self):
    merged_segments = self.merge_segments()
    merged_segments.bin = -1
    print("Creating GeoJSON...")
    for i in range(len(bins)):
      min_val = bins[i]
      max_val = bins[i + 1] if i < len(bins) - 1 else math.inf
      merged_segments.loc[(merged_segments.trip_count >= min_val) & (merged_segments.trip_count < max_val), "bin"] = i
    
    print("Saving GeoJSON...")
    merged_segments.to_file(path.join(DATA_FOLDER, "lines.json"), driver="GeoJSON")
