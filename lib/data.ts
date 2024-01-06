const breadLength = [
  { title: "6-inch", kcal: 0, protein: 0, carbs: 0, fats: 0 },
  { title: "Footlong", kcal: 0, protein: 0, carbs: 0, fats: 0 },
];

const breadOptions = [
  {
    title: "Artisan Flatbread",
    servingSize: 78,
    kcal: 220,
    fats: 4,
    carbs: 40,
    sugars: 2,
    protein: 7
  },
  {
    title: "Artisan Italian Bread",
    servingSize: 71,
    kcal: 200,
    fats: 2,
    carbs: 37,
    sugars: 3,
    protein: 7
  },
  {
    title: "Hearty Multigrain Bread",
    servingSize: 71,
    kcal: 200,
    fats: 2,
    carbs: 36,
    sugars: 4,
    protein: 9
  },
  {
    title: "Italian Herbs & Cheese Bread",
    servingSize: 82,
    kcal: 240,
    fats: 5,
    carbs: 40,
    sugars: 3,
    protein: 9
  },
  {
    title: "Jalapeño Cheddar Bread",
    servingSize: 82,
    kcal: 230,
    fats: 5,
    carbs: 37,
    sugars: 3,
    protein: 9
  },
  {
    title: "Wrap",
    servingSize: 102,
    kcal: 300,
    fats: 8,
    carbs: 50,
    sugars: 2,
    protein: 8
  },
  {
    title: "Mini Artisan Italian Bread",
    servingSize: 47,
    kcal: 130,
    fats: 1,
    carbs: 24,
    sugars: 2,
    protein: 5
  },
  {
    title: "Mini Hearty Multigrain Bread",
    servingSize: 47,
    kcal: 130,
    fats: 2,
    carbs: 24,
    sugars: 3,
    protein: 6
  }
];

const cheeseOptions = [
  { title: "American", servingSize: 11, kcal: 40, fats: 4, carbs: 1, sugars: 0, protein: 2 },
  { title: "BelGioioso Fresh Mozzarella", servingSize: 17, kcal: 40, fats: 3, carbs: 0, sugars: 0, protein: 3 },
  { title: "Monterey Cheddar, Shredded", servingSize: 14, kcal: 50, fats: 5, carbs: 1, sugars: 0, protein: 3 },
  { title: "Mozzarella, Shredded", servingSize: 14, kcal: 45, fats: 4, carbs: 1, sugars: 0, protein: 3 },
  { title: "Parmesan Grated", servingSize: 1, kcal: 5, fats: 0, carbs: 0, sugars: 0, protein: 1 },
  { title: "Pepper Jack", servingSize: 14, kcal: 50, fats: 4, carbs: 0, sugars: 0, protein: 3 },
  { title: "Provolone", servingSize: 14, kcal: 50, fats: 4, carbs: 0, sugars: 0, protein: 4 },
  { title: "Swiss", servingSize: 14, kcal: 60, fats: 5, carbs: 0, sugars: 0, protein: 4 }
];

const meatOptions = [
  { title: "All-American Club Meats", servingSize: 72, kcal: 140, fats: 8, carbs: 2, sugars: 1, protein: 16 },
  { title: "Bacon", servingSize: 15, kcal: 80, fats: 6, carbs: 1, sugars: 1, protein: 5 },
  { title: "Black Forest Ham", servingSize: 57, kcal: 70, fats: 2, carbs: 2, sugars: 1, protein: 10 },
  { title: "Capicola", servingSize: 22, kcal: 35, fats: 2, carbs: 1, sugars: 1, protein: 4 },
  { title: "Cold Cut Combo Meats", servingSize: 64, kcal: 110, fats: 8, carbs: 1, sugars: 1, protein: 9 },
  { title: "Egg Patty (regular)", servingSize: 85, kcal: 180, fats: 15, carbs: 2, sugars: 0, protein: 10 },
  { title: "Egg Patty (white)", servingSize: 85, kcal: 90, fats: 4, carbs: 3, sugars: 1, protein: 9 },
  { title: "Genoa Salami", servingSize: 18, kcal: 70, fats: 6, carbs: 1, sugars: 0, protein: 3 },
  { title: "Grilled Chicken", servingSize: 71, kcal: 80, fats: 2, carbs: 1, sugars: 1, protein: 16 },
  { title: "Grilled Chicken, Buffalo", servingSize: 99, kcal: 90, fats: 2, carbs: 2, sugars: 1, protein: 17 },
  { title: "Grilled Chicken, Sweet Onion Teriyaki Glazed", servingSize: 85, kcal: 110, fats: 2, carbs: 9, sugars: 8, protein: 16 },
  { title: "Italian B.M.T. Meats", servingSize: 64, kcal: 180, fats: 14, carbs: 3, sugars: 1, protein: 11 },
  { title: "Meatballs", servingSize: 139, kcal: 240, fats: 15, carbs: 13, sugars: 5, protein: 13 },
  { title: "Oven Roasted Turkey", servingSize: 57, kcal: 60, fats: 1, carbs: 0, sugars: 0, protein: 11 },
  { title: "Pastrami", servingSize: 57, kcal: 130, fats: 10, carbs: 1, sugars: 1, protein: 9 },
  { title: "Pepperoni", servingSize: 18, kcal: 80, fats: 7, carbs: 1, sugars: 0, protein: 3 },
  { title: "Roast Beef", servingSize: 71, kcal: 90, fats: 3, carbs: 2, sugars: 2, protein: 14 },
  { title: "Rotisserie-Style Chicken", servingSize: 71, kcal: 90, fats: 4, carbs: 0, sugars: 0, protein: 15 },
  { title: "Spicy Italian Meats", servingSize: 59, kcal: 250, fats: 22, carbs: 2, sugars: 0, protein: 11 },
  { title: "Steak", servingSize: 71, kcal: 110, fats: 5, carbs: 2, sugars: 1, protein: 17 },
  { title: "Subway Club Meats", servingSize: 92, kcal: 110, fats: 3, carbs: 3, sugars: 2, protein: 18 },
  { title: "Tuna", servingSize: 74, kcal: 250, fats: 23, carbs: 0, sugars: 0, protein: 12 },
  { title: "Veggie Patty", servingSize: 85, kcal: 170, fats: 9, carbs: 17, sugars: 2, protein: 6 }
];

