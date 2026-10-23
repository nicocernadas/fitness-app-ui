// Mirror of the backend's limits (src/constants/appConstants.ts). Change both together

// Ingredients store their nutrients per 100 g, like food labels and the APIs do
export const NUTRIENT_BASE_GRAMS = 100

// Limits that only catch typos: no real food goes over them.
// Pure fat (9 kcal/g) is the most calorie-dense food there is: 900 kcal per 100 g
export const MAX_CALORIES_PER_BASE = 9 * NUTRIENT_BASE_GRAMS
export const MAX_ENTRY_GRAMS = 5000
export const MAX_INGREDIENT_NAME_LENGTH = 100

// Macros are shown with this many decimals. Calories are always whole numbers
export const MACRO_DECIMALS = 2
