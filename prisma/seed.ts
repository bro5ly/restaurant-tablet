// prisma/seed.ts - 完全版
import { PrismaClient, CategoryType, StatusType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // 既存データをクリア（外部キー制約を考慮した順序）
  await prisma.orderItem.deleteMany();
  console.log("✅ Deleted all order items");

  await prisma.order.deleteMany();
  console.log("✅ Deleted all orders");

  await prisma.menu.deleteMany();
  console.log("✅ Deleted all menus");

  await prisma.status.deleteMany();
  console.log("✅ Deleted all statuses");

  await prisma.category.deleteMany();
  console.log("✅ Deleted all categories");

  await prisma.table.deleteMany();
  console.log("✅ Deleted all tables");

  // =================================
  // 1. Tableの作成
  // =================================
  console.log("📋 Creating tables...");
  const tables = await prisma.table.createMany({
    data: [
      { name: "テーブル1" },
      { name: "テーブル2" },
      { name: "テーブル3" },
      { name: "テーブル4" },
      { name: "テーブル5" },
      { name: "A12" },
      { name: "B05" },
      { name: "VIP-1" },
    ],
  });
  console.log(`✅ Created ${tables.count} tables`);

  // =================================
  // 2. Categoryの作成
  // =================================
  console.log("📂 Creating categories...");
  const setCategory = await prisma.category.create({
    data: { name: CategoryType.SET },
  });

  const singleCategory = await prisma.category.create({
    data: { name: CategoryType.SINGLE },
  });

  const sideCategory = await prisma.category.create({
    data: { name: CategoryType.SIDE },
  });

  const drinkCategory = await prisma.category.create({
    data: { name: CategoryType.DRINK_DESERT },
  });

  console.log(`✅ Created 4 categories`);

  // =================================
  // 3. Statusの作成
  // =================================
  console.log("📊 Creating statuses...");
  const pendingStatus = await prisma.status.create({
    data: { name: StatusType.PENDING },
  });

  const confirmStatus = await prisma.status.create({
    data: { name: StatusType.CONFIRM },
  });

  const cookingStatus = await prisma.status.create({
    data: { name: StatusType.COOKING },
  });

  const readyStatus = await prisma.status.create({
    data: { name: StatusType.READY },
  });

  const servedStatus = await prisma.status.create({
    data: { name: StatusType.SERVED },
  });

  console.log(`✅ Created 5 statuses`);

  // =================================
  // 4. Menuの作成
  // =================================
  console.log("🍽️ Creating menus...");

  // セットメニュー
  const setMenus = [
    {
      name: "ハンバーガーセット",
      description: "ジューシーなハンバーガーとフライドポテト、ドリンクのセット",
      image: "/images/hamburger-set.jpg",
      price: 1200,
      categoryId: setCategory.id,
    },
    {
      name: "チキンカツセット",
      description: "サクサクのチキンカツとライス、サラダのセット",
      image: "/images/chicken-katsu-set.jpg",
      price: 1100,
      categoryId: setCategory.id,
    },
    {
      name: "ステーキセット",
      description: "200gステーキとライス、スープのセット",
      image: "/images/steak-set.jpg",
      price: 1800,
      categoryId: setCategory.id,
    },
    {
      name: "パスタセット",
      description: "本格パスタとサラダ、パンのセット",
      image: "/images/pasta-set.jpg",
      price: 1300,
      categoryId: setCategory.id,
    },
    {
      name: "海鮮丼セット",
      description: "新鮮な海鮮丼と味噌汁、小鉢のセット",
      image: "/images/seafood-bowl-set.jpg",
      price: 1500,
      categoryId: setCategory.id,
    },
  ];

  // 単品メニュー
  const singleMenus = [
    {
      name: "ハンバーガー",
      description: "ジューシーなビーフパティのハンバーガー",
      image: "/images/hamburger.jpg",
      price: 800,
      categoryId: singleCategory.id,
    },
    {
      name: "チキンカツ",
      description: "サクサクのチキンカツ",
      image: "/images/chicken-katsu.jpg",
      price: 700,
      categoryId: singleCategory.id,
    },
    {
      name: "ステーキ",
      description: "200gの柔らかステーキ",
      image: "/images/steak.jpg",
      price: 1500,
      categoryId: singleCategory.id,
    },
    {
      name: "パスタ（ボロネーゼ）",
      description: "本格的なミートソースパスタ",
      image: "/images/pasta-bolognese.jpg",
      price: 900,
      categoryId: singleCategory.id,
    },
    {
      name: "海鮮丼",
      description: "新鮮な海鮮がたっぷりの丼",
      image: "/images/seafood-bowl.jpg",
      price: 1200,
      categoryId: singleCategory.id,
    },
  ];

  // サイドメニュー
  const sideMenus = [
    {
      name: "フライドポテト",
      description: "カリッと揚げたフライドポテト",
      image: "/images/french-fries.jpg",
      price: 400,
      categoryId: sideCategory.id,
    },
    {
      name: "オニオンリング",
      description: "サクサクのオニオンリング",
      image: "/images/onion-rings.jpg",
      price: 350,
      categoryId: sideCategory.id,
    },
    {
      name: "チキンナゲット",
      description: "ジューシーなチキンナゲット（6個）",
      image: "/images/chicken-nuggets.jpg",
      price: 500,
      categoryId: sideCategory.id,
    },
    {
      name: "サラダ",
      description: "新鮮野菜のミックスサラダ",
      image: "/images/salad.jpg",
      price: 300,
      categoryId: sideCategory.id,
    },
    {
      name: "ライス",
      description: "ふっくら炊きたてご飯",
      image: "/images/rice.jpg",
      price: 200,
      categoryId: sideCategory.id,
    },
    {
      name: "スープ",
      description: "本日のおすすめスープ",
      image: "/images/soup.jpg",
      price: 250,
      categoryId: sideCategory.id,
    },
  ];

  // ドリンク・デザートメニュー
  const drinkMenus = [
    {
      name: "コーラ",
      description: "冷たいコカ・コーラ",
      image: "/images/cola.jpg",
      price: 250,
      categoryId: drinkCategory.id,
    },
    {
      name: "オレンジジュース",
      description: "100%オレンジジュース",
      image: "/images/orange-juice.jpg",
      price: 300,
      categoryId: drinkCategory.id,
    },
    {
      name: "コーヒー",
      description: "こだわりのブレンドコーヒー",
      image: "/images/coffee.jpg",
      price: 400,
      categoryId: drinkCategory.id,
    },
    {
      name: "紅茶",
      description: "香り高いアールグレイティー",
      image: "/images/tea.jpg",
      price: 350,
      categoryId: drinkCategory.id,
    },
    {
      name: "アイスクリーム",
      description: "バニラアイスクリーム",
      image: "/images/ice-cream.jpg",
      price: 300,
      categoryId: drinkCategory.id,
    },
    {
      name: "チーズケーキ",
      description: "濃厚なニューヨークチーズケーキ",
      image: "/images/cheesecake.jpg",
      price: 450,
      categoryId: drinkCategory.id,
    },
    {
      name: "チョコレートケーキ",
      description: "リッチなチョコレートケーキ",
      image: "/images/chocolate-cake.jpg",
      price: 500,
      categoryId: drinkCategory.id,
    },
  ];

  // 各カテゴリのメニューを作成
  for (const menuData of setMenus) {
    await prisma.menu.create({ data: menuData });
  }
  console.log(`✅ Created ${setMenus.length} set menus`);

  for (const menuData of singleMenus) {
    await prisma.menu.create({ data: menuData });
  }
  console.log(`✅ Created ${singleMenus.length} single menus`);

  for (const menuData of sideMenus) {
    await prisma.menu.create({ data: menuData });
  }
  console.log(`✅ Created ${sideMenus.length} side menus`);

  for (const menuData of drinkMenus) {
    await prisma.menu.create({ data: menuData });
  }
  console.log(`✅ Created ${drinkMenus.length} drink/dessert menus`);

  // =================================
  // 5. サンプル注文の作成（デモ用）
  // =================================
  console.log("📝 Creating sample orders...");

  // 取得したテーブルとメニューを使用
  const createdTables = await prisma.table.findMany();
  const createdMenus = await prisma.menu.findMany();

  // サンプル注文1（テーブル1 - CONFIRM状態）
  const sampleOrder1 = await prisma.order.create({
    data: {
      tableId: createdTables[0].id,
      statusId: confirmStatus.id,
      total: 2100,
      orderItems: {
        create: [
          {
            categoryId: setCategory.id,
            menuId:
              createdMenus.find((m) => m.name === "ハンバーガーセット")?.id ||
              1,
            statusId: confirmStatus.id,
            quantity: 1,
            price: 1200,
          },
          {
            categoryId: drinkCategory.id,
            menuId: createdMenus.find((m) => m.name === "コーラ")?.id || 2,
            statusId: confirmStatus.id,
            quantity: 2,
            price: 250,
          },
          {
            categoryId: sideCategory.id,
            menuId:
              createdMenus.find((m) => m.name === "フライドポテト")?.id || 3,
            statusId: confirmStatus.id,
            quantity: 1,
            price: 400,
          },
        ],
      },
    },
  });

  // サンプル注文2（テーブル2 - COOKING状態）
  const sampleOrder2 = await prisma.order.create({
    data: {
      tableId: createdTables[1].id,
      statusId: cookingStatus.id,
      total: 1800,
      orderItems: {
        create: [
          {
            categoryId: setCategory.id,
            menuId:
              createdMenus.find((m) => m.name === "ステーキセット")?.id || 4,
            statusId: cookingStatus.id,
            quantity: 1,
            price: 1800,
          },
        ],
      },
    },
  });

  // サンプル注文3（テーブル3 - READY状態）
  const sampleOrder3 = await prisma.order.create({
    data: {
      tableId: createdTables[2].id,
      statusId: readyStatus.id,
      total: 950,
      orderItems: {
        create: [
          {
            categoryId: singleCategory.id,
            menuId:
              createdMenus.find((m) => m.name === "パスタ（ボロネーゼ）")?.id ||
              5,
            statusId: readyStatus.id,
            quantity: 1,
            price: 900,
          },
          {
            categoryId: sideCategory.id,
            menuId: createdMenus.find((m) => m.name === "サラダ")?.id || 6,
            statusId: readyStatus.id,
            quantity: 1,
            price: 300,
          },
        ],
      },
    },
  });

  console.log(`✅ Created 3 sample orders`);

  // =================================
  // 6. 作成されたデータの確認
  // =================================
  const tableCount = await prisma.table.count();
  const categoryCount = await prisma.category.count();
  const statusCount = await prisma.status.count();
  const menuCount = await prisma.menu.count();
  const orderCount = await prisma.order.count();
  const orderItemCount = await prisma.orderItem.count();

  console.log("\n📊 Seeding completed!");
  console.log(`📋 Tables: ${tableCount}`);
  console.log(`📂 Categories: ${categoryCount}`);
  console.log(`📊 Statuses: ${statusCount}`);
  console.log(`🍽️ Menus: ${menuCount}`);
  console.log(`📝 Orders: ${orderCount}`);
  console.log(`🛍️ Order Items: ${orderItemCount}`);

  // 作成されたテーブルとステータスのIDを表示（デバッグ用）
  console.log("\n📋 Created Tables:");
  const allTables = await prisma.table.findMany();
  allTables.forEach((table) => {
    console.log(`  - ID: ${table.id}, Name: ${table.name}`);
  });

  console.log("\n📊 Created Statuses:");
  const allStatuses = await prisma.status.findMany();
  allStatuses.forEach((status) => {
    console.log(`  - ID: ${status.id}, Name: ${status.name}`);
  });

  console.log("\n✅ Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
