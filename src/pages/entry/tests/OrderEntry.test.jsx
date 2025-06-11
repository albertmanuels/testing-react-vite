import { describe, expect, test } from "vitest";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";
import OrderEntry from "../OrderEntry";
import { render, screen } from "../../../utilities/test-utils/testing-library-utils";

describe("OrderEntry", () => {
  test("handles error for scoops and toppings routes", async () => {
    server.resetHandlers(
      http.get("http://localhost:3030/scoops", () => {
        return HttpResponse.json(null, {status: 500})
      }),
      http.get("http://localhost:3030/toppings", () => {
        return HttpResponse.json(null, {status: 500})
      })
    )

    render(<OrderEntry/>)
    const alerts = await screen.findAllByRole("alert")

    expect(alerts).toHaveLength(2)
  })
})