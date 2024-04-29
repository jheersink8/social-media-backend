const { User } = require('../models')

// Seed data for users
const userData = [
    { username: 'jolly.llama', email: 'jolly.llama@example.com' },
    { username: 'brave.panther', email: 'brave.panther@example.com' },
    { username: 'crazy.dragon', email: 'crazy.dragon@example.com' },
    { username: 'fierce.tiger', email: 'fierce.tiger@example.com' },
    { username: 'gentle.bear', email: 'gentle.bear@example.com' },
    { username: 'happy.owl', email: 'happy.owl@example.com' },
    { username: 'lucky.fox', email: 'lucky.fox@example.com' },
    { username: 'mystic.phoenix', email: 'mystic.phoenix@example.com' },
    { username: 'powerful.lion', email: 'powerful.lion@example.com' },
    { username: 'swift.hawk', email: 'swift.hawk@example.com' },
    { username: 'tiny.bunny', email: 'tiny.bunny@example.com' },
    { username: 'wise.owl', email: 'wise.owl@example.com' },
    { username: 'zealous.wolf', email: 'zealous.wolf@example.com' },
    { username: 'daring.dragon', email: 'daring.dragon@example.com' },
    { username: 'fearless.panther', email: 'fearless.panther@example.com' },
    { username: 'graceful.unicorn', email: 'graceful.unicorn@example.com' },
    { username: 'magical.pixie', email: 'magical.pixie@example.com' },
    { username: 'noble.elephant', email: 'noble.elephant@example.com' }
];

