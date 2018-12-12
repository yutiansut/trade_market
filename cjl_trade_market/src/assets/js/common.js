import myStorage from './myStorage';
// 添加自选
function addCustomList(data) {
    let customList = myStorage.get("customList");
    if (customList && customList[0]) {
        customList.map(item => {
            if (
                item.coinid != data.coinid ||
                item.maincoinid != data.maincoinid
            ) {
                customList.push(data);
            }
        });
    } else {
        customList = [];
        customList.push(data);
    }
    myStorage.set("customList", customList);
}
// 移除自选
function removeCustomList(data) {
    let customList = myStorage.get("customList");
    customList.map((item, i) => {
        if (item.coinid == data.coinid && item.maincoinid == item.maincoinid) {
            customList.splice(i, 1);
        }
    });
    myStorage.set("customList", customList);
};
//加载自选
function loadCustomList() {
    let customList = myStorage.get("customList");
    return customList;
}
// 列表匹配自选
function matchCustomList(rawData) {
    let customList = myStorage.get("customList");
    if (customList && rawData) {
        customList.map((cItem, i) => {
            rawData.map((dItem, j) => {
                if (
                    dItem.coinid == cItem.coinid &&
                    dItem.maincoinid == cItem.maincoinid
                ) {
                    rawData[j] = customList[i];
                }
            });
        });
    }
    return rawData;
}
export { addCustomList, removeCustomList, matchCustomList }