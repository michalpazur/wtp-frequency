from ..const import DATA_FOLDER
from .date import get_today_folder

def get_folder_name() -> str:
  return f"{DATA_FOLDER}/{get_today_folder()}"