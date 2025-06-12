import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import App from "../App"

describe('Order Phase', () => { 

  test("Order phase for happy path" , async () => {
    const user = userEvent.setup()

    render(<App/>)

    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")

    const chocolateInput = screen.getByRole("spinbutton", {name: "Chocolate"})
    
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")

    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
    await user.click(cherriesCheckbox)

    const orderSummaryButton = screen.getByRole("button", {name: /order sundae/i})
    await user.click(orderSummaryButton)

    // check summary subtotals
    const summaryHeading = screen.getByRole("heading", {name: "Order Summary"})
    expect(summaryHeading).toBeInTheDocument()

    const scoopHeading = screen.getByRole("heading", {name: "Scoops: $6.00"})
    expect(scoopHeading).toBeInTheDocument()

    const toppingHeading = screen.getByRole("heading", {name: "Toppings: $1.50"})
    expect(toppingHeading).toBeInTheDocument()

    //check summary option items
    expect(screen.getByText("1 Vanilla")).toBeInTheDocument()
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument()
    expect(screen.getByText("Cherries")).toBeInTheDocument()

    // alternatively
    // const optionItems = screen.getAllByRole("listitem")
    // const optionItemText = optionItems.map(item => item.textContent)
    // expect(optionItemText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries'])

    // accept terms and click confirm button
    const tcCheckbox = screen.getByRole("checkbox", {name: /terms and conditions/i})
    await user.click(tcCheckbox)

    const confirmOrderButton = screen.getByRole("button", {name: /confirm order/i})
    expect(confirmOrderButton).toBeEnabled()
    
    await user.click(confirmOrderButton)

    // expect "loading" to show
    const loading = screen.getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    // check confirmation page text
    // this one is async because there is a POST request to server in between summary and confirmation pages
    const thankYouHeader = await screen.findByRole("heading", {name: /thank you/i})
    expect(thankYouHeader).toBeInTheDocument()

    // expect that loading has disappeared
    const notLoading = screen.queryByText("loading")
    expect(notLoading).not.toBeInTheDocument()

    const orderNumber = await screen.findByText(/order number/i)
    expect(orderNumber).toBeInTheDocument()

    // find and click "new order "button on confirmation page
    const newOrderButton = screen.getByRole("button", {name: /new order/i})
    await user.click(newOrderButton)

    // check that scoops and topping have been reset
    const scoopsTotal = await screen.findByText("Scoops total: $0.00")
    expect(scoopsTotal).toBeInTheDocument()
    const toppingsTotal = screen.getByText("Toppings total: $0.00")
    expect(toppingsTotal).toBeInTheDocument()
  })

  test("Toppings header is not on summary page if no toppings ordered", async () => {
    const user = userEvent.setup()

    render(<App/>)

    const vanillaInput = await screen.findByRole("spinbutton" ,{name: "Vanilla"})
    
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")

    const chocolateInput = screen.getByRole("spinbutton", {name: "Chocolate"})
    
    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")

    const orderSummaryButton = screen.getByRole("button", {name: /order sundae/i})
    await user.click(orderSummaryButton)

    const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"})
    expect(scoopsHeading).toBeInTheDocument()

    const toppingsHeading = screen.queryByRole("heading", {name: /toppings/i})
    expect(toppingsHeading).not.toBeInTheDocument()
  })

  test("Toppings header is not on summary page if toppings ordered, then removed", async () => {
     const user = userEvent.setup()

    render(<App/>)

    // add ice cream scoops
    const vanillaInput = await screen.findByRole("spinbutton" ,{name: "Vanilla"})
    
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")

    // add a topping and confirm
    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"})
    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).toBeChecked()
    const toppingsTotal = screen.getByText("Toppings total: $", {exact: false})
    expect(toppingsTotal).toHaveTextContent("1.50")

    // remove the topping
    await user.click(cherriesCheckbox)
    expect(cherriesCheckbox).not.toBeChecked()
    expect(toppingsTotal).toHaveTextContent("0.00")

    const orderSummaryButton = screen.getByRole("button", {name: /order sundae/i})
    await user.click(orderSummaryButton)

    // check scoop heading
    const scoopHeading = screen.getByRole("heading", {name: "Scoops: $2.00"})
    expect(scoopHeading).toBeInTheDocument()

    // check topping heading is not show up
    const toppingHeading = screen.queryByRole("heading", {name: /toppings/i})
    expect(toppingHeading).not.toBeInTheDocument()
  })
 })