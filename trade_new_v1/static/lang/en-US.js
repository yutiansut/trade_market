const textArr = [
    "Login",
    "Coin trade",
    "Legal coin trade",
    "Publish trade",
    "Trade admin",
    "Seller register",
    "message",
    "notice",
    "Chinese",
    "English",
    "Changing...",
    "Coin center",
    "Candy box",
    "Standard",
    "Professional",
    "Properties",
    "Order",
    "Latest price",
    "Rise",
    "Lowest",
    "Highest",
    "Deal Num",
    "Favourite",
    "View all"
];
const langEnCfg = (function () {
    let obj = {};
    textArr.map((item, i) => {
        obj['label' + (i + 1)] = item;
    });
    console.log(JSON.stringify(obj));
    return obj;
}());
module.exports = langEnCfg;