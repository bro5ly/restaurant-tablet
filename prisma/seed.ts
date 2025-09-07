// // // prisma/seed.ts - 完全版
// // import { PrismaClient, CategoryType, StatusType } from "@prisma/client";

// // const prisma = new PrismaClient();

// // async function main() {
// //   console.log("🌱 Seeding started...");

// //   // 既存データをクリア（外部キー制約を考慮した順序）
// //   await prisma.orderItem.deleteMany();
// //   console.log("✅ Deleted all order items");

// //   await prisma.order.deleteMany();
// //   console.log("✅ Deleted all orders");

// //   await prisma.menu.deleteMany();
// //   console.log("✅ Deleted all menus");

// //   await prisma.status.deleteMany();
// //   console.log("✅ Deleted all statuses");

// //   await prisma.category.deleteMany();
// //   console.log("✅ Deleted all categories");

// //   await prisma.table.deleteMany();
// //   console.log("✅ Deleted all tables");

// //   // =================================
// //   // 1. Tableの作成
// //   // =================================
// //   console.log("📋 Creating tables...");
// //   const tables = await prisma.table.createMany({
// //     data: [
// //       { name: "テーブル1" },
// //       { name: "テーブル2" },
// //       { name: "テーブル3" },
// //       { name: "テーブル4" },
// //       { name: "テーブル5" },
// //       { name: "A12" },
// //       { name: "B05" },
// //       { name: "VIP-1" },
// //     ],
// //   });
// //   console.log(`✅ Created ${tables.count} tables`);

// //   // =================================
// //   // 2. Categoryの作成
// //   // =================================
// //   console.log("📂 Creating categories...");
// //   const setCategory = await prisma.category.create({
// //     data: { name: CategoryType.SET },
// //   });

// //   const singleCategory = await prisma.category.create({
// //     data: { name: CategoryType.SINGLE },
// //   });

// //   const sideCategory = await prisma.category.create({
// //     data: { name: CategoryType.SIDE },
// //   });

// //   const drinkCategory = await prisma.category.create({
// //     data: { name: CategoryType.DRINK_DESERT },
// //   });

// //   console.log(`✅ Created 4 categories`);

// //   // =================================
// //   // 3. Statusの作成
// //   // =================================
// //   console.log("📊 Creating statuses...");
// //   const pendingStatus = await prisma.status.create({
// //     data: { name: StatusType.PENDING },
// //   });

// //   const confirmStatus = await prisma.status.create({
// //     data: { name: StatusType.CONFIRM },
// //   });

// //   const cookingStatus = await prisma.status.create({
// //     data: { name: StatusType.COOKING },
// //   });

// //   const readyStatus = await prisma.status.create({
// //     data: { name: StatusType.READY },
// //   });

// //   const servedStatus = await prisma.status.create({
// //     data: { name: StatusType.SERVED },
// //   });

// //   console.log(`✅ Created 5 statuses`);

// //   // =================================
// //   // 4. Menuの作成
// //   // =================================
// //   console.log("🍽️ Creating menus...");

// //   // セットメニュー
// //   const setMenus = [
// //     {
// //       name: "ハンバーガーセット",
// //       description: "ジューシーなハンバーガーとフライドポテト、ドリンクのセット",
// //       image: "/images/hamburger-set.jpg",
// //       price: 1200,
// //       categoryId: setCategory.id,
// //     },
// //     {
// //       name: "チキンカツセット",
// //       description: "サクサクのチキンカツとライス、サラダのセット",
// //       image: "/images/chicken-katsu-set.jpg",
// //       price: 1100,
// //       categoryId: setCategory.id,
// //     },
// //     {
// //       name: "ステーキセット",
// //       description: "200gステーキとライス、スープのセット",
// //       image: "/images/steak-set.jpg",
// //       price: 1800,
// //       categoryId: setCategory.id,
// //     },
// //     {
// //       name: "パスタセット",
// //       description: "本格パスタとサラダ、パンのセット",
// //       image: "/images/pasta-set.jpg",
// //       price: 1300,
// //       categoryId: setCategory.id,
// //     },
// //     {
// //       name: "海鮮丼セット",
// //       description: "新鮮な海鮮丼と味噌汁、小鉢のセット",
// //       image: "/images/seafood-bowl-set.jpg",
// //       price: 1500,
// //       categoryId: setCategory.id,
// //     },
// //   ];

