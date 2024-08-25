import {Component, Input} from '@angular/core';
import {EditorOptionsModel} from "../../models/editor-options.model";
import {BoardScaleOptions} from "../../models/board-scale.model";

@Component({
  selector: 'app-node-flow-editor',
  templateUrl: './node-flow-editor.component.html',
  styleUrl: './node-flow-editor.component.scss'
})
export class NodeFlowEditorComponent {
  @Input() options: EditorOptionsModel;

  constructor() {
    this.options = new EditorOptionsModel();
  }

  public get boardScaleOptions() {
    return new BoardScaleOptions(this.options.boardScale);
  }
}
