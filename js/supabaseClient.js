/**
 * Neo Gen Innovators - Supabase Client Configuration & Shared Data Engine
 * Pure ES6 module for static hosting (Cloudflare Pages compatible)
 */

export const SUPABASE_CONFIG = {
  url: localStorage.getItem('SUPABASE_URL') || 'https://xyzcompany.supabase.co',
  anonKey: localStorage.getItem('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key'
};

export const setSupabaseCredentials = (url, anonKey) => {
  if (url) localStorage.setItem('SUPABASE_URL', url.trim());
  if (anonKey) localStorage.setItem('SUPABASE_ANON_KEY', anonKey.trim());
  SUPABASE_CONFIG.url = url ? url.trim() : SUPABASE_CONFIG.url;
  SUPABASE_CONFIG.anonKey = anonKey ? anonKey.trim() : SUPABASE_CONFIG.anonKey;
  _client = null; // reset client to re-initialize
};

export const isSupabaseConfigured = () => {
  return (
    Boolean(SUPABASE_CONFIG.url) &&
    !SUPABASE_CONFIG.url.includes('xyzcompany') &&
    Boolean(SUPABASE_CONFIG.anonKey) &&
    !SUPABASE_CONFIG.anonKey.includes('dummy_anon_key')
  );
};

let _client = null;

export const getSupabase = () => {
  if (_client) return _client;
  
  if (typeof window !== 'undefined' && window.supabase) {
    try {
      _client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return _client;
    } catch (err) {
      console.warn('[Supabase] Init notice:', err.message);
    }
  }
  return null;
};

// High-fidelity fallback data for instant preview when Supabase credentials are not yet entered
export const FALLBACK_PROFILES = [
  {
    id: 'f-1',
    email: 'raushan@neogen.org',
    full_name: 'Raushan Kumar',
    role: 'admin',
    title: 'Founder & Lead Architect',
    bio: 'Pioneering IoT edge architecture, Bare-metal RTOS, and real-time cyber-physical systems. Leading Neo Gen Innovators into national hackathons and hardware innovation summits.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    skills: ['IoT Architecture', 'RTOS', 'LoRaWAN', 'Edge AI'],
    is_approved: true
  },
  {
    id: 'f-2',
    email: 'aarav@neogen.org',
    full_name: 'Aarav Sharma',
    role: 'core',
    title: 'Embedded Firmware Lead',
    bio: 'Low-power ESP32/STM32 engineer. Architect of mesh telemetry nodes for smart agricultural sensors and remote telemetry.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    skills: ['C/C++', 'STM32', 'FreeRTOS', 'BLE'],
    is_approved: true
  },
  {
    id: 'f-3',
    email: 'ananya@neogen.org',
    full_name: 'Ananya Deshmukh',
    role: 'core',
    title: 'TinyML & Edge AI Specialist',
    bio: 'Deploying quantized convolutional neural nets on microcontrollers for micro-vibration failure detection and edge acoustics.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    skills: ['TensorFlow Lite', 'Edge Impulse', 'Python', 'TinyML'],
    is_approved: true
  },
  {
    id: 'f-4',
    email: 'vikram@neogen.org',
    full_name: 'Vikramaditya Roy',
    role: 'member',
    title: 'Autonomous Robotics Engineer',
    bio: 'Designing ROS2 autonomous rovers with multi-spectral LiDAR integration for rapid disaster recovery and subterranean mapping.',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    skills: ['ROS 2', 'LiDAR', 'SLAM', 'Kinematics'],
    is_approved: true
  },
  {
    id: 'f-5',
    email: 'meera@neogen.org',
    full_name: 'Meera Nambiar',
    role: 'member',
    title: 'Hardware PCB & RF Designer',
    bio: 'KiCad & Altium designer specializing in high-speed impedance matching, custom antenna arrays, and EMI-shielded IoT enclosures.',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    skills: ['KiCad', 'RF Design', 'PCB Layout', 'EMI/EMC'],
    is_approved: true
  },
  {
    id: 'f-6',
    email: 'siddharth@neogen.org',
    full_name: 'Siddharth Sen',
    role: 'member',
    title: 'Cloud IoT Infrastructure & MQTT',
    bio: 'Constructing high-throughput distributed message brokers, Kafka streaming pipelines, and real-time telemetry dashboards for 100k+ edge devices.',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    skills: ['MQTT', 'Kafka', 'Go', 'TimeScaleDB'],
    is_approved: true
  }
];

// Fallback Wall and Site Content
export const FALLBACK_SITE_CONTENT = {
  // WALL 1: ENTRANCE HERO
  wall1_badge: 'CHAPTER 00 • SYSTEM INITIALIZED',
  wall1_title: 'NEO GEN INNOVATORS',
  wall1_subtitle: 'An elite physical computing and IoT hackathon collective founded by Raushan Kumar. Walk through our virtual laboratory corridor.',
  wall1_cta1: 'Step Into The Lab',
  wall1_cta2: 'Member Portal',
  wall1_img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',

  // WALL 2: GENESIS & VISION
  wall2_chapter: 'CHAPTER 01',
  wall2_title: 'THE SILICON GENESIS',
  wall2_founder: 'Raushan Kumar',
  wall2_quote: '"True innovation begins when sensors, microcontrollers, and neural networks collaborate in the physical world to solve human-scale challenges."',
  wall2_body1: 'Founded by Raushan Kumar, Neo Gen Innovators was created to accelerate hands-on hardware prototyping and edge compute engineering across collegiate hackathon ecosystems.',
  wall2_body2: 'We bridge the gap between software algorithms and physical silicon: turning 48-hour sprints into real-world deployed cyber-physical systems.',
  wall2_img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',

  // WALL 3: ARCHITECTURAL TESTBENCH
  wall3_chapter: 'CHAPTER 02',
  wall3_title: 'THE HARDWARE TESTBENCH',
  wall3_subtitle: 'Four foundational vectors powering our high-speed IoT hackathon engineering cohorts.',
  wall3_p1_title: 'Embedded Edge AI',
  wall3_p1_desc: 'Quantized 8-bit TinyML models on ARM Cortex-M silicon for edge acoustics & vibration.',
  wall3_p2_title: 'Sub-GHz Mesh',
  wall3_p2_desc: 'Resilient telemetry using LoRaWAN, BLE Mesh, and ESP-NOW operating without internet.',
  wall3_p3_title: 'Autonomous Robotics',
  wall3_p3_desc: 'ROS 2 micro-architectures with LiDAR SLAM and stereoscopic vision odometry.',
  wall3_p4_title: 'Zero-Trust Silicon',
  wall3_p4_desc: 'Hardware secure elements, tamper-resistant bootloaders, and encrypted mTLS pipelines.',
  wall3_img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',

  // WALL 4: THE VERIFIED COLLECTIVE
  wall4_chapter: 'CHAPTER 03',
  wall4_title: 'THE VERIFIED COLLECTIVE',
  wall4_subtitle: 'Approved hardware engineers, firmware researchers, and creators active in our sprints.',
  wall4_img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',

  // WALL 5: HACKATHON WAR ROOM & STATS
  wall5_chapter: 'CHAPTER 04',
  wall5_title: 'HACKATHON WAR ROOM',
  wall5_subtitle: 'Numbers forged through sleepless hackathon sprints and high-precision physical hardware.',
  stat_members: '500+',
  stat_hackathons: '18',
  stat_prototypes: '120+',
  stat_grants: '$85K+',
  wall5_img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',

  // Legacy mappings for backward compatibility
  badge_text: 'CHAPTER 00 • SYSTEM INITIALIZED',
  headline: 'NEO GEN INNOVATORS',
  subheadline: 'An elite physical computing and IoT hackathon collective founded by Raushan Kumar.',
  about_badge: 'CHAPTER 01',
  about_heading: 'THE SILICON GENESIS',
  founder_name: 'Raushan Kumar',
  founder_quote: '"True innovation begins when sensors, microcontrollers, and neural networks collaborate in the physical world to solve human-scale challenges."',
  about_body_1: 'Founded by Raushan Kumar, Neo Gen Innovators was created to accelerate hands-on hardware prototyping and edge compute engineering.',
  about_body_2: 'We bridge software algorithms with physical silicon, turning sprints into real-world deployed systems.'
};

/**
 * Fetch approved members for the 3D room collective wall
 */
export async function fetchApprovedMembers() {
  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('is_approved', true)
        .order('role', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[Supabase Profiles Error]', error.message);
        return getLocalStoredProfiles(true);
      }
      return data && data.length > 0 ? data : getLocalStoredProfiles(true);
    } catch (e) {
      console.warn('[Supabase Exception]', e);
      return getLocalStoredProfiles(true);
    }
  }
  return getLocalStoredProfiles(true);
}

