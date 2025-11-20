export default function useUser(){
    const supabase = useSupabaseClient();
    
    async function logout(){
        let { error } = await supabase.auth.signOut();
        return navigateTo('/login');
    }

    return {
        logout
    }
}