const sauceOptions = [
  { title: "No sauce", kcal: 0, protein: 0, carbs: 0, fats: 0 },
  { title: "Baja Chipotle", servingSize: 14, kcal: 70, fats: 7, carbs: 1, sugars: 1, protein: 0 },
  { title: "Barbecue Sauce", servingSize: 14, kcal: 30, fats: 0, carbs: 7, sugars: 6, protein: 0 },
  { title: "Creamy Sriracha", servingSize: 14, kcal: 40, fats: 4, carbs: 2, sugars: 1, protein: 0 },
  { title: "Franks Red Hot Buffalo Sauce", servingSize: 14, kcal: 5, fats: 0, carbs: 1, sugars: 0, protein: 0 },
  { title: "Giardiniera", servingSize: 28, kcal: 80, fats: 9, carbs: 1, sugars: 1, protein: 0 },
  { title: "Honey Mustard", servingSize: 14, kcal: 60, fats: 5, carbs: 3, sugars: 3, protein: 0 },
  { title: "Mayonnaise", servingSize: 14, kcal: 100, fats: 11, carbs: 0, sugars: 0, protein: 0 },
  { title: "Mustard, Yellow", servingSize: 14, kcal: 10, fats: 1, carbs: 1, sugars: 0, protein: 0 },
  { title: "MVP Parmesan Vinaigrette", servingSize: 14, kcal: 60, fats: 6, carbs: 1, sugars: 1, protein: 0 },
  { title: "Oil", servingSize: 5, kcal: 45, fats: 5, carbs: 0, sugars: 0, protein: 0 },
  { title: "Oil & Vinegar", servingSize: 9, kcal: 45, fats: 5, carbs: 0, sugars: 0, protein: 0 },
  { title: "Peppercorn Ranch Sauce", servingSize: 14, kcal: 80, fats: 8, carbs: 1, sugars: 1, protein: 0 },
  { title: "Red Wine Vinegar", servingSize: 4, kcal: 0, fats: 0, carbs: 0, sugars: 0, protein: 0 },
  { title: "Roasted Garlic Aioli", servingSize: 14, kcal: 80, fats: 9, carbs: 1, sugars: 1, protein: 0 }
];

const extraOptions = [
  { title: "No that's all!", kcal: 0, protein: 0, carbs: 0, fats: 0 },
  { title: "Chocolate Chip Cookie", servingSize: 45, kcal: 210, fats: 10, carbs: 30, sugars: 18, protein: 2 },
  { title: "Double Chocolate Cookie", servingSize: 45, kcal: 210, fats: 9, carbs: 29, sugars: 20, protein: 2 },
  { title: "Oatmeal Raisin Cookie", servingSize: 45, kcal: 200, fats: 8, carbs: 30, sugars: 16, protein: 3 },
  { title: "Raspberry Cheesecake Cookie", servingSize: 45, kcal: 210, fats: 9, carbs: 29, sugars: 16, protein: 2 },
  { title: "White Chip Macadamia Nut Cookie", servingSize: 45, kcal: 210, fats: 10, carbs: 28, sugars: 17, protein: 2 },
  { title: "Applesauce", servingSize: 90, kcal: 70, fats: 0, carbs: 16, sugars: 13, protein: 0 },
  { title: "Hash Browns", servingSize: 108, kcal: 190, fats: 9, carbs: 24, sugars: 1, protein: 3 },
  { title: "Muffin, Apple Cinnamon", servingSize: 113, kcal: 450, fats: 24, carbs: 53, sugars: 31, protein: 6 },
  { title: "Muffin, Blueberry Crumb", servingSize: 113, kcal: 410, fats: 17, carbs: 59, sugars: 33, protein: 5 },
  { title: "Muffin, Double Chocolate", servingSize: 113, kcal: 550, fats: 31, carbs: 61, sugars: 41, protein: 6 }
];

export {
  breadOptions,
  cheeseOptions,
  meatOptions,
  breadLength,
  sauceOptions,
  extraOptions,
};
