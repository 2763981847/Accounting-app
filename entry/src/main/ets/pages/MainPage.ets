// 该组件用于展示主页面的记账列表，并提供编辑、删除等功能

import AccountTable from '../common/database/tables/AccountTable';
import Account from '../common/beans/Account';
import CommonConstants from '../common/constants/CommonConstants';
import { ImageList } from '../viewmodel/AccountList';
import { formatDateTime, getEndOfTheDay, getFirstDateOfThisMonth, isSameDay } from '../common/utils/DateUtils';
import StatisticalCardComponent from '../view/StatisticalCardComponent';
import groupHeader from '../view/GroupHeaderBuilder';
import DateSelectComponent from '../view/DateSelectComponent';

// 将账单按日期分组
function getGroupedAccounts(accounts: Array<Account>): Array<Array<Account>> {
  let groupedAccounts = [];
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    if (i === 0 || !isSameDay(accounts[i - 1].date, account.date)) {
      groupedAccounts.push([]);
    }
    groupedAccounts[groupedAccounts.length - 1].push(account);
  }
  return groupedAccounts;
}

@Component
export default struct MainPage {
  @State searchText: string = '';
  @State isEdit: boolean = false;
  @Link @Watch('filterAccounts') accounts: Array<Account>;
  @State @Watch('filterAccounts') endDate: number = getEndOfTheDay(new Date()).getTime();
  @State @Watch('filterAccounts') beginDate: number = 0;
  // 0 - 收 1 - 支 2 - 全部
  @State @Watch('filterAccounts') accountType: number = 2;
  @State filteredAccounts: Array<Account> = [];
  @Link isInsert: boolean;
  @Link newAccount: Account;
  @Link index: number;
  private scroller: Scroller = new Scroller();
  private dialogController: CustomDialogController;
  private accountTable: AccountTable;
  private deleteList: Array<Account> = [];
  searchController: SearchController = new SearchController();
  onAccountsChange: () => void;

  // 生命周期钩子，在页面即将显示时触发
  aboutToAppear() {
    this.filterAccounts();
  }

  // 过滤账单列表
  filterAccounts() {
    let temp = this.accounts;
    // 模糊查询
    if (this.searchText && this.searchText != '') {
      temp = temp.filter(account =>
      account.desc.includes(this.searchText) ||
      account.typeText.includes(this.searchText) ||
      account.amount.toString() === this.searchText
      );
    }
    // 按分类筛选
    // 2 代表全部
    if (this.accountType !== 2) {
      temp = temp.filter(account => account.accountType === this.accountType);
    }
    // 按时间筛选
    temp = temp
      .filter(account => account.date.getTime() >= this.beginDate && account.date.getTime() <= this.endDate);
    this.filteredAccounts = temp;
  }

  // 选中列表项
  selectListItem(item: Account) {
    this.index = this.filteredAccounts.indexOf(item);
    this.newAccount = item;
  }

  // 删除选中的列表项
  deleteListItem() {
    this.accountTable.batchDelete(this.deleteList, () => {
      this.onAccountsChange();
    });
    this.deleteList = [];
    this.isEdit = false;
  }

