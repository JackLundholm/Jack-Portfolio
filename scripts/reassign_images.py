"""Reassign project media after the manual re-sort of images/ into project
folders (Claw, Electra, Lift Stations, Modelling, SUBC, Val Rita Water
Processing plant).

Produces:
  images/detail/<slug>-<n>.jpg   flat gallery images (max 1400px long edge)
  images/thumbs/<slug>-<n>.jpg   168x112 cover-cropped thumbnails
  images/pano/<slug>-360.jpg     equirectangular panoramas (kept at full res)
  images/videos/<slug>-*.mp4     videos served to the gallery / presentation

Folder contents are the source of truth; stale detail/thumbs for projects
that no longer exist (product-renders, python-automation) are removed.
Videos are MOVED (not copied) to avoid duplicating 250+ MB in the repo.
"""
import os
import shutil
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "images")
SRC = {
    "claw": os.path.join(IMG, "Claw"),
    "electra": os.path.join(IMG, "Electra"),
    "lift": os.path.join(IMG, "Lift Stations"),
    "modelling": os.path.join(IMG, "Modelling"),
    "subc": os.path.join(IMG, "SUBC"),
    "valrita": os.path.join(IMG, "Val Rita Water Processing plant"),
}
DETAIL = os.path.join(IMG, "detail")
THUMBS = os.path.join(IMG, "thumbs")
PANO = os.path.join(IMG, "pano")
VIDEOS = os.path.join(IMG, "videos")

PAPER = (245, 242, 234)   # matches --paper-tint in main.css
MAXD = 1400
THUMB = (168, 112)

# (source file, destination detail file). Files already <= MAXD and JPEG are
# copied byte-for-byte; anything larger or PNG is re-encoded.
DETAIL_JOBS = [
    ("valrita", "water-treatment-plant-1.jpg", "water-treatment-plant-1.jpg"),
    ("valrita", "water-treatment-plant-2.jpg", "water-treatment-plant-2.jpg"),
    ("electra", "process-infrastructure-1.jpg", "process-infrastructure-1.jpg"),
    ("electra", "ontario-refinery-banner.jpg", "process-infrastructure-2.jpg"),
    ("electra", "default-banner-2.jpg", "process-infrastructure-3.jpg"),
    ("lift", "lift-station-design-1.jpg", "lift-station-design-1.jpg"),
    ("lift", "lift-station-design-2.jpg", "lift-station-design-2.jpg"),
    ("lift", "lift-station-design-3.jpg", "lift-station-design-3.jpg"),
    ("lift", "python-automation-1.jpg", "lift-station-design-4.jpg"),  # reassigned by author
    ("modelling", "network-modeling-1.jpg", "network-modeling-1.jpg"),
    ("modelling", "network-modeling-2.jpg", "network-modeling-2.jpg"),
    ("modelling", "Screenshot 2026-09-14 111703.png", "network-modeling-3.jpg"),
    ("subc", "human-powered-submarine-1.jpg", "human-powered-submarine-1.jpg"),
    ("subc", "human-powered-submarine-2.jpg", "human-powered-submarine-2.jpg"),
    ("subc", "human-powered-submarine-3.jpg", "human-powered-submarine-3.jpg"),
    ("subc", "human-powered-submarine-4.jpg", "human-powered-submarine-4.jpg"),
    ("subc", "propeller-design-1.jpg", "propeller-design-1.jpg"),
    ("subc", "propeller-design-2.jpg", "propeller-design-2.jpg"),
    ("subc", "propeller-design-3.jpg", "propeller-design-3.jpg"),
    ("subc", "propeller-design-4.jpg", "propeller-design-4.jpg"),
    ("subc", "composites-manufacturing-1.jpg", "composites-manufacturing-1.jpg"),
    ("claw", "claw drawing.jpg", "orthographic-drawings-1.jpg"),
]

# panoramas kept at full resolution (never downscaled)
PANO_JOBS = [
    ("electra", "process-infrastructure-2.jpg", "process-infrastructure-360.jpg"),
]

# videos are MOVED into images/videos/ with web-friendly slugs
VIDEO_JOBS = [
    ("claw", "Claw demonstration video.mov", "claw-demonstration.mov"),
    ("claw", "Claw poster video.mp4", "claw-presentation.mp4"),
]

# leftovers from removed projects / reassignments
STALE_PREFIXES = ["product-renders-", "python-automation-", "orthographic-drawings-2", "orthographic-drawings-3"]


def load(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, PAPER)
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


def save_detail(im, name):
    im = ImageOps.contain(im, (MAXD, MAXD), Image.Resampling.LANCZOS)
    out = os.path.join(DETAIL, name)
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return out


def make_thumb(src_path, name):
    im = ImageOps.fit(load(src_path), THUMB, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    out = os.path.join(THUMBS, name)
    im.save(out, "JPEG", quality=80, optimize=True)
    print(f"  thumb  {name:44} {THUMB[0]}x{THUMB[1]}")


def main():
    for d in (DETAIL, THUMBS, PANO, VIDEOS):
        os.makedirs(d, exist_ok=True)

    for key, src_name, dst_name in DETAIL_JOBS:
        src = os.path.join(SRC[key], src_name)
        dst = os.path.join(DETAIL, dst_name)
        im = Image.open(src)
        already_ok = (
            os.path.splitext(src_name)[1].lower() in (".jpg", ".jpeg")
            and max(im.size) <= MAXD
        )
        if already_ok:
            shutil.copyfile(src, dst)
            print(f"  copy   {dst_name:44} {im.size[0]}x{im.size[1]}")
        else:
            out = save_detail(load(src), dst_name)
            print(f"  detail {dst_name:44} {Image.open(out).size[0]}x{Image.open(out).size[1]}")
        make_thumb(dst, dst_name)

    for key, src_name, dst_name in PANO_JOBS:
        src = os.path.join(SRC[key], src_name)
        dst = os.path.join(PANO, dst_name)
        shutil.copyfile(src, dst)
        im = Image.open(dst)
        print(f"  pano   {dst_name:44} {im.size[0]}x{im.size[1]} (full res)")

    for key, src_name, dst_name in VIDEO_JOBS:
        src = os.path.join(SRC[key], src_name)
        dst = os.path.join(VIDEOS, dst_name)
        shutil.move(src, dst)
        print(f"  video  {dst_name:44} {os.path.getsize(dst)//1048576} MB (moved)")

    for folder in (DETAIL, THUMBS, "covers"):
        target = os.path.join(IMG, folder) if folder != "covers" else os.path.join(IMG, folder)
        for f in os.listdir(target):
            if any(f.startswith(p) for p in STALE_PREFIXES):
                os.remove(os.path.join(target, f))
                print(f"  rm     {folder}/{f}")

    print("done")


if __name__ == "__main__":
    main()
