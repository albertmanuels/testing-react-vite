import { describe, expect, test } from "vitest";
import Options from "../Options";
import { render, screen } from "@testing-library/react";

describe('ScoopOption', () => { 
  test("display image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />)
    const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i})

    expect(scoopImages).toHaveLength(2)

    const altText = scoopImages.map(image => image.alt)
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
  })
 })