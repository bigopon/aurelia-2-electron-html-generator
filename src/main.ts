import Aurelia from 'aurelia';
import { App } from './app';

declare global {
  const convertVideo: (file: string, output: string, cb: (...args: unknown[]) => void) => void;

  interface File {
    /**
     * Electron specific property
     */
    path: string;
  }
}

Aurelia
  .app({
    component: App,
    host: document.getElementById('app')
  })
  .start();
