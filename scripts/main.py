from static.trips import Trips
from static.stops import Stops

def main():
  # Create trip data
  trips = Trips()
  trips.filter_trips()
  # Create stop data
  stops = Stops(trips)
  stops.save_data()

if (__name__ == "__main__"):
  main()