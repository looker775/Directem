import { registerTranslations } from './i18n';

export const TRANSLATIONS: Record<'en' | 'ar' | 'ru', Record<string, string>> = {
  en: {},
  ar: {},
  ru: {},
};

const mergeTranslations = (lang: 'en' | 'ar' | 'ru', map: Record<string, string>) => {
  TRANSLATIONS[lang] = { ...TRANSLATIONS[lang], ...map };
  registerTranslations(lang, map);
};

export function initTranslations() {
  mergeTranslations('ar', {
    'Pricing': 'الأسعار',
    'Sign in': 'تسجيل الدخول',
    'Register': 'إنشاء حساب',
    'Owner': 'المالك',
    'Admin workspace': 'مساحة المدير',
    'Marketplace': 'السوق',
    'Sign out': 'تسجيل الخروج',
    'Account': 'الحساب',
    'Country': 'الدولة',
    'Use GPS': 'استخدام GPS',
    'Locating...': 'جارٍ التحديد...',
    'Protected': 'محمي',
    'WhatsApp': 'واتساب',
    'Verified': 'موثّق',
    'Request': 'طلب',
    'Request access': 'طلب الوصول',
    'Submit request': 'إرسال الطلب',
    'Pending approval': 'بانتظار الموافقة',
    'Payment received. Reference: {ref}': 'تم استلام الدفع. المرجع: {ref}',
    'Payment reference (required)': 'مرجع الدفع (مطلوب)',
    'Bank transfer ID or receipt': 'رقم التحويل أو الإيصال',
    'Preferred job': 'الوظيفة المفضلة',
    'e.g. Sales manager': 'مثال: مدير مبيعات',
    'Salary expectation': 'الراتب المتوقع',
    'e.g. 5000 AED / month': 'مثال: 5000 درهم / شهر',
    'Notes for admin': 'ملاحظات للمدير',
    'Preferred cities, industries, or extra notes': 'المدن أو القطاعات المفضلة أو أي ملاحظات إضافية',
    'Refresh': 'تحديث',
    'Pending': 'قيد الانتظار',
    'Active': 'نشط',
    'Rejected': 'مرفوض',
    'Expired': 'منتهي',
    'Approved': 'موافق عليه',
    'Blocked': 'محظور',
    'Showing USD because exchange rates are unavailable.': 'عرض بالدولار لأن أسعار الصرف غير متاحة.',
    'Local currency unsupported. Showing {currency}.': 'العملة المحلية غير مدعومة. يتم العرض بـ {currency}.',
    'Owner & Admin portal': 'بوابة المالك والمدير',
    'Owner & Admin access': 'وصول المالك والمدير',
    'Welcome back': 'مرحبًا بعودتك',
    'Forgot password?': 'نسيت كلمة المرور؟',
    'Forgot admin password?': 'نسيت كلمة مرور المدير؟',
    'Signing in...': 'جارٍ تسجيل الدخول...',
    'Full name': 'الاسم الكامل',
    'Create account': 'إنشاء حساب',
    'Creating account...': 'جارٍ إنشاء الحساب...',
    'Email': 'البريد الإلكتروني',
    'Password': 'كلمة المرور',
    'Create a strong password': 'أنشئ كلمة مرور قوية',
    'Already have an account?': 'لديك حساب؟',
    'Sign in as admin': 'سجّل الدخول كمدير',
    'Buyer': 'مشتري',
    'Admin': 'مدير',
    'Package': 'الباقة',
    'Save': 'حفظ',
    'Submitting...': 'جارٍ الإرسال...',
    'Failed to request access.': 'فشل طلب الوصول.',
    'Unable to load your profile.': 'تعذر تحميل ملفك الشخصي.',
    'Something went wrong while loading your dashboard.':
      'حدث خطأ أثناء تحميل لوحة التحكم.',
    'Unable to send reset email.': 'تعذر إرسال بريد إعادة التعيين.',
    'Unable to reset password.': 'تعذر إعادة تعيين كلمة المرور.',
    'Failed to update package.': 'فشل تحديث الباقة.',
    'Failed to add package.': 'فشل إضافة الباقة.',
    'Failed to add employer.': 'فشل إضافة صاحب العمل.',
    'Failed to approve purchase.': 'فشل اعتماد الشراء.',
    'Failed to reject purchase.': 'فشل رفض الشراء.',
    'PayPal payment failed.': 'فشل الدفع عبر PayPal.',
    'Card payment failed.': 'فشل دفع البطاقة.',
    'PayPal failed to initialize.': 'فشل تهيئة PayPal.',
    'Employer': 'صاحب عمل',
    'Contact': 'جهة الاتصال',
    'Unable to sign in.': 'تعذر تسجيل الدخول.',
    'Unable to register.': 'تعذر التسجيل.',
    'Unknown': 'غير معروف',
    'USD': 'دولار',
    'Local': 'محلي',
  });

  mergeTranslations('ru', {
    'Pricing': 'Цены',
    'Sign in': 'Войти',
    'Register': 'Регистрация',
    'Owner': 'Владелец',
    'Admin workspace': 'Рабочее место админа',
    'Marketplace': 'Маркетплейс',
    'Sign out': 'Выйти',
    'Account': 'Аккаунт',
    'Country': 'Страна',
    'Use GPS': 'Использовать GPS',
    'Locating...': 'Определяем...',
    'Protected': 'Защищено',
    'WhatsApp': 'WhatsApp',
    'Verified': 'Проверено',
    'Request': 'Запросить',
    'Request access': 'Запросить доступ',
    'Submit request': 'Отправить запрос',
    'Pending approval': 'Ожидает подтверждения',
    'Payment received. Reference: {ref}': 'Платеж получен. Референс: {ref}',
    'Payment reference (required)': 'Референс платежа (обязательно)',
    'Bank transfer ID or receipt': 'ID перевода или чек',
    'Preferred job': 'Желаемая должность',
    'e.g. Sales manager': 'например: менеджер по продажам',
    'Salary expectation': 'Ожидаемая зарплата',
    'e.g. 5000 AED / month': 'например: 5000 AED / месяц',
    'Notes for admin': 'Примечания для админа',
    'Preferred cities, industries, or extra notes': 'Предпочтительные города, отрасли и т.д.',
    'Refresh': 'Обновить',
    'Pending': 'Ожидает',
    'Active': 'Активно',
    'Rejected': 'Отклонено',
    'Expired': 'Истекло',
    'Approved': 'Одобрено',
    'Blocked': 'Заблокировано',
    'Showing USD because exchange rates are unavailable.': 'Показаны цены в USD — нет данных по курсам.',
    'Local currency unsupported. Showing {currency}.': 'Местная валюта не поддерживается. Показано: {currency}.',
    'Owner & Admin portal': 'Портал владельца и админа',
    'Owner & Admin access': 'Доступ владельца и админа',
    'Welcome back': 'С возвращением',
    'Forgot password?': 'Забыли пароль?',
    'Forgot admin password?': 'Забыли пароль админа?',
    'Signing in...': 'Входим...',
    'Full name': 'Полное имя',
    'Create account': 'Создать аккаунт',
    'Creating account...': 'Создаем...',
    'Email': 'Email',
    'Password': 'Пароль',
    'Create a strong password': 'Придумайте надежный пароль',
    'Already have an account?': 'Уже есть аккаунт?',
    'Sign in as admin': 'Войти как админ',
    'Buyer': 'Покупатель',
    'Admin': 'Админ',
    'Package': 'Пакет',
    'Save': 'Сохранить',
    'Submitting...': 'Отправляем...',
    'Failed to request access.': 'Не удалось отправить запрос.',
    'Unable to load your profile.': 'Не удалось загрузить профиль.',
    'Something went wrong while loading your dashboard.':
      'Ошибка при загрузке панели.',
    'Unable to send reset email.': 'Не удалось отправить письмо сброса.',
    'Unable to reset password.': 'Не удалось сбросить пароль.',
    'Failed to update package.': 'Не удалось обновить пакет.',
    'Failed to add package.': 'Не удалось добавить пакет.',
    'Failed to add employer.': 'Не удалось добавить работодателя.',
    'Failed to approve purchase.': 'Не удалось одобрить покупку.',
    'Failed to reject purchase.': 'Не удалось отклонить покупку.',
    'PayPal payment failed.': 'Ошибка оплаты PayPal.',
    'Card payment failed.': 'Ошибка оплаты картой.',
    'PayPal failed to initialize.': 'Не удалось инициализировать PayPal.',
    'Employer': 'Работодатель',
    'Contact': 'Контакт',
    'Unable to sign in.': 'Не удалось войти.',
    'Unable to register.': 'Не удалось зарегистрироваться.',
    'Unknown': 'Неизвестно',
    'USD': 'USD',
    'Local': 'Местн.',
  });

  mergeTranslations('ar', {
    'UAE-only employers': 'أصحاب عمل في الإمارات فقط',
    'Owner-approved admin access': 'وصول المدير بعد موافقة المالك',
    'WhatsApp-ready contacts': 'جهات اتصال واتساب جاهزة',
    'Local currency estimates': 'تقديرات بالعملة المحلية',
    'Manual approval required': 'يتطلب موافقة يدوية',
    'Directem Verified Ledger': 'سجل Directem الموثّق',
    'Turn UAE employer data into an approval-gated hiring advantage.':
      'حوّل بيانات أصحاب العمل في الإمارات إلى ميزة توظيف محمية بالموافقة.',
    'Directem is a curated, owner-controlled employer ledger. Buyers request access packages, admins verify payment, and contacts unlock only after approval.':
      'Directem سجل مُختار بإدارة المالك. يطلب المشترون باقات الوصول، ويتحقق المدراء من الدفع، ولا تُفتح جهات الاتصال إلا بعد الموافقة.',
    'Bundles': 'الباقات',
    'Verification': 'التحقق',
    'Owner-approved admins': 'مدراء بموافقة المالك',
    'Coverage': 'التغطية',
    'UAE employers only': 'أصحاب عمل في الإمارات فقط',
    'Updates': 'التحديثات',
    'Fresh entries daily': 'إدخالات جديدة يوميًا',
    'Directem ledger': 'سجل Directem',
    'Verified employer entries': 'سجلات أصحاب عمل موثّقة',
    'Approval gate': 'بوابة الموافقة',
    'Admins only access the database after the owner approves them. Buyers unlock contacts after payment verification and approval.':
      'لا يصل المديرون إلى قاعدة البيانات إلا بعد موافقة المالك. تُفتح جهات الاتصال للمشترين بعد التحقق من الدفع والموافقة.',
    'Access control': 'التحكم بالوصول',
    'Owner & Admin': 'المالك والمدير',
    'Buyer unlock': 'فتح للمشتري',
    'After approval': 'بعد الموافقة',
    'Directem packages': 'باقات Directem',
    'Pick the employer bundle that fits your hiring target.':
      'اختر باقة أصحاب العمل التي تناسب هدف التوظيف لديك.',
    'Package': 'الباقة',
    'Employers': 'أصحاب العمل',
    'USD': 'دولار',
    'Local': 'محلي',
    'What you receive': 'ماذا ستحصل عليه',
    'Every package unlocks curated UAE employer contacts with WhatsApp numbers, phone lines, and verified company names.':
      'كل باقة تفتح جهات اتصال أصحاب عمل موثّقة في الإمارات مع أرقام واتساب وهواتف وأسماء شركات مؤكدة.',
    'Approval workflow': 'سير الموافقة',
    'Submit your package request, include a payment reference, and wait for admin approval. Contacts unlock instantly after approval.':
      'أرسل طلب الباقة وأضف مرجع الدفع ثم انتظر موافقة المدير. تفتح جهات الاتصال فور الموافقة.',
    'How access works': 'كيف يعمل الوصول',
    'Directem keeps employer data protected while giving you fast access.':
      'يحمي Directem بيانات أصحاب العمل ويمنحك وصولًا سريعًا.',
    'Request your bundle': 'اطلب باقتك',
    'Choose 10, 20, or 30 employer contacts and submit your request.':
      'اختر 10 أو 20 أو 30 جهة اتصال وأرسل طلبك.',
    'Owner-approved review': 'مراجعة بموافقة المالك',
    'Admins verify payments and unlock access after approval.':
      'يتحقق المدراء من الدفع ويفتحون الوصول بعد الموافقة.',
    'Start outreach': 'ابدأ التواصل',
    'Use the WhatsApp-ready contacts inside your Directem dashboard.':
      'استخدم جهات الاتصال الجاهزة لواتساب داخل لوحة Directem.',
    'Launch your Directem access today': 'ابدأ وصولك إلى Directem اليوم',
    'Secure employer data, clear pricing, and fast approvals in one place.':
      'بيانات آمنة وأسعار واضحة وموافقات سريعة في مكان واحد.',
    'Create your Directem account': 'إنشاء حساب Directem',
  });

  mergeTranslations('ru', {
    'UAE-only employers': 'Работодатели только в ОАЭ',
    'Owner-approved admin access': 'Доступ админа после одобрения владельца',
    'WhatsApp-ready contacts': 'Контакты с WhatsApp',
    'Local currency estimates': 'Оценка в местной валюте',
    'Manual approval required': 'Требуется ручное одобрение',
    'Directem Verified Ledger': 'Проверенный реестр Directem',
    'Turn UAE employer data into an approval-gated hiring advantage.':
      'Превратите данные работодателей ОАЭ в конкурентное преимущество.',
    'Directem is a curated, owner-controlled employer ledger. Buyers request access packages, admins verify payment, and contacts unlock only after approval.':
      'Directem — это курируемый реестр работодателей под контролем владельца. Покупатели запрашивают пакеты, админы подтверждают оплату, доступ открывается после одобрения.',
    'Bundles': 'Пакеты',
    'Verification': 'Проверка',
    'Owner-approved admins': 'Админы с одобрением владельца',
    'Coverage': 'Покрытие',
    'UAE employers only': 'Работодатели ОАЭ',
    'Updates': 'Обновления',
    'Fresh entries daily': 'Новые записи ежедневно',
    'Directem ledger': 'Реестр Directem',
    'Verified employer entries': 'Проверенные записи работодателей',
    'Approval gate': 'Шлюз одобрения',
    'Admins only access the database after the owner approves them. Buyers unlock contacts after payment verification and approval.':
      'Админы получают доступ к базе только после одобрения владельца. Контакты открываются после проверки оплаты и одобрения.',
    'Access control': 'Контроль доступа',
    'Owner & Admin': 'Владелец и админ',
    'Buyer unlock': 'Доступ покупателю',
    'After approval': 'После одобрения',
    'Directem packages': 'Пакеты Directem',
    'Pick the employer bundle that fits your hiring target.':
      'Выберите пакет работодателей под вашу цель найма.',
    'Package': 'Пакет',
    'Employers': 'Работодателей',
    'USD': 'USD',
    'Local': 'Местн.',
    'What you receive': 'Что вы получаете',
    'Every package unlocks curated UAE employer contacts with WhatsApp numbers, phone lines, and verified company names.':
      'Каждый пакет открывает проверенные контакты работодателей ОАЭ с WhatsApp, телефонами и подтвержденными названиями компаний.',
    'Approval workflow': 'Процесс одобрения',
    'Submit your package request, include a payment reference, and wait for admin approval. Contacts unlock instantly after approval.':
      'Отправьте запрос, укажите референс оплаты и дождитесь одобрения админа. Контакты откроются сразу после одобрения.',
    'How access works': 'Как работает доступ',
    'Directem keeps employer data protected while giving you fast access.':
      'Directem защищает данные и дает быстрый доступ.',
    'Request your bundle': 'Запросите пакет',
    'Choose 10, 20, or 30 employer contacts and submit your request.':
      'Выберите 10, 20 или 30 контактов и отправьте запрос.',
    'Owner-approved review': 'Проверка с одобрением владельца',
    'Admins verify payments and unlock access after approval.':
      'Админы проверяют оплату и открывают доступ после одобрения.',
    'Start outreach': 'Начните работу',
    'Use the WhatsApp-ready contacts inside your Directem dashboard.':
      'Используйте контакты WhatsApp в панели Directem.',
    'Launch your Directem access today': 'Начните доступ к Directem сегодня',
    'Secure employer data, clear pricing, and fast approvals in one place.':
      'Безопасные данные, прозрачные цены и быстрые одобрения.',
    'Create your Directem account': 'Создать аккаунт Directem',
  });

  mergeTranslations('ar', {
    'Private access for the Directem owner and owner-approved admins.':
      'وصول خاص لمالك Directem والمدراء المعتمدين.',
    'Sign in to access employer contacts.': 'سجّل الدخول للوصول إلى جهات الاتصال.',
    'you@company.com': 'you@company.com',
    'Need admin access? Request admin access': 'تحتاج وصول مدير؟ اطلب وصول المدير',
    'Buyer access? Use the buyer sign in page': 'وصول المشتري؟ استخدم صفحة تسجيل دخول المشتري',
    'New to Directem? Create an account': 'جديد على Directem؟ أنشئ حسابًا',
    'Need admin access?': 'تحتاج وصول مدير؟',
    'Admin request': 'طلب مدير',
    'Already approved?': 'تمت الموافقة؟',
    'Already approved? Sign in as admin': 'تمت الموافقة؟ سجّل الدخول كمدير',
    'Request admin access': 'طلب وصول المدير',
    'Admin access is granted only after owner approval.':
      'يتم منح وصول المدير بعد موافقة المالك فقط.',
    'Create your Directem account': 'أنشئ حساب Directem',
    'Access verified UAE employer contacts in minutes.':
      'احصل على جهات اتصال أصحاب عمل موثّقة خلال دقائق.',
    'Account created. Check your email to confirm, then sign in.':
      'تم إنشاء الحساب. تحقق من بريدك ثم سجّل الدخول.',
    'Admin request created. Check your email to confirm, then wait for owner approval.':
      'تم إنشاء طلب المدير. تحقق من بريدك ثم انتظر موافقة المالك.',
    'Already have an account?': 'لديك حساب؟',
    'Sign in': 'سجّل الدخول',
    'Reset your password': 'إعادة تعيين كلمة المرور',
    'We will email you a secure link to reset your password.':
      'سنرسل لك رابطًا آمنًا لإعادة تعيين كلمة المرور.',
    'Send reset link': 'إرسال رابط الاستعادة',
    'Sending...': 'جارٍ الإرسال...',
    'Check your email for a password reset link.':
      'تحقق من بريدك لرابط إعادة التعيين.',
    'Remembered your password?': 'تذكرت كلمة المرور؟',
    'Set a new password': 'تعيين كلمة مرور جديدة',
    'Choose a strong password to secure your account.':
      'اختر كلمة مرور قوية لتأمين حسابك.',
    'Use the password reset link from your email to open this page.':
      'استخدم رابط إعادة التعيين من بريدك لفتح هذه الصفحة.',
    'New password': 'كلمة مرور جديدة',
    'Confirm password': 'تأكيد كلمة المرور',
    'Repeat new password': 'أعد كتابة كلمة المرور',
    'Update password': 'تحديث كلمة المرور',
    'Updating...': 'جارٍ التحديث...',
    'Password updated. You can now sign in.':
      'تم تحديث كلمة المرور. يمكنك الآن تسجيل الدخول.',
    'Password must be at least 8 characters.':
      'يجب أن تكون كلمة المرور 8 أحرف على الأقل.',
    'Passwords do not match.': 'كلمتا المرور غير متطابقتين.',
  });

  mergeTranslations('ru', {
    'Private access for the Directem owner and owner-approved admins.':
      'Закрытый доступ для владельца Directem и одобренных админов.',
    'Sign in to access employer contacts.':
      'Войдите, чтобы получить доступ к контактам.',
    'Need admin access? Request admin access':
      'Нужен доступ админа? Запросить доступ',
    'Buyer access? Use the buyer sign in page':
      'Покупатель? Используйте страницу входа',
    'New to Directem? Create an account':
      'Новый пользователь? Создать аккаунт',
    'Need admin access?': 'Нужен доступ админа?',
    'Admin request': 'Запрос админа',
    'Already approved?': 'Уже одобрены?',
    'Already approved? Sign in as admin':
      'Уже одобрены? Войти как админ',
    'Request admin access': 'Запросить доступ админа',
    'Admin access is granted only after owner approval.':
      'Доступ админа выдается только после одобрения владельца.',
    'Access verified UAE employer contacts in minutes.':
      'Получите доступ к проверенным контактам ОАЭ за минуты.',
    'Account created. Check your email to confirm, then sign in.':
      'Аккаунт создан. Проверьте почту и войдите.',
    'Admin request created. Check your email to confirm, then wait for owner approval.':
      'Запрос админа создан. Проверьте почту и ждите одобрения владельца.',
    'Already have an account?': 'Уже есть аккаунт?',
    'Reset your password': 'Сброс пароля',
    'We will email you a secure link to reset your password.':
      'Мы отправим безопасную ссылку для сброса пароля.',
    'Send reset link': 'Отправить ссылку',
    'Sending...': 'Отправляем...',
    'Check your email for a password reset link.':
      'Проверьте почту для ссылки сброса.',
    'Remembered your password?': 'Вспомнили пароль?',
    'Set a new password': 'Установить новый пароль',
    'Choose a strong password to secure your account.':
      'Выберите надежный пароль для защиты аккаунта.',
    'Use the password reset link from your email to open this page.':
      'Откройте эту страницу по ссылке из письма.',
    'New password': 'Новый пароль',
    'Confirm password': 'Повторите пароль',
    'Repeat new password': 'Повторите новый пароль',
    'Update password': 'Обновить пароль',
    'Updating...': 'Обновляем...',
    'Password updated. You can now sign in.':
      'Пароль обновлен. Теперь вы можете войти.',
    'Password must be at least 8 characters.':
      'Пароль должен быть не менее 8 символов.',
    'Passwords do not match.': 'Пароли не совпадают.',
  });

  mergeTranslations('ar', {
    'Directem Marketplace': 'سوق Directem',
    'Welcome, {name}. Unlock verified UAE employer contacts.':
      'مرحبًا، {name}. افتح جهات اتصال أصحاب عمل موثّقة في الإمارات.',
    'Choose your package': 'اختر باقتك',
    'Purchase history': 'سجل المشتريات',
    'No purchases yet. Select a package to get started.':
      'لا توجد مشتريات بعد. اختر باقة للبدء.',
    'Your unlocked contacts': 'جهات الاتصال المفتوحة',
    'No unlocked contacts yet. Once an admin approves your purchase, contacts will appear here.':
      'لا توجد جهات اتصال مفتوحة بعد. ستظهر بعد موافقة المدير على طلبك.',
    'Access request submitted. Admin approval is required before contacts unlock.':
      'تم إرسال طلب الوصول. يلزم موافقة المدير قبل فتح جهات الاتصال.',
    'Pending approval. You can submit a new request once this is resolved.':
      'بانتظار الموافقة. يمكنك إرسال طلب جديد بعد حل هذا الطلب.',
    'Requested {date}': 'تم الطلب بتاريخ {date}',
    'Submit request': 'إرسال الطلب',
    'Submitting...': 'جارٍ الإرسال...',
    'Payment received. Reference: {ref}': 'تم استلام الدفع. المرجع: {ref}',
    'Pay with card or PayPal': 'ادفع بالبطاقة أو PayPal',
    'PayPal is not configured yet. Add your PayPal client ID to enable card payments.':
      'لم يتم إعداد PayPal بعد. أضف معرّف العميل لتفعيل الدفع.',
  });

  mergeTranslations('ru', {
    'Directem Marketplace': 'Маркетплейс Directem',
    'Welcome, {name}. Unlock verified UAE employer contacts.':
      'Добро пожаловать, {name}. Откройте проверенные контакты работодателей ОАЭ.',
    'Choose your package': 'Выберите пакет',
    'Purchase history': 'История покупок',
    'No purchases yet. Select a package to get started.':
      'Покупок нет. Выберите пакет, чтобы начать.',
    'Your unlocked contacts': 'Открытые контакты',
    'No unlocked contacts yet. Once an admin approves your purchase, contacts will appear here.':
      'Контактов нет. После одобрения админом они появятся здесь.',
    'Access request submitted. Admin approval is required before contacts unlock.':
      'Запрос отправлен. Требуется одобрение админа.',
    'Pending approval. You can submit a new request once this is resolved.':
      'Ожидает одобрения. Новый запрос можно отправить позже.',
    'Requested {date}': 'Запрос от {date}',
    'Submit request': 'Отправить запрос',
    'Submitting...': 'Отправляем...',
    'Payment received. Reference: {ref}': 'Платеж получен. Референс: {ref}',
    'Pay with card or PayPal': 'Оплатить картой или PayPal',
    'PayPal is not configured yet. Add your PayPal client ID to enable card payments.':
      'PayPal не настроен. Добавьте client ID, чтобы включить оплату.',
  });

  mergeTranslations('ar', {
    'Directem Admin Workspace': 'مساحة مدير Directem',
    'Manage packages, employer contacts, and purchase approvals.':
      'إدارة الباقات وجهات الاتصال وموافقات الشراء.',
    'Packages': 'الباقات',
    'Employers': 'أصحاب العمل',
    'Pending approvals': 'طلبات معلّقة',
    'Purchase requests': 'طلبات الشراء',
    'Purchase approvals': 'موافقات الشراء',
    'No purchases yet.': 'لا توجد طلبات بعد.',
    'Payment ref:': 'مرجع الدفع:',
    'Preferred job:': 'الوظيفة المفضلة:',
    'Salary:': 'الراتب:',
    'Notes:': 'ملاحظات:',
    'Approve & assign': 'موافقة وتخصيص',
    'Reject': 'رفض',
    'Add new package': 'إضافة باقة جديدة',
    'Package name': 'اسم الباقة',
    'USD price': 'السعر بالدولار',
    'Active': 'نشط',
    'Add': 'إضافة',
    'Employer contacts': 'جهات اتصال أصحاب العمل',
    'Company name': 'اسم الشركة',
    'Contact name': 'اسم جهة الاتصال',
    'Job title': 'المسمى الوظيفي',
    'Phone': 'هاتف',
    'Email': 'البريد الإلكتروني',
    'City': 'المدينة',
    'Country': 'الدولة',
    'Add employer': 'إضافة صاحب عمل',
    'Package updated.': 'تم تحديث الباقة.',
    'New package added.': 'تمت إضافة باقة جديدة.',
    'Employer contact added.': 'تمت إضافة جهة الاتصال.',
    'Purchase approved. {count} contacts assigned.':
      'تمت الموافقة على الطلب. تم تخصيص {count} جهة اتصال.',
    'Purchase rejected.': 'تم رفض الطلب.',
    'Company name is required.': 'اسم الشركة مطلوب.',
    'Unable to load Directem admin data.': 'تعذر تحميل بيانات المدير.',
    'Directem Owner Console': 'لوحة مالك Directem',
    'Approve admins and oversee marketplace activity.':
      'اعتماد المدراء ومتابعة نشاط السوق.',
    'Purchases': 'عمليات الشراء',
    'Admin approvals': 'موافقات المدراء',
    'No admin accounts found.': 'لا توجد حسابات مدراء.',
    'Approve': 'موافقة',
    'Block': 'حظر',
    'Unblock': 'إلغاء الحظر',
    'Admin settings updated.': 'تم تحديث إعدادات المدير.',
    'Unable to load owner dashboard.': 'تعذر تحميل لوحة المالك.',
    'Admin account blocked': 'حساب المدير محظور',
    'Your admin account has been blocked by the owner. Contact support if this is unexpected.':
      'تم حظر حسابك من قبل المالك. تواصل مع الدعم إذا كان ذلك غير متوقع.',
    'Admin approval required': 'موافقة المدير مطلوبة',
    'Your admin account is pending owner approval.':
      'حساب المدير الخاص بك بانتظار موافقة المالك.',
  });

  mergeTranslations('ru', {
    'Directem Admin Workspace': 'Панель админа Directem',
    'Manage packages, employer contacts, and purchase approvals.':
      'Управление пакетами, контактами и одобрениями.',
    'Packages': 'Пакеты',
    'Employers': 'Работодатели',
    'Pending approvals': 'Ожидают одобрения',
    'Purchase requests': 'Запросы на покупку',
    'Purchase approvals': 'Одобрения покупок',
    'No purchases yet.': 'Покупок пока нет.',
    'Payment ref:': 'Референс оплаты:',
    'Preferred job:': 'Желаемая должность:',
    'Salary:': 'Зарплата:',
    'Notes:': 'Примечания:',
    'Approve & assign': 'Одобрить и назначить',
    'Reject': 'Отклонить',
    'Add new package': 'Добавить новый пакет',
    'Package name': 'Название пакета',
    'USD price': 'Цена USD',
    'Active': 'Активно',
    'Add': 'Добавить',
    'Employer contacts': 'Контакты работодателей',
    'Company name': 'Название компании',
    'Contact name': 'Имя контакта',
    'Job title': 'Должность',
    'Phone': 'Телефон',
    'Email': 'Email',
    'City': 'Город',
    'Country': 'Страна',
    'Add employer': 'Добавить работодателя',
    'Package updated.': 'Пакет обновлен.',
    'New package added.': 'Новый пакет добавлен.',
    'Employer contact added.': 'Контакт добавлен.',
    'Purchase approved. {count} contacts assigned.':
      'Покупка одобрена. Назначено {count} контактов.',
    'Purchase rejected.': 'Покупка отклонена.',
    'Company name is required.': 'Название компании обязательно.',
    'Unable to load Directem admin data.': 'Не удалось загрузить данные админа.',
    'Directem Owner Console': 'Консоль владельца Directem',
    'Approve admins and oversee marketplace activity.':
      'Одобряйте админов и контролируйте активность.',
    'Purchases': 'Покупки',
    'Admin approvals': 'Одобрения админов',
    'No admin accounts found.': 'Админов нет.',
    'Approve': 'Одобрить',
    'Block': 'Заблокировать',
    'Unblock': 'Разблокировать',
    'Admin settings updated.': 'Настройки админа обновлены.',
    'Unable to load owner dashboard.': 'Не удалось загрузить панель владельца.',
    'Admin account blocked': 'Аккаунт админа заблокирован',
    'Your admin account has been blocked by the owner. Contact support if this is unexpected.':
      'Ваш аккаунт админа заблокирован владельцем. Свяжитесь с поддержкой, если это ошибка.',
    'Admin approval required': 'Требуется одобрение админа',
    'Your admin account is pending owner approval.':
      'Ваш аккаунт админа ожидает одобрения владельца.',
  });

  mergeTranslations('ar', {
    'Hiring Desk': 'قسم التوظيف',
    'HR Operations': 'عمليات الموارد البشرية',
    'Talent Desk': 'قسم المواهب',
    'you@company.com': 'you@company.com',
    'Language': 'اللغة',
  });

  mergeTranslations('ru', {
    'Hiring Desk': 'Отдел найма',
    'HR Operations': 'HR операции',
    'Talent Desk': 'Отдел талантов',
    'you@company.com': 'you@company.com',
    'Language': 'Язык',
  });

  mergeTranslations('ar', {
    'Preferred position': 'المنصب المفضل',
    'Preferred city (UAE)': 'المدينة المفضلة (الإمارات)',
    'e.g. Dubai': 'مثال: دبي',
    'Preferred position:': 'المنصب المفضل:',
    'Preferred city:': 'المدينة المفضلة:',
  });

  mergeTranslations('ru', {
    'Preferred position': 'Предпочтительная должность',
    'Preferred city (UAE)': 'Предпочтительный город (ОАЭ)',
    'e.g. Dubai': 'например: Дубай',
    'Preferred position:': 'Предпочтительная должность:',
    'Preferred city:': 'Предпочтительный город:',
  });
}
