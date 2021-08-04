// const { resolve } = require("path/posix");

let recp = function (id, title, recipe, writter) {
    this.id = id;
    this.title = title;
    this.recipe = recipe;
    this.writter = writter;
};
const recipes = [new recp(12, 'Pizza', 'use a lot of cheese!', 'Blue'),
new recp(20, 'cake', 'dont forget to add venilla!', 'Jonas'),
new recp(35, 'soup', 'dont use much water!', 'Blue'),
new recp(66, 'potato fries', 'dont burn them!', 'Jonas')];

const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        const ids = recipes.map((curr) => curr.id);
        console.log(`These are recipes id: ${ids}`);
        let id = parseInt(prompt('choose an id: '));
        resolve(id);
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) =>
        setTimeout(ID => {
            recipes.forEach(curr => {
                var flag = 0;
                if (curr.id === ID) {
                    flag = 1;
                    resolve(curr);
                    console.log(`${flag} here is the recipe: \n${curr.id}: ${curr.title}, ${curr.recipe}`);
                }
                // if (flag === 0) {
                //     reject('There is not such an ID!!');
                // }
            })
        }, 2000, recID)

    );
}

const getRelated = writter => {
    return new Promise((resolve, reject) => {
        setTimeout(writter => {
            let related = [];
            recipes.forEach(curr => {
                if (curr.writter === writter) {
                    related.push(curr);
                }
                resolve(related);
                related.forEach(curr => console.log(`${curr.id}: ${curr.title}: ${curr.recipe}`));
            });
        }, 2000, writter)
    });
}

getIDs
    .then(ids => {
        console.log(ids);
        return getRecipe(ids);
    })
    .then(recipe => {
        console.log(recipe);
        return getRelated(recipe.writter);
    })
    .then(related => {
        console.log(related);
    });

