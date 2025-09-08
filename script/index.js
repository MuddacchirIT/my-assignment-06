const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=> res.json())
    .then((json) => {
            displayPlant(json.plants);
            loadCategoryPlant();
    });
};


const displayPlant = (names) => {
const loadContainer = document.getElementById("load-container")
loadContainer.innerHTML = "";
for (let name of names){
    console.log(name);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = 
            `<div
                class=" bg-white shadow-lg text-center rounded-xl h-full flex flex-col justify-between w-full max-w-md mx-auto">
                <div class="flex justify-between items-center">
                    <div class="bg-gray-100 rounded-t-xl h-[320px] w-full overflow-hidden"><img src="${name.image}" class="h-full w-full object-cover" alt="">
                    </div>
                </div>
                <div class="space-y-5 p-6">
                    <h2 class="text-2xl font-bold text-start">${name.name}</h2>
                    <p class="text-start text-xl line-clamp-2">
                    ${name.description}</p>
                    <div class="flex justify-between">
                        <button
                            class="bg-white text-gray-600 text-lg font-semibold w-full rounded-lg border border-gray-300 transition-all duration-300 hover:bg-gray-200">${name.category}</button>
                        <div class="text-[#00A63E] text-lg font-semibold w-full">
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i>${name.price}
                        </div>
                    </div>
                    <button
                        class="bg-[#15803D] w-full h-10 text-xl font-semibold text-[#FFFFFF] px-8 rounded-full text-center mx-auto hover:opacity-80 transition">Add
                        to Cart</button>
                </div>
             </div>`;
            loadContainer.appendChild(btnDiv);   
          }
    };

const loadCategoryPlant = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategoryPlant(data.categories));
};

const displayCategoryPlant = (names) => {
    console.log(names);
    const categoryContainer = document.getElementById("category-container")
    categoryContainer.innerHTML = "";
    for (let name of names) {
        const li = document.createElement("list");
        li.innerHTML = `  <li
                        class="w-full text-lg py-2 text-center hover:bg-green-600 rounded-lg hover:text-white cursor-pointer">${name.category_name}</li>`;
        categoryContainer.append(li);
    };
};
loadPlants();
