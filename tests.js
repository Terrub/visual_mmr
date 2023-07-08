import { CertaintyGraph } from "./actors/certaintyGraph.js";
import { TestBot } from "./testBot/testBot.js";
// import { Utils } from "../utils.js";

const resultsContainer = document.createElement("div");
document.body.appendChild(resultsContainer);

const resultRenderer = TestBot.renderResultsInDiv(resultsContainer);

const testRunner = new TestBot(resultRenderer);

const assertEqualsTest = testRunner.createSuite("Tests assertStrictlyEquals");
assertEqualsTest.addTest(
  "Test assert strictly equals succeeding shows green",
  () => {
    const expected = "foo";
    const actual = "foo";

    testRunner.assertStrictlyEquals(expected, actual);
  }
);

// CERTAINTYGRAPH TESTS

const certaintyGraphTests = testRunner.createSuite("Tests certaintyGraph");

certaintyGraphTests.addTest("It has a property 'x' that defaults to 0", () => {
  const mockGL = {};
  const cGraph = new CertaintyGraph(mockGL, 100, 200, 1);

  const expected = 0;
  const actual = cGraph.x;

  testRunner.assertStrictlyEquals(expected, actual);
});

certaintyGraphTests.addTest("It has a property 'y' that defaults to 0", () => {
  const mockGL = {};
  const cGraph = new CertaintyGraph(mockGL, 100, 200, 1);

  const expected = 0;
  const actual = cGraph.y;

  testRunner.assertStrictlyEquals(expected, actual);
});

certaintyGraphTests.addTest("It has a property 'w' that can be set", () => {
  const mockGL = {};
  const cGraph = new CertaintyGraph(mockGL, 100, 200, 1);

  const expected = 100;
  const actual = cGraph.w;

  testRunner.assertStrictlyEquals(expected, actual);
});

certaintyGraphTests.addTest("It has a property 'h' that can be set", () => {
  const mockGL = {};
  const cGraph = new CertaintyGraph(mockGL, 100, 200, 1);

  const expected = 200;
  const actual = cGraph.h;

  testRunner.assertStrictlyEquals(expected, actual);
});

testRunner.run();
