import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import { formatDateTime, isSameDay } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
import StatisticalCardComponent from '@bundle:com.example.rdb/entry/ets/view/StatisticalCardComponent';
import groupHeader from '@bundle:com.example.rdb/entry/ets/view/GroupHeaderBuilder';
function getGroupedAccounts(accounts) {
    let groupedAccounts = [];
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        if (i == 0 || !isSameDay(accounts[i - 1].date, account.date)) {
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
        this.__filteredAccounts = new ObservedPropertyObjectPU([], this, "filteredAccounts");
        this.__isInsert = new SynchedPropertySimpleTwoWayPU(params.isInsert, this, "isInsert");
        this.__newAccount = new SynchedPropertyObjectTwoWayPU(params.newAccount, this, "newAccount");
        this.__index = new SynchedPropertySimpleTwoWayPU(params.index, this, "index");
        this.dialogController = undefined;
        this.accountTable = undefined;
        this.deleteList = [];
        this.scroller = new Scroller();
        this.searchController = new SearchController();
        this.onAccountsChange = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("accounts", this.filterAccounts);
    }
    setInitiallyProvidedValue(params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEdit !== undefined) {
            this.isEdit = params.isEdit;
        }
        if (params.filteredAccounts !== undefined) {
            this.filteredAccounts = params.filteredAccounts;
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
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
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
        this.__filteredAccounts.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__isEdit.aboutToBeDeleted();
        this.__accounts.aboutToBeDeleted();
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
    aboutToAppear() {
        this.filterAccounts();
    }
    filterAccounts() {
        let temp = this.accounts;
        if (this.searchText && this.searchText != '') {
            temp = temp.filter(account => account.desc.includes(this.searchText) ||
                account.typeText.includes(this.searchText) ||
                account.amount.toString() === this.searchText);
        }
        this.filteredAccounts = temp;
    }
    selectListItem(item) {
        this.index = this.filteredAccounts.indexOf(item);
        this.newAccount = item;
    }
    deleteListItem() {
        for (let i = 0; i < this.deleteList.length; i++) {
            this.accountTable.deleteData(this.deleteList[i], () => {
                this.onAccountsChange();
            });
        }
        this.deleteList = [];
        this.isEdit = false;
    }
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
            Column.padding({ left: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
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
            Row.margin({ top: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777219, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.height({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['ic_public_edit.svg'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.aspectRatio(CommonConstants.FULL_SIZE);
            Image.margin({ right: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Image.onClick(() => {
                this.isEdit = !this.isEdit;
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.width(CommonConstants.FULL_WIDTH);
            Row.padding({ left: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Row.margin({ top: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Search.create({
                value: this.searchText,
                placeholder: CommonConstants.SEARCH_TEXT,
                controller: this.searchController
            });
            Search.width(CommonConstants.FULL_WIDTH);
            Search.borderRadius({ "id": 16777266, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.borderWidth({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.borderColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.placeholderFont({ size: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Search.textFont({ size: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Search.backgroundColor(Color.White);
            Search.onChange((searchValue) => {
                this.searchText = searchValue;
            });
            Search.onSubmit((searchValue) => {
                this.filterAccounts();
            });
            if (!isInitialRender) {
                Search.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Search.pop();
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
                    ViewPU.create(new StatisticalCardComponent(this, { accounts: this.__accounts }, undefined, elmtId));
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
            List.create({ space: CommonConstants.SPACE_M });
            List.width(CommonConstants.FULL_WIDTH);
            List.margin({ top: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
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
                    ListItemGroup.borderRadius({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                ListItem.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                    Row.padding({ left: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(ImageList[account.typeText]);
                                    Image.width({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    Image.margin({ right: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
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
                                    Text.create(account.typeText);
                                    Text.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(formatDateTime(account.date, 'HH:mm'));
                                    Text.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (account.desc) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Divider.create();
                                                Divider.vertical(true);
                                                Divider.strokeWidth(CommonConstants.DIVIDER_SIZE_M);
                                                Divider.color({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Divider.height(CommonConstants.HALF_WIDTH);
                                                Divider.align(Alignment.Center);
                                                Divider.margin({ left: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                                if (!isInitialRender) {
                                                    Divider.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
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
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(account.desc);
                                    Text.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.margin({ left: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Blank.create();
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (!this.isEdit) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Text.create(account.accountType === 0 ? '-' + account.amount.toString() : '+' + account.amount.toString());
                                                Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.fontColor(account.accountType === 0 ? { "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.align(Alignment.End);
                                                Text.flexGrow(CommonConstants.FULL_SIZE);
                                                if (!isInitialRender) {
                                                    Text.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Text.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Row.create();
                                                Row.align(Alignment.End);
                                                Row.flexGrow(CommonConstants.FULL_SIZE);
                                                Row.justifyContent(FlexAlign.End);
                                                if (!isInitialRender) {
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
                                    Row.padding({ left: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Row.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(ImageList[account.typeText]);
                                    Image.width({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    Image.margin({ right: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
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
                                    Text.create(account.typeText);
                                    Text.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(formatDateTime(account.date, 'HH:mm'));
                                    Text.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (account.desc) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Divider.create();
                                                Divider.vertical(true);
                                                Divider.strokeWidth(CommonConstants.DIVIDER_SIZE_M);
                                                Divider.color({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Divider.height(CommonConstants.HALF_WIDTH);
                                                Divider.align(Alignment.Center);
                                                Divider.margin({ left: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                                if (!isInitialRender) {
                                                    Divider.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
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
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(account.desc);
                                    Text.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.margin({ left: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Blank.create();
                                    Blank.layoutWeight(1);
                                    if (!isInitialRender) {
                                        Blank.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Blank.pop();
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    If.create();
                                    if (!this.isEdit) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Text.create(account.accountType === 0 ? '-' + account.amount.toString() : '+' + account.amount.toString());
                                                Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.fontColor(account.accountType === 0 ? { "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                                Text.align(Alignment.End);
                                                Text.flexGrow(CommonConstants.FULL_SIZE);
                                                if (!isInitialRender) {
                                                    Text.pop();
                                                }
                                                ViewStackProcessor.StopGetAccessRecording();
                                            });
                                            Text.pop();
                                        });
                                    }
                                    else {
                                        this.ifElseBranchUpdateFunction(1, () => {
                                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                                Row.create();
                                                Row.align(Alignment.End);
                                                Row.flexGrow(CommonConstants.FULL_SIZE);
                                                Row.justifyContent(FlexAlign.End);
                                                if (!isInitialRender) {
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
        List.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.width({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.markAnchor({ x: { "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, y: CommonConstants.MINIMUM_SIZE });
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