import json
from pathlib import Path

settings_path = Path(__file__).parent/ "settings.json"

with open(settings_path, "r", encoding="utf-8") as f:
    settings = json.load(f)

SECRET_KEY = settings["secret"]
ALGORITHM = settings["algorithm"]
ACCESS_TOKEN_EXPIRES_MIN = settings["exp_min"]