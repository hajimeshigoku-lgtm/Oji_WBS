import { useState, useEffect } from "react";

const INITIAL_TASKS = [{"id":1,"l1":"アウトプットイメージ確定","l2":"最終成果物の形式定義","title":"スコアカード形式の確定","desc":"評価軸（TRL/MRL/市場規模/補助金/競合差別化/自社ケイパ）×テーマの表形式を決定する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":2,"l1":"アウトプットイメージ確定","l2":"最終成果物の形式定義","title":"レーダーチャートの採否判断","desc":"6軸レーダーチャートをアウトプットに含めるか、含める場合の軸定義を確定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":3,"l1":"アウトプットイメージ確定","l2":"最終成果物の形式定義","title":"セグメント判定ラベルの設計","desc":"「推奨：早期事業化」「条件付き進行」「アライアンス前提」「見送り」の4段階ラベルを仮定義し、判定条件（点数閾値）を決める","priority":"最高","status":"未着手","assignee":"","due":""},{"id":4,"l1":"アウトプットイメージ確定","l2":"最終成果物の形式定義","title":"1枚サマリーシートの構成確定","desc":"テーマ名・スコア合計・判定ラベル・主要ギャップの4点を1枚に収めるレイアウトを決定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":5,"l1":"アウトプットイメージ確定","l2":"意思決定フローの設計","title":"スコア閾値×アクション対応表の作成","desc":"合計スコアが何点以上なら事業化推進、何点以上ならPoC先行、何点以下なら見送り、という閾値とアクションの対応表を作成する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":6,"l1":"アウトプットイメージ確定","l2":"意思決定フローの設計","title":"セグメント別の次アクション定義","desc":"「推奨」「条件付き」「アライアンス」「見送り」の各セグメントで、次に踏むべきアクションを具体的に定義する（例：PoCの設計、提携先候補のリストアップ等）","priority":"高","status":"未着手","assignee":"","due":""},{"id":7,"l1":"アウトプットイメージ確定","l2":"意思決定フローの設計","title":"経営報告フォーマットとの接続設計","desc":"スコアカードの出力が既存の経営会議・稟議フォーマットとどう接続されるかを整理する","priority":"中","status":"未着手","assignee":"","due":""},{"id":8,"l1":"評価軸・スコアリングロジック設計","l2":"TRL評価ロジックの詳細化","title":"TRLスケール定義の確定（1〜9）","desc":"環境省TRLマニュアルと自社活用版の差分を踏まえ、王子HD向けTRL定義（1〜9段階）を確定する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":9,"l1":"評価軸・スコアリングロジック設計","l2":"TRL評価ロジックの詳細化","title":"TRL判定に必要な社内エビデンス一覧化","desc":"各TRLレベルで必要なエビデンス（特許・実験データ・論文・試作実績等）を一覧化する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":10,"l1":"評価軸・スコアリングロジック設計","l2":"TRL評価ロジックの詳細化","title":"TRLと点数の対応ルール設定","desc":"TRL1〜9を評価スコア1〜5点にどう変換するか（例：TRL1-2→1点、TRL3-4→2点等）のルールを決定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":11,"l1":"評価軸・スコアリングロジック設計","l2":"TRL評価ロジックの詳細化","title":"市場全体TRL vs 王子HD固有TRLの分離設計","desc":"市場全体の技術水準と王子HDの技術水準を別々に算出し、ギャップ（追いつき距離）を可視化する設計をする","priority":"高","status":"未着手","assignee":"","due":""},{"id":12,"l1":"評価軸・スコアリングロジック設計","l2":"MRL評価ロジックの詳細化","title":"MRLスケール定義の確定（1〜10）","desc":"王子HD向けMRL定義（1〜10段階）を確定する。既存製造ラインの転用可否・パイロット実績・量産実績を軸に定義する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":13,"l1":"評価軸・スコアリングロジック設計","l2":"MRL評価ロジックの詳細化","title":"MRL判定に必要な設備・製造情報の特定","desc":"どの工場・設備情報があればMRLを判定できるかを特定する（例：阿南工場・米子工場の設備スペック・歩留まりデータ等）","priority":"最高","status":"未着手","assignee":"","due":""},{"id":14,"l1":"評価軸・スコアリングロジック設計","l2":"MRL評価ロジックの詳細化","title":"MRLと点数の対応ルール設定","desc":"MRL1〜10を評価スコア1〜5点に変換するルールを決定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":15,"l1":"評価軸・スコアリングロジック設計","l2":"市場・外部環境評価ロジックの詳細化","title":"市場規模スコアリング基準の設定","desc":"市場規模（TAM）をどの閾値でスコア化するかを決定する（例：1兆円以上→5点、1000億円以上→4点等）","priority":"高","status":"未着手","assignee":"","due":""},{"id":16,"l1":"評価軸・スコアリングロジック設計","l2":"市場・外部環境評価ロジックの詳細化","title":"CAGR（成長率）スコアリング基準の設定","desc":"CAGRの何%以上を何点とするかの基準を設定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":17,"l1":"評価軸・スコアリングロジック設計","l2":"市場・外部環境評価ロジックの詳細化","title":"補助金・政策スコアリング基準の確定","desc":"日・米・欧・中4地域×3軸（法的裏付け・支援規模・大型PJ）のスコアリングルールを確定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":18,"l1":"評価軸・スコアリングロジック設計","l2":"市場・外部環境評価ロジックの詳細化","title":"競合差別化スコアリング基準の設計","desc":"同業他社（住友化学・旭化成等）と比較して王子HDが差別化できる度合いをどう1〜5点化するかを設計する","priority":"高","status":"未着手","assignee":"","due":""},{"id":19,"l1":"評価軸・スコアリングロジック設計","l2":"自社フィージビリティ評価ロジックの詳細化","title":"自社ケイパビリティ評価軸の定義","desc":"全社戦略との紐付け・自社アセット（特許・設備・人材）の3軸でケイパビリティを評価する軸を定義する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":20,"l1":"評価軸・スコアリングロジック設計","l2":"自社フィージビリティ評価ロジックの詳細化","title":"「ケイパありスコア」vs「ケイパなしスコア」の分岐設計","desc":"自社ケイパがある場合とない場合で総合スコアの計算式を変えるか、それとも共通式にするかを決定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":21,"l1":"評価軸・スコアリングロジック設計","l2":"自社フィージビリティ評価ロジックの詳細化","title":"事業化速度スコアの設計","desc":"TTI（商用化までの年数）を何年以内なら何点、という基準を設定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":22,"l1":"スコアリング統合・重み付け設計","l2":"重み付け係数の設計","title":"評価軸ごとの重み係数の初期設定","desc":"例：TRL×0.25 + MRL×0.20 + 市場規模×0.20 + CAGR×0.10 + 補助金×0.10 + 競合差別化×0.10 + 自社ケイパ×0.05 等の初期値を設定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":23,"l1":"スコアリング統合・重み付け設計","l2":"重み付け係数の設計","title":"重みの感度分析（シナリオ別試算）","desc":"重み係数を変えたときに判定結果がどう変わるかを2〜3シナリオで試算し、判定の安定性を確認する","priority":"中","status":"未着手","assignee":"","due":""},{"id":24,"l1":"スコアリング統合・重み付け設計","l2":"重み付け係数の設計","title":"最終的な重み付けの合意形成","desc":"坂本さん・R&D部門長との合意を経て重み付けを確定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":25,"l1":"スコアリング統合・重み付け設計","l2":"総合スコアとセグメントの接続設計","title":"総合スコアの算出式の確定","desc":"各軸スコア×重み係数の合計式を確定し、最大・最小値を定義する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":26,"l1":"スコアリング統合・重み付け設計","l2":"総合スコアとセグメントの接続設計","title":"セグメント閾値の数値決定","desc":"「推奨」「条件付き」「アライアンス」「見送り」それぞれの総合スコア閾値を数値で決定する（例：4.0以上→推奨）","priority":"最高","status":"未着手","assignee":"","due":""},{"id":27,"l1":"スコアリング統合・重み付け設計","l2":"総合スコアとセグメントの接続設計","title":"9点と10点の差・1点と2点の差の定義","desc":"隣接スコア間の意味の違いを言語化する。「なぜ9点でなく10点か」を答えられるよう各点の定義を記述する","priority":"高","status":"未着手","assignee":"","due":""},{"id":28,"l1":"実テーマ検証・キャリブレーション","l2":"パイロット評価の実施","title":"CNFナノコンポジット包材への試適用","desc":"設計したスコアリングロジックをCNFナノコンポジット包材テーマに実際に適用し、スコアを算出する","priority":"高","status":"未着手","assignee":"","due":""},{"id":29,"l1":"実テーマ検証・キャリブレーション","l2":"パイロット評価の実施","title":"固体電池セパレータへの試適用","desc":"固体電池セパレータテーマに試適用し、TRL2・MRL1という低成熟度テーマでのスコア算出が妥当かを検証する","priority":"高","status":"未着手","assignee":"","due":""},{"id":30,"l1":"実テーマ検証・キャリブレーション","l2":"パイロット評価の実施","title":"微多孔断熱シートへの試適用","desc":"微多孔断熱シートテーマ（TRL6・MRL5）への試適用で、高成熟度テーマが「早期事業化推奨」に正しく判定されるかを確認する","priority":"高","status":"未着手","assignee":"","due":""},{"id":31,"l1":"実テーマ検証・キャリブレーション","l2":"キャリブレーション・調整","title":"スコア結果の妥当性検証","desc":"試適用した3テーマのスコアと判定結果が、担当者の直感・過去の議論と整合しているかを確認する","priority":"高","status":"未着手","assignee":"","due":""},{"id":32,"l1":"実テーマ検証・キャリブレーション","l2":"キャリブレーション・調整","title":"違和感があった場合の評価軸・重みの調整","desc":"妥当性検証で違和感が出た箇所を特定し、評価軸の定義または重み係数を調整する","priority":"高","status":"未着手","assignee":"","due":""},{"id":33,"l1":"実テーマ検証・キャリブレーション","l2":"キャリブレーション・調整","title":"調整後の再試算と最終確定","desc":"調整したロジックで全テーマを再スコアリングし、結果を確定する","priority":"高","status":"未着手","assignee":"","due":""},{"id":34,"l1":"AIエージェント組み込み設計","l2":"プロンプト設計","title":"TRL/MRL自動判定プロンプトの設計","desc":"社内エビデンス（月報・特許データ）を入力としてTRL・MRLを自動判定するエージェントのプロンプトを設計する","priority":"中","status":"未着手","assignee":"","due":""},{"id":35,"l1":"AIエージェント組み込み設計","l2":"プロンプト設計","title":"市場・補助金スコア自動算出プロンプトの設計","desc":"市場規模・CAGR・補助金動向を調査してスコアを自動算出するエージェントのプロンプトを設計する","priority":"中","status":"未着手","assignee":"","due":""},{"id":36,"l1":"AIエージェント組み込み設計","l2":"プロンプト設計","title":"統合スコアカード生成プロンプトの設計","desc":"各評価軸のスコアを統合して最終スコアカードとセグメント判定を自動生成するプロンプトを設計する","priority":"中","status":"未着手","assignee":"","due":""},{"id":37,"l1":"AIエージェント組み込み設計","l2":"出力品質の担保設計","title":"AIアウトプットの根拠表示設計","desc":"藤村さん指摘対応：各スコアの根拠（参照した情報源・データ）をAIが明示するよう出力フォーマットを設計する","priority":"高","status":"未着手","assignee":"","due":""},{"id":38,"l1":"AIエージェント組み込み設計","l2":"出力品質の担保設計","title":"ヒューマン・イン・ザ・ループの設計確定","desc":"AIが判定案を出す→担当者が確認・修正→最終スコア確定、という承認フローを設計する","priority":"高","status":"未着手","assignee":"","due":""},{"id":39,"l1":"業務フロー設計（出口）","l2":"現状把握：小林くん作成業務フローのレビュー","title":"業務フロー資料の入手・読み込み","desc":"小林くんが作成している業務フロー資料を入手し、記載されている意思決定の流れ・登場人物・タイミングを把握する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":40,"l1":"業務フロー設計（出口）","l2":"現状把握：小林くん作成業務フローのレビュー","title":"業務フロー上の意思決定ポイントの列挙","desc":"資料内で「誰が・何を判断するか」が発生している箇所を全て抽出し、意思決定ポイント一覧表を作る","priority":"最高","status":"未着手","assignee":"","due":""},{"id":41,"l1":"業務フロー設計（出口）","l2":"現状把握：小林くん作成業務フローのレビュー","title":"スコアリングアウトプットとの対応づけ","desc":"抽出した意思決定ポイントそれぞれに対して、先に定義したスコアカード・セグメント判定のどの情報が必要かを紐付ける","priority":"高","status":"未着手","assignee":"","due":""},{"id":42,"l1":"業務フロー設計（出口）","l2":"乖離確認：本来の2B業務イメージとの照合","title":"自社が持つ本来の2B業務イメージの言語化","desc":"プロジェクト開始前に持っていた「R&Dテーマ創出における意思決定はこうあるべき」という業務イメージを改めて言語化・文書化する。小林くん資料に引っ張られる前の原形として記録する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":43,"l1":"業務フロー設計（出口）","l2":"乖離確認：本来の2B業務イメージとの照合","title":"業務フロー資料との乖離点の特定","desc":"言語化した2B業務イメージと小林くん資料を比較し、「誰が判断するか」「いつ判断するか」「どんな情報が必要か」の3点で乖離している箇所を特定する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":44,"l1":"業務フロー設計（出口）","l2":"乖離確認：本来の2B業務イメージとの照合","title":"乖離の原因分類（設計ミス／情報不足／前提違い）","desc":"乖離が「設計上の問題」なのか「情報が足りなかった」のか「そもそも前提が違う」のかを分類し、修正の優先度を判断する","priority":"高","status":"未着手","assignee":"","due":""},{"id":45,"l1":"業務フロー設計（出口）","l2":"乖離確認：本来の2B業務イメージとの照合","title":"乖離確認結果のレビュー依頼（誰に・いつ）","desc":"乖離確認の結果を坂本さんもしくはR&D部門長にレビューしてもらうタイミングと形式を決定する。レビュー前に乖離一覧表を準備する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":46,"l1":"業務フロー設計（出口）","l2":"業務フロー修正・確定","title":"乖離を踏まえた業務フロー修正案の作成","desc":"乖離確認・レビュー結果を踏まえて、本来の2B業務イメージに沿った業務フローの修正案を作成する","priority":"高","status":"未着手","assignee":"","due":""},{"id":47,"l1":"業務フロー設計（出口）","l2":"業務フロー修正・確定","title":"修正案の意思決定ポイント再整理","desc":"修正後の業務フローで「誰が・いつ・どの情報で」判断するかを再整理し、最終的な意思決定フロー図として確定させる","priority":"高","status":"未着手","assignee":"","due":""},{"id":48,"l1":"業務フロー設計（出口）","l2":"業務フロー修正・確定","title":"確定フローの関係者合意取得（誰に・いつ）","desc":"修正・確定した業務フローを坂本さん・小林くん・関係する事業部門に確認してもらい、合意を取得する。合意取得のスケジュールを事前に設定する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":49,"l1":"画面要求定義（機能要件）","l2":"現状把握：高田さん作成モックのレビュー","title":"モック資料の入手・画面構成の把握","desc":"高田さんが制作しているモックを入手し、どんな画面が・どんな順序で・どんな情報を表示する設計になっているかを把握する","priority":"高","status":"未着手","assignee":"","due":""},{"id":50,"l1":"画面要求定義（機能要件）","l2":"現状把握：高田さん作成モックのレビュー","title":"モック上の画面一覧と機能の列挙","desc":"モックに含まれる画面を全て列挙し、各画面でユーザーが実行できる操作・表示される情報を一覧化する","priority":"高","status":"未着手","assignee":"","due":""},{"id":51,"l1":"画面要求定義（機能要件）","l2":"現状把握：高田さん作成モックのレビュー","title":"業務フローとモック画面の対応づけ","desc":"確定した業務フローの各ステップ（意思決定ポイント含む）と、モックのどの画面が対応するかを紐付ける","priority":"高","status":"未着手","assignee":"","due":""},{"id":52,"l1":"画面要求定義（機能要件）","l2":"乖離確認：2B業務イメージ・業務フローとモックの照合","title":"2B業務イメージから必要な機能の一覧化","desc":"本来の業務フロー・2B業務イメージから、システムに必要な機能を自ら一覧化する。モックに引っ張られず、「業務上これができないといけない」という視点で洗い出す","priority":"最高","status":"未着手","assignee":"","due":""},{"id":53,"l1":"画面要求定義（機能要件）","l2":"乖離確認：2B業務イメージ・業務フローとモックの照合","title":"モックと機能一覧の乖離確認（不足・過剰・相違）","desc":"業務起点で定義した機能一覧とモックの機能を比較し、①モックにあるが業務上不要な機能、②業務上必要だがモックにない機能、③機能はあるが設計が業務イメージと違うものを特定する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":54,"l1":"画面要求定義（機能要件）","l2":"乖離確認：2B業務イメージ・業務フローとモックの照合","title":"乖離の優先度分類（必須／推奨／将来対応）","desc":"乖離した機能について、今フェーズで対応必須のもの・推奨のもの・将来フェーズに先送りするものを分類する","priority":"高","status":"未着手","assignee":"","due":""},{"id":55,"l1":"画面要求定義（機能要件）","l2":"機能要件の定義","title":"必須機能の要件定義（機能名・入力・処理・出力）","desc":"「必須」に分類した機能について、機能名・入力データ・処理内容・出力（表示・ダウンロード等）を定義する。スコアカード表示・セグメント判定・意思決定フロー表示を最優先とする","priority":"最高","status":"未着手","assignee":"","due":""},{"id":56,"l1":"画面要求定義（機能要件）","l2":"機能要件の定義","title":"スコアリング結果表示機能の要件定義","desc":"スコアカード・レーダーチャート・セグメント判定結果を画面上でどう表示するかを定義する。入力元データ・更新タイミング・フィルタ条件も含める","priority":"最高","status":"未着手","assignee":"","due":""},{"id":57,"l1":"画面要求定義（機能要件）","l2":"機能要件の定義","title":"意思決定支援情報の表示機能の要件定義","desc":"「推奨」「条件付き」「アライアンス」「見送り」のセグメント別に、次アクション・主要ギャップ・根拠情報を表示する機能の要件を定義する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":58,"l1":"画面要求定義（機能要件）","l2":"機能要件の定義","title":"AIアウトプット根拠表示機能の要件定義","desc":"AIが出したスコア・判定の根拠（参照情報源・データ）を確認できる機能の要件を定義する。研究者が自ら検証できる設計にする","priority":"高","status":"未着手","assignee":"","due":""},{"id":59,"l1":"画面要求定義（機能要件）","l2":"機能要件のレビュー・確認スケジュール","title":"機能要件一覧のレビュー依頼先・タイミングの確定","desc":"定義した機能要件を誰に（坂本さん／R&D担当者／高田さん）・いつまでに確認してもらうかのスケジュールを確定する","priority":"最高","status":"未着手","assignee":"","due":""},{"id":60,"l1":"画面要求定義（機能要件）","l2":"機能要件のレビュー・確認スケジュール","title":"高田さんへの乖離フィードバック形式の決定","desc":"機能要件のレビュー結果をどんな形式で高田さんにフィードバックするかを決める（コメント形式・差分一覧・修正依頼書等）","priority":"高","status":"未着手","assignee":"","due":""},{"id":61,"l1":"画面要求定義（機能要件）","l2":"機能要件のレビュー・確認スケジュール","title":"機能要件確定後の合意取得（誰に・いつ）","desc":"レビュー・修正を経て最終的に確定した機能要件を、坂本さん含む関係者に合意取得するタイミングと方法を定める","priority":"最高","status":"未着手","assignee":"","due":""}];

