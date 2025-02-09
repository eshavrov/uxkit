import { getMapRightIndex, getValues, insertTextInBuffer } from "./common";

const _ = undefined;

describe("insertTextInBuffer", () => {
  it('case 1', () => {
    const result = insertTextInBuffer([_, _, _, _], '9', { selectionStart: 0, selectionEnd: 0 });

    expect(result.buffer).toEqual(['9', _, _, _]);
  });

  it('case 2', () => {
    const result = insertTextInBuffer([_, _, _, _], '987', { selectionStart: 0, selectionEnd: 0 });

    expect(result.buffer).toEqual(['9', '8', '7', _]);
  });

  it('case 3', () => {
    const result = insertTextInBuffer([_, _, '1', _], '98', { selectionStart: 0, selectionEnd: 0 });

    expect(result.buffer).toEqual(['9', '8', '1', _]);
  });

  it('case 4', () => {
    const result = insertTextInBuffer([_, _, _, _], '0', { selectionStart: 3, selectionEnd: 3 });

    expect(result.buffer).toEqual([_, _, _, '0']);
  });

  it('case 5', () => {
    const result = insertTextInBuffer([_, _, _, _], '0123', { selectionStart: 3, selectionEnd: 3 });

    expect(result.buffer).toEqual([_, _, _, '0']);
  });

  it("case shift 1", () => {
    const result = insertTextInBuffer(["1", _, _, _], "0", {
      selectionStart: 0,
      selectionEnd: 0,
    });

    expect(result.buffer).toEqual(["0", "1", _, _]);
  });

  it("case shift 2", () => {
    const result = insertTextInBuffer(
      ["-2", _, "-1", _, "0", _, _, "9", _, "8", _, _, "7", _, "6", _, _, _],
      "12345678",
      { selectionStart: 5, selectionEnd: 5 }
    );

    expect(result.buffer).toEqual(["-2", _, "-1", _, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "8", "7", "6", _]);
  });

  it("case shift 3", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3", "4", _, "5"],
      "12345678",
      { selectionStart: 0, selectionEnd: 0 }
    );

    expect(result.buffer).toEqual(["1", "2", "3", "1", "2", "3", "4", "5"]);
  });

  it("case selection (1 char)", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3"],
      "0",
      { selectionStart: 1, selectionEnd: 2 }
    );

    expect(result.buffer).toEqual(["1", "0", "2", _, "3"]);
  });

  it("case selection (to end char)", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3"],
      "12",
      { selectionStart: 1, selectionEnd: 5 }
    );

    expect(result.buffer).toEqual(["1", "1", "2", _, _]);
  });

  it("case selection (selectionEnd is out of range on the right)", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3"],
      "12",
      { selectionStart: 1, selectionEnd: 8 }
    );

    expect(result.buffer).toEqual(["1", "1", "2", _, _]);
  });

  it("case selection (selectionEnd is out of range on the right)", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3"],
      "123",
      { selectionStart: 0, selectionEnd: 8 }
    );

    expect(result.buffer).toEqual(["1", "2", "3", _, _]);
  });

  it("case selection (selectionStart and selectionEnd are out of range on the right)", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3"],
      "123",
      { selectionStart: 7, selectionEnd: 18 }
    );

    expect(result.buffer).toEqual(["1", _, "2", _, "3"]);
  });


  it("case selection (selectionStart and selectionEnd are out of range on the right)", () => {
    const result = insertTextInBuffer(
      ["1", _, "2", _, "3"],
      "123",
      { selectionStart: 7, selectionEnd: 18 }
    );

    expect(result.buffer).toEqual(["1", _, "2", _, "3"]);
  });

  it("getMapRightIndex", () => {
    const result  = getMapRightIndex([ 1, 3, 5 ], 7);

    expect(result).toEqual({ '0': 1, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 6 });
  });

  it("getValues mapLeftIndex & mapRightIndex", () => {
    const values  = getValues('(0)1-2', '(_)_-_');

    expect(values.mapLeftIndex).toEqual({ '0': 1, '1': 1, '2': 3, '3': 3, '4': 5, '5': 5, '6': 6 });
    expect(values.mapRightIndex).toEqual({ '0': 1, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7 });
  });

  it("getValues mapLeftIndex & mapRightIndex #2", () => {
    const values  = getValues('(0)1-2', '((_)_-_)end');

    expect(values.mapLeftIndex).toEqual({ '0': 1, '1': 1, '2': 3, '3': 3, '4': 5, '5': 5, '6': 6 });
    expect(values.mapRightIndex).toEqual({ '0': 1, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7 });
  });
});
