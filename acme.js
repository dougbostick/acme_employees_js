const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

const spacer = (text) => {
  if (!text) {
    return console.log("");
  }
  const stars = new Array(5).fill("*").join("");
  console.log(`${stars} ${text} ${stars}`);
};

const findEmployeeByName = (employee, employees) => {
  //debugger;
  let result = {};
  employees.forEach((x) => {
    if (x.name === employee) {
      result.id = x.id;
      result.name = employee;
      if (x.hasOwnProperty("managerId")) {
        result.managerId = x.managerId;
      }
    }
  });
  return result;
};

spacer("findEmployeeByName Moe");
// given a name and array of employees, return employee
console.log(findEmployeeByName("moe", employees)); //{ id: 1, name: 'moe' }
spacer("");

const findManagerFor = (managed, employees) => {
  //debugger;
  let result = {};
  employees.forEach((x) => {
    if (x.id === managed.managerId) {
      result.id = x.id;
      result.name = x.name;
      result.managerId = x.managerId;
    }
  });
  return result;
};

spacer("findManagerFor Shep Jr.");
//given an employee and a list of employees, return the employee who is the manager
console.log(
  findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

const findCoworkersFor = (employee, employees) => {
  let result = [];
  employees.forEach((x) => {
    if (x.managerId === employee.managerId && x.name !== employee.name) {
      result.push(x);
    }
  });
  return result;
};

spacer("findCoworkersFor Larry");

//given an employee and a list of employees, return the employees who report to the same manager
console.log(
  findCoworkersFor(findEmployeeByName("larry", employees), employees)
); /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer("");

const findManagementChainForEmployee = (employee, employees) => {
  let result = [];
  for (let i = 0; i < employees.length; i++) {
    let selected = employees[i];
    if (selected.id === employee.managerId) {
      result.push(selected);
      let j = i - 1;
      while (j >= 0) {
        result.push(employees[j]);
        j--;
      }
    }
  }
  return result;
};

// const findManagementChainForEmployee = (employee, employees) => {
//   let result = [];
//   employees.forEach((x) => {
//     if (x.id === employee.managerId) {
//       result.push(x);
//     }
//   });
//   return result;
// };
spacer("findManagementChain for moe");
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("moe", employees),
    employees
  )
); //[  ]
spacer("");

spacer("findManagementChain for shep Jr.");
console.log(
  findManagementChainForEmployee(
    findEmployeeByName("shep Jr.", employees),
    employees
  )
); /*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer("");

const generateManagementTree = (employees) => {
  let result = {};
  employees.forEach((x) => {});
  return result;
};

spacer("generateManagementTree");
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
  {
    "id": 1,
    "name": "moe",
    "reports": [
      {
        "id": 2,
        "name": "larry",
        "managerId": 1,
        "reports": [
          {
            "id": 4,
            "name": "shep",
            "managerId": 2,
            "reports": [
              {
                "id": 8,
                "name": "shep Jr.",
                "managerId": 4,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "curly",
        "managerId": 1,
        "reports": [
          {
            "id": 5,
            "name": "groucho",
            "managerId": 3,
            "reports": [
              {
                "id": 6,
                "name": "harpo",
                "managerId": 5,
                "reports": []
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "lucy",
        "managerId": 1,
        "reports": []
      }
    ]
  }
  */
spacer("");

spacer("displayManagementTree");
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees)); /*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
