// Copyright 2023 Paion Data. All rights reserved.
function measureTextWidthByCanvas(text: string, font: string, context: CanvasRenderingContext2D): number {
  context.font = font;
  return context.measureText(text).width;
}

function cacheTextWidth() {
  const CATCH_SIZE = 100000;
  const textMeasureMap: Record<string, number> = {};
  const lruKeyList: string[] = [];
  return (key: string, calculate: () => number) => {
    const cached = textMeasureMap[key];
    if (cached) {
      return cached;
    } else {
      const result = calculate();
      if (lruKeyList.length > CATCH_SIZE) {
        delete textMeasureMap[lruKeyList.splice(0, 1).toString()];
        lruKeyList.push(key);
      }
      return (textMeasureMap[key] = result);
    }
  };
}

export function measureText(
  text: string,
  fontFamily: string,
  fontSize: number,
  canvas2DContext: CanvasRenderingContext2D
): number {
  const font = `normal normal normal ${fontSize}px/normal ${fontFamily}`;
  return cacheTextWidth()(`[${font}][${text}]`, () => measureTextWidthByCanvas(text, font, canvas2DContext));
}
