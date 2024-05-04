def get_time_value(time_str: str):
  split = time_str.split(":")
  hours = int(split[0])
  minutes = int(split[1])
  seconds = int(split[2]) if split[2] is not None else 0
  return seconds + minutes * 60 + hours * 60 * 60

def get_time_string(time_val: int, include_seconds: bool = True, separator = ":"):
  seconds = time_val % 60
  minutes = int((time_val - seconds) / 60) % 60
  seconds_left = time_val - seconds - (minutes * 60)
  hours = seconds_left / 3600
  hours = int(hours)
  time_string = f"{hours:02}{separator}{minutes:02}"
  if (include_seconds):
    time_string += f"{separator}{seconds:02}"
  return time_string
  