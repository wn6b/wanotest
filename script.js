// --- إعدادات الحسابات والأنظمة ---
// استخدام ID الرتبة مثل ما طلبت (role_1: Owner, role_2: Developer, role_3: User)
const OWNER_CREDENTIALS = {
    email: "waylalyzydy51@gmail.com",
    password: "f!2HgJv#)\"E\"y^i",
    roleId: "role_1", 
    roleName: "Owner"
};

// --- الوظائف الأساسية للـ UI ---
const showScreen = (screenId) => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
};

const showPanel = (roleId) => {
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    const targetPanel = document.getElementById(`panel-${roleId}`);
    if (targetPanel) targetPanel.classList.remove('hidden');
};

// --- محاكاة شاشة التحميل الواقعية ---
window.addEventListener('load', () => {
    setTimeout(() => {
        checkAuthStatus();
    }, 3500); // 3.5 ثواني عشان تبين واقعية وحلوة
});

// --- نظام تسجيل الدخول (مع حفظ البيانات بالـ localStorage) ---
const checkAuthStatus = () => {
    const activeUser = JSON.parse(localStorage.getItem('currentUser_wn6b'));
    if (activeUser) {
        setupDashboard(activeUser);
        showScreen('dashboard-screen');
    } else {
        showScreen('auth-screen');
    }
};

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('auth-error');

    // التحقق من حساب الأونر اللي طلبته
    if (email === OWNER_CREDENTIALS.email && password === OWNER_CREDENTIALS.password) {
        const userData = { email: email, roleId: OWNER_CREDENTIALS.roleId, roleName: OWNER_CREDENTIALS.roleName };
        localStorage.setItem('currentUser_wn6b', JSON.stringify(userData));
        setupDashboard(userData);
        showScreen('dashboard-screen');
        errorMsg.innerText = "";
    } 
    // أي حساب ثاني يعتبر مستخدم عادي (Demo)
    else if (email && password.length > 5) {
        const userData = { email: email, roleId: "role_3", roleName: "User" };
        localStorage.setItem('currentUser_wn6b', JSON.stringify(userData));
        setupDashboard(userData);
        showScreen('dashboard-screen');
        errorMsg.innerText = "";
    } else {
        errorMsg.innerText = "بيانات الدخول غير صحيحة!";
    }
});

// --- إعداد لوحة التحكم بناءً على الرتبة (ID) ---
const setupDashboard = (user) => {
    const badge = document.getElementById('user-role-badge');
    badge.innerHTML = `<i class="fa-solid fa-id-badge"></i> ${user.roleName}`;
    showPanel(user.roleId);
};

// --- تسجيل الخروج ---
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser_wn6b');
    showScreen('loading-screen');
    setTimeout(() => {
        document.getElementById('login-form').reset();
        showScreen('auth-screen');
    }, 1000);
});

// --- محاكاة الذكاء الاصطناعي لفحص الملفات (للأونر) ---
document.getElementById('owner-upload-btn').addEventListener('click', () => {
    const fileInput = document.getElementById('owner-file-upload');
    const statusDiv = document.getElementById('ai-scan-status');

    if (!fileInput.files.length) {
        alert("يا وائل اختار ملف أول شي لا تفضحنا!");
        return;
    }

    statusDiv.classList.remove('hidden', 'rejected', 'approved');
    statusDiv.innerHTML = '<i class="fa-solid fa-microchip fa-spin"></i> الذكاء الاصطناعي يحلل الأكواد...';
    
    // محاكاة وقت الفحص
    setTimeout(() => {
        statusDiv.innerHTML = '<i class="fa-solid fa-shield-virus fa-spin"></i> جاري البحث عن ثغرات وفيروسات...';
        
        setTimeout(() => {
            // بما انه الاونر، الملف دائماً ينجح، بس هاي الفكرة تتبرمج صح مع API لاحقاً
            statusDiv.classList.add('approved');
            statusDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> تم فحص الملف وهو آمن 100%! جاري النشر...';
            
            // اضافة كرت الملف للموقع (محاكاة)
            setTimeout(() => {
                const fileName = fileInput.files[0].name;
                addFileCard(fileName, "الأونر");
                fileInput.value = ""; // تفريغ الحقل
                setTimeout(() => statusDiv.classList.add('hidden'), 3000);
            }, 1000);

        }, 2000);
    }, 2000);
});

// دالة لاضافة كرت الملف في الواجهة
const addFileCard = (fileName, author) => {
    const container = document.getElementById('files-container');
    const card = document.createElement('div');
    card.className = 'file-card';
    card.innerHTML = `
        <i class="fa-solid fa-file-code file-icon"></i>
        <h4>${fileName}</h4>
        <p>بواسطة: ${author}</p>
        <button class="btn-download" onclick="alert('جاري تنزيل ${fileName}...')"><i class="fa-solid fa-download"></i> تنزيل</button>
    `;
    container.prepend(card);
};
