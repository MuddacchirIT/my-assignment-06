const loadCategories = () => {
    const url ="https://openapi.programming-hero.com/api/categories";
    fetch(url)
    .then(res => res.json())
    .then(json => { displayCategories(json.categories);
    loadPlants();
    });
};
const displayCategories = (names) => {
    console.log(names);
    const categoriesContainer = document.getElementById("categories-container")
    categoriesContainer.innerHTML = "";
    names.forEach(name => {
            const buttonsDiv = document.createElement("div");
            buttonsDiv.innerHTML = `<button onclick="filterPlants('${name.category_name}')"
            class="w-full text-lg py-2 text-center hover:bg-green-600 rounded-lg hover:text-white cursor-pointer">${name.category_name}</button>`;
            categoriesContainer.append(buttonsDiv);
        });
    };

const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=> res.json())
    .then((json) => {
            allPlants = json.plants; 
            displayPlants(allPlants);
    });
};

const displayPlants = (trees) => {
const plantsContainer = document.getElementById("plants-container")
plantsContainer.innerHTML = "";
for (let tree of trees){
    console.log(tree);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = 
            `<div
                class=" bg-white shadow-lg text-center rounded-xl h-full flex flex-col justify-between w-full max-w-md mx-auto">
                <div class="flex justify-between items-center">
                    <div class="bg-gray-100 rounded-t-xl h-[320px] w-full overflow-hidden"><img src="${tree.image}" class="h-full w-full object-cover" alt="">
                    </div>
                </div>
                <div class="space-y-5 p-6">
                    <h2 onclick="loadDetails(${tree.id})" class="text-2xl font-bold text-start">${tree.name}</h2>
                    <p class="text-start text-xl line-clamp-2">
                    ${tree.description}</p>
                    <div class="flex justify-between">
                        <button
                            class="bg-white text-gray-600 text-lg font-semibold w-full rounded-lg border border-gray-300 transition-all duration-300 hover:bg-gray-200">${tree.category}</button>
                        <div class="text-[#15803D100] text-lg font-semibold w-full">
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}
                        </div>
                    </div>
                    <button
                        class="add-to-cart bg-[#15803D95] w-full h-10 text-xl font-semibold text-[#FFFFFF] px-8 rounded-full text-center mx-auto hover:opacity-70 transition">Add
                        to Cart</button>
                </div>
             </div>`;
            plantsContainer.appendChild(btnDiv); 
    const addBtn = btnDiv.querySelector(".add-to-cart");
    addBtn.addEventListener("click", () => {
    cart.push({ name: tree.name, price: tree.price });
    updateCart();
    alert(`${tree.name} has been added to the cart.`);
    });         
  }
};

const loadDetails = async(plantsId) => {
    const url = `https://openapi.programming-hero.com/api/plant/${plantsId}`;
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.plants);
};

const displayDetails = (plant) => {
    console.log(plant);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `<h2 class="text-2xl font-bold mb-2">${plant.name}</h2>
                        <div class=" bg-white shadow-lg text-center rounded-xl h-full flex flex-row justify-start w-full max-w-3xl mx-auto">
                            <div class="bg-gray-100 rounded-xl h-[420px] w-full overflow-hidden"><img src="${plant.image}" class="h-full w-full object-cover" alt="">
                            </div>
                        </div>
                    <h2 class="text-xl font-bold my-1"><span class="text-2xl font-semibold">Category:</span> ${plant.category}</h2>
                    <h4 class="text-lg font-semibold mb-1"><span class="text-xl font-semibold">Price:</span> <i class="fa-sharp fa-solid fa-bangladeshi-taka-sign fa-xs"></i>${plant.price}</h4>
                   <p class="text-lg"><span class="text-xl font-semibold">Description:</span> ${plant.description}</p>
                    </div>
             </div>`;
    document.getElementById("details_modal").showModal();
}

let cart = [];
let allPlants = [];

const filterPlants = (categoryName) => {
    const filtered = allPlants.filter(p => p.category === categoryName);
    displayPlants(filtered);
};

const removeFromCart = (index) => {
cart.splice(index, 1);
updateCart();
};

const updateCart = () => {
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
cartItems.innerHTML = "";

let total = 0;
    cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center", "text-black","font-semibold", "text-xl", "bg-gray-50", "px-3", "py-2", "rounded");
    li.innerHTML = `
    <div class="flex justify-between items-center gap-3">
    <div class="flex flex-col">
    <div>${item.name}</div>
    <div"><i class="fa-sharp fa-solid fa-bangladeshi-taka-sign fa-xs"></i>${item.price}</div></div>
    <button onclick="removeFromCart(${index})" 
    class="text-red-500 hover:text-red-800 font-bold"><i class="fa-solid fa-xmark fa-lg"></i></button>
    </div>`;
        cartItems.appendChild(li);
     });
    cartTotal.textContent = total;
};

loadCategories();