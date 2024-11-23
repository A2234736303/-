// 乐观的 Emoji 列表
const emojis = [
    '😀', '😁', '😄', '😃', '😆', '😊', '😍', '😎', '🥳', '🤩', 
    '🌟', '✨', '🔥', '💥', '🎉', '🎈', '🥂', '🍀', '🌸', '💫'
];

// 随机选择一个 Emoji
function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

// 为不同的计算类型定义不同的 Emoji
const resultEmojis = {
    "area": ['🌟', '✨', '🎉', '🔥'],
    "perimeter": ['🥳', '🎈', '💥'],
    "default": ['😀', '😃', '😁']
};

// 根据类型选择 Emoji
function getResultEmoji(type) {
    const emojisList = resultEmojis[type] || resultEmojis["default"];
    const randomIndex = Math.floor(Math.random() * emojisList.length);
    return emojisList[randomIndex];
}

// 更新动态表单函数
function updateForm() {
    const shape = document.getElementById("shape").value;
    const form = document.getElementById("inputForm");
    form.innerHTML = "";

    if (shape === "circle") {
        form.innerHTML += `
            <label for="radius" class="form-label">半径:</label>
            <input id="radius" type="number" class="form-control" placeholder="输入半径">
        `;
    } else if (shape === "rectangle") {
        form.innerHTML += `
            <label for="length" class="form-label">长:</label>
            <input id="length" type="number" class="form-control" placeholder="输入长度">
            <label for="width" class="form-label">宽:</label>
            <input id="width" type="number" class="form-control" placeholder="输入宽度">
        `;
    } else if (shape === "triangle") {
        form.innerHTML += `
            <label for="sideA" class="form-label">边A:</label>
            <input id="sideA" type="number" class="form-control" placeholder="输入边A长度">
            <label for="sideB" class="form-label">边B:</label>
            <input id="sideB" type="number" class="form-control" placeholder="输入边B长度">
            <label for="sideC" class="form-label">边C:</label>
            <input id="sideC" type="number" class="form-control" placeholder="输入边C长度">
        `;
    }
    setupInputValidation();
}

// 显示结果函数
function showResult(result, type) {
    const resultCard = document.getElementById("result");
    const resultText = document.getElementById("resultText");
    const lastCalculation = document.getElementById("lastCalculation");
    
    // 获取指定类型的 Emoji
    const resultEmoji = getResultEmoji(type);
    
    // 保存当前计算结果
    const currentShape = document.getElementById("shape").value;
    saveLastCalculation(currentShape, type, result);
    
    // 显示当前结果
    resultText.innerHTML = `${result} ${resultEmoji}`;
    
    // 显示上次计算结果
    const previousCalc = loadLastCalculation();
    if (previousCalc && previousCalc.result !== result) {
        lastCalculation.innerHTML = `
            <div class="previous-calculation">
                <i class="fas fa-history me-2"></i>
                上次计算: ${previousCalc.shape} 的 ${previousCalc.type}
                = ${previousCalc.result} 
                <small class="text-muted">(${formatTime(previousCalc.timestamp)})</small>
            </div>
        `;
    } else {
        lastCalculation.innerHTML = '';
    }
    
    resultCard.classList.remove("d-none");
}

// 调用后端 API
function fetchResult(apiUrl, type) {
    setLoading(true);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || "请求失败");
                });
            }
            return response.json();
        })
        .then(result => {
            showResult(`${type}结果: ${result.toFixed(2)}`, type);
        })
        .catch(error => {
            showResult(`错误: ${error.message}`, "default");
        })
        .finally(() => {
            setLoading(false);
        });
}

// 添加后端服务器地址
const BASE_URL = 'http://localhost:8080';  // 请根据实际后端地址修改

// 计算面积
function calculateArea() {
    const shape = document.getElementById("shape").value;
    let apiUrl = "";

    if (shape === "circle") {
        const radius = document.getElementById("radius").value;
        apiUrl = `${BASE_URL}/api/geometry/circle/area?radius=${radius}`;
    } else if (shape === "rectangle") {
        const length = document.getElementById("length").value;
        const width = document.getElementById("width").value;
        apiUrl = `${BASE_URL}/api/geometry/rectangle/area?length=${length}&width=${width}`;
    } else if (shape === "triangle") {
        const sideA = document.getElementById("sideA").value;
        const sideB = document.getElementById("sideB").value;
        const sideC = document.getElementById("sideC").value;
        apiUrl = `${BASE_URL}/api/geometry/triangle/area?sideA=${sideA}&sideB=${sideB}&sideC=${sideC}`;
    }

    fetchResult(apiUrl, "area");
}

// 计算周长
function calculatePerimeter() {
    const shape = document.getElementById("shape").value;
    let apiUrl = "";

    if (shape === "circle") {
        const radius = document.getElementById("radius").value;
        apiUrl = `${BASE_URL}/api/geometry/circle/perimeter?radius=${radius}`;
    } else if (shape === "rectangle") {
        const length = document.getElementById("length").value;
        const width = document.getElementById("width").value;
        apiUrl = `${BASE_URL}/api/geometry/rectangle/perimeter?length=${length}&width=${width}`;
    } else if (shape === "triangle") {
        const sideA = document.getElementById("sideA").value;
        const sideB = document.getElementById("sideB").value;
        const sideC = document.getElementById("sideC").value;
        apiUrl = `${BASE_URL}/api/geometry/triangle/perimeter?sideA=${sideA}&sideB=${sideB}&sideC=${sideC}`;
    }

    fetchResult(apiUrl, "perimeter");
}

// 添加输入验证
function validateInput(value, min = 0) {
    return value > min;
}

// 添加输入实时验证
function setupInputValidation() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (!validateInput(this.value)) {
                this.classList.add('input-error');
            } else {
                this.classList.remove('input-error');
            }
        });
    });
}

// 添加加载状态
function setLoading(isLoading) {
    const buttons = document.querySelectorAll('.btn');
    if (isLoading) {
        buttons.forEach(btn => btn.classList.add('loading'));
    } else {
        buttons.forEach(btn => btn.classList.remove('loading'));
    }
}

// 修改键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 防止表单默认提交行为
    if (e.key === 'Enter') {
        e.preventDefault();
        // 确保焦点不在按钮上时才触发
        if (document.activeElement.tagName !== 'BUTTON') {
            calculateArea();
        }
    } else if (e.key === 'P' || e.key === 'p') {
        e.preventDefault();
        // 确保不是在输入框中输入字母 p
        if (document.activeElement.tagName !== 'INPUT') {
            calculatePerimeter();
        }
    }
});

// 防止表单默认提交
document.getElementById('geometryForm').addEventListener('submit', function(e) {
    e.preventDefault();
});

// 添加数据本地缓存
function saveLastCalculation(shape, type, result) {
    const calculation = {
        shape: getShapeName(shape),
        type: type === 'area' ? '面积' : '周长',
        result: result,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastCalculation', JSON.stringify(calculation));
}

function loadLastCalculation() {
    const saved = localStorage.getItem('lastCalculation');
    return saved ? JSON.parse(saved) : null;
}

// 格式化时间显示
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // 小于1分钟
        return '刚刚';
    } else if (diff < 3600000) { // 小于1小时
        return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) { // 小于24小时
        return `${Math.floor(diff / 3600000)}小时前`;
    } else {
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
}

// 获取图形中文名称
function getShapeName(shape) {
    const shapeNames = {
        'circle': '圆形',
        'rectangle': '矩形',
        'triangle': '三角形'
    };
    return shapeNames[shape] || shape;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    updateForm();
    loadLastCalculation();
});
