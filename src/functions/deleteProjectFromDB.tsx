
import { supabase } from "@/supabaseClient"

const deleteProjectFromDB = async (projectId: string) => {
    try {
    await supabase.from('tasks').delete().eq("taskProject", projectId).throwOnError()
    console.log("Tasks deleted from database.")
    await supabase.from("projects").delete().eq('projectId', projectId).throwOnError()
    console.log("Project removed from database.")
    } catch (error) {
        console.error("Error removing project from database.")
    }
}

export default deleteProjectFromDB