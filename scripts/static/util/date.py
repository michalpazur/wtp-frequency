from datetime import datetime
import pytz

timezone = "Europe/Warsaw"

def get_today() -> str:
  return datetime.now(pytz.timezone(timezone)).strftime("%Y%m%d")

def get_today_folder() -> str:
  return datetime.now(pytz.timezone(timezone)).strftime("%Y_%m_%d")