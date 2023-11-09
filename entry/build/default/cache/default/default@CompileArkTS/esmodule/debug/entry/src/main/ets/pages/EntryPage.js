import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
import AddDialogComponent from '@bundle:com.example.rdb/entry/ets/view/AddDialogComponent';
import AccountData from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountData';
import MainPage from '@bundle:com.example.rdb/entry/ets/pages/MainPage';
import StatisticPage from '@bundle:com.example.rdb/entry/ets/pages/StatisticPage';
class EntryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__fontColor = new ObservedPropertySimplePU('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimplePU('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__isInsert = new ObservedPropertySimplePU(false, this, "isInsert");
        this.__newAccount = new ObservedPropertyObjectPU(new AccountData(), this, "newAccount");
        this.__accounts = new ObservedPropertyObjectPU([], this, "accounts");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.accountTable = new AccountTable(() => {
            // 插入一些测试数据
            this.accountTable.insertData(new AccountData(0, '吃饭', 100), () => this.onAccountsChange());
            this.accountTable.insertData(new AccountData(0, '零食', 99), () => this.onAccountsChange());
            this.accountTable.insertData(new AccountData(0, '汽车加油', 97), () => this.onAccountsChange());
            this.accountTable.insertData(new AccountData(0, '旅游', 96), () => this.onAccountsChange());
            this.accountTable.insertData(new AccountData(0, '娱乐', 95), () => this.onAccountsChange());
            this.accountTable.insertData(new AccountData(0, '宠物', 94), () => this.onAccountsChange());
        });
        this.controller = new TabsController();
        this.addDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new AddDialogComponent(this, {
                    isInsert: this.__isInsert,
                    newAccount: this.__newAccount,
                    confirm: (isInsert, newAccount) => this.accept(isInsert, newAccount)
                });
                jsDialog.setController(this.addDialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.isInsert !== undefined) {
            this.isInsert = params.isInsert;
        }
        if (params.newAccount !== undefined) {
            this.newAccount = params.newAccount;
        }
        if (params.accounts !== undefined) {
            this.accounts = params.accounts;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.accountTable !== undefined) {
            this.accountTable = params.accountTable;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.addDialogController !== undefined) {
            this.addDialogController = params.addDialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__fontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__accounts.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue) {
        this.__fontColor.set(newValue);
    }
    get selectedFontColor() {
        return this.__selectedFontColor.get();
    }
    set selectedFontColor(newValue) {
        this.__selectedFontColor.set(newValue);
    }
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue) {
        this.__currentIndex.set(newValue);
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
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
    }
    onAccountsChange() {
        this.accountTable.getRdbStore(() => {
            this.accountTable.query((result) => {
                this.accounts = result.sort((a, b) => b.date.getTime() - a.date.getTime());
            });
        });
    }
    accept(isInsert, newAccount) {
        if (isInsert) {
            Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
            this.accountTable.insertData(newAccount, () => {
                this.onAccountsChange();
            });
        }
        else {
            this.accountTable.updateData(newAccount, () => {
                this.onAccountsChange();
            });
        }
    }
    aboutToAppear() {
        this.onAccountsChange();
    }
    TabBuilder(index, name, image, activeImage, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_S });
            Column.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(this.currentIndex === index ? activeImage : image);
            Image.width(24);
            Image.height(24);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(name);
            Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
            Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(this.currentIndex === index ? 500 : 400);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create({ alignContent: Alignment.Bottom });
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
            Tabs.vertical(false);
            Tabs.barMode(BarMode.Fixed);
            Tabs.barHeight(CommonConstants.BAR_HEIGHT);
            Tabs.animationDuration(400);
            Tabs.onChange((index) => {
                this.currentIndex = index;
            });
            Tabs.width(CommonConstants.FULL_WIDTH);
            Tabs.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new MainPage(this, {
                                accounts: this.__accounts,
                                isInsert: this.__isInsert,
                                newAccount: this.__newAccount,
                                index: this.__index,
                                dialogController: this.addDialogController,
                                accountTable: this.accountTable,
                                onAccountsChange: this.onAccountsChange
                            }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 0, '首页', { "id": 16777268, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, { "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new StatisticPage(this, {
                                accounts: this.__accounts
                            }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 1, '统计', { "id": 16777274, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, { "id": 16777275, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                } });
            if (!isInitialRender) {
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        Tabs.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create({ alignContent: Alignment.Bottom });
            Stack.width(CommonConstants.ADD_SIZE);
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.onClick(() => {
                this.controller.changeIndex(0);
                this.newAccount = new AccountData();
                this.isInsert = true;
                this.addDialogController.open();
            });
            Button.aspectRatio(1);
            Button.height(CommonConstants.ADD_SIZE);
            Button.offset({ y: -CommonConstants.BAR_HEIGHT + CommonConstants.ADD_SIZE / 2 });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777270, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width(CommonConstants.HALF_WIDTH);
            Image.height(CommonConstants.HALF_HEIGHT);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Stack.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new EntryPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=EntryPage.js.map