export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const km = (n: number) => `${n.toLocaleString('pt-BR')} km`
