import { insertText } from './insertText';

export const typer = (str: string, mask: string, {value, selectionStart, selectionEnd = selectionStart }: any = {} ) => {
  let res = {
    value: value || mask.replace(/\d/g, '_'),
    selectionStart:  selectionStart || 0,
    selectionEnd: selectionEnd || 0,
  }; 

  [...str].forEach((char)=>{
    res = insertText({
      selectionStart: res.selectionStart,
      selectionEnd: res.selectionEnd,
      data: char,
      defaultValue: res.value,
      mask,
    });

  });

  return res;
}

describe('insertText', () => {
  it('case 1', () => {
    const result = insertText({
      selectionStart: 0,
      selectionEnd: 0,
      data: '1',
      defaultValue: '(___)___-______',
      mask:'(999)999-999999',
    });

    expect(result).toEqual({
      value: '(1__)___-______',
      selectionStart: 2,
      selectionEnd: 2,
    });
  });

  it('case 2', () => {
    const result = insertText({
      selectionStart: 0,
      selectionEnd: 0,
      data: '(',
      defaultValue: '(___)___-______',
      mask:'(999)999-999999',
    });

    expect(result).toEqual({
      value: '(___)___-______',
      selectionStart: 1,
      selectionEnd: 1,
    });
  });

  it('case 3', () => {
    const result = typer('1234567890123', '(999) 999-9999');

    expect(result).toEqual({
      value: '(123) 456-7890',
      selectionStart: 14,
      selectionEnd: 14,
    });
  });

  it('case 3', () => {
    const result = typer('1234567890123', '(999) 999-9999', { selectionStart: 2});

    expect(result).toEqual({
      value: '(_12) 345-6789',
      selectionStart: 14,
      selectionEnd: 14,
    });
  });
});
