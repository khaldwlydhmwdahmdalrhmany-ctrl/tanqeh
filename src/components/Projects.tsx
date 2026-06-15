/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  MapPin, 
  Calendar, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Image as ImageIcon, 
  ExternalLink,
  Droplet,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  PhoneCall,
  Tv,
  Award,
  Zap
} from 'lucide-react';

import projectV1Kitchen from '@/assets/projects/videos/project-v1-kitchen.mp4';
import projectV2Cooler from '@/assets/projects/videos/project-v2-cooler.mp4';
import projectV3Cafe from '@/assets/projects/videos/project-v3-cafe.mp4';
import projectV4Apartment from '@/assets/projects/videos/project-v4-apartment.mp4';
import projectV5Boiler from '@/assets/projects/videos/project-v5-boiler.mp4';
import projectV6Maintenance from '@/assets/projects/videos/project-v6-maintenance.mp4';
import projectV7GardenMist from '@/assets/projects/videos/project-v7-garden-mist.mp4';
import projectV8Espresso from '@/assets/projects/videos/project-v3-cafe.mp4';
import projectV9PalaceRo from '@/assets/projects/videos/project-v4-apartment.mp4';
import projectV10RooftopJumbo from '@/assets/projects/videos/project-v5-boiler.mp4';
import projectV11TripleJumbo from '@/assets/projects/videos/project-v1-kitchen.mp4';

import projectHomeFilterImg from '@/assets/projects/images/project-home-filter.jpg';
import projectCommercialRoImg from '@/assets/projects/images/project-commercial-ro.jpg';
import projectGardenMistImg from '@/assets/projects/images/project-commercial-ro.jpg';

interface FieldProject {
  id: string;
  title: string;
  category: 'filter' | 'central' | 'mist' | 'cooler';
  categoryLabel: string;
  location: string;
  customerName: string;
  date: string;
  systemModel: string;
  capacity: string;
  purityResult: string;
  notes: string;
  image: string;
  videoUrl: string;
  rating: number;
  tags: string[];
}

