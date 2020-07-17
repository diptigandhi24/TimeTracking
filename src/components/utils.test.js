import { getTimeStamp } from "./utils";
//This test work for the date I created it , wont work for next day as the date changes
test("get the timeStamp format", () => {
  expect(getTimeStamp("14:20", new Date(1594892750694))).toBe(1594889400000);
});
