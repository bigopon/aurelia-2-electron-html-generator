import { bindable, customElement, BindingStrategy, JitHtmlBrowserConfiguration } from "aurelia";
import { areSameFiles } from "./models/file.utils";
import { HtmlTemplate } from "./models/template.models";
import { Aurelia } from "@aurelia/runtime";

const DEFAULT_TEMPLATE =
  `<template if.bind="description">
    **Summary:**
    \${description}
  </template>

  **Name:** \${name}
  **Modifiers:** \${modifiers}

  **Members:** 
  <template repeat.for="member of members">
    \${member.text}
  </template>`;

export class App {
  message = 'Hello World!';

  files: File[] = [];

  @bindable()
  selectedFile: File = null;

  @bindable()
  selectedTemplate: HtmlTemplate;

  /**
   * A value generated by the JSON editor value
   */
  readonly viewModelObject: object;

  templates: HtmlTemplate[];

  /**
   * Name of new template to be added
   */
  newTemplateName: string;

  /**
   * Generated template value based on selected template and view model value
   */
  generatedTemplate: string;

  // #example region
  /**
   * Default value to display for json editor to make it less boring
   */
  exampleVmValue: string = `{
    "description": "Hello",
    "name": "Hamed",
    "modifiers": "published",
    "members": [
      {
        "text": "member 1 ready"
      }
    ]
  }`;

  constructor() {
    this.templates = [
      new HtmlTemplate('default', DEFAULT_TEMPLATE)
    ];
    this.selectedTemplate = this.templates[0];
    this.viewModelObject = JSON.parse(this.exampleVmValue);
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
    const viewModelObject = this.viewModelObject;
    if (!viewModelObject) {
      console.log('No view model');
      return;
    }
    const au = this.getAuInstance();
    const host = document.createElement('div');

    @customElement({
      name: 'sub-app',
      template: `<template><template with.bind="viewModelObject">${selectedTemplate.value}</template></template>` })
    class Component {
      viewModelObject: object;
      constructor() {
        this.viewModelObject = viewModelObject;
      }
    }

    au.app({
      host: host,
      component: Component
    });
    au.start();

    this.generatedTemplate = host.innerHTML;
  }

  promptSave(): void {
    promptSaveFile(this.generatedTemplate, {});
  }

  private getAuInstance(): Aurelia {
    const au = new Aurelia();
    au.register(JitHtmlBrowserConfiguration);
    return au;
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
