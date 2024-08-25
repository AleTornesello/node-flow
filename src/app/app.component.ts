import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EditorModule} from "./features/editor/editor.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