/**
 * Fetch all profiles (for Admin management)
 */
export async function fetchAllProfiles() {
  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn('[Supabase fetchAllProfiles]', e);
    }
  }
  return getLocalStoredProfiles(false);
}

/**
 * Fetch site & 3D wall content from Supabase
 */
export async function fetchSiteContent() {
  const client = getSupabase();
  const localOverrides = getLocalSiteContent();

  if (client && isSupabaseConfigured()) {
    try {
      const { data, error } = await client
        .from('site_content')
        .select('content_key, content_value');

      if (!error && data && data.length > 0) {
        const contentMap = { ...FALLBACK_SITE_CONTENT, ...localOverrides };
        data.forEach(item => {
          contentMap[item.content_key] = item.content_value;
        });
        return contentMap;
      }
    } catch (e) {
      console.warn('[Supabase site_content]', e);
    }
  }
  return { ...FALLBACK_SITE_CONTENT, ...localOverrides };
}

/**
 * Admin: Bulk update wall & site content
 */
export async function saveSiteContentBulk(entries) {
  // Always update local cache so updates appear instantly
  const local = getLocalSiteContent();
  entries.forEach(({ key, value, section, id }) => {
    local[key] = value;
  });
  localStorage.setItem('NEOGEN_SITE_CONTENT_OVERRIDE', JSON.stringify(local));

  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      const rows = entries.map(item => ({
        id: item.id || `key_${item.key}`,
        section: item.section || 'wall',
        content_key: item.key,
        content_value: item.value,
        updated_at: new Date().toISOString()
      }));

      const { data, error } = await client
        .from('site_content')
        .upsert(rows, { onConflict: 'content_key' });

      if (error) throw error;
      return { success: true, count: rows.length };
    } catch (err) {
      console.warn('[Supabase saveSiteContentBulk Error]', err);
      return { success: true, localOnly: true, error: err.message };
    }
  }

  return { success: true, localOnly: true };
}

