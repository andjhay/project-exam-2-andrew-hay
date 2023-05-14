import React from "react";
import { render, screen } from "@testing-library/react";
import Form from ".";

describe("ProductCard", () => {
  test("displays information correctly", () => {
    render(<Form />);

    // Displays our DOM for debugging purposes
    screen.debug();
  });
});
