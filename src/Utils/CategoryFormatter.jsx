export const categoryFormatter = (categoryIds, categories) => {
  const categoryNames = categoryIds.map(
    (id) => categories.find((cat) => cat.id === id)?.name
  );
  const formattedCategories =
    categoryNames.length === 1
      ? categoryNames[0]
      : categoryNames.length === 2
      ? `${categoryNames[0]} & ${categoryNames[1]}`
      : "";
  return formattedCategories;
};
