import { describe, expect, test } from "vitest";
import Options from "../Options";
import { render, screen } from "@testing-library/react";

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
 })