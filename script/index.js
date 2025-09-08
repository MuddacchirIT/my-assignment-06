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
                    <h2 class="text-2xl font-bold text-start">${tree.name}</h2>
                    <p class="text-start text-xl line-clamp-2">
                    ${tree.description}</p>
                    <div class="flex justify-between">
                        <button
                            class="bg-white text-gray-600 text-lg font-semibold w-full rounded-lg border border-gray-300 transition-all duration-300 hover:bg-gray-200">${tree.category}</button>
                        <div class="text-[#00A63E] text-lg font-semibold w-full">
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}
                        </div>
                    </div>
                    <button
                        class="bg-[#15803D] w-full h-10 text-xl font-semibold text-[#FFFFFF] px-8 rounded-full text-center mx-auto hover:opacity-80 transition">Add
                        to Cart</button>
                </div>
             </div>`;
            plantsContainer.appendChild(btnDiv);   
        }
    };

let allPlants = [];

const filterPlants = (categoryName) => {
    const filtered = allPlants.filter(p => p.category === categoryName);
    displayPlants(filtered);
};

loadCategories();