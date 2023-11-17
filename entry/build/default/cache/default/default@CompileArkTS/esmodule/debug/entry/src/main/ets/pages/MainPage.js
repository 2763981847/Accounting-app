import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import { formatDateTime, getEndOfTheDay, isSameDay } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
import StatisticalCardComponent from '@bundle:com.example.rdb/entry/ets/view/StatisticalCardComponent';
import groupHeader from '@bundle:com.example.rdb/entry/ets/view/GroupHeaderBuilder';
import DateSelectComponent from '@bundle:com.example.rdb/entry/ets/view/DateSelectComponent';
// 将账单按日期分组
function getGroupedAccounts(accounts) {
    let groupedAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        if (i === 0 || !isSameDay(accounts[i - 1].date, account.date)) {
            groupedAccounts.push([]);
        }
        groupedAccounts[groupedAccounts.length - 1].push(account);
    }
    return groupedAccounts;
}
export default class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__isEdit = new ObservedPropertySimplePU(false, this, "isEdit");
        this.__accounts = new SynchedPropertyObjectTwoWayPU(params.accounts, this, "accounts");
        this.__endDate = new ObservedPropertySimplePU(getEndOfTheDay(new Date()).getTime(), this, "endDate");
        this.__beginDate = new ObservedPropertySimplePU(0, this, "beginDate");
        this.__accountType = new ObservedPropertySimplePU(2, this, "accountType");
        this.__filteredAccounts = new ObservedPropertyObjectPU([], this, "filteredAccounts");
        this.__isInsert = new SynchedPropertySimpleTwoWayPU(params.isInsert, this, "isInsert");
        this.__newAccount = new SynchedPropertyObjectTwoWayPU(params.newAccount, this, "newAccount");
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.scroller = new Scroller();
        this.dialogController = undefined;
        this.accountTable = undefined;
        this.deleteList = [];
        this.searchController = new SearchController();
        this.onAccountsChange = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("accounts", this.filterAccounts);
        this.declareWatch("endDate", this.filterAccounts);
        this.declareWatch("beginDate", this.filterAccounts);
        this.declareWatch("accountType", this.filterAccounts);
    }
    setInitiallyProvidedValue(params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEdit !== undefined) {
            this.isEdit = params.isEdit;
        }
        if (params.endDate !== undefined) {
            this.endDate = params.endDate;
        }
        if (params.beginDate !== undefined) {
            this.beginDate = params.beginDate;
        }
        if (params.accountType !== undefined) {
            this.accountType = params.accountType;
        }
        if (params.filteredAccounts !== undefined) {
            this.filteredAccounts = params.filteredAccounts;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.accountTable !== undefined) {
            this.accountTable = params.accountTable;
        }
        if (params.deleteList !== undefined) {
            this.deleteList = params.deleteList;
        }
        if (params.searchController !== undefined) {
            this.searchController = params.searchController;
        }
        if (params.onAccountsChange !== undefined) {
            this.onAccountsChange = params.onAccountsChange;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__isEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__endDate.purgeDependencyOnElmtId(rmElmtId);
        this.__beginDate.purgeDependencyOnElmtId(rmElmtId);
        this.__accountType.purgeDependencyOnElmtId(rmElmtId);
        this.__filteredAccounts.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__isEdit.aboutToBeDeleted();
        this.__accounts.aboutToBeDeleted();
        this.__endDate.aboutToBeDeleted();
        this.__beginDate.aboutToBeDeleted();
        this.__accountType.aboutToBeDeleted();
        this.__filteredAccounts.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue) {
        this.__searchText.set(newValue);
    }
    get isEdit() {
        return this.__isEdit.get();
    }
    set isEdit(newValue) {
        this.__isEdit.set(newValue);
    }
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get endDate() {
        return this.__endDate.get();
    }
    set endDate(newValue) {
        this.__endDate.set(newValue);
    }
    get beginDate() {
        return this.__beginDate.get();
    }
    set beginDate(newValue) {
        this.__beginDate.set(newValue);
    }
    get accountType() {
        return this.__accountType.get();
    }
    set accountType(newValue) {
        this.__accountType.set(newValue);
    }
    get filteredAccounts() {
        return this.__filteredAccounts.get();
    }
    set filteredAccounts(newValue) {
        this.__filteredAccounts.set(newValue);
    }
    get isInsert() {
        return this.__isInsert.get();
    }
    set isInsert(newValue) {
        this.__isInsert.set(newValue);
    }
    get newAccount() {
        return this.__newAccount.get();
    }
    set newAccount(newValue) {
        this.__newAccount.set(newValue);
    }
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
    }
    // 生命周期钩子，在页面即将显示时触发
    aboutToAppear() {
        this.filterAccounts();
    }
    // 过滤账单列表
    filterAccounts() {
        let temp = this.accounts;
        // 模糊查询
        if (this.searchText && this.searchText !== '') {
            temp = temp.filter(account => account.desc.includes(this.searchText) ||
                account.typeText.includes(this.searchText) ||
                account.amount.toString() === this.searchText);
        }
        // 按分类筛选
        // 2 代表全部
        if (this.accountType !== 2) {
            temp = temp.filter(account => account.accountType === this.accountType);
        }
        // 按时间筛选
        temp = temp
            .filter(account => account.date.getTime() >= this.beginDate && account.date.getTime() <= this.endDate);
        this.filteredAccounts = temp;
    }
    // 选中列表项
    selectListItem(item) {
        this.index = this.filteredAccounts.indexOf(item);
        this.newAccount = item;
    }
    // 删除选中的列表项
    deleteListItem() {
        this.accountTable.batchDelete(this.deleteList, () => {
            this.onAccountsChange();
        });
        this.deleteList = [];
        this.isEdit = false;
    }
    // 页面渲染函数
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.width(CommonConstants.FULL_WIDTH);
            Stack.height(CommonConstants.FULL_WIDTH);
            Stack.backgroundColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.width(CommonConstants.FULL_WIDTH);
            Scroll.width(CommonConstants.FULL_WIDTH);
            Scroll.height(CommonConstants.FULL_HEIGHT);
            Scroll.scrollBar(BarState.Off);
            Scroll.align(Alignment.Top);
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_M });
            Column.padding({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 页面标题
            Text.create({ "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 页面标题
            Text.height({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 页面标题
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 页面标题
            Text.margin({ left: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 页面标题
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 页面标题
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 编辑按钮
            Image.create({ "id": 0, "type": 30000, params: ['ic_public_edit.svg'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 编辑按钮
            Image.width({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 编辑按钮
            Image.aspectRatio(CommonConstants.FULL_SIZE);
            // 编辑按钮
            Image.margin({ right: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            // 编辑按钮
            Image.onClick(() => {
                this.isEdit = !this.isEdit;
            });
            if (!isInitialRender) {
                // 编辑按钮
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            __Common__.create();
            __Common__.aspectRatio(CommonConstants.CARD_ASPECT_RATIO);
            __Common__.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                __Common__.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new 
                    // 统计卡片组件
                    StatisticalCardComponent(this, { accounts: this.__accounts }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        __Common__.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 搜索和分类按钮行
            Row.create();
            // 搜索和分类按钮行
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 搜索和分类按钮行
            Row.width(CommonConstants.FULL_WIDTH);
            // 搜索和分类按钮行
            Row.height({ "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 搜索和分类按钮行
            Row.padding({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            // 搜索和分类按钮行
            Row.margin({ top: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 搜索和分类按钮行
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 搜索输入框
            Search.create({
                value: this.searchText,
                placeholder: CommonConstants.SEARCH_TEXT,
                controller: this.searchController
            });
            // 搜索输入框
            Search.width('45%');
            // 搜索输入框
            Search.borderRadius({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 搜索输入框
            Search.borderWidth({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 搜索输入框
            Search.borderColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 搜索输入框
            Search.placeholderFont({ size: { "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            // 搜索输入框
            Search.textFont({ size: { "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            // 搜索输入框
            Search.backgroundColor(Color.White);
            // 搜索输入框
            Search.onChange((searchValue) => {
                this.searchText = searchValue;
            });
            // 搜索输入框
            Search.onSubmit(() => {
                this.filterAccounts();
            });
            if (!isInitialRender) {
                // 搜索输入框
                Search.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 搜索输入框
        Search.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 收入、支出、全部按钮
            Row.create({ space: CommonConstants.SPACE_S });
            // 收入、支出、全部按钮
            Row.width(CommonConstants.HALF_WIDTH);
            // 收入、支出、全部按钮
            Row.justifyContent(FlexAlign.End);
            // 收入、支出、全部按钮
            Row.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                // 收入、支出、全部按钮
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('全部');
            Button.stateEffect(false);
            Button.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.fontColor(this.accountType === 2 ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.backgroundColor(this.accountType === 2 ? { "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777234, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.onClick(() => this.accountType = 2);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('支出');
            Button.stateEffect(false);
            Button.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.onClick(() => this.accountType = 0);
            Button.fontColor(this.accountType === 0 ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.backgroundColor(this.accountType === 0 ? { "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777234, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('收入');
            Button.stateEffect(false);
            Button.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.onClick(() => this.accountType = 1);
            Button.fontColor(this.accountType === 1 ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.backgroundColor(this.accountType === 1 ? { "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777234, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        // 收入、支出、全部按钮
        Row.pop();
        // 搜索和分类按钮行
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            __Common__.create();
            __Common__.width(CommonConstants.EIGHTY_PERCENT);
            if (!isInitialRender) {
                __Common__.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new 
                    // 时间选择组件
                    DateSelectComponent(this, {
                        beginDate: this.__beginDate,
                        endDate: this.__endDate,
                        selectedIndex: 3
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        __Common__.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 账单列表
            List.create({ space: CommonConstants.SPACE_M });
            // 账单列表
            List.width(CommonConstants.FULL_WIDTH);
            // 账单列表
            List.margin({ top: { "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 账单列表
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const accounts = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ListItemGroup.create({ header: groupHeader.bind(this, accounts) });
                    ListItemGroup.width(CommonConstants.FULL_WIDTH);
                    ListItemGroup.borderRadius({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                    ListItemGroup.backgroundColor(Color.White);
                    if (!isInitialRender) {
                        ListItemGroup.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const account = _item;
                        {
                            const isLazyCreate = true;
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                ListItem.create(deepRenderFunction, isLazyCreate);
                                ListItem.width(CommonConstants.FULL_WIDTH);
                                ListItem.height({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                ListItem.onClick(() => {
                                    this.isInsert = false;
                                    this.selectListItem(account);
                                    this.dialogController.open();
                                });
                                if (!isInitialRender) {
                                    ListItem.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            };
                            const observedShallowRender = () => {
                                this.observeComponentCreation(itemCreation);
                                ListItem.pop();
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation(itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    Row.width(CommonConstants.FULL_WIDTH);
                                    Row.padding({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单类型图标
                                    Image.create(ImageList[account.typeText]);
                                    // 账单类型图标
                                    Image.width({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单类型图标
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    // 账单类型图标
                                    Image.margin({ right: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        // 账单类型图标
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.alignItems(HorizontalAlign.Start);
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单类型文字
                                    Text.create(account.typeText);
                                    // 账单类型文字
                                    Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单类型文字
                                    Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        // 账单类型文字
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 账单类型文字
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单时间
                                    Text.create(formatDateTime(account.date, 'HH:mm'));
                                    // 账单时间
                                    Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单时间
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单时间
                                    Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        // 账单时间
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 账单时间
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (account.desc) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                // 账单描述分隔线
                                                Divider.create();
                                                // 账单描述分隔线
                                                Divider.vertical(true);
                                                // 账单描述分隔线
                                                Divider.strokeWidth(CommonConstants.DIVIDER_SIZE_M);
                                                // 账单描述分隔线
                                                Divider.color({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                // 账单描述分隔线
                                                Divider.height(CommonConstants.HALF_WIDTH);
                                                // 账单描述分隔线
                                                Divider.align(Alignment.Center);
                                                // 账单描述分隔线
                                                Divider.margin({ left: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                                if (!isInitialRender) {
                                                    // 账单描述分隔线
                                                    Divider.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                        });
                                    }
                                    // 账单描述
                                    else {
                                        If.branchId(1);
                                    }
                                    if (!isInitialRender) {
                                        If.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                If.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单描述
                                    Text.create(account.desc);
                                    // 账单描述
                                    Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单描述
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单描述
                                    Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单描述
                                    Text.margin({ left: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        // 账单描述
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 账单描述
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 编辑模式下显示复选框
                                    Blank.create();
                                    // 编辑模式下显示复选框
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        // 编辑模式下显示复选框
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 编辑模式下显示复选框
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (!this.isEdit) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                // 显示金额
                                                Text.create(account.accountType === 0 ? '-' + account.amount.toString() : '+' + account.amount.toString());
                                                // 显示金额
                                                Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                // 显示金额
                                                Text.fontColor(account.accountType === 0 ? { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                // 显示金额
                                                Text.align(Alignment.End);
                                                // 显示金额
                                                Text.flexGrow(CommonConstants.FULL_SIZE);
                                                if (!isInitialRender) {
                                                    // 显示金额
                                                    Text.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            // 显示金额
                                            Text.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                // 编辑模式下显示复选框
                                                Row.create();
                                                // 编辑模式下显示复选框
                                                Row.align(Alignment.End);
                                                // 编辑模式下显示复选框
                                                Row.flexGrow(CommonConstants.FULL_SIZE);
                                                // 编辑模式下显示复选框
                                                Row.justifyContent(FlexAlign.End);
                                                if (!isInitialRender) {
                                                    // 编辑模式下显示复选框
                                                    Row.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Toggle.create({ type: ToggleType.Checkbox });
                                                Toggle.onChange((isOn) => {
                                                    if (isOn) {
                                                        this.deleteList.push(account);
                                                    }
                                                    else {
                                                        let index = this.deleteList.indexOf(account);
                                                        this.deleteList.splice(index, 1);
                                                    }
                                                });
                                                if (!isInitialRender) {
                                                    Toggle.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Toggle.pop();
                                            // 编辑模式下显示复选框
                                            Row.pop();
                                        });
                                    }
                                    if (!isInitialRender) {
                                        If.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                If.pop();
                                Row.pop();
                                ListItem.pop();
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.updateFuncByElmtId.set(elmtId, itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Row.create();
                                    Row.width(CommonConstants.FULL_WIDTH);
                                    Row.padding({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单类型图标
                                    Image.create(ImageList[account.typeText]);
                                    // 账单类型图标
                                    Image.width({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单类型图标
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    // 账单类型图标
                                    Image.margin({ right: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        // 账单类型图标
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.alignItems(HorizontalAlign.Start);
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单类型文字
                                    Text.create(account.typeText);
                                    // 账单类型文字
                                    Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单类型文字
                                    Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        // 账单类型文字
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 账单类型文字
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单时间
                                    Text.create(formatDateTime(account.date, 'HH:mm'));
                                    // 账单时间
                                    Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单时间
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单时间
                                    Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        // 账单时间
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 账单时间
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (account.desc) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                // 账单描述分隔线
                                                Divider.create();
                                                // 账单描述分隔线
                                                Divider.vertical(true);
                                                // 账单描述分隔线
                                                Divider.strokeWidth(CommonConstants.DIVIDER_SIZE_M);
                                                // 账单描述分隔线
                                                Divider.color({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                // 账单描述分隔线
                                                Divider.height(CommonConstants.HALF_WIDTH);
                                                // 账单描述分隔线
                                                Divider.align(Alignment.Center);
                                                // 账单描述分隔线
                                                Divider.margin({ left: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                                if (!isInitialRender) {
                                                    // 账单描述分隔线
                                                    Divider.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                        });
                                    }
                                    // 账单描述
                                    else {
                                        If.branchId(1);
                                    }
                                    if (!isInitialRender) {
                                        If.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                If.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 账单描述
                                    Text.create(account.desc);
                                    // 账单描述
                                    Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单描述
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单描述
                                    Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    // 账单描述
                                    Text.margin({ left: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        // 账单描述
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 账单描述
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    // 编辑模式下显示复选框
                                    Blank.create();
                                    // 编辑模式下显示复选框
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        // 编辑模式下显示复选框
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                // 编辑模式下显示复选框
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (!this.isEdit) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                // 显示金额
                                                Text.create(account.accountType === 0 ? '-' + account.amount.toString() : '+' + account.amount.toString());
                                                // 显示金额
                                                Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                // 显示金额
                                                Text.fontColor(account.accountType === 0 ? { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                // 显示金额
                                                Text.align(Alignment.End);
                                                // 显示金额
                                                Text.flexGrow(CommonConstants.FULL_SIZE);
                                                if (!isInitialRender) {
                                                    // 显示金额
                                                    Text.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            // 显示金额
                                            Text.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                // 编辑模式下显示复选框
                                                Row.create();
                                                // 编辑模式下显示复选框
                                                Row.align(Alignment.End);
                                                // 编辑模式下显示复选框
                                                Row.flexGrow(CommonConstants.FULL_SIZE);
                                                // 编辑模式下显示复选框
                                                Row.justifyContent(FlexAlign.End);
                                                if (!isInitialRender) {
                                                    // 编辑模式下显示复选框
                                                    Row.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Toggle.create({ type: ToggleType.Checkbox });
                                                Toggle.onChange((isOn) => {
                                                    if (isOn) {
                                                        this.deleteList.push(account);
                                                    }
                                                    else {
                                                        let index = this.deleteList.indexOf(account);
                                                        this.deleteList.splice(index, 1);
                                                    }
                                                });
                                                if (!isInitialRender) {
                                                    Toggle.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Toggle.pop();
                                            // 编辑模式下显示复选框
                                            Row.pop();
                                        });
                                    }
                                    if (!isInitialRender) {
                                        If.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                If.pop();
                                Row.pop();
                                ListItem.pop();
                            };
                            if (isLazyCreate) {
                                observedShallowRender();
                            }
                            else {
                                observedDeepRender();
                            }
                        }
                    };
                    this.forEachUpdateFunction(elmtId, accounts, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                ListItemGroup.pop();
            };
            this.forEachUpdateFunction(elmtId, getGroupedAccounts(this.filteredAccounts), forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        // 账单列表
        List.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            // 编辑模式下显示删除按钮
            if (this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.width({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.markAnchor({ x: { "id": 16777268, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, y: CommonConstants.MINIMUM_SIZE });
                        Button.position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y });
                        Button.onClick(() => {
                            this.deleteListItem();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['delete.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=MainPage.js.map