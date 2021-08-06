// importing component to test (react must be in scope)
import App from "../components/App";
import React from "react";
import "react-redux";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Input button", () => {
  test("level 4 is checked when clicked", () => {
    render(<App />);
    const level4Radio = screen.getByRole("radio", { name: /4/ });
    userEvent.click(level4Radio);
    // check if it is checked
    expect(level4Radio).toBeChecked();
  });
  test("butterfly is checked when clicked", () => {
    render(<App />);
    const butterflyCheckbox = screen.getByRole("checkbox", {
      name: /Butterfly/,
    });
    userEvent.click(butterflyCheckbox);
    // check if it is checked
    expect(butterflyCheckbox).toBeChecked();
  });
  test("arms is checked when clicked", () => {
    render(<App />);
    const armsCheckbox = screen.getByRole("checkbox", { name: /Arms/ });
    userEvent.click(armsCheckbox);
    // check if it is checked
    expect(armsCheckbox).toBeChecked();
  });
});

describe("When form is submitted,", () => {
  test("it is no longer displayed in the document", async () => {
    render(<App />);
    const submitButton = screen.getByTestId("submit-button");
    userEvent.click(submitButton);
    // the form is not removed from the DOM!!
    // screen.debug(document, 20000);
    // however, we can check the classname of form is hidden now (display: none)
    const form = screen.getByRole("form");
    expect(form).toHaveClass("hidden");
    // screen.debug(form, 20000);
    // console.log(form.classList.value, form.classList.contains('hidden'));
  });
  test("div wrapping (generate again) and (reset options) buttons is displayed in the document", () => {
    render(<App />);
    const submitButton = screen.getByTestId("submit-button");
    userEvent.click(submitButton);
    const buttonsWrapper = screen.getByTestId("buttons-wrapper");
    expect(buttonsWrapper).not.toHaveClass("hidden");
  });
  test("and reset button is clicked, it causes the form to be displayed again", () => {
    render(<App />);
    const submitButton = screen.getByTestId("submit-button");
    userEvent.click(submitButton);
    const resetButton = screen.getByRole("button", { name: /Reset/ });
    userEvent.click(resetButton);
    const form = screen.getByRole("form");
    expect(form).not.toHaveClass("hidden");
  });
  test("but no strokes are selected, the form is still rendered", () => {
    render(<App />);
    // deselecting freestyle (checked by default)
    const freestyleCheckbox = screen.getByRole("checkbox", {
      name: /Freestyle/,
    });
    userEvent.click(freestyleCheckbox);
    expect(freestyleCheckbox).not.toBeChecked();
    const submitButton = screen.getByTestId("submit-button");
    userEvent.click(submitButton);
    // validation logic prevents generating a training
    const form = screen.getByRole("form");
    expect(form).not.toHaveClass("hidden");
  });
});
