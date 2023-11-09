import CommonConstants from '../common/constants/CommonConstants'
import AccountTable from '../common/database/tables/AccountTable'
import Logger from '../common/utils/Logger'
import AddDialogComponent from '../view/AddDialogComponent'
import AccountData from '../viewmodel/AccountData'
import MainPage from './MainPage'
import StatisticPage from './StatisticPage'

@Entry
@Component
struct EntryPage {
  @State fontColor: string = '#182431'
  @State selectedFontColor: string = '#007DFF'
  @State currentIndex: number = 0
  @State isInsert: boolean = false;
  @State newAccount: AccountData = new AccountData()
  @State accounts: Array<AccountData> = [];
  @State index: number = -1;
  private accountTable = new AccountTable(() => {
    // 插入一些测试数据
    this.accountTable.insertData(new AccountData(0, '吃饭', 100), () => this.onAccountsChange())
    this.accountTable.insertData(new AccountData(0, '零食', 99), () => this.onAccountsChange())
    this.accountTable.insertData(new AccountData(0, '汽车加油', 97), () => this.onAccountsChange())
    this.accountTable.insertData(new AccountData(0, '旅游', 96), () => this.onAccountsChange())
    this.accountTable.insertData(new AccountData(0, '娱乐', 95), () => this.onAccountsChange())
    this.accountTable.insertData(new AccountData(0, '宠物', 94), () => this.onAccountsChange())
  });
  private controller: TabsController = new TabsController()
  private addDialogController: CustomDialogController = new CustomDialogController({
    builder: AddDialogComponent({
      isInsert: $isInsert,
      newAccount: $newAccount,
      confirm: (isInsert: boolean, newAccount: AccountData) => this.accept(isInsert, newAccount)
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });

  private onAccountsChange() {
    this.accountTable.getRdbStore(() => {
      this.accountTable.query((result: AccountData[]) => {
        this.accounts = result.sort((a, b) => b.date.getTime() - a.date.getTime());
      });
    });
  }

  accept(isInsert: boolean, newAccount: AccountData): void {
    if (isInsert) {
      Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
      this.accountTable.insertData(newAccount, () => {
        this.onAccountsChange()
      });
    } else {
      this.accountTable.updateData(newAccount, () => {
        this.onAccountsChange()
      });
    }
  }

  aboutToAppear() {

    this.onAccountsChange()
  }

  @Builder TabBuilder(index: number, name: string, image: Resource, activeImage: Resource) {
    Column({ space: CommonConstants.SPACE_S }) {
      Image(this.currentIndex === index ? activeImage : image)
        .width(24)
        .height(24)
      Text(name)
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize($r('app.float.font_size_S'))
        .fontWeight(this.currentIndex === index ? 500 : 400)
    }.width(CommonConstants.FULL_WIDTH)
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
        TabContent() {
          MainPage({
            accounts: $accounts,
            isInsert: $isInsert,
            newAccount: $newAccount,
            index: $index,
            dialogController: this.addDialogController,
            accountTable: this.accountTable,
            onAccountsChange: this.onAccountsChange
          })
        }.tabBar(this.TabBuilder(0, '首页', $r('app.media.account'), $r('app.media.account_active')))

        TabContent() {
          StatisticPage({
            accounts: $accounts
          })
        }.tabBar(this.TabBuilder(1, '统计', $r('app.media.statistic'), $r('app.media.statistic_active')))

      }
      .vertical(false)
      .barMode(BarMode.Fixed)
      .barHeight(CommonConstants.BAR_HEIGHT)
      .animationDuration(400)
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)

      Stack({ alignContent: Alignment.Bottom }) {
        Button() {
          Image($r('app.media.add'))
            .width(CommonConstants.HALF_WIDTH)
            .height(CommonConstants.HALF_HEIGHT)
        }
        .onClick(() => {
          this.controller.changeIndex(0);
          this.newAccount = new AccountData();
          this.isInsert = true;
          this.addDialogController.open();
        })
        .aspectRatio(1)
        .height(CommonConstants.ADD_SIZE)
        .offset({ y: -CommonConstants.BAR_HEIGHT + CommonConstants.ADD_SIZE / 2 })

      }
      .width(CommonConstants.ADD_SIZE)
    }
  }
}