// 导入关系型存储库
import relationalStore from '@ohos.data.relationalStore';

// 导入账户表类型
import { AccountTable } from '../../types';

// 导出一个名为 CommonConstants 的类，用于存储记账应用中的常量信息
export default class CommonConstants {
  /**
   * Rdb 数据库配置。
   */
  static readonly STORE_CONFIG: relationalStore.StoreConfig = {
    name: 'database.db',
    securityLevel: relationalStore.SecurityLevel.S1
  };

  /**
   * 账户表配置。
   */
  static readonly ACCOUNT_TABLE: AccountTable = {
    tableName: 'accountTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS accountTable(id INTEGER PRIMARY KEY AUTOINCREMENT, accountType INTEGER, ' +
    'typeText TEXT, amount INTEGER ,date bigint , desc TEXT)',
    columns: ['id', 'accountType', 'typeText', 'amount', 'date', 'desc']
  };

  /**
   * 搜索组件的搜索文本。
   */
  static readonly SEARCH_TEXT = '搜索';

  /**
   * 提示组件的提示文本。
   */
  static readonly TOAST_TEXT_1 = '账目类型不能为空';
  static readonly TOAST_TEXT_2 = '账目金额不为正整数';

  /**
   * 组件大小。
   */
  static readonly FULL_WIDTH = '100%';
  static readonly EIGHTY_PERCENT = '80%';
  static readonly HALF_WIDTH = '50%';
  static readonly FULL_HEIGHT = '100%';
  static readonly HALF_HEIGHT = '50%';
  static readonly DIALOG_HEIGHT = '75%';
  static readonly TABS_HEIGHT = '45%';
  static readonly MINIMUM_SIZE = 0;
  static readonly FULL_SIZE = 1;
  static readonly PROMPT_BOTTOM = '70vp';
  static readonly BAR_HEIGHT = 60;
  static readonly ADD_SIZE = 50;
  static readonly DIVIDER_SIZE_M = 2;
  static readonly DIVIDER_SIZE_S = 1;
  static readonly CARD_ASPECT_RATIO = 2;

  /**
   * 组件位置。
   */
  static readonly EDIT_POSITION_X = '80%';
  static readonly EDIT_POSITION_Y = '90%';
  static readonly DELETE_POSITION_X = '50%';
  static readonly DELETE_POSITION_Y = '90%';

  /**
   * 日志标签。
   */
  static readonly RDB_TAG = '[Debug.Rdb]';
  static readonly TABLE_TAG = '[Debug.AccountTable]';
  static readonly INDEX_TAG = '[Debug.Index]';

  /**
   * 距离。
   */
  static readonly SPACE_M = 20;
  static readonly SPACE_S = 10;

  /**
   * 日期。
   */
  static readonly MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
  static readonly MILLISECONDS_IN_WEEK = 24 * 60 * 60 * 1000 * 7;
}
