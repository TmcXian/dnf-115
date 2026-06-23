<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>套装对比 - DNF 115版本工具</title>
    <link rel="stylesheet" href="../static/css/base.css">
    <link rel="stylesheet" href="../static/css/dnf-style.css">
    <style>
        /* 对比页面基础样式 */
        .compare-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .selector-section { margin: 20px 0; display: flex; gap: 10px; flex-wrap: wrap; }
        #setSelector { flex: 1; min-width: 200px; padding: 8px; border: 2px solid #8b7355; background: #1a1a1a; color: #ffd700; border-radius: 4px; }
        .add-btn, .clear-btn { padding: 8px 20px; background: #ffd700; color: #1a1a1a; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .add-btn:disabled { background: #666; cursor: not-allowed; }
        .selected-sets { margin: 20px 0; display: flex; flex-wrap: wrap; gap: 10px; }
        .selected-set-tag { background: #222; border: 2px solid #8b7355; border-radius: 4px; padding: 8px 15px; display: flex; align-items: center; gap: 10px; color: #ffd700; }
        .remove-set { background: #ff4444; border: none; border-radius: 50%; width: 20px; height: 20px; color: white; cursor: pointer; font-size: 14px; }
        .compare-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #222; border-radius: 8px; overflow: hidden; }
        .table-header { display: flex; background: #111; border-bottom: 2px solid #8b7355; }
        .table-header > div { flex: 1; padding: 15px; text-align: center; }
        .header-cell h4 { color: #ffd700; margin: 0; }
        .header-cell .alias { color: #c0c0c0; font-size: 12px; }
        .header-cell .difficulty { color: #8b7355; font-size: 12px; margin-top: 5px; }
        .table-body .table-row { display: flex; border-bottom: 1px solid #333; }
        .table-row .row-label { flex: 1; padding: 12px; background: #1a1a1a; color: #ffd700; font-weight: bold; }
        .table-row .value-cell { flex: 1; padding: 12px; text-align: center; color: #c0c0c0; }
        .value-cell.highlight.positive { color: #4CAF50; font-weight: bold; }
        .empty-compare-state { text-align: center; padding: 80px 20px; color: #ffd700; }
        .empty-compare-state img { width: 100px; height: 100px; margin-bottom: 20px; }
        .compare-summary { margin: 30px 0; padding: 20px; background: #222; border: 2px solid #8b7355; border-radius: 8px; }
        .compare-summary h3 { color: #ffd700; margin-bottom: 15px; }
        .summary-point { margin: 10px 0; color: #c0c0c0; line-height: 1.6; }
        .summary-point strong { color: #ffd700; }
        @media (max-width: 768px) {
            .table-header, .table-row { flex-direction: column; }
            .header-cell, .row-label, .value-cell { border-bottom: 1px solid #333; }
        }
    </style>
</head>
<body>
    <header class="dnf-header">
        <div class="header-content">
            <img src="../static/img/logo/dnf-logo.png" alt="DNF Logo" class="logo" onerror="this.src='../static/img/logo/default-logo.png'">
            <h1>套装属性对比</h1>
        </div>
    </header>

    <nav class="breadcrumb">
        <div class="container">
            <a href="../index.html">首页</a> > 套装对比
        </div>
    </nav>

    <main class="compare-container">
        <!-- 套装选择器 -->
        <div class="selector-section">
            <select id="setSelector" class="set-selector"></select>
            <button class="add-btn">添加到对比</button>
            <button class="clear-btn">清空对比</button>
        </div>

        <!-- 已选套装标签 -->
        <div id="selectedSets" class="selected-sets"></div>

        <!-- 对比结果区域 -->
        <div id="compareResult" class="compare-result"></div>
    </main>

    <script src="../static/js/common.js"></script>
    <script src="../static/js/page/compare.js"></script>
</body>
</html>