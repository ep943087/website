class CanvasTools {
  private static HEX_DIGITS: string = "0123456789ABCDEF";

  public static generateRandomColor(): string {
    const color = '#' + Array(6).fill(0).map(() =>
    CanvasTools.HEX_DIGITS[~~(Math.random()*CanvasTools.HEX_DIGITS.length)]
      ).join('');
    return color;
  }
};

export default CanvasTools;