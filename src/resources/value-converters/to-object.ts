import { valueConverter } from "aurelia";

@valueConverter('toObject')
export class ToObject {
  fromView(val: string): object {
    return typeof val === 'string' ? JSON.parse(val) : val;
  }
}
