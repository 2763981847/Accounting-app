// 引入 Prompt 模块
import prompt from '@ohos:promptAction';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { EarnList, PayList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import { formatDateTime } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
export default class AddDialogComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.controller = undefined;
        this.__isInsert = new SynchedPropertySimpleTwoWayPU(params.isInsert, this, "isInsert");
        this.__newAccount = new SynchedPropertyObjectTwoWayPU(params.newAccount, this, "newAccount");
        this.confirm = undefined;
        this.scroller = new Scroller();
        this.inputAmount = '';
        this.inputDesc = '';
        this.__payList = new ObservedPropertyObjectPU(PayList, this, "payList");
        this.__earnList = new ObservedPropertyObjectPU(EarnList, this, "earnList");
        this.__bgColor = new ObservedPropertySimplePU('', this, "bgColor");
        this.__curIndex = new ObservedPropertySimplePU(0, this, "curIndex");
        this.__curType = new ObservedPropertySimplePU('', this, "curType");
        this.selectedDate = this.newAccount.date // 选中的日期，默认为新账户的日期
        ;
        this.__dateString = new ObservedPropertySimplePU(formatDateTime(this.selectedDate, 'yyyy.MM.dd') // 日期字符串
        , this, "dateString");
        this.__timeString = new ObservedPropertySimplePU(formatDateTime(this.selectedDate, 'HH:mm') // 时间字符串
        // 构建 Tab 标签页
        , this, "timeString");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.inputAmount !== undefined) {
            this.inputAmount = params.inputAmount;
        }
        if (params.inputDesc !== undefined) {
            this.inputDesc = params.inputDesc;
        }
        if (params.payList !== undefined) {
            this.payList = params.payList;
        }
        if (params.earnList !== undefined) {
            this.earnList = params.earnList;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.curIndex !== undefined) {
            this.curIndex = params.curIndex;
        }
        if (params.curType !== undefined) {
            this.curType = params.curType;
        }
        if (params.selectedDate !== undefined) {
            this.selectedDate = params.selectedDate;
        }
        if (params.dateString !== undefined) {
            this.dateString = params.dateString;
        }
        if (params.timeString !== undefined) {
            this.timeString = params.timeString;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__payList.purgeDependencyOnElmtId(rmElmtId);
        this.__earnList.purgeDependencyOnElmtId(rmElmtId);
        this.__bgColor.purgeDependencyOnElmtId(rmElmtId);
        this.__curIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__curType.purgeDependencyOnElmtId(rmElmtId);
        this.__dateString.purgeDependencyOnElmtId(rmElmtId);
        this.__timeString.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__payList.aboutToBeDeleted();
        this.__earnList.aboutToBeDeleted();
        this.__bgColor.aboutToBeDeleted();
        this.__curIndex.aboutToBeDeleted();
        this.__curType.aboutToBeDeleted();
        this.__dateString.aboutToBeDeleted();
        this.__timeString.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    setController(ctr) {
        this.controller = ctr;
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
    get payList() {
        return this.__payList.get();
    }
    set payList(newValue) {
        this.__payList.set(newValue);
    }
    get earnList() {
        return this.__earnList.get();
    }
    set earnList(newValue) {
        this.__earnList.set(newValue);
    }
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue) {
        this.__bgColor.set(newValue);
    }
    get curIndex() {
        return this.__curIndex.get();
    }
    set curIndex(newValue) {
        this.__curIndex.set(newValue);
    }
    get curType() {
        return this.__curType.get();
    }
    set curType(newValue) {
        this.__curType.set(newValue);
    }
    get dateString() {
        return this.__dateString.get();
    }
    set dateString(newValue) {
        this.__dateString.set(newValue);
    }
    get timeString() {
        return this.__timeString.get();
    }
    set timeString(newValue) {
        this.__timeString.set(newValue);
    }
    // 构建 Tab 标签页
    TabBuilder(index, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.margin({ bottom: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.border(this.curIndex === index ? {
                width: { bottom: { "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } },
                color: { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            } : { color: Color.White });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(index === 0 ? { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(this.curIndex === index ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : Color.Gray);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    // 当即将出现时触发的生命周期函数
    aboutToAppear() {
        this.inputAmount = this.newAccount.amount.toString(); // 初始化输入金额
        this.curIndex = this.newAccount.accountType; // 初始化当前支付或收入索引
        this.curType = this.newAccount.typeText; // 初始化当前支付或收入类型
    }
    // 选择支付或收入类型
    selectAccount(item) {
        this.newAccount.accountType = item.accountType;
        this.newAccount.typeText = item.typeText;
        this.curType = item.typeText;
    }
    // 构建对话框内容
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_M });
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.DIALOG_HEIGHT);
            Column.borderRadius({ topLeft: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, topRight: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.backgroundColor(Color.White);
            Column.align(Alignment.BottomEnd);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 关闭按钮
            Image.create({ "id": 0, "type": 30000, params: ['half.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 关闭按钮
            Image.width({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 关闭按钮
            Image.height({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 关闭按钮
            Image.onClick(() => {
                var _a;
                (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
            });
            if (!isInitialRender) {
                // 关闭按钮
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 顶部标签页切换
            Tabs.create({ barPosition: BarPosition.Start, index: this.curIndex });
            // 顶部标签页切换
            Tabs.width(CommonConstants.FULL_WIDTH);
            // 顶部标签页切换
            Tabs.height(CommonConstants.TABS_HEIGHT);
            // 顶部标签页切换
            Tabs.vertical(false);
            // 顶部标签页切换
            Tabs.barMode(BarMode.Fixed);
            // 顶部标签页切换
            Tabs.onChange((index) => {
                this.curIndex = index;
            });
            if (!isInitialRender) {
                // 顶部标签页切换
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    // 支出类型列表
                    Grid.create(this.scroller);
                    // 支出类型列表
                    Grid.columnsTemplate('1fr 1fr 1fr 1fr');
                    // 支出类型列表
                    Grid.scrollBar(BarState.Off);
                    if (!isInitialRender) {
                        // 支出类型列表
                        Grid.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        {
                            const isLazyCreate = true && (Grid.willUseProxy() === true);
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                GridItem.create(deepRenderFunction, isLazyCreate);
                                if (!isInitialRender) {
                                    GridItem.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            };
                            const observedShallowRender = () => {
                                this.observeComponentCreation(itemCreation);
                                GridItem.pop();
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation(itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.width({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.aspectRatio(CommonConstants.FULL_SIZE);
                                    Column.padding({ top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.margin({ top: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.align(Alignment.TopStart);
                                    Column.backgroundColor(this.curType === item.typeText ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.borderRadius({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.onClick(() => {
                                        this.selectAccount(item);
                                    });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                                    Image.width({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.margin({ top: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                                GridItem.pop();
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.updateFuncByElmtId.set(elmtId, itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.width({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.aspectRatio(CommonConstants.FULL_SIZE);
                                    Column.padding({ top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.margin({ top: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.align(Alignment.TopStart);
                                    Column.backgroundColor(this.curType === item.typeText ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.borderRadius({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.onClick(() => {
                                        this.selectAccount(item);
                                    });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                                    Image.width({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.margin({ top: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                                GridItem.pop();
                            };
                            if (isLazyCreate) {
                                observedShallowRender();
                            }
                            else {
                                observedDeepRender();
                            }
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.payList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                // 支出类型列表
                Grid.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 0);
                } });
            TabContent.margin({ bottom: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 支出标签页
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TabContent.create(() => {
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    // 收入类型列表
                    Grid.create(this.scroller);
                    // 收入类型列表
                    Grid.columnsTemplate('1fr 1fr 1fr 1fr');
                    // 收入类型列表
                    Grid.scrollBar(BarState.Off);
                    if (!isInitialRender) {
                        // 收入类型列表
                        Grid.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        {
                            const isLazyCreate = true && (Grid.willUseProxy() === true);
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                GridItem.create(deepRenderFunction, isLazyCreate);
                                if (!isInitialRender) {
                                    GridItem.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            };
                            const observedShallowRender = () => {
                                this.observeComponentCreation(itemCreation);
                                GridItem.pop();
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation(itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.width({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.aspectRatio(CommonConstants.FULL_SIZE);
                                    Column.padding({ top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.margin({ top: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.align(Alignment.TopStart);
                                    Column.backgroundColor(this.curType === item.typeText ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.borderRadius({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.onClick(() => {
                                        this.selectAccount(item);
                                    });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                                    Image.width({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.margin({ top: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                                GridItem.pop();
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.updateFuncByElmtId.set(elmtId, itemCreation);
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.width({ "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.aspectRatio(CommonConstants.FULL_SIZE);
                                    Column.padding({ top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.margin({ top: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    Column.align(Alignment.TopStart);
                                    Column.backgroundColor(this.curType === item.typeText ? { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.borderRadius({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Column.onClick(() => {
                                        this.selectAccount(item);
                                    });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Image.create(this.curType === item.typeText ? item.iconSelected : item.icon);
                                    Image.width({ "id": 16777267, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Image.aspectRatio(CommonConstants.FULL_SIZE);
                                    if (!isInitialRender) {
                                        Image.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create(item.typeText);
                                    Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.fontColor(this.curType === item.typeText ? Color.White : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                    Text.margin({ top: { "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                                GridItem.pop();
                            };
                            if (isLazyCreate) {
                                observedShallowRender();
                            }
                            else {
                                observedDeepRender();
                            }
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.earnList, forEachItemGenFunction);
                    if (!isInitialRender) {
                        ForEach.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                ForEach.pop();
                // 收入类型列表
                Grid.pop();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, 1);
                } });
            TabContent.margin({ bottom: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 收入标签页
                TabContent.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        TabContent.pop();
        // 顶部标签页切换
        Tabs.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 选择日期和时间
            Row.create({ space: CommonConstants.SPACE_M });
            // 选择日期和时间
            Row.height('5%');
            // 选择日期和时间
            Row.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                // 选择日期和时间
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel(this.dateString + '  ▼');
            Button.onClick(() => {
                DatePickerDialog.show({ end: new Date(), selected: this.newAccount.date, onAccept: (value) => {
                        this.selectedDate.setFullYear(value.year, value.month, value.day);
                        this.dateString = formatDateTime(this.selectedDate, 'yyyy.MM.dd');
                    } });
            });
            Button.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel(this.timeString + '  ▼');
            Button.onClick(() => {
                TimePickerDialog.show({ useMilitaryTime: true, selected: this.newAccount.date, onAccept: (value) => {
                        this.selectedDate.setHours(value.hour, value.minute);
                        this.timeString = formatDateTime(this.selectedDate, 'HH:mm');
                    } });
            });
            Button.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        // 选择日期和时间
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 输入金额
            Column.create();
            // 输入金额
            Column.width(CommonConstants.FULL_WIDTH);
            // 输入金额
            Column.padding({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 输入金额
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.borderWidth({ bottom: CommonConstants.FULL_SIZE });
            Column.borderColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({
                placeholder: { "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                text: this.newAccount.amount.toString()
            });
            TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
            TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
            TextInput.backgroundColor(Color.White);
            TextInput.type(InputType.Number);
            TextInput.onChange((value) => {
                this.inputAmount = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        // 输入金额
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 输入描述
            Column.create();
            // 输入描述
            Column.width(CommonConstants.FULL_WIDTH);
            // 输入描述
            Column.padding({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                // 输入描述
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.width(CommonConstants.FULL_WIDTH);
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.Black);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.height({ "id": 16777249, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.padding({ top: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.borderWidth({ bottom: CommonConstants.FULL_SIZE });
            Column.borderColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({
                placeholder: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                text: this.newAccount.desc
            });
            TextInput.padding({ left: CommonConstants.MINIMUM_SIZE });
            TextInput.borderRadius(CommonConstants.MINIMUM_SIZE);
            TextInput.backgroundColor(Color.White);
            TextInput.type(InputType.Normal);
            TextInput.onChange((value) => {
                this.inputDesc = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        // 输入描述
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 确认按钮
            Column.create();
            // 确认按钮
            Column.layoutWeight(CommonConstants.FULL_SIZE);
            // 确认按钮
            Column.padding({
                bottom: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                left: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
            // 确认按钮
            Column.justifyContent(FlexAlign.End);
            if (!isInitialRender) {
                // 确认按钮
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithChild();
            Button.width(CommonConstants.FULL_WIDTH);
            Button.height({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Button.onClick(() => {
                var _a;
                // 判断输入是否合法
                if (this.newAccount.typeText === '' || this.curIndex !== this.newAccount.accountType) {
                    prompt.showToast({ message: CommonConstants.TOAST_TEXT_1, bottom: CommonConstants.PROMPT_BOTTOM });
                }
                else {
                    let regex = new RegExp('[1-9][0-9]*');
                    let matchValue = this.inputAmount.match(regex);
                    if (matchValue !== null && matchValue[0] === this.inputAmount) {
                        // 合法输入，更新账户信息，调用确认回调函数
                        this.newAccount.amount = Number(this.inputAmount);
                        this.newAccount.date = this.selectedDate;
                        this.newAccount.desc = this.inputDesc;
                        this.confirm && this.confirm(this.isInsert, ObservedObject.GetRawObject(this.newAccount));
                        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
                    }
                    else {
                        // 非法输入，提示用户重新输入
                        prompt.showToast({ message: CommonConstants.TOAST_TEXT_2, bottom: CommonConstants.PROMPT_BOTTOM });
                    }
                }
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor(Color.White);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Button.pop();
        // 确认按钮
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=AddDialogComponent.js.map