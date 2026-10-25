// PrepPortal script - each feature is isolated, so one problem cannot break the others

// Hooks that let separate features talk to the cloud sync (see firebase.js)
window.PrepSync = { push: function () {} };

try {

// =====================================================
// DSA TOPICS  (edit links here - nothing is hard-coded in the HTML)
// Order = easy -> difficult
// =====================================================

const LC = "https://leetcode.com/problemset/?topicSlugs=";
const HR_DS = "https://www.hackerrank.com/domains/data-structures";
const HR_ALGO = "https://www.hackerrank.com/domains/algorithms";

function hrDS(sub) {
    return HR_DS + "?filters%5Bsubdomains%5D%5B%5D=" + sub;
}

function hrAlgo(sub) {
    return HR_ALGO + "?filters%5Bsubdomains%5D%5B%5D=" + sub;
}

const topics = [

    // ---------- EASY ----------
    {
        id: "arrays", level: "easy", icon: "📚", title: "Arrays",
        desc: "Traversal, prefix sums, rotation, two pointers and sliding window basics.",
        leetcode: LC + "array",
        gfg: "https://www.geeksforgeeks.org/array-data-structure/",
        hackerrank: hrDS("arrays")
    },
    {
        id: "strings", level: "easy", icon: "🔤", title: "Strings",
        desc: "Palindromes, anagrams, pattern matching and string manipulation.",
        leetcode: LC + "string",
        gfg: "https://www.geeksforgeeks.org/string-data-structure/",
        hackerrank: hrAlgo("strings")
    },
    {
        id: "hashing", level: "easy", icon: "#️⃣", title: "Hashing",
        desc: "HashMap and HashSet problems: frequency counting, two-sum, duplicates.",
        leetcode: LC + "hash-table",
        gfg: "https://www.geeksforgeeks.org/hashing-data-structure/",
        hackerrank: HR_DS
    },
    {
        id: "searching-sorting", level: "easy", icon: "🔍", title: "Searching & Sorting",
        desc: "Binary search, merge sort, quick sort and sorting-based problems.",
        leetcode: LC + "binary-search",
        gfg: "https://www.geeksforgeeks.org/binary-search/",
        hackerrank: hrAlgo("search")
    },

    // ---------- MEDIUM ----------
    {
        id: "linked-list", level: "medium", icon: "🔗", title: "Linked List",
        desc: "Reversal, cycle detection, merging lists and fast/slow pointers.",
        leetcode: LC + "linked-list",
        gfg: "https://www.geeksforgeeks.org/linked-list-data-structure/",
        hackerrank: hrDS("linked-lists")
    },
    {
        id: "stack", level: "medium", icon: "🥞", title: "Stack",
        desc: "Valid parentheses, next greater element, monotonic stack.",
        leetcode: LC + "stack",
        gfg: "https://www.geeksforgeeks.org/stack-data-structure/",
        hackerrank: hrDS("stacks")
    },
    {
        id: "queue", level: "medium", icon: "🚶", title: "Queue",
        desc: "Queue basics, circular queue, deque and sliding window with queues.",
        leetcode: LC + "queue",
        gfg: "https://www.geeksforgeeks.org/queue-data-structure/",
        hackerrank: hrDS("queues")
    },
    {
        id: "recursion", level: "medium", icon: "🔁", title: "Recursion & Backtracking",
        desc: "Subsets, permutations, N-Queens and recursive thinking.",
        leetcode: LC + "backtracking",
        gfg: "https://www.geeksforgeeks.org/backtracking-algorithms/",
        hackerrank: hrAlgo("recursion")
    },

    // ---------- HARD ----------
    {
        id: "trees", level: "hard", icon: "🌳", title: "Trees",
        desc: "Binary trees, BST, traversals, LCA and path-sum problems.",
        leetcode: LC + "tree",
        gfg: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
        hackerrank: hrDS("trees")
    },
    {
        id: "heap", level: "hard", icon: "⛰️", title: "Heap / Priority Queue",
        desc: "Top-K elements, median of a stream and merging sorted lists.",
        leetcode: LC + "heap-priority-queue",
        gfg: "https://www.geeksforgeeks.org/heap-data-structure/",
        hackerrank: hrDS("heap")
    },
    {
        id: "graphs", level: "hard", icon: "🕸️", title: "Graphs",
        desc: "BFS, DFS, shortest paths, topological sort and union-find.",
        leetcode: LC + "graph",
        gfg: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
        hackerrank: hrAlgo("graph-theory")
    },
    {
        id: "dp", level: "hard", icon: "🧩", title: "Dynamic Programming",
        desc: "Knapsack, LIS, LCS, grid DP and memoization patterns.",
        leetcode: LC + "dynamic-programming",
        gfg: "https://www.geeksforgeeks.org/dynamic-programming/",
        hackerrank: hrAlgo("dynamic-programming")
    }

];


// =====================================================
// SAVED PROGRESS (stays after refresh)
// =====================================================

let completedTopics = new Set();

try {
    completedTopics = new Set(
        JSON.parse(localStorage.getItem("completedTopics") || "[]")
    );
} catch (e) {
    completedTopics = new Set();
}

function saveProgress() {
    try {
        localStorage.setItem(
            "completedTopics",
            JSON.stringify(Array.from(completedTopics))
        );
    } catch (e) { /* storage not available */ }
    window.PrepSync.push();
}


// =====================================================
// SHOW TOPIC CARDS
// =====================================================

const topicContainer = document.getElementById("topicContainer");

function renderTopics() {

    topicContainer.innerHTML = "";

    topics.forEach(function (topic, index) {

        const card = document.createElement("div");

        card.className = "topic-card";
        card.setAttribute("data-level", topic.level);
        card.setAttribute("data-id", topic.id);

        if (completedTopics.has(topic.id)) {
            card.classList.add("done");
        }

        card.innerHTML = `
            <div class="topic-top">
                <span class="topic-step">STEP ${index + 1}</span>
                <span class="level-badge ${topic.level}">${topic.level}</span>
            </div>

            <h3>${topic.icon} ${topic.title}</h3>

            <p>${topic.desc}</p>

            <div class="platform-links">
                <a class="plat-btn lc" href="${topic.leetcode}" target="_blank" rel="noopener noreferrer">🟧 Practice on LeetCode</a>
                <a class="plat-btn gfg" href="${topic.gfg}" target="_blank" rel="noopener noreferrer">🟩 Learn on GeeksforGeeks</a>
                <a class="plat-btn hr" href="${topic.hackerrank}" target="_blank" rel="noopener noreferrer">🟦 Practice on HackerRank</a>
            </div>

            <button class="done-btn" data-id="${topic.id}">
                ${completedTopics.has(topic.id) ? "✓ Completed" : "Mark as Completed"}
            </button>
        `;

        topicContainer.appendChild(card);

    });

    applyFilter();
}


// Mark topic completed / not completed

topicContainer.addEventListener("click", function (event) {

    const btn = event.target.closest(".done-btn");

    if (!btn) return;

    const id = btn.getAttribute("data-id");

    if (completedTopics.has(id)) {
        completedTopics.delete(id);
    } else {
        completedTopics.add(id);
    }

    saveProgress();

    const card = btn.closest(".topic-card");

    card.classList.toggle("done", completedTopics.has(id));

    btn.innerText = completedTopics.has(id)
        ? "✓ Completed"
        : "Mark as Completed";

    updateProgress();

});


// =====================================================
// LEVEL FILTER
// =====================================================

const filterButtons = document.querySelectorAll(".filter-btn");

let currentLevel = "all";

function applyFilter() {

    document.querySelectorAll(".topic-card").forEach(function (card) {

        const level = card.getAttribute("data-level");

        card.style.display =
            (currentLevel === "all" || currentLevel === level)
                ? "flex"
                : "none";

    });

}

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentLevel = button.getAttribute("data-level");

        applyFilter();

    });

});


