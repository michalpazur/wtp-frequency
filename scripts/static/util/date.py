from datetime import datetime 

def get_today() -> str:
  return datetime.now().strftime("%Y%m%d")