// //   // 単品メニュー
// //   const singleMenus = [
// //     {
// //       name: "ハンバーガー",
// //       description: "ジューシーなビーフパティのハンバーガー",
// //       image: "/images/hamburger.jpg",
// //       price: 800,
// //       categoryId: singleCategory.id,
// //     },
// //     {
// //       name: "チキンカツ",
// //       description: "サクサクのチキンカツ",
// //       image: "/images/chicken-katsu.jpg",
// //       price: 700,
// //       categoryId: singleCategory.id,
// //     },
// //     {
// //       name: "ステーキ",
// //       description: "200gの柔らかステーキ",
// //       image: "/images/steak.jpg",
// //       price: 1500,
// //       categoryId: singleCategory.id,
// //     },
// //     {
// //       name: "パスタ（ボロネーゼ）",
// //       description: "本格的なミートソースパスタ",
// //       image: "/images/pasta-bolognese.jpg",
// //       price: 900,
// //       categoryId: singleCategory.id,
// //     },
// //     {
// //       name: "海鮮丼",
// //       description: "新鮮な海鮮がたっぷりの丼",
// //       image: "/images/seafood-bowl.jpg",
// //       price: 1200,
// //       categoryId: singleCategory.id,
// //     },
// //   ];

// //   // サイドメニュー
// //   const sideMenus = [
// //     {
// //       name: "フライドポテト",
// //       description: "カリッと揚げたフライドポテト",
// //       image: "/images/french-fries.jpg",
// //       price: 400,
// //       categoryId: sideCategory.id,
// //     },
// //     {
// //       name: "オニオンリング",
// //       description: "サクサクのオニオンリング",
// //       image: "/images/onion-rings.jpg",
// //       price: 350,
// //       categoryId: sideCategory.id,
// //     },
// //     {
// //       name: "チキンナゲット",
// //       description: "ジューシーなチキンナゲット（6個）",
// //       image: "/images/chicken-nuggets.jpg",
// //       price: 500,
// //       categoryId: sideCategory.id,
// //     },
// //     {
// //       name: "サラダ",
// //       description: "新鮮野菜のミックスサラダ",
// //       image: "/images/salad.jpg",
// //       price: 300,
// //       categoryId: sideCategory.id,
// //     },
// //     {
// //       name: "ライス",
// //       description: "ふっくら炊きたてご飯",
// //       image: "/images/rice.jpg",
// //       price: 200,
// //       categoryId: sideCategory.id,
// //     },
// //     {
// //       name: "スープ",
// //       description: "本日のおすすめスープ",
// //       image: "/images/soup.jpg",
// //       price: 250,
// //       categoryId: sideCategory.id,
// //     },
// //   ];

// //   // ドリンク・デザートメニュー
// //   const drinkMenus = [
// //     {
// //       name: "コーラ",
// //       description: "冷たいコカ・コーラ",
// //       image: "/images/cola.jpg",
// //       price: 250,
// //       categoryId: drinkCategory.id,
// //     },
// //     {
// //       name: "オレンジジュース",
// //       description: "100%オレンジジュース",
// //       image: "/images/orange-juice.jpg",
// //       price: 300,
// //       categoryId: drinkCategory.id,
// //     },
// //     {
// //       name: "コーヒー",
// //       description: "こだわりのブレンドコーヒー",
// //       image: "/images/coffee.jpg",
// //       price: 400,
// //       categoryId: drinkCategory.id,
// //     },
// //     {
// //       name: "紅茶",
// //       description: "香り高いアールグレイティー",
// //       image: "/images/tea.jpg",
// //       price: 350,
// //       categoryId: drinkCategory.id,
// //     },
// //     {
// //       name: "アイスクリーム",
// //       description: "バニラアイスクリーム",
// //       image: "/images/ice-cream.jpg",
// //       price: 300,
// //       categoryId: drinkCategory.id,
// //     },
// //     {
// //       name: "チーズケーキ",
// //       description: "濃厚なニューヨークチーズケーキ",
// //       image: "/images/cheesecake.jpg",
// //       price: 450,
// //       categoryId: drinkCategory.id,
// //     },
// //     {
// //       name: "チョコレートケーキ",
// //       description: "リッチなチョコレートケーキ",
// //       image: "/images/chocolate-cake.jpg",
// //       price: 500,
// //       categoryId: drinkCategory.id,
// //     },
// //   ];

