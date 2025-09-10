// // // // prisma/seed.ts - 完全版
// // // import { PrismaClient, CategoryType, StatusType } from "@prisma/client";

// // // const prisma = new PrismaClient();

// // // async function main() {
// // //   console.log("🌱 Seeding started...");

// // //   // 既存データをクリア（外部キー制約を考慮した順序）
// // //   await prisma.orderItem.deleteMany();
// // //   console.log("✅ Deleted all order items");

// // //   await prisma.order.deleteMany();
// // //   console.log("✅ Deleted all orders");

// // //   await prisma.menu.deleteMany();
// // //   console.log("✅ Deleted all menus");

// // //   await prisma.status.deleteMany();
// // //   console.log("✅ Deleted all statuses");

// // //   await prisma.category.deleteMany();
// // //   console.log("✅ Deleted all categories");

// // //   await prisma.table.deleteMany();
// // //   console.log("✅ Deleted all tables");

// // //   // =================================
// // //   // 1. Tableの作成
// // //   // =================================
// // //   console.log("📋 Creating tables...");
// // //   const tables = await prisma.table.createMany({
// // //     data: [
// // //       { name: "テーブル1" },
// // //       { name: "テーブル2" },
// // //       { name: "テーブル3" },
// // //       { name: "テーブル4" },
// // //       { name: "テーブル5" },
// // //       { name: "A12" },
// // //       { name: "B05" },
// // //       { name: "VIP-1" },
// // //     ],
// // //   });
// // //   console.log(`✅ Created ${tables.count} tables`);

// // //   // =================================
// // //   // 2. Categoryの作成
// // //   // =================================
// // //   console.log("📂 Creating categories...");
// // //   const setCategory = await prisma.category.create({
// // //     data: { name: CategoryType.SET },
// // //   });

// // //   const singleCategory = await prisma.category.create({
// // //     data: { name: CategoryType.SINGLE },
// // //   });

// // //   const sideCategory = await prisma.category.create({
// // //     data: { name: CategoryType.SIDE },
// // //   });

// // //   const drinkCategory = await prisma.category.create({
// // //     data: { name: CategoryType.DRINK_DESERT },
// // //   });

// // //   console.log(`✅ Created 4 categories`);

// // //   // =================================
// // //   // 3. Statusの作成
// // //   // =================================
// // //   console.log("📊 Creating statuses...");
// // //   const pendingStatus = await prisma.status.create({
// // //     data: { name: StatusType.PENDING },
// // //   });

// // //   const confirmStatus = await prisma.status.create({
// // //     data: { name: StatusType.CONFIRM },
// // //   });

// // //   const cookingStatus = await prisma.status.create({
// // //     data: { name: StatusType.COOKING },
// // //   });

// // //   const readyStatus = await prisma.status.create({
// // //     data: { name: StatusType.READY },
// // //   });

// // //   const servedStatus = await prisma.status.create({
// // //     data: { name: StatusType.SERVED },
// // //   });

// // //   console.log(`✅ Created 5 statuses`);

// // //   // =================================
// // //   // 4. Menuの作成
// // //   // =================================
// // //   console.log("🍽️ Creating menus...");

// // //   // セットメニュー
// // //   const setMenus = [
// // //     {
// // //       name: "ハンバーガーセット",
// // //       description: "ジューシーなハンバーガーとフライドポテト、ドリンクのセット",
// // //       image: "/images/hamburger-set.jpg",
// // //       price: 1200,
// // //       categoryId: setCategory.id,
// // //     },
// // //     {
// // //       name: "チキンカツセット",
// // //       description: "サクサクのチキンカツとライス、サラダのセット",
// // //       image: "/images/chicken-katsu-set.jpg",
// // //       price: 1100,
// // //       categoryId: setCategory.id,
// // //     },
// // //     {
// // //       name: "ステーキセット",
// // //       description: "200gステーキとライス、スープのセット",
// // //       image: "/images/steak-set.jpg",
// // //       price: 1800,
// // //       categoryId: setCategory.id,
// // //     },
// // //     {
// // //       name: "パスタセット",
// // //       description: "本格パスタとサラダ、パンのセット",
// // //       image: "/images/pasta-set.jpg",
// // //       price: 1300,
// // //       categoryId: setCategory.id,
// // //     },
// // //     {
// // //       name: "海鮮丼セット",
// // //       description: "新鮮な海鮮丼と味噌汁、小鉢のセット",
// // //       image: "/images/seafood-bowl-set.jpg",
// // //       price: 1500,
// // //       categoryId: setCategory.id,
// // //     },
// // //   ];

