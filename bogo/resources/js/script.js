const offers = [
  {
    discount: "30% Off",
    offerText: "Buy 1 Get 2",
    price: 18.0,
    badge: null,
    selected: true,
    originalPrice: null,
    options: {
      sizes: ["S", "M", "L"],
      colors: ["Black", "White", "Red"],
    },
  },
  {
    discount: "30% Off",
    offerText: "Buy 2 Get 4",
    price: 24.0,
    badge: "Most Popular",
    selected: false,
    originalPrice: null,
    options: {
      sizes: ["S", "M", "L"],
      colors: ["Black", "White", "Red"],
    },
  },
  {
    discount: "10% Off",
    offerText: "Buy 3 Get 6",
    price: 36.0,
    badge: null,
    selected: false,
    originalPrice: 40,
    options: {
      sizes: ["S", "M", "L"],
      colors: ["Black", "White", "Red"],
    },
  },
];

function updateTotalPrice() {
  const selectedOffer = offers.find((offer) => offer.selected);
  const totalElement = document.querySelector(".total");
  totalElement.innerText = `Total: $${selectedOffer.price.toFixed(2)} USD`;
}

function createOfferCard(
  { discount, offerText, price, selected, badge, options, originalPrice },
  index
) {
  return `
        <!--expanded card -->
        <div class="offer-card">
            <label class="offer-content">
                <input type="radio" name="offer" data-index="${index}" ${selected ? "checked" : ""}>
                <div class="offer-text">
                    <p class="offer-text-expanded">${offerText}
                    <span class="badge-expanded">${discount}</span> 
                    </p>
                      <p class="price">$${price}.00 USD ${originalPrice? `<span class="original-price">$${originalPrice}.00 USD</span>`: ""}</p>
                    </p>
                </div>
                   ${badge? `<span class="badge-popular-expanded">${badge}</span>`: ""}
            </label>
                <div class="options">
                    <div>
                        <label for="size-one">Size</label>
                        <select id="size-one">
                            ${options.sizes
                              .map((size) => `<option>${size}</option>`)
                              .join("")}
                        </select>
                    </div>
                    <div>
                       <label for="color-one">Colour</label>
                        <select id="color-one">
                            ${options.colors
                              .map((color) => `<option>${color}</option>`)
                              .join("")}
                        </select>
                    </div>
                </div>
           
        </div>
    `;
}

function createCollapsedOfferCard(
  { discount, offerText, price, selected, badge, originalPrice },
  index
) {
  return ` 
   <!--collapsed card -->
  <div class="offer-card-collapsed">
    <div class="badge">${discount}
    </div>
    <label class="offer-content">
        <input type="radio" name="offer" data-index="${index}" ${
    selected ? "checked" : ""
  }>
        <div class="offer-text">
            <p class="offer-text-collapsed">${offerText}</p>
            <p class="price">$${price}.00 USD ${
    originalPrice
      ? `<span class="original-price">$${originalPrice}.00 USD</span>`
      : ""
  }</p>
        </div>
        ${badge ? `<span class="badge-popular">${badge}</span>` : ""}
    </label>
    </div>`;
}

const offersContainer = document.getElementById("offersContainer");
offers.forEach((offer, index) => {
  if (offer.selected) {
    offersContainer.innerHTML += createOfferCard(offer, index);
  } else {
    offersContainer.innerHTML += createCollapsedOfferCard(offer, index);
  }
});

updateTotalPrice();

offersContainer.addEventListener("change", (event) => {
  if (event.target.name === "offer") {
    const selectedIndex = event.target.getAttribute("data-index");

    offers.forEach((offer, index) => {
      offer.selected = index == selectedIndex;
    });

    offersContainer.innerHTML = "";
    offers.forEach((offer, index) => {
      if (offer.selected) {
        offersContainer.innerHTML += createOfferCard(offer, index);
      } else {
        offersContainer.innerHTML += createCollapsedOfferCard(offer, index);
      }
    });

    updateTotalPrice();
  }
});
