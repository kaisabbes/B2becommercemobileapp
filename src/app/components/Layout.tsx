import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
