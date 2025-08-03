import { supabase } from '@/services/supabase';

export default function useApiUserClaim() {
  async function getMyClaims() {
    return supabase.rpc('get_my_claims');
  }

  async function getMyClaim(claim: string) {
    return supabase.rpc('get_my_claim', {
      claim,
    });
  }

  async function getClaims(uid: string) {
    return supabase.rpc('get_claims', {
      uid,
    });
  }

  async function isClaimAdmin() {
    return supabase.rpc('is_claims_admin');
  }

  async function setClaim({
    uid,
    claim,
    value,
  }: {
    uid: string;
    claim: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  }) {
    return supabase.rpc('set_claim', {
      uid,
      claim,
      value,
    });
  }

  return {
    getMyClaims,
    getMyClaim,
    getClaims,
    isClaimAdmin,
    setClaim,
  };
}
