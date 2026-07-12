export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const brlExact = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

export const km = (n: number) => `${n.toLocaleString('pt-BR')} km`

export const installment = (price: number, months = 60) =>
  brlExact(price / months)