// // //   // 単品メニュー
// // //   const singleMenus = [
// // //     {
// // //       name: "ハンバーガー",
// // //       description: "ジューシーなビーフパティのハンバーガー",
// // //       image: "/images/hamburger.jpg",
// // //       price: 800,
// // //       categoryId: singleCategory.id,
// // //     },
// // //     {
// // //       name: "チキンカツ",
// // //       description: "サクサクのチキンカツ",
// // //       image: "/images/chicken-katsu.jpg",
// // //       price: 700,
// // //       categoryId: singleCategory.id,
// // //     },
// // //     {
// // //       name: "ステーキ",
// // //       description: "200gの柔らかステーキ",
// // //       image: "/images/steak.jpg",
// // //       price: 1500,
// // //       categoryId: singleCategory.id,
// // //     },
// // //     {
// // //       name: "パスタ（ボロネーゼ）",
// // //       description: "本格的なミートソースパスタ",
// // //       image: "/images/pasta-bolognese.jpg",
// // //       price: 900,
// // //       categoryId: singleCategory.id,
// // //     },
// // //     {
// // //       name: "海鮮丼",
// // //       description: "新鮮な海鮮がたっぷりの丼",
// // //       image: "/images/seafood-bowl.jpg",
// // //       price: 1200,
// // //       categoryId: singleCategory.id,
// // //     },
// // //   ];

// // //   // サイドメニュー
// // //   const sideMenus = [
// // //     {
// // //       name: "フライドポテト",
// // //       description: "カリッと揚げたフライドポテト",
// // //       image: "/images/french-fries.jpg",
// // //       price: 400,
// // //       categoryId: sideCategory.id,
// // //     },
// // //     {
// // //       name: "オニオンリング",
// // //       description: "サクサクのオニオンリング",
// // //       image: "/images/onion-rings.jpg",
// // //       price: 350,
// // //       categoryId: sideCategory.id,
// // //     },
// // //     {
// // //       name: "チキンナゲット",
// // //       description: "ジューシーなチキンナゲット（6個）",
// // //       image: "/images/chicken-nuggets.jpg",
// // //       price: 500,
// // //       categoryId: sideCategory.id,
// // //     },
// // //     {
// // //       name: "サラダ",
// // //       description: "新鮮野菜のミックスサラダ",
// // //       image: "/images/salad.jpg",
// // //       price: 300,
// // //       categoryId: sideCategory.id,
// // //     },
// // //     {
// // //       name: "ライス",
// // //       description: "ふっくら炊きたてご飯",
// // //       image: "/images/rice.jpg",
// // //       price: 200,
// // //       categoryId: sideCategory.id,
// // //     },
// // //     {
// // //       name: "スープ",
// // //       description: "本日のおすすめスープ",
// // //       image: "/images/soup.jpg",
// // //       price: 250,
// // //       categoryId: sideCategory.id,
// // //     },
// // //   ];

// // //   // ドリンク・デザートメニュー
// // //   const drinkMenus = [
// // //     {
// // //       name: "コーラ",
// // //       description: "冷たいコカ・コーラ",
// // //       image: "/images/cola.jpg",
// // //       price: 250,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //     {
// // //       name: "オレンジジュース",
// // //       description: "100%オレンジジュース",
// // //       image: "/images/orange-juice.jpg",
// // //       price: 300,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //     {
// // //       name: "コーヒー",
// // //       description: "こだわりのブレンドコーヒー",
// // //       image: "/images/coffee.jpg",
// // //       price: 400,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //     {
// // //       name: "紅茶",
// // //       description: "香り高いアールグレイティー",
// // //       image: "/images/tea.jpg",
// // //       price: 350,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //     {
// // //       name: "アイスクリーム",
// // //       description: "バニラアイスクリーム",
// // //       image: "/images/ice-cream.jpg",
// // //       price: 300,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //     {
// // //       name: "チーズケーキ",
// // //       description: "濃厚なニューヨークチーズケーキ",
// // //       image: "/images/cheesecake.jpg",
// // //       price: 450,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //     {
// // //       name: "チョコレートケーキ",
// // //       description: "リッチなチョコレートケーキ",
// // //       image: "/images/chocolate-cake.jpg",
// // //       price: 500,
// // //       categoryId: drinkCategory.id,
// // //     },
// // //   ];

// // //   // 各カテゴリのメニューを作成
// // //   for (const menuData of setMenus) {
// // //     await prisma.menu.create({ data: menuData });
// // //   }
// // //   console.log(`✅ Created ${setMenus.length} set menus`);

// // //   for (const menuData of singleMenus) {
// // //     await prisma.menu.create({ data: menuData });
// // //   }
// // //   console.log(`✅ Created ${singleMenus.length} single menus`);

// // //   for (const menuData of sideMenus) {
// // //     await prisma.menu.create({ data: menuData });
// // //   }
// // //   console.log(`✅ Created ${sideMenus.length} side menus`);

// // //   for (const menuData of drinkMenus) {
// // //     await prisma.menu.create({ data: menuData });
// // //   }
// // //   console.log(`✅ Created ${drinkMenus.length} drink/dessert menus`);

