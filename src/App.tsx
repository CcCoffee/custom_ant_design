import React from "react";
// import "./App.css";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          mode={"vertical"}
          onSelect={(index) => {
            console.log(`Click menu ${index}`);
          }}
        >
          <MenuItem index={0}>Apple</MenuItem>
          <MenuItem index={1} disabled>
            Banana
          </MenuItem>
          <MenuItem index={2}>Pear</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;
