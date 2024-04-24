document.addEventListener('DOMContentLoaded', function() {
	// 获取所有标题元素
	var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	// 创建目录字符串
	var tableOfContents = '<ul>'; // 根列表
	var lastLevel = 1; // 上一个标题级别
	for (var i = 0; i < headers.length; i++) {
		var header = headers[i];
		var headerText = header.innerText || header.textContent;
		// 获取标题级别
		var level = parseInt(header.tagName.substring(1)); // 获取标题级别的数字部分
		// 根据级别差异添加 ul 或 /ul
		while (lastLevel < level) {
			tableOfContents += '<ul>';
			lastLevel++;
		}
		while (lastLevel > level) {
			tableOfContents += '</ul>';
			lastLevel--;
		}
		// 生成 headerId
		var headerId = 'header-' + i; // 默认情况下使用索引作为 ID
		if (header.hasAttribute('id')) {
			headerId = header.getAttribute('id'); // 如果标题元素有自定义的 ID，则使用它
		} else {
			// 生成唯一的 ID，确保不与页面上的其他元素冲突
			headerId = 'header-' + i;
			header.setAttribute('id', headerId);
		}
		// 创建目录项
		var listItemSymbol = '•'; // 默认为圆点
		if (level === 2) {
			listItemSymbol = '▫︎'; // 第二级使用方空心点
		} else if (level === 3) {
			listItemSymbol = '▪︎'; // 第三级使用方实心点
		}
		tableOfContents += '<li>' + listItemSymbol + ' <a href="#' + headerId + '">' + headerText + '</a></li>';
	}
	// 结束所有未关闭的列表
	while (lastLevel > 1) {
		tableOfContents += '</ul>';
		lastLevel--;
	}
	tableOfContents += '</ul>'; // 结束根列表
	// 将目录字符串添加到页面
	var tocContainer = document.getElementById('tableOfContents');
	tocContainer.innerHTML = tableOfContents;
});