// // //   // =================================
// // //   // 5. サンプル注文の作成（デモ用）
// // //   // =================================
// // //   console.log("📝 Creating sample orders...");

// // //   // 取得したテーブルとメニューを使用
// // //   const createdTables = await prisma.table.findMany();
// // //   const createdMenus = await prisma.menu.findMany();

// // //   // サンプル注文1（テーブル1 - CONFIRM状態）
// // //   const sampleOrder1 = await prisma.order.create({
// // //     data: {
// // //       tableId: createdTables[0].id,
// // //       statusId: confirmStatus.id,
// // //       total: 2100,
// // //       orderItems: {
// // //         create: [
// // //           {
// // //             categoryId: setCategory.id,
// // //             menuId:
// // //               createdMenus.find((m) => m.name === "ハンバーガーセット")?.id ||
// // //               1,
// // //             statusId: confirmStatus.id,
// // //             quantity: 1,
// // //             price: 1200,
// // //           },
// // //           {
// // //             categoryId: drinkCategory.id,
// // //             menuId: createdMenus.find((m) => m.name === "コーラ")?.id || 2,
// // //             statusId: confirmStatus.id,
// // //             quantity: 2,
// // //             price: 250,
// // //           },
// // //           {
// // //             categoryId: sideCategory.id,
// // //             menuId:
// // //               createdMenus.find((m) => m.name === "フライドポテト")?.id || 3,
// // //             statusId: confirmStatus.id,
// // //             quantity: 1,
// // //             price: 400,
// // //           },
// // //         ],
// // //       },
// // //     },
// // //   });

// // //   // サンプル注文2（テーブル2 - COOKING状態）
// // //   const sampleOrder2 = await prisma.order.create({
// // //     data: {
// // //       tableId: createdTables[1].id,
// // //       statusId: cookingStatus.id,
// // //       total: 1800,
// // //       orderItems: {
// // //         create: [
// // //           {
// // //             categoryId: setCategory.id,
// // //             menuId:
// // //               createdMenus.find((m) => m.name === "ステーキセット")?.id || 4,
// // //             statusId: cookingStatus.id,
// // //             quantity: 1,
// // //             price: 1800,
// // //           },
// // //         ],
// // //       },
// // //     },
// // //   });

// // //   // サンプル注文3（テーブル3 - READY状態）
// // //   const sampleOrder3 = await prisma.order.create({
// // //     data: {
// // //       tableId: createdTables[2].id,
// // //       statusId: readyStatus.id,
// // //       total: 950,
// // //       orderItems: {
// // //         create: [
// // //           {
// // //             categoryId: singleCategory.id,
// // //             menuId:
// // //               createdMenus.find((m) => m.name === "パスタ（ボロネーゼ）")?.id ||
// // //               5,
// // //             statusId: readyStatus.id,
// // //             quantity: 1,
// // //             price: 900,
// // //           },
// // //           {
// // //             categoryId: sideCategory.id,
// // //             menuId: createdMenus.find((m) => m.name === "サラダ")?.id || 6,
// // //             statusId: readyStatus.id,
// // //             quantity: 1,
// // //             price: 300,
// // //           },
// // //         ],
// // //       },
// // //     },
// // //   });

// // //   console.log(`✅ Created 3 sample orders`);

// // //   // =================================
// // //   // 6. 作成されたデータの確認
// // //   // =================================
// // //   const tableCount = await prisma.table.count();
// // //   const categoryCount = await prisma.category.count();
// // //   const statusCount = await prisma.status.count();
// // //   const menuCount = await prisma.menu.count();
// // //   const orderCount = await prisma.order.count();
// // //   const orderItemCount = await prisma.orderItem.count();

// // //   console.log("\n📊 Seeding completed!");
// // //   console.log(`📋 Tables: ${tableCount}`);
// // //   console.log(`📂 Categories: ${categoryCount}`);
// // //   console.log(`📊 Statuses: ${statusCount}`);
// // //   console.log(`🍽️ Menus: ${menuCount}`);
// // //   console.log(`📝 Orders: ${orderCount}`);
// // //   console.log(`🛍️ Order Items: ${orderItemCount}`);

// // //   // 作成されたテーブルとステータスのIDを表示（デバッグ用）
// // //   console.log("\n📋 Created Tables:");
// // //   const allTables = await prisma.table.findMany();
// // //   allTables.forEach((table) => {
// // //     console.log(`  - ID: ${table.id}, Name: ${table.name}`);
// // //   });

// // //   console.log("\n📊 Created Statuses:");
// // //   const allStatuses = await prisma.status.findMany();
// // //   allStatuses.forEach((status) => {
// // //     console.log(`  - ID: ${status.id}, Name: ${status.name}`);
// // //   });

