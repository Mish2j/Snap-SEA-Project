"use strict";

/**
 *The instructions for the project are in the README.
 */

(function () {
  const CARS = [
    {
      vin: "jtezu11f88k007763",
      brand: "toyota",
      model: "cruiser",
      year: "2008",
      fuel: "gas",
      transmission: "automatic",
      mileage: "274117",
      title_status: "salvage",
      price: "6300",
      condition: "good",
      img_URL: "./assets/Cars_2_Mack.webp",
    },
    {
      vin: "1g1zd5st5jf191860",
      brand: "chevrolet",
      model: "malibu",
      year: "2018",
      fuel: "gas",
      transmission: "automatic",
      mileage: "9371",
      title_status: "clean",
      price: "14600",
      condition: "good",
      img_URL: "./assets/Chuck123.webp",
    },
    {
      vin: "JNKCV51E23M327551",
      brand: "chevrolet",
      model: "escape",
      year: "2011",
      fuel: "hybrid",
      transmission: "automatic",
      mileage: "140000",
      title_status: "clean",
      price: "8100",
      condition: "excellent",
      img_URL: "./assets/Doc_Hudson.webp",
    },
    {
      vin: "1N6AD0EV5JN745213",
      brand: "nissan",
      model: "frontier crew cab",
      year: "2018",
      fuel: "gas",
      transmission: "automatic",
      mileage: "27990",
      title_status: "clean",
      price: "8500",
      condition: "good",
      img_URL: "./assets/Dusty_Rust-Eze.webp",
    },
    {
      vin: "ZASFAKBN3J7B64774",
      brand: "subaru",
      model: "impreza",
      year: "2006",
      fuel: "gas",
      transmission: "automatic",
      mileage: "97000",
      title_status: "salvage",
      price: "2100",
      condition: "fair",
      img_URL: "./assets/Flo3.webp",
    },
    {
      vin: "WBABK6328RED15065",
      brand: "bmw",
      model: "318ic cabrio",
      year: "1994",
      fuel: "gas",
      transmission: "manual",
      mileage: "304000",
      title_status: "clean",
      price: "3300",
      condition: "fair",
      img_URL: "./assets/Frank_1.webp",
    },
    {
      vin: "1FTEW1EG5JKF63972",
      brand: "jaguar",
      model: "e-pace p250 se sport",
      year: "2018",
      fuel: "gas",
      transmission: "automatic",
      mileage: "8490",
      title_status: "clean",
      price: "35990",
      condition: "good",
      img_URL: "./assets/Lighting_mcqueen.webp",
    },
    {
      vin: "JTEBU5JR2L5746055",
      brand: "toyota",
      model: "4runner sr5 sport utility",
      year: "2020",
      fuel: "gas",
      transmission: "automatic",
      mileage: "3110",
      title_status: "clean",
      price: "39590",
      condition: "good",
      img_URL: "./assets/LuigiCars3.webp",
    },
  ];

  const filter = document.querySelector(".filter");
  const transmissionFilterBox = filter.querySelector("#transmission");
  const titleFilterBox = filter.querySelector("#title-status");
  const conditionFilterBox = filter.querySelector("#condition");
  const fuelFilterBox = filter.querySelector("#fuel");
  const minPrice = filter.querySelector('input[type="number"]#min');
  const maxPrice = filter.querySelector('input[type="number"]#max');
  const minMil = filter.querySelector('input[type="number"]#minMil');
  const maxMil = filter.querySelector('input[type="number"]#maxMil');
  const searchBar = document.querySelector("#searchBar");
  const sidebarCloseBtn = document.querySelector(".saved-card-close");
  const sidebarOpenBtn = document.querySelector(".sidebar-open");
  const sidebar = document.querySelector("aside.saved");

  let savedCarsVIN = [];
  // const filtered = [];

  const formatPrice = (amount, currencyCode = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  const saveCar = (VIN) => {
    if (savedCarsVIN.includes(VIN)) return;
    savedCarsVIN.push(VIN);
  };

  const removeCar = (VIN) => {
    if (!savedCarsVIN.includes(VIN)) return;
    const newSavedCarsVIN = savedCarsVIN.filter((vin) => vin !== VIN);
    savedCarsVIN = newSavedCarsVIN;
  };

  const openSidebar = () => {
    if (!sidebar.classList.contains("closed")) return;
    sidebar.classList.remove("closed");
    sidebar.classList.add("active");
  };

  const closeSidebar = () => {
    if (!sidebar.classList.contains("active")) return;
    sidebar.classList.remove("active");
    sidebar.classList.add("closed");
  };

  const editCardContent = (card, VIN) => {
    const cardHeader = card.querySelector(".card-title h3");
    const carCondition = card.querySelector(".condition");
    const carTransmission = card.querySelector(".transmission");
    const carPrice = card.querySelector(".price");
    const carMil = card.querySelector(".mileage");
    const carFuel = card.querySelector(".fuel");
    const carTitle = card.querySelector(".title_status");
    const saveButton = card.querySelector(".card-save");
    const image = card.querySelector(".card-img img");
    const car = CARS.find((car) => car.vin === VIN);
    const cardTitle = `${car.year} ${car.brand} ${car.model}`;

    card.style.display = "block";

    cardHeader.innerText = cardTitle;
    carCondition.innerText = `Condition: ${car.condition}`;
    carTransmission.innerText = `Condition: ${car.transmission}`;
    carPrice.innerText = `Price: ${formatPrice(car.price)}`;
    carMil.innerText = `Milage: ${car.mileage} miles`;
    carFuel.innerText = `Fuel: ${car.fuel}`;
    carTitle.innerText = `Title: ${car.title_status}`;
    image.src = car.img_URL;

    saveButton.disabled = savedCarsVIN.includes(VIN) ? true : false;

    saveButton.addEventListener("click", () => {
      saveCar(VIN);
      openSidebar();
      displaySavedCards();
      saveButton.disabled = true;
    });
  };

  const displayCards = (data) => {
    const cardContainer = document.querySelector("#card-container");
    const templateCard = document.querySelector(".card");

    cardContainer.innerHTML = "";

    data.forEach((car) => {
      const newCard = templateCard.cloneNode(true);
      editCardContent(newCard, car.vin);
      cardContainer.appendChild(newCard);
    });
  };

  const displaySavedCards = () => {
    const cardContainer = document.querySelector("#saved-card-container");
    const templateCard = document.querySelector(".saved-card");
    const savedCars = CARS.filter((c) => savedCarsVIN.includes(c.vin));

    cardContainer.innerHTML = "";

    savedCars.forEach((car) => {
      const newCard = templateCard.cloneNode(true);
      const cardHeader = newCard.querySelector("h3");
      const carPrice = newCard.querySelector(".price");
      const removeButton = newCard.querySelector(".saved-card-remove");
      const cardTitle = `${car.year} ${car.brand} ${car.model}`;

      cardHeader.innerText = cardTitle;
      carPrice.innerText = `Price: $${car.price}`;
      newCard.style.display = "block";

      removeButton.addEventListener("click", (event) => {
        removeCar(car.vin);
        savedCarsVIN.length === 0 && closeSidebar();
        displayCards(CARS);
        filterHandler(event);
        displaySavedCards();
      });
      cardContainer.appendChild(newCard);
    });
  };

  const filterCheckboxSet = (event) => {
    const currentCheckbox = event.target;
    const currentField = event.currentTarget;

    const allCheckboxes = [
      ...currentField.querySelectorAll('input[type="checkbox"]'),
    ];
    const checkboxAll = allCheckboxes[0].value;
    const filters = [];

    allCheckboxes.forEach((cb) => {
      if (currentCheckbox.value === checkboxAll && cb.value !== checkboxAll) {
        filters.push(cb.value);
        return;
      }

      if (currentCheckbox.value !== checkboxAll && cb.checked) {
        filters.push(cb.value);
      }
    });

    return filters;
  };

  const filterHandler = (event) => {
    const allCheckboxes = filter.querySelectorAll('input[type="checkbox"]');
    // const transmissionFilterBox = filter.querySelector("#transmission");
    // const titleFilterBox = filter.querySelector("#title-status");
    // const conditionFilterBox = filter.querySelector("#condition");
    // const fuelFilterBox = filter.querySelector("#fuel");

    // const currentTargetBox = event.currentTarget;
    // const currentTargetCheckboxes = event.currentTarget.querySelectorAll(
    //   'input[type="checkbox"]'
    // );
    const searchQuery = searchBar.value;
    const checkedValues = [];

    // if(event.currentTarget === transmissionFilterBox){

    // }
    // console.log(checkedValues);
    // allCheckboxes.forEach((cb) => {
    //   if (cb.checked) {
    //     values.push(cb.value);
    //   }
    // });
    // const checkFields = [...document.querySelectorAll(".filter-box")].filter();

    console.log(checkedValues);

    const filteredData = CARS.filter((car) => {
      // const sorted = [...numbers].sort((a, b) => a - b);
      // TODO: check if min is smaller than max
      const filterMinPrice = parseInt(minPrice.value);
      const filterMaxPrice = parseInt(maxPrice.value);
      const filterPrice =
        parseInt(car.price) >= filterMinPrice &&
        parseInt(car.price) <= filterMaxPrice;
      const filterMinMil = parseInt(minMil.value);
      const filterMaxMil = parseInt(maxMil.value);
      const filterMil =
        parseInt(car.mileage) >= filterMinMil &&
        parseInt(car.mileage) <= filterMaxMil;

      // TODO: add checkedValues.length === 0 ||
      const filterTrans = checkedValues.includes(car.transmission);
      const filterCondition = checkedValues.includes(car.condition);
      const filterTitle = checkedValues.includes(car.title_status);
      const filterFuel = checkedValues.includes(car.fuel);
      const query = Object.values(car)
        .join("")
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      return (
        filterTrans &&
        filterCondition &&
        filterTitle &&
        filterFuel &&
        filterPrice &&
        filterMil &&
        query
      );
    });

    console.log(filteredData);
    // if nothing was found, display a message
    displayCards(filteredData);
  };

  const checkboxAdjuster = (e) => {
    const container = e.currentTarget;
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const targetValue = e.target.value;
    const checkboxAll = checkboxes[0]; // checkbox with label "All"
    const isSomeChecked = [...checkboxes].some(
      (cb) => cb.checked && cb.value !== checkboxAll.value
    );

    // if the target is the checkbox "all" and any checkbox (other than all) is checked, uncheck all checked boxes and check "all"
    if (isSomeChecked && targetValue === checkboxAll.value) {
      checkboxes.forEach((cb) =>
        cb.value !== checkboxAll.value
          ? (cb.checked = false)
          : (cb.checked = true)
      );
      return;
    }

    // if non of the checkboxes is checked, check "all"
    if (!checkboxAll.checked && !isSomeChecked) {
      checkboxAll.checked = true;
      return;
    }

    // if the target is not the checkbox "all", uncheck "all"
    if (targetValue !== checkboxAll.value) {
      checkboxAll.checked = false;
      return;
    }
  };

  transmissionFilterBox.addEventListener("change", (event) => {
    checkboxAdjuster(event);
    // filterCheckboxSet(event);
    filterHandler(event);
  });
  conditionFilterBox.addEventListener("change", (event) => {
    checkboxAdjuster(event);
    // filterCheckboxSet(event);
    filterHandler(event);
  });
  titleFilterBox.addEventListener("change", (event) => {
    checkboxAdjuster(event);
    // filterCheckboxSet(event);
    filterHandler(event);
  });
  fuelFilterBox.addEventListener("change", (event) => {
    checkboxAdjuster(event);
    // filterCheckboxSet(event);
    filterHandler(event);
  });
  sidebarCloseBtn.addEventListener("click", closeSidebar);
  sidebarOpenBtn.addEventListener("click", openSidebar);
  minPrice.addEventListener("input", filterHandler);
  maxPrice.addEventListener("input", filterHandler);
  minMil.addEventListener("input", filterHandler);
  maxMil.addEventListener("input", filterHandler);
  searchBar.addEventListener("input", filterHandler);

  document.addEventListener("DOMContentLoaded", () => {
    displayCards(CARS);
  });
})();
