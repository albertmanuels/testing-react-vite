import userEvent from "@testing-library/user-event"
import { expect, test } from "vitest"
import {render, screen} from "../../../utilities/test-utils/testing-library-utils"
import ScoopOption from "../ScoopOption"
import { act } from "react"

describe('Scoop Options', () => { 
  test("indicate if scoop count it non-init or out of range", async () => {
    const user = userEvent.setup()

    render(<ScoopOption name="Vanilla"/>)

    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})

    // expect input to be invalid with negative number
    await act(async() => {
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "-1")
    })
    expect(vanillaInput).toHaveClass("is-invalid")

    // expect input to be invalid with decimal number
    await act(async() => {
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "2.5")
    })
    expect(vanillaInput).toHaveClass("is-invalid")

    // expect input to be invalid with input that's too high
    await act(async() => {
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "11")
    })
    expect(vanillaInput).toHaveClass("is-invalid")

    // replace with valid input
    // we only need to check our validation rules (namely that the input can displays), not the react-bootstrap's response
    await act(async () => {
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "3")
    })
    expect(vanillaInput).not.toHaveClass("is-invalid")
  })
 })