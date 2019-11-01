// imported as different name so it doesn't conflict with the global declaration `monaco`
import * as $monaco from 'monaco-editor';
import { bindable, BindingMode, INode } from 'aurelia';
// / <reference path="monaco.d.ts" />

export class MonacoEditor {

  private editor: $monaco.editor.IStandaloneCodeEditor | null;

  private shouldNotify: boolean;

  @bindable({
    mode: BindingMode.twoWay
  })
  public value: string;

  @bindable()
  public language: string;

  @bindable()
  public options: object;

  public constructor(
    @INode public readonly el: HTMLElement
  ) {
    this.shouldNotify = false;
  }

  /**
   * Aurelia lifecycle
   */
  public binding(): void {
    this.createEditor();
  }

  public unbinding(): void {
    const editor = this.editor;
    if (editor !== null) {
      editor.dispose();
      this.editor = null;
    }
  }

  public valueChanged(newValue: string): void {
    if (!this.shouldNotify) {
      return;
    }
    const editor = this.editor;
    if (editor !== null) {
      editor.setValue(String(newValue));
    }
  }

  private setValueSilent(value: string): void {
    this.shouldNotify = false;
    this.value = value;
    this.shouldNotify = true;
  }

  private createEditor(): void {
    if (this.validateLanguage()) {
      this.editor = monaco.editor.create(this.el, {
        value: this.value || '',
        language: this.language,
        automaticLayout: true,
        minimap: {
          enabled: false,
        }
      });
      this.editor.onDidChangeModelContent(e => {
        this.setValueSilent(this.editor.getValue());
      });
    }
  }

  private validateLanguage(): boolean {
    switch (this.language) {
      case 'html':
      case 'js':
        return true;
      default:
        return false;
    }
  }
}