// =====================================================
// DSA PROGRESS BAR
// =====================================================

function updateProgress() {

    const percentage = Math.round(
        (completedTopics.size / topics.length) * 100
    );

    const bar = document.getElementById("dsaProgress");
    const text = document.getElementById("dsaPercent");

    if (bar) bar.style.width = percentage + "%";
    if (text) text.innerText = percentage + "%";

}

renderTopics();
updateProgress();

window.PrepSync.topics = {
    get: function () { return Array.from(completedTopics); },
    set: function (arr) {
        completedTopics = new Set(arr || []);
        try {
            localStorage.setItem("completedTopics", JSON.stringify(Array.from(completedTopics)));
        } catch (e) { /* storage not available */ }
        renderTopics();
        updateProgress();
    }
};

} catch (err) {
    console.error('DSA failed to load:', err);
}


try {

// =====================================================
// APTITUDE QUESTIONS  (62 questions: easy -> hard)
// ans = index of the correct option (0 = first option)
// =====================================================

const aptQuestions = [

    // ================= EASY =================
    { cat: "Quantitative", topic: "Percentage", level: "easy",
      q: "What is 20% of 450?",
      opts: ["80", "90", "100", "120"], ans: 1,
      exp: "20% of 450 = 20/100 x 450 = 90." },

    { cat: "Quantitative", topic: "Percentage", level: "easy",
      q: "A number increased by 25% becomes 150. What is the number?",
      opts: ["100", "110", "120", "125"], ans: 2,
      exp: "Number x 1.25 = 150, so the number = 150 / 1.25 = 120." },

    { cat: "Quantitative", topic: "Averages", level: "easy",
      q: "Find the average of 12, 18, 24, 30 and 36.",
      opts: ["22", "24", "26", "28"], ans: 1,
      exp: "Sum = 120. Average = 120 / 5 = 24." },

    { cat: "Quantitative", topic: "Ratio & Proportion", level: "easy",
      q: "Divide 120 in the ratio 3 : 5. What is the larger part?",
      opts: ["45", "60", "75", "80"], ans: 2,
      exp: "Total parts = 8. One part = 120 / 8 = 15. Larger part = 5 x 15 = 75." },

    { cat: "Quantitative", topic: "Simple Interest", level: "easy",
      q: "Find the simple interest on Rs 2000 at 5% per annum for 3 years.",
      opts: ["Rs 250", "Rs 300", "Rs 350", "Rs 400"], ans: 1,
      exp: "SI = (P x R x T) / 100 = (2000 x 5 x 3) / 100 = Rs 300." },

    { cat: "Quantitative", topic: "Profit & Loss", level: "easy",
      q: "An article bought for Rs 500 is sold for Rs 600. What is the profit percentage?",
      opts: ["10%", "15%", "20%", "25%"], ans: 2,
      exp: "Profit = 100. Profit % = 100 / 500 x 100 = 20%." },

    { cat: "Quantitative", topic: "Time, Speed & Distance", level: "easy",
      q: "A car travels at 60 km/h for 2.5 hours. What distance does it cover?",
      opts: ["120 km", "140 km", "150 km", "160 km"], ans: 2,
      exp: "Distance = speed x time = 60 x 2.5 = 150 km." },

    { cat: "Quantitative", topic: "Time & Work", level: "easy",
      q: "A and B can each finish a work in 12 days. Working together, how many days will they take?",
      opts: ["4", "6", "8", "24"], ans: 1,
      exp: "Together they do 1/12 + 1/12 = 1/6 of the work per day, so 6 days." },

    { cat: "Quantitative", topic: "Number Series", level: "easy",
      q: "Find the next number: 1, 4, 9, 16, 25, ?",
      opts: ["30", "34", "36", "49"], ans: 2,
      exp: "These are perfect squares: 1, 2, 3, 4, 5 squared. Next is 6 squared = 36." },

    { cat: "Quantitative", topic: "Number Series", level: "easy",
      q: "Find the next number: 2, 4, 8, 16, ?",
      opts: ["24", "30", "32", "64"], ans: 2,
      exp: "Each number is double the previous one, so 16 x 2 = 32." },

    { cat: "Logical", topic: "Odd One Out", level: "easy",
      q: "Choose the odd one out: Apple, Mango, Potato, Banana",
      opts: ["Apple", "Mango", "Potato", "Banana"], ans: 2,
      exp: "Apple, Mango and Banana are fruits. Potato is a vegetable." },

    { cat: "Logical", topic: "Coding-Decoding", level: "easy",
      q: "If CAT is written as DBU, how is DOG written?",
      opts: ["EPH", "EOH", "DPH", "FPI"], ans: 0,
      exp: "Each letter moves one step forward: D->E, O->P, G->H, so DOG = EPH." },

    { cat: "Logical", topic: "Direction Sense", level: "easy",
      q: "A man walks 3 km east and then 4 km north. How far is he from the starting point?",
      opts: ["5 km", "6 km", "7 km", "8 km"], ans: 0,
      exp: "Straight-line distance = square root of (3 squared + 4 squared) = 5 km." },

    { cat: "Logical", topic: "Ranking", level: "easy",
      q: "In a class of 40 students, Anil's rank from the top is 12. What is his rank from the bottom?",
      opts: ["27", "28", "29", "30"], ans: 2,
      exp: "Rank from bottom = 40 - 12 + 1 = 29." },

    { cat: "Verbal", topic: "Synonyms", level: "easy",
      q: "Choose the synonym of ABUNDANT.",
      opts: ["Scarce", "Plentiful", "Rare", "Tiny"], ans: 1,
      exp: "Abundant means existing in large quantity, which is the same as plentiful." },

    { cat: "Verbal", topic: "Antonyms", level: "easy",
      q: "Choose the antonym of GENEROUS.",
      opts: ["Kind", "Stingy", "Rich", "Honest"], ans: 1,
      exp: "Generous means giving freely. Its opposite is stingy." },

    { cat: "Verbal", topic: "Grammar", level: "easy",
      q: "Fill in the blank: She ____ to school every day.",
      opts: ["go", "goes", "going", "gone"], ans: 1,
      exp: "A singular subject (she) in the simple present takes 'goes'." },

    { cat: "Quantitative", topic: "Number System", level: "easy",
      q: "Which of the following is a prime number?",
      opts: ["21", "23", "25", "27"], ans: 1,
      exp: "21 = 3x7, 25 = 5x5 and 27 = 3x9. Only 23 has no divisor other than 1 and itself." },

    { cat: "Quantitative", topic: "Ages", level: "easy",
      q: "A father is 3 times as old as his son. The sum of their ages is 48. What is the son's age?",
      opts: ["10", "12", "14", "16"], ans: 1,
      exp: "Son = x, father = 3x. 4x = 48, so x = 12." },

    { cat: "Quantitative", topic: "HCF & LCM", level: "easy",
      q: "What is the LCM of 12 and 18?",
      opts: ["24", "36", "48", "72"], ans: 1,
      exp: "12 = 2x2x3 and 18 = 2x3x3. LCM = 2x2x3x3 = 36." },

    { cat: "Quantitative", topic: "Number System", level: "easy",
      q: "What is the sum of the first 50 natural numbers?",
      opts: ["1225", "1250", "1275", "1300"], ans: 2,
      exp: "Sum = n(n+1)/2 = 50 x 51 / 2 = 1275." },

    { cat: "Verbal", topic: "Idioms", level: "easy",
      q: "What does the idiom 'a piece of cake' mean?",
      opts: ["Very easy", "Delicious", "Expensive", "Very difficult"], ans: 0,
      exp: "'A piece of cake' means something that is very easy to do." },

    { cat: "Verbal", topic: "Spelling", level: "easy",
      q: "Choose the correctly spelt word.",
      opts: ["Acommodate", "Accomodate", "Accommodate", "Acomodate"], ans: 2,
      exp: "The correct spelling has double 'c' and double 'm': Accommodate." },

    // ================= MEDIUM =================
    { cat: "Quantitative", topic: "Profit & Loss", level: "medium",
      q: "Two successive discounts of 20% and 10% are equal to a single discount of:",
      opts: ["30%", "28%", "25%", "32%"], ans: 1,
      exp: "Net price = 0.8 x 0.9 = 0.72 of original, so the discount is 28%." },

    { cat: "Quantitative", topic: "Profit & Loss", level: "medium",
      q: "An item is sold for Rs 1200 at a 20% profit. What is its cost price?",
      opts: ["Rs 900", "Rs 1000", "Rs 1050", "Rs 960"], ans: 1,
      exp: "SP = 1.2 x CP, so CP = 1200 / 1.2 = Rs 1000." },

    { cat: "Quantitative", topic: "Profit & Loss", level: "medium",
      q: "A shopkeeper marks goods 25% above cost price and gives a 20% discount. His result is:",
      opts: ["5% profit", "5% loss", "No profit, no loss", "10% profit"], ans: 2,
      exp: "Selling price = 1.25 x 0.8 = 1.00 of cost price, so no profit and no loss." },

    { cat: "Quantitative", topic: "Time & Work", level: "medium",
      q: "A can do a work in 10 days and B in 15 days. Together they will finish it in:",
      opts: ["5 days", "6 days", "8 days", "12 days"], ans: 1,
      exp: "1/10 + 1/15 = 5/30 = 1/6 of work per day, so 6 days." },

    { cat: "Quantitative", topic: "Time & Work", level: "medium",
      q: "A can do a work in 20 days. A and B together can do it in 12 days. How long will B alone take?",
      opts: ["25 days", "30 days", "32 days", "40 days"], ans: 1,
      exp: "B's one-day work = 1/12 - 1/20 = 2/60 = 1/30, so B takes 30 days." },

    { cat: "Quantitative", topic: "Time, Speed & Distance", level: "medium",
      q: "A 120 m long train crosses a pole in 12 seconds. What is its speed in km/h?",
      opts: ["30", "36", "40", "45"], ans: 1,
      exp: "Speed = 120 / 12 = 10 m/s. In km/h = 10 x 18/5 = 36 km/h." },

    { cat: "Quantitative", topic: "Time, Speed & Distance", level: "medium",
      q: "A man goes at 40 km/h and returns the same way at 60 km/h. What is his average speed?",
      opts: ["48 km/h", "50 km/h", "52 km/h", "45 km/h"], ans: 0,
      exp: "Average speed = 2ab / (a+b) = 2 x 40 x 60 / 100 = 48 km/h." },

    { cat: "Quantitative", topic: "Boats & Streams", level: "medium",
      q: "A boat's speed in still water is 10 km/h and the stream speed is 2 km/h. How long will it take to go 36 km downstream?",
      opts: ["3 hours", "3.6 hours", "4 hours", "4.5 hours"], ans: 0,
      exp: "Downstream speed = 10 + 2 = 12 km/h. Time = 36 / 12 = 3 hours." },

    { cat: "Quantitative", topic: "Compound Interest", level: "medium",
      q: "What is the compound interest on Rs 1000 at 10% per annum for 2 years?",
      opts: ["Rs 200", "Rs 210", "Rs 220", "Rs 121"], ans: 1,
      exp: "Amount = 1000 x 1.1 x 1.1 = 1210. CI = 1210 - 1000 = Rs 210." },

    { cat: "Quantitative", topic: "Averages", level: "medium",
      q: "The average of 5 numbers is 20. When a new number is added, the average becomes 22. What is the new number?",
      opts: ["30", "32", "34", "36"], ans: 1,
      exp: "New total = 6 x 22 = 132. Old total = 5 x 20 = 100. New number = 32." },

    { cat: "Quantitative", topic: "Mixtures", level: "medium",
      q: "A 40 litre mixture has milk and water in the ratio 3 : 1. How much water must be added to make the ratio 3 : 2?",
      opts: ["5 litres", "10 litres", "15 litres", "20 litres"], ans: 1,
      exp: "Milk = 30 L, water = 10 L. For 3 : 2 water must be 20 L, so add 10 L." },

    { cat: "Quantitative", topic: "Ratio & Proportion", level: "medium",
      q: "If A : B = 2 : 3 and B : C = 4 : 5, then A : B : C = ?",
      opts: ["8 : 12 : 15", "2 : 3 : 5", "6 : 12 : 15", "8 : 10 : 15"], ans: 0,
      exp: "Make B equal: A:B = 8:12 and B:C = 12:15, so A:B:C = 8:12:15." },

    { cat: "Quantitative", topic: "Percentage", level: "medium",
      q: "The price of an item is increased by 20% and then decreased by 20%. The net change is:",
      opts: ["No change", "4% decrease", "4% increase", "2% decrease"], ans: 1,
      exp: "1.2 x 0.8 = 0.96, which is a 4% decrease." },

    { cat: "Quantitative", topic: "Probability", level: "medium",
      q: "Two dice are thrown. What is the probability that the sum is 7?",
      opts: ["1/12", "1/6", "1/9", "5/36"], ans: 1,
      exp: "Favourable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Probability = 6/36 = 1/6." },

    { cat: "Quantitative", topic: "Probability", level: "medium",
      q: "One card is drawn from a pack of 52. What is the probability that it is a king or a queen?",
      opts: ["1/13", "2/13", "1/26", "4/13"], ans: 1,
      exp: "There are 4 kings + 4 queens = 8 cards. Probability = 8/52 = 2/13." },

    { cat: "Quantitative", topic: "Permutation & Combination", level: "medium",
      q: "In how many ways can 3 people be selected from 5 people?",
      opts: ["10", "15", "20", "60"], ans: 0,
      exp: "5C3 = 5! / (3! x 2!) = 10." },

    { cat: "Quantitative", topic: "Number Series", level: "medium",
      q: "Find the next number: 3, 6, 11, 18, 27, ?",
      opts: ["36", "38", "40", "42"], ans: 1,
      exp: "Differences are 3, 5, 7, 9, so the next difference is 11. 27 + 11 = 38." },

    { cat: "Logical", topic: "Syllogism", level: "medium",
      q: "Statements: All pens are books. All books are tables.\nConclusion I: All pens are tables.\nConclusion II: All tables are pens.",
      opts: ["Only I follows", "Only II follows", "Both follow", "Neither follows"], ans: 0,
      exp: "Pens are inside books, which are inside tables, so I follows. The reverse (II) does not follow." },

    { cat: "Logical", topic: "Direction Sense", level: "medium",
      q: "Ravi faces North. He turns right, then left, then left again. Which direction is he facing now?",
      opts: ["North", "South", "East", "West"], ans: 3,
      exp: "North -> right = East -> left = North -> left = West." },

    { cat: "Logical", topic: "Clocks", level: "medium",
      q: "What is the angle between the hour hand and the minute hand at 3:30?",
      opts: ["60 degrees", "75 degrees", "90 degrees", "105 degrees"], ans: 1,
      exp: "Hour hand = 3 x 30 + 15 = 105 degrees. Minute hand = 180 degrees. Difference = 75 degrees." },

    { cat: "Logical", topic: "Blood Relations", level: "medium",
      q: "Pointing to a man, a woman says, 'He is the son of my mother's only son.' How is the man related to the woman?",
      opts: ["Brother", "Nephew", "Cousin", "Uncle"], ans: 1,
      exp: "Her mother's only son is her brother. The man is her brother's son, so he is her nephew." },

    { cat: "Logical", topic: "Ranking", level: "medium",
      q: "Ravi is 7th from the left and 12th from the right in a row. How many people are in the row?",
      opts: ["17", "18", "19", "20"], ans: 1,
      exp: "Total = 7 + 12 - 1 = 18." },

    { cat: "Quantitative", topic: "Number System", level: "medium",
      q: "What is the unit digit of 3 raised to the power 15?",
      opts: ["3", "9", "7", "1"], ans: 2,
      exp: "Unit digits of powers of 3 repeat as 3, 9, 7, 1. 15 mod 4 = 3, so the digit is 7." },

    { cat: "Quantitative", topic: "Percentage", level: "medium",
      q: "In a two-candidate election, the loser got 45% of votes and lost by 1000 votes. How many votes were cast?",
      opts: ["8000", "9000", "10000", "12000"], ans: 2,
      exp: "Winner got 55%. The 10% difference = 1000, so total votes = 10000." },

    { cat: "Quantitative", topic: "HCF & LCM", level: "medium",
      q: "The HCF of two numbers is 6 and their LCM is 180. If one number is 30, the other is:",
      opts: ["30", "36", "40", "42"], ans: 1,
      exp: "Product of two numbers = HCF x LCM = 6 x 180 = 1080. Other number = 1080 / 30 = 36." },

    { cat: "Quantitative", topic: "Mixtures", level: "medium",
      q: "In what ratio must rice at Rs 30/kg be mixed with rice at Rs 40/kg to get a mixture worth Rs 36/kg?",
      opts: ["2 : 3", "3 : 2", "1 : 1", "4 : 3"], ans: 0,
      exp: "Cheaper : dearer = (40 - 36) : (36 - 30) = 4 : 6 = 2 : 3." },

    { cat: "Verbal", topic: "Grammar", level: "medium",
      q: "Choose the correct sentence: Neither of the boys ____ present.",
      opts: ["were", "was", "are", "have been"], ans: 1,
      exp: "'Neither' is singular, so it takes the singular verb 'was'." },

    { cat: "Verbal", topic: "One-Word Substitution", level: "medium",
      q: "One who loves books is called a:",
      opts: ["Bibliophile", "Philosopher", "Bibliographer", "Linguist"], ans: 0,
      exp: "A bibliophile is a lover or collector of books." },

    { cat: "Quantitative", topic: "Ages", level: "medium",
      q: "The sum of a father's and son's present ages is 55. Five years ago the father was 4 times as old as the son. What is the son's present age?",
      opts: ["12", "14", "15", "16"], ans: 1,
      exp: "Let son = x, father = 55 - x. 50 - x = 4(x - 5), so 70 = 5x and x = 14." },

    // ================= HARD =================
    { cat: "Quantitative", topic: "Pipes & Cisterns", level: "hard",
      q: "Pipe A fills a tank in 12 hours, pipe B in 15 hours, and pipe C empties it in 20 hours. If all three are opened together, how long to fill the tank?",
      opts: ["8 hours", "10 hours", "12 hours", "15 hours"], ans: 1,
      exp: "Net per hour = 1/12 + 1/15 - 1/20 = (5 + 4 - 3)/60 = 1/10, so 10 hours." },

    { cat: "Quantitative", topic: "Time, Speed & Distance", level: "hard",
      q: "Two trains of length 100 m and 150 m run in opposite directions at 36 km/h and 54 km/h. How long do they take to cross each other?",
      opts: ["8 seconds", "10 seconds", "12 seconds", "15 seconds"], ans: 1,
      exp: "Relative speed = 90 km/h = 25 m/s. Time = (100 + 150) / 25 = 10 seconds." },

    { cat: "Quantitative", topic: "Compound Interest", level: "hard",
      q: "What is the difference between compound interest and simple interest on Rs 5000 at 10% per annum for 2 years?",
      opts: ["Rs 40", "Rs 50", "Rs 60", "Rs 100"], ans: 1,
      exp: "For 2 years, difference = P x (R/100)^2 = 5000 x 0.01 = Rs 50." },

    { cat: "Quantitative", topic: "Profit & Loss", level: "hard",
      q: "Two articles are each sold for Rs 990. One is sold at a 10% profit and the other at a 10% loss. The overall result is:",
      opts: ["No gain, no loss", "1% loss", "1% gain", "2% loss"], ans: 1,
      exp: "CP of first = 900, CP of second = 1100. Total CP = 2000, total SP = 1980. Loss = 20 = 1%." },

    { cat: "Quantitative", topic: "Time & Work", level: "hard",
      q: "A and B can do a work in 12 and 18 days. They work together for 4 days, then A leaves. How many days in total does the work take?",
      opts: ["10", "12", "14", "16"], ans: 1,
      exp: "In 4 days they do 4 x (1/12 + 1/18) = 5/9. Remaining 4/9 at B's rate 1/18 per day = 8 days. Total = 12 days." },

    { cat: "Quantitative", topic: "Permutation & Combination", level: "hard",
      q: "In how many ways can the letters of the word APPLE be arranged?",
      opts: ["120", "60", "30", "24"], ans: 1,
      exp: "5 letters with P repeated twice: 5! / 2! = 60." },

    { cat: "Quantitative", topic: "Probability", level: "hard",
      q: "Three fair coins are tossed. What is the probability of getting at least 2 heads?",
      opts: ["1/4", "3/8", "1/2", "5/8"], ans: 2,
      exp: "Exactly 2 heads = 3 ways, 3 heads = 1 way. Favourable = 4 out of 8, so 1/2." },

    { cat: "Quantitative", topic: "Permutation & Combination", level: "hard",
      q: "In how many ways can 5 people be seated around a circular table?",
      opts: ["120", "24", "60", "12"], ans: 1,
      exp: "Circular arrangements of n people = (n - 1)! = 4! = 24." },

    { cat: "Quantitative", topic: "Number System", level: "hard",
      q: "What is the remainder when 2 raised to the power 10 is divided by 7?",
      opts: ["1", "2", "3", "4"], ans: 1,
      exp: "2^3 = 8, which leaves remainder 1 mod 7. 2^10 = (2^3)^3 x 2, so the remainder is 1 x 2 = 2." },

    { cat: "Logical", topic: "Calendar", level: "hard",
      q: "How many odd days are there in 100 years?",
      opts: ["0", "1", "5", "6"], ans: 2,
      exp: "100 years = 24 leap + 76 ordinary years. Odd days = 24x2 + 76x1 = 124. 124 mod 7 = 5." }

];


// =====================================================
// APTITUDE PRACTICE (uses aptQuestions above)
// =====================================================

const aptContainer = document.getElementById("aptContainer");
const aptMoreBtn = document.getElementById("aptMore");
const aptEmpty = document.getElementById("aptEmpty");

const APT_PAGE_SIZE = 10;

let aptLevel = "all";
let aptCat = "all";
let aptShown = APT_PAGE_SIZE;

// saved answers: { questionNumber: chosenOptionIndex }
let aptAnswers = {};

try {
    aptAnswers = JSON.parse(localStorage.getItem("aptAnswers") || "{}");
} catch (e) {
    aptAnswers = {};
}

function saveAptAnswers() {
    try {
        localStorage.setItem("aptAnswers", JSON.stringify(aptAnswers));
    } catch (e) { /* storage not available */ }
    window.PrepSync.push();
}

window.PrepSync.apt = {
    get: function () { return aptAnswers; },
    set: function (obj) {
        aptAnswers = obj || {};
        try {
            localStorage.setItem("aptAnswers", JSON.stringify(aptAnswers));
        } catch (e) { /* storage not available */ }
        renderApt();
    }
};

function getAptList() {

    const list = [];

    aptQuestions.forEach(function (item, index) {

        const levelOk = aptLevel === "all" || item.level === aptLevel;
        const catOk = aptCat === "all" || item.cat === aptCat;

        if (levelOk && catOk) {
            list.push({ item: item, number: index + 1 });
        }

    });

    return list;
}

function renderApt() {

    const list = getAptList();
    const visible = list.slice(0, aptShown);

    aptContainer.innerHTML = "";

    visible.forEach(function (entry) {

        const item = entry.item;
        const number = entry.number;
        const chosen = aptAnswers[number];
        const answered = chosen !== undefined;

        const card = document.createElement("div");
        card.className = "apt-card";

        let optionsHTML = "";

        item.opts.forEach(function (text, i) {

            let cls = "opt-btn";

            if (answered) {
                if (i === item.ans) cls += " correct";
                else if (i === chosen) cls += " wrong";
            }

            optionsHTML += `
                <button class="${cls}" data-q="${number}" data-i="${i}" ${answered ? "disabled" : ""}>
                    <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
                    <span>${text}</span>
                </button>`;
        });

        let resultHTML = "";

        if (answered) {
            const isRight = chosen === item.ans;

            resultHTML = `
                <div class="apt-explain ${isRight ? "right" : "bad"}">
                    <strong>${isRight ? "✅ Correct!" : "❌ Wrong. Correct answer: " + String.fromCharCode(65 + item.ans)}</strong>
                    <p>${item.exp}</p>
                </div>`;
        }

        card.innerHTML = `
            <div class="apt-top">
                <span class="apt-num">Q${number}</span>
                <span class="apt-tags">
                    <span class="apt-tag">${item.cat}</span>
                    <span class="apt-tag">${item.topic}</span>
                    <span class="level-badge ${item.level}">${item.level}</span>
                </span>
            </div>

            <p class="apt-question">${item.q}</p>

            <div class="apt-options">${optionsHTML}</div>

            ${resultHTML}
        `;

        aptContainer.appendChild(card);

    });

    aptMoreBtn.style.display = list.length > aptShown ? "inline-block" : "none";
    aptEmpty.style.display = list.length === 0 ? "block" : "none";

    updateAptStats();
}

function updateAptStats() {

    const total = aptQuestions.length;

    let attempted = 0;
    let correct = 0;

    aptQuestions.forEach(function (item, index) {

        const chosen = aptAnswers[index + 1];

        if (chosen !== undefined) {
            attempted++;
            if (chosen === item.ans) correct++;
        }

    });

    const accuracy = attempted === 0 ? 0 : Math.round((correct / attempted) * 100);
    const progress = Math.round((attempted / total) * 100);

    document.getElementById("aptAttempted").innerText = attempted + " / " + total;
    document.getElementById("aptCorrect").innerText = correct;
    document.getElementById("aptAccuracy").innerText = accuracy + "%";

    // Progress section card
    const bar = document.getElementById("aptProgress");
    const text = document.getElementById("aptPercent");

    if (bar) bar.style.width = progress + "%";
    if (text) text.innerText = progress + "%";
}

// Click on an option
aptContainer.addEventListener("click", function (event) {

    const btn = event.target.closest(".opt-btn");

    if (!btn || btn.disabled) return;

    const number = btn.getAttribute("data-q");
    const choice = parseInt(btn.getAttribute("data-i"), 10);

    aptAnswers[number] = choice;

    saveAptAnswers();

    renderApt();

});

// Level filter
document.querySelectorAll(".apt-level-btn").forEach(function (btn) {

    btn.addEventListener("click", function () {

        document.querySelectorAll(".apt-level-btn").forEach(function (b) {
            b.classList.remove("active");
        });

        btn.classList.add("active");

        aptLevel = btn.getAttribute("data-level");
        aptShown = APT_PAGE_SIZE;

        renderApt();

    });

});

// Category filter
document.querySelectorAll(".apt-cat-btn").forEach(function (btn) {

    btn.addEventListener("click", function () {

        document.querySelectorAll(".apt-cat-btn").forEach(function (b) {
            b.classList.remove("active");
        });

        btn.classList.add("active");

        aptCat = btn.getAttribute("data-cat");
        aptShown = APT_PAGE_SIZE;

        renderApt();

    });

});

// Show more
aptMoreBtn.addEventListener("click", function () {

    aptShown += APT_PAGE_SIZE;

    renderApt();

});

// Reset
document.getElementById("aptReset").addEventListener("click", function () {

    if (!confirm("Reset all your aptitude answers?")) return;

    aptAnswers = {};

    saveAptAnswers();

    aptShown = APT_PAGE_SIZE;

    renderApt();

});

renderApt();

} catch (err) {
    console.error('Aptitude failed to load:', err);
}


