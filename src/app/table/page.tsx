"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, X } from "lucide-react";
import { useAtom } from "jotai";
import { tableInfoAtom } from "@/atoms/atom";
import { useRouter } from "next/navigation";

const ModalPartySizeSelection = () => {
  const [selectedPartySize, setSelectedPartySize] = useState<number | null>(
    null
  );
  const [tableInfo, setTableInfo] = useAtom(tableInfoAtom);
  const router = useRouter();

  const partySizes = [
    { size: 1, label: "1名" },
    { size: 2, label: "2名" },
    { size: 3, label: "3名" },
    { size: 4, label: "4名" },
    { size: 5, label: "その他" },
  ];

  const handleConfirm = () => {
    if (selectedPartySize) {
      // テーブル情報を更新
      setTableInfo({
        ...tableInfo,
        partySize: selectedPartySize,
      });
      // ui_testページに遷移
      router.push("/tablet");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col relative"
        style={{
          width: "min(1280px, 95vw)",
          height: "min(800px, 80vh)",
        }}
      >
        {/* 上部バー */}
        <nav className="h-14 bg-red-600 text-white flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-bold">ファミリーレストラン</h1>
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
              ヘルプ
            </Button>
          </div>
        </nav>

        {/* メインコンテンツエリア */}
        <div className="flex-1 flex items-center justify-center p-8">
          {/* メインモーダル */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full backdrop-blur-sm border border-gray-200">
            {/* モーダルヘッダー */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">人数選択</h2>
                  <p className="text-gray-600 text-sm">
                    ご利用人数をお選びください
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* 人数選択ボタン */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {partySizes.map((party) => (
                <Button
                  key={party.size}
                  variant={
                    selectedPartySize === party.size ? "default" : "outline"
                  }
                  className={`h-24 text-lg font-semibold transition-all duration-200 rounded-xl ${
                    selectedPartySize === party.size
                      ? "bg-red-600 hover:bg-red-700 text-white scale-105 shadow-lg border-red-600"
                      : "border-2 border-gray-200 hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                  onClick={() => setSelectedPartySize(party.size)}
                >
                  {party.label}
                </Button>
              ))}
            </div>

            {/* 選択状況表示 */}
            {selectedPartySize && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">
                        {
                          partySizes.find((p) => p.size === selectedPartySize)
                            ?.label
                        }
                        でのご利用
                      </p>
                      <p className="text-sm text-red-600">
                        お席の準備をいたします
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1 h-12 text-gray-600 border-gray-300"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!selectedPartySize}
                className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                メニューを見る
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* 注意事項 */}
            <div className="mt-6 text-center text-xs text-gray-500">
              ※
              その他を選択された場合は、お席の準備にお時間をいただく場合がございます
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPartySizeSelection;
