import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer from "react-test-renderer";

describe("<App />", () => {
  it("Renders <App /> without crashing", () => {
    render(<App />);
    expect(screen.getByText(/a url shortener/i)).toBeInTheDocument();
  });
});

test("it matches snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
