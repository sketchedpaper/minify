import React from "react";
import ReactDOM from "react-dom";
import { AliasForm } from "./aliasForm";
import {
  render,
  fireEvent,
  getByTestId,
  within,
  screen,
} from "@testing-library/react";
import renderer from "react-test-renderer";

import "@testing-library/jest-dom/extend-expect";

describe("<App />", () => {
  it("Renders <App /> without crashing", () => {
    render(<AliasForm />);
    expect(screen.getByText(/copy/i)).toBeInTheDocument();
  });
});

it("check if form displays", () => {
  const { getByTestId } = render(<AliasForm />);
  const toBeShortened = getByTestId("toBeShortenedField");
  const shortUrl = getByTestId("shortUrlField");
  const copyButton = getByTestId("copyButton");
  const requestButton = getByTestId("requestButton");

  expect(toBeShortened).toBeInTheDocument();
  expect(shortUrl).toBeInTheDocument();
  expect(copyButton).toBeInTheDocument();
  expect(requestButton).toBeInTheDocument();
});

it("disables submit if url is invalid", () => {
  const { getByTestId } = render(<AliasForm />);

  const contentInput = getByTestId("toBeShortenedField");
  const requestButton = getByTestId("requestButton");
  const copyButton = getByTestId("copyButton");

  fireEvent.change(contentInput, {
    target: { value: "oogle.com" },
  });
  expect(requestButton.disabled).toBe(true);
  expect(copyButton.disabled).toBe(true);
});

it("enables submit if url is valid", () => {
  const { getByTestId } = render(<AliasForm />);

  const contentInput = getByTestId("toBeShortenedField");
  const contentOutput = getByTestId("shortUrlField");
  const requestButton = getByTestId("requestButton");
  const copyButton = getByTestId("copyButton");

  fireEvent.change(contentInput, {
    target: { value: "https://google.com" },
  });

  expect(contentInput.value).toBe("https://google.com");
  expect(requestButton.disabled).toBe(false);
  expect(copyButton.disabled).toBe(true);
  fireEvent.click(requestButton);
  expect(requestButton.disabled).toBe(true);
  expect(copyButton.disabled).toBe(false);
});

test("it matches snapshot", () => {
  const tree = renderer.create(<AliasForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