// //   // 各カテゴリのメニューを作成
// //   for (const menuData of setMenus) {
// //     await prisma.menu.create({ data: menuData });
// //   }
// //   console.log(`✅ Created ${setMenus.length} set menus`);

// //   for (const menuData of singleMenus) {
// //     await prisma.menu.create({ data: menuData });
// //   }
// //   console.log(`✅ Created ${singleMenus.length} single menus`);

// //   for (const menuData of sideMenus) {
// //     await prisma.menu.create({ data: menuData });
// //   }
// //   console.log(`✅ Created ${sideMenus.length} side menus`);

// //   for (const menuData of drinkMenus) {
// //     await prisma.menu.create({ data: menuData });
// //   }
// //   console.log(`✅ Created ${drinkMenus.length} drink/dessert menus`);

// //   // =================================
// //   // 5. サンプル注文の作成（デモ用）
// //   // =================================
// //   console.log("📝 Creating sample orders...");

// //   // 取得したテーブルとメニューを使用
// //   const createdTables = await prisma.table.findMany();
// //   const createdMenus = await prisma.menu.findMany();

// //   // サンプル注文1（テーブル1 - CONFIRM状態）
// //   const sampleOrder1 = await prisma.order.create({
// //     data: {
// //       tableId: createdTables[0].id,
// //       statusId: confirmStatus.id,
// //       total: 2100,
// //       orderItems: {
// //         create: [
// //           {
// //             categoryId: setCategory.id,
// //             menuId:
// //               createdMenus.find((m) => m.name === "ハンバーガーセット")?.id ||
// //               1,
// //             statusId: confirmStatus.id,
// //             quantity: 1,
// //             price: 1200,
// //           },
// //           {
// //             categoryId: drinkCategory.id,
// //             menuId: createdMenus.find((m) => m.name === "コーラ")?.id || 2,
// //             statusId: confirmStatus.id,
// //             quantity: 2,
// //             price: 250,
// //           },
// //           {
// //             categoryId: sideCategory.id,
// //             menuId:
// //               createdMenus.find((m) => m.name === "フライドポテト")?.id || 3,
// //             statusId: confirmStatus.id,
// //             quantity: 1,
// //             price: 400,
// //           },
// //         ],
// //       },
// //     },
// //   });

// //   // サンプル注文2（テーブル2 - COOKING状態）
// //   const sampleOrder2 = await prisma.order.create({
// //     data: {
// //       tableId: createdTables[1].id,
// //       statusId: cookingStatus.id,
// //       total: 1800,
// //       orderItems: {
// //         create: [
// //           {
// //             categoryId: setCategory.id,
// //             menuId:
// //               createdMenus.find((m) => m.name === "ステーキセット")?.id || 4,
// //             statusId: cookingStatus.id,
// //             quantity: 1,
// //             price: 1800,
// //           },
// //         ],
// //       },
// //     },
// //   });

// //   // サンプル注文3（テーブル3 - READY状態）
// //   const sampleOrder3 = await prisma.order.create({
// //     data: {
// //       tableId: createdTables[2].id,
// //       statusId: readyStatus.id,
// //       total: 950,
// //       orderItems: {
// //         create: [
// //           {
// //             categoryId: singleCategory.id,
// //             menuId:
// //               createdMenus.find((m) => m.name === "パスタ（ボロネーゼ）")?.id ||
// //               5,
// //             statusId: readyStatus.id,
// //             quantity: 1,
// //             price: 900,
// //           },
// //           {
// //             categoryId: sideCategory.id,
// //             menuId: createdMenus.find((m) => m.name === "サラダ")?.id || 6,
// //             statusId: readyStatus.id,
// //             quantity: 1,
// //             price: 300,
// //           },
// //         ],
// //       },
// //     },
// //   });

