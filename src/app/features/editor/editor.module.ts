import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NodeFlowEditorComponent} from "./components/node-flow-editor/node-flow-editor.component";
import {EditorBoardComponent} from "./components/editor-board/editor-board.component";



@NgModule({
  declarations: [
    NodeFlowEditorComponent,
    EditorBoardComponent
  ],
  exports: [
    NodeFlowEditorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditorModule { }
