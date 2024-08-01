export function getSpentText(spent: number, budget: number) {
  const spentRatio = spent / budget
  return {
    balance: `${budget} - ${spent} = ${budget - spent}`,
    ratio: `${formatRatio(spentRatio * 12)}/12`,
  }
}

export function formatRatio(num: number) {
  if (Number.isInteger(num)) {
    return num.toString()
  }

  return num.toFixed(1)
}