const FIELD_PROJECTS: FieldProject[] = [
  {
    id: 'PRJ-NV01',
    title: 'تركيب فلتر غولدن برو (7 مراحل المطور) وتوصيله ببرادة سول أكوا السوداء',
    category: 'filter',
    categoryLabel: 'فلاتر وأجهزة تحلية سكنية',
    location: 'الرياض، حي النرجس - فيلا سكنية',
    customerName: 'فيلا الأستاذ عبد الرحمن العتيبي',
    date: 'يونيو 2026',
    systemModel: 'جهاز تحلية غولدن برو (7 مراحل المتقدم)',
    capacity: '280 لتر مياه نقية يومياً للشرب والطبخ',
    purityResult: 'معدل أملاح موازن 65 PPM نقي وممتاز',
    notes: 'تم تثبيت الفلتر الفيتنامي ذو الـ 7 مراحل أسفل المجلى مع خزان ضغط فولاذي 40 لتر بدقة عالية، وتوصيله بموزع وبرادة مياه سول أكوا سوداء أنيقة لتوفير دائم للشرب دون قوارير.',
    image: projectHomeFilterImg,
    videoUrl: projectV1Kitchen,
    rating: 5,
    tags: ['تحلية غولدن برو', 'برادة مدمجة سلفر', 'تأسيس مخفي']
  },
  {
    id: 'PRJ-NV02',
    title: 'تأمين برادة التحلية الفضية سول أكوا الذكية المتصلة بفلتر غولدن برو',
    category: 'cooler',
    categoryLabel: 'برادات وموزعات مياه',
    location: 'الرياض، حي الصحافة - صالة استقبال شركة',
    customerName: 'مجموعة النبهان الاستثمارية',
    date: 'مايو 2026',
    systemModel: 'برادة سول أكوا الفضية (تغذية مبردة مستمرة)',
    capacity: 'خزان تبريد 3.2 لتر وسخان 1.5 لتر بأمان أطفال',
    purityResult: 'فحص مائي نقي صحي خالي من البكتيريا 70 PPM',
    notes: 'تركيب البرادة الفضية الفاخرة للشركة وتغذيتها مباشرة عبر الفلتر المدمج 5 مراحل لتحاشي تعب تبديل جيب القوارير، وتوفير ماء مبرد وساخن باستقرار.',
    image: projectCommercialRoImg,
    videoUrl: projectV2Cooler,
    rating: 5,
    tags: ['برادة مياه', 'توفير القوارير', 'تعقيم داخلي']
  },
  {
    id: 'PRJ-NV03',
    title: 'تأسيس نظام تحلية MAAS المركزي وتوصيل صانعة الثلج Brema والاسبرسو',
    category: 'central',
    categoryLabel: 'محطات مركزية وصناعية',
    location: 'الرياض، حي الياسمين - مقهى قشر حبة القهوة',
    customerName: 'كافيه فنجان قهوة المختصة',
    date: 'يونيو 2026',
    systemModel: 'نظام MAAS المركزي المتكامل لمعدات الكافيهات',
    capacity: '1200 لتر في اليوم للمعدات',
    purityResult: 'مستوى ملوحة 55 PPM (المثالي لنكهة وجودة الاسبرسو)',
    notes: 'تركيب الفلاتر الثلاثية ومضخة تايوانية فائقة السرعة مع أنابيب خضراء لتغذية جهاز الثلج الإيطالي Brema وآلة الاسبرسو لحمايتهم من الكلس والتكلسات.',
    image: projectCommercialRoImg,
    videoUrl: projectV3Cafe,
    rating: 5,
    tags: ['محطة كافيه', 'فلترة صانعة ثلج', 'طاقة إنتاجية عالية']
  },
  {
    id: 'PRJ-NV04',
    title: 'تركيب فلتر تحلية مائي Reeboon المزود بخزان ضغط أبيض ناصع 45 لتر',
    category: 'filter',
    categoryLabel: 'فلاتر وأجهزة تحلية سكنية',
    location: 'الرياض، حي الملقا - شقة سكنية عائلية',
    customerName: 'منزل الأستاذ أحمد الحربي',
    date: 'أبريل 2026',
    systemModel: 'جهاز Reeboon المطوّر لساعة قياس الضغط',
    capacity: 'إنتاج 280 لتر مياه نقية يومياً مع تدفق مستقر',
    purityResult: 'ملوحة متوازنة صحية 72 PPM',
    notes: 'تركيب الوحدة المدمجة 6 مراحل تحت المجلى وتأمين المياه العذبة لصنبور الكروم الفريش لضمان مياه نقية وصحية للطهي والشراب اليومي للأطفال.',
    image: projectHomeFilterImg,
    videoUrl: projectV4Apartment,
    rating: 5,
    tags: ['Reeboon تحلية', 'خزان ضغط تايواني', 'فلترة دقيقة']
  },
  {
    id: 'PRJ-NV05',
    title: 'تغذية وتوصيل خط ماء غلاية وموزع مياه Bunn الفاخر للمشروبات الساخنة',
    category: 'cooler',
    categoryLabel: 'برادات وموزعات مياه',
    location: 'الرياض، حي السليمانية - ركن تحضير المشروبات بالملحق',
    customerName: 'إدارة استراحة وعقارات العهد الماسي',
    date: 'يونيو 2026',
    systemModel: 'محابس نانو وتوصيلات Bunn الذكية بالبخار',
    capacity: 'تغذية مستمرة خالية من الكالسيوم والمعادن الثقيلة',
    purityResult: 'مياه منقاة عالية التطهير بـ 68 PPM لضمان الطعم',
    notes: 'تأسيس صمامات ومحابس زرقاء مرنة لإيصال المياه لغلاية Bunn الاحترافية لضمان ثبات جودة بخار الماء ومنع تراكم الأملاح والصدأ بالأداة بشكل تام.',
    image: projectHomeFilterImg,
    videoUrl: projectV5Boiler,
    rating: 5,
    tags: ['غلايات BUNN', 'فلترة بخارية نقية', 'محابس نانو زرقاء']
  },
  {
    id: 'PRJ-NV06',
    title: 'صيانة وتغيير شمعات الفلتر المنزلي مع بطاقة نثال المطبوعة المعتمدة',
    category: 'filter',
    categoryLabel: 'فلاتر وأجهزة تحلية سكنية',
    location: 'الرياض، حي الرمال - فيلا الأستاذة سهام الشمري',
    customerName: 'فيلا آل دحيم وبطاقة المتابعة',
    date: 'يونيو 2026',
    systemModel: 'برنامج صيانة نثال الدوري لتبديل الشمعات الفلترية',
    capacity: 'تنظيف خزان الضغط الفولاذي سعة 40 لتر بالكامل',
    purityResult: 'استئناف النقاء والتوازن لـ 65 PPM بعد الصيانة لـ 100%',
    notes: 'تظهر خدمات الصيانة الدورية من نثال؛ حيث يلتزم الفني بتبديل دقيق وتطهير الأنابيب مع وضع الملصق المعتمد وبه الهاتف الموحد للمؤسسة 0553033199.',
    image: projectHomeFilterImg,
    videoUrl: projectV6Maintenance,
    rating: 5,
    tags: ['هاتف صيانة 0553033199', 'تغيير شمعات مجدول', 'تنظيف الفلاتر']
  },
  {
    id: 'PRJ-NV07',
    title: 'تركيب مضخة رذاذ ضبابي إيطالية عالي الضغط 70 بار وجلسة حديقة منعشة',
    category: 'mist',
    categoryLabel: 'أنظمة رذاذ وتبريد ضبابي',
    location: 'الرياض، حي قرطبة - استراحة واستجمام عائلي',
    customerName: 'استراحة الأستاذ محمد الدوسري',
    date: 'مايو 2026',
    systemModel: 'مضخة نثال الإيطالية الصامتة مع خزان خلط أبيض متكامل',
    capacity: 'تغطية مساحة 100 متر مربع وضبط تشغيل بالثواني',
    purityResult: 'مياه فلترة كربونية مسبقة تمنع تماماً كلس الفوهات',
    notes: 'تجهيز خزان الخلط الدائري مع تركيب شبكة الأنابيب النايلون وفوهات السيراميك المضادة للتنقيط لتلطيف وهندسة هواء رطب ومريح في الصيف الحار.',
    image: projectGardenMistImg,
    videoUrl: projectV7GardenMist,
    rating: 5,
    tags: ['رذاذ تبريد إيطالي', 'خزان خلط أبيض', 'تايمر بالثواني']
  },
  {
    id: 'PRJ-NV08',
    title: 'تركيب نظام فلترة وتمرير المياه لأجهزة الاسبرسو والمشروبات الساخنة والباردة',
    category: 'filter',
    categoryLabel: 'فلاتر وأجهزة تحلية سكنية',
    location: 'الرياض، حي العليا - كافيه البن الفاخر',
    customerName: 'مقهى ومطبعة دوز للنكهة',
    date: 'أبريل 2026',
    systemModel: 'فلتر تحلية ثنائي لآلات التبخير والقهوة المعتمدة',
    capacity: 'حماية كاملة من انسداد الأنابيب الداخلية بالفحم المنشط والنانو',
    purityResult: 'معدل ملوحة 60 PPM مطابق لقوانين القهوة SCA',
    notes: 'ربط الفلتر مباشرة بمصدر مياه البلدية وفلترة الماء بـ 3 مراحل إضافية مدمجة لإزالة الكلور الكيميائي تماماً ومنح الاسبرسو طعمه الفريد.',
    image: projectCommercialRoImg,
    videoUrl: projectV8Espresso,
    rating: 5,
    tags: ['اسبرسو فلتر', 'متوافق مع SCA', 'كافيه دوز']
  },
  {
    id: 'PRJ-NV09',
    title: 'تجهيز وتأسيس محطة تحلية فندقية وتجارية عالية الطاقة مع خزان إيراني',
    category: 'central',
    categoryLabel: 'محطات مركزية وصناعية',
    location: 'شمال الرياض، حي الياسمين - مجمع قصور وفيلل',
    customerName: 'قصر آل ثاني وسكن الضيافة',
    date: 'مارس 2026',
    systemModel: 'محطة تحلية مياه مركزية RO إنتاجية ضخمة',
    capacity: '800 جالون مياه مفلترة يومياً مع ضاغط صامت',
    purityResult: 'مستوى أملاح ميكروني 60 PPM عذب مثالي',
    notes: 'قامت مؤسسة نثال في هذا المشروع بتجهيز كامل للمحطة لقصور سكنية كبيرة لضمان تدفق عذب وصحي لجميع شبكات الاستحمام والغسيل والمطابخ بأنابيب نانو آمنة.',
    image: projectCommercialRoImg,
    videoUrl: projectV9PalaceRo,
    rating: 5,
    tags: ['محطة قصور مركزية', '800 جالون يومياً', 'أنظمة تحلية مياه']
  },
  {
    id: 'PRJ-NV10',
    title: 'تركيب محطة فلترة جامبو ثلاثية الخزان العلوي لحماية المبنى والغسالات من الرمل والشوائب',
    category: 'central',
    categoryLabel: 'محطات مركزية وصناعية',
    location: 'الرياض، حي الملقا - عمارة سكنية عائلية',
    customerName: 'مبنى الفيلل الفاخرة للعهد',
    date: 'فبراير 2026',
    systemModel: 'نظام الفلتر الجامبو (Jumbo) الثلاثي من نثال',
    capacity: 'فلترة شاملة للشوائب الكبيرة والأتربة لخط المياه العلوي بالكامل',
    purityResult: 'تنقية مذهلة من الألوان والصدأ والكلور المترسب',
    notes: 'تم تجميع وتنصيب فلاتر جامبو على السطح بعد عداد المياه لحماية عيون الغسالات وخلاطات المطبخ والحمامات بالمبنى لزيادة عمرها وتفادي بقع الملابس البيضاء.',
    image: projectHomeFilterImg,
    videoUrl: projectV10RooftopJumbo,
    rating: 5,
    tags: ['فلتر جامبو ثلاثي', 'حماية الخزان العلوي', 'مكافحة الترسبات والصدأ']
  },
  {
    id: 'PRJ-NV11',
    title: 'توسيع وتأسيس نظام الفلترة الثلاثية المتقدم للمباني والمصانع التجارية الكبيرة',
    category: 'central',
    categoryLabel: 'محطات مركزية وصناعية',
    location: 'الرياض، حي السلي - مستودع ومنشأة تجارية',
    customerName: 'شركة النسيج الدولية للملبوسات',
    date: 'يناير 2026',
    systemModel: 'نظام نثال الصناعي العملاق لتنقية وتلطيف الهواء',
    capacity: 'تركيب مضخات وقدرة تغذية على مدار 24 ساعة متواصلة',
    purityResult: 'مياه غاية بالنقاوة لمنع انزلاقات الصدأ',
    notes: 'تركيب النظام الثلاثي لضمان خروج ماء ناعم وخالي من الكالسيوم والمعادن الثقيلة لحماية الأفران البخارية والآلات الصناعية وغسالات الاستعمال الرياضي الكثيف.',
    image: projectCommercialRoImg,
    videoUrl: projectV11TripleJumbo,
    rating: 5,
    tags: ['فلترة صناعية', 'أنابيب ضغط إيطالي', 'حماية مستدامة']
  }
];

