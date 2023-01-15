export const promptNumber = async (message: string, initial: number, callback: (input: number) => Promise<void>) => {
  const input = window.prompt(message)
  if (!input) return
  const value = Number(input)
  if (!Number.isInteger(value)) return alert("Enter an integer")
  if (input.startsWith("+") || input.startsWith("-")) return await callback(initial + value)
  await callback(value)
}
