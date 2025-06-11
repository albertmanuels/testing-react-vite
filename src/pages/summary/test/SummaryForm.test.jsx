
import { beforeEach, describe, expect } from "vitest";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../utilities/test-utils/testing-library-utils"

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

  test("confirm button should be enabled when tnc checkbox is checked and vice versa", async () => {
    const user = userEvent.setup()
    
    const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i})
    const buttonElement = screen.getByRole("button", {name: /confirm order/i})

    // initial condition
    expect(checkboxElement).not.toBeChecked()
    expect(buttonElement).toBeDisabled()

    // click unchecked checkbox -> checkbox checked and button enabled
    await user.click(checkboxElement)
    expect(buttonElement).toBeEnabled()

    // click again the checkbox to be unchecked and the button to be disabled
    await user.click(checkboxElement)
    expect(buttonElement).toBeDisabled()
  })

  test("popover response to hover", async () => {
    const user = userEvent.setup()

    const checkboxLabel = screen.getByText(/terms and conditions/i)
    const nullPopoverElement = screen.queryByText(/ice cream/i)

    // popover starts out hidden
    expect(nullPopoverElement).not.toBeInTheDocument()
    await user.hover(checkboxLabel)

    // popover appreas on mouseover of checkbox label
    const popoverElement = screen.getByText(/ice cream/i)
    expect(popoverElement).toBeInTheDocument()

    // popover disappears when we mouse out
    await user.unhover(checkboxLabel)
    expect(nullPopoverElement).not.toBeInTheDocument()
  })
})