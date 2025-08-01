import { CustomerCard, Customer } from "./CustomerCard"

interface Props {
  customers: Customer[]
}

export function CustomerList({ customers }: Props) {
  return (
    <div className="space-y-4">
      {customers.map((c) => (
        <CustomerCard key={c.code} customer={c} />
      ))}
    </div>
  )
}