const STORAGE_KEY = "oji_tasks_v2";
const PC = { "最高":{c:"#DC2626",bg:"#FEF2F2",bd:"#FECACA"}, "高":{c:"#D97706",bg:"#FFFBEB",bd:"#FDE68A"}, "中":{c:"#16A34A",bg:"#F0FDF4",bd:"#BBF7D0"} };
const SC = { "未着手":{bg:"#F1F5F9",c:"#64748B"}, "進行中":{bg:"#EFF6FF",c:"#2563EB"}, "完了":{bg:"#F0FDF4",c:"#16A34A"}, "保留":{bg:"#FFF7ED",c:"#EA580C"} };
const STATUSES = ["未着手","進行中","完了","保留"];

const s = {
  wrap: { fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", padding:"20px", maxWidth:920, margin:"0 auto", color:"#1a1a1a" },
  card: { background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"10px 14px" },
  inp: { fontSize:12, padding:"5px 8px", borderRadius:6, border:"1px solid #d1d5db", background:"#fff", color:"#1a1a1a", width:"100%", outline:"none" },
  badge: (bg,c,bd) => ({ fontSize:10, padding:"1px 6px", borderRadius:4, background:bg, color:c, border:`1px solid ${bd||bg}`, flexShrink:0, whiteSpace:"nowrap" }),
  btn: { fontSize:12, padding:"5px 12px", borderRadius:6, border:"1px solid #d1d5db", background:"#fff", color:"#374151", cursor:"pointer" },
};

function nextId(tasks) { return tasks.length ? Math.max(...tasks.map(t=>t.id))+1 : 1; }

function loadFromStorage() {
  try { const v = localStorage.getItem(STORAGE_KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
function saveToStorage(tasks) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch {}
}

export default function App() {
  const [tasks, setTasks] = useState(() => loadFromStorage() || INITIAL_TASKS);
  const [fL1, setFL1] = useState("all");
  const [fSt, setFSt] = useState("all");
  const [fPr, setFPr] = useState("all");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newT, setNewT] = useState({ l1:"", l2:"", title:"", desc:"", priority:"高", status:"未着手", assignee:"", due:"" });
  const [openL1, setOpenL1] = useState({});

  useEffect(() => { saveToStorage(tasks); }, [tasks]);

  const allL1 = [...new Set(tasks.map(t=>t.l1))];
  const filtered = tasks.filter(t =>
    (fL1==="all"||t.l1===fL1) &&
    (fSt==="all"||t.status===fSt) &&
    (fPr==="all"||t.priority===fPr) &&
    (!search||(t.title+t.desc+t.assignee).includes(search))
  );
  const grouped = {};
  filtered.forEach(t => {
    if (!grouped[t.l1]) grouped[t.l1] = {};
    if (!grouped[t.l1][t.l2]) grouped[t.l1][t.l2] = [];
    grouped[t.l1][t.l2].push(t);
  });

  const total=tasks.length, done=tasks.filter(t=>t.status==="完了").length;
  const inProg=tasks.filter(t=>t.status==="進行中").length;
  const topPend=tasks.filter(t=>t.priority==="最高"&&t.status!=="完了").length;
  const pct=total>0?Math.round(done/total*100):0;

  const upd = (id,f,v) => setTasks(p=>p.map(t=>t.id===id?{...t,[f]:v}:t));
  const del = (id) => { if(window.confirm("削除しますか？")) setTasks(p=>p.filter(t=>t.id!==id)); };
  const add = () => {
    if (!newT.title.trim()||!newT.l1.trim()) return;
    setTasks(p=>[...p,{...newT,id:nextId(p)}]);
    setNewT({l1:"",l2:"",title:"",desc:"",priority:"高",status:"未着手",assignee:"",due:""});
    setAdding(false);
  };
  const toggleL1 = (l1) => setOpenL1(p=>({...p,[l1]:p[l1]===false?true:false}));

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:600,marginBottom:4}}>王子HD スコアリング設計 タスク管理</h1>
        <p style={{fontSize:12,color:"#6b7280"}}>データはこのブラウザに保存されます（Chrome専用）</p>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
        {[{l:"総タスク",v:total},{l:"完了",v:done,s:`${pct}%`},{l:"進行中",v:inProg},{l:"最高優先（未完）",v:topPend}].map(st=>(
          <div key={st.l} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:8,padding:"10px 14px"}}>
            <div style={{fontSize:11,color:"#6b7280",marginBottom:4}}>{st.l}</div>
            <div style={{fontSize:22,fontWeight:600}}>{st.v}
              {st.s&&<span style={{fontSize:12,color:"#6b7280",marginLeft:4}}>{st.s}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{height:5,background:"#e5e7eb",borderRadius:3,marginBottom:20,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:"#16A34A",borderRadius:3,transition:"width .4s"}}/>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
        <input placeholder="タスク・説明・関連者を検索" value={search} onChange={e=>setSearch(e.target.value)}
          style={{...s.inp,flex:1,minWidth:160,padding:"6px 10px"}}/>
        {[
          {val:fL1,set:setFL1,opts:allL1,all:"すべての工程"},
          {val:fSt,set:setFSt,opts:STATUSES,all:"すべてのステータス"},
          {val:fPr,set:setFPr,opts:["最高","高","中"],all:"すべての優先度"},
        ].map((f,i)=>(
          <select key={i} value={f.val} onChange={e=>f.set(e.target.value)} style={{...s.inp,width:"auto"}}>
            <option value="all">{f.all}</option>
            {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <button onClick={()=>setAdding(true)} style={{...s.btn,whiteSpace:"nowrap",background:"#1e40af",color:"#fff",border:"none"}}>
          ＋ タスク追加
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div style={{...s.card,marginBottom:14,background:"#f8faff",borderColor:"#bfdbfe"}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:10}}>新規タスク</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <input placeholder="工程（Lv.1）*" value={newT.l1} onChange={e=>setNewT(p=>({...p,l1:e.target.value}))} style={s.inp} list="l1-list"/>
            <datalist id="l1-list">{allL1.map(l=><option key={l} value={l}/>)}</datalist>
            <input placeholder="サブ工程（Lv.2）" value={newT.l2} onChange={e=>setNewT(p=>({...p,l2:e.target.value}))} style={s.inp}/>
          </div>
          <input placeholder="タスク名 *" value={newT.title} onChange={e=>setNewT(p=>({...p,title:e.target.value}))} style={{...s.inp,marginBottom:8}}/>
          <textarea placeholder="タスクの説明（何をするタスクか）..." value={newT.desc} onChange={e=>setNewT(p=>({...p,desc:e.target.value}))} rows={3} style={{...s.inp,marginBottom:8,resize:"vertical",lineHeight:1.6}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:10}}>
            <select value={newT.priority} onChange={e=>setNewT(p=>({...p,priority:e.target.value}))} style={s.inp}>
              {["最高","高","中"].map(p=><option key={p}>{p}</option>)}
            </select>
            <select value={newT.status} onChange={e=>setNewT(p=>({...p,status:e.target.value}))} style={s.inp}>
              {STATUSES.map(st=><option key={st}>{st}</option>)}
            </select>
            <input placeholder="関連する人" value={newT.assignee} onChange={e=>setNewT(p=>({...p,assignee:e.target.value}))} style={s.inp}/>
            <input type="date" value={newT.due} onChange={e=>setNewT(p=>({...p,due:e.target.value}))} style={s.inp}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={add} style={{...s.btn,background:"#1e40af",color:"#fff",border:"none"}}>追加</button>
            <button onClick={()=>setAdding(false)} style={s.btn}>キャンセル</button>
          </div>
        </div>
      )}

      {/* Groups */}
      {Object.entries(grouped).map(([l1,l2map])=>{
        const l1tasks=filtered.filter(t=>t.l1===l1);
        const l1done=l1tasks.filter(t=>t.status==="完了").length;
        const isOpen=openL1[l1]!==false;
        return (
          <div key={l1} style={{marginBottom:12}}>
            <div onClick={()=>toggleL1(l1)} style={{
              display:"flex",alignItems:"center",gap:8,padding:"9px 14px",
              background:"#1e293b",borderRadius:isOpen?"8px 8px 0 0":8,
              cursor:"pointer",userSelect:"none"
            }}>
              <span style={{fontSize:12,color:"#94a3b8"}}>{isOpen?"▾":"▸"}</span>
              <span style={{fontSize:13,fontWeight:600,flex:1,color:"#f1f5f9"}}>{l1}</span>
              <span style={{fontSize:11,color:"#64748b"}}>{l1done}/{l1tasks.length}</span>
              <div style={{width:60,height:4,background:"#334155",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${l1tasks.length>0?l1done/l1tasks.length*100:0}%`,background:"#22c55e",borderRadius:2}}/>
              </div>
            </div>
            {isOpen && (
              <div style={{border:"1px solid #e5e7eb",borderTop:"none",borderRadius:"0 0 8px 8px",overflow:"hidden"}}>
                {Object.entries(l2map).map(([l2,tlist],li)=>(
                  <div key={l2}>
                    {l2 && (
                      <div style={{
                        padding:"5px 14px 5px 22px",fontSize:11,color:"#6b7280",fontWeight:600,
                        background:li%2===0?"#f9fafb":"#fff",
                        borderTop:li>0?"1px solid #f3f4f6":"none"
                      }}>
                        {l2}
                      </div>
                    )}
                    {tlist.map(task=>(
                      <TaskRow key={task.id} task={task} editId={editId} setEditId={setEditId} upd={upd} del={del}/>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {filtered.length===0&&(
        <div style={{textAlign:"center",padding:"48px 0",color:"#9ca3af",fontSize:14}}>
          タスクが見つかりません
        </div>
      )}
    </div>
  );
}

function TaskRow({ task, editId, setEditId, upd, del }) {
  const editing = editId===task.id;
  const pc = PC[task.priority]||PC["中"];
  const sc = SC[task.status]||SC["未着手"];
  const overdue = task.due && task.status!=="完了" && new Date(task.due)<new Date();

  return (
    <div style={{
      padding:"10px 14px 10px 30px",
      borderTop:"1px solid #f3f4f6",
      background:task.status==="完了"?"#f9fafb":"#fff",
      opacity:task.status==="完了"?0.65:1
    }}>
      {!editing ? (
        <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
          <input type="checkbox" checked={task.status==="完了"}
            onChange={e=>upd(task.id,"status",e.target.checked?"完了":"未着手")}
            style={{marginTop:3,flexShrink:0,cursor:"pointer",width:14,height:14}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:task.desc?5:0}}>
              <span style={{fontSize:13,fontWeight:500,
                textDecoration:task.status==="完了"?"line-through":"none",
                color:task.status==="完了"?"#9ca3af":"#111827"}}>
                {task.title}
              </span>
              <span style={s.badge(pc.bg,pc.c,pc.bd)}>{task.priority}</span>
              <span style={s.badge(sc.bg,sc.c)}>{task.status}</span>
              {task.assignee&&<span style={{fontSize:10,color:"#6b7280",flexShrink:0}}>👤 {task.assignee}</span>}
              {task.due&&<span style={{fontSize:10,color:overdue?"#dc2626":"#6b7280",flexShrink:0}}>
                {overdue?"⚠ ":""}{task.due}
              </span>}
            </div>
            {task.desc&&<div style={{fontSize:12,color:"#6b7280",lineHeight:1.6,whiteSpace:"pre-wrap"}}>{task.desc}</div>}
          </div>
          <button onClick={()=>setEditId(task.id)} style={{...s.btn,fontSize:11,padding:"2px 8px",flexShrink:0}}>編集</button>
        </div>
      ) : (
        <div>
          <input value={task.title} onChange={e=>upd(task.id,"title",e.target.value)} style={{...s.inp,marginBottom:6}}/>
          <textarea value={task.desc} onChange={e=>upd(task.id,"desc",e.target.value)} placeholder="説明..." rows={3} style={{...s.inp,marginBottom:6,resize:"vertical",lineHeight:1.6}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:8}}>
            <select value={task.priority} onChange={e=>upd(task.id,"priority",e.target.value)} style={s.inp}>
              {["最高","高","中"].map(p=><option key={p}>{p}</option>)}
            </select>
            <select value={task.status} onChange={e=>upd(task.id,"status",e.target.value)} style={s.inp}>
              {STATUSES.map(st=><option key={st}>{st}</option>)}
            </select>
            <input placeholder="関連する人" value={task.assignee} onChange={e=>upd(task.id,"assignee",e.target.value)} style={s.inp}/>
            <input type="date" value={task.due} onChange={e=>upd(task.id,"due",e.target.value)} style={s.inp}/>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setEditId(null)} style={{...s.btn,background:"#1e40af",color:"#fff",border:"none"}}>完了</button>
            <button onClick={()=>del(task.id)} style={{...s.btn,color:"#dc2626",borderColor:"#fca5a5"}}>削除</button>
          </div>
        </div>
      )}
    </div>
  );
}
