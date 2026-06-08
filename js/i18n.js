/* ============================================================
   Lahza — lightweight i18n (TR / EN)
   - Auto-detects browser language on first visit, remembers choice.
   - Tag elements: data-i18n="key" (textContent),
                   data-i18n-html="key" (innerHTML, for markup),
                   data-i18n-attr="placeholder:key;title:key2".
   - Toggle buttons: data-lang-btn="tr" / "en".
   - Read a string from script: LahzaI18N.t('key').
   ============================================================ */
(function () {
  'use strict';

  var DICT = {
    en: {
      /* ---- nav / footer (marketing) ---- */
      'nav.blog': 'Blog',
      'nav.how': 'How it Works',
      'nav.features': 'Features',
      'nav.pricing': 'Pricing',
      'nav.download': 'Download',
      'footer.tagline': 'A shared camera for your events. Capture your day through everyone’s eyes.',
      'footer.product': 'Product',
      'footer.useCases': 'Use Cases',
      'footer.company': 'Company',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Use',
      'footer.rights': '© 2026 Lahza. All rights reserved.',
      'footer.made': 'Made with <span class="heart">♥</span> for memories.',
      'uc.wedding': 'Wedding',
      'uc.birthday': 'Birthday',
      'uc.party': 'Party',
      'uc.trip': 'Trip',
      'uc.everyday': 'Everyday',

      /* ---- index: hero ---- */
      'hero.eyebrow': 'A shared camera for your events',
      'hero.title': 'Capture your day<br>through <span class="accent">everyone’s eyes.</span>',
      'hero.lead': 'Lahza is a shared camera for your events. Guests join with a QR code — no download needed. The album reveals when the moment ends.',

      /* ---- index: stats ---- */
      'stats.appstore': 'App Store',
      'stats.memories': 'Memories Captured',
      'stats.events': 'Events Created',
      'stats.rank': 'Event Camera · App 2024',

      /* ---- index: how ---- */
      'how.eyebrow': 'Step by step',
      'how.title': 'How a Moment<br>Becomes a Memory.',
      'how.s1.title': 'Create Your Camera',
      'how.s1.text': 'Name your event, set how many shots each guest gets, and choose when the album reveals.',
      'how.s2.title': 'Invite Your Guests',
      'how.s2.text': 'Share a link or show a QR code. Guests join instantly — no account, no download.',
      'how.scan': 'SCAN TO JOIN',
      'how.s3.title': 'Watch It Unfold',
      'how.s3.text': 'When your camera closes, the album reveals. See your day through 20 different eyes.',

      /* ---- index: usecases ---- */
      'usecases.eyebrow': 'Made for every moment',
      'usecases.quote': 'Your guests captured moments you never saw.',
      'usecases.wedding': 'Perfect for <span class="accent">weddings</span> — see every table, every tear, every dance.',
      'usecases.birthday': 'Every <span class="accent">birthday</span> wish, candle and surprise — caught from the crowd, not just the host.',
      'usecases.party': 'The <span class="accent">party</span> as everyone lived it — the late nights you’d otherwise forget.',
      'usecases.trip': 'One shared roll for the whole <span class="accent">trip</span> — every viewpoint, one album.',
      'usecases.everyday': 'Even an <span class="accent">everyday</span> dinner becomes worth remembering when everyone shoots it.',

      /* ---- index: features ---- */
      'features.eyebrow': 'Features',
      'features.title': 'Built like a<br>disposable camera.',
      'features.f1.title': '25 Shots.<br>Make them count.',
      'features.f1.text': 'Each guest gets a limited number of shots — that disposable-camera feeling, where every frame matters.',
      'features.f1.lbl': 'Shots Left',
      'features.f2.title': 'The album waits.<br>The moment arrives.',
      'features.f2.text': 'Photos stay hidden until your event ends. The big reveal turns an album into a surprise.',
      'features.f2.ends': 'Ends at',
      'features.f3.title': 'QR code.<br>Instant access.',
      'features.f3.text': 'Guests scan and shoot in seconds. No app install, no account, no friction.',

      /* ---- index: testimonials ---- */
      'testi.eyebrow': 'Loved by thousands',
      'testi.title': 'Real events.<br>Real memories.',
      'testi.1.text': '“We got 400 photos from our wedding we’d never have seen. The reveal the next morning had us both in tears.”',
      'testi.1.meta': '<b>Hannah R.</b> · Wedding · May 2026',
      'testi.2.text': '“The shot limit is genius. People actually look up from their phones and make each photo count.”',
      'testi.2.meta': '<b>Marco D.</b> · Birthday · Apr 2026',
      'testi.3.text': '“No download for guests was the killer feature. Everyone joined in seconds, even my grandparents.”',
      'testi.3.meta': '<b>Priya S.</b> · Reunion · Mar 2026',
      'testi.cta': 'See real events',

      /* ---- index: pricing ---- */
      'pricing.eyebrow': 'Pricing',
      'pricing.title': 'Simple, one-time<br>pricing for your event.',
      'pricing.lead': 'You only pay once per event — no subscriptions, no renewals. Your price depends on how many guests can join and capture the moment with you.',
      'pricing.cta': 'Create your event for free',
      'pricing.upTo': 'Up to',
      'pricing.participants': 'Participants',
      'pricing.free': 'Free',
      'pricing.included': 'Included',
      'pricing.perEvent': ' / event',
      'pricing.letsTalk': 'Let’s talk',
      'pricing.maxGuests': 'Maximum of {n} guests can join your event',
      'pricing.customMax': 'More than 200 guests — we’ll tailor a plan for you',
      'pricing.inc1': 'Customize your album the way you want',
      'pricing.inc2': 'Set how many shots each guest can take',
      'pricing.inc3': 'Choose and adjust your favorite filters',
      'pricing.inc4': 'See exactly who took each photo',
      'pricing.inc5': 'Keep your event private and secure',
      'pricing.inc6': 'Invite guests easily with a QR code or link',

      /* ---- index: final ---- */
      'final.title': 'Life happens once.<br>Don’t let it fade away.',
      'final.note': 'Join 50,000+ hosts who’ve already captured their moments.',

      /* ---- blog ---- */
      'blog.eyebrow': 'The Journal',
      'blog.title': 'Stories from <span class="accent">every angle.</span>',
      'blog.lead': 'Tips, real events and ideas on capturing your day through everyone’s eyes — straight from the Lahza team and the hosts who use it.',
      'blog.featuredCat': 'Featured · Behind the Moment',
      'blog.featuredTitle': 'The 6 a.m. reveal: why waiting makes the album hit harder',
      'blog.featuredText': 'We dug into thousands of Lahza events to understand the magic of the timed reveal — and why the photos you can’t see yet are the ones you’ll never forget.',
      'blog.readStory': 'Read the story',
      'blog.featuredMeta': '<b>Lahza Team</b> · 7 min read · Jun 2026',
      'blog.cat.guides': 'Guides',
      'blog.cat.weddings': 'Weddings',
      'blog.cat.product': 'Product',
      'blog.cat.inspiration': 'Inspiration',
      'blog.cat.behind': 'Behind the Moment',
      'blog.cat.privacy': 'Privacy',
      'blog.p1.title': 'How many shots should each guest get?',
      'blog.p1.text': '5, 25 or unlimited? A simple framework for setting the shot limit that fits your event.',
      'blog.p1.meta': '<b>Hannah R.</b> · 4 min read',
      'blog.p2.title': 'A shared camera beats a hashtag every time',
      'blog.p2.text': 'Why couples are retiring the wedding hashtag in favour of one private, shared roll.',
      'blog.p2.meta': '<b>Priya S.</b> · 5 min read',
      'blog.p3.title': 'QR, no download: the science of zero friction',
      'blog.p3.text': 'How we got guests from “scan” to “shoot” in under eight seconds — grandparents included.',
      'blog.p3.meta': '<b>Lahza Team</b> · 6 min read',
      'blog.p4.title': '10 events that aren’t weddings (but should use Lahza)',
      'blog.p4.text': 'From reunions to road trips — the everyday moments worth capturing from every angle.',
      'blog.p4.meta': '<b>Marco D.</b> · 3 min read',
      'blog.p5.title': 'The disposable camera, reborn for the group chat era',
      'blog.p5.text': 'What a 90s plastic camera taught us about making every single frame count.',
      'blog.p5.meta': '<b>Lahza Team</b> · 5 min read',
      'blog.p6.title': 'Your event, your album, your rules',
      'blog.p6.text': 'How Lahza keeps every roll private and secure — and exactly who can see what.',
      'blog.p6.meta': '<b>Lahza Team</b> · 4 min read',
      'blog.startCta': 'Start your own camera',

      /* ---- join.html ---- */
      'join.loading': 'Loading event…',
      'join.notFoundTitle': 'Event not found',
      'join.notFoundSub': 'This QR code may have expired or been removed.',
      'join.openApp': 'Open in Lahza App →',
      'join.or': 'or',
      'join.continueWeb': 'Continue on Web',
      'join.live': '🟡 Live',
      'join.ended': '⏹ Ended',
      'join.endsLabel': 'Ends',
      'join.shotsPerPerson': 'shots/person',

      /* ---- auth.html ---- */
      'auth.checking': 'Checking session…',
      'auth.title': 'Join the moment',
      'auth.sub': 'Sign in to take photos for this event. Your shots are saved to the shared gallery.',
      'auth.joining': 'Joining',
      'auth.theEvent': 'the event',
      'auth.google': 'Continue with Google',
      'auth.apple': 'Continue with Apple',
      'auth.note': 'By continuing you agree to share your photos in the event gallery and accept our <a href="terms.html" style="color:var(--ink60);text-decoration:underline">Terms</a> &amp; <a href="privacy.html" style="color:var(--ink60);text-decoration:underline">Privacy Policy</a>. We only use your account to link your contributions.',
      'auth.failed': 'Sign-in failed. Please try again.',

      /* ---- camera.html ---- */
      'cam.setup': 'Setting up your camera…',
      'cam.noEvent': 'No event found. Please scan the QR code again.',
      'cam.connErr': 'Connection error. Please check your internet and try again.',
      'cam.shotsRemaining': 'Shots<br>Remaining',
      'cam.unavailable': 'Camera unavailable — tap 🖼 to pick a photo',
      'cam.yourShot': 'Your shot',
      'cam.send': 'Send to gallery',
      'cam.uploading': 'Uploading…',
      'cam.added': '✓ Shot added to the gallery',
      'cam.uploadFail': 'Upload failed',
      'cam.netErr': 'Network error. Please try again.',
      'cam.noShots': 'No shots left.',
      'cam.captureErr': 'Could not capture. Try again.',
      'cam.doneAll': 'All shots used!',
      'cam.doneNone': 'No shots remaining',
      'cam.doneAllSub': 'You’ve used all your shots for this event. The album reveals when the moment ends.',
      'cam.doneNoneSub': 'You have no shots left for this event.',
      'cam.viewGallery': 'View the gallery',
      'cam.shareEvent': 'Share this event',
      'cam.linkCopied': 'Link copied',
      'cam.endsAt': 'Ends {day} at {time}',

      /* ---- gallery.html ---- */
      'gal.loading': 'Loading gallery…',
      'gal.album': '📸 The Album',
      'gal.lockedTitle': 'The album is still developing',
      'gal.lockedSub': 'Photos stay hidden until the event ends. Come back for the big reveal.',
      'gal.emptyTitle': 'No photos yet',
      'gal.emptySub': 'No one has added a shot to this album yet.',
      'gal.notFoundTitle': 'Gallery not found',
      'gal.notFoundSub': 'This link may have expired or been removed.',
      'gal.locked': '🔒 Locked',
      'gal.photo': 'photo',
      'gal.photos': 'photos',
      'gal.by': 'by',
      'gal.cd.days': 'days',
      'gal.cd.hrs': 'hrs',
      'gal.cd.min': 'min',
      'gal.cd.sec': 'sec',

      /* ---- 404.html ---- */
      'e404.title': 'This page faded away',
      'e404.sub': 'The page you’re looking for doesn’t exist, or the moment it captured has already passed.',
      'e404.back': 'Back to Lahza →'
    },

    tr: {
      /* ---- nav / footer ---- */
      'nav.blog': 'Blog',
      'nav.how': 'Nasıl Çalışır',
      'nav.features': 'Özellikler',
      'nav.pricing': 'Fiyatlandırma',
      'nav.download': 'İndir',
      'footer.tagline': 'Etkinlikleriniz için ortak bir kamera. Gününüzü herkesin gözünden yakalayın.',
      'footer.product': 'Ürün',
      'footer.useCases': 'Kullanım Alanları',
      'footer.company': 'Şirket',
      'footer.privacy': 'Gizlilik Politikası',
      'footer.terms': 'Kullanım Şartları',
      'footer.rights': '© 2026 Lahza. Tüm hakları saklıdır.',
      'footer.made': 'Anılar için <span class="heart">♥</span> ile yapıldı.',
      'uc.wedding': 'Düğün',
      'uc.birthday': 'Doğum Günü',
      'uc.party': 'Parti',
      'uc.trip': 'Gezi',
      'uc.everyday': 'Günlük',

      /* ---- index: hero ---- */
      'hero.eyebrow': 'Etkinlikleriniz için ortak kamera',
      'hero.title': 'Gününüzü<br><span class="accent">herkesin gözünden</span> yakalayın.',
      'hero.lead': 'Lahza, etkinlikleriniz için ortak bir kameradır. Misafirler QR kodla katılır — uygulama indirmeye gerek yok. An sona erdiğinde albüm açılır.',

      /* ---- index: stats ---- */
      'stats.appstore': 'App Store',
      'stats.memories': 'Yakalanan Anı',
      'stats.events': 'Oluşturulan Etkinlik',
      'stats.rank': 'Etkinlik Kamerası · Uygulama 2024',

      /* ---- index: how ---- */
      'how.eyebrow': 'Adım adım',
      'how.title': 'Bir An Nasıl<br>Anıya Dönüşür.',
      'how.s1.title': 'Kameranızı Oluşturun',
      'how.s1.text': 'Etkinliğinize isim verin, her misafirin kaç kare çekeceğini belirleyin ve albümün ne zaman açılacağını seçin.',
      'how.s2.title': 'Misafirlerinizi Davet Edin',
      'how.s2.text': 'Bir bağlantı paylaşın ya da QR kod gösterin. Misafirler anında katılır — hesap yok, indirme yok.',
      'how.scan': 'KATILMAK İÇİN TARA',
      'how.s3.title': 'Açılışını İzleyin',
      'how.s3.text': 'Kameranız kapanınca albüm açılır. Gününüzü 20 farklı gözden görün.',

      /* ---- index: usecases ---- */
      'usecases.eyebrow': 'Her an için',
      'usecases.quote': 'Misafirleriniz, sizin hiç görmediğiniz anları yakaladı.',
      'usecases.wedding': '<span class="accent">Düğünler</span> için mükemmel — her masa, her gözyaşı, her dans.',
      'usecases.birthday': 'Her <span class="accent">doğum günü</span> dileği, mumu ve sürprizi — sadece ev sahibinden değil, kalabalıktan.',
      'usecases.party': '<span class="accent">Parti</span> herkesin yaşadığı gibi — yoksa unutacağınız geç saatler.',
      'usecases.trip': 'Tüm <span class="accent">gezi</span> için tek ortak rulo — her bakış açısı, tek albüm.',
      'usecases.everyday': 'Sıradan bir <span class="accent">akşam</span> yemeği bile herkes çekince hatırlamaya değer olur.',

      /* ---- index: features ---- */
      'features.eyebrow': 'Özellikler',
      'features.title': 'Bir kullan-at<br>kamera gibi.',
      'features.f1.title': '25 Kare.<br>Her biri değersin.',
      'features.f1.text': 'Her misafir sınırlı sayıda kare alır — her karenin önemli olduğu o kullan-at kamera hissi.',
      'features.f1.lbl': 'Kare Kaldı',
      'features.f2.title': 'Albüm bekler.<br>An gelir.',
      'features.f2.text': 'Fotoğraflar etkinlik bitene kadar gizli kalır. Büyük açılış, albümü bir sürprize dönüştürür.',
      'features.f2.ends': 'Bitiş',
      'features.f3.title': 'QR kod.<br>Anında erişim.',
      'features.f3.text': 'Misafirler saniyeler içinde tarar ve çeker. Uygulama yok, hesap yok, engel yok.',

      /* ---- index: testimonials ---- */
      'testi.eyebrow': 'Binlerce kişi sevdi',
      'testi.title': 'Gerçek etkinlikler.<br>Gerçek anılar.',
      'testi.1.text': '“Düğünümüzden asla göremeyeceğimiz 400 fotoğraf aldık. Ertesi sabahki açılış ikimizi de ağlattı.”',
      'testi.1.meta': '<b>Hannah R.</b> · Düğün · Mayıs 2026',
      'testi.2.text': '“Kare sınırı dahice. İnsanlar gerçekten telefonlarından başını kaldırıp her kareyi değerli kılıyor.”',
      'testi.2.meta': '<b>Marco D.</b> · Doğum Günü · Nis 2026',
      'testi.3.text': '“Misafirler için indirme olmaması muhteşemdi. Herkes saniyeler içinde katıldı, büyükanneannem bile.”',
      'testi.3.meta': '<b>Priya S.</b> · Buluşma · Mar 2026',
      'testi.cta': 'Gerçek etkinlikleri gör',

      /* ---- index: pricing ---- */
      'pricing.eyebrow': 'Fiyatlandırma',
      'pricing.title': 'Etkinliğiniz için basit,<br>tek seferlik fiyat.',
      'pricing.lead': 'Etkinlik başına yalnızca bir kez ödersiniz — abonelik yok, yenileme yok. Fiyatınız kaç misafirin katılıp anı sizinle yakalayacağına bağlıdır.',
      'pricing.cta': 'Etkinliğini ücretsiz oluştur',
      'pricing.upTo': 'En fazla',
      'pricing.participants': 'Katılımcı',
      'pricing.free': 'Ücretsiz',
      'pricing.included': 'Dahil',
      'pricing.perEvent': ' / etkinlik',
      'pricing.letsTalk': 'Konuşalım',
      'pricing.maxGuests': 'Etkinliğinize en fazla {n} misafir katılabilir',
      'pricing.customMax': '200’den fazla misafir — size özel bir plan hazırlarız',
      'pricing.inc1': 'Albümünüzü istediğiniz gibi özelleştirin',
      'pricing.inc2': 'Her misafirin kaç kare çekeceğini belirleyin',
      'pricing.inc3': 'En sevdiğiniz filtreleri seçin ve ayarlayın',
      'pricing.inc4': 'Her fotoğrafı tam olarak kimin çektiğini görün',
      'pricing.inc5': 'Etkinliğinizi özel ve güvende tutun',
      'pricing.inc6': 'Misafirleri QR kod ya da bağlantıyla kolayca davet edin',

      /* ---- index: final ---- */
      'final.title': 'Hayat bir kez yaşanır.<br>Solup gitmesine izin vermeyin.',
      'final.note': 'Anılarını çoktan yakalamış 50.000’den fazla ev sahibine katılın.',

      /* ---- blog ---- */
      'blog.eyebrow': 'Günlük',
      'blog.title': 'Her açıdan <span class="accent">hikayeler.</span>',
      'blog.lead': 'Gününüzü herkesin gözünden yakalamaya dair ipuçları, gerçek etkinlikler ve fikirler — Lahza ekibinden ve kullanan ev sahiplerinden.',
      'blog.featuredCat': 'Öne Çıkan · Anın Ardında',
      'blog.featuredTitle': 'Sabah 6 açılışı: beklemek albümü neden daha vurucu yapar',
      'blog.featuredText': 'Zamanlı açılışın sırrını anlamak için binlerce Lahza etkinliğini inceledik — ve henüz göremediğiniz fotoğrafların neden asla unutmayacağınız fotoğraflar olduğunu.',
      'blog.readStory': 'Hikayeyi oku',
      'blog.featuredMeta': '<b>Lahza Ekibi</b> · 7 dk okuma · Haz 2026',
      'blog.cat.guides': 'Rehberler',
      'blog.cat.weddings': 'Düğünler',
      'blog.cat.product': 'Ürün',
      'blog.cat.inspiration': 'İlham',
      'blog.cat.behind': 'Anın Ardında',
      'blog.cat.privacy': 'Gizlilik',
      'blog.p1.title': 'Her misafir kaç kare almalı?',
      'blog.p1.text': '5, 25 ya da sınırsız? Etkinliğinize uygun kare sınırını belirlemek için basit bir yöntem.',
      'blog.p1.meta': '<b>Hannah R.</b> · 4 dk okuma',
      'blog.p2.title': 'Ortak kamera, her zaman hashtag’i yener',
      'blog.p2.text': 'Çiftler neden düğün hashtag’ini bırakıp tek bir özel, ortak ruloya geçiyor.',
      'blog.p2.meta': '<b>Priya S.</b> · 5 dk okuma',
      'blog.p3.title': 'QR, indirme yok: sıfır engel bilimi',
      'blog.p3.text': 'Misafirleri “tara” dan “çek” e sekiz saniyenin altında nasıl getirdik — büyükanne ve büyükbabalar dahil.',
      'blog.p3.meta': '<b>Lahza Ekibi</b> · 6 dk okuma',
      'blog.p4.title': 'Düğün olmayan (ama Lahza kullanmalı) 10 etkinlik',
      'blog.p4.text': 'Buluşmalardan yol gezilerine — her açıdan yakalamaya değer günlük anlar.',
      'blog.p4.meta': '<b>Marco D.</b> · 3 dk okuma',
      'blog.p5.title': 'Kullan-at kamera, grup sohbeti çağı için yeniden doğdu',
      'blog.p5.text': '90’ların plastik kamerası her bir kareyi değerli kılmak hakkında bize ne öğretti.',
      'blog.p5.meta': '<b>Lahza Ekibi</b> · 5 dk okuma',
      'blog.p6.title': 'Senin etkinliğin, senin albümün, senin kuralların',
      'blog.p6.text': 'Lahza her ruloyu nasıl özel ve güvende tutar — ve tam olarak kim neyi görebilir.',
      'blog.p6.meta': '<b>Lahza Ekibi</b> · 4 dk okuma',
      'blog.startCta': 'Kendi kameranı başlat',

      /* ---- join.html ---- */
      'join.loading': 'Etkinlik yükleniyor…',
      'join.notFoundTitle': 'Etkinlik bulunamadı',
      'join.notFoundSub': 'Bu QR kodun süresi dolmuş ya da kaldırılmış olabilir.',
      'join.openApp': 'Lahza Uygulamasında Aç →',
      'join.or': 'veya',
      'join.continueWeb': 'Web’de Devam Et',
      'join.live': '🟡 Canlı',
      'join.ended': '⏹ Bitti',
      'join.endsLabel': 'Bitiş',
      'join.shotsPerPerson': 'kare/kişi',

      /* ---- auth.html ---- */
      'auth.checking': 'Oturum kontrol ediliyor…',
      'auth.title': 'Ana katıl',
      'auth.sub': 'Bu etkinlik için fotoğraf çekmek üzere giriş yapın. Kareleriniz ortak galeriye kaydedilir.',
      'auth.joining': 'Katılıyorsun',
      'auth.theEvent': 'etkinliğe',
      'auth.google': 'Google ile Devam Et',
      'auth.apple': 'Apple ile Devam Et',
      'auth.note': 'Devam ederek fotoğraflarınızı etkinlik galerisinde paylaşmayı ve <a href="terms.html" style="color:var(--ink60);text-decoration:underline">Kullanım Şartları</a> ile <a href="privacy.html" style="color:var(--ink60);text-decoration:underline">Gizlilik Politikası</a>’nı kabul etmiş olursunuz. Hesabınızı yalnızca katkılarınızı ilişkilendirmek için kullanırız.',
      'auth.failed': 'Giriş başarısız. Lütfen tekrar deneyin.',

      /* ---- camera.html ---- */
      'cam.setup': 'Kameranız hazırlanıyor…',
      'cam.noEvent': 'Etkinlik bulunamadı. Lütfen QR kodu tekrar taratın.',
      'cam.connErr': 'Bağlantı hatası. İnternetinizi kontrol edip tekrar deneyin.',
      'cam.shotsRemaining': 'Kalan<br>Kare',
      'cam.unavailable': 'Kamera kullanılamıyor — fotoğraf seçmek için 🖼 dokunun',
      'cam.yourShot': 'Kareniz',
      'cam.send': 'Galeriye gönder',
      'cam.uploading': 'Yükleniyor…',
      'cam.added': '✓ Kare galeriye eklendi',
      'cam.uploadFail': 'Yükleme başarısız',
      'cam.netErr': 'Ağ hatası. Lütfen tekrar deneyin.',
      'cam.noShots': 'Kare kalmadı.',
      'cam.captureErr': 'Çekilemedi. Tekrar deneyin.',
      'cam.doneAll': 'Tüm kareler kullanıldı!',
      'cam.doneNone': 'Kare kalmadı',
      'cam.doneAllSub': 'Bu etkinlik için tüm karelerinizi kullandınız. An sona erdiğinde albüm açılır.',
      'cam.doneNoneSub': 'Bu etkinlik için kareniz kalmadı.',
      'cam.viewGallery': 'Galeriyi gör',
      'cam.shareEvent': 'Bu etkinliği paylaş',
      'cam.linkCopied': 'Bağlantı kopyalandı',
      'cam.endsAt': 'Bitiş: {day} {time}',

      /* ---- gallery.html ---- */
      'gal.loading': 'Galeri yükleniyor…',
      'gal.album': '📸 Albüm',
      'gal.lockedTitle': 'Albüm henüz gelişiyor',
      'gal.lockedSub': 'Fotoğraflar etkinlik bitene kadar gizli kalır. Büyük açılış için geri dönün.',
      'gal.emptyTitle': 'Henüz fotoğraf yok',
      'gal.emptySub': 'Bu albüme henüz kimse kare eklemedi.',
      'gal.notFoundTitle': 'Galeri bulunamadı',
      'gal.notFoundSub': 'Bu bağlantının süresi dolmuş ya da kaldırılmış olabilir.',
      'gal.locked': '🔒 Kilitli',
      'gal.photo': 'fotoğraf',
      'gal.photos': 'fotoğraf',
      'gal.by': 'çeken:',
      'gal.cd.days': 'gün',
      'gal.cd.hrs': 'saat',
      'gal.cd.min': 'dk',
      'gal.cd.sec': 'sn',

      /* ---- 404.html ---- */
      'e404.title': 'Bu sayfa solup gitti',
      'e404.sub': 'Aradığınız sayfa yok ya da yakaladığı an çoktan geçti.',
      'e404.back': 'Lahza’ya dön →'
    }
  };

  var KEY = 'lahza_lang';

  function detect() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'tr' || saved === 'en') return saved;
    } catch (e) {}
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return nav.indexOf('tr') === 0 ? 'tr' : 'en';
  }

  var lang = detect();

  function t(key, vars) {
    var table = DICT[lang] || DICT.en;
    var s = table[key];
    if (s == null) s = (DICT.en[key] != null ? DICT.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return s;
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length === 2) el.setAttribute(bits[0].trim(), t(bits[1].trim()));
      });
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
  }

  function set(l) {
    if (l !== 'tr' && l !== 'en') return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent('lahza:langchange', { detail: l }));
  }

  /* Toggle button styling (injected so pages don't need extra CSS) */
  function injectStyle() {
    if (document.getElementById('lahza-i18n-style')) return;
    var css =
      '.lang-toggle{display:inline-flex;align-items:center;gap:0;border:1px solid rgba(231,180,90,.45);' +
      'border-radius:999px;overflow:hidden;background:rgba(28,23,19,.5);flex-shrink:0}' +
      '.lang-toggle button{appearance:none;border:none;background:transparent;color:rgba(246,240,230,.6);' +
      'font:inherit;font-size:12px;font-weight:700;letter-spacing:.3px;padding:5px 10px;cursor:pointer;' +
      'line-height:1;transition:background .15s,color .15s;-webkit-tap-highlight-color:transparent}' +
      '.lang-toggle button.active{background:#E7B45A;color:#100C0A}';
    var st = document.createElement('style');
    st.id = 'lahza-i18n-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  window.LahzaI18N = { t: t, set: set, apply: apply, get: function () { return lang; } };

  injectStyle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { apply(); });
  } else {
    apply();
  }
})();
