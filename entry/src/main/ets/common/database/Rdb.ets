// 导入关系型存储库
import relationalStore from '@ohos.data.relationalStore';

// 导入记账应用中的常量信息
import CommonConstants from '../constants/CommonConstants';

// 导入日志工具类
import Logger from '../utils/Logger';

// 导出一个名为 Rdb 的类，用于封装关系型数据库的操作
export default class Rdb {
  private rdbStore: relationalStore.RdbStore | null = null;
  private tableName: string;
  private sqlCreateTable: string;
  private columns: Array<string>;

  /**
   * 构造函数，用于创建 Rdb 类的实例
   * @param tableName - 表名
   * @param sqlCreateTable - 创建表的 SQL 语句
   * @param columns - 表的列名数组
   */
  constructor(tableName: string, sqlCreateTable: string, columns: Array<string>) {
    this.tableName = tableName;
    this.sqlCreateTable = sqlCreateTable;
    this.columns = columns;
  }

  /**
   * 获取关系型数据库存储对象
   * @param callback - 获取成功后的回调函数
   */
  getRdbStore(callback: Function = () => {
  }): void {
    // 如果回调函数未提供，记录警告信息
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'getRdbStore() has no callback!');
      return;
    }

    // 如果 rdbStore 已存在，直接调用回调函数并返回
    if (this.rdbStore !== null) {
      Logger.info(CommonConstants.RDB_TAG, 'The rdbStore exists.');
      callback();
      return;
    }

    // 获取应用上下文
    let context: Context = getContext(this) as Context;

    // 使用关系型存储库的 API 获取 RdbStore
    relationalStore.getRdbStore(context, CommonConstants.STORE_CONFIG, (err, rdb) => {
      if (err) {
        Logger.error(CommonConstants.RDB_TAG, `getRdbStore() failed, err: ${err}`);
        return;
      }
      // 将获取到的 RdbStore 存储在实例变量中
      this.rdbStore = rdb;

      // 执行创建表的 SQL 语句
      this.rdbStore.executeSql(this.sqlCreateTable);

      Logger.info(CommonConstants.RDB_TAG, 'getRdbStore() finished.');
      // 调用回调函数
      callback();
    });
  }

  /**
   * 批量插入数据
   * @param data - 要插入的数据数组
   * @param callback - 插入成功后的回调函数
   */
  batchInsert(data: relationalStore.ValuesBucket[], callback: Function = () => {
  }): void {
    // 如果回调函数未提供，记录警告信息
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'batchInsert() has no callback!');
      return;
    }

    let resFlag: boolean = false;
    const valueBuckets: relationalStore.ValuesBucket[] = data;

    // 如果 rdbStore 存在，使用关系型存储库的 API 进行批量插入
    if (this.rdbStore) {
      this.rdbStore.batchInsert(this.tableName, valueBuckets, (err, ret) => {
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `batchInsert() failed, err: ${err}`);
          callback(resFlag);
          return;
        }
        Logger.info(CommonConstants.RDB_TAG, `batchInsert() finished: ${ret}`);
        callback(ret);
      });
    }
  }

  /**
   * 插入单条数据
   * @param data - 要插入的数据
   * @param callback - 插入成功后的回调函数
   */
  insertData(data: relationalStore.ValuesBucket, callback: Function = () => {
  }): void {
    // 调用批量插入的方法，传入单条数据
    this.batchInsert([data], callback);
  }

  /**
   * 删除数据
   * @param predicates - 删除数据的条件
   * @param callback - 删除成功后的回调函数
   */
  deleteData(predicates: relationalStore.RdbPredicates, callback: Function = () => {
  }): void {
    // 如果回调函数未提供，记录警告信息
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'deleteData() has no callback!');
      return;
    }

    let resFlag: boolean = false;

    // 如果 rdbStore 存在，使用关系型存储库的 API 进行删除
    if (this.rdbStore) {
      this.rdbStore.delete(predicates, (err, ret) => {
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `deleteData() failed, err: ${err}`);
          callback(resFlag);
          return;
        }
        Logger.info(CommonConstants.RDB_TAG, `deleteData() finished: ${ret}`);
        callback(!resFlag);
      });
    }
  }

  /**
   * 更新数据
   * @param predicates - 更新数据的条件
   * @param data - 要更新的数据
   * @param callback - 更新成功后的回调函数
   */
  updateData(predicates: relationalStore.RdbPredicates, data: relationalStore.ValuesBucket, callback: Function = () => {
  }): void {
    // 如果回调函数未提供，记录警告信息
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'updateData() has no callback!');
      return;
    }

    let resFlag: boolean = false;
    const valueBucket: relationalStore.ValuesBucket = data;

    // 如果 rdbStore 存在，使用关系型存储库的 API 进行更新
    if (this.rdbStore) {
      this.rdbStore.update(valueBucket, predicates, (err, ret) => {
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `updateData() failed, err: ${err}`);
          callback(resFlag);
          return;
        }
        Logger.info(CommonConstants.RDB_TAG, `updateData() finished: ${ret}`);
        callback(!resFlag);
      });
    }
  }

  /**
   * 查询数据
   * @param predicates - 查询数据的条件
   * @param callback - 查询成功后的回调函数
   */
  query(predicates: relationalStore.RdbPredicates, callback: Function = () => {
  }): void {
    // 如果回调函数未提供，记录警告信息
    if (!callback || typeof callback === 'undefined' || callback === undefined) {
      Logger.info(CommonConstants.RDB_TAG, 'query() has no callback!');
      return;
    }

    // 如果 rdbStore 存在，使用关系型存储库的 API 进行查询
    if (this.rdbStore) {
      this.rdbStore.query(predicates, this.columns, (err, resultSet) => {
        if (err) {
          Logger.error(CommonConstants.RDB_TAG, `query() failed, err: ${err}`);
          return;
        }
        Logger.info(CommonConstants.RDB_TAG, 'query() finished.');

        // 调用回调函数，并关闭结果集
        callback(resultSet);
        resultSet.close();
      });
    }
  }
}