try {

// =====================================================
// SCROLL BUTTONS  (any button with data-scroll="sectionId")
// =====================================================

document.querySelectorAll("[data-scroll]").forEach(function (btn) {

    btn.addEventListener("click", function () {

        const target = document.getElementById(btn.getAttribute("data-scroll"));

        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }

    });

});

} catch (err) {
    console.error('Scroll buttons failed to load:', err);
}


try {

// =====================================================
// RESUME BUILDER
// =====================================================

function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// ---- Resume auto-save (browser + cloud) ----
const RESUME_FIELDS = ["name", "email", "phone", "github", "education", "skills", "projects", "achievements"];

function readResumeFields() {
    const data = {};
    RESUME_FIELDS.forEach(function (id) {
        data[id] = document.getElementById(id).value;
    });
    return data;
}

window.PrepSync.resume = {
    get: readResumeFields,
    set: function (data) {
        data = data || {};
        RESUME_FIELDS.forEach(function (id) {
            document.getElementById(id).value = data[id] || "";
        });
        try {
            localStorage.setItem("resumeData", JSON.stringify(data));
        } catch (e) { /* storage not available */ }
    }
};

// Restore saved resume fields after refresh
try {
    const savedResume = JSON.parse(localStorage.getItem("resumeData") || "null");
    if (savedResume) window.PrepSync.resume.set(savedResume);
} catch (e) { /* ignore */ }

// Save while typing
RESUME_FIELDS.forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
        try {
            localStorage.setItem("resumeData", JSON.stringify(readResumeFields()));
        } catch (e) { /* storage not available */ }
        window.PrepSync.push();
    });
});

