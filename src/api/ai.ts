import useApi from '@/composables/api';

export interface AiTranslateBatchPayload {
  text: string;
  source: string;
  targets: string[];
  force_api?: boolean;
}

export interface AiTranslateBatchTranslationItem {
  status: number;
  value?: string;
  error?: string;
}

export type AiTranslateBatchTranslation = Record<
  string,
  AiTranslateBatchTranslationItem
>;

export interface AiTranslateBatchResponse {
  translations: AiTranslateBatchTranslation;
}

export default function useApiAi() {
  const { supabase } = useApi();

  async function translateBatch({
    text,
    source,
    targets,
    force_api,
  }: AiTranslateBatchPayload) {
    console.warn('ai-translateBatch', text, source, targets, force_api);
    let params = '';
    if (force_api) {
      params += `force_api=${force_api}`;
    }
    return supabase.functions.invoke<AiTranslateBatchResponse>(
      `ai-translate_batch?${params}`,
      {
        body: { text, source, targets },
      },
    );
  }

  return {
    translateBatch,
  };
}
