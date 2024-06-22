import { recipes } from './assets/data/recipes.js';

// Select the filter container
const filterContainer = document.querySelector('.filter');

// Function to create dropdown items dynamically, sorted alphabetically and unique
function createDropdownItems(items, dropdownMenu) {
    dropdownMenu.innerHTML = ''; // Clear previous items
    
    // Sort items alphabetically
    items.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Remove duplicates using Set and then convert back to array
    const uniqueItems = [...new Set(items)];

    uniqueItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = '#';
        a.textContent = item;
        li.appendChild(a);
        dropdownMenu.appendChild(li);
    });
}

// Function to filter and update dropdown items based on search input
function filterDropdownItems(searchInput, items, dropdownMenu) {
    const filter = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(filter));
    createDropdownItems(filteredItems, dropdownMenu);
}

// Populate dropdown menus with initial data
const ingredientDropdown = filterContainer.querySelector('#ingredientDropdownButton + .dropdown-menu');
const applianceDropdown = filterContainer.querySelector('#applianceDropdownButton + .dropdown-menu');
const utensilDropdown = filterContainer.querySelector('#utensilDropdownButton + .dropdown-menu');

// Extract unique ingredients, appliances, and utensils from recipes
const allIngredients = [];
const allAppliances = [];
const allUtensils = [];

recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
        if (ingredient.ingredient && !allIngredients.includes(ingredient.ingredient)) {
            allIngredients.push(ingredient.ingredient);
        }
    });

    if (recipe.appliance && !allAppliances.includes(recipe.appliance)) {
        allAppliances.push(recipe.appliance);
    }

    recipe.ustensils.forEach(utensil => {
        if (!allUtensils.includes(utensil)) {
            allUtensils.push(utensil);
        }
    });
});



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function cardOfRecipe(recipe){
    const recipeCard = document.createElement('div');
    recipeCard.className = 'card mb-4'; // Use Bootstrap card classes and margin-bottom for spacing

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.setAttribute("src", `./assets/visuals/recipe-pic/${recipe.image}`);
    img.setAttribute('alt', 'Recipe Image');

    const recipeCardBody = document.createElement('div');
    recipeCardBody.className = 'card-body';
    
    const recipeTimer = document.createElement('div');
    recipeTimer.className = 'card-timer';
    recipeTimer.innerHTML = `${recipe.time} min`;

    const h2 = document.createElement('h2');
    h2.className = 'card-title';
    h2.innerHTML = recipe.name;

    const recipeDescription = document.createElement('h3');
    recipeDescription.innerHTML = 'RECETTE';
    recipeDescription.className = 'card-description';

    const recipeCardText = document.createElement('p');
    recipeCardText.className = 'card-text truncate-text'; // Add truncate-text class for truncation
    recipeCardText.innerHTML = recipe.description;

    const recipeIngredient = document.createElement('h3');
    recipeIngredient.innerHTML = 'INGREDIENTS';
    recipeIngredient.className = 'card-ingredients';

    const ingredientItemSection = document.createElement('div');
    ingredientItemSection.className = 'row';

    // Iterate through all the ingredients
    recipe.ingredients.forEach(ingredient => {
        const ingredientItemPair = document.createElement('div');
        ingredientItemPair.className = 'col-6';
        
        const ingredientName = document.createElement('div');
        ingredientName.className = 'ingredient-name';
        ingredientName.innerHTML = ingredient.ingredient;

        const ingredientQuantity = document.createElement('div');
        ingredientQuantity.className = 'ingredient-quantity';
        ingredientQuantity.innerHTML = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';

        ingredientItemPair.appendChild(ingredientName);
        ingredientItemPair.appendChild(ingredientQuantity);
        ingredientItemSection.appendChild(ingredientItemPair);
    });

    recipeCardBody.appendChild(h2);
    recipeCardBody.appendChild(recipeDescription);
    recipeCardBody.appendChild(recipeCardText);
    recipeCardBody.appendChild(recipeIngredient);
    recipeCardBody.appendChild(ingredientItemSection);
    recipeCard.appendChild(recipeTimer);
    recipeCard.appendChild(img);
    recipeCard.appendChild(recipeCardBody);

    return recipeCard;
}

function displayRecipes(recipes) {
    const main = document.getElementById('mainRecipe');

    if (!recipes || recipes.length === 0) {
        console.error('Recipes not found!');
        return;
    }

    let row = document.createElement('div');
    row.className = 'row';

    recipes.forEach((recipe, index) => {
        const recipeCardCol = document.createElement('div');
        recipeCardCol.className = 'col-md-4'; // 4 columns for each card to ensure 3 cards per row
        const recipeCard = cardOfRecipe(recipe);
        recipeCardCol.appendChild(recipeCard);
        row.appendChild(recipeCardCol);

        // After every third recipe, create a new row
        if ((index + 1) % 3 === 0) {
            main.appendChild(row);
            row = document.createElement('div');
            row.className = 'row';
        }
    });

    // Append any remaining cards
    if (row.children.length > 0) {
        main.appendChild(row);
    }
}

displayRecipes(recipes);


// Populate initial dropdown menus
createDropdownItems(allIngredients, ingredientDropdown);
createDropdownItems(allAppliances, applianceDropdown);
createDropdownItems(allUtensils, utensilDropdown);

// Event listeners for search input
const ingredientSearchInput = filterContainer.querySelector('#ingredientDropdownButton + .dropdown-menu .dropdown-search');
const applianceSearchInput = filterContainer.querySelector('#applianceDropdownButton + .dropdown-menu .dropdown-search');
const utensilSearchInput = filterContainer.querySelector('#utensilDropdownButton + .dropdown-menu .dropdown-search');

ingredientSearchInput.addEventListener('input', function() {
    filterDropdownItems(ingredientSearchInput, allIngredients, ingredientDropdown);
});

applianceSearchInput.addEventListener('input', function() {
    filterDropdownItems(applianceSearchInput, allAppliances, applianceDropdown);
});

utensilSearchInput.addEventListener('input', function() {
    filterDropdownItems(utensilSearchInput, allUtensils, utensilDropdown);
});
