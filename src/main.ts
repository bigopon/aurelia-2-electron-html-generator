import Aurelia from 'aurelia';
import { SaveDialogOptions } from 'electron';
import { App } from './app';

declare global {
  const convertVideo: (file: string, output: string, cb: (...args: unknown[]) => void) => void;

  interface File {
    /**
     * Electron specific property
     */
    path: string;
  }

  const promptSaveFile: (content: string, options: SaveDialogOptions) => Promise<boolean>;
}

Aurelia
  .app({
    component: App,
    host: document.getElementById('app')
  })
  .start();
