const SCALE_UPPER_BOUND: number = 2;
const SCALE_LOWER_BOUND: number = 1;
const SCALE_FACTOR: number = 0.5;

export class BoardScaleOptions {
  public scaleUpperBound: number;
  public scaleLowerBound: number;
  public scaleFactor: number;

  constructor(options?: Partial<BoardScaleOptions>) {
    this.scaleUpperBound = options?.scaleUpperBound ?? SCALE_UPPER_BOUND;
    this.scaleLowerBound = options?.scaleLowerBound ?? SCALE_LOWER_BOUND;
    this.scaleFactor = options?.scaleFactor ?? SCALE_FACTOR;
  }
}
