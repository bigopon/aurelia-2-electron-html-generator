import { bindable, customElement, BindingStrategy } from "aurelia";
import { areSameFiles } from "./models/file.utils";
import { HtmlTemplate } from "./models/template.models";

export class App {
  message = 'Hello World!';

  files: File[] = [];

  @bindable()
  selectedFile: File = null;

  @bindable()
  selectedTemplate: HtmlTemplate;

  templates: HtmlTemplate[];

  /**
   * Name of new template to be added
   */
  newTemplateName: string;

  constructor() {
    this.templates = [];
    window['app'] = this;
  }

  /**
   * Used to temporarily store value to a file object for the video player
   */
  tempFileUrl: string;

  onAddTemplate(name: string, select: boolean = false): void {
    this.newTemplateName = '';
    const newTemplate = new HtmlTemplate(name, '');
    this.templates.push(newTemplate);
    if (select) {
      this.selectedTemplate = newTemplate;
    }
  }

  selectedTemplateChanged(): void {

  }

  generateTemplate(): void {
    const selectedTemplate = this.selectedTemplate;
    if (!selectedTemplate) {
      console.log('No selected template');
      return;
    }
  }

  onFileListChange(inputEl: HTMLInputElement): void {
    this.addFile(Array.from(inputEl.files));
    inputEl.value = '';
  }

  addFile(files: File | File[]): void {
    const filesAdded: File[] = [];
    files = Array.isArray(files) ? files : [files];
    files.forEach(file => {
      if (!this.hasFile(file)) {
        this.files.push(file);
        filesAdded.push(file);
      }
    });
    if (filesAdded.length > 0) {
      this.onAddedFiles(filesAdded);
    }
  }

  hasFile(file: File): boolean {
    return this.files.some($file => areSameFiles($file, file));
  }

  onAddedFiles(files: File | File[]): void {
    files = Array.isArray(files) ? files : [files];
    if (this.selectedFile === null) {
      this.selectedFile = files[0];
    }
  }

  selectedFileChanged(newFile: File): void {
    if (this.tempFileUrl) {
      URL.revokeObjectURL(this.tempFileUrl);
    }
    if (newFile) {
      this.tempFileUrl = URL.createObjectURL(newFile);
    }
  }

  getFileName(file: File) {
    return file.name;
  }

  toMp3(file: File): void {
    convertVideo(file.path, `${file.name}.mp3`, (...args) => {
      console.log('done')
    })
  }
}
