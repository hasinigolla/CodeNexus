import redis
import json
import hashlib
import os

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")

# Enable SSL only for Upstash
USE_SSL = REDIS_HOST != "redis"

r = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    ssl=USE_SSL,
    decode_responses=True
)

# =========================
# Memory Cache (fast layer)
# =========================
MEMORY_CACHE = {}


# =========================
# Key Generator
# =========================
def generate_key(prompt: str, language: str) -> str:
    raw = f"{prompt.strip()}::{language.strip()}"
    return hashlib.md5(raw.encode()).hexdigest()


# =========================
# GET CACHE (2-level)
# =========================
def get_cache(prompt: str, language: str):
    key = generate_key(prompt, language)

    # 1. Memory cache
    if key in MEMORY_CACHE:
        return MEMORY_CACHE[key]

    # 2. Redis cache
    data = r.get(key)
    if data:
        result = json.loads(data)
        MEMORY_CACHE[key] = result  # warm memory
        return result

    return None


# =========================
# SET CACHE
# =========================
def set_cache(prompt: str, language: str, value: dict):
    key = generate_key(prompt, language)

    # memory
    MEMORY_CACHE[key] = value

    # redis (persistent)
    r.set(key, json.dumps(value), ex=60 * 60 * 24 * 7)  # 7 days TTL