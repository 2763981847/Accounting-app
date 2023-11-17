// 引入常量、日期格式化、统计等工具
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { formatDateTime } from '@bundle:com.example.rdb/entry/ets/common/utils/DateUtils';
import { totalAmount } from '@bundle:com.example.rdb/entry/ets/common/utils/StatisticalUtils';
// 定义一个构建器函数，用于生成分组表头
export default function groupHeader(accounts, parent = null) {
    (parent ? parent : this).observeComponentCreation((elmtId, isInitialRender) => {
        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
        // 创建横向布局
        Row.create();
        // 创建横向布局
        Row.justifyContent(FlexAlign.SpaceBetween);
        // 创建横向布局
        Row.width(CommonConstants.FULL_WIDTH);
        // 创建横向布局
        Row.margin({
            top: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
            bottom: { "id": 16777253, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } // 设置下边距
        });
        // 创建横向布局
        Row.padding({
            left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" },
            right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } // 设置右内边距
        });
        if (!isInitialRender) {
            // 创建横向布局
            Row.pop();
        }
        ViewStackProcessor.StopGetAccessRecording();
    });
    (parent ? parent : this).observeComponentCreation((elmtId, isInitialRender) => {
        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
        // 显示日期信息
        Text.create(formatDateTime(accounts[0].date, 'yyyy.MM.dd'));
        // 显示日期信息
        Text.fontColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        // 显示日期信息
        Text.fontSize({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        if (!isInitialRender) {
            // 显示日期信息
            Text.pop();
        }
        ViewStackProcessor.StopGetAccessRecording();
    });
    // 显示日期信息
    Text.pop();
    (parent ? parent : this).observeComponentCreation((elmtId, isInitialRender) => {
        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
        // 创建横向布局，用于显示支出、收入、结余的统计信息
        Row.create();
        // 创建横向布局，用于显示支出、收入、结余的统计信息
        Row.justifyContent(FlexAlign.SpaceAround);
        // 创建横向布局，用于显示支出、收入、结余的统计信息
        Row.width('35%');
        if (!isInitialRender) {
            // 创建横向布局，用于显示支出、收入、结余的统计信息
            Row.pop();
        }
        ViewStackProcessor.StopGetAccessRecording();
    });
    (parent ? parent : this).observeComponentCreation((elmtId, isInitialRender) => {
        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
        // 显示支出总额
        Text.create('支 ' + totalAmount(accounts, 0));
        // 显示支出总额
        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        // 显示支出总额
        Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        if (!isInitialRender) {
            // 显示支出总额
            Text.pop();
        }
        ViewStackProcessor.StopGetAccessRecording();
    });
    // 显示支出总额
    Text.pop();
    (parent ? parent : this).observeComponentCreation((elmtId, isInitialRender) => {
        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
        // 显示收入总额
        Text.create('收 ' + totalAmount(accounts, 1));
        // 显示收入总额
        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        // 显示收入总额
        Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        if (!isInitialRender) {
            // 显示收入总额
            Text.pop();
        }
        ViewStackProcessor.StopGetAccessRecording();
    });
    // 显示收入总额
    Text.pop();
    (parent ? parent : this).observeComponentCreation((elmtId, isInitialRender) => {
        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
        // 显示结余信息（收入总额 - 支出总额）
        Text.create('结余 ' + (totalAmount(accounts, 1) - totalAmount(accounts, 0)));
        // 显示结余信息（收入总额 - 支出总额）
        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        // 显示结余信息（收入总额 - 支出总额）
        Text.fontSize({ "id": 16777265, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
        if (!isInitialRender) {
            // 显示结余信息（收入总额 - 支出总额）
            Text.pop();
        }
        ViewStackProcessor.StopGetAccessRecording();
    });
    // 显示结余信息（收入总额 - 支出总额）
    Text.pop();
    // 创建横向布局，用于显示支出、收入、结余的统计信息
    Row.pop();
    // 创建横向布局
    Row.pop();
}
//# sourceMappingURL=GroupHeaderBuilder.js.map