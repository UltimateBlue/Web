const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

// part 1
const [players1, players2] = [game.players[0], game.players[1]]
// part 2
const Bayern_Monich_team = { 'gk': players1[0], 'fieldPlayers': players1.slice(1) }
// part 3
const allPlayers = [...players1, ...players2]
// part 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
// part 5
const vals = Object.values(game.odds);
const [team1, draw, team2] = [...vals]
// part 6
function printGoals(...playerNames) {
    playerNames.forEach(curr => {
        currScore = 0;
        counter = game.scored.length;
        while (counter) {
            if (game.scored[counter - 1] === curr) {
                currScore++;
            }
            counter--;
        }

        console.log(curr + ': ' + currScore);

    })
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
console.log(`------------------------------`);
printGoals('Lewandowski', 'Gnarby', 'Hummels')

// part 7
console.log(`The team with the more likely to win is: `);
team1 < team2 && console.log(`Team1`);
team1 > team2 && console.log(`Team2`);
team1 === team2 && console.log(`Both are equally likely`);




