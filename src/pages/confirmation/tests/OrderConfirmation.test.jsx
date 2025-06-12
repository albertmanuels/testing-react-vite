import { test, describe, vi, expect } from "vitest"
import {render, screen} from "../../../utilities/test-utils/testing-library-utils"
import OrderConfirmation from "../OrderConfirmation"
import { server } from "../../../mocks/server"
import { http, HttpResponse } from "msw"

describe('Order Confirmation', () => { 
  test("Show alert when server response is error", async () => {
    server.use(
      http.post("http://localhost:3030/order", () => {
        return HttpResponse.json(null, {status: 500})
      }),
    )

    render(<OrderConfirmation setOrderPhase={vi.fn()}/>)
    const alerts = await screen.findByRole("alert")

    expect(alerts).toHaveTextContent("An unexpected error occurred. Please try again later.")
  })
 })