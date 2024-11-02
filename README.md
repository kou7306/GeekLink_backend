# GeekLink_backend

**※Go から Express に移行中※**

[Go の GitHub リポジトリ](https://github.com/kou7306/GeekLink_backend_past)

技育 CAMP ハッカソン vol.5 - 努力賞

発表資料：[Canva のリンク](https://www.canva.com/design/DAGFpnB6UTc/_CiSpofUMxP8fqbeQQ03ag/view?utm_content=DAGFpnB6UTc&utm_campaign=designshare&utm_medium=link&utm_source=editor)

# DB のスキーマ更新方法

まず、supabase の GUI 上で変更

ターミナルで開発プロジェクトのバックエンドのディレクトリに移動する

Supabase の変更を Prisma のスキーマに反映させる

```
npx prisma db pull
```

prisma/schema.prisma ファイルに自動で反映されていることを確認

更新されたスキーマに基づいて、Prisma のクライアントを再生成する

```
npx prisma generate
```

models ディレクトリの中の type の定義を修正する（もしくは追加）

↓↓ テーブルを追加した場合のみ
src/types/database.ts に追加する

データベースの反映完了。
routes や controllers で models/から型定義を呼び出して開発
