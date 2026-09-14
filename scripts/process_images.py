"""Process source images into optimized covers (1200x800, uniform aspect)
and detail images (max 1400px long edge) for the portfolio site.

Cover modes:
  cover   - fill 1200x800, center crop (photos, renders)
  plate   - contain on paper background with hairline border (drawings, P&IDs, briefs)
"""
import os
from PIL import Image, ImageOps

SRC = r"C:\Users\lundh\Jack\Work\Portfolio\Images\Engineering"
OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COVERS = os.path.join(OUT, "images", "covers")
DETAIL = os.path.join(OUT, "images", "detail")

PAPER = (245, 242, 234)     # matches --paper-tint used in CSS
HAIRLINE = (214, 208, 195)

CW, CH = 1200, 800          # cover canvas
MAXD = 1400                 # detail long edge


def load(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, PAPER)
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


def save(im, path, quality=82):
    im = ImageOps.strip_metadata(im) if hasattr(ImageOps, "strip_metadata") else im
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    kb = os.path.getsize(path) // 1024
    print(f"  {os.path.basename(path):48} {im.size[0]}x{im.size[1]}  {kb} KB")


def cover_crop(im, mode):
    if mode == "cover":
        im = ImageOps.fit(im, (CW, CH), Image.LANCZOS, centering=(0.5, 0.42))
        return im
    # plate: contain with margins on paper, hairline border
    canvas = Image.new("RGB", (CW, CH), PAPER)
    margin = 56
    im2 = ImageOps.contain(im, (CW - 2 * margin, CH - 2 * margin), Image.LANCZOS)
    x = (CW - im2.size[0]) // 2
    y = (CH - im2.size[1]) // 2
    canvas.paste(im2, (x, y))
    px = canvas.load()
    # 1px hairline around the matted image
    for i in range(-1, im2.size[0] + 1):
        for j in (-2, -1, im2.size[1], im2.size[1] + 1):
            if 0 <= x + i < CW and 0 <= y + j < CH:
                px[x + i, y + j] = HAIRLINE
    for j in range(-1, im2.size[1] + 1):
        for i in (-2, -1, im2.size[0], im2.size[0] + 1):
            if 0 <= x + i < CW and 0 <= y + j < CH:
                px[x + i, y + j] = HAIRLINE
    return canvas


def detail(im):
    im = ImageOps.contain(im, (MAXD, MAXD), Image.LANCZOS)
    return im


# slug: (cover_source, cover_mode, [detail sources])
JOBS = {
    # ---- EXP ----
    "water-treatment-plant": ("EXP/3D Model Water Treatment Facility.png", "plate",
        ["EXP/3D Model Water Treatment Facility.png", "EXP/P&ID for Water Treatment Facility.png"]),
    "process-infrastructure": ("EXP/ontario-refinery.jpg", "cover",
        ["EXP/ontario-refinery.jpg", "EXP/sv360-CIABIhAPl_6l-Jf1FzBg8mBzY8JN-20260911-160350.jpg"]),
    "lift-station-design": ("EXP/KL Lift Station.png", "plate",
        ["EXP/KL Lift Station.png", "EXP/KL Lift Station Design Brief.png", "EXP/IF Lift Station.png"]),
    "network-modeling": ("Screenshot 2025-08-19 114243.png", "plate",
        ["Screenshot 2025-08-19 114243.png", "Forcemain Excel Sheet.png"]),
    "python-automation": ("EXP/Screenshot 2025-08-19 112959.png", "cover",
        ["EXP/Screenshot 2025-08-19 112959.png", "EXP/Screenshot 2025-08-19 112915.png",
         "EXP/Screenshot 2025-08-19 113106.png"]),
    # ---- School ----
    "orthographic-drawings": ("School Projects/A8_Module5_OrthographicDrawings conv 0.jpeg", "plate",
        ["School Projects/A8_Module5_OrthographicDrawings conv 0.jpeg"]),
    "product-renders": ("School Projects/Toothpaste2.png", "cover",
        ["School Projects/Toothpaste1.png", "School Projects/Toothpaste2.png",
         "School Projects/Toothpaste3.png"]),
    # ---- SUBC ----
    "human-powered-submarine": ("SUBC/Sub_in_water.jpg", "cover",
        ["SUBC/Sub_in_water.jpg", "SUBC/SUBC1.jpg", "SUBC/SUBC2.jpg", "SUBC/SUBC3.jpg"]),
    "propeller-design": ("SUBC/Propellor.png", "cover",
        ["SUBC/Propellor.png", "SUBC/Propellor With Lines.png", "SUBC/Lines from Openprop.png",
         "SUBC/Motion Study.png"]),
    "composites-manufacturing": ("SUBC/IMG_0798.jpg", "plate",
        ["SUBC/IMG_0798.jpg"]),
}

if __name__ == "__main__":
    for slug, (cover_src, mode, detail_srcs) in JOBS.items():
        print(slug)
        save(cover_crop(load(os.path.join(SRC, cover_src)), mode),
             os.path.join(COVERS, f"{slug}.jpg"), quality=80)
        for i, ds in enumerate(detail_srcs, 1):
            save(detail(load(os.path.join(SRC, ds))),
                 os.path.join(DETAIL, f"{slug}-{i}.jpg"))
    print("done")
