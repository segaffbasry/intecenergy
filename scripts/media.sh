#!/bin/sh
# Rebuilds public/media from the raw downloads in _scrape/raw (see README). Needs ffmpeg and cwebp-capable ffmpeg.
set -e
cd "$(dirname "$0")/.."
R=_scrape/raw; O=public/media; mkdir -p $O

# Hero loop: the live homepage's own Vimeo background (953653676), muted, 14.4s.
ffmpeg -v error -y -i $R/hero.mp4 -an -vf "scale=1600:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart $O/hero.mp4
ffmpeg -v error -y -i $R/hero.mp4 -an -vf "scale=960:-2" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart $O/hero-sm.mp4
ffmpeg -v error -y -ss 1.0 -i $R/hero.mp4 -frames:v 1 -vf scale=1600:-2 -q:v 4 $O/hero-poster.jpg

# Company film: "INTEC Energy Solutions EN" from the INTEC YouTube channel (-2wNHtSDGPE), 720p with sound.
ffmpeg -v error -y -i $R/film.mp4 -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 34 -maxrate 700k -bufsize 1400k -pix_fmt yuv420p -c:a aac -b:a 80k -movflags +faststart $O/film.mp4
# Muted preview loop for the film block (golden-hour aerials, 52s to 60s; the burned-in captions are cropped off).
ffmpeg -v error -y -ss 54 -t 6 -i $R/film.mp4 -an -vf "crop=iw:ih*0.77:0:ih*0.115,scale=1280:-2" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart $O/film-loop.mp4
ffmpeg -v error -y -ss 57 -i $R/film.mp4 -frames:v 1 -vf "crop=iw:ih*0.77:0:ih*0.115,scale=1600:-2" -q:v 4 $O/film-poster.jpg

# Service stills, from the hero loop and the film (film frames cropped clear of the watermark and captions).
still() { ffmpeg -v error -y -ss $2 -i $R/$1 -frames:v 1 -vf "$3,scale=1400:-2" -q:v 4 $O/$4.jpg; }
still hero.mp4 2.6 "crop=iw:ih:0:0" svc-epc
still hero.mp4 5.6 "crop=iw:ih:0:0" svc-bess
still hero.mp4 12.6 "crop=iw:ih:0:0" svc-development
still film.mp4 88 "crop=iw*0.84:ih*0.77:0:ih*0.115" svc-om
still hero.mp4 8.4 "crop=iw:ih:0:0" svc-consultancy
still film.mp4 22 "crop=iw*0.84:ih*0.77:0:ih*0.115" svc-new-energy
still hero.mp4 4.2 "crop=iw:ih:0:0" lake

# Live-site photography, resized.
img() { ffmpeg -v error -y -i "$R/$1" -vf "scale='min($3,iw)':-2" -q:v 4 $O/$2.jpg; }
img iza-crop-3.jpg about 1200
img United-Kingdom.jpg p-uk 1200
img Brecks.jpg p-brecks 1200
img Lahendorf_web.jpg p-lachendorf 1200
img I_B-W_w.jpg p-bad-wildungen 1200
img BESS_1024px-1.jpg p-woolooga 1200
img new-zealand-1.jpg p-kowhai 1200
img Press_Release_Cover_EN.jpg news 1200
img intec-career.png career 1200
cp $R/INTEC-project-map_20241031.png $O/map.png
