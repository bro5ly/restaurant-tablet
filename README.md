# ファミレス「マンタン」注文・キッチン管理アプリ

学校の授業課題として、架空のファミリーレストラン「マンタン」のタブレット用注文UIをチームで制作しました。  
私はバックエンドとフロントエンドの双方を担当し、API / DB 設計やフロントとの連携を意識して開発しました。  

---

## 🎥 デモ
![Videotogif](https://github.com/user-attachments/assets/8e3f4f23-c30f-4949-ac40-1092ba9c1fb4)

![Videotogif (1)](https://github.com/user-attachments/assets/fa9d5029-047f-47c5-bc47-54ffbeda73bf)

---<img width="1470" height="956" alt="スクリーンショット 2025-09-17 3 45 13" src="https://github.com/user-attachments/assets/d44a0d04-aad0-408e-87b1-26e53803c266" />

<img width="1470" height="956" alt="スクリーンショット 2025-09-17 3 45 28" src="https://github.com/user-attachments/assets/7ca3af04-a854-4cb6-a987-0817a8254294" />

<img width="1470" height="956" alt="スクリーンショット 2025-09-17 3 45 52" src="https://github.com/user-attachments/assets/aa04427b-bb75-46db-adeb-0b5960cd0e6d" />

## 🚀 使い方

1. リポジトリをクローン
   git clone https://github.com/username/repository.git
   cd repository

依存関係をインストール
npm install

環境変数ファイルを作成し、ルートに配置
.env
DATABASE_URL="file:./dev.db"

Prisma の設定
npx prisma generate

WebSocket サーバー起動
npx tsx websocket-server.ts

開発サーバー起動
npm run dev


🛠 使用技術
フロントエンド: Next.js

バックエンド: Next.js API Routes

データベース: SQLite (Prisma ORM)

リアルタイム通信: WebSocket

✨ 主な機能
タブレットからの注文機能

キッチン画面での注文確認

メニュー一覧・カテゴリ分け

シンプルな UI を意識した実装

📚 学んだこと
APIとDBの流れを体系的に理解し、実際に実装できた

DB設計の重要性を実感（必要なエンティティの洗い出しを最初にしっかり行わないと後悔する）

ユーザー体験を具体的に想像すると設計が進めやすい

機能を「フロントでやるか / バックでやるか」迷う場面も多く、分離の大切さを学んだ

型定義や API/DB 設計をしっかりしておくことで開発がスムーズになると体感した

🔮 今後の改善点
予約機能の追加

細かいボタン操作やエラーハンドリングの改善

QRコードを用いたスマホからの注文対応

無料枠サーバーを使ったデプロイ

👤 作者 / 学生
最近 API や DB 設計の学習を始め、本アプリで実践しました。
