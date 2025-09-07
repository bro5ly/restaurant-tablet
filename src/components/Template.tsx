import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Template = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
        style={{
          width: "min(1280px, 95vw)",
          height: "min(800px, 80vh)",
        }}
      >
        <nav className="h-14 bg-red-600 text-white flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold">店舗名</h1>
            <span className="text-sm bg-red-700 px-2 py-1 rounded">
              テーブル 1
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
            >
              ホーム
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
            >
              注文履歴
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-700"
            >
              ヘルプ
            </Button>
          </div>
        </nav>

        {/* ヘッダー */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-100 ">
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              メイン
            </Button>
            <Button variant="ghost" size="sm">
              サイド
            </Button>
            <Button variant="ghost" size="sm">
              ドリンク
            </Button>
            <Button variant="ghost" size="sm">
              デザート
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              設定
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              店員を呼ぶ
            </Button>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          {/* メインコンテンツ */}
          <main className="flex-1 p-10 overflow-y-auto">
            {/* 左スワイプボタン */}
            <Button
              variant="outline"
              size="sm"
              className="absolute left-30 top-1/2 -translate-y-1/2 z-10 w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            {/* 右スワイプボタン */}
            <Button
              variant="outline"
              size="sm"
              className="absolute right-110 top-1/2 -translate-y-1/2 z-10 w-10 h-10 p-0 bg-white/80 hover:bg-white shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <div className="grid grid-cols-2 gap-6 mx-16 my-8 content-center">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow flex">
                {/* 左側：画像 */}
                <div className="w-1/2 flex items-center justify-center">
                  <div className="text-6xl">🍖</div>
                </div>
                {/* 右側：商品情報 */}
                <div className="w-1/2 flex flex-col justify-center space-y-2 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-lg">ハンバーグ定食</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    ジューシーなハンバーグとライス、サラダのセット
                  </p>

                  <p className="text-red-600 font-bold text-xl">
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full mr-5">
                      メイン
                    </span>
                    ¥980
                  </p>
                </div>
              </div>

              {/* メニューアイテム2 */}
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow flex">
                <div className="w-1/2 flex items-center justify-center">
                  <div className="text-6xl">🐔</div>
                </div>
                <div className="w-1/2 flex flex-col justify-center space-y-2 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-lg">チキン南蛮</h3>
                  </div>

                  <p className="text-gray-600 text-sm">
                    サクサクのチキンに甘酢ダレとタルタルソース
                  </p>
                  <p className="text-red-600 font-bold text-xl">
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full mr-5">
                      メイン
                    </span>
                    ¥1080
                  </p>
                </div>
              </div>

              {/* メニューアイテム3 */}
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow flex">
                <div className="w-1/2 flex items-center justify-center">
                  <div className="text-6xl">🍝</div>
                </div>
                <div className="w-1/2 flex flex-col justify-center space-y-2 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-lg">パスタセット</h3>
                  </div>

                  <p className="text-gray-600 text-sm">
                    本格パスタとサラダ、パンのセット
                  </p>
                  <p className="text-red-600 font-bold text-xl">
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full mr-5">
                      メイン
                    </span>
                    ¥850
                  </p>
                </div>
              </div>

              {/* メニューアイテム4 */}
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow flex">
                <div className="w-1/2 flex items-center justify-center">
                  <div className="text-6xl">🥩</div>
                </div>
                <div className="w-1/2 flex flex-col justify-center space-y-2 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-lg">ステーキ</h3>
                  </div>

                  <p className="text-gray-600 text-sm">
                    200g厚切りステーキとライス、スープ
                  </p>
                  <p className="text-red-600 font-bold text-xl">
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full mr-5">
                      メイン
                    </span>
                    ¥1480
                  </p>
                </div>
              </div>
            </div>
          </main>

          {/* 右サイドバー */}
          <aside className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h3 className="font-bold text-lg">ご注文詳細</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {/* 注文アイテム1 */}
                <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                  <div className="flex-1">
                    <div className="font-medium text-sm">ハンバーグ定食</div>
                    <div className="text-xs text-gray-600">¥980</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 border-gray-100"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">1</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 border-gray-100"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* 注文アイテム2 */}
                <div className="flex justify-between items-center p-3 bg-white rounded border border-gray-200">
                  <div className="flex-1">
                    <div className="font-medium text-sm">ドリンクバー</div>
                    <div className="text-xs text-gray-600">¥280</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 border-gray-100"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">1</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 border-gray-100"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>合計</span>
                <span>¥1,260</span>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white mb-3">
                注文確定 (2品)
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  決済
                </Button>
                <Button variant="outline" className="flex-1">
                  注文履歴
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Template;
