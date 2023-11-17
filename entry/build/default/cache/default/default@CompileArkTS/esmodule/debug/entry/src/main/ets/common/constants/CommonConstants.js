// 导入关系型存储库
import relationalStore from '@ohos:data.relationalStore';
// 导出一个名为 CommonConstants 的类，用于存储记账应用中的常量信息
export default class CommonConstants {
}
/**
 * Rdb 数据库配置。
 */
CommonConstants.STORE_CONFIG = {
    name: 'database.db',
    securityLevel: relationalStore.SecurityLevel.S1
};
/**
 * 账户表配置。
 */
CommonConstants.ACCOUNT_TABLE = {
    tableName: 'accountTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS accountTable(id INTEGER PRIMARY KEY AUTOINCREMENT, accountType INTEGER, ' +
        'typeText TEXT, amount INTEGER ,date bigint , desc TEXT)',
    columns: ['id', 'accountType', 'typeText', 'amount', 'date', 'desc']
};
/**
 * 搜索组件的搜索文本。
 */
CommonConstants.SEARCH_TEXT = '搜索';
/**
 * 提示组件的提示文本。
 */
CommonConstants.TOAST_TEXT_1 = '账目类型不能为空';
CommonConstants.TOAST_TEXT_2 = '账目金额不为正整数';
/**
 * 组件大小。
 */
CommonConstants.FULL_WIDTH = '100%';
CommonConstants.EIGHTY_PERCENT = '80%';
CommonConstants.HALF_WIDTH = '50%';
CommonConstants.FULL_HEIGHT = '100%';
CommonConstants.HALF_HEIGHT = '50%';
CommonConstants.DIALOG_HEIGHT = '75%';
CommonConstants.TABS_HEIGHT = '45%';
CommonConstants.MINIMUM_SIZE = 0;
CommonConstants.FULL_SIZE = 1;
CommonConstants.PROMPT_BOTTOM = '70vp';
CommonConstants.BAR_HEIGHT = 60;
CommonConstants.ADD_SIZE = 50;
CommonConstants.DIVIDER_SIZE_M = 2;
CommonConstants.DIVIDER_SIZE_S = 1;
CommonConstants.CARD_ASPECT_RATIO = 2;
/**
 * 组件位置。
 */
CommonConstants.EDIT_POSITION_X = '80%';
CommonConstants.EDIT_POSITION_Y = '90%';
CommonConstants.DELETE_POSITION_X = '50%';
CommonConstants.DELETE_POSITION_Y = '90%';
/**
 * 日志标签。
 */
CommonConstants.RDB_TAG = '[Debug.Rdb]';
CommonConstants.TABLE_TAG = '[Debug.AccountTable]';
CommonConstants.INDEX_TAG = '[Debug.Index]';
/**
 * 距离。
 */
CommonConstants.SPACE_M = 20;
CommonConstants.SPACE_S = 10;
/**
 * 日期。
 */
CommonConstants.MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
CommonConstants.MILLISECONDS_IN_WEEK = 24 * 60 * 60 * 1000 * 7;
//# sourceMappingURL=CommonConstants.js.map