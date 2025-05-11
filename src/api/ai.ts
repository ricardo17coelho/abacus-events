import useApi from '@/composables/api';

export interface AiTranslateBatchPayload {
  text: string;
  source: string;
  targets: string[];
}

export default function useApiAi() {
  const { supabase } = useApi();

  async function translateBatch({
    text,
    source,
    targets,
  }: AiTranslateBatchPayload) {
    console.warn('ai-translateBatch', text, source, targets);
    return supabase.functions.invoke('ai-translate_batch', {
      body: { text, source, targets },
    });
  }

  return {
    translateBatch,
  };
}
