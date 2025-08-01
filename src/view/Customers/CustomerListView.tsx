import { Customer, CustomerCardView } from "./CustomerCardView"

interface Props {
  customers: Customer[]
}

export function CustomerListView({ customers }: Props) {
  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <CustomerCardView key={customer.code} customer={customer} />
      ))}
    </div>
  )
}

export type { Customer }
