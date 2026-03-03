// 多 Agent 协作测试 - To-Do List 应用

// 初始化任务列表
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM 元素
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

// 渲染任务列表
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">删除</button>
        </ul>
        </ul>
        taskList.appendChild(li);
    });
    
    updateStats();
    saveTasks();
}

// 添加任务
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('请输入任务内容！');
        return;
    }
    
    tasks.push({
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    taskInput.value = '';
    renderTasks();
}

// 切换任务状态
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// 删除任务
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// 更新统计
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    totalTasks.textContent = `总计：${total} 个任务`;
    completedTasks.textContent = `已完成：${completed} 个`;
}

// 保存任务到 LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 事件绑定
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 页面加载时渲染
renderTasks();

console.log('📋 To-Do List 应用已加载');
console.log('👥 多 Agent 协作测试项目 - 开发工程师 KF');
