// 导出一个名为 AccountClassification 的接口，该接口用于表示记账应用中的记账类型项信息
export default interface AccountClassification {
  // 图标资源，表示记账类型的默认图标
  icon: Resource;

  // 选中状态的图标资源，表示记账类型的被选中时的图标
  iconSelected: Resource;

  // 记账类型，0 表示支出，1 表示收入
  accountType: number;

  // 类型文本，用于描述记账类型
  typeText: string;
}
