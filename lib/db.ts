import { supabase, ensureSupabaseClient } from './supabaseClient';

// Helper to determine if a Supabase error is a 'relation does not exist' error (Postgres code 42P01)
const isTableMissingError = (error: any) => {
  return error && (error.code === '42P01' || error.message?.includes('relation') && error.message?.includes('does not exist'));
};

// Helper to log warning about database setup
const logError = (tableName: string, error: any) => {
  console.error(`Database error on table "${tableName}":`, error.message || error);
};

// ═══════════════════════════════════════════════════════════
// DB CRUD Operations (Database Only, No Mock Fallbacks)
// ═══════════════════════════════════════════════════════════

export const db = {
  // ─── Courses ───
  getCourses: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (error) {
        logError('courses', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getCourses failed:', err);
      return [];
    }
  },

  createCourse: async (course: any) => {
    await ensureSupabaseClient();
    if (!supabase) return course;
    try {
      const { data, error } = await supabase.from('courses').insert(course).select().single();
      if (error) {
        logError('courses', error);
        return course;
      }
      return data;
    } catch (err) {
      console.error('createCourse failed:', err);
      return course;
    }
  },

  deleteCourse: async (id: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) {
        logError('courses', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('deleteCourse failed:', err);
      return false;
    }
  },

  // ─── Live Classes ───
  getLiveClasses: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('live_classes').select('*').order('created_at', { ascending: true });
      if (error) {
        logError('live_classes', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getLiveClasses failed:', err);
      return [];
    }
  },

  // ─── Study Materials ───
  getStudyMaterials: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('study_materials').select('*').order('created_at', { ascending: false });
      if (error) {
        logError('study_materials', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getStudyMaterials failed:', err);
      return [];
    }
  },

  // ─── Payments ───
  getPayments: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('payments').select('*').order('created_at', { ascending: false });
      if (error) {
        logError('payments', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getPayments failed:', err);
      return [];
    }
  },

  // ─── Leads ───
  getLeads: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) {
        logError('leads', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getLeads failed:', err);
      return [];
    }
  },

  updateLeadStatus: async (id: string, status: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('leads').update({ status }).eq('id', id);
      if (error) {
        logError('leads', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('updateLeadStatus failed:', err);
      return false;
    }
  },

  // ─── Testimonials ───
  getTestimonials: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (error) {
        logError('testimonials', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getTestimonials failed:', err);
      return [];
    }
  },

  createTestimonial: async (test: any) => {
    await ensureSupabaseClient();
    if (!supabase) return test;
    try {
      const { data, error } = await supabase.from('testimonials').insert(test).select().single();
      if (error) {
        logError('testimonials', error);
        return test;
      }
      return data;
    } catch (err) {
      console.error('createTestimonial failed:', err);
      return test;
    }
  },

  updateTestimonialStatus: async (id: string, status: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('testimonials').update({ status }).eq('id', id);
      if (error) {
        logError('testimonials', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('updateTestimonialStatus failed:', err);
      return false;
    }
  },

  deleteTestimonial: async (id: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) {
        logError('testimonials', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('deleteTestimonial failed:', err);
      return false;
    }
  },

  // ─── Blog Posts ───
  getBlogPosts: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (error) {
        logError('blog_posts', error);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('getBlogPosts failed:', err);
      return [];
    }
  },

  createBlogPost: async (post: any) => {
    await ensureSupabaseClient();
    if (!supabase) return post;
    try {
      const { data, error } = await supabase.from('blog_posts').insert(post).select().single();
      if (error) {
        logError('blog_posts', error);
        return post;
      }
      return data;
    } catch (err) {
      console.error('createBlogPost failed:', err);
      return post;
    }
  },

  updateBlogPostStatus: async (id: string, status: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('blog_posts').update({ status }).eq('id', id);
      if (error) {
        logError('blog_posts', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('updateBlogPostStatus failed:', err);
      return false;
    }
  },

  deleteBlogPost: async (id: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) {
        logError('blog_posts', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('deleteBlogPost failed:', err);
      return false;
    }
  },

  // ─── Students Profiles ───
  getStudents: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('role', 'student').order('created_at', { ascending: false });
      if (error) {
        logError('profiles', error);
        return [];
      }
      return (data || []).map((p: any) => ({
        id: p.id,
        name: p.name || 'Student User',
        email: p.email,
        course: p.level ? `Spoken English — ${p.level}` : 'Spoken English Mastery',
        joinedDate: new Date(p.created_at).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'active'
      }));
    } catch (err) {
      console.error('getStudents failed:', err);
      return [];
    }
  },

  getAdmins: async () => {
    await ensureSupabaseClient();
    if (!supabase) return [];
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('role', 'admin').order('created_at', { ascending: false });
      if (error) {
        logError('profiles', error);
        return [];
      }
      return (data || []).map((p: any) => ({
        id: p.id,
        name: p.name || 'Admin User',
        email: p.email,
        joinedDate: new Date(p.created_at).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'active'
      }));
    } catch (err) {
      console.error('getAdmins failed:', err);
      return [];
    }
  },

  createStudentProfile: async (student: any) => {
    await ensureSupabaseClient();
    if (!supabase) return student;
    try {
      const { data, error } = await supabase.from('profiles').insert({
        id: student.id || crypto.randomUUID(),
        email: student.email,
        role: 'student',
        name: student.name,
        level: 'Intermediate (B1)'
      }).select().single();
      
      if (error) {
        logError('profiles', error);
        return student;
      }
      return data;
    } catch (err) {
      console.error('createStudentProfile failed:', err);
      return student;
    }
  },

  deleteStudentProfile: async (id: string) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) {
        logError('profiles', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('deleteStudentProfile failed:', err);
      return false;
    }
  },

  // ─── Profile Details ───
  getProfile: async (id: string) => {
    await ensureSupabaseClient();
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
      if (error) {
        logError('profiles', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('getProfile failed:', err);
      return null;
    }
  },

  updateProfile: async (id: string, updates: any) => {
    await ensureSupabaseClient();
    if (!supabase) return false;
    try {
      const { error } = await supabase.from('profiles').update(updates).eq('id', id);
      if (error) {
        logError('profiles', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('updateProfile failed:', err);
      return false;
    }
  }
};
