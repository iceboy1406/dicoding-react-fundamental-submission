const showFormattedDate = (date: string, locale: Intl.LocalesArgument = 'en') => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',

  }
  return new Date(date).toLocaleDateString(locale, options)
}
export default showFormattedDate
