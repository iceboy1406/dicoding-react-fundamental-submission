const getTextContentLength = (value: string) => {
  const textContent = new DOMParser().parseFromString(value, 'text/html')
    .documentElement.textContent
  if (textContent) {
    return textContent.length
  }
  return 0
}
export default getTextContentLength
