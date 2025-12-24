from supabase import create_client, Client

from config import settings   # local import under Option B

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

def table(name: str):
    return supabase.table(name)