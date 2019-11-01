import { valueConverter } from "aurelia";

@valueConverter('toObject')
export class ToObject {
  fromView(val: string): object {
    return typeof val === 'string'
      ? tryParse(val)
      : val;
  }
}

function tryParse(val: string) {
  try {
    return JSON.parse(val);
  } catch {
    return {}
  }
}
