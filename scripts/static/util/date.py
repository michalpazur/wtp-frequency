from datetime import datetime
import pytz

def get_today() -> str:
  return datetime.now(pytz.timezone("Europe/Warsaw")).strftime("%Y%m%d")