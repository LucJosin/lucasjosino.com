interface FontsProps {
  normal: ArrayBuffer;
  bold: ArrayBuffer;
}

export default async function getFonts(): Promise<FontsProps> {
  // Regular Font
  const fontFileRegular = await fetch(
    'https://www.1001fonts.com/download/font/roboto.regular.ttf'
  );
  const normal: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    'https://www.1001fonts.com/download/font/roboto.bold.ttf'
  );
  const bold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { normal, bold };
}
