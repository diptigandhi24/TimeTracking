import { getTimeStamp } from "./utils";

test("get the timeStamp format", () => {
  expect(getTimeStamp("14:20")).toBe(1594889400000);
});
