// 导入相关模块和类
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
import AddDialogComponent from '@bundle:com.example.rdb/entry/ets/view/AddDialogComponent';
import Account from '@bundle:com.example.rdb/entry/ets/common/beans/Account';
import { testAccounts } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import MainPage from '@bundle:com.example.rdb/entry/ets/pages/MainPage';
import StatisticPage from '@bundle:com.example.rdb/entry/ets/pages/StatisticPage';
class EntryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__fontColor = new ObservedPropertySimplePU('#182431', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimplePU('#007DFF', this, "selectedFontColor");
        this.__currentIndex = new ObservedPropertySimplePU(0, this, "currentIndex");
        this.__isInsert = new ObservedPropertySimplePU(false, this, "isInsert");
        this.__newAccount = new ObservedPropertyObjectPU(new Account(), this, "newAccount");
        this.__accounts = new ObservedPropertyObjectPU([], this, "accounts");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.accountTable = new AccountTable(() => {
            this.accountTable.batchInsert(testAccounts, () => this.onAccountsChange());
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
    // 当账目数据发生变化时执行的回调函数
    onAccountsChange() {
        this.accountTable.getRdbStore(() => {
            this.accountTable.query((result) => {
                // 按时间降序排序
                this.accounts = result.sort((a, b) => b.date.getTime() - a.date.getTime());
            });
        });
    }
    // 处理确认对话框的操作
    accept(isInsert, newAccount) {
        if (isInsert) {
            // 插入新账户数据
            Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
            this.accountTable.insertData(newAccount, () => {
                this.onAccountsChange();
            });
        }
        else {
            // 更新账户数据
            this.accountTable.updateData(newAccount, () => {
                this.onAccountsChange();
            });
        }
    }
    // 页面即将显示时执行的生命周期函数
    aboutToAppear() {
        this.onAccountsChange();
    }
    // 定义 TabBuilder 构建函数
    TabBuilder(index, name, image, activeImage, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_S });
            Column.justifyContent(FlexAlign.End);
            Column.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 根据当前索引选择显示普通图标或激活状态图标
            Image.create(this.currentIndex === index ? activeImage : image);
            // 根据当前索引选择显示普通图标或激活状态图标
            Image.width(24);
            // 根据当前索引选择显示普通图标或激活状态图标
            Image.height(24);
            if (!isInitialRender) {
                // 根据当前索引选择显示普通图标或激活状态图标
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 根据当前索引设置字体颜色、字体大小和字体粗细
            Text.create(name);
            // 根据当前索引设置字体颜色、字体大小和字体粗细
            Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
            // 根据当前索引设置字体颜色、字体大小和字体粗细
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 根据当前索引设置字体颜色、字体大小和字体粗细
            Text.fontWeight(this.currentIndex === index ? 500 : 400);
            if (!isInitialRender) {
                // 根据当前索引设置字体颜色、字体大小和字体粗细
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 根据当前索引设置字体颜色、字体大小和字体粗细
        Text.pop();
        Column.pop();
    }
    // 构建页面
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
            // 创建 Tabs 组件
            Tabs.create({ barPosition: BarPosition.End, controller: this.controller });
            // 创建 Tabs 组件
            Tabs.vertical(false);
            // 创建 Tabs 组件
            Tabs.barMode(BarMode.Fixed);
            // 创建 Tabs 组件
            Tabs.barHeight(CommonConstants.BAR_HEIGHT);
            // 创建 Tabs 组件
            Tabs.animationDuration(400);
            // 创建 Tabs 组件
            Tabs.onChange((index) => {
                this.currentIndex = index;
            });
            // 创建 Tabs 组件
            Tabs.width(CommonConstants.FULL_WIDTH);
            // 创建 Tabs 组件
            Tabs.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                // 创建 Tabs 组件
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
                    this.TabBuilder.call(this, 0, '记账', { "id": 16777272, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, { "id": 16777273, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                } });
            if (!isInitialRender) {
                // 创建第一个 Tab 内容，即记账页面
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
                    this.TabBuilder.call(this, 1, '报表', { "id": 16777278, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, { "id": 16777279, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                } });
            if (!isInitialRender) {
                // 创建第二个 Tab 内容，即报表页面
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        // 创建 Tabs 组件
        Tabs.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 创建底部添加按钮
            Stack.create({ alignContent: Alignment.Bottom });
            // 创建底部添加按钮
            Stack.width(CommonConstants.ADD_SIZE);
            if (!isInitialRender) {
                // 创建底部添加按钮
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.onClick(() => {
                // 点击按钮时切换到记账页面，初始化新账户数据，并打开对话框
                this.controller.changeIndex(0);
                this.newAccount = new Account();
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
            Image.create({ "id": 16777274, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width(CommonConstants.HALF_WIDTH);
            Image.height(CommonConstants.HALF_HEIGHT);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 显示按钮下方的文本
            Text.create('记一笔');
            // 显示按钮下方的文本
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 显示按钮下方的文本
            Text.fontColor(this.fontColor);
            // 显示按钮下方的文本
            Text.margin({ bottom: 5 });
            if (!isInitialRender) {
                // 显示按钮下方的文本
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 显示按钮下方的文本
        Text.pop();
        // 创建底部添加按钮
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