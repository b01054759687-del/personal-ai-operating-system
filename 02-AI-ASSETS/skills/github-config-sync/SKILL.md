---
name: github-config-sync
description: >
  مزامنة إعدادات GitHub: يرفع ويحدث ملفات الإعدادات والمهارات والسكريبتات
  على مستودع GitHub الخاص بالمستخدم (antigravity-config-backup)،
  ويقوم بمزامنة ورفع مشاريع الأكواد من F:\AntigravityProjects إلى مستودعات مستقلة.
  استخدمه لما المستخدم يطلب رفع الإعدادات على GitHub، مزامنة، sync، أو backup على GitHub.
---

# Skill: GitHub Config Sync & Projects Backup (مزامنة الإعدادات والمشاريع على GitHub)

أنت مسؤول عن مزامنة إعدادات Antigravity مع مستودع GitHub الخاص بالمستخدم، بالإضافة إلى مزامنة ورفع المشاريع البرمجية الفردية الموجودة في F:\AntigravityProjects كل مشروع في مستودع مستقل وخاص.

## المعلومات الأساسية للنسخ الاحتياطي للإعدادات

| المعلومة | القيمة |
|---------|--------|
| **المستودع** | antigravity-config-backup |
| **المالك** | b01054759687-del |
| **الفرع** | main |
| **النوع** | Private Repository |

## هيكل مستودع الإعدادات (antigravity-config-backup)

`
├── config/           # ملفات الإعدادات
│   ├── AGENTS.md     # القواعد السلوكية
│   ├── config.json   # إعدادات المستخدم
│   └── mcp_config.json # إعدادات MCP (بدون tokens)
├── mcp/              # إعدادات أدوات MCP
│   └── presentation-generator/
│       └── generate_presentation.json
├── skills/           # المهارات المخصصة
│   ├── expert_reviewer/SKILL.md
│   ├── presentation_generator/SKILL.md
│   ├── premium_presentation_strategist/SKILL.md
│   └── github_config_sync/SKILL.md
├── scripts/          # سكريبتات الأتمتة
│   ├── backup.ps1    # سكريبت النسخ الاحتياطي اليومي
│   └── register_task.ps1 # تسجيل المهمة في Task Scheduler
├── .gitignore
└── README.md
`

## مسار الملفات المحلية

| النوع | المسار المحلي |
|-------|-------------|
| **الإعدادات** | C:\Users\louy\.gemini\config\ |
| **المهارات** | C:\Users\louy\.gemini\config\skills\ |
| **أدوات MCP** | C:\Users\louy\.gemini\antigravity\mcp\ |
| **السكريبتات** | C:\Users\louy\AntigravityBackups\scripts\ |
| **مشاريع الأكواد** | F:\AntigravityProjects\ |

## كيفية التنفيذ

### الجزء الأول: مزامنة ملفات الإعدادات والمهارات
1. اقرأ محتويات ملفات الإعدادات والمهارات والسكريبتات المتغيرة محلياً.
2. قم بتنظيف البيانات الحساسة (استبدل أي tokens أو secrets بـ placeholders).
3. ارفع الملفات المعدلة لمستودع antigravity-config-backup باستخدام أداة push_files من github-mcp-server.

### الجزء الثاني: مزامنة ورفع مشاريع الأكواد (F:\AntigravityProjects)
لكل مجلد مشروع داخل F:\AntigravityProjects (مثال: Start MVP، Green3ataba):
1. قم بتهيئة اسم المستودع ليكون متوافقاً مع شروط GitHub (حروف صغيرة، بدون مسافات، استخدام شرطة - بدلاً من المسافات، مثال: start-mvp).
2. تأكد من وجود المستودع على حساب المستخدم باستخدام البحث أو محاولة الوصول:
   - إذا كان المستودع غير موجود، قم بإنشائه كمستودع خاص (Private) باستخدام أداة create_repository (تأكد من ترك private على القيمة الافتراضية true).
3. قم بقراءة ملفات المشروع محلياً بشكل متكرر.
   - تنبيه هام: استثنِ تماماً المجلدات والملفات المؤقتة أو الضخمة مثل node_modules و .git و .venv و bin و obj و .log.
4. ارفع ملفات المشروع لمستودعها المستقل الخاص بها على GitHub باستخدام أداة push_files.
5. استخدم رسالة commit توضح المزامنة مثل "Sync: Auto backup from Antigravity".

## قواعد مهمة

1. لا ترفع أبداً tokens أو secrets - استبدلهم دائماً بـ placeholders
2. استخدم commit messages واضحة
3. احرص على رفع الملفات البرمجية الفعلية فقط واستثناء مجلدات الاعتمادات الكبيرة (node_modules) لتفادي تجاوز حدود حجم الطلب في MCP.
