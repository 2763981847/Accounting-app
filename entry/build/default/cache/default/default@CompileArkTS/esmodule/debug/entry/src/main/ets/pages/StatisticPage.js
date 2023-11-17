// 该组件用于展示统计页面，包括支出和收入的分类统计信息
// 引入常量、工具和组件
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { getEndOfTheDay, getFirstDateOfThisMonth } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
import { getRatios, statisticByType } from '@bundle:com.example.rdb/entry/ets/common/utils/StatisticalUtils';
import DateSelectComponent from '@bundle:com.example.rdb/entry/ets/view/DateSelectComponent';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import { panelColors } from '@bundle:com.example.rdb/entry/ets/viewmodel/PanelColors';
export default class StatisticPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__accounts = new SynchedPropertyObjectTwoWayPU(params.accounts, this, "accounts");
        this.__endDate = new ObservedPropertySimplePU(getEndOfTheDay(new Date()).getTime(), this, "endDate");
        this.__beginDate = new ObservedPropertySimplePU(getFirstDateOfThisMonth(this.endDate).getTime(), this, "beginDate");
        this.__accountType = new ObservedPropertySimplePU(0, this, "accountType");
        this.__classifiedStatistics = new ObservedPropertyObjectPU(statisticByType(this.accounts, this.accountType, this.beginDate, this.endDate), this, "classifiedStatistics");
        this.__totalAmount = new ObservedPropertySimplePU(this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount)
            .reduce((total, cur) => total + cur, 0), this, "totalAmount");
        this.__ratios = new ObservedPropertyObjectPU(getRatios(this.classifiedStatistics), this, "ratios");
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.declareWatch("accounts", this.refreshClassifiedStatistics);
        this.declareWatch("endDate", this.refreshClassifiedStatistics);
        this.declareWatch("beginDate", this.refreshClassifiedStatistics);
        this.declareWatch("accountType", this.refreshClassifiedStatistics);
    }
    setInitiallyProvidedValue(params) {
        if (params.endDate !== undefined) {
            this.endDate = params.endDate;
        }
        if (params.beginDate !== undefined) {
            this.beginDate = params.beginDate;
        }
        if (params.accountType !== undefined) {
            this.accountType = params.accountType;
        }
        if (params.classifiedStatistics !== undefined) {
            this.classifiedStatistics = params.classifiedStatistics;
        }
        if (params.totalAmount !== undefined) {
            this.totalAmount = params.totalAmount;
        }
        if (params.ratios !== undefined) {
            this.ratios = params.ratios;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__endDate.purgeDependencyOnElmtId(rmElmtId);
        this.__beginDate.purgeDependencyOnElmtId(rmElmtId);
        this.__accountType.purgeDependencyOnElmtId(rmElmtId);
        this.__classifiedStatistics.purgeDependencyOnElmtId(rmElmtId);
        this.__totalAmount.purgeDependencyOnElmtId(rmElmtId);
        this.__ratios.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__accounts.aboutToBeDeleted();
        this.__endDate.aboutToBeDeleted();
        this.__beginDate.aboutToBeDeleted();
        this.__accountType.aboutToBeDeleted();
        this.__classifiedStatistics.aboutToBeDeleted();
        this.__totalAmount.aboutToBeDeleted();
        this.__ratios.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    get classifiedStatistics() {
        return this.__classifiedStatistics.get();
    }
    set classifiedStatistics(newValue) {
        this.__classifiedStatistics.set(newValue);
    }
    get totalAmount() {
        return this.__totalAmount.get();
    }
    set totalAmount(newValue) {
        this.__totalAmount.set(newValue);
    }
    get ratios() {
        return this.__ratios.get();
    }
    set ratios(newValue) {
        this.__ratios.set(newValue);
    }
    // 刷新分类统计信息
    refreshClassifiedStatistics() {
        this.classifiedStatistics = statisticByType(this.accounts, this.accountType, this.beginDate, this.endDate);
        this.totalAmount = this.classifiedStatistics
            .map(classifiedStatistic => classifiedStatistic.amount)
            .reduce((total, cur) => total + cur, 0);
        this.ratios = getRatios(this.classifiedStatistics);
    }
    // 渲染页面
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Scroll.create(this.scroller);
            Scroll.width(CommonConstants.FULL_WIDTH);
            Scroll.height(CommonConstants.FULL_HEIGHT);
            Scroll.align(Alignment.Top);
            Scroll.scrollBar(BarState.Off);
            Scroll.backgroundColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Scroll.padding({
                left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                top: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
            if (!isInitialRender) {
                Scroll.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_M });
            Column.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.padding({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.width(CommonConstants.FULL_WIDTH);
            Column.borderRadius({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.backgroundColor(Color.White);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
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
                    // 日期选择组件
                    DateSelectComponent(this, {
                        beginDate: this.__beginDate,
                        endDate: this.__endDate,
                        selectedIndex: 0
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
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.alignItems(VerticalAlign.Center);
            Row.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.width('70%');
            Stack.aspectRatio(1);
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 数据面板
            DataPanel.create({
                values: this.classifiedStatistics.map(classifiedStatistic => classifiedStatistic.amount),
                max: 0
            });
            // 数据面板
            DataPanel.aspectRatio(1);
            if (!isInitialRender) {
                // 数据面板
                DataPanel.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 数据面板
        DataPanel.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_S });
            Column.justifyContent(FlexAlign.Center);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 总支出/收入文本
            Text.create('总' + (this.accountType === 0 ? '支出' : '收入'));
            // 总支出/收入文本
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 总支出/收入文本
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                // 总支出/收入文本
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 总支出/收入文本
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 总金额文本
            Text.create(this.totalAmount.toString());
            // 总金额文本
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 总金额文本
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                // 总金额文本
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 总金额文本
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 切换按钮
            Image.create({ "id": 16777280, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 切换按钮
            Image.width({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 切换按钮
            Image.onClick(() => this.accountType = this.accountType === 0 ? 1 : 0);
            if (!isInitialRender) {
                // 切换按钮
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        Stack.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 列表展示分类统计信息
            List.create({ space: CommonConstants.SPACE_S });
            // 列表展示分类统计信息
            List.width('25%');
            if (!isInitialRender) {
                // 列表展示分类统计信息
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const classifiedStatistic = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
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
                            Row.create({ space: CommonConstants.SPACE_S });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类面板
                            Text.create();
                            // 分类面板
                            Text.backgroundColor(panelColors[index]);
                            // 分类面板
                            Text.aspectRatio(1);
                            // 分类面板
                            Text.height({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 分类面板
                            Text.borderRadius({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 分类面板
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 分类面板
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类类型文本
                            Text.create(classifiedStatistic.typeText);
                            // 分类类型文本
                            Text.fontColor(panelColors[index]);
                            // 分类类型文本
                            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 分类类型文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 分类类型文本
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Row.create({ space: CommonConstants.SPACE_S });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类面板
                            Text.create();
                            // 分类面板
                            Text.backgroundColor(panelColors[index]);
                            // 分类面板
                            Text.aspectRatio(1);
                            // 分类面板
                            Text.height({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 分类面板
                            Text.borderRadius({ "id": 16777271, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 分类面板
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 分类面板
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类类型文本
                            Text.create(classifiedStatistic.typeText);
                            // 分类类型文本
                            Text.fontColor(panelColors[index]);
                            // 分类类型文本
                            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 分类类型文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 分类类型文本
                        Text.pop();
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
            this.forEachUpdateFunction(elmtId, this.classifiedStatistics, forEachItemGenFunction, undefined, true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        // 列表展示分类统计信息
        List.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_M });
            Column.width(CommonConstants.FULL_WIDTH);
            Column.padding({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777269, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Column.backgroundColor(Color.White);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 类别/比例标题行
            Row.create();
            // 类别/比例标题行
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 类别/比例标题行
            Row.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                // 类别/比例标题行
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('类别/比例');
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('金额');
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        // 类别/比例标题行
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 列表展示详细分类统计信息
            List.create({ space: CommonConstants.SPACE_S });
            // 列表展示详细分类统计信息
            List.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                // 列表展示详细分类统计信息
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const classifiedStatistic = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.width(CommonConstants.FULL_WIDTH);
                        ListItem.height({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            // 排名文本
                            Text.create((index + 1).toString());
                            // 排名文本
                            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 排名文本
                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 排名文本
                            Text.margin({ right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                // 排名文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 排名文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类图标
                            Image.create(ImageList[classifiedStatistic.typeText]);
                            // 分类图标
                            Image.width({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 分类图标
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            // 分类图标
                            Image.margin({ right: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                // 分类图标
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.margin({ right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类类型文本
                            Text.create(classifiedStatistic.typeText);
                            // 分类类型文本
                            Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 分类类型文本
                            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 分类类型文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 分类类型文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 笔数文本
                            Text.create(classifiedStatistic.count + '笔');
                            // 笔数文本
                            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 笔数文本
                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 笔数文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 笔数文本
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 比例文本
                            Text.create('/' + (this.ratios[index] * 100).toFixed(2) + '%');
                            // 比例文本
                            Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 比例文本
                            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 比例文本
                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 比例文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 比例文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 占位
                            Blank.create();
                            // 占位
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                // 占位
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 占位
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 金额文本
                            Text.create(this.accountType === 0 ? '-' + classifiedStatistic.amount.toString() : '+' + classifiedStatistic.amount.toString());
                            // 金额文本
                            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 金额文本
                            Text.fontColor(this.accountType === 0 ? { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 金额文本
                            Text.align(Alignment.End);
                            // 金额文本
                            Text.flexGrow(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                // 金额文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 金额文本
                        Text.pop();
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
                            // 排名文本
                            Text.create((index + 1).toString());
                            // 排名文本
                            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 排名文本
                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 排名文本
                            Text.margin({ right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                // 排名文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 排名文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类图标
                            Image.create(ImageList[classifiedStatistic.typeText]);
                            // 分类图标
                            Image.width({ "id": 16777248, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 分类图标
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            // 分类图标
                            Image.margin({ right: { "id": 16777258, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                // 分类图标
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.margin({ right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Column.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 分类类型文本
                            Text.create(classifiedStatistic.typeText);
                            // 分类类型文本
                            Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 分类类型文本
                            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 分类类型文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 分类类型文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 笔数文本
                            Text.create(classifiedStatistic.count + '笔');
                            // 笔数文本
                            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 笔数文本
                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 笔数文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 笔数文本
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 比例文本
                            Text.create('/' + (this.ratios[index] * 100).toFixed(2) + '%');
                            // 比例文本
                            Text.height({ "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 比例文本
                            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 比例文本
                            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                // 比例文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 比例文本
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 占位
                            Blank.create();
                            // 占位
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                // 占位
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 占位
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            // 金额文本
                            Text.create(this.accountType === 0 ? '-' + classifiedStatistic.amount.toString() : '+' + classifiedStatistic.amount.toString());
                            // 金额文本
                            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 金额文本
                            Text.fontColor(this.accountType === 0 ? { "id": 16777240, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            // 金额文本
                            Text.align(Alignment.End);
                            // 金额文本
                            Text.flexGrow(CommonConstants.FULL_SIZE);
                            if (!isInitialRender) {
                                // 金额文本
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        // 金额文本
                        Text.pop();
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
            this.forEachUpdateFunction(elmtId, this.classifiedStatistics, forEachItemGenFunction, undefined, true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        // 列表展示详细分类统计信息
        List.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=StatisticPage.js.map