// modeling the user object
// make it a function to easily reset it
const makeUser = () => {
    return{
      myTools: [
        {
          name: "Teeth",
        }
      ],
      money: 0,
      lawnsMowed: 0,
      mowingSpeed: 0.2,
      perLawnEarnings: 1,
      autoMower: {enabled: false},
    };
}

// array of tool objects
// made into function to easily reset
const makeTools = () => [
  {
    name: "New Lawn",
    equippable: false,
    value: 0,
    speed: 0,
    cost: 1,
    onPurchase: () => {
      createNewLawn();
      let c = tools[tools.findIndex(p => p.name === "New Lawn")].cost;
      tools[tools.findIndex(p => p.name === "New Lawn")].cost = Math.min(c * 2, maxLawnPrice);
    }
  },
  {
    name: "Old Scissors",
    equippable: true,
    value: 0,
    speed: 0.1,
    cost: 2,
  },
  {
    name: "Fancy Scissors",
    equippable: true,
    value: 5,
    speed: 0,
    cost: 5,
  },
  {
    name: "Basic Mower",
    equippable: true,
    value: 20,
    speed: 0,
    cost: 25
  },
  {
    name: "Deluxe Mower",
    equippable: true,
    value: 0,
    speed: 0.2,
    cost: 250
  },
  {
    name: "Employee",
    equippable: true,
    value: 150,
    speed: 0.2,
    cost: 500
  }, 
  {
    name: "Another Employee",
    equippable: true,
    value: 150,
    speed: 0.2,
    cost: 750
  }, 
  {
    name: "Hi-Tech Mower",
    equippable: true,
    value: 150,
    speed: 1,
    cost: 1200,
  },
  {
    name: "MowBot Auto-Assistant",
    equippable: true,
    value: 0,
    speed: 0,
    cost: 12000,
    description: "MowBot will manage your lawns for you!",
    onPurchase: () => {
      user.autoMower.enabled = true;
    }
  },
  {
    name: "Labor Force",
    equippable: true,
    value: 0,
    speed: 2,
    cost: 80000
  },
  {
    name: "Labor Force Deregulation",
    equippable: true,
    value: 2000,
    speed: 0,
    cost: 200000
  },
  {
    name: "Drone Mowers",
    equippable: true,
    value: 0,
    speed: 2,
    cost: 1000000
  }, 
  {
    name: "Management Drones",
    equippable: true,
    value: 0,
    speed: 4,
    cost: 2000000
  },
  {
    name: "PR Drones",
    equippable: true,
    value: 5000,
    speed: 0,
    cost: 8000000
  },
  {
    name: "Laser Lawn Burners",
    equippable: true,
    value: 5000,
    speed: 4,
    cost: 10000000
  }, 
  {
    name: "Deforestation Sqaud",
    equippable: true,
    value: 120000,
    speed: 6,
    cost: 100000000
  }
];