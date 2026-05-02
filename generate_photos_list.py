import os, json

photos = [
    "Photos/" + f for f in os.listdir("Photos")
    if f.lower().endswith((".jpg", ".jpeg", ".png"))
]

photos.sort()  # consistent base order before shuffle

with open("photos_list.js", "w") as f:
    f.write(f"const photosList = {json.dumps(photos, indent=2)};")

print(f"✅ Found {len(photos)} photos → photos_list.js updated")