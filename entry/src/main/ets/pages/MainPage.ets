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

import AccountTable from '../common/database/tables/AccountTable';
import AccountData from '../viewmodel/AccountData';
import CommonConstants from '../common/constants/CommonConstants';
import { ImageList } from '../viewmodel/AccountList';
import { formatDateTime, isSameDay } from '../common/utils/DateUtils';
import StatisticalCardComponent from '../view/StatisticalCardComponent';
import groupHeader from '../view/GroupHeaderBuilder';
import relationalStore from '@ohos.data.relationalStore';

function getGroupedAccounts(accounts: Array<AccountData>): Array<Array<AccountData>> {
  let groupedAccounts = []
  for (let i = 0;i < accounts.length; i++) {
    const account = accounts[i]
    if (i == 0 || !isSameDay(accounts[i-1].date, account.date)) {
      groupedAccounts.push([])
    }
    groupedAccounts[groupedAccounts.length - 1].push(account)
  }
  return groupedAccounts;
}

@Component
export default struct MainPage {
  @State searchText: string = '';
  @State isEdit: boolean = false;
  @Link @Watch('filterAccounts') accounts: Array<AccountData>
  @State filteredAccounts: Array<AccountData> = []
  @Link isInsert: boolean
  @Link newAccount: AccountData
  @Link index: number
  private dialogController: CustomDialogController
  private accountTable: AccountTable
  private deleteList: Array<AccountData> = [];
  private scroller: Scroller = new Scroller()
  searchController: SearchController = new SearchController();
  onAccountsChange: () => void

  aboutToAppear() {
    this.filterAccounts()
  }

  filterAccounts() {
    let temp = this.accounts
    if (this.searchText && this.searchText != '') {
      temp = temp.filter(account =>
      account.desc.includes(this.searchText) ||
      account.typeText.includes(this.searchText) ||
      account.amount.toString() === this.searchText)
    }
    this.filteredAccounts = temp
  }

  selectListItem(item: AccountData) {
    this.index = this.filteredAccounts.indexOf(item);
    this.newAccount = item
  }

  deleteListItem() {
    for (let i = 0; i < this.deleteList.length; i++) {
      this.accountTable.deleteData(this.deleteList[i], () => {
        this.onAccountsChange()
      });
    }
    this.deleteList = [];
    this.isEdit = false;
  }

