import useApi from '@/composables/api';
import {
  type ProgramTimeline,
  type ProgramTimelineCategory
} from './types/ProgramTimeline';
import type { FindFilter } from './types/QueryTypes';

export default function useApiProgramTimeline() {
  const { find, findById, create, update, remove } = useApi();

  function getProgramTimelines(
    select = '*',
    filters: FindFilter[] = [],
    range = [0, 100]
  ) {
    return find(
      'program_timeline',
      filters,
      select,
      range,
      [['time_start', { ascending: true }]],
      {
        count: 'exact'
      }
    );
  }

  function getProgramTimelinesByCategory(
    category: ProgramTimelineCategory,
    range = [0, 100]
  ) {
    const filters: FindFilter[] = [['category', 'eq', category]];
    return getProgramTimelines('*', filters, range);
  }

  function getProgramTimelineById(ProgramTimelineId: string) {
    return findById('program_timeline', ProgramTimelineId, '*');
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function createProgramTimeline(form: Record<string, any>) {
    return create<ProgramTimeline>('program_timeline', form);
  }

  // // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  // function createProgramTimelineKids(form: Record<string, any>) {
  //   return create<ProgramTimeline>('program_timeline', {
  //     ...form,
  //     category: PROGRAM_TIMELINE_CATEGORY.KIDS
  //   });
  // }

  // // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  // function createProgramTimelineAdults(form: Record<string, any>) {
  //   return create<ProgramTimeline>('program_timeline', {
  //     ...form,
  //     category: PROGRAM_TIMELINE_CATEGORY.ADULTS
  //   });
  // }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function updateProgramTimeline(id: string, form: Record<string, any>) {
    return update<ProgramTimeline>('program_timeline', {
      id,
      ...form
    });
  }

  function removeProgramTimeline(id: string) {
    return remove('program_timeline', id);
  }

  return {
    getProgramTimelines,
    getProgramTimelineById,
    createProgramTimeline,
    updateProgramTimeline,
    removeProgramTimeline,
    getProgramTimelinesByCategory
  };
}