/**
 * Admin: Toggle member approval
 */
export async function toggleMemberApproval(id, newStatus) {
  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      const { error } = await client
        .from('profiles')
        .update({ is_approved: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.warn('[toggleMemberApproval Error]', e);
    }
  }

  // Also sync locally
  const list = getLocalStoredProfiles(false);
  const target = list.find(p => p.id === id);
  if (target) {
    target.is_approved = newStatus;
    localStorage.setItem('NEOGEN_CUSTOM_PROFILES', JSON.stringify(list));
  }
  return true;
}

/**
 * Admin: Delete member
 */
export async function deleteMemberProfile(id) {
  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      await client.from('profiles').delete().eq('id', id);
    } catch (e) {
      console.warn('[deleteMemberProfile Error]', e);
    }
  }
  let list = getLocalStoredProfiles(false);
  list = list.filter(p => p.id !== id);
  localStorage.setItem('NEOGEN_CUSTOM_PROFILES', JSON.stringify(list));
  return true;
}

/**
 * Member Portal: Update own profile
 */
export async function updateOwnProfile(profileData) {
  const client = getSupabase();
  if (client && isSupabaseConfigured()) {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('Not logged in');

      const { data, error } = await client
        .from('profiles')
        .update({
          full_name: profileData.full_name,
          title: profileData.title,
          bio: profileData.bio,
          avatar_url: profileData.avatar_url,
          github_url: profileData.github_url,
          linkedin_url: profileData.linkedin_url,
          skills: profileData.skills,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { success: true, profile: data };
    } catch (err) {
      console.warn('[updateOwnProfile Error]', err);
    }
  }

  // Local fallback
  return { success: true, profile: profileData, localOnly: true };
}

/**
 * Auth: Get current active user
 */
export async function getCurrentUser() {
  const client = getSupabase();
  if (!client) return null;
  try {
    const { data: { session } } = await client.auth.getSession();
    return session?.user || null;
  } catch (e) {
    return null;
  }
}

/**
 * Auth: Get full profile of currently logged-in user
 */
export async function getCurrentUserProfile() {
  const client = getSupabase();
  const user = await getCurrentUser();
  if (!user || !client) return null;

  try {
    const { data, error } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && data) return data;
  } catch (e) {
    console.warn('[getCurrentUserProfile]', e);
  }

  return {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || user.email.split('@')[0],
    role: 'member',
    is_approved: false
  };
}

// Local storage helper caches
function getLocalSiteContent() {
  try {
    const raw = localStorage.getItem('NEOGEN_SITE_CONTENT_OVERRIDE');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function getLocalStoredProfiles(approvedOnly = true) {
  try {
    const raw = localStorage.getItem('NEOGEN_CUSTOM_PROFILES');
    let list = raw ? JSON.parse(raw) : FALLBACK_PROFILES;
    if (approvedOnly) {
      list = list.filter(p => p.is_approved);
    }
    return list;
  } catch (e) {
    return FALLBACK_PROFILES.filter(p => !approvedOnly || p.is_approved);
  }
}
