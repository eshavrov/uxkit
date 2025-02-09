import { deleteInBuffer, generateValue, getBufferSelection, getCharType, getOnlyValidChars, getValues, insertTextInBuffer, replaceAt } from "./common";

import  type { Values, Selection } from "./common";

export interface InsertTextOptions {
  data: string | null;
  defaultValue: string;
  mask: string;  
  selectionStart: number;
  selectionEnd: number;
  placeholder?: string;
  inputType?: 'insertText' | 'insertFromPaste' | 'deleteContentBackward' | 'deleteSoftLineBackward';
}

interface InsertTextResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

type InsertText = (options: InsertTextOptions) => InsertTextResult;

const calcPosition = (values: Values, { selectionStart, selectionEnd }: Selection) => {
  const {
    mapLeftIndex,
    length,
  } = values;

  if (selectionStart == null) {
    return 0;
  }
  
  if (selectionStart >= length) {
    return length;
  }

  return mapLeftIndex[selectionStart];
}

export const insertText: InsertText = (options) => {
  const {
    selectionStart,
    selectionEnd,
    data: _data,
    defaultValue,
    mask,
    inputType = 'insertText',
    placeholder = '_',
  } = options;

  let value = defaultValue;

  const values = getValues(mask, value, placeholder);

  const insertAction = inputType === 'insertFromPaste' || inputType === 'insertText';
  const deleteAction = inputType === 'deleteContentBackward' || inputType === 'deleteSoftLineBackward';

  const data = typeof _data === 'string' && insertAction ? getOnlyValidChars(_data) : ' ';

  const inputCharType = (insertAction && getCharType(data[0])) || 'undefined';
  
  const cursorPositionStart = calcPosition(values, {
    selectionStart,
    selectionEnd,
  });

  let cursorNextPosition = inputCharType === 'undefined' ? cursorPositionStart: calcPosition(values, {
    selectionStart: cursorPositionStart + 1,
    selectionEnd,
  });

  if (deleteAction) {
    const bufferSelection = getBufferSelection(values, { selectionStart: cursorPositionStart, selectionEnd });
    const { buffer: newBuffer, cursorPosition } = deleteInBuffer(values.buffer, data, bufferSelection);

    cursorNextPosition = values.bufferIndex[cursorPosition];
    value = generateValue(newBuffer, mask, values, placeholder);
  }

  const maskCharType = getCharType(mask[cursorPositionStart]);

  if(insertAction && (inputCharType === 'undefined' || selectionStart > mask.length)) {

    return {
      value,
      selectionStart: cursorNextPosition,
      selectionEnd: cursorNextPosition,
    };
  }

  if (insertAction && maskCharType === inputCharType) {
    const bufferSelection = getBufferSelection(values, { selectionStart: cursorPositionStart, selectionEnd });

    const { buffer: newBuffer, cursorPosition } = insertTextInBuffer(values.buffer, data, bufferSelection);

    cursorNextPosition = values.bufferIndex[cursorPosition];
    value = generateValue(newBuffer, mask, values, placeholder);
  }

  return {
    value,
    selectionStart: cursorNextPosition,
    selectionEnd: cursorNextPosition,
  };
}