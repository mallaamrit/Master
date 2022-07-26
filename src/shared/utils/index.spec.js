import { looseIndexOf } from "./index";

describe("Utils functions", () => {
  it("looseIndexOf", () => {
    // for array of strings ['1', '2', '3'] the index of number 1 must be 0 and vice versa
    const arr = ["1", "2", "3"];
    const value = 1;
    const index = looseIndexOf(arr, value);
    expect(index).toBe(0);

    const arr2 = [1, 2, 3];
    const value2 = "2";
    const index2 = looseIndexOf(arr2, value2);
    expect(index2).toBe(1);
  });
});
