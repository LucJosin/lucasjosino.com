---
title: 'Converting mp4 to GIF'
description: 'Convert a mp4 to GIF using ffmpeg with a good balance between quality and size'
tags:
  - '#snippets'
language: 'en'
isVisible: true
isIndexable: true
enableComments: false
---

Simple code snippet using [ffmpeg](https://ffmpeg.org/) to conert **mp4** to **GIF** with a good balance between quality and size:

```bash "<name>" "<output>" "setpts=PTS/1.5" "fps=24" "scale=720"
ffmpeg -i <name>.mp4 -filter_complex "[0:v]setpts=PTS/1.5,fps=24,scale=720:-1:flags=lanczos,split[x][z];[z]palettegen[y];[x][y]paletteuse" -loop 0 <output>.gif
```

1. **name**: Original mp4 file
2. **setpts**: Video speed
3. **fps**: Frames per second
4. **scale**: Video size
