import { supabase } from '@/services/supabase';
import { v4 as uuidv4 } from 'uuid';
import type { FindFilter, FindOrder, FindSelect } from '@/api/types/QueryTypes';

export default function useApi() {
  async function findById<T>(
    table: string,
    id: number | string,
    select = '*',
    idKey = 'id',
    filters: FindFilter[] = [],
    orders: FindOrder[] = [],
  ) {
    const query = supabase.from(table).select(select);

    // filters is an array of FindFilters, so we chain each filter to the query builder
    filters.forEach(([column, op, value]) => {
      query.filter(column, op, value);
    });

    // same as filters, chaining multiple order by queries is possible
    orders.forEach(([column, options]) => {
      query.order(column, options);
    });

    const { data, error } = await query.match({ [idKey]: id }).maybeSingle<T>();

    if (error) {
      return { data: null, error };
    }

    return { data: data ?? null, error: null };
  }

  async function find<T>(
    table: string,
    filters: FindFilter[],
    select = '*',
    range = [0, 100],
    orders: FindOrder[] = [],
    count: FindSelect = {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ data: T[] | null; error: any }> {
    const query = supabase.from(table).select(select, count);

    // filters is an array of FindFilters, so we chain each filter to the query builder
    filters.forEach(([column, op, value]) => {
      query.filter(column, op, value);
    });

    // same as filters, chaining multiple order by queries is possible
    orders.forEach(([column, options]) => {
      query.order(column, options);
    });

    // use range for pagination
    query.range(range[0], range[1]);

    const { data, error } = await query;

    if (error) {
      return { data: null, error }; // Return null for data if there's an error
    }

    return { data: data as T[] | null, error: null }; // Cast data to the expected type T[]
  }

  // function find(
  //   table: string,
  //   filters: FindFilter[],
  //   select = '*',
  //   range = [0, 10],
  //   orders: FindOrder[] = []
  // ) {
  //   const query = supabase.from(table).select(select);

  //   // filters is an array of FindFilters, so we chain each filter to the query builder
  //   filters.forEach(([column, op, value]) => {
  //     query.filter(column, op, value);
  //   });

  //   // same as filters, chaining multiple order by queries is possible
  //   orders.forEach(([column, options]) => {
  //     query.order(column, options);
  //   });

  //   // use range for pagination
  //   query.range(range[0], range[1]);

  //   return query;
  // }

  const count = (table: string, filters: FindFilter[]) => {
    // providing the option `head: true` will only return the count, otherwise results too.
    const query = supabase.from(table).select('*', {
      count: 'exact',
      head: true,
    });

    if (filters) {
      filters.forEach(([column, op, value]) => {
        query.filter(column, op, value);
      });
    }

    return query;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function create<T>(table: string, form: any) {
    return supabase.from(table).insert([form]).select().single<T>();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function update<T>(table: string, form: any, idKey = 'id') {
    const id = form[idKey];
    return supabase
      .from(table)
      .update({ ...form })
      .match({ [idKey]: id })
      .select()
      .single<T>();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function addOrUpdate<T>(table: string, data: any) {
    return supabase.from(table).upsert(data).maybeSingle<T>();
  }

  async function search<T>(
    table: string,
    column: string,
    search: string,
    select: string = '*',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ data: T[] | null; error: any }> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .ilike(column, search);

    if (error) {
      return { data: null, error }; // Return null for data if there's an error
    }

    return { data: data as T[] | null, error: null }; // Cast data to the expected type T[]
  }

  async function searchFullText<T>(
    table: string,
    column: string,
    search: string,
    select: string = '*',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<{ data: T[] | null; error: any }> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .textSearch(column, search);

    if (error) {
      return { data: null, error }; // Return null for data if there's an error
    }

    return { data: data as T[] | null, error: null }; // Cast data to the expected type T[]
  }

  function remove(table: string, id: string, key = 'id') {
    return supabase
      .from(table)
      .delete()
      .match({ [key]: id });
  }

  const uploadImg = async (
    file: File | Blob,
    bucket: string,
    folder = '',
    fileName = uuidv4(),
  ) => {
    let path = '';
    if (folder) {
      path = `${folder}/`;
    }
    path += fileName;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw error;
    const publicUrl = await getUrlPublic(bucket, path);
    return publicUrl;
  };

  const getUrlPublic = async (bucket: string, fileName: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const removeImg = (bucket: string, path: string) => {
    return supabase.storage.from(bucket).remove([path]);
  };

  const imgExists = async (bucket: string, path: string, fileName: string) => {
    const { data, error } = await supabase.storage.from(bucket).list(path, {
      search: fileName,
      limit: 1,
    });
    if (error) {
      return false;
    }
    return data.length > 0;
  };

  const uploadOrReplaceImg = async (
    file: File | Blob,
    bucket: string,
    folder = '',
    fileName = uuidv4(),
  ) => {
    const existingImgUrl = await imgExists(bucket, folder, fileName);

    if (existingImgUrl) {
      // Delete the existing image
      await removeImg(bucket, fileName);
    }

    return uploadImg(file, bucket, folder, fileName);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function removeSubscription(subscription: any) {
    supabase.removeChannel(subscription);
  }

  return {
    find,
    findById,
    count,
    create,
    update,
    remove,
    addOrUpdate,
    search,
    searchFullText,
    uploadImg,
    uploadOrReplaceImg,
    imgExists,
    removeImg,
    // realtime
    removeSubscription,
  };
}