// // //   console.log("\n✅ Seeding finished successfully!");
// // // }

// // // main()
// // //   .catch((e) => {
// // //     console.error("❌ Seeding failed:", e);
// // //     process.exit(1);
// // //   })
// // //   .finally(async () => {
// // //     await prisma.$disconnect();
// // //   });

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

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 Seeding started...");

//   // 既存データを削除
//   await prisma.orderItem.deleteMany();
//   await prisma.order.deleteMany();
//   await prisma.menu.deleteMany();
//   await prisma.allergy.deleteMany();
//   await prisma.table.deleteMany();
//   await prisma.category.deleteMany();
//   await prisma.status.deleteMany();

//   // SQLiteのAUTOINCREMENTカウンターをリセット
//   await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('Table', 'Category', 'Status', 'Menu', 'Allergy', 'Order', 'OrderItem')`;

//   console.log("✅ Deleted all data and reset AUTO_INCREMENT counters");

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

//   // 単品メニュー (9個) - サイドメニューなし
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

//   // セットメニューのみにサイドメニューを関連付け
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

//   // テーブル作成
//   await prisma.table.createMany({
//     data: [
//       { name: "テーブル1" },
//       { name: "テーブル2" },
//       { name: "テーブル3" },
//       { name: "テーブル4" },
//     ],
//   });

//   console.log("✅ Seed completed!");

//   // 作成されたデータの確認
//   const menuCount = await prisma.menu.count();
//   const allergyCount = await prisma.allergy.count();
//   console.log(`📊 Created ${menuCount} menus and ${allergyCount} allergies`);
// }

// main()
//   .catch((e) => {
//     console.error("❌ Seeding failed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import {
//   PrismaClient,
//   CategoryType,
//   StatusType,
//   AllergyType,
// } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("🌱 マンタンフードサービス データ作成開始...");

//   // 既存データを削除
//   await prisma.orderItem.deleteMany();
//   await prisma.order.deleteMany();
//   await prisma.menu.deleteMany();
//   await prisma.allergy.deleteMany();
//   await prisma.table.deleteMany();
//   await prisma.category.deleteMany();
//   await prisma.status.deleteMany();

//   // SQLiteのAUTOINCREMENTカウンターをリセット
//   await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('Table', 'Category', 'Status', 'Menu', 'Allergy', 'Order', 'OrderItem')`;

//   console.log("✅ 既存データ削除完了");

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
//     prisma.allergy.create({
//       data: { name: AllergyType.SOY, displayName: "大豆", icon: "🫘" },
//     }),
//     prisma.allergy.create({
//       data: { name: AllergyType.FISH, displayName: "魚", icon: "🐟" },
//     }),
//   ]);

//   console.log("✅ カテゴリー・ステータス・アレルギー作成完了");

//   // =================================
//   // セットメニュー (9個) - ファミリーレストランの定番
//   // =================================
//   const setMenusData = [
//     {
//       name: "マンタンハンバーグセット",
//       description:
//         "自家製デミグラスソースの特製ハンバーグ。ライス・サラダ・スープ付き",
//       image: "hamburger_set.jpg",
//       price: 1180,
//       allergies: [allergies[0], allergies[1], allergies[2]], // 小麦、乳、卵
//     },
//     {
//       name: "鶏の唐揚げ定食",
//       description: "ジューシーな若鶏の唐揚げ6個。ご飯・味噌汁・小鉢・漬物付き",
//       image: "karaage_set.jpg",
//       price: 980,
//       allergies: [allergies[0], allergies[5]], // 小麦、大豆
//     },
//     {
//       name: "サーロインステーキセット",
//       description: "国産牛サーロイン150g。ライス・サラダ・コーンスープ付き",
//       image: "steak_set.jpg",
//       price: 1680,
//       allergies: [allergies[1]], // 乳
//     },
//     {
//       name: "海老フライ定食",
//       description:
//         "プリプリ海老フライ3本。ご飯・味噌汁・千切りキャベツ・小鉢付き",
//       image: "ebi_fry_set.jpg",
//       price: 1280,
//       allergies: [allergies[0], allergies[2], allergies[4]], // 小麦、卵、エビ・カニ
//     },
//     {
//       name: "チキン南蛮定食",
//       description:
//         "宮崎名物チキン南蛮。タルタルソースたっぷり。ご飯・味噌汁付き",
//       image: "chicken_nanban_set.jpg",
//       price: 1080,
//       allergies: [allergies[0], allergies[1], allergies[2]], // 小麦、乳、卵
//     },
//     {
//       name: "とんかつ定食",
//       description:
//         "サクサクのロースとんかつ。ご飯・味噌汁・千切りキャベツ・小鉢付き",
//       image: "tonkatsu_set.jpg",
//       price: 1180,
//       allergies: [allergies[0]], // 小麦
//     },
//     {
//       name: "焼肉カルビセット",
//       description: "ジューシーな牛カルビ焼肉。ライス・わかめスープ・サラダ付き",
//       image: "yakiniku_set.jpg",
//       price: 1380,
//       allergies: [allergies[5]], // 大豆
//     },
//     {
//       name: "ビーフカレーセット",
//       description: "コクのある特製ビーフカレー。サラダ・福神漬け付き",
//       image: "beef_curry_set.jpg",
//       price: 880,
//       allergies: [allergies[0]], // 小麦
//     },
//     {
//       name: "鮭の塩焼き定食",
//       description: "脂ののった鮭の塩焼き。ご飯・味噌汁・小鉢・漬物付き",
//       image: "salmon_set.jpg",
//       price: 980,
//       allergies: [allergies[5], allergies[6]], // 大豆、魚
//     },
//   ];

