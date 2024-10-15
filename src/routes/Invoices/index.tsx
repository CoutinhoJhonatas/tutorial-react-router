import "./styles.css";
import { Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../../data";
import QueryLink from "../../components/QueryLink";

export default function Invoices() {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("name") || ""}
          onChange={(event) => {
            const name = event.target.value;
            if (name) {
              setSearchParams({ name });
            } else {
              setSearchParams({});
            }
          }}
        />

        {invoices
          .filter((invoice) => {
            const filter = searchParams.get("name");
            if (!filter) return true;
            const name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryLink
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              className={({ isActive }: any) =>
                isActive ? "dblock nav-red" : " dblock nav-blue"
              }
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
