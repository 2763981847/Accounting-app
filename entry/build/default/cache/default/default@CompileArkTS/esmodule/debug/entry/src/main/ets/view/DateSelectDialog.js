import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { formatDateTime, getEndOfTheDay, getFirstDateOfThisMonth, getFirstDateOfThisYear, getMondayOfWeek } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
export default class DateSelectDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__beginDate = new SynchedPropertySimpleOneWayPU(params.beginDate, this, "beginDate");
        this.__endDate = new SynchedPropertySimpleOneWayPU(params.endDate, this, "endDate");
        this.__selectedIndex = new ObservedPropertySimplePU(0, this, "selectedIndex");
        this.controller = undefined;
        this.onConfirm = undefined;
        this.options = [{
                name: '本周',
                action: () => {
                    const now = Date.now();
                    this.onConfirm(getMondayOfWeek(now).getTime(), getEndOfTheDay(now).getTime());
                }
            },
            {
                name: '本月',
                action: () => {
                    const now = Date.now();
                    this.onConfirm(getFirstDateOfThisMonth(now).getTime(), getEndOfTheDay(now).getTime());
                }
            },
            {
                name: '本年',
                action: () => {
                    const now = Date.now();
                    this.onConfirm(getFirstDateOfThisYear(now).getTime(), getEndOfTheDay(now).getTime());
                }
            },
            {
                name: '自定义',
                action: () => {
                    this.onConfirm(this.beginDate, getEndOfTheDay(this.endDate).getTime());
                }
            },];
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onConfirm !== undefined) {
            this.onConfirm = params.onConfirm;
        }
        if (params.options !== undefined) {
            this.options = params.options;
        }
    }
    updateStateVars(params) {
        this.__beginDate.reset(params.beginDate);
        this.__endDate.reset(params.endDate);
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
            Column.create();
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.DIALOG_HEIGHT);
            Column.padding({
                top: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                left: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
                right: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }
            });
            Column.borderRadius({ topLeft: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, topRight: { "id": 16777259, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Column.backgroundColor(Color.White);
            Column.align(Alignment.BottomEnd);
            if (!isInitialRender) {
                Column.pop();
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
            Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.onClick(() => this.controller.close());
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('统计时间');
            Text.fontSize({ "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
            Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.onClick(() => {
                this.options[this.selectedIndex].action();
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
            List.divider({ strokeWidth: CommonConstants.DIVIDER_SIZE_S, color: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
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
                        ListItem.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                        Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                            Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                        Text.fontColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.fontSize({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
            this.forEachUpdateFunction(elmtId, this.options, forEachItemGenFunction, undefined, true, false);
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
            if (this.options[this.selectedIndex].name === '自定义') {
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
                        Button.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                        Text.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
                                end: new Date(),
                                selected: new Date(this.endDate),
                                onAccept: (value) => {
                                    this.endDate = new Date(value.year, value.month, value.day).getTime();
                                }
                            });
                        });
                        Button.fontColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.fontSize({ "id": 16777260, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
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
//# sourceMappingURL=DateSelectDialog.js.map