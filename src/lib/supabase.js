import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })
  : null;

/**
 * Check connectivity and whether tables are provisioned.
 * @returns {Promise<{ connected: boolean, tablesExist: boolean, message: string }>}
 */
export async function checkSupabaseConnection() {
  if (!supabase) {
    return {
      connected: false,
      tablesExist: false,
      message: 'Supabase credentials are not configured in .env'
    };
  }

  try {
    const { error } = await supabase
      .from('listings')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('does not exist')) {
        return {
          connected: true,
          tablesExist: false,
          message: 'Connected to Supabase, but the "listings" table has not been created yet. Run supabase_schema.sql in the Supabase SQL editor.'
        };
      }
      return {
        connected: false,
        tablesExist: false,
        message: error.message || 'Supabase query error'
      };
    }

    return {
      connected: true,
      tablesExist: true,
      message: 'Connected to Supabase successfully.'
    };
  } catch (err) {
    return {
      connected: false,
      tablesExist: false,
      message: err.message || 'Network error connecting to Supabase'
    };
  }
}

// ----------------------------------------------------------------------
// Data Format Transformers (DB <-> Frontend)
// ----------------------------------------------------------------------

export function toListingFrontend(row) {
  if (!row) return null;
  return {
    id: row.id,
    category: row.category || 'house',
    type: row.type || 'Standard',
    title: row.title || '',
    location: row.location || '',
    server: row.server || 'All Regions',
    price: Number(row.price) || 0,
    rentPrice: row.rent_price ? Number(row.rent_price) : undefined,
    status: row.status || 'For Sale',
    badge: row.badge || '',
    featured: Boolean(row.featured),
    rating: Number(row.rating) || 5.0,
    seller: row.seller || {
      name: 'Soreti Homes (የቤት ሸያጭ ብቻ)',
      role: 'Certified Broker',
      phone: '0998 635 499 / 0948 002 510',
      verified: true
    },
    images: Array.isArray(row.images) ? row.images : [],
    specs: row.specs || {},
    description: row.description || '',
    createdAt: row.created_at
  };
}

export function toListingDb(item) {
  const id = item.id ? String(item.id) : `${item.category || 'asset'}-${Date.now()}`;
  return {
    id,
    category: item.category || 'house',
    type: item.type || 'Villa',
    title: item.title,
    location: item.location || '',
    server: item.server || 'Bole & Atlas',
    price: Number(item.price) || 0,
    rent_price: item.rentPrice ? Number(item.rentPrice) : null,
    status: item.status || 'For Sale',
    badge: item.badge || null,
    featured: Boolean(item.featured),
    rating: Number(item.rating) || 5.0,
    seller: item.seller || {
      name: 'Soreti Homes (የቤት ሸያጭ ብቻ)',
      role: 'Certified Addis Broker',
      phone: '0998 635 499 / 0948 002 510',
      verified: true
    },
    images: Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []),
    specs: item.specs || {},
    description: item.description || ''
  };
}

export function toBookingFrontend(row) {
  if (!row) return null;
  return {
    id: row.id,
    assetId: row.asset_id,
    assetTitle: row.asset_title,
    assetCategory: row.asset_category,
    assetPrice: Number(row.asset_price) || 0,
    assetImage: row.asset_image,
    assetLocation: row.asset_location,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    inspectionDate: row.inspection_date,
    inspectionTime: row.inspection_time,
    notes: row.notes || '',
    status: row.status || 'Pending',
    createdAt: row.created_at
  };
}

export function toBookingDb(booking) {
  const id = booking.id ? String(booking.id) : `BK-${Date.now().toString().slice(-5)}`;
  return {
    id,
    asset_id: booking.assetId ? String(booking.assetId) : null,
    asset_title: booking.assetTitle || '',
    asset_category: booking.assetCategory || 'house',
    asset_price: Number(booking.assetPrice) || 0,
    asset_image: booking.assetImage || '',
    asset_location: booking.assetLocation || '',
    customer_name: booking.customerName || '',
    customer_phone: booking.customerPhone || '',
    inspection_date: booking.inspectionDate || '',
    inspection_time: booking.inspectionTime || '',
    notes: booking.notes || '',
    status: booking.status || 'Pending'
  };
}

// ----------------------------------------------------------------------
// Listings API
// ----------------------------------------------------------------------

export async function fetchSupabaseListings() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] fetchListings error:', error.message);
      return null;
    }
    return data ? data.map(toListingFrontend) : [];
  } catch (err) {
    console.warn('[Supabase] Network exception fetching listings:', err);
    return null;
  }
}

export async function createSupabaseListing(item) {
  if (!supabase) return null;
  const payload = toListingDb(item);
  const { data, error } = await supabase
    .from('listings')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] createListing error:', error);
    throw error;
  }
  return toListingFrontend(data);
}

