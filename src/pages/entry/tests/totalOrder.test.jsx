import { render, screen, waitFor } from "../../../utilities/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import Options from "../Options";
import OrderEntry from "../OrderEntry"

describe("totalOrder", () => {
  // make sure total starts at $0.00
  test("scoops total should increase", async () => {
    render(<Options optionType="scoops" />)
    const user = userEvent.setup()

    const scoopsSubtotal = screen.getByText("Scoops total: ", {exact:false})
    expect(scoopsSubtotal).toHaveTextContent("0.00")

    // update vanilla scoops to 1, and check subtotal
    await waitFor(async () => {
      let vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"}) 

      await user.clear(vanillaInput)
      await user.type(vanillaInput, "1")

      expect(scoopsSubtotal).toHaveTextContent("2.00")

      // update chocolate scoops to 1, and check subtotal
      const chocolateInput = await screen.findByRole("spinbutton", {name: "Chocolate"})
      await user.clear(chocolateInput)
      await user.type(chocolateInput, "2")
    })
     expect(scoopsSubtotal).toHaveTextContent("6.00")
  })

  test("toppings total should increase", async () => {
    render(<Options optionType="toppings" />)
    const user = userEvent.setup()

    const toppingsTotal = screen.getByText("Toppings total: ", {exact: false})
    expect(toppingsTotal).toHaveTextContent("0.00")

    await waitFor(async () => {
      const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})

      await user.click(cherriesCheckbox)
      expect(toppingsTotal).toHaveTextContent("1.50")
    })

    await waitFor(async () => {
      const hotFudge = await screen.findByRole("checkbox", {name: "Hot fudge"})
      await user.click(hotFudge)
      expect(toppingsTotal).toHaveTextContent("3.00")
    })

    await waitFor(async() => {
      const hotFudge = await screen.findByRole("checkbox", {name: "Hot fudge"})
      await user.click(hotFudge)
      expect(toppingsTotal).toHaveTextContent("1.50")
    })
  })
})

describe('grand total', () => { 
  test("grand total start at $0.00", async () =>  {
    render(<OrderEntry />)

    const grandTotal = screen.getByRole("heading", {name: /Grand Total: \$/})
    expect(grandTotal).toHaveTextContent("0.00")
  })
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />)
    const user = userEvent.setup()

    const grandTotal = screen.getByRole("heading", {name: /Grand Total: \$/})

    await waitFor(async () => {
      const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
      
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "1")

      expect(grandTotal).toHaveTextContent("2.00")
    })

    await waitFor(async () => {
      const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})

      await user.click(cherriesCheckbox)
      expect(grandTotal).toHaveTextContent("3.50")
    })
  })

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />)
    const user = userEvent.setup()

    const grandTotal = screen.getByRole("heading", {name: /Grand Total: \$/})

    await waitFor(async () => {
      const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
      await user.click(cherriesCheckbox)

      expect(grandTotal).toHaveTextContent("1.50")
    })
   

    await waitFor(async () => {
      const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
      
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "1")

      expect(grandTotal).toHaveTextContent("3.50")
    })

    await waitFor(async () => {
      const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "2")

      expect(grandTotal).toHaveTextContent("5.50")
    })
  })

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />)
    const user = userEvent.setup()

    const grandTotal = screen.getByRole("heading", {name: /Grand Total: \$/})

    await waitFor(async () => {
      const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
      await user.click(cherriesCheckbox)
      
      expect(grandTotal).toHaveTextContent("1.50")
    })

    await waitFor(async () => {
      const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})
    
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "3")
      expect(grandTotal).toHaveTextContent("7.50")
    })

     await waitFor(async () => {
      const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})

      await user.clear(vanillaInput)
      await user.type(vanillaInput, "2")
      expect(grandTotal).toHaveTextContent("5.50")
    })

     await waitFor(async () => {
      const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})

      await user.click(cherriesCheckbox)
      expect(grandTotal).toHaveTextContent("4.00")
    })
  })
 })