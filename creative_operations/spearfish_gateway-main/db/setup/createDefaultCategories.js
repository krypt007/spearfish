'use strict'

const Category = require('../models/category');

const defaultCategories = [
  {
    name: 'housing',
    icon: 'clarity:house-line',
    img: '/images/categories/housing.jpg',
    description: 'Everything to do with households and other housing staff'
  },
  {
    name: 'entertainment',
    icon: 'fluent:drink-beer-20-regular',
    img: '/images/categories/entertainment.jpg',
    description: 'Television, music, parties'
  },
  {
    name: 'vehicle',
    icon: 'fluent:vehicle-car-profile-ltr-16-regular',
    img: '/images/categories/vehicle.jpg',
    description: 'Vehicle repair, new vehicle, licences, insurance etc'
  },
  {
    name: 'loans',
    icon: 'game-icons:receive-money',
    img: '/images/categories/loans.jpg',
    description: 'Loans from banks, loan apps, institutions or other source'
  },
  {
    name: 'purchase',
    icon: 'fluent:money-hand-20-regular',
    img: '/images/categories/purchase.jpg',
    description: 'Things that you have purchased.'
  },
  {
    name: 'clothing',
    icon: 'icon-park-twotone:clothes-turtleneck',
    img: '/images/categories/clothing.jpg',
    description: 'Any clothing, shoes purchased'
  },
  {
    name: 'saving',
    icon: 'carbon:piggy-bank',
    img: '/images/categories/savings.jpg',
    description: 'Your savings. 12% of manage amount goes here.'
  },
  {
    name: 'investment',
    icon: 'carbon:piggy-bank',
    img: '/images/categories/investment.jpg',
    description: 'Investments you have made'
  },
  {
    name: 'food',
    icon: 'fluent:food-16-regular',
    img: '/images/categories/food.jpg',
    description: 'Breakfast, lunch, supper or other food expenses'
  },
  {
    name: 'business',
    icon: 'material-symbols:business-center-outline',
    img: '/images/categories/business.jpg',
    description: 'Any expense incurred within the business'
  },
  {
    name: 'personal care',
    icon: 'carbon:airline-passenger-care',
    img: '/images/categories/personal_care.jpg',
    description: 'Shaving, hair treatment, health, etc'
  },
  {
    name: 'legal',
    icon: 'map:courthouse',
    img: '/images/categories/legal.jpg',
    description: 'Any legal expenses like, advocates, lawyers etc'
  },
];

const createDefaultCategories = async () => {
  try {
    const newCategories = defaultCategories.map(category => ({
      updateOne: {
        filter: { name: category.name },
        update: category,
        upsert: true,
      }
    }));
    await await Category.bulkWrite(newCategories);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = createDefaultCategories;
