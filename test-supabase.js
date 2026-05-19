import { createClient } from '@supabase/supabase-js';

const urlWithRest = 'https://wygcuqdofvfkfucwatem.supabase.co';
const urlWithoutRest = 'https://wygcuqdofvfkfucwatem.supabase.co';
const anonKey = 'sb_publishable_u6aRHOijNiu2jnQ8wSk9Gg_dn4HChXx';

async function test() {
  console.log('Testing with URL WITH /rest/v1/...');
  const client1 = createClient(urlWithRest, anonKey);
  try {
    const { data, error } = await client1.from('votes').select('*').limit(1);
    console.log('client1 result:', { data, error });
  } catch (e) {
    console.log('client1 catch:', e.message);
  }

  console.log('\nTesting with URL WITHOUT /rest/v1/...');
  const client2 = createClient(urlWithoutRest, anonKey);
  try {
    const { data, error } = await client2.from('votes').select('*').limit(1);
    console.log('client2 result:', { data, error });
  } catch (e) {
    console.log('client2 catch:', e.message);
  }
}

test();
