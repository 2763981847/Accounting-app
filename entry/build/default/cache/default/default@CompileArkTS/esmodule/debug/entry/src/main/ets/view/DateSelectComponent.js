// 引入 CommonConstants 模块
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
// 引入日期相关的工具函数和类型
import { formatDateTime, getDateRangeOfThisMonth, getDateRangeOfThisWeek, getDateRangeOfThisYear, getEndOfTheDay, getFirstDateOfThisMonth, getFirstDateOfThisYear, getMondayOfWeek, isSameDay } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
// 定义日期选择的枚举类型
var DateSelectOption;
(function (DateSelectOption) {
    DateSelectOption["ThisWeek"] = "\u672C\u5468";
    DateSelectOption["ThisMonth"] = "\u672C\u6708";
    DateSelectOption["ThisYear"] = "\u672C\u5E74";
    DateSelectOption["All"] = "\u5168\u90E8";
    DateSelectOption["CUSTOM"] = "\u81EA\u5B9A\u4E49";
})(DateSelectOption || (DateSelectOption = {}));
// 定义日期选择的选项数组
const dateSelectOptions = [{
        name: DateSelectOption.ThisWeek,
        canSwitch: true,
        getDateRange: () => {
            const now = Date.now();
            return { beginDate: getMondayOfWeek(now).getTime(), endDate: getEndOfTheDay(now).getTime() };
        },
        getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy.MM.dd') + '  -  ' + formatDateTime(endDate, 'yyyy.MM.dd'),
        switch: (curDate, toNext) => {
            const date = new Date(curDate);
            date.setDate(date.getDate() + (toNext ? 7 : -7));
            return getDateRangeOfThisWeek(date);
        },
    },
    {
        name: DateSelectOption.ThisMonth,
        canSwitch: true,
        getDateRange: () => {
            const now = Date.now();
            return { beginDate: getFirstDateOfThisMonth(now).getTime(), endDate: getEndOfTheDay(now).getTime() };
        },
        getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy.MM') + "月",
        switch: (curDate, toNext) => {
            const date = new Date(curDate);
            date.setMonth(date.getMonth() + (toNext ? 1 : -1));
            return getDateRangeOfThisMonth(date);
        }
    },
    {
        name: DateSelectOption.ThisYear,
        canSwitch: true,
        getDateRange: () => {
            const now = Date.now();
            return { beginDate: getFirstDateOfThisYear(now).getTime(), endDate: getEndOfTheDay(now).getTime() };
        },
        getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy') + "年",
        switch: (curDate, toNext) => {
            const date = new Date(curDate);
            date.setFullYear(date.getFullYear() + (toNext ? 1 : -1));
            return getDateRangeOfThisYear(date);
        }
    }, {
        name: DateSelectOption.All,
        canSwitch: false,
        getDateRange: () => {
            const now = Date.now();
            return { beginDate: 0, endDate: getEndOfTheDay(now).getTime() };
        },
        getDateString: (beginDate, endDate) => '    开始    ' + '  -  ' + formatDateTime(endDate, 'yyyy.MM.dd')
    }, {
        name: DateSelectOption.CUSTOM,
        canSwitch: false,
        getDateRange: (customBeginDate = 0, customEndDate = Date.now()) => {
            return { beginDate: customBeginDate, endDate: getEndOfTheDay(customEndDate).getTime() };
        },
        getDateString: (beginDate, endDate) => formatDateTime(beginDate, 'yyyy.MM.dd') + '  -  ' + formatDateTime(endDate, 'yyyy.MM.dd')
    }
];
export default class DateSelectComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__endDate = new SynchedPropertySimpleTwoWayPU(params.endDate, this, "endDate");
        this.__beginDate = new SynchedPropertySimpleTwoWayPU(params.beginDate, this, "beginDate");
        this.__selectedIndex = new ObservedPropertySimplePU(0, this, "selectedIndex");
        this.dateSelectDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new DateSelectDialog(this, {
                    beginDate: this.beginDate,
                    endDate: this.endDate,
                    selectedIndex: this.selectedIndex,
                    onConfirm: (beginDate, endDate, selectedIndex) => {
                        this.beginDate = beginDate;
                        this.endDate = endDate;
                        this.selectedIndex = selectedIndex;
                    }
                });
                jsDialog.setController(this.dateSelectDialog);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.dateSelectDialog !== undefined) {
            this.dateSelectDialog = params.dateSelectDialog;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__endDate.purgeDependencyOnElmtId(rmElmtId);
        this.__beginDate.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__endDate.aboutToBeDeleted();
        this.__beginDate.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue) {
        this.__selectedIndex.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (dateSelectOptions[this.selectedIndex].canSwitch) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create('<');
                        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Text.onClick(() => {
                            const dateRange = dateSelectOptions[this.selectedIndex].switch(this.beginDate, false);
                            this.beginDate = dateRange.beginDate;
                            this.endDate = dateRange.endDate;
                        });
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
                        Text.create('');
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(dateSelectOptions[this.selectedIndex].getDateString(this.beginDate, this.endDate));
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.onClick(() => this.dateSelectDialog.open());
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (dateSelectOptions[this.selectedIndex].canSwitch && !isSameDay(this.endDate, Date.now())) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Text.create('>');
                        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Text.onClick(() => {
                            const dateRange = dateSelectOptions[this.selectedIndex].switch(this.beginDate, true);
                            this.beginDate = dateRange.beginDate;
                            if (dateRange.endDate > Date.now()) {
                                this.endDate = getEndOfTheDay(Date.now()).getTime();
                            }
                            else
                                this.endDate = dateRange.endDate;
                        });
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
                        Text.create('');
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class DateSelectDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__beginDate = new SynchedPropertySimpleOneWayPU(params.beginDate, this, "beginDate");
        this.__endDate = new SynchedPropertySimpleOneWayPU(params.endDate, this, "endDate");
        this.__selectedIndex = new SynchedPropertySimpleOneWayPU(params.selectedIndex, this, "selectedIndex");
        this.controller = undefined;
        this.onConfirm = undefined;
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onConfirm !== undefined) {
            this.onConfirm = params.onConfirm;
        }
    }
    updateStateVars(params) {
        this.__beginDate.reset(params.beginDate);
        this.__endDate.reset(params.endDate);
        this.__selectedIndex.reset(params.selectedIndex);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__beginDate.purgeDependencyOnElmtId(rmElmtId);
        this.__endDate.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__beginDate.aboutToBeDeleted();
        this.__endDate.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get beginDate() {
        return this.__beginDate.get();
    }
    set beginDate(newValue) {
        this.__beginDate.set(newValue);
    }
    get endDate() {
        return this.__endDate.get();
    }
    set endDate(newValue) {
        this.__endDate.set(newValue);
    }
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue) {
        this.__selectedIndex.set(newValue);
    }
    setController(ctr) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create({ space: CommonConstants.SPACE_M });
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.DIALOG_HEIGHT);
            Column.padding({
                left: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
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
            Image.create({ "id": 0, "type": 30000, params: ['half.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.width({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.height({ "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.onClick(() => {
                var _a;
                (_a = this.controller) === null || _a === void 0 ? void 0 : _a.close();
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(CommonConstants.FULL_WIDTH);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('取消');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.onClick(() => this.controller.close());
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('时间筛选');
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('保存');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor({ "id": 16777241, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.onClick(() => {
                const { beginDate, endDate } = dateSelectOptions[this.selectedIndex].getDateRange(this.beginDate, this.endDate);
                this.onConfirm(beginDate, endDate, this.selectedIndex);
                this.controller.close();
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: CommonConstants.SPACE_S });
            List.divider({ strokeWidth: CommonConstants.DIVIDER_SIZE_S, color: { "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const option = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.height({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        ListItem.onClick(() => this.selectedIndex = index);
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
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(option.name);
                            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (this.selectedIndex === index) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create('✔');
                                        Text.fontColor({ "id": 16777241, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
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
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(option.name);
                            Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (this.selectedIndex === index) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create('✔');
                                        Text.fontColor({ "id": 16777241, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
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
            this.forEachUpdateFunction(elmtId, dateSelectOptions, forEachItemGenFunction, undefined, true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (dateSelectOptions[this.selectedIndex].name === '自定义') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Row.create();
                        Row.height('5%');
                        Row.justifyContent(FlexAlign.SpaceAround);
                        Row.width(CommonConstants.FULL_WIDTH);
                        if (!isInitialRender) {
                            Row.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithLabel(formatDateTime(this.beginDate, 'yyyy.MM.dd') + '  ▼');
                        Button.onClick(() => {
                            DatePickerDialog.show({
                                end: new Date(this.endDate),
                                selected: new Date(this.beginDate),
                                onAccept: (value) => {
                                    this.beginDate = new Date(value.year, value.month, value.day).getTime();
                                }
                            });
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
                        Text.create('至');
                        Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        if (!isInitialRender) {
                            Text.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Text.pop();
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithLabel(formatDateTime(this.endDate, 'yyyy.MM.dd') + '  ▼');
                        Button.onClick(() => {
                            DatePickerDialog.show({
                                start: new Date(this.beginDate),
                                selected: new Date(this.endDate),
                                onAccept: (value) => {
                                    this.endDate = new Date(value.year, value.month, value.day).getTime();
                                }
                            });
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
                    Row.pop();
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=DateSelectComponent.js.map