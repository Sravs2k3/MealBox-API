export interface IndianFoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  type: 'Veg' | 'Non-Veg';
  imageUrl: string;
  description?: string;
  rating?: number;  // Added optional rating property
}

export const INDIAN_FOOD_ITEMS: IndianFoodItem[] = [
  // Breakfast
  {
    id: 1,
    name: 'Idli (2 pcs)',
    price: 40,
    category: 'Breakfast, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/idli.jpg',
    description: 'Soft steamed rice cakes, served with chutney and sambar.'
  },
  {
    id: 2,
    name: 'Medu Vada (2 pcs)',
    price: 50,
    category: 'Breakfast, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/medu-vada.jpg',
    description: 'Crispy fried lentil doughnuts, served with chutney and sambar.'
  },
  {
    id: 3,
    name: 'Masala Dosa',
    price: 70,
    category: 'Breakfast, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/masala-dosa.jpg',
    description: 'Crispy rice crepe filled with spiced potato masala.'
  },
  {
    id: 4,
    name: 'Plain Dosa',
    price: 60,
    category: 'Breakfast, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/plain-dosa.jpg',
    description: 'Thin crispy rice crepe served with chutney and sambar.'
  },
  {
    id: 5,
    name: 'Upma',
    price: 45,
    category: 'Breakfast, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/upma.jpg',
    description: 'Savory semolina porridge with mustard seeds and curry leaves.'
  },
  {
    id: 6,
    name: 'Poori with Curry',
    price: 55,
    category: 'Breakfast, Veg',
    tags: ['North Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/poori-curry.jpg',
    description: 'Deep-fried wheat bread served with potato curry.'
  },
  {
    id: 7,
    name: 'Pongal',
    price: 50,
    category: 'Breakfast, Veg, Dessert',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/pongal.jpg',
    description: 'Creamy rice and lentil dish flavored with black pepper and ginger.'
  },

  // Special
  {
    id: 8,
    name: 'Veg Thali',
    price: 120,
    category: 'Special, Veg',
    tags: ['North Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/veg-thali.jpg',
    description: 'Assorted vegetarian dishes served with rice and bread.'
  },
  {
    id: 9,
    name: 'South Indian Meals',
    price: 150,
    category: 'Special, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/south-indian-meals.jpg',
    description: 'Traditional South Indian meal with rice, sambar, rasam, and vegetables.'
  },
  {
    id: 10,
    name: 'North Indian Thali',
    price: 160,
    category: 'Special, Veg',
    tags: ['North Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/north-indian-thali.jpg',
    description: 'Assorted North Indian dishes served with rice and bread.'
  },
  {
    id: 11,
    name: 'Chicken Biryani',
    price: 180,
    category: 'Special, Non-Veg',
    tags: ['Biryani'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/chicken-biryani.jpg',
    description: 'Spiced basmati rice cooked with marinated chicken.'
  },
  {
    id: 12,
    name: 'Mutton Biryani',
    price: 250,
    category: 'Special, Non-Veg',
    tags: ['Biryani'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/mutton-biryani.jpg',
    description: 'Spiced basmati rice cooked with tender mutton pieces.'
  },
  {
    id: 13,
    name: 'Paneer Butter Masala',
    price: 130,
    category: 'Special, Veg',
    tags: ['Curry', 'Paneer'],
    type: 'Veg',
    imageUrl: 'assets/images/paneer-butter-masala.jpg',
    description: 'Creamy tomato-based curry with paneer cubes.'
  },
  {
    id: 14,
    name: 'Butter Chicken',
    price: 180,
    category: 'Special, Non-Veg',
    tags: ['Curry'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/butter-chicken.jpg',
    description: 'Rich and creamy tomato-based chicken curry.'
  },
  {
    id: 15,
    name: 'Veg Pulao',
    price: 90,
    category: 'Special, Veg',
    tags: ['Rice'],
    type: 'Veg',
    imageUrl: 'assets/images/veg-pulao.jpg',
    description: 'Fragrant rice cooked with vegetables and spices.'
  },
  {
    id: 16,
    name: 'Chicken Curry',
    price: 150,
    category: 'Special, Non-Veg',
    tags: ['Curry'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/chicken-curry.jpg',
    description: 'Spicy chicken curry with rich gravy.'
  },
  {
    id: 17,
    name: 'Dal Tadka',
    price: 100,
    category: 'Special, Veg',
    tags: ['North Indian', 'Lentils'],
    type: 'Veg',
    imageUrl: 'assets/images/dal-tadka.jpg',
    description: 'Yellow lentils tempered with spices.'
  },
  {
    id: 18,
    name: 'Roti (1 pc)',
    price: 10,
    category: 'Snack, Veg',
    tags: ['Indian Bread'],
    type: 'Veg',
    imageUrl: 'assets/images/roti.jpg',
    description: 'Whole wheat flatbread.'
  },
  {
    id: 19,
    name: 'Naan (1 pc)',
    price: 20,
    category: 'Snack, Veg',
    tags: ['Indian Bread'],
    type: 'Veg',
    imageUrl: 'assets/images/naan.jpg',
    description: 'Leavened oven-baked flatbread.'
  },
  {
    id: 20,
    name: 'Jeera Rice',
    price: 80,
    category: 'Special, Veg',
    tags: ['Flavored Rice'],
    type: 'Veg',
    imageUrl: 'assets/images/jeera-rice.jpg',
    description: 'Basmati rice flavored with cumin seeds.'
  },

  // Snacks / Starters
  {
    id: 21,
    name: 'Samosa (2 pcs)',
    price: 30,
    category: 'Snack, Veg',
    tags: ['North Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/samosa.jpg',
    description: 'Deep-fried pastry filled with spiced potatoes.'
  },
  {
    id: 22,
    name: 'Paneer Tikka',
    price: 120,
    category: 'Snack, Veg',
    tags: ['Tandoori', 'Paneer'],
    type: 'Veg',
    imageUrl: 'assets/images/paneer-tikka.jpg',
    description: 'Grilled paneer cubes marinated in spices.'
  },
  {
    id: 23,
    name: 'Chicken 65',
    price: 130,
    category: 'Snack, Non-Veg',
    tags: ['South Indian'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/chicken-65.jpg',
    description: 'Spicy deep-fried chicken bites.'
  },
  {
    id: 24,
    name: 'Gobi Manchurian',
    price: 110,
    category: 'Snack, Veg',
    tags: ['Indo-Chinese'],
    type: 'Veg',
    imageUrl: 'assets/images/gobi-manchurian.jpg',
    description: 'Fried cauliflower in spicy sauce.'
  },
  {
    id: 25,
    name: 'Veg Spring Rolls',
    price: 100,
    category: 'Snack, Veg',
    tags: ['Indo-Chinese'],
    type: 'Veg',
    imageUrl: 'assets/images/veg-spring-rolls.jpg',
    description: 'Crispy rolls filled with vegetables.'
  },
  {
    id: 26,
    name: 'Egg Puff',
    price: 25,
    category: 'Snack, Non-Veg',
    tags: ['Bakery'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/egg-puff.jpg',
    description: 'Flaky pastry filled with egg.'
  },
  {
    id: 27,
    name: 'Chicken Pakora',
    price: 140,
    category: 'Snack, Non-Veg',
    tags: ['Fried', 'Spicy'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/chicken-pakora.jpg',
    description: 'Spicy fried chicken fritters.'
  },
  {
    id: 28,
    name: 'Aloo Tikki',
    price: 40,
    category: 'Snack, Veg',
    tags: ['North Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/aloo-tikki.jpg',
    description: 'Spiced potato patties.'
  },

  // Beverages / Desserts
  {
    id: 29,
    name: 'Masala Chai',
    price: 20,
    category: 'Snack, Veg',
    tags: ['Tea'],
    type: 'Veg',
    imageUrl: 'assets/images/masala-chai.jpg',
    description: 'Spiced Indian tea with milk.'
  },
  {
    id: 30,
    name: 'Filter Coffee',
    price: 25,
    category: 'Snack, Veg',
    tags: ['South Indian'],
    type: 'Veg',
    imageUrl: 'assets/images/filter-coffee.jpg',
    description: 'Strong South Indian coffee.'
  },
  {
    id: 31,
    name: 'Mango Lassi',
    price: 50,
    category: 'Dessert,Snack, Veg',
    tags: ['Yogurt-Based Drink'],
    type: 'Veg',
    imageUrl: 'assets/images/mango-lassi.jpg',
    description: 'Sweet mango yogurt drink.'
  },
  {
    id: 32,
    name: 'Rose Milk',
    price: 40,
    category: 'Dessert, Snack, Veg',
    tags: ['Sweet Drink'],
    type: 'Veg',
    imageUrl: 'assets/images/rose-milk.jpg',
    description: 'Sweet rose-flavored milk.'
  },
  {
    id: 33,
    name: 'Badam Milk',
    price: 50,
    category: 'Dessert, Snack, Veg',
    tags: ['Drink', 'Nut'],
    type: 'Veg',
    imageUrl: 'assets/images/badam-milk.jpg',
    description: 'Almond flavored milk drink.'
  },
  {
    id: 34,
    name: 'Gulab Jamun (2 pcs)',
    price: 40,
    category: 'Dessert',
    tags: ['Sweet'],
    type: 'Veg',
    imageUrl: 'assets/images/gulab-jamun.jpg',
    description: 'Soft deep-fried sweet balls soaked in syrup.'
  },
  {
    id: 35,
    name: 'Rasgulla (2 pcs)',
    price: 40,
    category: 'Dessert',
    tags: ['Bengali Sweet'],
    type: 'Veg',
    imageUrl: 'assets/images/rasgulla.jpg',
    description: 'Soft spongy balls made from chenna.'
  },
  {
    id: 36,
    name: 'Ice Cream (Scoop)',
    price: 60,
    category: 'Dessert',
    tags: ['Frozen'],
    type: 'Veg',
    imageUrl: 'assets/images/ice-cream.jpg',
    description: 'Cold creamy ice cream scoop.'
  },
  {
    id: 37,
    name: 'Jalebi',
    price: 50,
    category: 'Dessert',
    tags: ['Sweet', 'Crispy'],
    type: 'Veg',
    imageUrl: 'assets/images/jalebi.jpg',
    description: 'Crispy and juicy orange spiral soaked in sugar syrup.'
  },
  {
    id: 38,
    name: 'Kaju Katli',
    price: 80,
    category: 'Dessert',
    tags: ['Dry Sweet', 'Festival Special'],
    type: 'Veg',
    imageUrl: 'assets/images/kaju-katli.jpg',
    description: 'Rich cashew nut fudge made with ghee and sugar.'
  },
  {
    id: 39,
    name: 'Motichoor Ladoo',
    price: 60,
    category: 'Dessert',
    tags: ['Ladoo', 'Traditional Sweet'],
    type: 'Veg',
    imageUrl: 'assets/images/motichoor-ladoo.jpg',
    description: 'Soft orange ladoos made from tiny boondi and ghee.'
  },
  {
    id: 40,
    name: 'Rasgulla Sandesh',
    price: 70,
    category: 'Dessert',
    tags: ['Bengali Sweet', 'Chhena-based'],
    type: 'Veg',
    imageUrl: 'assets/images/sandesh.jpg',
    description: 'Light and fresh Bengali dessert made with paneer.'
  },
  {
    id: 41,
    name: 'Double Ka Meetha',
    price: 65,
    category: 'Dessert',
    tags: ['Hyderabadi Sweet', 'Bread-based'],
    type: 'Veg',
    imageUrl: 'assets/images/double-ka-meetha.jpg',
    description: 'Rich bread pudding soaked in saffron and dry fruits.'
  },
  {
    id: 42,
    name: 'Basundi',
    price: 75,
    category: 'Dessert',
    tags: ['Milk-based', 'Gujarati Sweet'],
    type: 'Veg',
    imageUrl: 'assets/images/basundi.jpg',
    description: 'Thickened sweet milk dessert flavored with cardamom.'
  },
  {
    id: 43,
    name: 'Malpua',
    price: 70,
    category: 'Dessert',
    tags: ['Pancake Sweet', 'Festive Dessert'],
    type: 'Veg',
    imageUrl: 'assets/images/malpua.jpg',
    description: 'Deep-fried pancakes soaked in syrup, served with rabri.'
  },
  {
    id: 44,
    name: 'Spaghetti Bolognese',
    price: 250,
    category: 'Special, Non-Veg',
    tags: ['Italian', 'Pasta'],
    type: 'Non-Veg',
    imageUrl: 'assets/images/spaghetti-bolognese.jpg',
    description: 'Classic Italian pasta with rich meat sauce.'
  },
  {
    id: 45,
    name: 'Margherita Pizza',
    price: 300,
    category: 'Special, Veg',
    tags: ['Italian', 'Pizza'],
    type: 'Veg',
    imageUrl: 'assets/images/margherita-pizza.jpg',
    description: 'Traditional pizza with fresh tomatoes, mozzarella, and basil.'
  },
  {
    id: 46,
    name: 'Caesar Salad',
    price: 180,
    category: 'Special, Veg',
    tags: ['Salad', 'Healthy'],
    type: 'Veg',
    imageUrl: 'assets/images/caesar-salad.jpg',
    description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.'
  }
];