//   const setMenus = [];
//   for (const menuData of setMenusData) {
//     const menu = await prisma.menu.create({
//       data: {
//         name: menuData.name,
//         description: menuData.description,
//         image: menuData.image,
//         price: menuData.price,
//         categoryId: categories[0].id,
//         allergies: {
//           connect: menuData.allergies.map((allergy) => ({ id: allergy.id })),
//         },
//       },
//     });
//     setMenus.push(menu);
//   }

//   console.log("✅ セットメニュー作成完了");

//   // =================================
//   // 単品メニュー (9個) - 単品で注文できる主食
//   // =================================
//   const singleMenusData = [
//     {
//       name: "マンタンハンバーグ",
//       description: "自家製デミグラスソースの特製ハンバーグ",
//       image: "hamburger_single.jpg",
//       price: 780,
//       allergies: [allergies[0], allergies[1], allergies[2]], // 小麦、乳、卵
//     },
//     {
//       name: "鶏の唐揚げ",
//       description: "ジューシーな若鶏の唐揚げ6個",
//       image: "karaage_single.jpg",
//       price: 580,
//       allergies: [allergies[0]], // 小麦
//     },
//     {
//       name: "ナポリタンスパゲティ",
//       description: "懐かしい味のナポリタン。ソーセージ・ピーマン入り",
//       image: "napolitan.jpg",
//       price: 780,
//       allergies: [allergies[0]], // 小麦
//     },
//     {
//       name: "ミートソーススパゲティ",
//       description: "コクのある自家製ミートソース",
//       image: "meat_sauce.jpg",
//       price: 880,
//       allergies: [allergies[0]], // 小麦
//     },
//     {
//       name: "オムライス",
//       description: "ふわとろ卵のオムライス。ケチャップライス入り",
//       image: "omrice.jpg",
//       price: 880,
//       allergies: [allergies[1], allergies[2]], // 乳、卵
//     },
//     {
//       name: "親子丼",
//       description: "ふわふわ卵と鶏肉の親子丼",
//       image: "oyakodon.jpg",
//       price: 780,
//       allergies: [allergies[2], allergies[5]], // 卵、大豆
//     },
//     {
//       name: "牛丼",
//       description: "甘辛く煮込んだ牛肉丼",
//       image: "gyudon.jpg",
//       price: 680,
//       allergies: [allergies[5]], // 大豆
//     },
//     {
//       name: "カツ丼",
//       description: "サクサクとんかつと卵でとじたカツ丼",
//       image: "katsudon.jpg",
//       price: 880,
//       allergies: [allergies[0], allergies[2], allergies[5]], // 小麦、卵、大豆
//     },
//     {
//       name: "天丼",
//       description: "海老・野菜の天ぷら丼。特製天つゆ付き",
//       image: "tendon.jpg",
//       price: 980,
//       allergies: [allergies[0], allergies[2], allergies[4]], // 小麦、卵、エビ・カニ
//     },
//   ];

//   const singleMenus = [];
//   for (const menuData of singleMenusData) {
//     const menu = await prisma.menu.create({
//       data: {
//         name: menuData.name,
//         description: menuData.description,
//         image: menuData.image,
//         price: menuData.price,
//         categoryId: categories[1].id,
//         allergies: {
//           connect: menuData.allergies.map((allergy) => ({ id: allergy.id })),
//         },
//       },
//     });
//     singleMenus.push(menu);
//   }

//   console.log("✅ 単品メニュー作成完了");

