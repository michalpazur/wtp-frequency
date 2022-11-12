from static.shapes import Shapes
from static.stops import Stops
from static.trips import Trips

def main():
  # Create trip data
  trips = Trips()
  trips.count_shapes()
  trips.make_trips_df()
  # Create stop data
  stops = Stops(trips)
  stops.save_data()
  # Create segment data
  shapes = Shapes(trips)
  shapes.count_segment_trips()
  shapes.make_geojson()

if (__name__ == "__main__"):
  main()
