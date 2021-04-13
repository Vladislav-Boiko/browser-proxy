import { saveAs } from 'file-saver';

export const exportAsFile = (json, filename) => {
  const asString = JSON.stringify(json, null, 2);
  const blob = new Blob([asString], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename + '.json');
};