// //   console.log(`✅ Created 3 sample orders`);

// //   // =================================
// //   // 6. 作成されたデータの確認
// //   // =================================
// //   const tableCount = await prisma.table.count();
// //   const categoryCount = await prisma.category.count();
// //   const statusCount = await prisma.status.count();
// //   const menuCount = await prisma.menu.count();
// //   const orderCount = await prisma.order.count();
// //   const orderItemCount = await prisma.orderItem.count();

// //   console.log("\n📊 Seeding completed!");
// //   console.log(`📋 Tables: ${tableCount}`);
// //   console.log(`📂 Categories: ${categoryCount}`);
// //   console.log(`📊 Statuses: ${statusCount}`);
// //   console.log(`🍽️ Menus: ${menuCount}`);
// //   console.log(`📝 Orders: ${orderCount}`);
// //   console.log(`🛍️ Order Items: ${orderItemCount}`);

// //   // 作成されたテーブルとステータスのIDを表示（デバッグ用）
// //   console.log("\n📋 Created Tables:");
// //   const allTables = await prisma.table.findMany();
// //   allTables.forEach((table) => {
// //     console.log(`  - ID: ${table.id}, Name: ${table.name}`);
// //   });

// //   console.log("\n📊 Created Statuses:");
// //   const allStatuses = await prisma.status.findMany();
// //   allStatuses.forEach((status) => {
// //     console.log(`  - ID: ${status.id}, Name: ${status.name}`);
// //   });

// //   console.log("\n✅ Seeding finished successfully!");
// // }

// // main()
// //   .catch((e) => {
// //     console.error("❌ Seeding failed:", e);
// //     process.exit(1);
// //   })
// //   .finally(async () => {
// //     await prisma.$disconnect();
// //   });

// import {
//   PrismaClient,
//   CategoryType,
//   StatusType,
//   AllergyType,
// } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // 既存データを削除
//   await prisma.orderItem.deleteMany();
//   await prisma.order.deleteMany();
//   await prisma.menu.deleteMany();
//   await prisma.allergy.deleteMany();
//   await prisma.table.deleteMany();
//   await prisma.category.deleteMany();
//   await prisma.status.deleteMany();

//   // カテゴリー作成
//   const categories = await Promise.all([
//     prisma.category.create({ data: { name: CategoryType.SET } }),
//     prisma.category.create({ data: { name: CategoryType.SINGLE } }),
//     prisma.category.create({ data: { name: CategoryType.SIDE } }),
//     prisma.category.create({ data: { name: CategoryType.DRINK_DESERT } }),
//   ]);

//   // ステータス作成
//   const statuses = await Promise.all([
//     prisma.status.create({ data: { name: StatusType.PENDING } }),
//     prisma.status.create({ data: { name: StatusType.CONFIRM } }),
//     prisma.status.create({ data: { name: StatusType.COOKING } }),
//     prisma.status.create({ data: { name: StatusType.READY } }),
//     prisma.status.create({ data: { name: StatusType.SERVED } }),
//   ]);

//   // アレルギー作成
//   const allergies = await Promise.all([
//     prisma.allergy.create({
//       data: { name: AllergyType.GLUTEN, displayName: "小麦", icon: "🌾" },
//     }),
//     prisma.allergy.create({
//       data: { name: AllergyType.DAIRY, displayName: "乳", icon: "🥛" },
//     }),
//     prisma.allergy.create({
//       data: { name: AllergyType.EGG, displayName: "卵", icon: "🥚" },
//     }),
//     prisma.allergy.create({
//       data: { name: AllergyType.PEANUT, displayName: "ピーナッツ", icon: "🥜" },
//     }),
//     prisma.allergy.create({
//       data: {
//         name: AllergyType.SHELLFISH,
//         displayName: "エビ・カニ",
//         icon: "🦐",
//       },
//     }),
//   ]);

