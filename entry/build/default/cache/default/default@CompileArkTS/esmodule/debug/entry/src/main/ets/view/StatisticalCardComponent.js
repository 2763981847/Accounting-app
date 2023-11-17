// 引入常量和统计工具
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { dayStatistics, monthStatistics } from '@bundle:com.example.rdb/entry/ets/common/utils/StatisticalUtils';
export default class StatisticalCardComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__accounts = new SynchedPropertyObjectTwoWayPU(params.accounts, this, "accounts");
        this.__dayPay = new ObservedPropertySimplePU(dayStatistics(this.accounts, 0), this, "dayPay");
        this.__dayEarn = new ObservedPropertySimplePU(dayStatistics(this.accounts, 1), this, "dayEarn");
        this.__monthPay = new ObservedPropertySimplePU(monthStatistics(this.accounts, 0), this, "monthPay");
        this.__monthEarn = new ObservedPropertySimplePU(monthStatistics(this.accounts, 1), this, "monthEarn");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("accounts", this.onAccountsChange);
    }
    setInitiallyProvidedValue(params) {
        if (params.dayPay !== undefined) {
            this.dayPay = params.dayPay;
        }
        if (params.dayEarn !== undefined) {
            this.dayEarn = params.dayEarn;
        }
        if (params.monthPay !== undefined) {
            this.monthPay = params.monthPay;
        }
        if (params.monthEarn !== undefined) {
            this.monthEarn = params.monthEarn;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__dayPay.purgeDependencyOnElmtId(rmElmtId);
        this.__dayEarn.purgeDependencyOnElmtId(rmElmtId);
        this.__monthPay.purgeDependencyOnElmtId(rmElmtId);
        this.__monthEarn.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__accounts.aboutToBeDeleted();
        this.__dayPay.aboutToBeDeleted();
        this.__dayEarn.aboutToBeDeleted();
        this.__monthPay.aboutToBeDeleted();
        this.__monthEarn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get dayPay() {
        return this.__dayPay.get();
    }
    set dayPay(newValue) {
        this.__dayPay.set(newValue);
    }
    get dayEarn() {
        return this.__dayEarn.get();
    }
    set dayEarn(newValue) {
        this.__dayEarn.set(newValue);
    }
    get monthPay() {
        return this.__monthPay.get();
    }
    set monthPay(newValue) {
        this.__monthPay.set(newValue);
    }
    get monthEarn() {
        return this.__monthEarn.get();
    }
    set monthEarn(newValue) {
        this.__monthEarn.set(newValue);
    }
    // 监听accounts属性的变化，触发onAccountsChange方法
    onAccountsChange() {
        // 更新状态变量，以反映最新的统计数据
        this.dayPay = dayStatistics(this.accounts, 0);
        this.dayEarn = dayStatistics(this.accounts, 1);
        this.monthPay = monthStatistics(this.accounts, 0);
        this.monthEarn = monthStatistics(this.accounts, 1);
    }
    // 构建组件
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 使用Column布局，嵌套Row布局来展示统计信息
            Column.create();
            // 使用Column布局，嵌套Row布局来展示统计信息
            Column.backgroundImage({ "id": 16777275, "type": 20000, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 使用Column布局，嵌套Row布局来展示统计信息
            Column.backgroundImageSize(ImageSize.Cover);
            // 使用Column布局，嵌套Row布局来展示统计信息
            Column.borderRadius({ "id": 16777270, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            // 使用Column布局，嵌套Row布局来展示统计信息
            Column.width(CommonConstants.FULL_WIDTH);
            // 使用Column布局，嵌套Row布局来展示统计信息
            Column.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                // 使用Column布局，嵌套Row布局来展示统计信息
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 第一行，展示今日支出、收入、结余
            Row.create();
            // 第一行，展示今日支出、收入、结余
            Row.height(CommonConstants.HALF_HEIGHT);
            // 第一行，展示今日支出、收入、结余
            Row.width(CommonConstants.FULL_WIDTH);
            // 第一行，展示今日支出、收入、结余
            Row.justifyContent(FlexAlign.SpaceAround);
            if (!isInitialRender) {
                // 第一行，展示今日支出、收入、结余
                Row.pop();
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
            Text.create('今日支出');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.dayPay.toString());
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
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
            Text.create('今日收入');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.textAlign(TextAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.dayEarn.toString());
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
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
            Text.create('今日结余');
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.textAlign(TextAlign.Start);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create((this.dayEarn - this.dayPay).toString());
            Text.fontSize({ "id": 16777264, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        // 第一行，展示今日支出、收入、结余
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 第二行，展示本月支出、收入、结余
            Row.create();
            // 第二行，展示本月支出、收入、结余
            Row.height(CommonConstants.HALF_HEIGHT);
            // 第二行，展示本月支出、收入、结余
            Row.width(CommonConstants.FULL_WIDTH);
            // 第二行，展示本月支出、收入、结余
            Row.justifyContent(FlexAlign.SpaceAround);
            if (!isInitialRender) {
                // 第二行，展示本月支出、收入、结余
                Row.pop();
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
            Text.create('本月支出');
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.monthPay.toString());
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
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
            Text.create('本月收入');
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.monthEarn.toString());
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
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
            Text.create('本月结余');
            Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create((this.monthEarn - this.monthPay).toString());
            Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        // 第二行，展示本月支出、收入、结余
        Row.pop();
        // 使用Column布局，嵌套Row布局来展示统计信息
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=StatisticalCardComponent.js.map