//   // =================================
//   // サイドメニュー (6個) - 追加注文できるサイド
//   // =================================
//   const sideMenusData = [
//     {
//       name: "フライドポテト",
//       description: "カリッと揚げたフライドポテト",
//       image: "french_fries.jpg",
//       price: 380,
//       allergies: [],
//     },
//     {
//       name: "コーンサラダ",
//       description: "新鮮野菜とコーンのサラダ",
//       image: "corn_salad.jpg",
//       price: 320,
//       allergies: [],
//     },
//     {
//       name: "チキンナゲット",
//       description: "サクサクチキンナゲット5個",
//       image: "chicken_nuggets.jpg",
//       price: 480,
//       allergies: [allergies[0]], // 小麦
//     },
//     {
//       name: "ライス",
//       description: "ふっくら炊きたてご飯",
//       image: "rice.jpg",
//       price: 200,
//       allergies: [],
//     },
//     {
//       name: "味噌汁",
//       description: "わかめと豆腐の味噌汁",
//       image: "miso_soup.jpg",
//       price: 150,
//       allergies: [allergies[5]], // 大豆
//     },
//     {
//       name: "パン",
//       description: "焼きたてロールパン2個",
//       image: "bread.jpg",
//       price: 250,
//       allergies: [allergies[0], allergies[1], allergies[2]], // 小麦、乳、卵
//     },
//   ];

//   const sideMenus = [];
//   for (const menuData of sideMenusData) {
//     const menu = await prisma.menu.create({
//       data: {
//         name: menuData.name,
//         description: menuData.description,
//         image: menuData.image,
//         price: menuData.price,
//         categoryId: categories[2].id,
//         allergies: {
//           connect: menuData.allergies.map((allergy) => ({ id: allergy.id })),
//         },
//       },
//     });
//     sideMenus.push(menu);
//   }

//   console.log("✅ サイドメニュー作成完了");

//   // =================================
//   // ドリンク・デザート (6個) - ファミレス定番
//   // =================================
//   const drinkMenusData = [
//     {
//       name: "ドリンクバー",
//       description: "コーヒー・紅茶・ソフトドリンク飲み放題",
//       image: "drink_bar.jpg",
//       price: 280,
//       allergies: [],
//     },
//     {
//       name: "アイスコーヒー",
//       description: "香り豊かなアイスコーヒー",
//       image: "iced_coffee.jpg",
//       price: 320,
//       allergies: [],
//     },
//     {
//       name: "オレンジジュース",
//       description: "100%オレンジジュース",
//       image: "orange_juice.jpg",
//       price: 280,
//       allergies: [],
//     },
//     {
//       name: "バニラアイス",
//       description: "濃厚バニラアイスクリーム",
//       image: "vanilla_ice.jpg",
//       price: 320,
//       allergies: [allergies[1], allergies[2]], // 乳、卵
//     },
//     {
//       name: "チョコレートパフェ",
//       description: "チョコアイス・生クリーム・フルーツのパフェ",
//       image: "chocolate_parfait.jpg",
//       price: 580,
//       allergies: [allergies[1], allergies[2]], // 乳、卵
//     },
//     {
//       name: "アップルパイ",
//       description: "サクサクパイ生地の温かいアップルパイ",
//       image: "apple_pie.jpg",
//       price: 480,
//       allergies: [allergies[0], allergies[1], allergies[2]], // 小麦、乳、卵
//     },
//   ];

//   for (const menuData of drinkMenusData) {
//     await prisma.menu.create({
//       data: {
//         name: menuData.name,
//         description: menuData.description,
//         image: menuData.image,
//         price: menuData.price,
//         categoryId: categories[3].id,
//         allergies: {
//           connect: menuData.allergies.map((allergy) => ({ id: allergy.id })),
//         },
//       },
//     });
//   }

//   console.log("✅ ドリンク・デザートメニュー作成完了");

//   // =================================
//   // セットメニューにサイドメニューを関連付け
//   // =================================
//   // ハンバーグセット、唐揚げ定食、ステーキセットなどに
//   // 追加できるサイドメニューを設定
//   for (const setMenu of setMenus.slice(0, 7)) {
//     await prisma.menu.update({
//       where: { id: setMenu.id },
//       data: {
//         availableSides: {
//           connect: sideMenus.slice(0, 4).map((side) => ({ id: side.id })),
//         },
//       },
//     });
//   }

//   console.log("✅ セットメニューとサイドメニューの関連付け完了");

//   // =================================
//   // テーブル作成 - ファミレスらしい番号
//   // =================================
//   await prisma.table.createMany({
//     data: [
//       { name: "テーブル1" },
//       { name: "テーブル2" },
//       { name: "テーブル3" },
//       { name: "テーブル4" },
//       { name: "テーブル5" },
//       { name: "テーブル6" },
//       { name: "ソファー席A" },
//       { name: "ソファー席B" },
//       { name: "カウンター1" },
//       { name: "カウンター2" },
//       { name: "個室A" },
//       { name: "個室B" },
//     ],
//   });

//   console.log("✅ テーブル作成完了");

//   // =================================
//   // サンプル注文データ作成（営業中の雰囲気）
//   // =================================
//   const createdTables = await prisma.table.findMany();
//   const createdMenus = await prisma.menu.findMany();