// Seed data for thoughts on some random video games
const thoughts = [
    { thoughtText: "Mass Effect 2's gripping narrative and dynamic character interactions make every decision feel consequential, immersing players in a thrilling space odyssey where the fate of the galaxy hangs in the balance." },
    { thoughtText: "Red Dead Redemption II's vast open world and compelling story weave together to create an immersive Wild West experience filled with memorable characters, breathtaking vistas, and moral dilemmas at every turn." },
    { thoughtText: "The Legend of Zelda: Tears of the Kingdom transports players to a magical realm brimming with adventure, where they must embark on a quest to restore balance to the land and uncover the secrets of ancient prophecies." },
    { thoughtText: "Fallout 4's post-apocalyptic world is a playground for exploration and discovery, offering endless opportunities for players to scavenge, build, and survive in a harsh and unforgiving wasteland." },
    { thoughtText: "The Witcher 3: Wild Hunt Complete Edition combines a gripping narrative, richly detailed world, and morally complex choices to deliver an epic adventure that will leave a lasting impression on players." },
    { thoughtText: "Bioshock's atmospheric setting, thought-provoking story, and immersive gameplay combine to create a hauntingly beautiful experience that challenges players to question the nature of reality and free will." },
    { thoughtText: "Halo 3's iconic multiplayer and epic campaign deliver pulse-pounding action and unforgettable moments, solidifying its place as one of the greatest shooters of all time." },
    { thoughtText: "Metroid Dread's intense gameplay and atmospheric world draw players into a suspenseful sci-fi adventure where they must outwit relentless enemies and uncover the secrets of a mysterious alien planet." },
    { thoughtText: "Portal 2's clever puzzles and witty humor make for an engaging and memorable experience, while its co-op mode adds an extra layer of challenge and hilarity for players to enjoy with friends." },
    { thoughtText: "Super Mario Galaxy 2's imaginative worlds and gravity-defying platforming offer a delightful and whimsical journey through space, filled with creative challenges and charming characters." },
    { thoughtText: "Super Meat Boy's punishing difficulty and precise platforming provide a challenging and rewarding experience for players who enjoy testing their skills and mastering each level's obstacles." },
    { thoughtText: "The Elder Scrolls V: Skyrim's vast open world and endless possibilities for exploration and adventure make it a timeless classic that continues to captivate players with its immersive lore and epic quests." },
    { thoughtText: "The Last of Us Part II's emotional storytelling and intense gameplay deliver a harrowing and unforgettable experience, challenging players to confront difficult moral choices and the consequences of their actions." },
    { thoughtText: "Uncharted 4: A Thieve's End's cinematic storytelling and thrilling action sequences make it a fitting conclusion to Nathan Drake's epic adventures, offering a satisfying blend of heart-pounding excitement and poignant moments." },
    { thoughtText: "A Plague Tale: Innocence's haunting atmosphere and gripping narrative immerse players in a dark and atmospheric tale of survival and sacrifice, set against the backdrop of a plague-ravaged medieval France." },
    { thoughtText: "Death Stranding's enigmatic story and innovative gameplay mechanics combine to create a uniquely immersive experience that challenges players to forge connections and rebuild society in a fractured world." },
    { thoughtText: "Resident Evil 4's tense atmosphere and intense action setpieces make it a standout entry in the series, offering a thrilling and terrifying journey through a village plagued by sinister forces." },
    { thoughtText: "Stray's atmospheric world and unique premise, where players control a stray cat navigating a cyberpunk city, promise an intriguing and immersive gameplay experience filled with mystery and adventure." },
    { thoughtText: "Assassin's Creed Valhalla's expansive open world and Viking-themed setting offer a captivating and immersive experience, allowing players to embark on epic raids, forge alliances, and shape the fate of England." },
    { thoughtText: "Cuphead's stunning hand-drawn visuals and challenging boss battles make it a visually striking and satisfying experience for players seeking a nostalgic yet challenging gameplay experience." },
    { thoughtText: "Alan Wake's gripping narrative and eerie atmosphere draw players into a psychological thriller where light is both their greatest weapon and their only defense against the darkness that threatens to consume them." },
    { thoughtText: "Beat Saber's addictive rhythm-based gameplay and energetic soundtrack make it a must-play experience for VR enthusiasts, offering a fun and exhilarating way to get active and groove to the beat." },
    { thoughtText: "Dark Souls' punishing difficulty and richly atmospheric world create an immersive and challenging experience that rewards perseverance and skill, making it a beloved classic among hardcore gamers." },
    { thoughtText: "Destiny's expansive universe and cooperative gameplay provide endless opportunities for players to team up with friends and embark on epic adventures across the galaxy, earning powerful gear and uncovering the mysteries of the Traveler." },
    { thoughtText: "Fallout New Vegas' branching storylines and morally grey choices offer a deep and immersive role-playing experience set in the post-apocalyptic wasteland of the Mojave Desert, where every decision shapes the fate of the world." },
    { thoughtText: "FEZ's mind-bending puzzles and charming pixel art style create a mesmerizing and delightful experience for players, inviting them to explore a whimsical world filled with secrets and surprises." },
    { thoughtText: "Gears of War's visceral combat and epic setpieces make it a thrilling and action-packed experience, with its iconic cover-based mechanics and intense multiplayer modes keeping players engaged for hours on end." },
    { thoughtText: "God of War Ragnarok's stunning visuals and gripping narrative promise an epic conclusion to Kratos' journey, with new enemies, allies, and challenges awaiting players in the realms of Norse mythology." },
    { thoughtText: "Grand Theft Auto V's sprawling open world and immersive storytelling make it a modern classic, offering players the freedom to explore a satirical take on contemporary America and live out their criminal fantasies." },
    { thoughtText: "Job Simulator's quirky humor and inventive gameplay make it a standout title in the world of virtual reality, offering players a hilarious and immersive simulation of everyday tasks gone awry." },
    { thoughtText: "Mario Kart 8's fast-paced racing action and colorful cast of characters make it a must-play for fans of arcade-style multiplayer fun, with its dynamic tracks and chaotic items keeping players coming back for more." },
    { thoughtText: "Tetris Effect's mesmerizing visuals and immersive soundscapes elevate the classic puzzle gameplay to new heights, offering a transcendent experience that is both relaxing and exhilarating for players of all skill levels." },
    { thoughtText: "Titanfall 2's fluid movement and exhilarating mech combat make it a standout multiplayer shooter, while its gripping single-player campaign delivers a thrilling sci-fi adventure filled with heart-pounding action and memorable moments." }
];

