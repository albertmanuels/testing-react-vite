export function kebabCaseToTitleCase(colorName) {
  const colorWithSeperate = colorName.replaceAll("-", " ")
  const colorWithCaps = colorWithSeperate.replace(/\b([a-z])/g, (match) => match.toUpperCase())

  return colorWithCaps
}