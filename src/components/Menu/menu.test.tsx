import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  );
};

let menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(generateMenu(testProps));
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElement = screen.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test");
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("viking-menu-item is-active");
    expect(disabledElement).toHaveClass("viking-menu-item is-disabled");
  });

  it("click items should change active and call the right callback", () => {
    const thirdItem = screen.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it("should render vertical mode when mode is et to vertical", () => {
    cleanup();
    render(generateMenu(testVerticalProps));
    menuElement = screen.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
});
