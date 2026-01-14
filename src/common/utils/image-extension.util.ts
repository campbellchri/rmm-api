export function imageMimeTypeToExtension(mimeType: string): string {
  switch (mimeType) {
    case 'image/bmp':
      return 'bmp';
    case 'image/cis-cod':
      return 'cod';
    case 'image/gif':
      return 'gif';
    case 'image/ief':
      return 'ief';
    case 'image/jpeg':
      return 'jpeg';
    case 'image/pipeg':
      return 'jfif';
    case 'image/svg+xml':
      return 'svg';
    case 'image/tiff':
      return 'tiff';
    case 'image/x-cmu-raster':
      return 'ras';
    case 'image/x-cmx':
      return 'cmx';
    case 'image/x-icon':
      return 'ico';
    case 'image/x-portable-anymap':
      return 'pnm';
    case 'image/x-portable-bitmap':
      return 'pbm';
    case 'image/x-portable-graymap':
      return 'pgm';
    case 'image/x-portable-pixmap':
      return 'ppm';
    case 'image/x-rgb':
      return 'rgb';
    case 'image/x-xbitmap':
      return 'xbm';
    case 'image/x-xpixmap':
      return 'xpm';
    case 'image/x-xwindowdump':
      return 'xwd';
    default:
      return 'jpeg';
  }
}
