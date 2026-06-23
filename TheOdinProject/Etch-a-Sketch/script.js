const wide = 960;
let grid_size = 16;


function createGridElement() {
    let new_grid = document.createElement("div");
    let current_grid = document.getElementById("Grid")
    new_grid.id = "Grid"
    new_grid.style.flex = "initial";
    new_grid.style.width = wide + "px";
    new_grid.style.height = wide + "px";
    new_grid.style.display = "flex";
    new_grid.style.flexDirection = "row";
    current_grid.replaceWith(new_grid);
    return new_grid;
}


function createContainer(col, index1, index2) {
    let box_size = Math.round(wide / grid_size) - 2;
    let container = document.createElement("div");
    container.id = "block_"+index1+"_"+index2;
    container.className = "container";
    container.style.flex = "initial";
    container.style.width = box_size + "px";
    container.style.height = box_size + "px";
    container.style.border = "solid 1px white";
    col.appendChild(container);
}

function createColumn(grid, index) {
    let container = document.createElement("div");
    container.id = "col_"+index;
    container.style.display = "flex";
    container.style.flexDirection = "column";
    grid.appendChild(container);
    return container;
}

function createGrid() {
    grid = createGridElement();
    for(let j=0; j<grid_size; j++) {
        col = createColumn(grid, j);
        for(let i=0; i<grid_size; i++) {
            createContainer(col, i, j);
        }
    }
    // Select all divs with the class 'container'
    const elements = document.querySelectorAll('div.container');
    elements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            // Handle hover start
            e.target.style.backgroundColor = 'lightblue';
        });
    });  
} 

createGrid();
let button = document.getElementById('button');
button.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        // Affiche une boîte de dialogue
        let size = Number(prompt("Select grid size:"));
        if(!Number.isInteger(size) || size > 64){
            alert("Incorrect grid size: " + size);
        }   
        grid_size = size;
        createGrid();
    }
}); 