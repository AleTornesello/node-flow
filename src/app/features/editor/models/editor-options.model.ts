import {BoardScaleOptions} from "./board-scale.model";

export class EditorOptionsModel {
  public boardScale: Partial<BoardScaleOptions>;

  constructor(options?: Partial<EditorOptionsModel>) {
    this.boardScale = new BoardScaleOptions(options?.boardScale);
  }
}