//   // セットメニュー (9個)
//   const setMenus = [];
//   for (let i = 1; i <= 9; i++) {
//     const menu = await prisma.menu.create({
//       data: {
//         name: `セットメニュー${i}`,
//         description: `美味しいセットメニュー${i}の説明`,
//         image: `set${i}.jpg`,
//         price: 1200 + i * 100,
//         categoryId: categories[0].id,
//         allergies: {
//           connect: i <= 3 ? [{ id: allergies[0].id }] : [],
//         },
//       },
//     });
//     setMenus.push(menu);
//   }

//   // 単品メニュー (9個)
//   const singleMenus = [];
//   for (let i = 1; i <= 9; i++) {
//     const menu = await prisma.menu.create({
//       data: {
//         name: `単品料理${i}`,
//         description: `こだわりの単品料理${i}`,
//         image: `single${i}.jpg`,
//         price: 800 + i * 50,
//         categoryId: categories[1].id,
//         allergies: {
//           connect: i % 2 === 0 ? [{ id: allergies[1].id }] : [],
//         },
//       },
//     });
//     singleMenus.push(menu);
//   }

//   // サイドメニュー (6個)
//   const sideMenus = [];
//   for (let i = 1; i <= 6; i++) {
//     const menu = await prisma.menu.create({
//       data: {
//         name: `サイド${i}`,
//         description: `美味しいサイドメニュー${i}`,
//         image: `side${i}.jpg`,
//         price: 300 + i * 50,
//         categoryId: categories[2].id,
//       },
//     });
//     sideMenus.push(menu);
//   }

//   // ドリンク・デザート (6個)
//   for (let i = 1; i <= 6; i++) {
//     await prisma.menu.create({
//       data: {
//         name: i <= 3 ? `ドリンク${i}` : `デザート${i - 3}`,
//         description: i <= 3 ? `爽やかなドリンク${i}` : `甘いデザート${i - 3}`,
//         image: i <= 3 ? `drink${i}.jpg` : `dessert${i - 3}.jpg`,
//         price: i <= 3 ? 200 + i * 50 : 400 + i * 50,
//         categoryId: categories[3].id,
//       },
//     });
//   }

//   // セットメニューにサイドメニューを関連付け
//   for (const setMenu of setMenus.slice(0, 5)) {
//     await prisma.menu.update({
//       where: { id: setMenu.id },
//       data: {
//         availableSides: {
//           connect: sideMenus.slice(0, 4).map((side) => ({ id: side.id })),
//         },
//       },
//     });
//   }

//   // 単品メニューにもサイドメニューを関連付け
//   for (const singleMenu of singleMenus.slice(0, 6)) {
//     await prisma.menu.update({
//       where: { id: singleMenu.id },
//       data: {
//         availableSides: {
//           connect: sideMenus.slice(2, 6).map((side) => ({ id: side.id })),
//         },
//       },
//     });
//   }

//   // テーブル作成
//   await prisma.table.createMany({
//     data: [
//       { name: "テーブル1" },
//       { name: "テーブル2" },
//       { name: "テーブル3" },
//       { name: "テーブル4" },
//     ],
//   });

