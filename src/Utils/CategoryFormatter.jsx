export const categoryFormatter = (categoryIds, categories) => {
  const categoryNames = categoryIds.map(
    (id) => categories.find((cat) => cat.id === id)?.name
  );
  const formattedCategories =
     categoryNames.length === 1
      ? categoryNames[0]
      : categoryNames.length === 2
      ? `${categoryNames[0]} & ${categoryNames[1] }`
      : categoryNames.length === 3
      ? `${categoryNames[0]} & ${categoryNames[1]} & ${categoryNames[2]}`
     : "";
   return formattedCategories;

};


// export const categoryFormatter = (categoryIds, categories) => {
//   const categoryNames = categoryIds
//     .map((id) => categories.find((cat) => cat.id === id)?.name)
//     .filter(Boolean);

//   return categoryNames.join(", ");
// };