document.getElementById("generateResume").addEventListener("click", function () {

    const name = escapeHTML(document.getElementById("name").value);
    const email = escapeHTML(document.getElementById("email").value);
    const phone = escapeHTML(document.getElementById("phone").value);
    const github = escapeHTML(document.getElementById("github").value);
    const education = escapeHTML(document.getElementById("education").value);
    const skills = escapeHTML(document.getElementById("skills").value);
    const projects = escapeHTML(document.getElementById("projects").value);
    const achievements = escapeHTML(document.getElementById("achievements").value);

    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    const resumeWindow = window.open("", "_blank");

    if (!resumeWindow) {
        alert("Please allow pop-ups to see your resume.");
        return;
    }

    resumeWindow.document.write(`
        <html>
        <head>
            <title>${name} - Resume</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: auto;
                    color: #222;
                }
                h1 { margin-bottom: 5px; }
                button {
                    padding: 10px 18px;
                    margin-bottom: 25px;
                    background: #111827;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }
                @media print { button { display: none; } }
                h2 {
                    border-bottom: 2px solid #222;
                    padding-bottom: 5px;
                    margin-top: 30px;
                }
                p { line-height: 1.6; white-space: pre-line; }
                .contact { color: #555; }
            </style>
        </head>
        <body>
            <button onclick="window.print()">Download / Save as PDF</button>
            <h1>${name}</h1>
            <p class="contact">${email} | ${phone}</p>
            <p>${github}</p>
            <h2>Education</h2>
            <p>${education}</p>
            <h2>Skills</h2>
            <p>${skills}</p>
            <h2>Projects</h2>
            <p>${projects}</p>
            <h2>Achievements & Certifications</h2>
            <p>${achievements}</p>
        </body>
        </html>
    `);

    resumeWindow.document.close();

});

} catch (err) {
    console.error('Resume builder failed to load:', err);
}


