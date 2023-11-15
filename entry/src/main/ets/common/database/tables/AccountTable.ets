// 导入 '@ohos.data.relationalStore' 模块
import relationalStore from '@ohos.data.relationalStore';

// 导入相关的类和常量
import Account from '../../beans/Account';
import CommonConstants from '../../constants/CommonConstants';
import Rdb from '../Rdb';

// 定义一个类 AccountTable，用于操作记账数据的数据库表
export default class AccountTable {
  // 创建一个 Rdb 对象，用于处理数据库表的操作
  private accountTable = new Rdb(
    CommonConstants.ACCOUNT_TABLE.tableName,
    CommonConstants.ACCOUNT_TABLE.sqlCreate,
    CommonConstants.ACCOUNT_TABLE.columns
  );

  // 类构造函数，用于初始化数据库表
  constructor(callback: Function = () => {
  }) {
    // 获取数据库表的 RdbStore 对象，并调用回调函数
    this.accountTable.getRdbStore(callback);
  }

  // 获取数据库表的 RdbStore 对象，并调用回调函数
  getRdbStore(callback: Function = () => {
  }) {
    this.accountTable.getRdbStore(callback);
  }

  // 插入一条账目数据
  insertData(account: Account, callback: Function) {
    // 生成值桶（ValuesBucket），包含要插入的数据
    const valueBucket: relationalStore.ValuesBucket = generateBucket(account);
    // 调用 Rdb 对象的插入数据方法，并传入回调函数
    this.accountTable.insertData(valueBucket, callback);
  }

  // 批量插入账目数据
  batchInsert(accounts: Account[], callback: Function) {
    // 将账户数据转换为值桶数组
    const valueBuckets: relationalStore.ValuesBucket[] = accounts.map((account) => generateBucket(account));
    // 调用 Rdb 对象的批量插入数据方法，并传入回调函数
    this.accountTable.batchInsert(valueBuckets, callback)
  }

  // 批量删除账目数据
  batchDelete(accounts: Account[], callback: Function) {
    // 创建 RdbPredicates 对象，用于指定删除条件
    let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
    // 设置删除条件为账目ID在给定账目数组中
    predicates.in('id', accounts.map((account) => account.id));
    // 调用 Rdb 对象的删除数据方法，并传入回调函数
    this.accountTable.deleteData(predicates, callback);
  }

  // 删除单条账目数据
  deleteData(account: Account, callback: Function) {
    // 调用批量删除方法，传入包含单条账目数据的数组
    this.batchDelete([account], callback)
  }

  // 更新账目数据
  updateData(account: Account, callback: Function) {
    // 生成值桶，包含要更新的数据
    const valueBucket: relationalStore.ValuesBucket = generateBucket(account);
    // 创建 RdbPredicates 对象，指定更新条件为账目ID匹配
    let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
    predicates.equalTo('id', account.id);
    // 调用 Rdb 对象的更新数据方法，并传入回调函数
    this.accountTable.updateData(predicates, valueBucket, callback);
  }

  // 查询数据库表数据
  query(callback: Function, predicates: relationalStore.RdbPredicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName)) {
    // 调用 Rdb 对象的查询方法，传入查询条件和回调函数
    this.accountTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
      // 获取查询结果的行数
      let count: number = resultSet.rowCount;
      // 如果查询结果为空，则输出提示信息，并调用回调函数传入空数组
      if (count === 0 || typeof count === 'string') {
        console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
        callback([]);
      } else {
        // 如果有查询结果，遍历结果集，将数据转换为 Account 对象数组
        resultSet.goToFirstRow();
        const result: Account[] = [];
        for (let i = 0; i < count; i++) {
          let tmp: Account = new Account()
          tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
          tmp.accountType = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
          tmp.typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
          tmp.amount = resultSet.getDouble(resultSet.getColumnIndex('amount'));
          tmp.date = new Date(resultSet.getLong(resultSet.getColumnIndex('date')))
          tmp.desc = resultSet.getString(resultSet.getColumnIndex('desc'));
          result[i] = tmp;
          resultSet.goToNextRow();
        }
        // 调用回调函数，传入查询结果数组
        callback(result);
      }
    });
  }
}

// 辅助函数，用于生成值桶对象，将 Account 对象转换为数据库可存储的格式
function generateBucket(account: Account): relationalStore.ValuesBucket {
  let obj: relationalStore.ValuesBucket = {};
  obj.accountType = account.accountType;
  obj.typeText = account.typeText;
  obj.amount = account.amount;
  obj.date = account.date.getTime()
  obj.desc = account.desc
  return obj;
}
