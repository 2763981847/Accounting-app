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
import AccountTable from '@bundle:com.example.rdb/entry/ets/common/database/tables/AccountTable';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import { DialogComponent } from '@bundle:com.example.rdb/entry/ets/view/DialogComponent';
import { ImageList } from '@bundle:com.example.rdb/entry/ets/viewmodel/AccountList';
import Logger from '@bundle:com.example.rdb/entry/ets/common/utils/Logger';
export default class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__accounts = new ObservedPropertyObjectPU([], this, "accounts");
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__isEdit = new ObservedPropertySimplePU(false, this, "isEdit");
        this.__isInsert = new ObservedPropertySimplePU(false, this, "isInsert");
        this.__newAccount = new ObservedPropertyObjectPU({ id: 0, accountType: 0, typeText: '', amount: 0 }, this, "newAccount");
        this.__index = new ObservedPropertySimplePU(-1, this, "index");
        this.AccountTable = new AccountTable(() => {
        });
        this.deleteList = [];
        this.searchController = new SearchController();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new DialogComponent(this, {
                    isInsert: this.__isInsert,
                    newAccount: this.__newAccount,
                    confirm: (isInsert, newAccount) => this.accept(isInsert, newAccount)
                });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
            },
            customStyle: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.accounts !== undefined) {
            this.accounts = params.accounts;
        }
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEdit !== undefined) {
            this.isEdit = params.isEdit;
        }
        if (params.isInsert !== undefined) {
            this.isInsert = params.isInsert;
        }
        if (params.newAccount !== undefined) {
            this.newAccount = params.newAccount;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.AccountTable !== undefined) {
            this.AccountTable = params.AccountTable;
        }
        if (params.deleteList !== undefined) {
            this.deleteList = params.deleteList;
        }
        if (params.searchController !== undefined) {
            this.searchController = params.searchController;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__accounts.purgeDependencyOnElmtId(rmElmtId);
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__isEdit.purgeDependencyOnElmtId(rmElmtId);
        this.__isInsert.purgeDependencyOnElmtId(rmElmtId);
        this.__newAccount.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__accounts.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        this.__isEdit.aboutToBeDeleted();
        this.__isInsert.aboutToBeDeleted();
        this.__newAccount.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get accounts() {
        return this.__accounts.get();
    }
    set accounts(newValue) {
        this.__accounts.set(newValue);
    }
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue) {
        this.__searchText.set(newValue);
    }
    get isEdit() {
        return this.__isEdit.get();
    }
    set isEdit(newValue) {
        this.__isEdit.set(newValue);
    }
    get isInsert() {
        return this.__isInsert.get();
    }
    set isInsert(newValue) {
        this.__isInsert.set(newValue);
    }
    get newAccount() {
        return this.__newAccount.get();
    }
    set newAccount(newValue) {
        this.__newAccount.set(newValue);
    }
    get index() {
        return this.__index.get();
    }
    set index(newValue) {
        this.__index.set(newValue);
    }
    accept(isInsert, newAccount) {
        if (isInsert) {
            Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
            this.AccountTable.insertData(newAccount, (id) => {
                newAccount.id = id;
                this.accounts.push(newAccount);
            });
        }
        else {
            this.AccountTable.updateData(newAccount, () => {
            });
            let list = this.accounts;
            this.accounts = [];
            list[this.index] = newAccount;
            this.accounts = list;
            this.index = -1;
        }
    }
    aboutToAppear() {
        this.AccountTable.getRdbStore(() => {
            this.AccountTable.query(0, (result) => {
                this.accounts = result;
            }, true);
        });
    }
    selectListItem(item) {
        this.isInsert = false;
        this.index = this.accounts.indexOf(item);
        this.newAccount = {
            id: item.id,
            accountType: item.accountType,
            typeText: item.typeText,
            amount: item.amount
        };
    }
    deleteListItem() {
        for (let i = 0; i < this.deleteList.length; i++) {
            let index = this.accounts.indexOf(this.deleteList[i]);
            this.accounts.splice(index, 1);
            this.AccountTable.deleteData(this.deleteList[i], () => {
            });
        }
        this.deleteList = [];
        this.isEdit = false;
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Stack.create();
            Stack.debugLine("pages/MainPage.ets(95:5)");
            Stack.width(CommonConstants.FULL_WIDTH);
            Stack.height(CommonConstants.FULL_HEIGHT);
            Stack.backgroundColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            if (!isInitialRender) {
                Stack.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/MainPage.ets(96:7)");
            Column.width(CommonConstants.FULL_WIDTH);
            Column.height(CommonConstants.FULL_HEIGHT);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(97:9)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777251, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.debugLine("pages/MainPage.ets(98:11)");
            Text.height({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.fontSize({ "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Text.margin({ left: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 0, "type": 30000, params: ['ic_public_edit.svg'], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.debugLine("pages/MainPage.ets(103:11)");
            Image.width({ "id": 16777244, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Image.aspectRatio(CommonConstants.FULL_SIZE);
            Image.margin({ right: { "id": 16777256, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Image.onClick(() => {
                this.isEdit = true;
            });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(115:9)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.padding({ left: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Row.margin({ top: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, bottom: { "id": 16777254, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Search.create({
                value: this.searchText,
                placeholder: CommonConstants.SEARCH_TEXT,
                controller: this.searchController
            });
            Search.debugLine("pages/MainPage.ets(116:11)");
            Search.width(CommonConstants.FULL_WIDTH);
            Search.borderRadius({ "id": 16777263, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.borderWidth({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.borderColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            Search.placeholderFont({ size: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Search.textFont({ size: { "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Search.backgroundColor(Color.White);
            Search.onChange((searchValue) => {
                this.searchText = searchValue;
            });
            Search.onSubmit((searchValue) => {
                if (searchValue === '') {
                    this.AccountTable.query(0, (result) => {
                        this.accounts = result;
                    }, true);
                }
                else {
                    this.AccountTable.query(Number(searchValue), (result) => {
                        this.accounts = result;
                    }, false);
                }
            });
            if (!isInitialRender) {
                Search.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Search.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/MainPage.ets(147:9)");
            Row.width(CommonConstants.FULL_WIDTH);
            Row.padding({ left: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            Row.margin({ top: { "id": 16777255, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create({ space: CommonConstants.FULL_SIZE });
            List.debugLine("pages/MainPage.ets(148:11)");
            List.width(CommonConstants.FULL_WIDTH);
            List.borderRadius({ "id": 16777262, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
            List.backgroundColor(Color.White);
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.width(CommonConstants.FULL_WIDTH);
                        ListItem.height({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        ListItem.onClick(() => {
                            this.selectListItem(item);
                            this.dialogController.open();
                        });
                        ListItem.debugLine("pages/MainPage.ets(150:15)");
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
                            Row.debugLine("pages/MainPage.ets(151:17)");
                            Row.width(CommonConstants.FULL_WIDTH);
                            Row.padding({ left: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(ImageList[item.typeText]);
                            Image.debugLine("pages/MainPage.ets(152:19)");
                            Image.width({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            Image.margin({ right: { "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.debugLine("pages/MainPage.ets(157:19)");
                            Text.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Blank.create();
                            Blank.debugLine("pages/MainPage.ets(161:19)");
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (!this.isEdit) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                                        Text.debugLine("pages/MainPage.ets(165:21)");
                                        Text.fontSize({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.fontColor(item.accountType === 0 ? { "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.align(Alignment.End);
                                        Text.flexGrow(CommonConstants.FULL_SIZE);
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
                                        Row.create();
                                        Row.debugLine("pages/MainPage.ets(171:21)");
                                        Row.align(Alignment.End);
                                        Row.flexGrow(CommonConstants.FULL_SIZE);
                                        Row.justifyContent(FlexAlign.End);
                                        if (!isInitialRender) {
                                            Row.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Toggle.create({ type: ToggleType.Checkbox });
                                        Toggle.debugLine("pages/MainPage.ets(172:23)");
                                        Toggle.onChange((isOn) => {
                                            if (isOn) {
                                                this.deleteList.push(item);
                                            }
                                            else {
                                                let index = this.deleteList.indexOf(item);
                                                this.deleteList.splice(index, 1);
                                            }
                                        });
                                        if (!isInitialRender) {
                                            Toggle.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Toggle.pop();
                                    Row.pop();
                                });
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
                            Row.debugLine("pages/MainPage.ets(151:17)");
                            Row.width(CommonConstants.FULL_WIDTH);
                            Row.padding({ left: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, right: { "id": 16777250, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Row.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(ImageList[item.typeText]);
                            Image.debugLine("pages/MainPage.ets(152:19)");
                            Image.width({ "id": 16777242, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Image.aspectRatio(CommonConstants.FULL_SIZE);
                            Image.margin({ right: { "id": 16777252, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } });
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Text.create(item.typeText);
                            Text.debugLine("pages/MainPage.ets(157:19)");
                            Text.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            Text.fontSize({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                            if (!isInitialRender) {
                                Text.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Text.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Blank.create();
                            Blank.debugLine("pages/MainPage.ets(161:19)");
                            Blank.layoutWeight(1);
                            if (!isInitialRender) {
                                Blank.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        Blank.pop();
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (!this.isEdit) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create(item.accountType === 0 ? '-' + item.amount.toString() : '+' + item.amount.toString());
                                        Text.debugLine("pages/MainPage.ets(165:21)");
                                        Text.fontSize({ "id": 16777257, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.fontColor(item.accountType === 0 ? { "id": 16777233, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" } : { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                                        Text.align(Alignment.End);
                                        Text.flexGrow(CommonConstants.FULL_SIZE);
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
                                        Row.create();
                                        Row.debugLine("pages/MainPage.ets(171:21)");
                                        Row.align(Alignment.End);
                                        Row.flexGrow(CommonConstants.FULL_SIZE);
                                        Row.justifyContent(FlexAlign.End);
                                        if (!isInitialRender) {
                                            Row.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Toggle.create({ type: ToggleType.Checkbox });
                                        Toggle.debugLine("pages/MainPage.ets(172:23)");
                                        Toggle.onChange((isOn) => {
                                            if (isOn) {
                                                this.deleteList.push(item);
                                            }
                                            else {
                                                let index = this.deleteList.indexOf(item);
                                                this.deleteList.splice(index, 1);
                                            }
                                        });
                                        if (!isInitialRender) {
                                            Toggle.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Toggle.pop();
                                    Row.pop();
                                });
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
            this.forEachUpdateFunction(elmtId, this.accounts, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (!this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.debugLine("pages/MainPage.ets(212:9)");
                        Button.width({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.position({ x: CommonConstants.EDIT_POSITION_X, y: CommonConstants.EDIT_POSITION_Y });
                        Button.onClick(() => {
                            this.isInsert = true;
                            this.newAccount = { id: 0, accountType: 0, typeText: '', amount: 0 };
                            this.dialogController.open();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['add.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Image.debugLine("pages/MainPage.ets(213:11)");
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
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
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.isEdit) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Button.createWithChild();
                        Button.debugLine("pages/MainPage.ets(226:9)");
                        Button.width({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.height({ "id": 16777243, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777230, "type": 10001, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Button.markAnchor({ x: { "id": 16777261, "type": 10002, params: [], "bundleName": "com.example.rdb", "moduleName": "entry" }, y: CommonConstants.MINIMUM_SIZE });
                        Button.position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y });
                        Button.onClick(() => {
                            this.deleteListItem();
                        });
                        if (!isInitialRender) {
                            Button.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 0, "type": 30000, params: ['delete.png'], "bundleName": "com.example.rdb", "moduleName": "entry" });
                        Image.debugLine("pages/MainPage.ets(227:11)");
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    Button.pop();
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
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new MainPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=MainPage.js.map