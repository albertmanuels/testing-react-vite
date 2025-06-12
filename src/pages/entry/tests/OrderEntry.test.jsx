import { describe, expect, test, vi } from "vitest";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";
import OrderEntry from "../OrderEntry";
import { render, screen } from "../../../utilities/test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe("OrderEntry", () => {
  test("handles error for scoops and toppings routes", async () => {
    server.use(
      http.get("http://localhost:3030/scoops", () => {
        return HttpResponse.json(null, {status: 500})
      }),
      http.get("http://localhost:3030/toppings", () => {
        return HttpResponse.json(null, {status: 500})
      })
    )

    render(<OrderEntry setOrderPhase={vi.fn()}/>)
    const alerts = await screen.findAllByRole("alert")

    expect(alerts).toHaveLength(2)
  })

   test("disabled order button if there are no scoops ordered", async () => {
    const user = userEvent.setup()

    render(<OrderEntry setOrderPhase={vi.fn()}/>)

    const scoopsTotal = screen.getByText("Scoops total: $", {exact: false})
    expect(scoopsTotal).toHaveTextContent("0.00")

    const orderButton = screen.getByRole("button", {name: /order sundae/i})
    expect(orderButton).toBeDisabled()

    const vanillaInput = await screen.findByRole("spinbutton", {name: "Vanilla"})

    await act(async () => {
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "1")
    }) 

    expect(orderButton).toBeEnabled()
    expect(scoopsTotal).toHaveTextContent("2.00")

    await act(async () => {
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "0")
    })
    expect(scoopsTotal).toHaveTextContent("0.00")
    expect(orderButton).toBeDisabled()
  })
})