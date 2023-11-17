// 导入相关模块和类
import CommonConstants from '../common/constants/CommonConstants'
import AccountTable from '../common/database/tables/AccountTable'
import Logger from '../common/utils/Logger'
import AddDialogComponent from '../view/AddDialogComponent'
import Account from '../common/beans/Account'
import { testAccounts } from '../viewmodel/AccountList'
import MainPage from './MainPage'
import StatisticPage from './StatisticPage'

// 定义入口页面组件
@Entry
@Component
struct EntryPage {
  // 定义状态变量
  @State currentIndex: number = 0
  @State isInsert: boolean = false;
  @State newAccount: Account = new Account()
  @State accounts: Array<Account> = [];
  @State index: number = -1;

  private fontColor: string = '#182431'
  private selectedFontColor: string = '#007DFF'

  // 创建 AccountTable 对象，并插入一些测试数据
  private accountTable = new AccountTable(() => {
    this.accountTable.batchInsert(testAccounts, () => this.onAccountsChange())
  });

  // 创建 TabsController 对象
  private controller: TabsController = new TabsController()

  // 创建 CustomDialogController 对象，用于控制添加对话框
  private addDialogController: CustomDialogController = new CustomDialogController({
    builder: AddDialogComponent({
      isInsert: $isInsert,
      newAccount: $newAccount,
      confirm: (isInsert: boolean, newAccount: Account) => this.accept(isInsert, newAccount)
    }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  });

  // 当账目数据发生变化时执行的回调函数
  private onAccountsChange() {
    this.accountTable.getRdbStore(() => {
      this.accountTable.query((result: Account[]) => {
        // 按时间降序排序
        this.accounts = result.sort((a, b) => b.date.getTime() - a.date.getTime());
      });
    });
  }

  // 处理确认对话框的操作
  accept(isInsert: boolean, newAccount: Account): void {
    if (isInsert) {
      // 插入新账户数据
      Logger.info(`${CommonConstants.INDEX_TAG}`, `The account inserted is:  ${JSON.stringify(newAccount)}`);
      this.accountTable.insertData(newAccount, () => {
        this.onAccountsChange()
      });
    } else {
      // 更新账户数据
      this.accountTable.updateData(newAccount, () => {
        this.onAccountsChange()
      });
    }
  }

  // 页面即将显示时执行的生命周期函数
  aboutToAppear() {
    this.onAccountsChange()
  }

  // 定义 TabBuilder 构建函数
  @Builder TabBuilder(index: number, name: string, image: Resource, activeImage: Resource) {
    Column({ space: CommonConstants.SPACE_S }) {
      // 根据当前索引选择显示普通图标或激活状态图标
      Image(this.currentIndex === index ? activeImage : image)
        .width(24)
        .height(24)
      // 根据当前索引设置字体颜色、字体大小和字体粗细
      Text(name)
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize($r('app.float.font_size_S'))
        .fontWeight(this.currentIndex === index ? 500 : 400)
    }
    .justifyContent(FlexAlign.End)
    .width(CommonConstants.FULL_WIDTH)
  }

  // 构建页面
  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      // 创建 Tabs 组件
      Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
        // 创建第一个 Tab 内容，即记账页面
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
        }.tabBar(this.TabBuilder(0, '记账', $r('app.media.account'), $r('app.media.account_active')))

        // 创建第二个 Tab 内容，即报表页面
        TabContent() {
          StatisticPage({
            accounts: $accounts
          })
        }.tabBar(this.TabBuilder(1, '报表', $r('app.media.statistic'), $r('app.media.statistic_active')))
      }
      // 设置 Tabs 组件的样式和属性
      .vertical(false)
      .barMode(BarMode.Fixed)
      .barHeight(CommonConstants.BAR_HEIGHT)
      .animationDuration(400)
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .width(CommonConstants.FULL_WIDTH)
      .height(CommonConstants.FULL_HEIGHT)

      // 创建底部添加按钮
      Stack({ alignContent: Alignment.Bottom }) {
        Button() {
          Image($r('app.media.add'))
            .width(CommonConstants.HALF_WIDTH)
            .height(CommonConstants.HALF_HEIGHT)
        }
        .onClick(() => {
          // 点击按钮时切换到记账页面，初始化新账户数据，并打开对话框
          this.controller.changeIndex(0);
          this.newAccount = new Account();
          this.isInsert = true;
          this.addDialogController.open();
        })
        .aspectRatio(1)
        .height(CommonConstants.ADD_SIZE)
        .offset({ y: -CommonConstants.BAR_HEIGHT + CommonConstants.ADD_SIZE / 2 })

        // 显示按钮下方的文本
        Text('记一笔')
          .fontSize($r('app.float.font_size_S'))
          .fontColor(this.fontColor)
          .margin({ bottom: 5 })
      }
      .width(CommonConstants.ADD_SIZE)
    }
  }
}