  build() {
    Stack() {
      Scroll(this.scroller) {
        Column({ space: CommonConstants.SPACE_M }) {
          Row() {
            Text($r('app.string.MainAbility_label'))
              .height($r('app.float.component_size_SP'))
              .fontSize($r('app.float.font_size_L'))
              .margin({ left: $r('app.float.font_size_L') })

            Image($rawfile('ic_public_edit.svg'))
              .width($r('app.float.component_size_S'))
              .aspectRatio(CommonConstants.FULL_SIZE)
              .margin({ right: $r('app.float.font_size_L') })
              .onClick(() => {
                this.isEdit = !this.isEdit;
              })
          }
          .width(CommonConstants.FULL_WIDTH)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') })

          Row() {
            Search({
              value: this.searchText,
              placeholder: CommonConstants.SEARCH_TEXT,
              controller: this.searchController
            })
              .width(CommonConstants.FULL_WIDTH)
              .borderRadius($r('app.float.radius_size_M'))
              .borderWidth($r('app.float.border_size_S'))
              .borderColor($r('app.color.border_color'))
              .placeholderFont({ size: $r('app.float.font_size_M') })
              .textFont({ size: $r('app.float.font_size_M') })
              .backgroundColor(Color.White)
              .onChange((searchValue: string) => {
                this.searchText = searchValue;
              })
              .onSubmit((searchValue: string) => {
                this.filterAccounts()
              })
          }
          .width(CommonConstants.FULL_WIDTH)
          .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
          .margin({ top: $r('app.float.edge_size_S'), bottom: $r('app.float.edge_size_S') })

          StatisticalCardComponent({ accounts: $accounts })
            .aspectRatio(CommonConstants.CARD_ASPECT_RATIO)
            .width(CommonConstants.FULL_WIDTH)

          List({ space: CommonConstants.SPACE_M }) {
            ForEach(getGroupedAccounts(this.filteredAccounts), (accounts: Array<AccountData>) => {
              ListItemGroup({ header: groupHeader(accounts) }) {
                ForEach(accounts, (account: AccountData) => {
                  ListItem() {
                    Row() {
                      Image(ImageList[account.typeText])
                        .width($r('app.float.component_size_M'))
                        .aspectRatio(CommonConstants.FULL_SIZE)
                        .margin({ right: $r('app.float.edge_size_MP') })
                      Column() {
                        Text(account.typeText)
                          .height($r('app.float.component_size_SM'))
                          .fontSize($r('app.float.font_size_M'))
                        Text(formatDateTime(account.date, 'HH:mm'))
                          .height($r('app.float.component_size_SM'))
                          .fontSize($r('app.float.font_size_S'))
                          .fontColor($r('app.color.gray'))
                      }.alignItems(HorizontalAlign.Start)

                      if (account.desc) {
                        Divider()
                          .vertical(true)
                          .strokeWidth(CommonConstants.DIVIDER_SIZE_M)
                          .color($r('app.color.gray'))
                          .height(CommonConstants.HALF_WIDTH)
                          .align(Alignment.Center)
                          .margin({ left: $r('app.float.edge_size_MP') })
                      }
                      Text(account.desc).height($r('app.float.component_size_SM'))
                        .fontSize($r('app.float.font_size_S'))
                        .fontColor($r('app.color.gray'))
                        .margin({ left: $r('app.float.edge_size_MP') })
                      Blank()
                        .layoutWeight(1)

                      if (!this.isEdit) {
                        Text(account.accountType === 0 ? '-' + account.amount.toString() : '+' + account.amount.toString())
                          .fontSize($r('app.float.font_size_M'))
                          .fontColor(account.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.main_color'))
                          .align(Alignment.End)
                          .flexGrow(CommonConstants.FULL_SIZE)
                      } else {
                        Row() {
                          Toggle({ type: ToggleType.Checkbox })
                            .onChange((isOn) => {
                              if (isOn) {
                                this.deleteList.push(account);
                              } else {
                                let index = this.deleteList.indexOf(account);
                                this.deleteList.splice(index, 1);
                              }
                            })
                        }
                        .align(Alignment.End)
                        .flexGrow(CommonConstants.FULL_SIZE)
                        .justifyContent(FlexAlign.End)
                      }

                    }
                    .width(CommonConstants.FULL_WIDTH)
                    .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
                  }
                  .width(CommonConstants.FULL_WIDTH)
                  .height($r('app.float.component_size_LM'))
                  .onClick(() => {
                    this.isInsert = false;
                    this.selectListItem(account);
                    this.dialogController.open();
                  })
                })
              }
              .width(CommonConstants.FULL_WIDTH)
              .borderRadius($r('app.float.radius_size_L'))
              .backgroundColor(Color.White)
            })
          }
          .width(CommonConstants.FULL_WIDTH)
          .margin({ top: $r('app.float.edge_size_SM') })
        }
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .width(CommonConstants.FULL_WIDTH)
      }
      .width(CommonConstants.FULL_WIDTH)
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)
      .scrollBar(BarState.Off)
      .align(Alignment.Top)


      if (this.isEdit) {
        Button() {
          Image($rawfile('delete.png'))
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .backgroundColor($r('app.color.background_color'))
        .markAnchor({ x: $r('app.float.mark_anchor'), y: CommonConstants.MINIMUM_SIZE })
        .position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y })
        .onClick(() => {
          this.deleteListItem();
        })
      }
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_WIDTH)
    .backgroundColor($r('app.color.background_color'))

  }
}