class CanvasTools {
  private static HEX_DIGITS: string = "0123456789ABCDEF";

  public static generateRandomColor(): string {
    const color = '#' + Array(6).fill(0).map(() =>
    CanvasTools.HEX_DIGITS[~~(Math.random()*CanvasTools.HEX_DIGITS.length)]
      ).join('');
    return color;
  }

  public static drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color?: string) {
    if (color) {
      ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  public static drawRectWithOutline(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color?: string) {
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.fillRect(x+1, y+1, width-2, height-2);
  }

  public static drawRectFromCenter(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color?: string, fill: boolean = true) {
    if (color) {
      ctx.fillStyle = ctx.strokeStyle = color;
    }
    if (fill) {
      ctx.fillRect(x-width/2, y-height/2, width, height);
    } else {
      ctx.strokeRect(x-width/2, y-height/2, width, height);
    }
  }

  public static drawImageFromCenter(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, width: number, height: number) {
    ctx.drawImage(img, x-width/2, y-height/2, width, height);
  }

  public static addLeadingZeroesToNumber(num: number, leadingZeroes: number): string {
    const zeroes: string = Array(leadingZeroes).fill('0').join('');
    return (zeroes+num.toString()).slice(-leadingZeroes);
  }
};

export default CanvasTools;