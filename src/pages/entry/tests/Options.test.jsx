import { describe, expect, test } from "vitest";
import Options from "../Options";
import { render, screen } from "../../../utilities/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

describe('Options', () => { 
  test("display image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />)
    const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i})

    expect(scoopImages).toHaveLength(2)

    const altText = scoopImages.map(image => image.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })

  test("display image for each topping option from server", async () => {
   render(<Options optionType="toppings" />)
   const toppingImages  = await screen.findAllByRole("img", {name: /topping$/i})

   expect(toppingImages).toHaveLength(3)

   const altText = toppingImages.map(image => image.alt)
   expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
  })
  
  test("Scoop totals should not update if input is invalid", async () => {
    const user = userEvent.setup()

    render(<Options optionType="scoops"/>)

    const scoopsTotal = screen.getByText("Scoops total: $", {exact: false})
    expect(scoopsTotal).toHaveTextContent("0.00")

    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})

    // check if value is negative number
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "-1")
    expect(scoopsTotal).toHaveTextContent("0.00")

    // check if value is decimal number
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2.6")
    expect(scoopsTotal).toHaveTextContent("0.00")

     // check if value is too high
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "11")
    expect(scoopsTotal).toHaveTextContent("0.00")
  })
 })