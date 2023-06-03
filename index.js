function validateForm() {
  // Get form values
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var phoneNumber = document.forms["myForm"]["phone"].value;

  // Error : Tags
  let nameMsgErr = document.getElementById("nameMsgErr");
  let emailMsgErr = document.getElementById("emailMsgErr");
  let phoneMsgErr = document.getElementById("phoneMsgErr");

  // Validate name
  if (name == "") {
    nameMsgErr.classList.remove("hidden");
    return false;
  }
  if (!nameMsgErr.classList.contains("hidden")) {
    nameMsgErr.classList.add("hidden");
  }

  // Validate email format
  var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailPattern.test(email)) {
    emailMsgErr.classList.remove("hidden");
    return false;
  }
  if (!emailMsgErr.classList.contains("hidden")) {
    emailMsgErr.classList.add("hidden");
  }

  // Validate phone number
  if (phoneNumber == "") {
    phoneMsgErr.classList.remove("hidden");
    return false;
  }
  if (!phoneMsgErr.classList.contains("hidden")) {
    phoneMsgErr.classList.add("hidden");
  }

  // Validate phone number format (optional)
  // var phonePattern = /^\d{10}$/; // Assuming a 10-digit phone number format
  // if (!phonePattern.test(phoneNumber)) {
  //   alert("Please enter a valid 10-digit phone number.");
  //   return false;
  // }

  return true;
}

// planPrices = [[month],[year]]
const plans = [
  [9, 12, 15],
  [90, 120, 150],
];

// month = 0, year = 1
let monthORyear = 0;

// default : plan =1 , step =1
let plan = 1;
let step = 1;
let checkBoxSelected = [];

// Step-2 : month or year selection
const monthYearPlanHandler = () => {
  const planBtn = document.getElementById("planbtn");
  const month = document.getElementsByClassName("month");
  const year = document.getElementsByClassName("year");

  const planBox = document.getElementsByClassName("plans");

  if (planBtn.classList.contains("translate-x-[22px]")) {
    monthORyear = 0;

    // changing color of Month and year:
    month[0].classList.remove("text-gray-400");
    month[1].classList.remove("text-gray-400");
    year[1].classList.add("text-gray-400");
    year[0].classList.add("text-gray-400");

    // Selecting the monthly plan:
    planBtn.classList.remove("translate-x-[22px]");

    // chainging the data of Plan cards
    planBox[0].innerHTML = "$9/yr";
    planBox[1].innerHTML = "$12/yr";
    planBox[2].innerHTML = "$15/yr";
    // step-3 : changing data
    planBox[3].innerHTML = "$1/mo";
    planBox[4].innerHTML = "$2/mo";
    planBox[5].innerHTML = "$2/mo";
  } else {
    monthORyear = 1;
    // changing color of Month and year:
    month[0].classList.add("text-gray-400");
    month[1].classList.add("text-gray-400");
    year[0].classList.remove("text-gray-400");
    year[1].classList.remove("text-gray-400");

    // Selecting the yearly plan:
    planBtn.classList.add("translate-x-[22px]");

    // chainging the data of Plan cards
    // step-2 : changing data
    planBox[0].innerHTML = "$90/yr <br/> 2 months free";
    planBox[1].innerHTML = "$120/yr  <br/> 2 months free";
    planBox[2].innerHTML = "$150/yr  <br/> 2 months free";
    // step-3 : changing data
    planBox[3].innerHTML = "$10/yr";
    planBox[4].innerHTML = "$20/yr";
    planBox[5].innerHTML = "$20/yr";
  }
};

// Select Plan : Arcade, Advance or Pro
const SelectPlanHandler = (val) => {
  const selectFromPlans = document.getElementsByClassName("selectPlan");
  plan = val;
  Array.from(selectFromPlans).forEach((ele) => {
    if (ele.id.toString() == "plan_" + val) {
      if (ele.classList.contains("border-blue-600")) return;
      else {
        ele.classList.remove("border-[hsl(228,_100%,_84%)]");
        ele.classList.add("border-blue-600");

        // removing bg-color:
        ele.classList.remove("bg-white");
        ele.classList.add("bg-blue-50");
      }
    } else {
      ele.classList.remove("border-blue-600");
      ele.classList.add("border-[hsl(228,_100%,_84%)]");

      // removing bg-color:
      ele.classList.remove("bg-blue-50");
      ele.classList.add("bg-white");
    }
  });
};

// Select Plan : Arcade, Advance or Pro
const checkBoxHandler = (val) => {
  const checkBoxes = document.getElementsByClassName("checkbox");
  let find = checkBoxSelected.indexOf(val - 1);
  if (find == -1) {
    checkBoxSelected.push(val - 1);
  } else {
    checkBoxSelected = checkBoxSelected.filter(
      (element) => element !== val - 1
    );
  }
  Array.from(checkBoxes).forEach((ele) => {
    if (ele.id.toString() == "checkbox_" + val) {
      if (ele.classList.contains("border-blue-600")) {
        ele.classList.remove("bg-blue-50");
        ele.classList.remove("border-blue-600");
      } else {
        ele.classList.add("border-blue-600");
        ele.classList.add("bg-blue-50");
      }
    }
  });
};