//   // 注文1: ファミリー客 - テーブル1
//   await prisma.order.create({
//     data: {
//       tableId: createdTables[0].id,
//       statusId: statuses[1].id, // CONFIRM
//       total: 2840,
//       orderItems: {
//         create: [
//           {
//             categoryId: categories[0].id,
//             menuId: createdMenus.find(
//               (m) => m.name === "マンタンハンバーグセット"
//             )?.id!,
//             statusId: statuses[1].id,
//             quantity: 2,
//             price: 1180,
//           },
//           {
//             categoryId: categories[3].id,
//             menuId: createdMenus.find((m) => m.name === "ドリンクバー")?.id!,
//             statusId: statuses[1].id,
//             quantity: 2,
//             price: 280,
//           },
//           {
//             categoryId: categories[2].id,
//             menuId: createdMenus.find((m) => m.name === "フライドポテト")?.id!,
//             statusId: statuses[1].id,
//             quantity: 1,
//             price: 380,
//           },
//         ],
//       },
//     },
//   });

//   // 注文2: 学生グループ - ソファー席A
//   await prisma.order.create({
//     data: {
//       tableId: createdTables[6].id,
//       statusId: statuses[2].id, // COOKING
//       total: 2220,
//       orderItems: {
//         create: [
//           {
//             categoryId: categories[1].id,
//             menuId: createdMenus.find((m) => m.name === "オムライス")?.id!,
//             statusId: statuses[2].id,
//             quantity: 1,
//             price: 880,
//           },
//           {
//             categoryId: categories[0].id,
//             menuId: createdMenus.find((m) => m.name === "鶏の唐揚げ定食")?.id!,
//             statusId: statuses[2].id,
//             quantity: 1,
//             price: 980,
//           },
//           {
//             categoryId: categories[3].id,
//             menuId: createdMenus.find((m) => m.name === "チョコレートパフェ")
//               ?.id!,
//             statusId: statuses[2].id,
//             quantity: 1,
//             price: 580,
//           },
//         ],
//       },
//     },
//   });

//   // 注文3: 会社員ランチ - カウンター1
//   await prisma.order.create({
//     data: {
//       tableId: createdTables[8].id,
//       statusId: statuses[3].id, // READY
//       total: 1060,
//       orderItems: {
//         create: [
//           {
//             categoryId: categories[0].id,
//             menuId: createdMenus.find((m) => m.name === "ビーフカレーセット")
//               ?.id!,
//             statusId: statuses[3].id,
//             quantity: 1,
//             price: 880,
//           },
//           {
//             categoryId: categories[3].id,
//             menuId: createdMenus.find((m) => m.name === "アイスコーヒー")?.id!,
//             statusId: statuses[3].id,
//             quantity: 1,
//             price: 320,
//           },
//         ],
//       },
//     },
//   });

//   console.log("✅ サンプル注文データ作成完了");

//   // =================================
//   // 作成されたデータの確認
//   // =================================
//   const tableCount = await prisma.table.count();
//   const categoryCount = await prisma.category.count();
//   const statusCount = await prisma.status.count();
//   const menuCount = await prisma.menu.count();
//   const allergyCount = await prisma.allergy.count();
//   const orderCount = await prisma.order.count();
//   const orderItemCount = await prisma.orderItem.count();

//   console.log("\n🍽️ マンタンフードサービス データ作成完了！");
//   console.log("==========================================");
//   console.log(`📋 テーブル数: ${tableCount}`);
//   console.log(`📂 カテゴリー数: ${categoryCount}`);
//   console.log(`📊 ステータス数: ${statusCount}`);
//   console.log(`🍽️ メニュー数: ${menuCount}`);
//   console.log(`⚠️ アレルギー項目数: ${allergyCount}`);
//   console.log(`📝 注文数: ${orderCount}`);
//   console.log(`🛍️ 注文アイテム数: ${orderItemCount}`);
//   console.log("==========================================");

//   // メニュー詳細表示
//   console.log("\n📋 作成されたメニュー:");
//   const allMenus = await prisma.menu.findMany({
//     include: { category: true },
//     orderBy: { categoryId: "asc" },
//   });

//   let currentCategory = "";
//   allMenus.forEach((menu) => {
//     if (currentCategory !== menu.category.name) {
//       currentCategory = menu.category.name;
//       console.log(`\n【${currentCategory}】`);
//     }
//     console.log(`  - ${menu.name}: ¥${menu.price}`);
//   });

//   console.log(
//     "\n✅ ファミリーレストラン『マンタン』のデータ作成が完了しました！"
//   );
// }

