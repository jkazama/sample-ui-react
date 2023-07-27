import { Brand, Nav, NavLink, NavMenu } from "@/components/nav/navigation";

const linkStyle = "bg-slate-100 hover:bg-slate-200";

export const UserHeader = () => {
  return (
    <Nav className="bg-slate-100">
      <Brand>Sample</Brand>
      <NavMenu className="ml-auto">
        <NavLink className={linkStyle} to="home">
          Home
        </NavLink>
        <NavLink className={linkStyle} to="trade">
          Trade
        </NavLink>
        <NavLink className={linkStyle} to="asset">
          Asset
        </NavLink>
      </NavMenu>
    </Nav>
  );
};
