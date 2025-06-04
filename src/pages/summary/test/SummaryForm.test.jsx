import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import SummaryForm from "../SummaryForm";

describe("Summary Form", () => {
  beforeEach(() => {
    render(<SummaryForm/>)
  })

  test("tnc checkbox should be unchecked and confirm button should be disabled initially", () => {
    const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i})
    const buttonElement = screen.getByRole("button", {name: /confirm order/i})

    expect(checkboxElement).not.toBeChecked()
    expect(buttonElement).toBeDisabled()
  })

  test("confirm button should be enabled when tnc checkbox is checked and vice versa", () => {
    const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i})
    const buttonElement = screen.getByRole("button", {name: /confirm order/i})

    // initial condition
    expect(checkboxElement).not.toBeChecked()
    expect(buttonElement).toBeDisabled()

    // click unchecked checkbox -> checkbox checked and button enabled
    fireEvent.click(checkboxElement)
    expect(buttonElement).toBeEnabled()

    // click again the checkbox to be unchecked and the button to be disabled
     fireEvent.click(checkboxElement)
    expect(buttonElement).toBeDisabled()
  })
})