// main()
//   .catch((e) => {
//     console.error("❌ データ作成に失敗しました:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

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
    prisma.category.create({ data: { name: CategoryType.RECOMMENDED } }),
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
  const setMenuNames = [
    "マンタンハンバーグ定食",
    "チキン南蛮定食",
    "とんかつ定食",
    "生姜焼き定食",
    "サバの味噌煮定食",
    "エビフライ定食",
    "唐揚げ定食",
    "ステーキ定食",
    "デミグラスハンバーグ定食",
  ];

  const setDescriptions = [
    "ジューシーなハンバーグとご飯、みそ汁、サラダのセット",
    "宮崎名物のチキン南蛮をマンタン風にアレンジ",
    "サクサクとんかつにキャベツとご飯がついたボリューム満点",
    "豚肉の生姜焼きが自慢の人気定食",
    "脂ののったサバを味噌で煮込んだ和の定番",
    "プリプリのエビフライが3本ついた贅沢定食",
    "外はカリッと中はジューシーな唐揚げ定食",
    "柔らかいステーキがメインの特別定食",
    "デミグラスソースが決め手のハンバーグ定食",
  ];

  const setMenus = [];
  for (let i = 0; i < 9; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: setMenuNames[i],
        description: setDescriptions[i],
        image: `set${i + 1}.jpg`,
        price: 1200 + (i + 1) * 100,
        categoryId: categories[0].id,
        isRecommended: i === 0, // 最初のメニューをおすすめに設定
        allergies: {
          connect: i <= 2 ? [{ id: allergies[0].id }] : [],
        },
      },
    });
    setMenus.push(menu);
  }

  // 単品メニュー (9個) - サイドメニューなし
  const singleMenuNames = [
    "マンタンハンバーグ",
    "若鶏の唐揚げ",
    "海老チリソース",
    "豚の角煮",
    "アジフライ",
    "チキンテリヤキ",
    "牛すじ煮込み",
    "イカリング",
    "鶏の照り焼き",
  ];

  const singleDescriptions = [
    "看板メニューの手ごねハンバーグ",
    "サクサク衣の若鶏唐揚げ",
    "プリプリエビのチリソース炒め",
    "とろとろに煮込んだ豚の角煮",
    "新鮮なアジを使った手作りフライ",
    "照り焼きソースが絡んだチキン",
    "じっくり煮込んだ牛すじの旨煮",
    "サクサクのイカリングフライ",
    "甘辛タレの鶏照り焼き",
  ];

  const singleMenus = [];
  for (let i = 0; i < 9; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: singleMenuNames[i],
        description: singleDescriptions[i],
        image: `single${i + 1}.jpg`,
        price: 800 + (i + 1) * 50,
        categoryId: categories[1].id,
        isRecommended: i === 0, // 最初のメニューをおすすめに設定
        allergies: {
          connect: i % 2 === 0 ? [{ id: allergies[1].id }] : [],
        },
      },
    });
    singleMenus.push(menu);
  }

  // サイドメニュー (6個)
  const sideMenuNames = [
    "フライドポテト",
    "コーンサラダ",
    "オニオンリング",
    "チキンナゲット",
    "ミニサラダ",
    "枝豆",
  ];

  const sideDescriptions = [
    "カリッと揚げたフライドポテト",
    "コーンたっぷりの彩りサラダ",
    "サクサクのオニオンリング",
    "お子様にも人気のチキンナゲット",
    "新鮮野菜のミニサラダ",
    "ビールのお供に最適な茹で枝豆",
  ];

  const sideMenus = [];
  for (let i = 0; i < 6; i++) {
    const menu = await prisma.menu.create({
      data: {
        name: sideMenuNames[i],
        description: sideDescriptions[i],
        image: `side${i + 1}.jpg`,
        price: 300 + (i + 1) * 50,
        categoryId: categories[2].id,
        isRecommended: i === 0, // 最初のメニューをおすすめに設定
      },
    });
    sideMenus.push(menu);
  }

  // ドリンク・デザート (6個)
  const drinkDessertNames = [
    "ドリンクバー",
    "生ビール",
    "フレッシュオレンジジュース",
    "マンタンパフェ",
    "チョコレートケーキ",
    "季節のアイスクリーム",
  ];

  const drinkDessertDescriptions = [
    "コーヒー、紅茶、ソフトドリンクが飲み放題",
    "キンキンに冷えた生ビール",
    "絞りたてのオレンジジュース",
    "マンタン自慢の特製パフェ",
    "濃厚なチョコレートケーキ",
    "季節の味が楽しめるアイスクリーム",
  ];

  for (let i = 0; i < 6; i++) {
    await prisma.menu.create({
      data: {
        name: drinkDessertNames[i],
        description: drinkDessertDescriptions[i],
        image: i <= 2 ? `drink${i + 1}.jpg` : `dessert${i - 2}.jpg`,
        price: i <= 2 ? 200 + (i + 1) * 50 : 400 + (i + 1) * 50,
        categoryId: categories[3].id,
        isRecommended: i === 0, // 最初のメニューをおすすめに設定
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
