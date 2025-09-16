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
        image: i < 4 ? `/images/set${i + 1}.jpg` : `set${i + 1}.jpg`,
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