export async function updateSupabaseListing(item) {
  if (!supabase) return null;
  const payload = toListingDb(item);
  const { data, error } = await supabase
    .from('listings')
    .update(payload)
    .eq('id', String(item.id))
    .select()
    .single();

  if (error) {
    console.error('[Supabase] updateListing error:', error);
    throw error;
  }
  return toListingFrontend(data);
}

export async function deleteSupabaseListing(id) {
  if (!supabase) return null;
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', String(id));

  if (error) {
    console.error('[Supabase] deleteListing error:', error);
    throw error;
  }
  return true;
}

// ----------------------------------------------------------------------
// Bookings API
// ----------------------------------------------------------------------

export async function fetchSupabaseBookings() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] fetchBookings error:', error.message);
      return null;
    }
    return data ? data.map(toBookingFrontend) : [];
  } catch (err) {
    console.warn('[Supabase] Network exception fetching bookings:', err);
    return null;
  }
}

export async function createSupabaseBooking(booking) {
  if (!supabase) return null;
  const payload = toBookingDb(booking);
  const { data, error } = await supabase
    .from('bookings')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] createBooking error:', error);
    throw error;
  }
  return toBookingFrontend(data);
}

export async function updateSupabaseBookingStatus(id, status) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', String(id))
    .select()
    .single();

  if (error) {
    console.error('[Supabase] updateBookingStatus error:', error);
    throw error;
  }
  return toBookingFrontend(data);
}

export async function deleteSupabaseBooking(id) {
  if (!supabase) return null;
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', String(id));

  if (error) {
    console.error('[Supabase] deleteBooking error:', error);
    throw error;
  }
  return true;
}

// ----------------------------------------------------------------------
// Authentication API
// ----------------------------------------------------------------------

export async function getAdminSession() {
  if (!supabase) return { session: null, user: null };
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn('[Supabase Auth] getSession error:', error.message);
      return { session: null, user: null };
    }
    const session = data?.session;
    if (session?.user && !isAdminUser(session.user)) {
      await supabase.auth.signOut({ scope: 'local' });
      return { session: null, user: null };
    }
    return { session, user: session?.user || null };
  } catch (err) {
    console.warn('[Supabase Auth] Session fetch error:', err);
    return { session: null, user: null };
  }
}

export function onAdminAuthStateChange(callback) {
  if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
  return supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;
    callback(event, isAdminUser(user) ? user : null, session);
  });
}

/**
 * Admin authorization is based on server-managed app_metadata. User metadata
 * can be edited by the user and must not be used for access control.
 */
export function isAdminUser(user) {
  return user?.app_metadata?.role === 'admin';
}

export async function signInAdmin(email, password) {
  if (!supabase) throw new Error('Supabase is not configured in .env');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });
  if (error) throw error;

  if (!isAdminUser(data?.user)) {
    await supabase.auth.signOut({ scope: 'local' });
    throw new Error('ADMIN_ACCESS_REQUIRED');
  }

  return data;
}

export async function signOutAdmin() {
  if (!supabase) return;
  // Clear this browser's session even if the network is unavailable. The
  // admin should never remain locally authenticated after pressing logout.
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) {
    console.warn('[Supabase Auth] signOut error:', error.message);
    throw error;
  }
}

export async function requestPasswordReset(email) {
  if (!supabase) throw new Error('Supabase is not configured in .env');
  const redirectTo = `${window.location.origin}/reset-password`;
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo
  });
  if (error) throw error;
  return data;
}

export async function updateAdminPassword(newPassword) {
  if (!supabase) throw new Error('Supabase is not configured in .env');
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
  return data;
}

export async function changeAdminPassword(currentPassword, newPassword) {
  if (!supabase) throw new Error('Supabase is not configured in .env');

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user?.email || !isAdminUser(userData.user)) {
    throw new Error('ADMIN_ACCESS_REQUIRED');
  }

  // Re-authenticate before changing credentials so a stolen active browser
  // session alone is not enough to rotate the administrator password.
  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: userData.user.email,
    password: currentPassword
  });
  if (reauthError) {
    throw new Error('CURRENT_PASSWORD_INVALID');
  }

  return updateAdminPassword(newPassword);
}

// ----------------------------------------------------------------------
// Seed / Bulk Sync Data to Supabase (Utility)
// ----------------------------------------------------------------------

export async function seedInitialDataToSupabase(mockListings = [], mockBookings = []) {
  if (!supabase) throw new Error('Supabase client is not configured');

  const formattedListings = mockListings.map(toListingDb);
  const { error: listingsError } = await supabase
    .from('listings')
    .upsert(formattedListings, { onConflict: 'id' });

  if (listingsError) {
    console.error('[Supabase] Seed listings error:', listingsError);
    throw listingsError;
  }

  if (mockBookings.length > 0) {
    const formattedBookings = mockBookings.map(toBookingDb);
    const { error: bookingsError } = await supabase
      .from('bookings')
      .upsert(formattedBookings, { onConflict: 'id' });

    if (bookingsError) {
      console.error('[Supabase] Seed bookings error:', bookingsError);
      throw bookingsError;
    }
  }

  return { success: true, count: formattedListings.length };
}
