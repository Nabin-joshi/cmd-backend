const equalizeArrayLengths = (
  modelData,
  modelField = "items",
  emptyItem = {},
  locales = ["eng", "nep"]
) => {
  // Ensure that each locale exists in the data, if not, add it with an empty array for the modelField.
  locales.forEach((locale) => {
    const existingLocale = modelData.find((m) => m.locale === locale);
    if (!existingLocale) {
      modelData.push({ locale, [modelField]: [] });
    }
  });

  // Create a mapping of items (or whatever field) for each locale
  const localeItems = {};
  locales.forEach((locale) => {
    const localeData = modelData.find((m) => m.locale === locale);
    localeItems[locale] = localeData ? localeData[modelField] : [];
  });

  // Determine the maximum length of the items arrays across all locales
  const maxLength = Math.max(
    ...Object.values(localeItems).map((items) => items.length)
  );

  // Equalize the lengths of all items arrays
  Object.keys(localeItems).forEach((locale) => {
    while (localeItems[locale].length < maxLength) {
      localeItems[locale].push(emptyItem);
    }
  });

  // Update the modelData with the modified items arrays
  modelData.forEach((localeData) => {
    if (localeItems[localeData.locale]) {
      localeData[modelField] = localeItems[localeData.locale];
    }
  });

  return modelData;
};

module.exports = equalizeArrayLengths;