  // 页面渲染函数
  build() {
    Stack() {
      Scroll(this.scroller) {
        Column({ space: CommonConstants.SPACE_M }) {
          Row() {
            // 页面标题
            Text($r('app.string.MainAbility_label'))
              .height($r('app.float.component_size_SP'))
              .fontSize($r('app.float.font_size_L'))
              .margin({ left: $r('app.float.font_size_L') });

            // 编辑按钮
            Image($rawfile('ic_public_edit.svg'))
              .width($r('app.float.component_size_S'))
              .aspectRatio(CommonConstants.FULL_SIZE)
              .margin({ right: $r('app.float.font_size_L') })
              .onClick(() => {
                this.isEdit = !this.isEdit;
              });
          }
          .width(CommonConstants.FULL_WIDTH)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ top: $r('app.float.edge_size_M'), bottom: $r('app.float.edge_size_MM') });

          // 统计卡片组件
          StatisticalCardComponent({ accounts: $accounts })
            .aspectRatio(CommonConstants.CARD_ASPECT_RATIO)
            .width(CommonConstants.FULL_WIDTH);

          // 搜索和分类按钮行
          Row() {
            // 搜索输入框
            Search({
              value: this.searchText,
              placeholder: CommonConstants.SEARCH_TEXT,
              controller: this.searchController
            })
              .width('45%')
              .borderRadius($r('app.float.radius_size_M'))
              .borderWidth($r('app.float.border_size_S'))
              .borderColor($r('app.color.border_color'))
              .placeholderFont({ size: $r('app.float.font_size_M') })
              .textFont({ size: $r('app.float.font_size_M') })
              .backgroundColor(Color.White)
              .onChange((searchValue: string) => {
                this.searchText = searchValue;
              })
              .onSubmit(() => {
                this.filterAccounts();
              });

            // 收入、支出、全部按钮
            Row({ space: CommonConstants.SPACE_S }) {
              Button('全部')
                .stateEffect(false)
                .fontSize($r('app.float.font_size_S'))
                .fontColor(this.accountType === 2 ? $r('app.color.main_color') : $r('app.color.deep_gray'))
                .backgroundColor(this.accountType === 2 ? $r('app.color.button_active_bgc') : $r('app.color.button_bgc'))
                .onClick(() => this.accountType = 2);

              Button('支出')
                .stateEffect(false)
                .fontSize($r('app.float.font_size_S'))
                .onClick(() => this.accountType = 0)
                .fontColor(this.accountType === 0 ? $r('app.color.main_color') : $r('app.color.deep_gray'))
                .backgroundColor(this.accountType === 0 ? $r('app.color.button_active_bgc') : $r('app.color.button_bgc'));

              Button('收入')
                .stateEffect(false)
                .fontSize($r('app.float.font_size_S'))
                .onClick(() => this.accountType = 1)
                .fontColor(this.accountType === 1 ? $r('app.color.main_color') : $r('app.color.deep_gray'))
                .backgroundColor(this.accountType === 1 ? $r('app.color.button_active_bgc') : $r('app.color.button_bgc'));
            }
            .width(CommonConstants.HALF_WIDTH)
            .justifyContent(FlexAlign.End)
            .height(CommonConstants.FULL_HEIGHT);
          }
          .justifyContent(FlexAlign.SpaceBetween)
          .width(CommonConstants.FULL_WIDTH)
          .height($r('app.float.component_size_SP'))
          .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
          .margin({ top: $r('app.float.edge_size_S'), bottom: $r('app.float.edge_size_S') });

          // 时间选择组件
          DateSelectComponent({
            beginDate: $beginDate,
            endDate: $endDate,
            selectedIndex: 3
          }).width(CommonConstants.EIGHTY_PERCENT);

          // 账单列表
          List({ space: CommonConstants.SPACE_M }) {
            ForEach(getGroupedAccounts(this.filteredAccounts), (accounts: Array<Account>) => {
              ListItemGroup({ header: groupHeader(accounts) }) {
                ForEach(accounts, (account: Account) => {
                  ListItem() {
                    Row() {
                      // 账单类型图标
                      Image(ImageList[account.typeText])
                        .width($r('app.float.component_size_M'))
                        .aspectRatio(CommonConstants.FULL_SIZE)
                        .margin({ right: $r('app.float.edge_size_MP') });

                      Column() {
                        // 账单类型文字
                        Text(account.typeText)
                          .height($r('app.float.component_size_SM'))
                          .fontSize($r('app.float.font_size_M'));

                        // 账单时间
                        Text(formatDateTime(account.date, 'HH:mm'))
                          .height($r('app.float.component_size_SM'))
                          .fontSize($r('app.float.font_size_S'))
                          .fontColor($r('app.color.gray'));
                      }
                      .alignItems(HorizontalAlign.Start);

                      if (account.desc) {
                        // 账单描述分隔线
                        Divider()
                          .vertical(true)
                          .strokeWidth(CommonConstants.DIVIDER_SIZE_M)
                          .color($r('app.color.gray'))
                          .height(CommonConstants.HALF_WIDTH)
                          .align(Alignment.Center)
                          .margin({ left: $r('app.float.edge_size_MP') });
                      }

                      // 账单描述
                      Text(account.desc).height($r('app.float.component_size_SM'))
                        .fontSize($r('app.float.font_size_S'))
                        .fontColor($r('app.color.gray'))
                        .margin({ left: $r('app.float.edge_size_MP') });

                      // 编辑模式下显示复选框
                      Blank()
                        .layoutWeight(1);

                      if (!this.isEdit) {
                        // 显示金额
                        Text(account.accountType === 0 ? '-' + account.amount.toString() : '+' + account.amount.toString())
                          .fontSize($r('app.float.font_size_M'))
                          .fontColor(account.accountType === 0 ? $r('app.color.pay_color') : $r('app.color.main_color'))
                          .align(Alignment.End)
                          .flexGrow(CommonConstants.FULL_SIZE);
                      } else {
                        // 编辑模式下显示复选框
                        Row() {
                          Toggle({ type: ToggleType.Checkbox })
                            .onChange((isOn) => {
                              if (isOn) {
                                this.deleteList.push(account);
                              } else {
                                let index = this.deleteList.indexOf(account);
                                this.deleteList.splice(index, 1);
                              }
                            });
                        }
                        .align(Alignment.End)
                        .flexGrow(CommonConstants.FULL_SIZE)
                        .justifyContent(FlexAlign.End);
                      }
                    }
                    .width(CommonConstants.FULL_WIDTH)
                    .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') });
                  }
                  .width(CommonConstants.FULL_WIDTH)
                  .height($r('app.float.component_size_LM'))
                  .onClick(() => {
                    this.isInsert = false;
                    this.selectListItem(account);
                    this.dialogController.open();
                  });
                });
              }
              .width(CommonConstants.FULL_WIDTH)
              .borderRadius($r('app.float.radius_size_L'))
              .backgroundColor(Color.White);
            });
          }
          .width(CommonConstants.FULL_WIDTH)
          .margin({ top: $r('app.float.edge_size_SM') });
        }
        .padding({ left: $r('app.float.edge_size_M'), right: $r('app.float.edge_size_M') })
        .width(CommonConstants.FULL_WIDTH);
      }
      .width(CommonConstants.FULL_WIDTH)
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)
      .scrollBar(BarState.Off)
      .align(Alignment.Top);

      // 编辑模式下显示删除按钮
      if (this.isEdit) {
        Button() {
          Image($rawfile('delete.png'));
        }
        .width($r('app.float.component_size_MP'))
        .height($r('app.float.component_size_MP'))
        .backgroundColor($r('app.color.background_color'))
        .markAnchor({ x: $r('app.float.mark_anchor'), y: CommonConstants.MINIMUM_SIZE })
        .position({ x: CommonConstants.DELETE_POSITION_X, y: CommonConstants.DELETE_POSITION_Y })
        .onClick(() => {
          this.deleteListItem();
        });
      }
    }
    .width(CommonConstants.FULL_WIDTH)
    .height(CommonConstants.FULL_WIDTH)
    .backgroundColor($r('app.color.background_color'));
  }
}
