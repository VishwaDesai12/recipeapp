import { Recipe } from "@/types/recipe";

// In-memory store — persists during server runtime
const recipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Spaghetti Carbonara",
    slug: "classic-spaghetti-carbonara",
    description:
      "A rich and creamy Roman pasta dish made with eggs, cheese, pancetta, and black pepper. No cream needed!",
    coverImageUrl:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    authorId: "chef1",
    category: "Dinner",
    dietaryTags: [],
    difficulty: "medium",
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    ingredients: [
      { id: "i1", name: "Spaghetti", quantity: 400, unit: "g", optional: false },
      { id: "i2", name: "Pancetta", quantity: 150, unit: "g", optional: false },
      { id: "i3", name: "Eggs", quantity: 4, unit: "piece", optional: false },
      { id: "i4", name: "Pecorino Romano", quantity: 100, unit: "g", optional: false },
      { id: "i5", name: "Black pepper", quantity: 1, unit: "tsp", optional: false },
      { id: "i6", name: "Salt", quantity: 1, unit: "to taste", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Bring a large pot of salted water to a boil and cook spaghetti until al dente.",
        durationMinutes: 10,
        tip: "Reserve 1 cup of pasta water before draining.",
      },
      {
        stepNumber: 2,
        instruction: "Fry the pancetta in a large pan over medium heat until crispy.",
        durationMinutes: 5,
      },
      {
        stepNumber: 3,
        instruction: "Whisk eggs with grated Pecorino Romano and black pepper in a bowl.",
      },
      {
        stepNumber: 4,
        instruction:
          "Remove pan from heat, add drained pasta to pancetta, then pour egg mixture over it. Toss quickly, adding pasta water to create a creamy sauce.",
        durationMinutes: 3,
        tip: "Work quickly off the heat to avoid scrambling the eggs.",
      },
    ],
    nutrition: {
      calories: 620,
      proteinG: 28,
      carbsG: 72,
      fatG: 24,
      fiberG: 3,
    },
    published: true,
    rating: 4.7,
    ratingCount: 143,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "2",
    title: "Avocado Toast with Poached Egg",
    slug: "avocado-toast-with-poached-egg",
    description:
      "A healthy and delicious breakfast staple featuring creamy avocado on crispy sourdough toast topped with a perfectly poached egg.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800&q=80",
    authorId: "chef1",
    category: "Breakfast",
    dietaryTags: ["vegetarian", "dairy-free"],
    difficulty: "easy",
    servings: 2,
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    ingredients: [
      { id: "i1", name: "Sourdough bread", quantity: 2, unit: "piece", optional: false },
      { id: "i2", name: "Avocado", quantity: 1, unit: "piece", optional: false },
      { id: "i3", name: "Eggs", quantity: 2, unit: "piece", optional: false },
      { id: "i4", name: "Lemon juice", quantity: 1, unit: "tbsp", optional: false },
      { id: "i5", name: "Red pepper flakes", quantity: 1, unit: "pinch", optional: true },
      { id: "i6", name: "Salt and pepper", quantity: 1, unit: "to taste", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Toast the sourdough bread slices until golden and crispy.",
        durationMinutes: 3,
      },
      {
        stepNumber: 2,
        instruction:
          "Mash the avocado with lemon juice, salt, and pepper in a bowl.",
        tip: "Leave it a little chunky for better texture.",
      },
      {
        stepNumber: 3,
        instruction:
          "Poach the eggs in barely simmering water with a splash of vinegar for 3 minutes.",
        durationMinutes: 3,
        tip: "Create a gentle whirlpool before adding the egg for a neater shape.",
      },
      {
        stepNumber: 4,
        instruction:
          "Spread avocado mash on toast, top with poached egg, and season with red pepper flakes.",
      },
    ],
    nutrition: {
      calories: 380,
      proteinG: 14,
      carbsG: 34,
      fatG: 22,
      fiberG: 7,
    },
    published: true,
    rating: 4.5,
    ratingCount: 89,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "3",
    title: "Vegan Chocolate Lava Cake",
    slug: "vegan-chocolate-lava-cake",
    description:
      "Indulgent individual chocolate cakes with a gooey molten center — completely plant-based and absolutely divine.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1617305855058-336d24456869?w=800&q=80",
    authorId: "chef2",
    category: "Dessert",
    dietaryTags: ["vegan", "dairy-free"],
    difficulty: "medium",
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 12,
    ingredients: [
      { id: "i1", name: "Dark chocolate (70%+)", quantity: 200, unit: "g", optional: false },
      { id: "i2", name: "Coconut oil", quantity: 80, unit: "ml", optional: false },
      { id: "i3", name: "Flax eggs (2 tbsp flaxseed + 6 tbsp water)", quantity: 2, unit: "piece", optional: false },
      { id: "i4", name: "Coconut sugar", quantity: 80, unit: "g", optional: false },
      { id: "i5", name: "All-purpose flour", quantity: 60, unit: "g", optional: false },
      { id: "i6", name: "Vanilla extract", quantity: 1, unit: "tsp", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Preheat oven to 200°C. Grease 4 ramekins with coconut oil.",
        durationMinutes: 10,
      },
      {
        stepNumber: 2,
        instruction: "Melt chocolate and coconut oil together in a double boiler, stirring until smooth.",
        durationMinutes: 5,
        tip: "Don't overheat — remove from heat as soon as melted.",
      },
      {
        stepNumber: 3,
        instruction: "Whisk in flax eggs, coconut sugar, and vanilla. Fold in flour gently.",
      },
      {
        stepNumber: 4,
        instruction: "Pour batter into ramekins and bake for 12 minutes. Edges should be set but center jiggly.",
        durationMinutes: 12,
        tip: "Serve immediately for a molten center!",
      },
    ],
    nutrition: {
      calories: 445,
      proteinG: 5,
      carbsG: 48,
      fatG: 28,
      fiberG: 4,
    },
    published: true,
    rating: 4.9,
    ratingCount: 67,
    createdAt: "2024-02-01T12:00:00Z",
    updatedAt: "2024-02-01T12:00:00Z",
  },
  {
    id: "4",
    title: "Keto Chicken Caesar Salad",
    slug: "keto-chicken-caesar-salad",
    description:
      "A classic Caesar salad reimagined for keto — crispy chicken, romaine lettuce, parmesan, and homemade Caesar dressing with no croutons.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    authorId: "chef1",
    category: "Lunch",
    dietaryTags: ["keto", "gluten-free"],
    difficulty: "easy",
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    ingredients: [
      { id: "i1", name: "Chicken breast", quantity: 300, unit: "g", optional: false },
      { id: "i2", name: "Romaine lettuce", quantity: 200, unit: "g", optional: false },
      { id: "i3", name: "Parmesan cheese", quantity: 50, unit: "g", optional: false },
      { id: "i4", name: "Caesar dressing", quantity: 4, unit: "tbsp", optional: false },
      { id: "i5", name: "Bacon bits", quantity: 30, unit: "g", optional: true },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Season chicken breast with salt and pepper. Cook in a hot pan for 6-7 minutes per side.",
        durationMinutes: 15,
        tip: "Let it rest for 5 minutes before slicing.",
      },
      {
        stepNumber: 2,
        instruction: "Chop romaine lettuce and place in a large bowl.",
      },
      {
        stepNumber: 3,
        instruction: "Slice chicken and add to lettuce. Drizzle with Caesar dressing and toss well.",
      },
      {
        stepNumber: 4,
        instruction: "Top with shaved parmesan and optional bacon bits. Serve immediately.",
      },
    ],
    published: true,
    rating: 4.3,
    ratingCount: 54,
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-02-10T09:00:00Z",
  },
  {
    id: "5",
    title: "Gluten-Free Banana Pancakes",
    slug: "gluten-free-banana-pancakes",
    description:
      "Fluffy, naturally sweet pancakes made with ripe bananas and oat flour. Perfect for a wholesome weekend breakfast.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    authorId: "chef2",
    category: "Breakfast",
    dietaryTags: ["vegetarian", "gluten-free", "dairy-free"],
    difficulty: "easy",
    servings: 2,
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    ingredients: [
      { id: "i1", name: "Ripe bananas", quantity: 2, unit: "piece", optional: false },
      { id: "i2", name: "Eggs", quantity: 2, unit: "piece", optional: false },
      { id: "i3", name: "Oat flour (certified GF)", quantity: 100, unit: "g", optional: false },
      { id: "i4", name: "Baking powder", quantity: 1, unit: "tsp", optional: false },
      { id: "i5", name: "Vanilla extract", quantity: 1, unit: "tsp", optional: true },
      { id: "i6", name: "Maple syrup for serving", quantity: 2, unit: "tbsp", optional: true },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Mash bananas well in a bowl until smooth.",
      },
      {
        stepNumber: 2,
        instruction: "Add eggs, vanilla, and mix. Stir in oat flour and baking powder.",
      },
      {
        stepNumber: 3,
        instruction: "Heat a non-stick pan over medium heat. Pour ¼ cup batter per pancake. Cook 2-3 minutes per side.",
        durationMinutes: 15,
        tip: "Wait for bubbles to form on the surface before flipping.",
      },
    ],
    nutrition: {
      calories: 290,
      proteinG: 11,
      carbsG: 52,
      fatG: 6,
      fiberG: 4,
    },
    published: true,
    rating: 4.6,
    ratingCount: 112,
    createdAt: "2024-02-20T07:00:00Z",
    updatedAt: "2024-02-20T07:00:00Z",
  },
  {
    id: "7",
    title: "Greek Salad with Feta & Olives",
    slug: "greek-salad-with-feta-and-olives",
    description:
      "A crisp, vibrant Mediterranean salad with juicy tomatoes, cucumber, kalamata olives, red onion, and creamy feta. Ready in minutes.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    authorId: "chef2",
    category: "Lunch",
    dietaryTags: ["vegetarian", "gluten-free"],
    difficulty: "easy",
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 0,
    ingredients: [
      { id: "i1", name: "Roma tomatoes", quantity: 4, unit: "piece", optional: false },
      { id: "i2", name: "English cucumber", quantity: 1, unit: "piece", optional: false },
      { id: "i3", name: "Red onion", quantity: 0.5, unit: "piece", optional: false },
      { id: "i4", name: "Kalamata olives", quantity: 80, unit: "g", optional: false },
      { id: "i5", name: "Feta cheese", quantity: 150, unit: "g", optional: false },
      { id: "i6", name: "Extra virgin olive oil", quantity: 4, unit: "tbsp", optional: false },
      { id: "i7", name: "Red wine vinegar", quantity: 2, unit: "tbsp", optional: false },
      { id: "i8", name: "Dried oregano", quantity: 1, unit: "tsp", optional: false },
      { id: "i9", name: "Salt and pepper", quantity: 1, unit: "to taste", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Cut tomatoes into wedges and cucumber into thick half-moons. Thinly slice the red onion.",
        tip: "Salting the cucumber for 5 minutes and patting dry keeps the salad from getting watery.",
      },
      {
        stepNumber: 2,
        instruction: "Combine tomatoes, cucumber, red onion, and olives in a large bowl.",
      },
      {
        stepNumber: 3,
        instruction: "Whisk together olive oil, red wine vinegar, oregano, salt, and pepper to make the dressing.",
      },
      {
        stepNumber: 4,
        instruction: "Pour dressing over the salad and toss gently. Top with crumbled or block feta and a pinch of extra oregano.",
        tip: "Serve with crusty bread to soak up the delicious dressing.",
      },
    ],
    nutrition: {
      calories: 240,
      proteinG: 7,
      carbsG: 12,
      fatG: 19,
      fiberG: 3,
    },
    published: true,
    rating: 4.6,
    ratingCount: 98,
    createdAt: "2024-03-10T11:00:00Z",
    updatedAt: "2024-03-10T11:00:00Z",
  },
  {
    id: "8",
    title: "Creamy Pesto Pasta",
    slug: "creamy-pesto-pasta",
    description:
      "Al dente pasta tossed in a silky sauce of fresh basil pesto and cream, finished with toasted pine nuts and parmesan. Quick, fragrant, and utterly satisfying.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    authorId: "chef1",
    category: "Dinner",
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    ingredients: [
      { id: "i1", name: "Fusilli or penne pasta", quantity: 400, unit: "g", optional: false },
      { id: "i2", name: "Fresh basil pesto", quantity: 5, unit: "tbsp", optional: false },
      { id: "i3", name: "Heavy cream", quantity: 120, unit: "ml", optional: false },
      { id: "i4", name: "Parmesan, grated", quantity: 60, unit: "g", optional: false },
      { id: "i5", name: "Pine nuts, toasted", quantity: 40, unit: "g", optional: true },
      { id: "i6", name: "Garlic cloves", quantity: 2, unit: "piece", optional: false },
      { id: "i7", name: "Olive oil", quantity: 1, unit: "tbsp", optional: false },
      { id: "i8", name: "Salt and black pepper", quantity: 1, unit: "to taste", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Cook pasta in a large pot of well-salted boiling water until al dente. Reserve ½ cup pasta water before draining.",
        durationMinutes: 12,
      },
      {
        stepNumber: 2,
        instruction: "While pasta cooks, sauté minced garlic in olive oil over medium heat for 1 minute. Add cream and simmer for 2 minutes.",
        durationMinutes: 3,
        tip: "Don't let the garlic brown — it should be fragrant and golden.",
      },
      {
        stepNumber: 3,
        instruction: "Remove from heat and stir in the pesto. Season with salt and pepper.",
      },
      {
        stepNumber: 4,
        instruction: "Add drained pasta to the sauce and toss, adding pasta water a splash at a time to reach a creamy, coating consistency.",
        durationMinutes: 2,
        tip: "Starchy pasta water is the secret to a perfectly silky sauce.",
      },
      {
        stepNumber: 5,
        instruction: "Serve topped with grated parmesan and toasted pine nuts.",
      },
    ],
    nutrition: {
      calories: 580,
      proteinG: 18,
      carbsG: 68,
      fatG: 26,
      fiberG: 4,
    },
    published: true,
    rating: 4.7,
    ratingCount: 134,
    createdAt: "2024-03-18T14:00:00Z",
    updatedAt: "2024-03-18T14:00:00Z",
  },
  {
    id: "9",
    title: "Classic Italian Tiramisu",
    slug: "classic-italian-tiramisu",
    description:
      "The iconic Italian dessert — layers of espresso-soaked ladyfingers and a cloud-like mascarpone cream dusted with bitter cocoa. No baking required.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    authorId: "chef2",
    category: "Dessert",
    dietaryTags: ["vegetarian"],
    difficulty: "medium",
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 0,
    ingredients: [
      { id: "i1", name: "Savoiardi ladyfingers", quantity: 300, unit: "g", optional: false },
      { id: "i2", name: "Mascarpone cheese", quantity: 500, unit: "g", optional: false },
      { id: "i3", name: "Eggs, separated", quantity: 4, unit: "piece", optional: false },
      { id: "i4", name: "Caster sugar", quantity: 100, unit: "g", optional: false },
      { id: "i5", name: "Strong espresso, cooled", quantity: 300, unit: "ml", optional: false },
      { id: "i6", name: "Coffee liqueur (e.g. Kahlúa)", quantity: 3, unit: "tbsp", optional: true },
      { id: "i7", name: "Unsweetened cocoa powder", quantity: 2, unit: "tbsp", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Whisk egg yolks with sugar using an electric mixer until pale and thick (about 4 minutes). Beat in mascarpone until smooth.",
        durationMinutes: 5,
        tip: "Room-temperature mascarpone blends much more smoothly — take it out of the fridge 30 minutes ahead.",
      },
      {
        stepNumber: 2,
        instruction: "In a separate clean bowl, whisk egg whites to stiff peaks. Gently fold them into the mascarpone mixture in three additions.",
        durationMinutes: 5,
        tip: "Fold, don't stir — this keeps the cream airy.",
      },
      {
        stepNumber: 3,
        instruction: "Mix cooled espresso with the coffee liqueur (if using). Quickly dip each ladyfinger — 1 second per side — and arrange in a single layer in a 9×13 inch dish.",
        durationMinutes: 10,
        tip: "Don't soak too long or they'll turn mushy. A quick dip is all they need.",
      },
      {
        stepNumber: 4,
        instruction: "Spread half the mascarpone cream over the ladyfinger layer. Repeat with a second layer of dipped ladyfingers, then the remaining cream.",
      },
      {
        stepNumber: 5,
        instruction: "Cover and refrigerate for at least 6 hours (overnight is best). Dust generously with cocoa powder just before serving.",
        tip: "The longer it chills, the better the flavours meld — overnight is truly worth it.",
      },
    ],
    nutrition: {
      calories: 410,
      proteinG: 8,
      carbsG: 36,
      fatG: 26,
      fiberG: 1,
    },
    published: true,
    rating: 4.9,
    ratingCount: 187,
    createdAt: "2024-04-01T16:00:00Z",
    updatedAt: "2024-04-01T16:00:00Z",
  },
  {
    id: "10",
    title: "Homemade Margherita Pizza",
    slug: "homemade-margherita-pizza",
    description:
      "A Neapolitan-style pizza with a thin, blistered crust, vibrant San Marzano tomato sauce, fresh mozzarella, and basil. Simple ingredients, extraordinary result.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    authorId: "chef1",
    category: "Dinner",
    dietaryTags: ["vegetarian"],
    difficulty: "medium",
    servings: 4,
    prepTimeMinutes: 90,
    cookTimeMinutes: 12,
    ingredients: [
      { id: "i1", name: "Bread flour (or 00 flour)", quantity: 500, unit: "g", optional: false },
      { id: "i2", name: "Instant yeast", quantity: 7, unit: "g", optional: false },
      { id: "i3", name: "Warm water", quantity: 320, unit: "ml", optional: false },
      { id: "i4", name: "Salt", quantity: 10, unit: "g", optional: false },
      { id: "i5", name: "Olive oil", quantity: 2, unit: "tbsp", optional: false },
      { id: "i6", name: "San Marzano tomatoes, crushed", quantity: 400, unit: "g", optional: false },
      { id: "i7", name: "Fresh mozzarella", quantity: 250, unit: "g", optional: false },
      { id: "i8", name: "Fresh basil leaves", quantity: 20, unit: "g", optional: false },
      { id: "i9", name: "Garlic clove", quantity: 1, unit: "piece", optional: false },
      { id: "i10", name: "Extra virgin olive oil, to finish", quantity: 2, unit: "tbsp", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Mix flour, yeast, and salt. Add warm water and olive oil, kneading for 10 minutes until smooth and elastic. Cover and rest for 1 hour until doubled.",
        durationMinutes: 70,
        tip: "The dough should be tacky but not sticky. A long rise at room temperature develops better flavour.",
      },
      {
        stepNumber: 2,
        instruction: "Place a pizza stone or heavy baking sheet in the oven. Preheat to the highest setting (250°C+) for at least 30 minutes.",
        durationMinutes: 30,
        tip: "A screaming-hot surface is the key to a crispy base.",
      },
      {
        stepNumber: 3,
        instruction: "Blend crushed tomatoes with garlic, a pinch of salt, and 1 tbsp olive oil. Do not cook.",
      },
      {
        stepNumber: 4,
        instruction: "Divide dough into 2 balls. On a lightly floured surface, stretch each ball by hand into a thin 30 cm round.",
        tip: "Stretch gently from the centre outward — avoid the edges to keep a puffy crust.",
      },
      {
        stepNumber: 5,
        instruction: "Spoon sauce over the base, leaving a 2 cm border. Tear mozzarella over the top. Slide onto the hot stone and bake 10–12 minutes until crust is golden and cheese bubbles.",
        durationMinutes: 12,
      },
      {
        stepNumber: 6,
        instruction: "Remove from oven, scatter fresh basil, and drizzle with extra virgin olive oil. Slice and serve immediately.",
      },
    ],
    nutrition: {
      calories: 520,
      proteinG: 22,
      carbsG: 68,
      fatG: 18,
      fiberG: 3,
    },
    published: true,
    rating: 4.8,
    ratingCount: 215,
    createdAt: "2024-04-15T18:00:00Z",
    updatedAt: "2024-04-15T18:00:00Z",
  },
  {
    id: "6",
    title: "Beef Tacos with Pico de Gallo",
    slug: "beef-tacos-with-pico-de-gallo",
    description:
      "Juicy seasoned ground beef tacos topped with fresh pico de gallo, sour cream, and cheddar cheese. A crowd-pleasing weeknight dinner.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    authorId: "chef1",
    category: "Dinner",
    dietaryTags: ["nut-free"],
    difficulty: "easy",
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 15,
    ingredients: [
      { id: "i1", name: "Ground beef", quantity: 500, unit: "g", optional: false },
      { id: "i2", name: "Taco seasoning", quantity: 2, unit: "tbsp", optional: false },
      { id: "i3", name: "Corn tortillas", quantity: 8, unit: "piece", optional: false },
      { id: "i4", name: "Tomatoes, diced", quantity: 2, unit: "piece", optional: false },
      { id: "i5", name: "Onion, diced", quantity: 1, unit: "piece", optional: false },
      { id: "i6", name: "Cilantro", quantity: 30, unit: "g", optional: false },
      { id: "i7", name: "Lime", quantity: 1, unit: "piece", optional: false },
      { id: "i8", name: "Cheddar cheese, shredded", quantity: 100, unit: "g", optional: true },
      { id: "i9", name: "Sour cream", quantity: 4, unit: "tbsp", optional: true },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Mix diced tomatoes, onion, cilantro, lime juice, and salt to make pico de gallo. Set aside.",
      },
      {
        stepNumber: 2,
        instruction: "Brown ground beef in a pan over medium-high heat, breaking it up as it cooks.",
        durationMinutes: 8,
      },
      {
        stepNumber: 3,
        instruction: "Drain excess fat, add taco seasoning and ¼ cup water. Simmer for 5 minutes.",
        durationMinutes: 5,
      },
      {
        stepNumber: 4,
        instruction: "Warm tortillas and assemble tacos with beef, pico de gallo, cheese, and sour cream.",
      },
    ],
    nutrition: {
      calories: 480,
      proteinG: 28,
      carbsG: 38,
      fatG: 22,
      fiberG: 4,
    },
    published: true,
    rating: 4.8,
    ratingCount: 201,
    createdAt: "2024-03-01T18:00:00Z",
    updatedAt: "2024-03-01T18:00:00Z",
  },
];

export function getAllRecipes(): Recipe[] {
  return [...recipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function addRecipe(recipe: Recipe): Recipe {
  recipes.push(recipe);
  return recipe;
}

export function updateRecipe(id: string, updated: Recipe): Recipe | null {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return null;
  recipes[index] = updated;
  return updated;
}

export function deleteRecipe(id: string): boolean {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return false;
  recipes.splice(index, 1);
  return true;
}

export function generateSlug(title: string, excludeId?: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const exists = (s: string) =>
    recipes.some((r) => r.slug === s && r.id !== excludeId);

  if (!exists(base)) return base;

  let i = 2;
  while (exists(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