// Subcomponent specifically managed for Vertical Video Reels to encapsulate complex independent playback states
interface ReelPlayerProps {
  project: FieldProject;
  isActive: boolean;
  onActiveRequest: () => void;
}

function VerticalReelCard({ project, isActive, onActiveRequest }: ReelPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Custom interactive state for this vertical player
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [detectedRatio, setDetectedRatio] = useState<number>(0.5625); // defaulting to standard 9:16
  const [isHovered, setIsHovered] = useState(false);

  // Play/Pause handles
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // Pause any other if playing is managed, try to play this
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        if (!isActive) {
          onActiveRequest();
        }
      }).catch(err => {
        console.log('Video play triggered exception:', err);
      });
    }
  };

  // Mute handles
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Trigger Native Fullscreen
  const triggerFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const vid = videoRef.current;
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if ((vid as any).webkitRequestFullscreen) {
      (vid as any).webkitRequestFullscreen();
    } else if ((vid as any).msRequestFullscreen) {
      (vid as any).msRequestFullscreen();
    }
  };

  // Update position sliders
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Dynamic automatic ratio detection from metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      const width = videoRef.current.videoWidth;
      const height = videoRef.current.videoHeight;
      if (width && height) {
        const ratio = width / height;
        setDetectedRatio(ratio);
        console.log(`Auto detected ratio for ${project.id}: ${width}x${height} = ${ratio}`);
      }
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const value = parseFloat(e.target.value);
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  // Automatically pause/play based on section active scope if needed
  useEffect(() => {
    if (!isActive && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`relative rounded-[28px] overflow-hidden shadow-2xl transition-all duration-500 bg-[#081322] border-2 cursor-pointer ${
        isActive 
          ? 'border-blue-500 shadow-blue-500/10 scale-[1.02] ring-3 ring-blue-500/15' 
          : 'border-slate-800 hover:border-slate-700 opacity-90 hover:opacity-100'
      }`}
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Using dynamic exact ratio style, ensuring height holds perfectly but respects width boundaries
      style={{ 
        aspectRatio: detectedRatio,
        width: '100%',
        maxWidth: '340px'
      }}
    >
      {/* Video element doing true raw rendering without stretching or cropping */}
      <video
        ref={videoRef}
        src={project.videoUrl}
        poster={project.image}
        preload="metadata"
        loop
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="w-full h-full object-contain absolute inset-0 z-0 bg-slate-950"
      />

      {/* Modern High-contrast vignette masks */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Floating HUD Camera details for Elite feel */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between text-white/70 font-mono text-[9px] pointer-events-none select-none z-20">
        
        {/* Top telemetry bar */}
        <div className="flex justify-between items-start">
          <div className="bg-red-650 px-2 py-0.5 rounded-md bg-red-600/85 text-white font-extrabold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            <span>LIVE RECORD</span>
          </div>
          <div className="flex flex-col items-end text-right">
            <span>FHD 1080P</span>
            <span>{~~(1 / detectedRatio * 10) / 10}:1 HD</span>
          </div>
        </div>

        {/* Center Target Pointer icons which shows on hover */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15 transition-all duration-300 pointer-events-none text-xl ${
          isHovered ? 'scale-150 text-white/30' : ''
        }`}>
          ⊹
        </div>

        {/* Bottom telemetry indicators */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-0.5 text-right">
            <span className="text-white font-bold">{project.id}</span>
            <span className="text-slate-350">{project.location.split('،')[0]}</span>
          </div>
          <div className="text-left text-[8px] bg-slate-900/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
            PRESS: 70 bar
          </div>
        </div>
      </div>

      {/* Big Animated Center Play Overlay Trigger when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-all z-20">
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white/95 text-blue-600 shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border border-blue-50"
            aria-label="تشغيل"
          >
            <Play className="w-7 h-7 fill-current translate-x-[-2px]" />
          </button>
        </div>
      )}

      {/* Interactive Controls Overlay Bar (Fades-in on hover to maintain sleek aesthetic) */}
      <div className={`absolute bottom-0 inset-x-0 p-3.5 flex flex-col gap-2 z-30 transition-opacity duration-300 ${
        isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
      }`}>
        
        {/* Dynamic Timeline progress range slider */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <input 
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full accent-blue-500 h-1 bg-white/20 hover:bg-white/35 rounded-lg cursor-pointer outline-none transition-all"
          />
        </div>

        {/* Video Triggers Panel */}
        <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center gap-2">
            
            {/* Play Button */}
            <button 
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Speaker Toggle with Audio Indicator */}
            <button 
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-1"
              title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>

          </div>

          <div className="flex items-center gap-1.5">
            {/* Mini time timer */}
            <span className="text-[10px] text-slate-300 font-mono">
              {~~currentTime}s / {~~duration}s
            </span>

            {/* Native Fullscreen Trigger */}
            <button 
              onClick={triggerFullscreen}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              title="ملء الشاشة"
            >
              <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'filter' | 'central' | 'mist' | 'cooler'>('all');
  const [activeReelIdx, setActiveReelIdx] = useState(0);

  // Main list of video-based Reel projects for the top showcase
  const REEL_PROJECTS = FIELD_PROJECTS.slice(0, 3);

  // Sub-projects displayed inside the architectural directory grid below
  const listProjects = activeTab === 'all' 
    ? FIELD_PROJECTS 
    : FIELD_PROJECTS.filter(p => p.category === activeTab);

  const handleScrollToForm = () => {
    const element = document.getElementById('lead-form-section');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
         top: offsetPosition,
         behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects-section" className="py-20 md:py-24 bg-gradient-to-b from-white via-[#fcfdfe] to-[#f4f8fc]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Strategic Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
          <span className="section-subheading-tag">
            <Video className="w-3.5 h-3.5 text-blue-600 animate-pulse inline" />
            <span>عرض الأعمال بالفيديو والصوت الحقيقي</span>
          </span>
          <h2 className="section-heading-main">
            معرض المشاريع والتوثيقات الحية بالرياض
          </h2>
          <p className="lead-paragraph">
            لا داعي للتخمينات! شاهد بالفيديو الفعلي أدناه خدماتنا الميدانية والتأسيسات الحقيقية التي نفذها مهندسو نثال في منازل ومؤسسات الرياض بالصوت وجودة الـ HD.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0052cc] to-[#0072ff] rounded-full mt-3"></div>
        </div>

        {/* 1. STUNNING VERTICAL VIDEO CAROUSEL PLATFORM (Reels Live Stage) */}
        <div className="bg-[#0b172a] rounded-[36px] p-6 md:p-10 lg:p-12 shadow-2xl border-4 border-slate-900 relative overflow-hidden mb-20 text-white">
          
          {/* Aesthetic grid paper backdrop lines to show high-production architectural feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center lg:items-stretch">
            
            {/* R&D HUD Text Sidebar (Left Column on Desktop) */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between text-right">
              
              <div className="space-y-6">
                
                <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3.5 py-1.5 rounded-lg text-xs font-extrabold">
                  <Zap className="w-4 h-4 animate-bounce text-yellow-400" />
                  <span>تصفية حية 100% موازنة وصفر عكارة</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-sky-400 font-mono tracking-widest uppercase block">المعاينة النشطة بالبث الحي</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                    {REEL_PROJECTS[activeReelIdx].customerName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-semibold text-slate-300">{REEL_PROJECTS[activeReelIdx].location}</span>
                  </div>
                </div>

                <div className="bg-[#101f35] border border-slate-800 p-5 rounded-2xl relative">
                  <span className="text-xs font-bold text-slate-300 block mb-1">تفاصيل التركيب وعمل الوحدة المنجزة:</span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold">
                    {REEL_PROJECTS[activeReelIdx].notes}
                  </p>
                </div>

                {/* Dashboard grid metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0f2441] border border-blue-900/40 p-3.5 rounded-xl">
                    <span className="text-[10px] text-sky-300 font-bold block">الجهاز المركب:</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{REEL_PROJECTS[activeReelIdx].systemModel}</span>
                  </div>

                  <div className="bg-[#071d36] border border-blue-900/40 p-3.5 rounded-xl">
                    <span className="text-[10px] text-emerald-400 font-bold block">تحليل النقاء والأملاح:</span>
                    <span className="text-sm font-extrabold text-[#00e676] mt-1 block">{REEL_PROJECTS[activeReelIdx].purityResult}</span>
                  </div>
                </div>

              </div>

              {/* Action converting triggers dedicated to the reel */}
              <div className="pt-8 border-t border-slate-800 mt-8 space-y-3.5">
                <a
                  href={`https://wa.me/966553033199?text=${encodeURIComponent(
                    `مرحبا نثال، أرغب في استشارة تسعيرية وطلب تركيب مماثل لتوثيق الفيديو الحي للمشروع: ${REEL_PROJECTS[activeReelIdx].title}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-600/20 text-white rounded-xl py-3.5 text-xs sm:text-sm font-extrabold text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4.5 h-4.5" />
                  <span>اطلب نظام تركيب مماثل عبر الواتساب</span>
                </a>

                <button
                  onClick={handleScrollToForm}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl py-3 text-xs font-bold text-center border border-slate-700 cursor-pointer"
                >
                  حجز موعد فحص ماء مجاني لعقاري بالرياض
                </button>
              </div>

            </div>

            {/* Live Vertical Reels Deck (Right Columns on Desktop) */}
            <div className="w-full lg:w-3/5 flex flex-col justify-between">
              
              {/* Vertical Reels Group Container: Centered grid holding vertical videos without compressing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center items-end py-4 lg:py-0">
                {REEL_PROJECTS.map((project, idx) => (
                  <div 
                    key={project.id}
                    className="flex flex-col items-center gap-3 w-full"
                  >
                    
                    {/* The specialized vertical reel card containing custom metadata aspect aspect ratios */}
                    <VerticalReelCard 
                      project={project}
                      isActive={activeReelIdx === idx}
                      onActiveRequest={() => setActiveReelIdx(idx)}
                    />

                    {/* Quick identifier label */}
                    <button 
                      onClick={() => setActiveReelIdx(idx)}
                      className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        activeReelIdx === idx 
                          ? 'bg-blue-600 text-white font-extrabold shadow-md scale-105' 
                          : 'bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {idx === 0 ? '١. فلتر غولدن برو بمطبخ' : idx === 1 ? '٢. تغذية برادة مياه' : '٣. محطة كافيه ومكينة ثلج'}
                    </button>

                  </div>
                ))}
              </div>

              {/* Slider / Swipe Tip Overlay */}
              <div className="flex items-center justify-between text-xs text-slate-400 mt-6 pt-4 border-t border-slate-900 leading-none">
                <span className="flex items-center gap-1.5 text-sky-400 font-semibold animate-pulse">
                  <Tv className="w-4 h-4" />
                  <span>اضغط على أي فيديو حي لتشغيله/إيقافه وتفعيل الصوت أو تكبير الشاشة</span>
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-slate-500">
                  SECURE_MP4_LOCAL_STREAM
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* 2. THE CHRONOLOGICAL PORTFOLIO OF ALL PROJECTS (Archived Grid) */}
        <div className="border-t border-slate-200/60 pt-16">
          
          <div className="text-right max-w-xl mb-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a1e36]">
              دليل مشروعات تركيب وصيانة نثال بالرياض
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm font-bold mt-1">
              فلتر مريح لكل أعمالنا وتأسيساتنا المنجزة بجميع أحياء ومدن الرياض
            </p>
          </div>

          {/* Categories Tab Filter */}
          <div className="flex flex-wrap justify-start items-center gap-1.5 mb-10 border-b border-slate-100 pb-6">
            {[
              { id: 'all', label: 'كل الفئات' },
              { id: 'filter', label: 'فلاتر سكنية وتحلية مدمجة' },
              { id: 'central', label: 'محطات صناعية ومركزية و كافيهات' },
              { id: 'mist', label: 'أنظمة رذاذ وتلطيف حدائق' },
              { id: 'cooler', label: 'برادات وموزعات مياه ذكية' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Premium Portfolio Directory Columns (Grid Layout resembling Modern Arch Directory) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-right overflow-hidden relative"
              >
                
                {/* Image display layer */}
                <div className="aspect-[1.5/1] overflow-hidden bg-slate-100 relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 right-3 bg-blue-900/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded">
                    {project.categoryLabel}
                  </span>
                  
                  {/* Micro address tag */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>{project.location.split('،')[1] || project.location.split('،')[0]}</span>
                  </div>
                </div>

                {/* Information body container */}
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-sky-600 mb-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>{project.systemModel}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-[#0a1e36] line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2.5">
                      {project.title}
                    </h4>

                    <p className="text-slate-700 text-xs font-bold leading-relaxed line-clamp-3">
                      {project.notes}
                    </p>
                  </div>

                  {/* Technical project tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-extrabold bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Operational Metrics table footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-650 block font-bold">نقاء الفحص:</span>
                      <span className="text-slate-800 font-extrabold mt-0.5">{project.purityResult}</span>
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-650 block font-bold">الإنتاجية:</span>
                      <span className="text-slate-800 font-extrabold mt-0.5">{project.capacity.split(' ')[0]} {project.capacity.split(' ')[1] || 'لتر'}</span>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