try {

// =====================================================
// LOGIN SYSTEM (Firebase Auth + Firestore, see firebase.js)
// =====================================================

const loginButton = document.querySelector(".login-btn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginSubmit = document.getElementById("loginSubmit");
const loginName = document.getElementById("loginName");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");
const loginTitle = document.getElementById("loginTitle");
const loginSwitch = document.getElementById("loginSwitch");
const loginForm = document.getElementById("loginForm");
const accountBox = document.getElementById("accountBox");
const accountInfo = document.getElementById("accountInfo");
const logoutBtn = document.getElementById("logoutBtn");
const loginForgot = document.getElementById("loginForgot");

let signupMode = false;
let currentUser = null;

function showMessage(text, ok) {
    loginMessage.style.color = ok ? "#22c55e" : "#ef4444";
    loginMessage.innerText = text;
}

function setMode(signup) {
    signupMode = signup;
    loginName.style.display = signup ? "block" : "none";
    loginTitle.innerText = signup ? "Create your account" : "Welcome back 👋";
    loginSubmit.innerText = signup ? "Sign Up" : "Login";
    loginForgot.style.display = signup ? "none" : "block";
    loginSwitch.innerText = signup
        ? "Already have an account? Login"
        : "New here? Create an account";
    loginMessage.innerText = "";
}

function showForm() {
    loginForm.style.display = currentUser ? "none" : "block";
    accountBox.style.display = currentUser ? "block" : "none";
}

loginButton.addEventListener("click", function () {
    loginMessage.innerText = "";
    showForm();
    loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", function () {
    loginModal.style.display = "none";
});

loginModal.addEventListener("click", function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});

loginSwitch.addEventListener("click", function () {
    setMode(!signupMode);
});

function friendlyError(err) {
    const map = {
        "auth/email-already-in-use": "This email is already registered. Please login.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Wrong password. Try again.",
        "auth/invalid-credential": "Wrong email or password.",
        "auth/too-many-requests": "Too many attempts. Please wait a bit and try again.",
        "auth/network-request-failed": "Network error. Check your internet connection."
    };
    return map[err.code] || ("Something went wrong: " + (err.message || err));
}

loginSubmit.addEventListener("click", async function () {

    if (!Cloud.enabled) {
        showMessage("Firebase is not set up yet. Add your keys in firebase-config.js", false);
        return;
    }

    const name = loginName.value.trim();
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (email === "" || password === "" || (signupMode && name === "")) {
        showMessage(signupMode
            ? "Please enter your name, email and password."
            : "Please enter your email and password.", false);
        return;
    }

    loginSubmit.disabled = true;

    try {
        if (signupMode) {
            await Cloud.signUp(name, email, password);
        } else {
            await Cloud.logIn(email, password);
        }
        showMessage(signupMode ? "Account created! 🎉" : "Login successful! 🎉", true);
        loginPassword.value = "";
        setTimeout(function () { loginModal.style.display = "none"; }, 800);
    } catch (err) {
        showMessage(friendlyError(err), false);
    }

    loginSubmit.disabled = false;
});

loginForgot.addEventListener("click", async function () {

    if (!Cloud.enabled) {
        showMessage("Firebase is not set up yet. Add your keys in firebase-config.js", false);
        return;
    }

    const email = loginEmail.value.trim();

    if (email === "") {
        showMessage("Enter your email above, then click Forgot password.", false);
        return;
    }

    try {
        await Cloud.resetPassword(email);
        showMessage("Reset link sent! Check your inbox (and spam folder).", true);
    } catch (err) {
        showMessage(friendlyError(err), false);
    }
});

logoutBtn.addEventListener("click", async function () {
    await Cloud.logOut();
    loginModal.style.display = "none";
});

// Runs whenever the user logs in, logs out or the page reloads
if (Cloud.enabled) {
    Cloud.onAuth(function (user, profile) {

        currentUser = user;

        if (user) {
            const name = (profile && profile.name) || user.displayName || user.email;
            loginButton.innerText = "Hi, " + name;
            accountInfo.innerText = "Logged in as " + user.email;

            // Merge guest progress with saved cloud progress, then sync back
            const topics = window.PrepSync.topics;
            const apt = window.PrepSync.apt;
            const cloudTopics = (profile && profile.completedTopics) || [];
            const cloudApt = (profile && profile.aptAnswers) || {};

            if (topics) topics.set(Array.from(new Set(topics.get().concat(cloudTopics))));
            if (apt) apt.set(Object.assign({}, cloudApt, apt.get()));

            // Resume: cloud copy wins unless this browser already has typed data
            const resume = window.PrepSync.resume;
            if (resume) {
                const local = resume.get();
                const localHasData = Object.keys(local).some(function (k) { return local[k].trim() !== ""; });
                const cloudResume = (profile && profile.resumeData) || null;
                if (cloudResume && !localHasData) resume.set(cloudResume);
            }

            window.PrepSync.push();
        } else {
            loginButton.innerText = "Login";

            // Clear previous user's data from this browser
            if (window.PrepSync.topics) window.PrepSync.topics.set([]);
            if (window.PrepSync.apt) window.PrepSync.apt.set({});
            if (window.PrepSync.resume) window.PrepSync.resume.set({});
        }

        showForm();
    });
}

// Send current progress to Firebase (debounced inside Cloud.save)
window.PrepSync.push = function () {
    if (!Cloud.enabled || !currentUser) return;
    Cloud.save({
        completedTopics: window.PrepSync.topics ? window.PrepSync.topics.get() : [],
        aptAnswers: window.PrepSync.apt ? window.PrepSync.apt.get() : {},
        resumeData: window.PrepSync.resume ? window.PrepSync.resume.get() : {}
    });
};

setMode(false);

} catch (err) {
    console.error('Login failed to load:', err);
}

