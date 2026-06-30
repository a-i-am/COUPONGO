import React from 'react';

export default function SpriteAnimator({
  src,
  width = 64,
  height = 64,
  cols = 3,
  rows = 4,
  row = 0,
  frame = 0,
  scale = 1
}) {
  const frameWidth = 100 / (cols - 1 || 1);
  const frameHeight = 100 / (rows - 1 || 1);

  return (
    <div
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: `${cols * 100}% ${rows * 100}%`,
        backgroundPosition: `${frame * frameWidth}% ${row * frameHeight}%`,
        imageRendering: 'pixelated'
      }}
    />
  );
}
