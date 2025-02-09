export const replaceAt = (str: string, index: number, replacement: string) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

export const getCharType = (char: string) => {
  if (["0", "9", "1", "2", "3", "4", "5", "6", "7", "8"].includes(char)) {
    return "number";
  }

  return "undefined";
};

/**
 * Returns a string with only valid characters. (temporal only numbers)
 * @example '1 2ef 45' => '125'
 */
export const getOnlyValidChars = (data: string) => [...data].filter((char) => getCharType(char) !== "undefined").join('');


export interface Selection {
  selectionStart: HTMLInputElement["selectionStart"];
  selectionEnd: HTMLInputElement["selectionEnd"];
}

type BufferChar = string | undefined;

export const insertTextInBuffer = (
  bufferOrigin: BufferChar[],
  data: string,
  selection: Selection
) => {
  const length = bufferOrigin.length;

  const { selectionStart, selectionEnd } = selection;

  const positionStart = selectionStart || 0;
  const positionEnd = selectionEnd || 0;

  const buffer = bufferOrigin.slice();

  if (positionEnd > positionStart) {
    for (let indx = positionStart; (indx < positionEnd && indx < length) ; indx++) {
      buffer[indx] = undefined;
    }
  }

  const nullCount = buffer
    .slice(positionStart)
    .filter((v) => v === undefined).length;

  const block = [...data]
    .filter((char) => getCharType(char) !== "undefined")
    .slice(0, nullCount);

  const blockLength = block.length;

  const diff = nullCount - blockLength;

  let indexEnd = undefined;
  let count = 0;

  buffer.toReversed().some((v, index) => {
    if (v === undefined) {
      count++;
    }

    if (count === diff) {
      indexEnd = length - index - 1;
    }

    return false;
  });

  const tail = buffer
    .slice(positionStart, indexEnd)
    .filter((v) => v !== undefined);

  const _block = block.concat(tail);

  const nextBuffer = buffer.slice();

  _block.forEach((char, index) => {
    const indx = positionStart + index;

    if (indx > length - 1) {
      return;
    }

    nextBuffer[indx] = char;
  });

  const cursorPosition = positionStart + blockLength;

  return { buffer: nextBuffer, cursorPosition };
};

export const deleteInBuffer = (
  bufferOrigin: BufferChar[],
  data: string,
  selection: Selection
) => {
  const length = bufferOrigin.length;

  const { selectionStart, selectionEnd } = selection;

  const positionStart = selectionStart || 0;
  const positionEnd = selectionEnd || 0;

  const buffer = bufferOrigin.slice();

  let cursorPosition = positionStart;

  if (positionEnd > positionStart) {
    for (let indx = positionStart; (indx < positionEnd && indx < length) ; indx++) {
      buffer[indx] = undefined;
    }

    cursorPosition = positionStart;
  } else {
    if (selectionStart && selectionStart >= 1) {
      cursorPosition = selectionStart - 1;
      buffer[cursorPosition] = undefined;
    }
  }

  return { buffer, cursorPosition };
};


export type CharType = ReturnType<typeof getCharType>;

export interface Values {
  buffer: BufferChar[];
  bufferIndex: number[];
  bufferType:BufferChar[]
  mapLeftIndex: Record<string, number>;
  mapRightIndex: Record<string, number>;
  mapBufferIndex: Record<string, number>;
  mapBufferRightIndex: Record<string, number>;
  length: number;
  maskType: BufferChar[];
}

export const getMapLeftIndex = (bufferIndex: number[], length: number) => {
  const map = {};
  let prev = 0;

  bufferIndex.forEach((indx) => {
    // @ts-expect-error
    map[indx] = indx;

    for (let i = prev; i < indx; i++) {
      // @ts-expect-error
      map[i] = indx;
    }

    prev = indx + 1;
  });


  return map;
};

export const getMapRightIndex = (bufferIndex: number[], length: number) => {
  const map = {};

  let prev = length;
  const a = bufferIndex.toReversed();

  a.forEach((indx, index) => {
    const rightIndex = indx + 1;
    // @ts-expect-error
    map[indx] = indx;
    // @ts-expect-error
    map[rightIndex] = rightIndex;

    for (let i = prev; i > indx; i--) {
      // @ts-expect-error
      map[i] = rightIndex;
    }

    prev = indx-1;
  });

  for (let i = 0; i<= prev; i++) {
    // @ts-expect-error
    map[i] = bufferIndex[0];
  }

  return map;
};

export const getValues = (mask: string, value: string, placeholder = "_") => {
  const length = mask.length;

  const result = [...mask].reduce<Values>(
    (acc, maskChar, index) => {
      const maskCharType = getCharType(maskChar);

      if (maskCharType !== "undefined") {
        const char = value[index];

        acc.buffer.push(char === placeholder ? undefined : char);
        acc.bufferIndex.push(index);
        acc.bufferType.push(maskCharType);
        acc.mapBufferIndex[index] = acc.buffer.length - 1;
      }

      acc.mapBufferIndex[length] = acc.buffer.length;
      acc.maskType.push(maskCharType);

      return acc;
    },
    { buffer: [], bufferIndex: [], bufferType: [], length, mapLeftIndex: {}, mapRightIndex: {}, mapBufferIndex: {}, mapBufferRightIndex: {}, maskType: [] }
  );

  result.mapBufferRightIndex = Object.assign({}, result.mapBufferIndex, {
    [(result.bufferIndex.at(-1) ?? 0)+1]: result.buffer.length, 
  });

  let _i = 0;

  for (let i=0; i<length; i++) {
    if (result.mapBufferRightIndex[i] == null) {
      result.mapBufferRightIndex[i] = _i;
    } else{
      _i = result.mapBufferRightIndex[i]+1;
    }

  }

  result.bufferIndex[result.buffer.length] = (result.bufferIndex.at(-1) ?? 0) + 1;
  result.mapRightIndex = getMapRightIndex(result.bufferIndex, length);
  result.mapLeftIndex = getMapLeftIndex(result.bufferIndex, length);

  return result;
};

export const generateValue = (buffer: BufferChar[], mask: string, values: Values, placeholder = '_') => {

  const result = [...mask].map((maskChar, index) => {
    const bufferIndex = values.mapBufferIndex[index];

    if (bufferIndex != null) {
      return buffer[bufferIndex] ?? placeholder;
    }

    return maskChar;
  })

  return result.join('');
}

type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export const getBufferSelection = (values: Values, {selectionStart,selectionEnd}: NoUndefinedField<Selection>) => ({
  selectionStart: values.mapBufferIndex[values.mapLeftIndex[selectionStart]] ?? 0,
  selectionEnd: values.mapBufferRightIndex[values.mapRightIndex[selectionEnd]] ?? 0,
});
