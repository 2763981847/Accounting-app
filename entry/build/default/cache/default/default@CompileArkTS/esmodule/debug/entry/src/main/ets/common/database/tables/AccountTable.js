/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import relationalStore from '@ohos:data.relationalStore';
import Account from '@bundle:com.example.rdb/entry/ets/common/beans/Account';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import Rdb from '@bundle:com.example.rdb/entry/ets/common/database/Rdb';
export default class AccountTable {
    constructor(callback = () => {
    }) {
        this.accountTable = new Rdb(CommonConstants.ACCOUNT_TABLE.tableName, CommonConstants.ACCOUNT_TABLE.sqlCreate, CommonConstants.ACCOUNT_TABLE.columns);
        this.accountTable.getRdbStore(callback);
    }
    getRdbStore(callback = () => {
    }) {
        this.accountTable.getRdbStore(callback);
    }
    insertData(account, callback) {
        const valueBucket = generateBucket(account);
        this.accountTable.insertData(valueBucket, callback);
    }
    batchInsert(accounts, callback) {
        const valueBuckets = accounts.map((account) => generateBucket(account));
        this.accountTable.batchInsert(valueBuckets, callback);
    }
    batchDelete(accounts, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.in('id', accounts.map((account) => account.id));
        this.accountTable.deleteData(predicates, callback);
    }
    deleteData(account, callback) {
        this.batchDelete([account], callback);
    }
    updateData(account, callback) {
        const valueBucket = generateBucket(account);
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('id', account.id);
        this.accountTable.updateData(predicates, valueBucket, callback);
    }
    query(callback, predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName)) {
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = new Account();
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.accountType = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    tmp.typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
                    tmp.amount = resultSet.getDouble(resultSet.getColumnIndex('amount'));
                    tmp.date = new Date(resultSet.getLong(resultSet.getColumnIndex('date')));
                    tmp.desc = resultSet.getString(resultSet.getColumnIndex('desc'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                callback(result);
            }
        });
    }
}
function generateBucket(account) {
    let obj = {};
    obj.accountType = account.accountType;
    obj.typeText = account.typeText;
    obj.amount = account.amount;
    obj.date = account.date.getTime();
    obj.desc = account.desc;
    return obj;
}
//# sourceMappingURL=AccountTable.js.map