//   console.log("Seed completed!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import {
  PrismaClient,
  CategoryType,
  StatusType,
  AllergyType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // 既存データを削除
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.allergy.deleteMany();
  await prisma.table.deleteMany();
  await prisma.category.deleteMany();
  await prisma.status.deleteMany();

  // SQLiteのAUTOINCREMENTカウンターをリセット
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('Table', 'Category', 'Status', 'Menu', 'Allergy', 'Order', 'OrderItem')`;

  console.log("✅ Deleted all data and reset AUTO_INCREMENT counters");

  // カテゴリー作成
  const categories = await Promise.all([
    prisma.category.create({ data: { name: CategoryType.SET } }),
    prisma.category.create({ data: { name: CategoryType.SINGLE } }),
    prisma.category.create({ data: { name: CategoryType.SIDE } }),
    prisma.category.create({ data: { name: CategoryType.DRINK_DESERT } }),
  ]);

  // ステータス作成
  const statuses = await Promise.all([
    prisma.status.create({ data: { name: StatusType.PENDING } }),
    prisma.status.create({ data: { name: StatusType.CONFIRM } }),
    prisma.status.create({ data: { name: StatusType.COOKING } }),
    prisma.status.create({ data: { name: StatusType.READY } }),
    prisma.status.create({ data: { name: StatusType.SERVED } }),
  ]);

  // アレルギー作成
  const allergies = await Promise.all([
    prisma.allergy.create({
      data: { name: AllergyType.GLUTEN, displayName: "小麦", icon: "🌾" },
    }),
    prisma.allergy.create({
      data: { name: AllergyType.DAIRY, displayName: "乳", icon: "🥛" },
    }),
    prisma.allergy.create({
      data: { name: AllergyType.EGG, displayName: "卵", icon: "🥚" },
    }),
    prisma.allergy.create({
      data: { name: AllergyType.PEANUT, displayName: "ピーナッツ", icon: "🥜" },
    }),
    prisma.allergy.create({
      data: {
        name: AllergyType.SHELLFISH,
        displayName: "エビ・カニ",
        icon: "🦐",
      },
    }),
  ]);

  // セットメニュー (9個)
  const setMenus = [];
  for (let i = 1; i <= 9; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: `セットメニュー${i}`,
        description: `美味しいセットメニュー${i}の説明`,
        image: `set${i}.jpg`,
        price: 1200 + i * 100,
        categoryId: categories[0].id,
        allergies: {
          connect: i <= 3 ? [{ id: allergies[0].id }] : [],
        },
      },
    });
    setMenus.push(menu);
  }

  // 単品メニュー (9個) - サイドメニューなし
  const singleMenus = [];
  for (let i = 1; i <= 9; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: `単品料理${i}`,
        description: `こだわりの単品料理${i}`,
        image: `single${i}.jpg`,
        price: 800 + i * 50,
        categoryId: categories[1].id,
        allergies: {
          connect: i % 2 === 0 ? [{ id: allergies[1].id }] : [],
        },
      },
    });
    singleMenus.push(menu);
  }

  // サイドメニュー (6個)
  const sideMenus = [];
  for (let i = 1; i <= 6; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: `サイド${i}`,
        description: `美味しいサイドメニュー${i}`,
        image: `side${i}.jpg`,
        price: 300 + i * 50,
        categoryId: categories[2].id,
      },
    });
    sideMenus.push(menu);
  }

  // ドリンク・デザート (6個)
  for (let i = 1; i <= 6; i++) {
    await prisma.menu.create({
      data: {
        name: i <= 3 ? `ドリンク${i}` : `デザート${i - 3}`,
        description: i <= 3 ? `爽やかなドリンク${i}` : `甘いデザート${i - 3}`,
        image: i <= 3 ? `drink${i}.jpg` : `dessert${i - 3}.jpg`,
        price: i <= 3 ? 200 + i * 50 : 400 + i * 50,
        categoryId: categories[3].id,
      },
    });
  }

  // セットメニューのみにサイドメニューを関連付け
  for (const setMenu of setMenus.slice(0, 5)) {
    await prisma.menu.update({
      where: { id: setMenu.id },
      data: {
        availableSides: {
          connect: sideMenus.slice(0, 4).map((side) => ({ id: side.id })),
        },
      },
    });
  }

  // テーブル作成
  await prisma.table.createMany({
    data: [
      { name: "テーブル1" },
      { name: "テーブル2" },
      { name: "テーブル3" },
      { name: "テーブル4" },
    ],
  });

  console.log("✅ Seed completed!");

  // 作成されたデータの確認
  const menuCount = await prisma.menu.count();
  const allergyCount = await prisma.allergy.count();
  console.log(`📊 Created ${menuCount} menus and ${allergyCount} allergies`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