// Seed data for reactions to thoughts
const reactions = [
    { reactionBody: "I totally agree!" },
    { reactionBody: "This game is amazing!" },
    { reactionBody: "Wow, what an adventure!" },
    { reactionBody: "Absolutely love it!" },
    { reactionBody: "Such an immersive experience!" },
    { reactionBody: "Incredible atmosphere!" },
    { reactionBody: "So much fun!" },
    { reactionBody: "Keeps me on the edge of my seat!" },
    { reactionBody: "Brilliant puzzles!" },
    { reactionBody: "I can't get enough of it!" },
    { reactionBody: "Insanely difficult!" },
    { reactionBody: "Endless possibilities!" },
    { reactionBody: "Tugs at the heartstrings!" },
    { reactionBody: "Action-packed and thrilling!" },
    { reactionBody: "Gripping storyline!" },
    { reactionBody: "So atmospheric!" },
    { reactionBody: "Spooky and immersive!" },
    { reactionBody: "Challenging but rewarding!" },
    { reactionBody: "Exciting gameplay!" },
    { reactionBody: "A rollercoaster of emotions!" },
    { reactionBody: "So much nostalgia!" },
    { reactionBody: "A true classic!" },
    { reactionBody: "Can't put it down!" },
    { reactionBody: "Adrenaline rush!" },
    { reactionBody: "Absolutely breathtaking!" },
    { reactionBody: "Addictive gameplay!" },
    { reactionBody: "Beautifully crafted!" },
    { reactionBody: "Captivating world!" },
    { reactionBody: "Intense action!" },
    { reactionBody: "Mind-bending puzzles!" },
    { reactionBody: "Hilarious and entertaining!" },
    { reactionBody: "Fun for all ages!" },
    { reactionBody: "Mesmerizing visuals!" },
    { reactionBody: "Brilliantly designed!" },
    { reactionBody: "A masterpiece!" },
    { reactionBody: "Truly unforgettable!" },
    { reactionBody: "Absolutely fantastic!" },
    { reactionBody: "A true gem!" },
    { reactionBody: "So much depth!" },
    { reactionBody: "A work of art!" },
    { reactionBody: "I'm hooked!" },
    { reactionBody: "So engaging!" },
    { reactionBody: "Absolutely captivating!" },
    { reactionBody: "Just what I needed!" },
    { reactionBody: "So satisfying!" },
    { reactionBody: "Brings back memories!" },
    { reactionBody: "Mind-blowing!" },
    { reactionBody: "A true masterpiece!" },
    { reactionBody: "Can't stop playing!" },
    { reactionBody: "Feels like home!" },
    { reactionBody: "Pure joy!" },
    { reactionBody: "Epic adventure!" },
    { reactionBody: "Keeps me coming back for more!" },
    { reactionBody: "So much fun!" },
    { reactionBody: "I'm in awe!" },
    { reactionBody: "Absolutely brilliant!" },
    { reactionBody: "A true gem!" },
    { reactionBody: "Addictively good!" },
    { reactionBody: "Incredible experience!" },
    { reactionBody: "Blown away!" },
    { reactionBody: "A must-play!" },
    { reactionBody: "Feels like magic!" },
    { reactionBody: "So immersive!" },
    { reactionBody: "A real thrill!" },
    { reactionBody: "Brings a smile to my face!" },
    { reactionBody: "Just keeps getting better!" },
    { reactionBody: "Unforgettable journey!" },
    { reactionBody: "Absolutely stunning!" },
    { reactionBody: "Totally addictive!" },
    { reactionBody: "So much depth!" }
];

getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Assign a random user to each thought
const thoughtData = [];
thoughts.forEach((thought) => {
    const randomUser = getRandomValue(userData);
    const newThought = {
        thoughtText: thought.thoughtText,
        username: randomUser.username
    };
    thoughtData.push(newThought);
});


// Pick a value between 0 and 5 for friend picker and reaction picker
random5 = () => Math.floor(Math.random() * 6);


// Pick a random reaction

const generateReaction = () => {
    const reactionData = [];
    for (let i = 0; i < random5(); i++) {
        const randomUser = getRandomValue(userData);
        reactionData.push({
            reactionBody: getRandomValue(reactions).reactionBody,
            username: randomUser.username
        });
    }
    return reactionData;
};
module.exports = { userData, thoughtData, random5, generateReaction };
