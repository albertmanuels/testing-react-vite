
import { beforeEach, describe, expect, test } from "vitest";
import App from "./App";
import {  fireEvent, render, screen} from "@testing-library/react";
import { kebabCaseToTitleCase } from "./helpers";

describe("App wrapper", () => {
  beforeEach(() => {
    render(<App/>)
  })

  test("should render initial button color properly and initially disabled", () => {
    const buttonElement = screen.getByRole("button", {name: /blue/i})

    expect(buttonElement).toHaveClass("medium-violet-red")
  })

  test("checkbox flow", () => {
    const buttonElement = screen.getByRole("button", {name: /blue/i})
    const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i})

    // check if button enabled, have class red, and checkbox unchecked initially
    expect(buttonElement).toBeEnabled()
    expect(buttonElement).toHaveClass("medium-violet-red")
    expect(checkboxElement).not.toBeChecked()

    // check checkbox and the button will disabled
    fireEvent.click(checkboxElement)
    expect(checkboxElement).toBeChecked()
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveClass("gray")
  })

  test("checkbox flow after button click", () => {
    const buttonElement = screen.getByRole("button", {name: /blue/i})
    const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i})

    fireEvent.click(buttonElement)
    expect(buttonElement).toHaveClass("midnight-blue")
    expect(buttonElement).toHaveTextContent(/red/i)

    fireEvent.click(checkboxElement)
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveClass("gray")

    fireEvent.click(checkboxElement)
    expect(buttonElement).toBeEnabled()
    expect(buttonElement).toHaveClass("midnight-blue")
  })
})

describe("kebabCaseToTitleCase", () => {
  test("color name with no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red")
  })

  test("color name with one hyphen", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue")
  })

  test("color name with multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red")
  })
})