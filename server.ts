export async function broadcast(message: string) {
  try {
    const response = await fetch("http://localhost:3001/broadcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      console.log("ブロードキャスト成功:", message);
    } else {
      console.log("ブロードキャスト失敗:", response.status);
    }
  } catch (error) {
    console.log("ブロードキャストエラー:", error);
  }
}
