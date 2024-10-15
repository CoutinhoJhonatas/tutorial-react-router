import { useLocation, NavLink } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QueryLink({ to, ...props }: any) {
  const location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}