// steps: 1 -> 2 -> 3 -> 4
const stepHandler = (val) => {
  if (val == 1) {
    // validate form:
    if (validateForm()) {
      setRightSideComponent(0, 1);
      setLeftSideColor(0, 1);

      // mobile view : go_back button showing on next page:
      document.getElementById("go-back-btn").classList.remove("hidden");
      step = 2;
    }
  } else if (val == 2) {
    // select plan
    setRightSideComponent(1, 2);
    setLeftSideColor(1, 2);
    step = 3;
  } else if (val == 3) {
    let step4Items = document.getElementsByClassName("st-4-item");
    let step4Price = document.getElementsByClassName("st-4");
    let step4TotalPrice = 0;
    // step - 4 : changin main heading
    if (plan == 1) {
      step4Items[0].innerHTML =
        "Arcade" + (monthORyear == 0 ? " (Monthly)" : " (Yearly)");
    } else if (plan == 2) {
      step4Items[0].innerHTML =
        "Advanced" + (monthORyear == 0 ? " (Monthly)" : " (Yearly)");
    } else if (plan == 3) {
      step4Items[0].innerHTML =
        "Pro" + (monthORyear == 0 ? " (Monthly)" : " (Yearly)");
    }

    // step -4 : changing main heading price:
    if (monthORyear == 0) {
      step4Price[0].innerHTML = "$" + plans[0][plan - 1] + "/mo";
      step4TotalPrice += plans[0][plan - 1];
    } else {
      step4Price[0].innerHTML = "$" + plans[1][plan - 1] + "/yr";
      step4TotalPrice += plans[1][plan - 1];
    }
    // step - 4 : changing data
    if (checkBoxSelected.indexOf(0) != -1) {
      step4Items[1].classList.remove("hidden");
      if (monthORyear == 0) {
        step4Price[1].innerHTML = "+$1/mo";
        step4TotalPrice += 1;
      } else {
        step4Price[1].innerHTML = "+$10/yr";
        step4TotalPrice += 10;
      }
    } else {
      step4Items[1].classList.add("hidden");
    }

    if (checkBoxSelected.indexOf(1) != -1) {
      step4Items[2].classList.remove("hidden");
      if (monthORyear == 0) {
        step4Price[2].innerHTML = "+$2/mo";
        step4TotalPrice += 2;
      } else {
        step4Price[2].innerHTML = "+$20/yr";
        step4TotalPrice += 20;
      }
    } else {
      step4Items[2].classList.add("hidden");
    }

    if (checkBoxSelected.indexOf(2) != -1) {
      step4Items[3].classList.remove("hidden");
      if (monthORyear == 0) {
        step4Price[3].innerHTML = "+$2/mo";
        step4TotalPrice += 2;
      } else {
        step4Price[3].innerHTML = "+$20/yr";
        step4TotalPrice += 20;
      }
    } else {
      step4Items[3].classList.add("hidden");
    }

    step4Price[4].innerHTML =
      monthORyear == 0 ? "Total (per month)" : "Total (per year)";
    step4Price[5].innerHTML =
      "+$" + step4TotalPrice + "/" + (monthORyear == 0 ? "mo" : "yr");
    setRightSideComponent(2, 3);
    setLeftSideColor(2, 3);
    step = 4;
  } else if (val == 4) {
    // hidding mobile view button : next step
    document.getElementById("mobile-view-btn").classList.add("hidden");
    setRightSideComponent(3, 4);
    // setLeftSideColor(3, 4);
  }
};

const setLeftSideColor = (from, to) => {
  const leftSideSteps = document.getElementsByClassName("left-side-steps");
  leftSideSteps[from].classList.remove("bg-gray-200");
  leftSideSteps[from].classList.add("text-white");
  //next left side bg- setting...
  leftSideSteps[to].classList.add("bg-gray-200");
  leftSideSteps[to].classList.remove("text-white");
};

const setRightSideComponent = (from, to) => {
  const steps = document.getElementsByClassName("steps");
  steps[from].classList.add("hidden");
  steps[to].classList.remove("hidden");
};

const getCurrentStep = () => {
  return step;
};

// Go Back Button: go to previous page
const goBackToPreviousPage = () => {
  if (step == 1) return;
  if (step == 2) {
    // adding "class : hidden" to mobile view button:
    document.getElementById("go-back-btn").classList.add("hidden");
  }
  setLeftSideColor(step - 1, step - 2);
  setRightSideComponent(step - 1, step - 2);
  step--;
};

// Go to Step 2 : change the Your Plan:
const changePlan = () => {
  // go from 4th page to 2nd page:  0 based indexing...
  setLeftSideColor(3, 1);
  setRightSideComponent(3, 1);

  step = 2;
};
